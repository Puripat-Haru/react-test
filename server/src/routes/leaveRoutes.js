import express from "express";
import {
  createLeave,
  getLeaves,
  updateLeaveStatus,
  deleteLeave,
} from "../controllers/leaveController.js";

const router = express.Router();

// สร้างการลางานใหม่
router.post("/", createLeave);

// ดึงข้อมูลการลางานทั้งหมด
router.get("/", getLeaves);

// อัปเดตสถานะการลา
router.put("/:id/status", updateLeaveStatus);

// ลบการลางาน
router.delete("/:id", deleteLeave);

export default router;