import express from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || "MY_SECRET_KEY";

// ดึงข้อมูลผู้ใช้
router.get("/", async (req, res) => {
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

export default router;
