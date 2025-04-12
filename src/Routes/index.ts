import express from "express";
import { UserRouter } from "./userRoute";
import { AdminUserRouter } from "./adminUserRoute";
const router = express.Router();

router.use('/api/v1/users', UserRouter);
router.use('/api/v1/admin/users',AdminUserRouter)


export default router;