import express from 'express';
import { getEmployees } from '../controllers/employeeController.js'; // อย่าลืมใส่ .js

const router = express.Router();

// กำหนด route สำหรับ GET /api/employees
router.get('/employees', getEmployees);

export default router;