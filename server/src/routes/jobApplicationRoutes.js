import express from 'express';
import { 
    getJobApplications, 
    createJobApplication,
    updateJobApplicationStatus,
    promoteToEmployee,
    getJobApplicationsById,
    deleteJobApplication
} from '../controllers/jobApplicationController.js';
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
router.get('/:id', getJobApplicationsById);
router.post('/', upload.single("image"), createJobApplication);
router.put('/:id/status',updateJobApplicationStatus);
router.post('/:id/promote', promoteToEmployee);
router.delete('/:id', deleteJobApplication);

export default router;