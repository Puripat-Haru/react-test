import React, { useState } from 'react';
import logo from '../assets/logo.png';

const Sidebar = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const menuStructure = {
    "Work Office": [
      "ระบบสมัครงาน",
      "ระบบลงเวลาทำงาน",
      "ระบบ To do list",
      "ระบบลาพนักงาน",
      "ระบบจองห้องประชุม",
      "ระบบจองรถ",
      "ระบบเบิกค่าใช้จ่าย",
      "ระบบเงินเดือน"
    ],
    "Customer Service": [
      "เพิ่มข้อมูลลูกค้า",
      "Quotation / ใบเสนอราคา",
      "Invoice / ใบแจ้งหนี้",
      "Receipt / ใบเสร็จรับเงิน",
      "นัดประชุมกับลูกค้า",
      "ร่างเอกสารสัญญารักษาความลับ"
    ],
    "Financial System": [
      "บันทึกรายได้ต่อเดือนต่อปี",
      "บันทึกรายจ่ายต่อเดือนต่อปี"
    ]
  };

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

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
                  ${expandedSection === section ? 'bg-[#7d9d9c]' : 'hover:bg-[#7d9d9c]'}`}
              >
                {section}
              </button>
              
              {expandedSection === section && (
                <ul className="divide-y-2 divide-white/40">
                  {items.map((item, index) => (
                    <li key={index}>
                      <button className="w-full py-2 px-4 text-white hover:bg-[#7d9d9c] transition-colors duration-300 text-center">
                        {item}
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
        <button className="w-full py-2 px-4 text-white hover:bg-[#7d9d9c] transition-colors duration-300">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;