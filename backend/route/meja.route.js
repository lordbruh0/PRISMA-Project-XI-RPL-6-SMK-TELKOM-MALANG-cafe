import express from 'express';
import {
  getAllMeja,
  getMejaById,
  addMeja,
  updateMeja,
  delateMeja
} from "../controller/meja.controller.js";

const app = express();

app.use(express.json());

app.get("/", getAllMeja);
app.get("/:id", getMejaById);
app.post("/", addMeja);
app.put("/:id", updateMeja);
app.delete("/:id", delateMeja);

export default app;