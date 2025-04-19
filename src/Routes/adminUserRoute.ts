import express from "express";
import {authenticated} from "../Middlewares/auth";
import { AdminUsersController } from "../Controllers/Admin/AdminUsersController";
import { checkAdminRoleMiddleware } from "../Middlewares/checkRoleAdmin";
export const AdminUserRouter = express.Router();

AdminUserRouter.get('/list/:id?',
    authenticated as express.RequestHandler, 
    checkAdminRoleMiddleware as express.RequestHandler ,
    AdminUsersController.list.bind(AdminUsersController))