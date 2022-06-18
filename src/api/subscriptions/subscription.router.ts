import { Router } from "express";
import subscriptionController from './subscription.controller.js';

const router = Router();


//router.get("/all", roomController.getAllPublic);
//router.post("/createPublic", roomController.createPublic);
router.post("/joinPrivate", subscriptionController.joinPrivate);
//router.post("/createPersonal", roomController.createPersonal);


export default router;