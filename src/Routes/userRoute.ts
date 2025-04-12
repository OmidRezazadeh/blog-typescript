import express from "express";

import { UsersController } from "../Controllers/Client/UsersController";
import {authenticated} from "../Middlewares/auth";
import { apiRateLimiter } from "../Middlewares/rateLimiter";
import { AdminUsersController } from "../Controllers/Admin/AdminUsersController";
import { checkAdminRoleMiddleware } from "../Middlewares/checkRoleAdmin";

export const UserRouter = express.Router();

UserRouter.post('/register', UsersController.register.bind(UsersController));
UserRouter.post('/login',apiRateLimiter ,UsersController.login.bind(UsersController));
UserRouter.get('/get-user', authenticated as express.RequestHandler, UsersController.getUser.bind(UsersController));
