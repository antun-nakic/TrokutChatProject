import { Router } from "express";
import userController from './user.controller.js';

const router = Router();

router.get("/all", userController.getAll);
router.get("/id/:id", userController.getById);
router.get("/name/:name", userController.getByName);
router.post("/setAvatar", userController.setAvatar);
router.post("/changePassword", userController.setPassword);

export default router;