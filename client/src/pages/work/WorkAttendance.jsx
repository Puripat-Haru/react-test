import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';

const WorkAttendance = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const userName = user ? user.name : 'Firstname Lastname';
  const employeeId = user ? user.id : null; // ดึง ID ของผู้ใช้ที่ล็อกอินอยู่

  const [attendanceData, setAttendanceData] = useState([]);
  const [currentAttendance, setCurrentAttendance] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ทั้งหมด');

  // เปลี่ยนจากแผนกเป็นสถานะ
  const statuses = ['ทั้งหมด', 'ปกติ', 'มาสาย', 'กำลังทำงาน'];

  // ดึงข้อมูลการลงเวลาจาก Backend
  useEffect(() => {
    const fetchAttendances = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/attendances');
        setAttendanceData(response.data);
      } catch (error) {
        console.error("Error fetching attendances:", error);
      }
    };

    fetchAttendances();
  }, []);

  // ดึงข้อมูลการเข้างานปัจจุบันของพนักงาน
  useEffect(() => {
  const fetchCurrentAttendance = async () => {
    if (!employeeId) return;

    try {
      const currentDate = new Date().toLocaleDateString('th-TH');
      const response = await axios.get(`http://localhost:5000/api/attendances?employeeId=${employeeId}&date=${currentDate}`);

      // ตรวจสอบว่ามีข้อมูลการเข้างานหรือไม่
      if (response.data && response.data.checkIn && !response.data.checkOut) {
        setCurrentAttendance(response.data);
      } else {
        setCurrentAttendance(null); // ถ้าไม่มีข้อมูลการเข้างาน ให้ตั้งค่าเป็น null
      }
    } catch (error) {
      console.error("Error fetching current attendance:", error);
      setCurrentAttendance(null); // หากเกิดข้อผิดพลาด ให้ตั้งค่าเป็น null
    }
  };

  fetchCurrentAttendance();
}, [employeeId]);

  // กรองข้อมูลตามคำค้นหาและสถานะ
  const filteredData = attendanceData.filter((attendance) => {
    // ตรวจสอบว่า attendance.employee มีค่าหรือไม่
    if (!attendance.employee) return false;

    const matchSearch = attendance.employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendance.employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'ทั้งหมด' || attendance.status === filterStatus;
    return matchSearch && matchStatus;
  });

  // ฟังก์ชันสำหรับเข้างาน
  const handleCheckIn = async () => {
    if (!user) {
      alert("กรุณาล็อกอินก่อนเข้างาน");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/attendances/check-in', { employeeId });
      console.log("Check-in response:", response.data);
      setAttendanceData([...attendanceData, response.data]);
      setCurrentAttendance(response.data);
      alert("เข้างานสำเร็จ");
    } catch (error) {
      console.error("Error checking in:", error.response?.data || error.message);
      alert("เกิดข้อผิดพลาดในการเข้างาน");
    }
  };

  // ฟังก์ชันสำหรับเลิกงาน
  const handleCheckOut = async () => {
    if (!user) {
      alert("กรุณาล็อกอินก่อนเลิกงาน");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/attendances/check-out', { employeeId });
      console.log("Check-out response:", response.data);
      const updatedAttendances = attendanceData.map(attendance =>
        attendance.id === response.data.id ? response.data : attendance
      );
      setAttendanceData(updatedAttendances);
      setCurrentAttendance(response.data);
      alert("เลิกงานสำเร็จ");
    } catch (error) {
      console.error("Error checking out:", error.response?.data || error.message);
      alert("เกิดข้อผิดพลาดในการเลิกงาน");
    }
  };

  // ฟังก์ชันสำหรับกำหนดสีสถานะ
  const getStatusColor = (status) => {
    switch (status) {
      case 'ปกติ':
        return 'text-green-600';
      case 'มาสาย':
        return 'text-yellow-600';
      case 'กำลังทำงาน':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[b4b2af]">
      {/* Header with username */}
      <div className="fixed top-0 right-0 p-4 z-50">
        <div className="bg-gray-600 text-white px-4 py-2 rounded-full">
          {userName}
        </div>
      </div>

      <div className="flex flex-1">
        <Sidebar />
        <div className="ml-[250px] w-[calc(100%-250px)] p-6 mt-16">
          <div className="bg-white shadow-md mb-6 h-[calc(100vh-136px)]">
            <div className="p-6 h-full flex flex-col">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                รายงานการลงเวลาพนักงาน
              </h2>

              {/* ปุ่มเข้างานและเลิกงาน */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex gap-4">
                  <button
                    className="bg-green-500 text-white px-8 py-2 rounded-lg"
                    onClick={handleCheckIn}
                    disabled={currentAttendance !== null && !currentAttendance?.checkOut}
                  >
                    เข้างาน
                  </button>
                  <button
                    className="bg-red-500 text-white px-8 py-2 rounded-lg"
                    onClick={handleCheckOut}
                    // disabled={!currentAttendance || currentAttendance.checkOut}
                  >
                    เลิกงาน
                  </button>
                </div>
              </div>

              {/* ช่องค้นหาและตัวกรองสถานะ */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-3 top-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="ค้นหาชื่อ หรือตำแหน่ง..."
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  {statuses.map((status) => (
                    <button
                      key={status}
                      className={`px-4 py-2 rounded-lg ${filterStatus === status
                        ? 'bg-blue-500 text-white'
                        : 'border border-gray-300 hover:bg-gray-50'
                        }`}
                      onClick={() => setFilterStatus(status)}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* ตารางแสดงข้อมูลการลงเวลา */}
              <div className="flex-1 overflow-hidden">
                <div className="h-full overflow-y-auto">
                  <table className="w-full">
                    <thead className="sticky top-0 bg-white">
                      <tr className="border-b">
                        <th className="py-3 text-left">พนักงาน</th>
                        <th className="py-3 text-left">แผนก</th>
                        <th className="py-3 text-left">วันที่</th>
                        <th className="py-3 text-left">เวลาเข้า</th>
                        <th className="py-3 text-left">เวลาออก</th>
                        <th className="py-3 text-left">สถานะ</th>
                        <th className="py-3 text-left">การดำเนินการ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((attendance) => (
                        <tr key={attendance.id} className="border-b">
                          
                          <td className="py-3">{attendance.employee?.name || 'Unknown'}</td>
                          <td className="py-3">{attendance.employee?.position || 'Unknown'}</td>
                          <td className="py-3">{attendance.date}</td>
                          <td className="py-3">{attendance.checkIn}</td>
                          <td className="py-3">{attendance.checkOut || '-'}</td>
                          <td className="py-3">
                            <span className={`inline-flex items-center gap-1 ${getStatusColor(attendance.status)}`}>
                              {attendance.status}
                            </span>
                          </td>
                          <td className="py-3">
                            <button className="px-3 py-1 text-sm border rounded-lg hover:bg-gray-50">
                              ดูรายละเอียด
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkAttendance;