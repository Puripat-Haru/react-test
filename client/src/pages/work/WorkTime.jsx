import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';

const WorkTime = () => {
  const [attendanceData] = useState([
    // ... existing data ...
    {
      id: 1,
      name: 'สมชาย ใจดี',
      position: 'โปรแกรมเมอร์',
      department: 'IT',
      records: [
        {
          date: '21/01/2025',
          checkIn: '08:45:00',
          checkOut: '17:30:00',
          status: 'ปกติ'
        }
      ]
    },
    {
      id: 2,
      name: 'สมหญิง รักงาน',
      position: 'นักการตลาด',
      department: 'การตลาด',
      records: [
        {
          date: '21/01/2025',
          checkIn: '09:15:00',
          checkOut: '18:00:00',
          status: 'มาสาย'
        }
      ]
    },
    {
      id: 3,
      name: 'วิชัย ขยันดี',
      position: 'บัญชี',
      department: 'การเงิน',
      records: [
        {
          date: '21/01/2025',
          checkIn: '08:30:00',
          checkOut: null,
          status: 'กำลังทำงาน'
        }
      ]
    },
    {
      id: 4,
      name: 'วิชัย ขยันดี',
      position: 'บัญชี',
      department: 'การเงิน',
      records: [
        {
          date: '21/01/2025',
          checkIn: '08:30:00',
          checkOut: '17:30:00',
          status: 'ปกติ'
        }
      ]
    },
    {
      id: 5,
      name: 'วิชัย ขยันดี',
      position: 'บัญชี',
      department: 'การเงิน',
      records: [
        {
          date: '21/01/2025',
          checkIn: '09:15:00',
          checkOut: '18:00:00',
          status: 'มาสาย'
        }
      ]
    },
    {
      id: 6,
      name: 'วิชัย ขยันดี',
      position: 'บัญชี',
      department: 'การเงิน',
      records: [
        {
          date: '21/01/2025',
          checkIn: '08:30:00',
          checkOut: null,
          status: 'กำลังทำงาน'
        }
      ]
    },
    {
      id: 7,
      name: 'วิชัย ขยันดี',
      position: 'บัญชี',
      department: 'การเงิน',
      records: [
        {
          date: '21/01/2025',
          checkIn: '08:30:00',
          checkOut: '17:30:00',
          status: 'ปกติ'
        }
      ]
    },
    {
      id: 8,
      name: 'วิชัย ขยันดี',
      position: 'บัญชี',
      department: 'การเงิน',
      records: [
        {
          date: '21/01/2025',
          checkIn: '09:15:00',
          checkOut: '18:00:00',
          status: 'มาสาย'
        }
      ]
    },
    {
      id: 9,
      name: 'วิชัย ขยันดี',
      position: 'บัญชี',
      department: 'การเงิน',
      records: [
        {
          date: '21/01/2025',
          checkIn: '08:30:00',
          checkOut: null,
          status: 'กำลังทำงาน'
        }
      ]
    },
    {
      id: 10,
      name: 'วิชัย ขยันดี',
      position: 'บัญชี',
      department: 'การเงิน',
      records: [
        {
          date: '21/01/2025',
          checkIn: '08:30:00',
          checkOut: '17:30:00',
          status: 'ปกติ'
        }
      ]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ทั้งหมด');
  // เปลี่ยนจากแผนกเป็นสถานะ
  const statuses = ['ทั้งหมด', 'ปกติ', 'มาสาย', 'กำลังทำงาน'];

  const filteredData = attendanceData.filter(employee => {
    const matchSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    // เปลี่ยนเงื่อนไขการกรองเป็นตามสถานะ
    const matchStatus = filterStatus === 'ทั้งหมด' || 
                       employee.records.some(record => record.status === filterStatus);
    return matchSearch && matchStatus;
  });

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
          Firstname Lastname
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
                  {statuses.map(status => (
                    <button
                      key={status}
                      className={`px-4 py-2 rounded-lg ${
                        filterStatus === status
                          ? 'bg-blue-500 text-white'
                          : 'border border-gray-300 hover:bg-gray-50'
                      }`}
                      onClick={() => setFilterStatus(status)}
                    >
                      {/* Add status color indicator */}
                      <span className="flex items-center gap-2">
                        {status !== 'ทั้งหมด' && (
                          <span className={`w-2 h-2 rounded-full ${
                            status === 'ปกติ' ? 'bg-green-600' :
                            status === 'มาสาย' ? 'bg-yellow-600' :
                            status === 'กำลังทำงาน' ? 'bg-blue-600' : ''
                          }`}></span>
                        )}
                        {status}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

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
                      {filteredData.map((employee) => (
                        employee.records.map((record, recordIndex) => (
                          <tr key={`${employee.id}-${recordIndex}`} className="border-b">
                            <td className="py-3">
                              <div>
                                <div className="font-medium">{employee.name}</div>
                                <div className="text-sm text-gray-500">{employee.position}</div>
                              </div>
                            </td>
                            <td className="py-3">{employee.department}</td>
                            <td className="py-3">{record.date}</td>
                            <td className="py-3">{record.checkIn}</td>
                            <td className="py-3">{record.checkOut || '-'}</td>
                            <td className="py-3">
                              <span className={`inline-flex items-center gap-1 ${getStatusColor(record.status)}`}>
                                {record.status === 'มาสาย' && (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                )}
                                {record.status}
                              </span>
                            </td>
                            <td className="py-3">
                              <button className="px-3 py-1 text-sm border rounded-lg hover:bg-gray-50">
                                ดูรายละเอียด
                              </button>
                            </td>
                          </tr>
                        ))
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

export default WorkTime;