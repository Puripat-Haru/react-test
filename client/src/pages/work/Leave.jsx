import React, { useState } from 'react';
import { Calendar, Search, CheckCircle, XCircle } from 'lucide-react';
import Sidebar from '../../components/Sidebar';

const LeaveTable = ({ leaves }) => {
  return (
    <div className="bg-gray-50 rounded-lg mt-4">
      <div className="grid grid-cols-12 py-3 px-4 bg-gray-100 rounded-t-lg sticky top-0">
        <div className="col-span-3 text-gray-700">Employee name</div>
        <div className="col-span-3 text-gray-700">Leave type</div>
        <div className="col-span-4 text-gray-700">Date</div>
        <div className="col-span-2 text-gray-700">Action</div>
      </div>
      <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
        {leaves.map((leave, index) => (
          <div key={index} className="grid grid-cols-12 py-3 px-4 border-b">
            <div className="col-span-3">{leave.name}</div>
            <div className="col-span-3">{leave.type}</div>
            <div className="col-span-4">{leave.date}</div>
            <div className="col-span-2 flex gap-2">
              <button className="p-1 hover:bg-gray-100 rounded-full">
                <CheckCircle className="w-5 h-5 text-green-500" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded-full">
                <XCircle className="w-5 h-5 text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Leave = () => {
  const [selectedLeaveType, setSelectedLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Sample leave data
  const leaves = [
    {
      name: 'Firstname Lastname',
      type: 'Sick Leave',
      date: '2024-02-18 - 2024-02-19'
    },
    {
      name: 'Firstname Lastname',
      type: 'Private Leave',
      date: '2024-02-18 - 2024-02-19'
    },
    {
      name: 'Firstname Lastname',
      type: 'Private Leave',
      date: '2024-02-18 - 2024-02-19'
    },
    {
      name: 'Firstname Lastname',
      type: 'Private Leave',
      date: '2024-02-18 - 2024-02-19'
    },
    {
      name: 'Firstname Lastname',
      type: 'Private Leave',
      date: '2024-02-18 - 2024-02-19'
    },
    {
      name: 'Firstname Lastname',
      type: 'Private Leave',
      date: '2024-02-18 - 2024-02-19'
    },
    {
      name: 'Firstname Lastname',
      type: 'Private Leave',
      date: '2024-02-18 - 2024-02-19'
    },
    {
      name: 'Firstname Lastname',
      type: 'Private Leave',
      date: '2024-02-18 - 2024-02-19'
    },
    {
      name: 'Firstname Lastname',
      type: 'Private Leave',
      date: '2024-02-18 - 2024-02-19'
    },
    {
      name: 'Firstname Lastname',
      type: 'Private Leave',
      date: '2024-02-18 - 2024-02-19'
    }
  ];

  const leaveTypes = [
    'Sick Leave',
    'Private Leave',
    'Annual Leave'
  ];

  return (
    <div className="flex min-h-screen bg-[#b4b2af]">
      <Sidebar />
      <div className="ml-[250px] w-[calc(100%-250px)] p-6 h-screen">
        <div className="flex justify-end mb-6">
          <div className="bg-gray-600 text-white px-4 py-1 rounded-full text-sm">
            Firstname Lastname
          </div>
        </div>
        <div className="bg-white  shadow p-6 h-[calc(100%-80px)]">
          {/* Search and Filter Section */}
          <div className="flex items-center gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search for Name"
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-md"
              />
            </div>

            {/* Leave Type Dropdown */}
            <div className="relative">
              <select
                value={selectedLeaveType}
                onChange={(e) => setSelectedLeaveType(e.target.value)}
                className="appearance-none bg-white border rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a leave type</option>
                {leaveTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Date Range Picker */}
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

            {/* Search Button */}
            <button className="bg-blue-500 text-white px-8 py-2 rounded-md hover:bg-blue-600">
              Search
            </button>
          </div>

          {/* Leave Table */}
          <LeaveTable leaves={leaves} />
        </div>
      </div>
    </div>
  );
};

export default Leave;