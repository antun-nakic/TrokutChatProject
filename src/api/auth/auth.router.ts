import { Router } from "express";
import authController from './auth.controller.js';

const router = Router();

router.post("/register", authController.createNewUser);
router.post("/login", authController.loginUser);

export default router;