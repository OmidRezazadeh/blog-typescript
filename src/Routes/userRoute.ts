import express from "express";

import { UsersController } from "../Controllers/Client/UsersController";

export const UserRouter = express.Router();

UserRouter.post('/register', UsersController.register.bind(UsersController));

