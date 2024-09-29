import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import cookieParser from 'cookie-parser';

import router from './routes/index.js';

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
// app.use(cors());

app.use(express.json());

const PORT = 5000 || process.env.PORT;

app.use('/api', router);

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log('connected to db');
    console.log(`server is running localhost ${PORT}`);
  });
});
