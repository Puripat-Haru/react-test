import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || "MY_SECRET_KEY";

// สมัครสมาชิก (สำหรับพนักงาน)
export const register = async (req, res) => {
    const { name, email, password, position, phone } = req.body;

    // ตรวจสอบว่าข้อมูลครบถ้วนหรือไม่
    if (!name || !email || !password || !position || !phone) {
        return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบ" });
    }

    try {
        // ตรวจสอบว่าอีเมลนี้ถูกใช้ไปแล้วหรือไม่
        const existingEmail = await prisma.employee.findUnique({ where: { email } });
        if (existingEmail) {
            return res.status(400).json({ message: "อีเมลนี้ถูกใช้ไปแล้ว" });
        }

        // Hash รหัสผ่าน
        const hashedPassword = await bcrypt.hash(password, 10);

        // สร้างพนักงานใหม่
        const employee = await prisma.employee.create({
            data: {
                name,
                email,
                password: hashedPassword,
                position,
                phone
            },
        });

        // ส่งข้อมูลพนักงานกลับไป
        res.json({ message: "สมัครสมาชิกสำเร็จ", employee });
    } catch (error) {
        console.error("Error during rigistration:", error);
        res.status(500).json({ message: "เกิดข้อผิดพลาดในการสมัครสมาชิก", error });
    }
};

// เข้าสู่ระบบ (สำหรับพนักงาน)
export const login = async (req, res) => {
    const { email, password } = req.body;

    console.log("Email from frontend:", email); // Debug
    console.log("Password from frontend:", password); // Debug

    // ตรวจสอบว่าข้อมูลครบถ้วนหรือไม่
    if (!email || !password) {
        return res.status(400).json({ message: "กรุณากรอกอีเมลและรหัสผ่าน" });
    }

    try {
        // ค้นหาพนักงานด้วยอีเมล
        const employee = await prisma.employee.findUnique({ where: { email } });
        if (!employee) {
            console.log("Employee not found in database"); // Debug
            return res.status(401).json({ message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });
        }

        console.log("Employee found:", employee); // Debug

        // ตรวจสอบรหัสผ่าน
        const isMatch = await bcrypt.compare(password, employee.password);
        console.log("Password match:", isMatch); // Debug
        if (!isMatch) {
            console.log("Password from frontend:", password); // Debug
            console.log("Hashed password from database:", employee.password); // Debug
            return res.status(401).json({ message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });
        }

        // สร้าง token
        const token = jwt.sign({ userId: employee.id }, SECRET_KEY, { expiresIn: "1h" });

        // ส่งข้อมูลพนักงานและ token กลับไป
        res.json({
            success: true,
            message: "เข้าสู่ระบบสำเร็จ",
            token,
            user: {
                id: employee.id,
                name: employee.name,
                email: employee.email,
                position: employee.position,
                phone: employee.phone
            },
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "เกิดข้อผิดพลาดในการเข้าสู่ระบบ" });
    }
};
