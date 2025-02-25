import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";

// นำเข้า routes
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import jobApplicationRoutes from "./src/routes/jobApplicationRoutes.js";

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
        cb(null, Date.now() + path.extname(file.originalname)); // ตั้งช่อไฟล์เป็น timestamp + นามสกุลเดิม
    }
});

const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());

app.use('/api', jobApplicationRoutes);
app.use(express.urlencoded({ extended: true })); // รองรับ form-data

// ใช้ routes ที่แยกไว้
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

console.log("Registering jobApplicationRoutes..."); 
app.use("/api/job-applications", jobApplicationRoutes);

app.use("/uploads", express.static("uploads"));

// เริ่มต้นเซิร์ฟเวอร์
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});