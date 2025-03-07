import React, { useState } from 'react';
import { Search, Calendar } from 'lucide-react';
import Sidebar from '../../components/Sidebar';

const AddBookingModal = ({ isOpen, onClose, onAdd }) => {
  const [bookingData, setBookingData] = useState({
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
    const newBooking = {
      name: bookingData.name,
      date: bookingData.dateRange,
      time: '16:00 - 17:00',
      place: bookingData.place,
      car: bookingData.car
    };
    onAdd(newBooking);
    onClose();
    setBookingData({ name: '', dateRange: '', place: '', car: '' });
  };

  // Handle click outside
  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Check if car is selected
  const isCarSelected = bookingData.car !== '';

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={handleClickOutside}
    >
      <div className="bg-white rounded-lg p-6 w-[500px]">
        <h2 className="text-xl font-semibold mb-4">เพิ่มการจองรถ</h2>

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
    <div className="bg-white rounded-lg">
      <div className="grid grid-cols-6 bg-gray-100 p-4">
        <div className="text-gray-700 font-medium">Reserve car name</div>
        <div className="text-gray-700 font-medium">Date</div>
        <div className="text-gray-700 font-medium">Time</div>
        <div className="text-gray-700 font-medium">Place</div>
        <div className="text-gray-700 font-medium">Car</div>
        <div className="text-gray-700 font-medium">Action</div>
      </div>

      <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
        {bookings.map((booking, index) => (
          <div key={index} className="grid grid-cols-6 p-4 border-b border-gray-200 items-center">
            <div>{booking.name}</div>
            <div>{booking.date}</div>
            <div>{booking.time}</div>
            <div>{booking.place}</div>
            <div>{booking.car}</div>
            <div className="flex gap-2">
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

const CarBook = () => {

  const user = JSON.parse(localStorage.getItem('user'));
  const userName = user ? user.name : 'Firstname Lastname';

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookings, setBookings] = useState([
    {
      name: 'Firstname Lastname',
      date: '2024-02-18 - 2024-02-18',
      time: '16:00 - 17:00',
      place: 'Place Name',
      car: 'No.1'
    },
    {
      name: 'Firstname Lastname',
      date: '2024-02-19 - 2024-02-19',
      time: '16:00 - 17:00',
      place: 'Place Name',
      car: 'No.2'
    },
    {
      name: 'Firstname Lastname',
      date: '2024-02-20 - 2024-02-20',
      time: '16:00 - 17:00',
      place: 'Place Name',
      car: 'No.3'
    },
    {
      name: 'Firstname Lastname',
      date: '2024-02-21 - 2024-02-21',
      time: '16:00 - 17:00',
      place: 'Place Name',
      car: 'No.1'
    }
  ]);

  const handleAddBooking = (newBooking) => {
    setBookings([...bookings, newBooking]);
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
            <BookingTable bookings={bookings} />
          </div>

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

export default CarBook;