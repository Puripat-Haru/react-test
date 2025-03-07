import prisma from "../models/prismaClient.js";
import fs from 'fs'; // นำเข้าโมดูล fs สำหรับจัดการไฟล์
import { fileURLToPath } from 'url'; // นำเข้า fileURLToPath จากโมดูล url
import path from 'path'; // นำเข้า path
import bcrypt from "bcrypt";

// กำหนด __dirname ใน ES Modules
const __filename = fileURLToPath(import.meta.url); // แปลง import.meta.url เป็น path
const __dirname = path.dirname(__filename); // หา directory name จาก path

// GET All Job Applications
export const getJobApplications = async (req, res) => {
    try {
        const jobs = await prisma.jobApplication.findMany();
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
};

// GET Job Application by ID
export const getJobApplicationsById = async (req, res) => {
    const { id } = req.params;

    try {
        const jobApplication = await prisma.jobApplication.findUnique({
            where: { id: parseInt(id) },
        });

        if (!jobApplication) {
            return res.status(404).json({ error: "Job application not found" });
        }

        res.json(jobApplication);
    } catch (error) {
        return res.status(500).json({ error: "Something went wrong" });
    }
};

// Update Job Application Status
export const updateJobApplicationStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const updateJob = await prisma.jobApplication.update({
            where: { id: parseInt(id) },
            data: { status },
        });

        res.json(updateJob);
    } catch (error) {
        console.error("Error updating job application status:", error);
        res.status(400).json({ error: "Could not update status", details: error.message });
    }
};

// Promote Job Application to Employee
export const promoteToEmployee = async (req, res) => {
    const { id } = req.params;

    try {
        const candidate = await prisma.jobApplication.findUnique({
            where: { id: parseInt(id) },
        });

        if (!candidate) {
            return res.status(404).json({ error: "Candidate not found" });
        }

        // Hash รหัสผ่าน
        const hashedPassword = candidate.password;

        // Create a new employee
        const newEmployee = await prisma.employee.create({
            data: {
                name: `${candidate.firstName} ${candidate.lastName}`,
                email: candidate.email,
                password: hashedPassword,
                position: candidate.desiredPosition,
                phone: candidate.phone,
            },
        });

        // Delete the job application
        await prisma.jobApplication.delete({
            where: { id: parseInt(id) },
        });

        res.json(newEmployee);
    } catch (error) {
        console.error("Error promoting to employee:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

// DELETE Job Application
export const deleteJobApplication = async (req, res) => {
    const { id } = req.params;

    try {
        // ดึงข้อมูลผู้สมัครงานจากฐานข้อมูล
        const candidate = await prisma.jobApplication.findUnique({
            where: { id: parseInt(id) },
        });

        if (!candidate) {
            return res.status(404).json({ error: "Job application not found" });
        }

        // ลบไฟล์รูปภาพจากโฟลเดอร์ uploads (ถ้ามี)
        if (candidate.image && candidate.image !== "default-image.jpg") {
            const imagePath = path.join(__dirname, '..', '..', 'uploads', candidate.image); // สร้าง path ของไฟล์รูปภาพ
            console.log("Image Path:", imagePath); // Debug path ของไฟล์
            if (fs.existsSync(imagePath)) { // ตรวจสอบว่าไฟล์มีอยู่หรือไม่
                console.log("File exists, deleting..."); // Debug ไฟล์มีอยู่
                fs.unlinkSync(imagePath); // ลบไฟล์
            } else {
                console.log("File does not exist:", imagePath); // Debug ไฟล์ไม่มีอยู่
            }
        }

        // ลบข้อมูลผู้สมัครงานจากฐานข้อมูล
        await prisma.jobApplication.delete({
            where: { id: parseInt(id) },
        });

        res.json({ message: "Job application deleted successfully" });
    } catch (error) {
        console.error("Error deleting job application:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

// POST Create a Job Application
export const createJobApplication = async (req, res) => {
    try {
        console.log("Request Data:", req.body); // Debug log
        console.log("Uploaded File:", req.file); // Debug log เพื่อตรวจสอบไฟล์ที่อัปโหลด

        // Hash รหัสผ่าน
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // แปลงค่าก่อนส่งเข้า Prisma
        const requestData = {
            ...req.body,
            applyDate: req.body.applyDate ? new Date(req.body.applyDate) : undefined,
            birthDate: req.body.birthDate ? new Date(req.body.birthDate) : undefined,
            expectedSalary: parseInt(req.body.expectedSalary, 10) || 0,  // แปลงเป็น number
            age: parseInt(req.body.age, 10) || 0,  // แปลงเป็น number
            moo: req.body.moo === "_" ? null : req.body.moo,
            image: req.file ? req.file.filename : null, // ใช้ไฟล์ที่อัปโหลด หรือค่าดีฟอลต์
            idCardCopy: req.body.idCardCopy === "true",
            houseRegistration: req.body.houseRegistration === "true",
            certificateCopy: req.body.certificateCopy === "true",
            bankBookCopy: req.body.bankBookCopy === "true",
            otherDocuments: req.body.otherDocuments === "true",
            password: hashedPassword, // ใช้รหัสผ่านที่ hash แล้ว
        };

        console.log("Transformed Data:", requestData); // Debug log

        const newJob = await prisma.jobApplication.create({
            data: requestData,
        });

        res.json(newJob);
    } catch (error) {
        console.error("Error creating job application:", error);
        res.status(400).json({ error: "Invalid data", details: error.message });
    }
};