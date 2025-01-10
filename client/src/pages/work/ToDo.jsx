import React, { useState, useRef, useEffect } from 'react';
import { User2, X } from 'lucide-react';
import pooh from '../../assets/pooh.jpg';
import Sidebar from '../../components/Sidebar';


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
        

        
      </div>
    </div>
  );
};

const ToDo = () => {
  
  const [activeTab, setActiveTab] = useState('สมัครงาน');
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const sections = [
    {
      title: 'งานที่ต้องทำ',
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
      title: 'งานที่กำลังทำ',
      candidates: [
        { name: 'Firstname Lastname' },
        { name: 'Firstname Lastname' },
      ]
    },
    {
      title: 'งานที่เสร็จ',
      candidates: [
        { name: 'Firstname Lastname' },
        { name: 'Firstname Lastname' },
      ]
    }
  ];

  return (
    
    <div className="flex h-screen bg-[#b4b2af]">
      <Sidebar />
      <div className="flex-1 ml-64">
        <div className="p-8 h-full flex flex-col">
          <div className="flex justify-end">
            <div className="bg-gray-600 text-white px-4 py-1 rounded-full text-sm">
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
    
  );
};

export default ToDo;