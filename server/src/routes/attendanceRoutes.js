import express from 'express';
import {
    getAttendances,
    checkIn,
    checkOut,
} from '../controllers/attendanceController.js'

const router = express.Router();

// ดึงข้อมูลการลงเวลาทั้งหมด
router.get('/attendances', getAttendances);

// เข้างาน
router.post('/attendances/check-in', checkIn);

// เลิกงาน
router.post('/attendances/check-out', checkOut);

export default router;