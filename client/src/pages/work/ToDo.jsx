import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Sidebar from '../../components/Sidebar';

const TaskModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        project: '',
        task: '',
        description: ''
    });

    if (!isOpen) return null;

    const handleSubmit = () => {
        onSubmit(formData);
        setFormData({ project: '', task: '', description: '' });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-[500px]">
                <h2 className="text-xl mb-4">เพิ่ม Task</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm mb-1">ชื่อโปรเจค</label>
                        <input
                            type="text"
                            className="w-full border rounded p-2"
                            value={formData.project}
                            onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">ชื่องานที่ต้องทำ</label>
                        <input
                            type="text"
                            className="w-full border rounded p-2"
                            value={formData.task}
                            onChange={(e) => setFormData({ ...formData, task: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">รายละเอียดงานที่ต้องทำ</label>
                        <textarea
                            className="w-full border rounded p-2 h-32"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 rounded text-red-500 border border-red-500 hover:bg-red-50"
                        >
                            ยกเลิก
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="px-6 py-2 rounded bg-green-500 text-white hover:bg-green-600"
                        >
                            บันทึก
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TaskCard = ({ project, task, description }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm mb-4">
            <div className="space-y-2 p-4">
                <div className="text-sm font-medium text-gray-900">{project}</div>
                <div className="text-sm text-gray-800">{task}</div>
                <div className="text-sm text-gray-600 min-h-[112px]">{description}</div>
                <div className="flex justify-end gap-2 mt-3">
                    <button className="px-4 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600">
                        ลบ
                    </button>
                    <button className="px-4 py-1 text-sm rounded bg-green-600 text-white hover:bg-green-700">
                        เริ่มทำ
                    </button>
                </div>
            </div>
        </div>
    );
};

const TaskColumn = ({ title, tasks }) => {
    return (
        <div className="flex-1">
            <h3 className="text-gray-700 mb-3 text-center">{title}</h3>
            <div className="overflow-y-auto pr-2 max-h-[calc(100vh-280px)]">
                {tasks.map((task, index) => (
                    <TaskCard
                        key={index}
                        project={task.project}
                        task={task.task}
                        description={task.description}
                    />
                ))}
            </div>
        </div>
    );
};

const ToDo = () => {

    const user = JSON.parse(localStorage.getItem('user'));
    const userName = user ? user.name : 'Firstname Lastname';

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sections, setSections] = useState([
        {
            title: 'งานที่ต้องทำ',
            tasks: [
                {
                    project: 'โปรเจค A',
                    task: 'ออกแบบหน้า Dashboard',
                    description: 'ออกแบบและพัฒนาหน้า Dashboard ให้แสดงข้อมูลสำคัญต่างๆ ได้อย่างครบถ้วน พร้อมทั้งสามารถตอบสนองกับการใช้งานบนอุปกรณ์ต่างๆ ได้'
                },
                {
                    project: 'โปรเจค B',
                    task: 'แก้ไขบัค Login',
                    description: 'แก้ไขปัญหาการ Login ที่บางครั้งระบบไม่สามารถจดจำผู้ใช้ได้ และต้องทำการ Login ใหม่'
                }
            ]
        },
        {
            title: 'งานที่กำลังทำ',
            tasks: [
                {
                    project: 'โปรเจค C',
                    task: 'พัฒนาระบบแจ้งเตือน',
                    description: 'พัฒนาระบบแจ้งเตือนผ่าน Line Notification เมื่อมีการอัพเดทสถานะงาน'
                },
                {
                    project: 'โปรเจค B',
                    task: 'แก้ไขบัค Login',
                    description: 'แก้ไขปัญหาการ Login ที่บางครั้งระบบไม่สามารถจดจำผู้ใช้ได้ และต้องทำการ Login ใหม่'
                },
                {
                    project: 'โปรเจค B',
                    task: 'แก้ไขบัค Login',
                    description: 'แก้ไขปัญหาการ Login ที่บางครั้งระบบไม่สามารถจดจำผู้ใช้ได้ และต้องทำการ Login ใหม่'
                }
            ]
        },
        {
            title: 'งานที่เสร็จ',
            tasks: [
                {
                    project: 'โปรเจค D',
                    task: 'อัพเดท UI ใหม่',
                    description: 'ปรับปรุง UI ให้ทันสมัยและใช้งานง่ายขึ้น ตามแบบที่ได้รับการอนุมัติจากทีมออกแบบ'
                }
            ]
        }
    ]);

    const [activeTab, setActiveTab] = useState('รายละเอียดงาน');

    const handleAddTask = (newTask) => {
        setSections(prevSections => {
            const newSections = [...prevSections];
            newSections[0].tasks = [...newSections[0].tasks, newTask];
            return newSections;
        });
    };

    return (
        <div className="flex min-h-screen bg-[#b4b2af]">
            <Sidebar />
            <div className="flex-1 ml-64 p-5">
                <div className="bg-gray-600 text-white px-4 py-1 rounded-full text-sm w-fit mb-4 ml-auto mr-4">
                    {userName}
                </div>
                <div className="bg-gray-100  h-[calc(100vh-88px)] max-w-[1200px] mx-auto">
                    <div className="bg-[#b4b2af] shadow-sm ">
                        <div className="flex">
                            <button
                                onClick={() => setActiveTab('รายละเอียดงาน')}
                                className={`px-8 py-3 ${activeTab === 'รายละเอียดงาน' ? 'bg-gray-100' : 'bg-gray-200'}`}
                            >
                                รายละเอียดงาน
                            </button>
                            <button
                                onClick={() => setActiveTab('ภาพรวมงาน')}
                                className={`px-8 py-3 ${activeTab === 'ภาพรวมงาน' ? 'bg-gray-100' : 'bg-gray-200'}`}
                            >
                                ภาพรวมงาน
                            </button>
                        </div>
                    </div>

                    <div className="p-6">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-2"
                        >
                            <Plus className="w-5 h-5" />
                            สร้าง Task
                        </button>

                        <div className="flex gap-6">
                            {sections.map((section, index) => (
                                <TaskColumn
                                    key={index}
                                    title={section.title}
                                    tasks={section.tasks}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <TaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddTask}
            />
        </div>
    );
};

export default ToDo;