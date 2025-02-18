import express from 'express';
import dotenv from 'dotenv'
import { connectDB } from './Configs/database';
import { UserRouter } from "./Routes/userRoute";
import { errorHandler } from "./Middlewares/errors"; // Importing error handling middleware


dotenv.config();
const app = express();
app.use(express.json());
app.use('/api/v1/users', UserRouter);
app.use(errorHandler);
connectDB();
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});