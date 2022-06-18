import { Router } from "express";
import roomController from './room.controller.js';

const router = Router();

router.get("/all", roomController.getAllPublic);
router.post("/createPublic", roomController.createPublic);
router.post("/createPrivate", roomController.createPrivate);
//router.post("/createPersonal", roomController.createPersonal);

export default router;