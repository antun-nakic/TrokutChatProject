import {Router} from "express";
import {insertNewUser,loginUser} from './auth.controller.js';

const router = Router();

router.post("/register", insertNewUser);
router.post("/login", loginUser);

export default router;