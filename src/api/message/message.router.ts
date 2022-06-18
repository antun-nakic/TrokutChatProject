import { Router} from "express";
import messageController from "./message.controller.js";

const router = Router();

router.post("/addMessage", messageController.addMessage)
router.get("/publicMessage", messageController.getPublicMessages)
router.post("/privateMessage", messageController.getPrivateMessages)
router.post("/personalMessage", messageController.getPersonalMessages)

/*
- add message
- get message from public
- get message from private
- get message from personal
- 
*/