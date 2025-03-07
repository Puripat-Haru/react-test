import React, { useState, useEffect, useRef } from 'react';
import { User2, X, Check, XCircle, CheckCircle } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';

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

  if (!isOpen || !candidate) return null;

  // ตรวจสอบค่า candidate.image
  console.log("Candidate image:", candidate.image);
  console.log("Candidate image URL:", `http://localhost:5000/uploads/${candidate.image}`);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div ref={modalRef} className="bg-white rounded-lg w-full max-w-xl text-black max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <div className="text-lg">วันที่สมัคร {new Date(candidate.applyDate).toLocaleDateString()}</div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content - Added overflow-y-auto */}
        <div className="p-6 overflow-y-auto">
          <div className="flex gap-6">
            <div className="flex-1">
              <div className="mb-6">
                <div className="font-medium mb-2">ชื่อ {candidate.firstName} {candidate.lastName}</div>
                <div className="mb-2">ตำแหน่งที่ต้องการ {candidate.desiredPosition}</div>
                <div>เงินเดือนที่คาดหวัง {candidate.expectedSalary} บาท/เดือน</div>
              </div>

              <div className="mb-6">
                <div className="font-medium mb-2">เอกสารที่ใช้ประกอบการสมัครงาน</div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={candidate.idCardCopy} readOnly />
                    <span>สำเนาบัตรประชาชน</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={candidate.houseRegistration} readOnly />
                    <span>สำเนาทะเบียนบ้าน</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={candidate.certificateCopy} readOnly />
                    <span>สำเนาประกาศนียบัตร</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={candidate.bankBookCopy} readOnly />
                    <span>สำเนาหน้าสมุดธนาคารกสิกร</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={candidate.otherDocuments} readOnly />
                    <span>อื่นๆ (ถ้ามี)</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="font-medium mb-2">Personal Information (ประวัติส่วนตัว)</div>
                <div className="space-y-2">
                  <div>ที่อยู่ปัจจุบัน เลขที่ {candidate.houseNumber} หมู่ที่ {candidate.moo} ถนน {candidate.street} ตำบล/แขวง {candidate.subDistrict}</div>
                  <div>อำเภอ/เขต {candidate.district} จังหวัด {candidate.province} รหัสไปรษณีย์ {candidate.postalCode}</div>
                  <div>เบอร์โทรศัพท์ {candidate.phone} อีเมล {candidate.email}</div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-6 flex-wrap">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked={candidate.livingStatus === 'อาศัยกับครอบครัว'} readOnly />
                      <span>อาศัยกับครอบครัว</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked={candidate.livingStatus === 'บ้านตัวเอง'} readOnly />
                      <span>บ้านตัวเอง</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked={candidate.livingStatus === 'บ้านเช่า'} readOnly />
                      <span>บ้านเช่า</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked={candidate.livingStatus === 'คอนโด'} readOnly />
                      <span>คอนโด</span>
                    </div>
                  </div>

                  <div>วัน/เดือน/ปีเกิด {new Date(candidate.birthDate).toLocaleDateString()} อายุ {candidate.age} ปี เชื้อชาติ {candidate.ethnicity}</div>
                  <div>สัญชาติ {candidate.nationality} ศาสนา {candidate.religion}</div>

                  <div className="font-medium mt-4 mb-2">ภาวะทางทหาร</div>
                  <div className="flex items-center gap-6 flex-wrap">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked={candidate.militaryStatus === 'ได้รับการยกเว้น'} readOnly />
                      <span>ได้รับการยกเว้น</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked={candidate.militaryStatus === 'ปลดเป็นทหารกองหนุน'} readOnly />
                      <span>ปลดเป็นทหารกองหนุน</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked={candidate.militaryStatus === 'ยังไม่ได้รับการเกณฑ์'} readOnly />
                      <span>ยังไม่ได้รับการเกณฑ์</span>
                    </div>
                  </div>

                  <div className="font-medium mt-4 mb-2">สถานภาพ</div>
                  <div className="flex items-center gap-6 flex-wrap">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked={candidate.maritalStatus === 'โสด'} readOnly />
                      <span>โสด</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked={candidate.maritalStatus === 'สมรส'} readOnly />
                      <span>สมรส</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked={candidate.maritalStatus === 'หย่าร้าง'} readOnly />
                      <span>หย่าร้าง</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-24">
              <img
                src={
                  candidate.image
                    ? candidate.image.startsWith('http') // ตรวจสอบว่าเป็น URL เต็มรูปแบบหรือไม่
                      ? candidate.image // ใช้ URL เต็มรูปแบบ
                      : `http://localhost:5000/uploads/${candidate.image}` // ใช้ path ในโฟลเดอร์ uploads
                    : ""
                }
                alt="User"
                className="w-full border"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TrialWorkView = ({ trialEmployees, onPromoteToEmployee, onDelete }) => {
  return (
    <div className="h-[calc(107vh-12rem)] p-6">
      <div className="bg-white rounded-lg overflow-hidden h-full flex flex-col">
        <table className="w-full table-fixed">
          <thead className="bg-white sticky top-0">
            <tr className="border-b">
              <th className="w-2/5 text-left p-4">ชื่อ</th>
              <th className="w-2/5 text-left p-4">ตำแหน่ง</th>
              <th className="w-1/5 text-center p-4">จัดการ</th>
            </tr>
          </thead>
        </table>
        <div className="overflow-y-auto flex-1">
          <table className="w-full table-fixed">
            <tbody>
              {trialEmployees.map((employee, index) => (
                <tr key={index} className="border-b">
                  <td className="w-2/5 p-4">{employee.firstName} {employee.lastName}</td>
                  <td className="w-2/5 p-4">{employee.desiredPosition}</td>
                  <td className="w-1/5 p-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => onPromoteToEmployee(employee.id)}
                        className="p-1 hover:bg-gray-100 rounded-full"
                      >
                        <CheckCircle className="w-5 h-5 text-black" />
                      </button>
                      <button
                        onClick={() => onDelete(employee.id)}
                        className="p-1 hover:bg-gray-100 rounded-full"
                      >
                        <XCircle className="w-5 h-5 text-black" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const JobApp = () => {
  const [activeTab, setActiveTab] = useState('สมัครงาน');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [jobApplications, setJobApplications] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));
  const userName = user ? user.name : 'Firstname Lastname';

  useEffect(() => {
    const fetchJobApplications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/job-applications');
        setJobApplications(response.data);
      } catch (error) {
        console.error("Error fetching job applications:", error);
      }
    };

    fetchJobApplications();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/job-applications/${id}/status`, { status });
      setJobApplications(prev => prev.map(app =>
        app.id === id ? { ...app, status } : app
      ));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handlePromoteToEmployee = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/job-applications/${id}/promote`);
      setJobApplications(prev => prev.filter(app => app.id !== id));
    } catch (error) {
      console.error("Error promoting to employee:", error);
    }
  };

  const handleDeleteJobApplication = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/job-applications/${id}`);
      setJobApplications(prev => prev.filter(app => app.id !== id));
    } catch (error) {
      console.error("Error deleting job application:", error);
    }
  };

  const sections = [
    {
      title: 'ผู้สมัครใหม่',
      color: 'bg-cyan-300',
      candidates: jobApplications.filter(app => app.status === 'สมัครงาน'),
    },
    {
      title: 'รอสัมภาษณ์',
      color: 'bg-yellow-300',
      candidates: jobApplications.filter(app => app.status === 'รอสัมภาษณ์'),
    },
    {
      title: 'ผ่านสัมภาษณ์',
      color: 'bg-green-400',
      candidates: jobApplications.filter(app => app.status === 'ผ่านสัมภาษณ์'),
      showButtons: false, // ไม่แสดงปุ่มติ๊กถูกหรือกากบาท
    }
  ];

  // แสดงผู้สมัครที่มีสถานะเป็น "ผ่านสัมภาษณ์" หรือ "ทดลองงาน" ในหน้าทดลองงาน
  const trialEmployees = jobApplications.filter(app =>
    app.status === 'ผ่านสัมภาษณ์' || app.status === 'ทดลองงาน'
  );

  return (
    <div className="flex h-screen bg-[#b4b2af]">
      <Sidebar />
      <div className="flex-1 ml-64">
        <div className="p-8 h-full flex flex-col">
          <div className="flex justify-end">
            <div className="bg-gray-600 text-white px-4 py-1 rounded-full text-sm">
              {userName}
            </div>
          </div>
          <div className="bg-gray-100">
            {/* Header */}
            <div className="border-b bg-[#b4b2af]">
              <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab('สมัครงาน')}
                    className={`px-8 py-3 text-black ${activeTab === 'สมัครงาน' ? 'bg-gray-100' : 'bg-[#dad8d7]'}`}
                  >
                    สมัครงาน
                  </button>
                  <button
                    onClick={() => setActiveTab('ทดลองงาน')}
                    className={`px-8 py-3 text-black ${activeTab === 'ทดลองงาน' ? 'bg-gray-100' : 'bg-[#dad8d7]'}`}
                  >
                    ทดลองงาน
                  </button>
                </div>
              </div>
            </div>

            {/* Content based on active tab */}
            {activeTab === 'สมัครงาน' ? (
              <>
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
                            <div key={idx} className="bg-white mb-2 rounded-md shadow-sm flex items-center px-3 py-2 gap-2">
                              <User2 className="w-6 h-6 text-black" />
                              <span
                                onClick={() => setSelectedCandidate(candidate)}
                                className="flex-1 text-sm cursor-pointer hover:bg-gray-100 px-2 py-1 rounded transition-colors text-black"
                              >
                                {candidate.firstName} {candidate.lastName}
                              </span>
                              {section.title === 'ผู้สมัครใหม่' && (
                                <>
                                  <button
                                    onClick={() => handleUpdateStatus(candidate.id, 'รอสัมภาษณ์')}
                                    className="p-1 hover:bg-gray-100 rounded-full"
                                  >
                                    <Check className="w-5 h-5 text-black" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteJobApplication(candidate.id)}
                                    className="p-1 hover:bg-gray-100 rounded-full"
                                  >
                                    <X className="w-5 h-5 text-black" />
                                  </button>
                                </>
                              )}
                              {section.title === 'รอสัมภาษณ์' && (
                                <>
                                  <button
                                    onClick={() => handleUpdateStatus(candidate.id, 'ผ่านสัมภาษณ์')}
                                    className="p-1 hover:bg-gray-100 rounded-full"
                                  >
                                    <Check className="w-5 h-5 text-black" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteJobApplication(candidate.id)}
                                    className="p-1 hover:bg-gray-100 rounded-full"
                                  >
                                    <X className="w-5 h-5 text-black" />
                                  </button>
                                </>
                              )}
                              {section.title === 'ผ่านสัมภาษณ์' && !section.showButtons && (
                                <div className="w-10"></div> // ไม่แสดงปุ่มติ๊กถูกหรือกากบาท
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Candidate Modal */}
                <CandidateModal
                  isOpen={selectedCandidate !== null}
                  onClose={() => setSelectedCandidate(null)}
                  candidate={selectedCandidate}
                />
              </>
            ) : (
              <TrialWorkView
                trialEmployees={trialEmployees}
                onPromoteToEmployee={handlePromoteToEmployee}
                onDelete={handleDeleteJobApplication}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobApp;