import express from 'express';
import { getJobApplications, createJobApplication } from '../controllers/jobApplicationController.js';
import multer from 'multer';
import path from "path";

const router = express.Router();

// ตั้งค่า multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // บันทึกไฟล์ในโฟลเดอร์ `uploads`
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // ใช้ timestamp เป็นชื่อไฟล์
    }
});

const upload = multer({ storage });

router.get('/', getJobApplications);
router.post('/', upload.single("image"), createJobApplication);


export default router;