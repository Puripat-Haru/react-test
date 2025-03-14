import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";

const LeaveForm = () => {
  // const navigate = useNavigate();

  const [formData, setFormData] = useState({
    employeeName: "", // ชื่อผู้ลา
    type: "", // ประเภทการลา
    startDate: "", // วันที่เริ่มลา
    endDate: "", // วันที่สิ้นสุดลา
    details: "", // รายละเอียดเพิ่มเติม
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData); // ตรวจสอบข้อมูลก่อนส่ง
    try {
      const response = await axios.post("http://localhost:5000/api/leaves", {
        ...formData,
      });
      if (response.status === 201) {
        alert("ส่งใบลาสำเร็จ!");
        // navigate("/work/Leave");
      }
    } catch (error) {
      console.error("Failed to submit leave:", error);
      alert("ส่งใบลาไม่สำเร็จ กรุณาลองอีกครั้ง");
    }
  };

  return (
    <div className="min-h-screen bg-[#b4b2af] flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center">แบบฟอร์มใบลา</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ชื่อผู้ลา */}
          <div>
            <label className="block text-gray-700">ชื่อผู้ลา</label>
            <input
              type="text"
              name="employeeName"
              value={formData.employeeName}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="กรอกชื่อผู้ลา"
              required
            />
          </div>

          {/* ประเภทการลา */}
          <div>
            <label className="block text-gray-700">ประเภทการลา</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">เลือกประเภทการลา</option>
              <option value="Sick Leave">ลาป่วย</option>
              <option value="Private Leave">ลากิจ</option>
              <option value="Annual Leave">ลาพักร้อน</option>
            </select>
          </div>

          {/* วันที่เริ่มลา */}
          <div>
            <label className="block text-gray-700">วันที่เริ่มลา</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* วันที่สิ้นสุดลา */}
          <div>
            <label className="block text-gray-700">วันที่สิ้นสุดลา</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* รายละเอียดเพิ่มเติม */}
          <div>
            <label className="block text-gray-700">รายละเอียดเพิ่มเติม</label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="กรอกรายละเอียดเพิ่มเติม (ถ้ามี)"
            ></textarea>
          </div>

          {/* ปุ่มส่งแบบฟอร์ม */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
            >
              ส่งใบลา
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveForm;