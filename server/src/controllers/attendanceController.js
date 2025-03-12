import prisma from '../models/prismaClient.js';

// ดึงข้อมูลการลงเวลาทั้งหมด
export const getAttendances = async (req, res) => {
  try {
    const attendances = await prisma.attendance.findMany({
      include: {
        employee: true, // รวมข้อมูลพนักงาน
      },
    });
    res.json(attendances);
  } catch (error) {
    console.error("Error fetching attendances:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// เข้างาน
export const checkIn = async (req, res) => {
  try {
    const { employeeId } = req.body;
    const currentTime = new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const currentDate = new Date().toLocaleDateString('th-TH');

    // เช็คว่าพนักงานเข้างานแล้วหรือยัง
    const existingAttendance = await prisma.attendance.findFirst({
      where: {
        employeeId: parseInt(employeeId),
        date: currentDate,
        checkOut: null,
      },
    });

    if (existingAttendance) {
      return res.status(400).json({ error: "พนักงานนี้ได้เข้างานแล้ว" });
    }

    // กำหนดสถานะเป็น "กำลังทำงาน" โดยไม่สนใจเวลา
    const status = 'กำลังทำงาน';

    const newAttendance = await prisma.attendance.create({
      data: {
        employeeId: parseInt(employeeId),
        date: currentDate,
        checkIn: currentTime,
        status,
      },
    });

    res.status(201).json(newAttendance);
  } catch (error) {
    console.error("Error checking in:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// เลิกงาน
export const checkOut = async (req, res) => {
  try {
    const { employeeId } = req.body;
    const currentTime = new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const currentDate = new Date().toLocaleDateString('th-TH');

    // หาข้อมูลการเข้างานล่าสุด
    const attendance = await prisma.attendance.findFirst({
      where: {
        employeeId: parseInt(employeeId),
        date: currentDate,
        checkOut: null,
      },
    });

    if (!attendance) {
      return res.status(400).json({ error: "ไม่พบข้อมูลการเข้างาน" });
    }

    // ตรวจสอบเวลาเข้างานเพื่อกำหนดสถานะ
    let status;
    if (attendance.checkIn <= '09:00:00') {
      status = 'ปกติ'; // เข้างานก่อน 9:00 น.
    } else {
      status = 'มาสาย'; // เข้างานหลัง 9:00 น.
    }

    // อัปเดตเวลาออกและสถานะ
    const updatedAttendance = await prisma.attendance.update({
      where: { id: attendance.id },
      data: {
        checkOut: currentTime,
        status,
      },
    });

    res.json(updatedAttendance);
  } catch (error) {
    console.error("Error checking out:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};