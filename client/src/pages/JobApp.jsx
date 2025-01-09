import React, { useState, useRef, useEffect } from 'react';
import { User2, X } from 'lucide-react';
import pooh from '../assets/pooh.jpg';
import Side_Work_office from '../components/Side-Work-office';
import { BrowserRouter } from 'react-router-dom';

const CandidateModal = ({ isOpen, onClose, candidate }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div ref={modalRef} className="bg-white rounded-lg w-full max-w-xl text-black max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <div className="text-lg">วันที่สมัคร 01/01/2567</div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content - Added overflow-y-auto */}
        <div className="p-6 overflow-y-auto">
          <div className="flex gap-6">
            <div className="flex-1">
              <div className="mb-6">
                <div className="font-medium mb-2">ชื่อ firstname lastname</div>
                <div className="mb-2">ตำแหน่งที่ต้องการ Job Position</div>
                <div>เงินเดือนที่คาดหวัง xx,xxx บาท/เดือน</div>
              </div>

              <div className="mb-6">
                <div className="font-medium mb-2">เอกสารที่ใช้ประกอบการสมัครงาน</div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked readOnly />
                    <span>สำเนาบัตรประชาชน</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked readOnly />
                    <span>สำเนาทะเบียนบ้าน</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked readOnly />
                    <span>สำเนาประกาศนียบัตร</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked readOnly />
                    <span>สำเนาหน้าสมุดธนาคารกสิกร</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span>อื่นๆ (ถ้ามี)</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="font-medium mb-2">Personal Information (ประวัติส่วนตัว)</div>
                <div className="space-y-2">
                  <div>ที่อยู่ปัจจุบัน เลขที่ 111 หมู่ที่ 1 ถนน ชื่อถนน ตำบล/แขวง ชื่อตำบล/แขวง</div>
                  <div>อำเภอ/เขต ชื่ออำเภอ/เขต จังหวัด ชื่อจังหวัด รหัสไปรษณีย์ 11111</div>
                  <div>เบอร์โทรศัพท์ 0812345679 อีเมล name@gmail.com</div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-6 flex-wrap">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked readOnly />
                      <span>อาศัยกับครอบครัว</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" />
                      <span>บ้านตัวเอง</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" />
                      <span>บ้านเช่า</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" />
                      <span>หอพัก</span>
                    </div>
                  </div>

                  <div>วัน/เดือน/ปีเกิด 01/01/1999 อายุ 20 ปี เชื้อชาติ ไทย</div>
                  <div>สัญชาติ ไทย ศาสนา พุทธ</div>

                  <div className="font-medium mt-4 mb-2">ภาวะทางทหาร</div>
                  <div className="flex items-center gap-6 flex-wrap">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" />
                      <span>ได้รับการยกเว้น</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" />
                      <span>ปลดเป็นทหารกองหนุน</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" />
                      <span>ยังไม่ได้รับการเกณฑ์</span>
                    </div>
                  </div>

                  <div className="font-medium mt-4 mb-2">สถานภาพ</div>
                  <div className="flex items-center gap-6 flex-wrap">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" />
                      <span>โสด</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" />
                      <span>ปลดเป็นทหารกองหนุน</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" />
                      <span>ยังไม่ได้รับการเกณฑ์</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-24">
              <img src={pooh} alt="User" className="w-full border" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InterviewBoard = () => {
  const [activeTab, setActiveTab] = useState('สมัครงาน');
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const sections = [
    {
      title: 'ผู้สมัครใหม่',
      color: 'bg-cyan-300',
      candidates: [
        { name: 'Firstname Lastname' },
        { name: 'Firstname Lastname' },
        { name: 'Firstname Lastname' },
        { name: 'Firstname Lastname' },
        { name: 'Firstname Lastname' },
        { name: 'Firstname Lastname' },
        { name: 'Firstname Lastname' },
        { name: 'Firstname Lastname' },
        { name: 'Firstname Lastname' },
        { name: 'Firstname Lastname' },
        { name: 'Firstname Lastname' },
        { name: 'Firstname Lastname' },
        { name: 'Firstname Lastname' },
        { name: 'Firstname Lastname' },
        { name: 'Firstname Lastname' },
      ]
    },
    {
      title: 'รอสัมภาษณ์',
      color: 'bg-yellow-300',
      candidates: [
        { name: 'Firstname Lastname' },
        { name: 'Firstname Lastname' },
      ]
    },
    {
      title: 'ผ่านสัมภาษณ์',
      color: 'bg-green-400',
      candidates: [
        { name: 'Firstname Lastname' },
        { name: 'Firstname Lastname' },
      ]
    }
  ];

  return (
    <BrowserRouter>
    <div className="flex">
      <Side_Work_office />
      <div className="ml-[250px] w-[calc(100%-250px)]">
        <div className="bg-[#b4b2af] p-8 min-h-screen flex flex-col">
          <div className="flex justify-end">
            <div className="bg-gray-600 text-white px-4 py-1 rounded-full text-sm mr-4">
              Firstname Lastname
            </div>
          </div>
          <div className="bg-gray-100 ">
            {/* Header */}
            <div className="border-b bg-[#b4b2af]">
              <div className="max-w-7xl mx-auto flex justify-between items-center">
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
                {/* <div className="bg-gray-600 text-white px-4 py-1 rounded-full text-sm mr-4">
              Firstname Lastname
            </div> */}
              </div>
            </div>

            {/* Board Container */}
            <div className="max-w-7xl mx-auto p-6">
              <div className="flex gap-6 h-[calc(100vh-12rem)]">
                {sections.map((section, index) => (
                  <div key={index} className="flex-1 bg-gray-50 rounded-lg overflow-hidden flex flex-col">
                    <div className={`${section.color} py-3 text-center font-medium text-black`}>
                      {section.title}
                    </div>
                    <div className="p-2 flex-1 overflow-y-auto">
                      {section.candidates.map((candidate, idx) => (
                        <div
                          key={idx}
                          className="bg-white mb-2 rounded-md shadow-sm flex items-center px-3 py-2 gap-2"
                        >
                          <User2 className="w-6 h-6 text-black" />
                          <span
                            onClick={() => setSelectedCandidate(candidate)}
                            className="flex-1 text-sm cursor-pointer hover:bg-gray-100 px-2 py-1 rounded transition-colors text-black"
                          >
                            {candidate.name}
                          </span>
                          <button className="p-1 hover:bg-gray-100 rounded-full">
                            <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded-full">
                            <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <CandidateModal
              isOpen={selectedCandidate !== null}
              onClose={() => setSelectedCandidate(null)}
              candidate={selectedCandidate}
            />
          </div>
        </div>
      </div>
    </div>
    </BrowserRouter>
  );
};

export default InterviewBoard;