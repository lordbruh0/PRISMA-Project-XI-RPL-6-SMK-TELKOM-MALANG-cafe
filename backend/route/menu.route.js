import express from 'express';
import {
  getAllMenu,
  getMenuById,
  addMenu,
  updateMenu,
  deleteMenu
} from "../controller/menu.controller.js";
import { upload } from "../controller/menu.controller.js";

const app = express();

app.use(express.json());

app.get("/", getAllMenu);
app.get("/:id", getMenuById);
app.post("/", addMenu, upload.single("filename"));
app.put("/:id", updateMenu);
app.delete("/:id", deleteMenu);

export default app;