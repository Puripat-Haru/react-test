import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import Sidebar from '../../components/Sidebar';

const TaskCard = ({ title, description, onDelete }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-4 mb-3">
            <div className="flex justify-between items-start mb-2">
                <input
                    type="text"
                    value={title}
                    placeholder="ชื่อผู้ใช้งาน"
                    className="w-full bg-transparent border-none focus:outline-none text-sm font-medium"
                    readOnly
                />
                <button
                    onClick={onDelete}
                    className="p-1 hover:bg-gray-100 rounded-full"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
            <textarea
                value={description}
                placeholder="รายละเอียดงานที่ต้องทำ"
                className="w-full bg-transparent border-none focus:outline-none text-sm resize-none min-h-[60px]"
                readOnly
            />
            <div className="flex justify-end gap-2 mt-2">
                <button className="px-3 py-1 text-sm rounded bg-red-600 text-white hover:bg-red-200">
                    ลบ
                </button>
                <button className="px-3 py-1 text-sm rounded bg-green-600 text-white hover:bg-green-200">
                    เริ่มทำ
                </button>
            </div>
        </div>
    );
};

const TaskColumn = ({ title, tasks, onAddTask }) => {
    return (
        <div className="flex-1 bg-gray-50 rounded-lg overflow-hidden flex flex-col">
            <div className="bg-white py-3 px-4 border-b">
                <div className="flex justify-between items-center">
                    <h3 className="font-medium">{title}</h3>
                    <button
                        onClick={onAddTask}
                        className="p-1 hover:bg-gray-100 rounded-full"
                    >
                        <Plus className="w-5 h-5" />
                    </button>
                </div>
            </div>
            <div className="p-4 flex-1 overflow-y-auto">
                {tasks.map((task, index) => (
                    <TaskCard
                        key={index}
                        title={task.title}
                        description={task.description}
                        onDelete={() => console.log('Delete task', index)}
                    />
                ))}
            </div>
        </div>
    );
};

const ToDo = () => {
    const [sections] = useState([
        {
            title: 'งานที่ต้องทำ',
            tasks: [
                { title: 'ชื่อผู้ใช้งาน 1', description: 'รายละเอียดงานที่ต้องทำ' },
                { title: 'ชื่อผู้ใช้งาน 2', description: 'รายละเอียดงานที่ต้องทำ' },
                { title: 'ชื่อผู้ใช้งาน 5', description: 'รายละเอียดงานที่ต้องทำ' },
                { title: 'ชื่อผู้ใช้งาน 6', description: 'รายละเอียดงานที่ต้องทำ' }
            ]
        },
        {
            title: 'งานที่กำลังทำ',
            tasks: [
                { title: 'ชื่อผู้ใช้งาน 3', description: 'รายละเอียดงานที่ต้องทำ' }
            ]
        },
        {
            title: 'งานที่เสร็จ',
            tasks: [
                { title: 'ชื่อผู้ใช้งาน 4', description: 'รายละเอียดงานที่ต้องทำ' }
            ]
        }
    ]);

    const [activeTab, setActiveTab] = useState('สมัครงาน');

    return (
        <div className="flex-h-screen bg-[#b4b2af]">
            <Sidebar />
            <div className="flex-1 ml-64">
                <div className="max-w-7xl mx-auto">
                    <header className="flex justify-between items-center">
                        <div className="flex">
                            <button
                                onClick={() => setActiveTab('สมัครงาน')}
                                className={`px-8 py-3 text-black ${activeTab === 'สมัครงาน'
                                    ? 'bg-gray-100'
                                    : 'bg-[#dad8d7]'
                                    }`}
                            >
                                สมัครงาน
                            </button>
                            <button
                                onClick={() => setActiveTab('ทดลองงาน')}
                                className={`px-8 py-3 text-black ${activeTab === 'ทดลองงาน'
                                    ? 'bg-gray-100'
                                    : 'bg-[#dad8d7]'
                                    }`}
                            >
                                ทดลองงาน
                            </button>
                        </div>
                        <div className="bg-gray-600 text-white px-4 py-1 rounded-full text-sm mr-4">
                            Firstname Lastname
                        </div>
                    </header>

                    <div className="p-6">
                        <div className="flex gap-6">
                            {sections.map((section, index) => (
                                <TaskColumn
                                    key={index}
                                    title={section.title}
                                    tasks={section.tasks}
                                    onAddTask={() => console.log('Add task to', section.title)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToDo;