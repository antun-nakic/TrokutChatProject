import { Router } from "express";
import subscriptionController from './subscription.controller.js';

const router = Router();

router.get("/allPersonal/:name", subscriptionController.getAllPersonal);
router.get("/allPrivate/:name", subscriptionController.getAllPrivate);
router.post("/joinPrivate", subscriptionController.joinPrivate);
router.post("/createPersonal", subscriptionController.createPersonal);


export default router;