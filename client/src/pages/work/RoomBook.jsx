import React, { useState } from 'react';
import { Search, Calendar } from 'lucide-react';
import Sidebar from '../../components/Sidebar';

const AddBookingModal = ({ isOpen, onClose, onAdd }) => {
  const [bookingData, setBookingData] = useState({
    name: '',
    dateRange: ''
  });

  const handleSubmit = () => {
    // Simulate adding a booking with time 16:00 - 17:00
    const newBooking = {
      name: bookingData.name,
      date: bookingData.dateRange,
      time: '16:00 - 17:00'
    };
    onAdd(newBooking);
    onClose();
    setBookingData({ name: '', dateRange: '' });
  };

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={handleClickOutside}
    >
      <div className="bg-white rounded-lg p-6 w-[500px]">
        <h2 className="text-xl font-semibold mb-4">เพิ่มห้องประชุม</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block mb-2">ชื่อใช้ห้องประชุม</label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2"
              value={bookingData.name}
              onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block mb-2">วันเวลาที่จอง</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="start date"
                className="flex-1 border rounded-lg px-3 py-2"
                value={bookingData.dateRange}
                onChange={(e) => setBookingData({...bookingData, dateRange: e.target.value})}
              />
              <Calendar className="text-gray-400 w-5 h-5" />
            </div>
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
              บันทึก
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const BookingTable = ({ bookings }) => {
  return (
    <div className="bg-gray-50 rounded-lg">
      <div className="grid grid-cols-4 bg-gray-100 p-4 text-center">
        <div className="text-gray-700 font-medium">Meeting room username</div>
        <div className="text-gray-700 font-medium">Date</div>
        <div className="text-gray-700 font-medium">Time</div>
        <div className="text-gray-700 font-medium">Action</div>
      </div>
      
      <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
        {bookings.map((booking, index) => (
          <div key={index} className="grid grid-cols-4 p-4 border-b border-gray-200 items-center">
            <div className="text-center">{booking.name}</div>
            <div className="text-center">{booking.date}</div>
            <div className="text-center">{booking.time}</div>
            <div className="flex justify-center gap-2">
              <button className="px-4 py-1 bg-blue-500 text-white rounded text-sm">
                Edit
              </button>
              <button className="px-4 py-1 bg-red-500 text-white rounded text-sm">
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
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookings, setBookings] = useState([
    {
      name: 'Firstname Lastname',
      date: '2024-02-18 - 2024-02-18',
      time: '16:00 - 17:00'
    },
    {
      name: 'Firstname Lastname',
      date: '2024-02-19 - 2024-02-19',
      time: '16:00 - 17:00'
    },
    {
      name: 'Firstname Lastname',
      date: '2024-02-20 - 2024-02-20',
      time: '16:00 - 17:00'
    },
    {
      name: 'Firstname Lastname',
      date: '2024-02-21 - 2024-02-21',
      time: '16:00 - 17:00'
    }
  ]);

  const handleAddBooking = (newBooking) => {
    setBookings([...bookings, newBooking]);
  };

  return (
    <div className="flex min-h-screen bg-[#b4b2af]">
      <Sidebar />
      <div className="ml-[250px] w-[calc(100%-250px)] p-6 h-screen">
        <div className="flex justify-end mb-6">
          <div className="bg-gray-600 text-white px-6 py-2 rounded-full">
            Firstname Lastname
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

          <BookingTable bookings={bookings} />

          <AddBookingModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onAdd={handleAddBooking}
          />
        </div>
      </div>
    </div>
  );
};

export default MeetingRoom;