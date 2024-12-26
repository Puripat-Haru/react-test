import React from 'react';
import Navbars from './Navbars'; // import Sidebar ที่สร้างไว้
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Navbars />
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default Layout;
