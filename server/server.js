import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

dotenv.config();
const app = express();
const prisma = new PrismaClient();
const PORT = 5000;
const SECRET_KEY = process .env.JWT_SECRET || "MY_SECRET_KEY";

app.use(cors());
app.use(express.json());

// API สมัครสมาชิก (Register)
app.post("/api/register", async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบ" });
    }

    try {
        // เช็คว่า email ซ้ำหรือไม่
        const existingEmail = await prisma.user.findUnique({ where: { email } });
        if (existingEmail) {
            return res.status(400).json({ message: "อีเมลนี้ถูกใช้ไปแล้ว" });
        }

        // เช็คว่า username ซ้ำหรือไม่
        const existingUser = await prisma.user.findUnique({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: "ชื่อผู้ใช้นี้ถูกใช้ไปแล้ว" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { username, email, password: hashedPassword },
        });

        res.json({ message: "สมัครสมาชิกสำเร็จ", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "เกิดข้อผิดพลาด", error });
    }
});

// API เข้าสู่ระบบ (Login)
app.post("/api/login",async (req, res) => {
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

// API ดึงข้อมูลผู้ใช้ (Protected Route)
app.get("/api/user", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
        res.json(user);
    } catch (error) {
        res.status(401).json({ message: "Token ไม่ถูกต้อง" });
    }
});

// เริ่มต้นเซิร์ฟเวอร์
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));