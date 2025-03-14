import prisma from "../models/prismaClient.js";

// สร้างการลางานใหม่
export const createLeave = async (req, res) => {
  console.log("Received Data:", req.body); // ตรวจสอบข้อมูลที่ได้รับ
  const { employeeName, type, startDate, endDate, details } = req.body;

  // ตรวจสอบว่าข้อมูลครบถ้วน
  if (!employeeName || !type || !startDate || !endDate) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const leave = await prisma.leave.create({
      data: {
        employeeName,
        type,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        details: details || "", // หากไม่มี details ให้ใช้ค่าว่าง
        status: "Pending",
      },
    });
    res.status(201).json(leave);
  } catch (error) {
    console.error("Error creating leave:", error);
    res.status(400).json({ error: "Failed to create leave" });
  }
};

// ดึงข้อมูลการลางานทั้งหมด
export const getLeaves = async (req, res) => {
  try {
    const leaves = await prisma.leave.findMany();
    res.status(200).json(leaves);
  } catch (error) {
    res.status(400).json({ error: "Failed to fetch leaves" });
  }
};

// อัปเดตสถานะการลา (อนุมัติหรือปฏิเสธ)
export const updateLeaveStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    // ตรวจสอบว่า ID เป็นตัวเลขและมีค่าที่ถูกต้อง
    if (isNaN(parseInt(id))) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    // ตรวจสอบว่า status เป็นค่าที่ถูกต้อง
    if (!["Allowed", "Not Allowed"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    // อัปเดตสถานะการลา
    const leave = await prisma.leave.update({
      where: { id: parseInt(id) },
      data: { status },
    });

    // ส่งข้อมูลการลาที่อัปเดตแล้วกลับไป
    res.status(200).json(leave);
  } catch (error) {
    console.error("Error updating leave status:", error);
    res.status(500).json({ error: "Failed to update leave status" });
  }
};

// ลบการลางาน
export const deleteLeave = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.leave.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).json({ message: "Leave deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete leave" });
  }
};