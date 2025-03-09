import React, { useState, useEffect } from 'react';
import { Search, Calendar } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';

const AddRoomBookingModal = ({ isOpen, onClose, onAdd, onEdit, isEditing, initialData }) => {
  const [roomBookingData, setRoomBookingData] = useState(initialData || {
    name: '',
    dateRange: '',
    time: '16:00 - 17:00',
  });

  const handleSubmit = () => {
    if (!roomBookingData.name || !roomBookingData.dateRange || !roomBookingData.time) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    if (isEditing) {
      onEdit(roomBookingData); // ส่งข้อมูลที่แก้ไขไปยังฟังก์ชัน onEdit
    } else {
      onAdd(roomBookingData); // ส่งข้อมูลใหม่ไปยังฟังก์ชัน onAdd
    }

    onClose();
    setRoomBookingData({ name: '', dateRange: '', time: '16:00 - 17:00' });
  };

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // เมื่อ Modal เปิด ให้ตั้งค่าข้อมูลเริ่มต้น
  useEffect(() => {
    if (isEditing && initialData) {
      setRoomBookingData(initialData);
    }
  }, [isEditing, initialData]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={handleClickOutside}
    >
      <div className="bg-white rounded-lg p-6 w-[500px]">
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? 'แก้ไขห้องประชุม' : 'เพิ่มห้องประชุม'}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block mb-2">ชื่อใช้ห้องประชุม</label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2"
              value={roomBookingData.name}
              onChange={(e) => setRoomBookingData({ ...roomBookingData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-2">วันเวลาที่จอง</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="start date"
                className="flex-1 border rounded-lg px-3 py-2"
                value={roomBookingData.dateRange}
                onChange={(e) => setRoomBookingData({ ...roomBookingData, dateRange: e.target.value })}
              />
              <Calendar className="text-gray-400 w-5 h-5" />
            </div>
          </div>

          <div>
            <label className="block mb-2">เวลาที่จอง</label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2"
              value={roomBookingData.time}
              onChange={(e) => setRoomBookingData({ ...roomBookingData, time: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              onClick={onClose}
              className="px-6 py-2 border rounded-lg text-red-500"
            >
              ยกเลิก
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-500 text-white rounded-lg"
            >
              {isEditing ? 'อัปเดต' : 'บันทึก'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const RoomBookingTable = ({ roomBookings, onEdit, onDelete }) => {
  return (
    <div className="bg-gray-50 rounded-lg">
      <div className="grid grid-cols-4 bg-gray-100 p-4 text-center">
        <div className="text-gray-700 font-medium">Meeting room username</div>
        <div className="text-gray-700 font-medium">Date</div>
        <div className="text-gray-700 font-medium">Time</div>
        <div className="text-gray-700 font-medium">Action</div>
      </div>

      <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
        {roomBookings.map((roomBooking) => (
          <div key={roomBooking.id} className="grid grid-cols-4 p-4 border-b border-gray-200 items-center">
            <div className="text-center">{roomBooking.name}</div>
            <div className="text-center">{roomBooking.date}</div>
            <div className="text-center">{roomBooking.time}</div>
            <div className="flex justify-center gap-2">
              <button
                onClick={() => onEdit(roomBooking.id, { name: roomBooking.name, date: roomBooking.date, time: roomBooking.time })}
                className="px-4 py-1 bg-blue-500 text-white rounded text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(roomBooking.id)}
                className="px-4 py-1 bg-red-500 text-white rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MeetingRoom = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const userName = user ? user.name : 'Firstname Lastname';

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomBookings, setRoomBookings] = useState([]);
  const [editingRoomBooking, setEditingRoomBooking] = useState({
    name: '',
    dateRange: '',
    time: '16:00 - 17:00',
  });
  const [editingId, setEditingId] = useState(null);

  // ดึงข้อมูลการจองทั้งหมดจาก backend
  useEffect(() => {
    const fetchRoomBookings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/roomBookings');
        setRoomBookings(response.data);
      } catch (error) {
        console.error("Error fetching roomBookings:", error);
      }
    };

    fetchRoomBookings();
  }, []);

  // เพิ่มการจองใหม่
  const handleAddRoomBooking = async (newRoomBooking) => {
    try {
      const dataToSend = {
        name: newRoomBooking.name,
        date: newRoomBooking.dateRange, // เปลี่ยน dateRange เป็น date
        time: newRoomBooking.time,
      };

      const response = await axios.post('http://localhost:5000/api/roomBookings', dataToSend);
      setRoomBookings([...roomBookings, response.data]);
    } catch (error) {
      console.error("Error adding roomBooking:", error);
      alert("เกิดข้อผิดพลาดในการเพิ่มการจอง");
    }
  };

  // แก้ไขการจอง
  const handleEditRoomBooking = async (updatedRoomBooking) => {
    try {
      const dataToSend = {
        name: updatedRoomBooking.name,
        date: updatedRoomBooking.dateRange, // เปลี่ยน dateRange เป็น date
        time: updatedRoomBooking.time,
      };

      const response = await axios.put(`http://localhost:5000/api/roomBookings/${editingId}`, dataToSend);

      // อัปเดต State ด้วยข้อมูลที่ได้กลับมาจาก Backend
      const updatedRoomBookings = roomBookings.map(roomBooking =>
        roomBooking.id === editingId ? response.data : roomBooking
      );
      setRoomBookings(updatedRoomBookings);

      setEditingId(null); // รีเซ็ต ID ที่กำลังแก้ไข
      setIsModalOpen(false); // ปิด Modal
    } catch (error) {
      console.error("Error updating roomBooking:", error);
      alert("เกิดข้อผิดพลาดในการอัปเดตการจอง");
    }
  };

  // ลบการจอง
  const handleDeleteRoomBooking = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/roomBookings/${id}`);
      const updatedRoomBookings = roomBookings.filter(roomBooking => roomBooking.id !== id);
      setRoomBookings(updatedRoomBookings);
    } catch (error) {
      console.error("Error deleting roomBooking:", error);
      alert("เกิดข้อผิดพลาดในการลบการจอง");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#b4b2af]">
      <Sidebar />
      <div className="ml-[250px] w-[calc(100%-250px)] p-6 h-screen">
        <div className="flex justify-end mb-6">
          <div className="bg-gray-600 text-white px-6 py-2 rounded-full">
            {userName}
          </div>
        </div>

        <div className="bg-white shadow p-6 h-[calc(100%-80px)]">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search for Name"
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg border-0"
              />
            </div>

            <div className="flex items-center gap-4">
              <span className="text-gray-600">Date-Time Range</span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="start date"
                  className="border rounded-lg px-3 py-2"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <span>→</span>
                <input
                  type="text"
                  placeholder="End date"
                  className="border rounded-lg px-3 py-2"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
                <Calendar className="text-gray-400 w-5 h-5" />
              </div>
            </div>

            <button
              className="bg-blue-500 text-white px-8 py-2 rounded-lg"
              onClick={() => setIsModalOpen(true)}
            >
              Add
            </button>
            <button className="bg-blue-500 text-white px-8 py-2 rounded-lg">
              Search
            </button>
          </div>

          <RoomBookingTable
            roomBookings={roomBookings}
            onEdit={(id, roomBooking) => {
              setEditingId(id);
              setEditingRoomBooking({
                ...roomBooking,
                dateRange: roomBooking.date,
              });
              setIsModalOpen(true);
            }}
            onDelete={handleDeleteRoomBooking}
          />

          <AddRoomBookingModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setEditingId(null); // รีเซ็ต ID ที่กำลังแก้ไขเมื่อปิด Modal
            }}
            onAdd={handleAddRoomBooking}
            onEdit={handleEditRoomBooking}
            isEditing={editingId !== null} // ตรวจสอบว่ากำลังแก้ไขหรือไม่
            initialData={editingRoomBooking} // ส่งข้อมูลที่กำลังแก้ไขไปยัง Modal
          />
        </div>
      </div>
    </div>
  );
};

export default MeetingRoom;