import express from 'express';
import dotenv from 'dotenv'
import { connectDB } from './Configs/database';



dotenv.config();
const app = express();
app.use(express.json());
connectDB();
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});