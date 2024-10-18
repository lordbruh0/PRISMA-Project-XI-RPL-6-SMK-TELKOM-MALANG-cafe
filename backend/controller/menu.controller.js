import { PrismaClient } from "@prisma/client";
import multer from "multer";

// Konfigurasi untuk penyimpanan file
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'uploads/'); // Tentukan folder tujuan penyimpanan
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Nama file unik
  }
});

// Buat instance multer
export const upload = multer({ storage: storage });

const prisma = new PrismaClient();

export const getAllMenu = async (_req, res) => {
  try {
    const result = await prisma.menu.findMany();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "An error occurred while fetching the menu.",
    });
  }
};

export const getMenuById = async (req, res) => {
  try {
    const result = await prisma.menu.findUnique({
      where: {
        id_menu: Number(req.params.id)
      },
    });
    res.status(200).json({
      success: true,  
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "An error occurred while fetching the menu by ID.",
    });
  }
};

export const addMenu = async (req, res) => {
  upload.single('filename')(req, res, async (error) => {
    if (error) {
      return res.status(400).json({ msg: error.message });
    } 
    
    if (!req.file) {
      return res.status(400).json({ msg: "Nothing to upload" });
    }
    
    console.log(req.file); // Tambahkan log ini untuk melihat detail file yang diunggah
    
    const { nama_menu, deskripsi, harga, jenis_menu } = req.body;
    const { filename } = req.file;
    
    try {
      const result = await prisma.menu.create({
        data: {
          nama_menu: nama_menu,
          jenis: jenis_menu,
          deskripsi: deskripsi,
          harga: Number(harga),
          gambar: filename,
        },
      });
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: error.message });
    }
  });
};

export const updateMenu = async (req, res) => {
  try {
    const { nama_menu, deskripsi, harga } = req.body;
    const result = await prisma.menu.update({
      where: {
        id_menu: req.params.id,
      },
      data: {
        nama_menu: nama_menu,
        deskripsi: deskripsi,
        harga: harga,
      },
    });
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "An error occurred while updating the menu.",
    });
  }
};

export const deleteMenu = async (req, res) => {
  try {
    const result = await prisma.menu.delete({
      where: {
        id_menu: Number(req.params.id),
      },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
