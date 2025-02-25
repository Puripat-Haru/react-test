import prisma from "../models/prismaClient.js";

// GET All Job Applications
export const getJobApplications = async (req, res) => {
    try {
        const jobs = await prisma.jobApplication.findMany();
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
};

// POST Create a Job Application
export const createJobApplication = async (req, res) => {
    try {
        console.log("Request Data:", req.body); // Debug log
        console.log("Uploaded File:", req.file); // Debug log เพื่อตรวจสอบไฟล์ที่อัปโหลด

        // แปลงค่าก่อนส่งเข้า Prisma
        const requestData = {
            ...req.body,
            applyDate: req.body.applyDate ? new Date(req.body.applyDate) : undefined,
            birthDate: req.body.birthDate ? new Date(req.body.birthDate) : undefined,
            expectedSalary: parseInt(req.body.expectedSalary, 10) || 0,  // แปลงเป็น number
            age: parseInt(req.body.age, 10) || 0,  // แปลงเป็น number
            moo: req.body.moo === "_" ? null : req.body.moo,
            image: req.file ? req.file.filename : "default-image.jpg", // ใช้ไฟล์ที่อัปโหลด หรือค่าดีฟอลต์
            idCardCopy: req.body.idCardCopy === "true",
            houseRegistration: req.body.houseRegistration === "true",
            certificateCopy: req.body.certificateCopy === "true",
            bankBookCopy: req.body.bankBookCopy === "true",
            otherDocuments: req.body.otherDocuments === "true",
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