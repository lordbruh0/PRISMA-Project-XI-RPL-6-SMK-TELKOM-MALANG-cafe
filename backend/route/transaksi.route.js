import express from 'express';
import {
  CreateTransaction
} from "../controller/transaksi_controller.js";

const app = express();

app.use(express.json());

app.post("/", CreateTransaction);

export default app;