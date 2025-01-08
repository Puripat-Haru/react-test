import React from 'react';
import logo from '../assets/logo.png'

const Sidebar = () => {
  const menuItems = [
    { name: "Work Office" },
    { name: "ระบบสมัครงาน" },
    { name: "ระบบลงเวลาทำงาน" },
    { name: "ระบบ To do list" },
    { name: "ระบบลาพนักงาน" },
    { name: "ระบบจองห้องประชุม" },
    { name: "ระบบจองรถ" },
    { name: "ระบบเบิกค่าใช้จ่าย" },
    { name: "ระบบเงินเดือน" },
    { name: "Customer Service" },
    { name: "Financial System" },
  ];

  return (
    <div className="h-screen w-64 fixed top-0 left-0 bg-[#e4dccf] shadow-md flex flex-col">
      <div className="px-4 py-2">
        <img 
          src={logo}
          alt="Logo" 
          className="w-4/5 mx-auto my-2"
        />
      </div>
      
      <nav className="flex-1 bg-[#576f73]">
        <ul className="flex flex-col">
          {menuItems.map((item, index) => (
            <li key={index} className="text-center">
              <button className="w-full py-2 px-4 text-white hover:bg-[#7d9d9c] transition-colors duration-300">
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="bg-red-600">
        <button className="w-full py-2 px-4 text-white hover:bg-[#7d9d9c] transition-colors duration-300">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;