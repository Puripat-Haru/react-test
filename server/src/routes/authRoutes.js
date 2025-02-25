import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const { hash } = bcrypt;
const router = express.Router();
const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || "MY_SECRET_KEY";

// สมัครสมาชิก
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบ" });
    }

    try {
        const existingEmail = await prisma.user.findUnique({ where: { email } });
        if (existingEmail) {
            return res.status(400).json({ message: "อีเมลนี้ถูกใช้ไปแล้ว" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { username, email, password: hashedPassword },
        });

        res.json({ message: "สมัครสมาชิกสำเร็จ", user });
    } catch (error) {
        res.status(500).json({ message: "เกิดข้อผิดพลาด", error });
    }
});

// เข้าสู่ระบบ
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "กรุณากรอกอีเมลและรหัสผ่าน" });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        return res.status(401).json({ message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });
    }

    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ success: true, message: "เข้าสู่ระบบสำเร็จ", token, user });
});

export default router;