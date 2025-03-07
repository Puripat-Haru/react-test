import express from "express";
import { register,login } from "../controllers/authController.js";

const router = express.Router();

// สมัครสมาชิก
router.post("/register", register);

// เข้าสู่ระบบ
router.post("/login", login);

export default router;