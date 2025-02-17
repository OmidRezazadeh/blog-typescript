import express from 'express';
import dotenv from 'dotenv'

console.log("ok");

dotenv.config();
const app = express();
app.use(express.json());