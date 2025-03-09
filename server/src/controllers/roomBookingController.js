import prisma from '../models/prismaClient.js';

// สร้างการจองใหม่
export const createRoomBooking = async (req, res) => {
  try {
    const { name, date, time } = req.body;

    const newRoomBooking = await prisma.roomBooking.create({
      data: {
        name,
        date,
        time,
      },
    });

    res.status(201).json(newRoomBooking); // ส่งข้อมูลที่สร้างแล้วกลับไป
  } catch (error) {
    console.error("Error creating roomBooking:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// ดึงข้อมูลการจองทั้งหมด
export const getRoomBookings = async (req, res) => {
  try {
    const roomBookings = await prisma.roomBooking.findMany();
    res.json(roomBookings);
  } catch (error) {
    console.error("Error fetching roomBookings:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// อัปเดตการจอง
export const updateRoomBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, date, time } = req.body;

    const updatedRoomBooking = await prisma.roomBooking.update({
      where: { id: parseInt(id) },
      data: { name, date, time },
    });

    res.json(updatedRoomBooking);
  } catch (error) {
    console.error("Error updating roomBooking:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// ลบการจอง
export const deleteRoomBooking = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.roomBooking.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "roomBooking deleted successfully" });
  } catch (error) {
    console.error("Error deleting roomBooking:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};