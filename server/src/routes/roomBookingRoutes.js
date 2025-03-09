import express from 'express';
import {
    createRoomBooking,
    getRoomBookings,
    updateRoomBooking,
    deleteRoomBooking,
  } from '../controllers/roomBookingController.js';

const router = express.Router();

// สร้างการจองใหม่
router.post('/roomBookings', createRoomBooking);

// ดึงข้อมูลการจองทั้งหมด
router.get('/roomBookings', getRoomBookings);

// อัปเดตการจอง
router.put('/roomBookings/:id', updateRoomBooking);

// ลบการจอง
router.delete('/roomBookings/:id', deleteRoomBooking);

export default router;