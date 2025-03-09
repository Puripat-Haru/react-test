import prisma from '../models/prismaClient.js';

export const getEmployees = async (req, res) => {
  try {
    const { email } = req.query; // ดึง email จาก query parameters
    let employees;

    if (email) {
      // ค้นหา employee ด้วย email
      employees = await prisma.employee.findMany({
        where: { email },
      });
    } else {
      // ดึงข้อมูล employees ทั้งหมด
      employees = await prisma.employee.findMany();
    }

    res.json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};