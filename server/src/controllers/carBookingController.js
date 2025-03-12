import prisma from '../models/prismaClient.js';

// สร้างการจองรถใหม่
export const createCarBooking = async (req, res) => {
  try {
    const { name, date, time, place, car } = req.body;

    const newCarBooking = await prisma.carBooking.create({
      data: {
        name,
        date,
        time,
        place,
        car,
      },
    });

    res.status(201).json(newCarBooking);
  } catch (error) {
    console.error("Error creating carBooking:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// ดึงข้อมูลการจองรถทั้งหมด
export const getCarBookings = async (req, res) => {
  try {
    const carBookings = await prisma.carBooking.findMany();
    res.json(carBookings);
  } catch (error) {
    console.error("Error fetching carBookings:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// อัปเดตการจองรถ
export const updateCarBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, date, time, place, car } = req.body;

    const updatedCarBooking = await prisma.carBooking.update({
      where: { id: parseInt(id) },
      data: { name, date, time, place, car },
    });

    res.json(updatedCarBooking);
  } catch (error) {
    console.error("Error updating carBooking:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// ลบการจองรถ
export const deleteCarBooking = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.carBooking.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "CarBooking deleted successfully" });
  } catch (error) {
    console.error("Error deleting carBooking:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};