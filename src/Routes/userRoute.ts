import express from "express";

import { UsersController } from "../Controllers/Client/UsersController";
import {authenticated} from "../Middlewares/auth";
export const UserRouter = express.Router();

UserRouter.post('/register', UsersController.register.bind(UsersController));
UserRouter.post('/login', UsersController.login.bind(UsersController));
UserRouter.post('/test', authenticated as express.RequestHandler, UsersController.test.bind(UsersController));
