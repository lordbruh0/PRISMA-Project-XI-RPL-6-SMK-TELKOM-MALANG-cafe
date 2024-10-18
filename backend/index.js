import express from 'express';
import dotenv from 'dotenv';
import userRoute from './route/user.route.js';
import mejaRoute from './route/meja.route.js';
import transaksiRoute from './route/transaksi.route.js';
import menuRoute from './route/menu.route.js';

const app = express();

dotenv.config();
app.use(express.json());

app.use("/user", userRoute);
app.use("/meja", mejaRoute);
app.use("/transaksi", transaksiRoute);
app.use("/menu", menuRoute);

app.listen(process.env.APP_PORT, () => {
  console.log(`server running on port ${process.env.APP_PORT}`);
})