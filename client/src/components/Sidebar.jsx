import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

const Sidebar = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const menuStructure = {
    "Work Office": [
      { name: "ระบบสมัครงาน", path: "/work/JobApp" },
      { name: "ระบบลงเวลาทำงาน", path: "/work/WorkTime" },
      { name: "ระบบ To do list", path: "/work/ToDo" },
      { name: "ระบบลาพนักงาน", path: "/work/Leave" },
      { name: "ระบบจองห้องประชุม", path: "/work/RoomBook" },
      { name: "ระบบจองรถ", path: "/work/CarBook" },
      { name: "ระบบเบิกค่าใช้จ่าย", path: "/work/WorkExpenses" },
      { name: "ระบบเงินเดือน", path: "/work/Payroll" }
    ],
    "Customer Service": [
      { name: "เพิ่มข้อมูลลูกค้า", path: "/customer/CustomerAdd" },
      { name: "Quotation / ใบเสนอราคา", path: "/customer/Quotation" },
      { name: "Invoice / ใบแจ้งหนี้", path: "/customer/Invoice" },
      { name: "Receipt / ใบเสร็จรับเงิน", path: "/customer/Receipt" },
      { name: "นัดประชุมกับลูกค้า", path: "/customer/CustomerMeet" },
      { name: "ร่างเอกสารสัญญารักษาความลับ", path: "/customer/CustomerNda" }
    ],
    "Financial System": [
      { name: "บันทึกรายได้ต่อเดือนต่อปี", path: "/finance/Income" },
      { name: "บันทึกรายจ่ายต่อเดือนต่อปี", path: "/finance/FinanceExpenses" }
    ]
  };

  useEffect(() => {
    const savedSection = localStorage.getItem('expandedSection');
    if (savedSection) {
      setExpandedSection(savedSection);
    }

    Object.entries(menuStructure).forEach(([section, items]) => {
      if (items.some(item => location.pathname.startsWith(item.path))) {
        setExpandedSection(section)
        localStorage.setItem('expandedSection', section);
      }
    });
  }, [location.pathname]);

  // เช็คว่าเมนูไอเทมปัจจุบันเป็น active หรือไม่
  const isItemActive = (path) => {
    return location.pathname.startsWith(path);
  };

  // เช็คว่าหัวข้อใหญ่เป็น active หรือไม่
  const isSectionActive = (items) => {
    return items.some(item => location.pathname.startsWith(item.path));
  };

  const toggleSection = (section) => {
    const newSection = expandedSection === section ? null : section;
    setExpandedSection(newSection);
    if (newSection) {
      localStorage.setItem('expandedSection',newSection);
    } else {
      localStorage.removeItem('expandedSection');
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    navigate('/LoginPage');
  }

  return (
    <div className="h-screen w-64 fixed top-0 left-0 bg-[#e4dccf] shadow-md flex flex-col">
      <div className="px-4 py-2 bg-[#e4dccf]">
        <img
          src={logo}
          alt="Logo"
          className="w-4/5 mx-auto my-2"
        />
      </div>

      <nav className="flex-1 bg-[#e4dccf]">
        <ul className="flex flex-col divide-y-2 divide-white/40">
          {Object.entries(menuStructure).map(([section, items]) => (
            <li key={section} className="bg-[#576f73]">
              <button
                onClick={() => toggleSection(section)}
                className={`w-full py-2 px-4 text-white font-bold transition-colors duration-300 text-center
                  ${expandedSection === section ? 'bg-[#7d9d9c]' : 'hover:bg-[#7d9d9c]'}
                  ${isSectionActive(items) ? 'bg-[#7d9d9c]' : ''}`}
              >
                {section}
              </button>

              {expandedSection === section && (
                <ul className="divide-y-2 divide-white/40">
                  {items.map((item, index) => (
                    <li key={index}>
                      <button
                        onClick={() => handleNavigate(item.path)}
                        className={`w-full py-2 px-4 text-white transition-colors duration-300 text-center
                      ${isItemActive(item.path) ? 'bg-[#7d9d9c]' : 'hover:bg-[#7d9d9c]'}`}
                      >
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="bg-red-600">
        <button
        onClick={handleLogout}
        className="w-full py-2 px-4 text-white hover:bg-[#7d9d9c] transition-colors duration-300">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;