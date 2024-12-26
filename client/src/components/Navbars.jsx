import React from 'react';
import './Navbars.css'; // ต้องสร้างไฟล์ CSS สำหรับการออกแบบ
import logo from '../assets/logo.png';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        {/* ใส่โลโก้ที่คุณต้องการ */}
        <img src={logo} alt="Logo" />
      </div>
      <ul className="menu-items">
        <li>Work Office</li>
        <li>ระบบสมัครงาน</li>
        <li>ระบบลงเวลาทำงาน</li>
        <li>ระบบ To do list</li>
        <li>ระบบลาพนักงาน</li>
        <li>ระบบจองห้องประชุม</li>
        <li>ระบบจองรถ</li>
        <li>ระบบเบิกค่าใช้จ่าย</li>
        <li>ระบบเงินเดือน</li>
        <li>Customer Service</li>
        <li>Financial System</li>
        <div className="logout">
          <li>Logout</li>
        </div>
      </ul>
    </div>
  );
};

export default Sidebar;
