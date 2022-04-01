import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import config from './config';
import baseRouter from './routers/baseRouter';
import oAuthRepository from './repositories/oAuthRepository';
import errorMiddleware from './middlewares/errorMiddleware';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors({ credentials: true, origin: config.CLIENT_URL }));

app.use('/api', baseRouter);
app.use(errorMiddleware);

app.listen(config.SERVER_PORT, async () => {
  oAuthRepository.init();
  await mongoose.connect(process.env.DB_URL as string);
  console.log(`Server has been started on port ${config.SERVER_PORT} ...`);
});
