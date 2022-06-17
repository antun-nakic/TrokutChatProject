import { Router } from "express";
import userController from './user.controller.js';

const router = Router();

router.post("/setAvatar", userController.setAvatar);
router.post("/changePassword", userController.setPassword);

export default router;