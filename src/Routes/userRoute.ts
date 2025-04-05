import express from "express";

import { UsersController } from "../Controllers/Client/UsersController";
import {authenticated} from "../Middlewares/auth";
import { apiRateLimiter } from "../Middlewares/rateLimiter";
export const UserRouter = express.Router();

UserRouter.post('/register', UsersController.register.bind(UsersController));
UserRouter.post('/login',apiRateLimiter ,UsersController.login.bind(UsersController));
UserRouter.post('/test', authenticated as express.RequestHandler, UsersController.test.bind(UsersController));
