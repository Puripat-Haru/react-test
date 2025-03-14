import React, { useState, useEffect } from "react";
import { Search, Calendar, CheckCircle, XCircle } from "lucide-react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";

const Leave = () => {
  const [activeTab, setActiveTab] = useState("รายการการลา"); // เพิ่ม state สำหรับสลับหน้า
  const [selectedLeaveType, setSelectedLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [leaves, setLeaves] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user ? user.name : "Firstname Lastname";

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/leaves");
      setLeaves(response.data);
    } catch (error) {
      console.error("Failed to fetch leaves:", error);
    }
  };

  const handleApprove = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/leaves/${id}/status`,
        { status: "Allowed" }
      );

      if (response.status === 200) {
        // ดึงข้อมูลใหม่จากเซิร์ฟเวอร์
        await fetchLeaves();
        alert("Leave approved successfully!");
      }
    } catch (error) {
      console.error("Failed to approve leave:", error);
      alert("Failed to approve leave. Please try again.");
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/leaves/${id}/status`,
        { status: "Not Allowed" }
      );

      if (response.status === 200) {
        // ดึงข้อมูลใหม่จากเซิร์ฟเวอร์
        await fetchLeaves();
        alert("Leave rejected successfully!");
      }
    } catch (error) {
      console.error("Failed to reject leave:", error);
      alert("Failed to reject leave. Please try again.");
    }
  };

  // ส่วนของ LeaveFilter
  const LeaveFilter = () => {
    return (
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search for Name"
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-md"
          />
        </div>

        <div className="relative">
          <select
            value={selectedLeaveType}
            onChange={(e) => setSelectedLeaveType(e.target.value)}
            className="appearance-none bg-white border rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a leave type</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Private Leave">Private Leave</option>
            <option value="Annual Leave">Annual Leave</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-600">Date Range</span>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded-md px-3 py-2"
          />
          <span>—</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded-md px-3 py-2"
          />
          <Calendar className="text-gray-400 w-5 h-5" />
        </div>

        <button className="bg-blue-500 text-white px-8 py-2 rounded-md hover:bg-blue-600">
          Search
        </button>
      </div>
    );
  };

  // ส่วนของ LeaveTable
  const LeaveTable = () => {
    const filteredLeaves = selectedLeaveType
      ? leaves.filter((leave) => leave.type === selectedLeaveType && leave.status === "Pending")
      : leaves.filter((leave) => leave.status === "Pending");

    return (
      <div className="bg-gray-50 rounded-lg mt-4">
        <div className="grid grid-cols-12 py-3 px-4 bg-gray-100 rounded-t-lg sticky top-0">
          <div className="col-span-3 text-gray-700">Employee name</div>
          <div className="col-span-2 text-gray-700">Leave type</div>
          <div className="col-span-3 text-gray-700">Date</div>
          <div className="col-span-3 text-gray-700">รายละเอียดเพิ่มเติม</div>
          <div className="col-span-1 text-gray-700">Action</div>
        </div>
        <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
          {filteredLeaves.map((leave, index) => (
            <div key={index} className="grid grid-cols-12 py-3 px-4 border-b">
              <div className="col-span-3">{leave.employeeName}</div>
              <div className="col-span-2">{leave.type}</div>
              <div className="col-span-3">
                {new Date(leave.startDate).toLocaleDateString()} -{" "}
                {new Date(leave.endDate).toLocaleDateString()}
              </div>
              <div className="col-span-3">{leave.details || "ไม่มีรายละเอียดเพิ่มเติม"}</div>
              <div className="col-span-1 flex gap-1">
                <button
                  onClick={() => handleApprove(leave.id)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </button>
                <button
                  onClick={() => handleReject(leave.id)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <XCircle className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ส่วนของ LeaveHistory (หน้าเก็บประวัติการลา)
  const LeaveHistory = () => {
    const historyLeaves = leaves.filter(
      (leave) => leave.status === "Allowed" || leave.status === "Not Allowed"
    );

    return (
      <div className="bg-gray-50 rounded-lg mt-4 p-6">
        <h2 className="text-xl font-bold mb-4">ประวัติการลา</h2>
        <div className="grid grid-cols-12 py-3 px-4 bg-gray-100 rounded-t-lg sticky top-0">
          <div className="col-span-3 text-gray-700">Employee name</div>
          <div className="col-span-2 text-gray-700">Leave type</div>
          <div className="col-span-3 text-gray-700">Date</div>
          <div className="col-span-3 text-gray-700">รายละเอียดเพิ่มเติม</div>
          <div className="col-span-1 text-gray-700">สถานะ</div>
        </div>
        <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
          {historyLeaves.map((leave, index) => (
            <div key={index} className="grid grid-cols-12 py-3 px-4 border-b">
              <div className="col-span-3">{leave.employeeName}</div>
              <div className="col-span-2">{leave.type}</div>
              <div className="col-span-3">
                {new Date(leave.startDate).toLocaleDateString()} -{" "}
                {new Date(leave.endDate).toLocaleDateString()}
              </div>
              <div className="col-span-3">{leave.details || "ไม่มีรายละเอียดเพิ่มเติม"}</div>
              <div className="col-span-1">
                <span
                  className={`px-2 py-1 rounded-full text-sm ${leave.status === "Allowed"
                    ? "bg-green-100 text-green-600"
                    : leave.status === "Not Allowed"
                      ? "bg-red-100 text-red-600"
                      : "bg-yellow-100 text-yellow-600"
                    }`}
                >
                  {leave.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-[#b4b2af]">
      <Sidebar />
      <div className="ml-[250px] w-[calc(100%-250px)] p-6 h-screen">
        {/* Header สำหรับสลับหน้า */}
        <div className="flex justify-end mb-4">
          <div className="bg-gray-600 text-white px-4 py-1 rounded-full text-sm">
            {userName}
          </div>
        </div>

        {/* ปุ่มสำหรับสลับหน้า */}
        <div className="border-b bg-[#b4b2af]">
          <div className="flex">
            <button
              onClick={() => setActiveTab("รายการการลา")}
              className={`px-8 py-3 text-black ${activeTab === "รายการการลา" ? "bg-gray-100" : "bg-[#dad8d7]"
                }`}
            >
              รายการการลา
            </button>
            <button
              onClick={() => setActiveTab("ประวัติการลา")}
              className={`px-8 py-3 text-black ${activeTab === "ประวัติการลา" ? "bg-gray-100" : "bg-[#dad8d7]"
                }`}
            >
              ประวัติการลา
            </button>
          </div>
        </div>

        {/* แสดงเนื้อหาตาม activeTab */}
        <div className="bg-white shadow p-6 h-[calc(100%-110px)] overflow-y-auto">
          {activeTab === "รายการการลา" ? (
            <>
              <LeaveFilter />
              <LeaveTable />
            </>
          ) : (
            <LeaveHistory />
          )}
        </div>
      </div>
    </div>
  );
};

export default Leave;