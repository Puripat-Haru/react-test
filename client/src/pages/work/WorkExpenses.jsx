import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { Calendar, Receipt, Plus, Trash2, X } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../components/ui/dialog";

const WorkExpenses = () => {

    const user = JSON.parse(localStorage.getItem('user'));
    const userName = user ? user.name : 'Firstname Lastname';

    const [expenses, setExpenses] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const [open, setOpen] = useState(false);
    const [currentExpense, setCurrentExpense] = useState({
        date: '',
        description: '',
        amount: '',
        category: 'travel'
    });

    const getCategoryThai = (category) => {
        const categories = {
            travel: 'ค่าเดินทาง',
            meal: 'ค่าอาหาร',
            accomodation: 'ค่าที่พัก',
            other: 'อื่นๆ'
        };
        return categories[category];
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentExpense.description && currentExpense.amount && currentExpense.date) {
            setExpenses([...expenses, { ...currentExpense, id: Date.now() }]);
            setCurrentExpense({
                date: '',
                description: '',
                amount: '',
                category: 'travel'
            });
            setOpen(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        }
    };

    const deleteExpense = (id) => {
        setExpenses(expenses.filter(expense => expense.id !== id));
    };

    const totalAmount = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount || 0), 0);

    return (
        <div className="flex min-h-screen bg-[#b4b2af]">
            <Sidebar />

            <div className="ml-[250px] w-[calc(100%-250px)]">
                <div className="bg-[#b4b2af] p-4 flex justify-end">
                    <div className="bg-[#374151] text-white px-6 py-2 rounded-full">
                        {userName}
                    </div>
                </div>
                <div className="p-6">
                    {showSuccess && (
                        <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg">
                            เพิ่มรายการค่าใช้จ่ายเรียบร้อยแล้ว
                        </div>
                    )}

                    <div className="bg-white rounded-lg shadow-lg mb-6">
                        <div className="p-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-semibold flex items-center gap-2">
                                    <Receipt className="h-6 w-6" />
                                    ระบบเบิกค่าใช้จ่าย
                                </h2>
                                <Dialog open={open} onOpenChange={setOpen}>
                                    <DialogTrigger asChild>
                                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center gap-2">
                                            <Plus className="h-4 w-4" />
                                            เพิ่มรายการ
                                        </button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[500px]">
                                        <DialogHeader>
                                            <DialogTitle className="text-lg font-semibold">
                                                เพิ่มรายการค่าใช้จ่าย
                                            </DialogTitle>
                                        </DialogHeader>
                                        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-1">วันที่</label>
                                                <div className="relative">
                                                    <input
                                                        type="date"
                                                        value={currentExpense.date}
                                                        onChange={(e) => setCurrentExpense({ ...currentExpense, date: e.target.value })}
                                                        className="w-full pl-10 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        required
                                                    />
                                                    <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium mb-1">ประเภทค่าใช้จ่าย</label>
                                                <select
                                                    value={currentExpense.category}
                                                    onChange={(e) => setCurrentExpense({ ...currentExpense, category: e.target.value })}
                                                    className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                >
                                                    <option value="travel">ค่าเดินทาง</option>
                                                    <option value="meal">ค่าอาหาร</option>
                                                    <option value="accommodation">ค่าที่พัก</option>
                                                    <option value="other">อื่นๆ</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium mb-1">รายละเอียด</label>
                                                <input
                                                    type="text"
                                                    value={currentExpense.description}
                                                    onChange={(e) => setCurrentExpense({ ...currentExpense, description: e.target.value })}
                                                    placeholder="กรอกรายละเอียดค่าใช้จ่าย"
                                                    className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium mb-1">จำนวนเงิน</label>
                                                <input
                                                    type="number"
                                                    value={currentExpense.amount}
                                                    onChange={(e) => setCurrentExpense({ ...currentExpense, amount: e.target.value })}
                                                    placeholder="0.00"
                                                    className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    required
                                                    min="0"
                                                    step="0.01"
                                                />
                                            </div>

                                            <div className="flex justify-end gap-2 mt-6">
                                                <button
                                                    type="button"
                                                    onClick={() => setOpen(false)}
                                                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                                                >
                                                    ยกเลิก
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                    เพิ่มรายการ
                                                </button>
                                            </div>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg h-[calc(103vh-270px)]">
                        <div className="p-6 border-b">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-semibold">รายการเบิกค่าใช้จ่าย</h2>
                            </div>
                        </div>
                        <div className="p-6 h-[calc(100%-85px)] overflow-hidden">
                            <div className="overflow-y-auto h-full">
                                {expenses.length === 0 ? (
                                    <div className="text-center py-8 text-gray-500">
                                        ยังไม่มีรายการค่าใช้จ่าย
                                    </div>
                                ) : (
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-left p-2">วันที่</th>
                                                <th className="text-left p-2">ประเภท</th>
                                                <th className="text-left p-2">รายละเอียด</th>
                                                <th className="text-right p-2">จำนวนเงิน</th>
                                                <th className="p-2"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {expenses.map(expense => (
                                                <tr key={expense.id} className="border-b hover:bg-gray-50">
                                                    <td className="p-2">{expense.date}</td>
                                                    <td className="p-2">{getCategoryThai(expense.category)}</td>
                                                    <td className="p-2">{expense.description}</td>
                                                    <td className="p-2 text-right">
                                                        {parseFloat(expense.amount).toLocaleString('th-TH', {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2
                                                        })}
                                                    </td>
                                                    <td className="p-2">
                                                        <button
                                                            onClick={() => deleteExpense(expense.id)}
                                                            className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
                                                        >
                                                            <Trash2 className="h-5 w-5" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            <tr className="font-bold bg-gray-50">
                                                <td colSpan={3} className="p-2 text-right">รวมทั้งหมด</td>
                                                <td className="p-2 text-right">
                                                    {totalAmount.toLocaleString('th-TH', {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2
                                                    })}
                                                </td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkExpenses;