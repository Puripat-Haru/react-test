import React, { useState, useEffect } from 'react';
import { Search, Calendar } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';

const AddBookingModal = ({ isOpen, onClose, onAdd, onEdit, isEditing, initialData }) => {
  const [bookingData, setBookingData] = useState(initialData || {
    name: '',
    dateRange: '',
    place: '',
    car: ''
  });

  const carOptions = [
    { value: 'No.1', label: 'No.1' },
    { value: 'No.2', label: 'No.2' },
    { value: 'No.3', label: 'No.3' },
  ];

  const handleSubmit = () => {
    if (!bookingData.name || !bookingData.dateRange || !bookingData.place || !bookingData.car) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    if (isEditing) {
      onEdit(bookingData); // ส่งข้อมูลที่แก้ไขไปยังฟังก์ชัน onEdit
    } else {
      onAdd(bookingData); // ส่งข้อมูลใหม่ไปยังฟังก์ชัน onAdd
    }

    onClose();
    setBookingData({ name: '', dateRange: '', place: '', car: '' });
  };

  // Handle click outside
  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // เมื่อ Modal เปิด ให้ตั้งค่าข้อมูลเริ่มต้น
  useEffect(() => {
    if (isEditing && initialData) {
      setBookingData(initialData);
    }
  }, [isEditing, initialData]);

  // Check if car is selected
  const isCarSelected = bookingData.car !== '';

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={handleClickOutside}
    >
      <div className="bg-white rounded-lg p-6 w-[500px]">
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? 'แก้ไขการจองรถ' : 'เพิ่มการจองรถ'}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block mb-2">ชื่อผู้จองรถ</label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2"
              value={bookingData.name}
              onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-2">วันที่จอง</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="start date"
                className="flex-1 border rounded-lg px-3 py-2"
                value={bookingData.dateRange}
                onChange={(e) => setBookingData({ ...bookingData, dateRange: e.target.value })}
              />
              <Calendar className="text-gray-400 w-5 h-5" />
            </div>
          </div>

          <div>
            <label className="block mb-2">สถานที่</label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2"
              value={bookingData.place}
              onChange={(e) => setBookingData({ ...bookingData, place: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-2">รถคันที่</label>
            <select
              className="w-full border rounded-lg px-3 py-2 bg-white"
              value={bookingData.car}
              onChange={(e) => setBookingData({ ...bookingData, car: e.target.value })}
            >
              <option value="">เลือกรถ</option>
              {carOptions.map((car) => (
                <option key={car.value} value={car.value}>
                  {car.label}
                </option>
              ))}
            </select>
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
              disabled={!isCarSelected}
              className={`px-6 py-2 rounded-lg ${isCarSelected
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
            >
              {isEditing ? 'อัปเดต' : 'บันทึก'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const BookingTable = ({ bookings, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg">
      <div className="grid grid-cols-6 bg-gray-100 p-4 text-center">
        <div className="text-gray-700 font-medium">Reserve car name</div>
        <div className="text-gray-700 font-medium">Date</div>
        <div className="text-gray-700 font-medium">Time</div>
        <div className="text-gray-700 font-medium">Place</div>
        <div className="text-gray-700 font-medium">Car</div>
        <div className="text-gray-700 font-medium">Action</div>
      </div>

      <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
        {bookings.map((booking) => (
          <div key={booking.id} className="grid grid-cols-6 p-4 border-b border-gray-200 items-center text-center">
            <div>{booking.name}</div>
            <div>{booking.date}</div>
            <div>{booking.time}</div>
            <div>{booking.place}</div>
            <div>{booking.car}</div>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => onEdit(booking.id, { name: booking.name, date: booking.date, place: booking.place, car: booking.car })}
                className="px-4 py-1 bg-blue-500 text-white rounded text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(booking.id)}
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

const CarBook = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const userName = user ? user.name : 'Firstname Lastname';

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [editingBooking, setEditingBooking] = useState({
    name: '',
    dateRange: '',
    place: '',
    car: ''
  });
  const [editingId, setEditingId] = useState(null);

  // ดึงข้อมูลการจองรถทั้งหมดจาก backend
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/carBookings');
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching car bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  // เพิ่มการจองรถใหม่
  const handleAddBooking = async (newBooking) => {
    try {
      const dataToSend = {
        name: newBooking.name,
        date: newBooking.dateRange,
        time: '16:00 - 17:00',
        place: newBooking.place,
        car: newBooking.car
      };

      const response = await axios.post('http://localhost:5000/api/carBookings', dataToSend);
      setBookings([...bookings, response.data]);
    } catch (error) {
      console.error("Error adding car booking:", error);
      alert("เกิดข้อผิดพลาดในการเพิ่มการจองรถ");
    }
  };

  // แก้ไขการจองรถ
  const handleEditBooking = async (updatedBooking) => {
    try {
      const dataToSend = {
        name: updatedBooking.name,
        date: updatedBooking.dateRange,
        time: '16:00 - 17:00',
        place: updatedBooking.place,
        car: updatedBooking.car
      };

      const response = await axios.put(`http://localhost:5000/api/carBookings/${editingId}`, dataToSend);

      // อัปเดต State ด้วยข้อมูลที่ได้กลับมาจาก Backend
      const updatedBookings = bookings.map(booking =>
        booking.id === editingId ? response.data : booking
      );
      setBookings(updatedBookings);

      setEditingId(null); // รีเซ็ต ID ที่กำลังแก้ไข
      setIsModalOpen(false); // ปิด Modal
    } catch (error) {
      console.error("Error updating car booking:", error);
      alert("เกิดข้อผิดพลาดในการอัปเดตการจองรถ");
    }
  };

  // ลบการจองรถ
  const handleDeleteBooking = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/carBookings/${id}`);
      const updatedBookings = bookings.filter(booking => booking.id !== id);
      setBookings(updatedBookings);
    } catch (error) {
      console.error("Error deleting car booking:", error);
      alert("เกิดข้อผิดพลาดในการลบการจองรถ");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#b4b2af]">
      <Sidebar />
      <div className="ml-[250px] w-[calc(100%-250px)] p-6 flex flex-col h-screen">
        <div className="flex justify-end mb-6">
          <div className="bg-gray-600 text-white px-6 py-2 rounded-full">
            {userName}
          </div>
        </div>

        <div className="bg-white shadow-lg p-6 flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search for Name or Place"
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

          <div className="flex-1 overflow-hidden">
            <BookingTable
              bookings={bookings}
              onEdit={(id, booking) => {
                setEditingId(id);
                setEditingBooking({
                  ...booking,
                  dateRange: booking.date, // ตั้งค่า dateRange จาก date
                });
                setIsModalOpen(true);
              }}
              onDelete={handleDeleteBooking}
            />
          </div>

          <AddBookingModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setEditingId(null); // รีเซ็ต ID ที่กำลังแก้ไขเมื่อปิด Modal
            }}
            onAdd={handleAddBooking}
            onEdit={handleEditBooking}
            isEditing={editingId !== null} // ตรวจสอบว่ากำลังแก้ไขหรือไม่
            initialData={editingBooking} // ส่งข้อมูลที่กำลังแก้ไขไปยัง Modal
          />
        </div>
      </div>
    </div>
  );
};

export default CarBook;