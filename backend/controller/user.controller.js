import { PrismaClient } from "@prisma/client";
import md5 from 'md5'

const prisma = new PrismaClient()

export const getAllUser = async(req, res) => {
    try {
        const response = await prisma.user.findMany()
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
      }
}
export const getUserById = async(req, res) => {
   try {
        const result = await prisma.user.findUnique({
            where:{
                id_user: Number(req.params.id)
            }
        })
        res.status(200).json(result)
    } catch (error) {
        res.status(404).json({msg: error.message})
    }

}
export const addUser = async(req, res) => {
    try {
        const {nama,username,password,role} = req.body
        const result = await prisma.user.create({
            data: {
                nama_user: nama,
                username: username,
                password: md5(password),
            }
        })
        res.status(200).json({
            success: true,
            data: result
        })
    } catch (error) {
        console.log(error);
        res.json({
            msg: message.error
        })
    }
}
export const updateUser = async(req, res) => {try {
    const { nama, username, password } = req.body;

    // Pastikan id_user berupa Int
    const userId = parseInt(req.params.id);

    const result = await prisma.user.update({
        where: {
            id_user: userId,  // Menggunakan Int untuk id_user
        },
        data: {
            nama_user: nama,
            username: username,
            password: md5(password), // Menggunakan hash md5 untuk password
        },
    });

    res.status(200).json({
        pesan: "Data berhasil diupdate",
        success: true,
        data: result,
    });
} catch (error) {
    console.log(error);
    res.status(500).json({
        success: false,
        msg: error.message, // Menggunakan error.message untuk menangkap pesan error
    });
}

}
export const delateUser = async(req, res) => {
    try {
        const result = await prisma.user.delete({
            where:{
                id_user : Number(req.params.id)
            }
        })
        res.status(200).json({
            success: true,
            data: result
        })
    } catch (error) {
        console.log(error);
        res.json({
            msg: message.error
        })
    }
}