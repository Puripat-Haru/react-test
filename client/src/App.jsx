import { Routes, Route, Navigate } from 'react-router-dom';
// import Sidebar from './components/Sidebar';

// import หน้าต่างๆ ของคุณ
import JobApp from './pages/work/JobApp';
import WorkTime from './pages/work/WorkTime';
import ToDo from './pages/work/ToDo';
import Leave from './pages/work/Leave';
import RoomBook from './pages/work/RoomBook';
import CarBook from './pages/work/CarBook';
import WorkExpenses from './pages/work/WorkExpenses';
import Payroll from './pages/work/Payroll';
import CustomerAdd from './pages/customer/CustomerAdd';
import Quotation from './pages/customer/Quotation';
import Invoice from './pages/customer/Invoice';
import Receipt from './pages/customer/Receipt';
import CustomerMeet from './pages/customer/CustomerMeet';
import CustomerNda from './pages/customer/CustomerNda';
import Income from './pages/finance/Income';
import FinanceExpenses from './pages/finance/FinanceExpenses';

console.log('App component loaded');

function App() {
  console.log('App component rendered');
  return (
    
        <div className="min-h-screen bg-[#b4b2af]">
          <Routes>
            {/* Route ของ work office */}
            <Route path="/work/JobApp" element={<JobApp />} />
            <Route path="/work/WorkTime" element={<WorkTime />} />
            <Route path="/work/ToDo" element={<ToDo />} />
            <Route path="/work/Leave" element={<Leave />} />
            <Route path="/work/RoomBook" element={<RoomBook />} />
            <Route path="/work/CarBook" element={<CarBook />} />
            <Route path="/work/WorkExpenses" element={<WorkExpenses />} />
            <Route path="/work/Payroll" element={<Payroll />} />
            
            {/* Route ของ customer */}
            <Route path="/customer/CustomerAdd" element={<CustomerAdd />} />
            <Route path="/customer/Quotation" element={<Quotation />} />
            <Route path="/customer/Invoice" element={<Invoice />} />
            <Route path="/customer/Receipt" element={<Receipt />} />
            <Route path="/customer/CustomerMeet" element={<CustomerMeet />} />
            <Route path="/customer/CustomerNda" element={<CustomerNda />} />

            {/* Route ของ finance */}
            <Route path="/finance/Income" element={<Income />} />
            <Route path="/finance/FinanceExpenses" element={<FinanceExpenses />} />

            <Route path="/" element={<Navigate to="/work/JobApp" replace />} />
          </Routes>
        </div>
      
    
  );
}

export default App;