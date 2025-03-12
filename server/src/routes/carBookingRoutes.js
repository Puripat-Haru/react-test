import express from 'express';
import {
  createCarBooking,
  getCarBookings,
  updateCarBooking,
  deleteCarBooking,
} from '../controllers/carBookingController.js';

const router = express.Router();

// สร้างการจองรถใหม่
router.post('/carBookings', createCarBooking);

// ดึงข้อมูลการจองรถทั้งหมด
router.get('/carBookings', getCarBookings);

// อัปเดตการจองรถ
router.put('/carBookings/:id', updateCarBooking);

// ลบการจองรถ
router.delete('/carBookings/:id', deleteCarBooking);

export default router;