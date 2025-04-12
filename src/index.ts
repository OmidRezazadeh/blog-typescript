import express from 'express';
import dotenv from 'dotenv'
import { connectDB } from './Configs/database';
import { errorHandler } from "./Middlewares/errors"; 
import session from 'express-session';
import passport from 'passport';

import router from './Routes';

dotenv.config();
const app = express();
app.use(express.json());

app.use(router);

app.use(errorHandler);

app.use(session({
    secret:process.env.JWT_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // set to true if using HTTPS
  }));
  
  app.use(passport.initialize());
  app.use(passport.session());

connectDB();
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});