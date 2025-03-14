import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import multer from "multer";
import { fileURLToPath } from "url";
import path from "path";

// นำเข้า routes
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import jobApplicationRoutes from "./src/routes/jobApplicationRoutes.js";
import employeeRoutes from "./src/routes/employeeRoutes.js";
import roomBookingRoutes from "./src/routes/roomBookingRoutes.js";
import carBookingRoutes from "./src/routes/carBookingRoutes.js";
import attendanceRoutes from "./src/routes/attendanceRoutes.js";
import leaveRoutes from "./src/routes/leaveRoutes.js"

dotenv.config();
console.log("DATABASE_URL:", process.env.DATABASE_URL); // ตรวจสอบค่า .env

const app = express();
const PORT = 5000;

// ตั้งค่าการอัปโหลดไฟล์
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // กำหนดให้บันทึกไฟล์ในโฟลเดอร์ `uploads`
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // ตั้งชื่อไฟล์เป็น timestamp + นามสกุลเดิม
    }
});

const upload = multer({ storage });

// Route สำหรับอัปโหลดไฟล์
app.post("/uploads", upload.single("image"), (req, res) => {
    try {
        const file = req.file; // ไฟล์ที่อัปโหลด
        if (!file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        res.json({ message: "File uploaded successfully", file: file.filename });
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

// แปลง import.meta.url เป็น path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // รองรับ form-data

// ใช้ routes ที่แยกไว้
app.use("/api", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/job-applications", jobApplicationRoutes); // ใช้ jobApplicationRoutes ที่ถูกต้อง
app.use("/api", employeeRoutes);
app.use("/api", roomBookingRoutes);
app.use('/api', carBookingRoutes);
app.use('/api', attendanceRoutes);
app.use("/api/leaves", leaveRoutes);

// ให้บริการไฟล์สแตติกจากโฟลเดอร์ uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// เริ่มต้นเซิร์ฟเวอร์
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});