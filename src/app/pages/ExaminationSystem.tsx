import { useState } from 'react';
import { Plus, Filter, Download } from 'lucide-react';

const mockExams = [
  { id: 'EX001', name: 'Mid-Term Mathematics', class: 'Form 1A', date: '2026-03-28', time: '09:00', room: 'Hall A', invigilator: 'Mr. Nkeng', status: 'Scheduled' },
  { id: 'EX002', name: 'English Literature', class: 'Form 2B', date: '2026-03-29', time: '10:00', room: 'Hall B', invigilator: 'Mrs. Fon', status: 'Scheduled' },
  { id: 'EX003', name: 'Physics Practical', class: 'Form 3A', date: '2026-03-25', time: '14:00', room: 'Lab 1', invigilator: 'Mr. Tchouake', status: 'Completed' },
  { id: 'EX004', name: 'French Oral', class: 'Form 1A', date: '2026-03-30', time: '11:00', room: 'Room 105', invigilator: 'Mme. Kamga', status: 'Scheduled' },
  { id: 'EX005', name: 'Chemistry Test', class: 'Form 2A', date: '2026-03-26', time: '08:00', room: 'Lab 2', invigilator: 'Dr. Mballa', status: 'Completed' },
];

export default function ExaminationSystem() {
  const [selectedTab, setSelectedTab] = useState('exams');

  return (
    <div className="h-full flex flex-col">
      {/* Control Panel */}
      <div className="bg-white border-b border-gray-300 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="bg-[#017e84] text-white px-3 py-1.5 text-xs font-medium hover:bg-[#016168] flex items-center gap-1">
            <Plus size={14} />
            Schedule Exam
          </button>
          <button className="border border-gray-300 px-3 py-1.5 text-xs hover:bg-gray-50 flex items-center gap-1">
            <Filter size={14} />
            Filter
          </button>
          <button className="border border-gray-300 px-3 py-1.5 text-xs hover:bg-gray-50 flex items-center gap-1">
            <Download size={14} />
            Export
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-300 px-4 flex gap-4 text-xs">
        {['exams', 'results', 'hall-tickets'].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`py-2 px-1 border-b-2 capitalize ${
              selectedTab === tab
                ? 'border-[#017e84] text-gray-900 font-medium'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.replace('-', ' ')}
          </button>
        ))}
      </div>

      {/* Exam Schedule Tab */}
      {selectedTab === 'exams' && (
        <div className="flex-1 overflow-auto bg-white">
          <table className="w-full text-xs">
            <thead className="sticky top-0 bg-gray-50 border-b border-gray-300">
              <tr>
                <th className="text-left px-4 py-2 font-medium text-gray-700">Exam ID</th>
                <th className="text-left px-4 py-2 font-medium text-gray-700">Exam Name</th>
                <th className="text-left px-4 py-2 font-medium text-gray-700">Class</th>
                <th className="text-left px-4 py-2 font-medium text-gray-700">Date</th>
                <th className="text-left px-4 py-2 font-medium text-gray-700">Time</th>
                <th className="text-left px-4 py-2 font-medium text-gray-700">Room</th>
                <th className="text-left px-4 py-2 font-medium text-gray-700">Invigilator</th>
                <th className="text-left px-4 py-2 font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockExams.map((exam, index) => (
                <tr key={exam.id} className={`border-b border-gray-200 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                  <td className="px-4 py-2 font-medium text-gray-900">{exam.id}</td>
                  <td className="px-4 py-2 text-gray-900">{exam.name}</td>
                  <td className="px-4 py-2 text-gray-600">{exam.class}</td>
                  <td className="px-4 py-2 text-gray-600">{exam.date}</td>
                  <td className="px-4 py-2 text-gray-600">{exam.time}</td>
                  <td className="px-4 py-2 text-gray-600">{exam.room}</td>
                  <td className="px-4 py-2 text-gray-600">{exam.invigilator}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-0.5 text-xs ${
                      exam.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {exam.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Results Tab */}
      {selectedTab === 'results' && (
        <div className="flex-1 overflow-auto bg-white p-4">
          <div className="mb-4">
            <select className="px-2 py-1 border border-gray-300 text-xs focus:outline-none focus:border-gray-400">
              <option>Form 1A - Mid-Term Exams</option>
              <option>Form 1B - Mid-Term Exams</option>
              <option>Form 2A - Mid-Term Exams</option>
            </select>
          </div>
          <table className="w-full text-xs border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-3 py-2 text-left font-medium text-gray-700">Student ID</th>
                <th className="border border-gray-300 px-3 py-2 text-left font-medium text-gray-700">Name</th>
                <th className="border border-gray-300 px-3 py-2 text-center font-medium text-gray-700">Math</th>
                <th className="border border-gray-300 px-3 py-2 text-center font-medium text-gray-700">English</th>
                <th className="border border-gray-300 px-3 py-2 text-center font-medium text-gray-700">French</th>
                <th className="border border-gray-300 px-3 py-2 text-center font-medium text-gray-700">Physics</th>
                <th className="border border-gray-300 px-3 py-2 text-center font-medium text-gray-700">Average</th>
                <th className="border border-gray-300 px-3 py-2 text-center font-medium text-gray-700">Grade</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 'STU001', name: 'Kamga Marie', math: 85, english: 78, french: 92, physics: 88 },
                { id: 'STU002', name: 'Ngono Jean-Paul', math: 92, english: 88, french: 85, physics: 90 },
                { id: 'STU003', name: 'Tchouake Grace', math: 78, english: 82, french: 88, physics: 75 },
              ].map((student, index) => {
                const avg = ((student.math + student.english + student.french + student.physics) / 4).toFixed(1);
                return (
                  <tr key={student.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}>
                    <td className="border border-gray-300 px-3 py-2 font-medium">{student.id}</td>
                    <td className="border border-gray-300 px-3 py-2">{student.name}</td>
                    <td className="border border-gray-300 px-3 py-2 text-center">{student.math}</td>
                    <td className="border border-gray-300 px-3 py-2 text-center">{student.english}</td>
                    <td className="border border-gray-300 px-3 py-2 text-center">{student.french}</td>
                    <td className="border border-gray-300 px-3 py-2 text-center">{student.physics}</td>
                    <td className="border border-gray-300 px-3 py-2 text-center font-semibold">{avg}%</td>
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      <span className="px-2 py-0.5 bg-green-100 text-green-800">
                        {parseFloat(avg) >= 80 ? 'A' : 'B'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Hall Tickets Tab */}
      {selectedTab === 'hall-tickets' && (
        <div className="flex-1 overflow-auto bg-white p-4">
          <div className="mb-4">
            <button className="bg-[#017e84] text-white px-3 py-1 text-xs hover:bg-[#016168]">
              Generate Hall Tickets
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((ticket) => (
              <div key={ticket} className="border-2 border-gray-300 p-4 bg-white">
                <div className="border-b border-gray-200 pb-2 mb-3">
                  <h3 className="font-medium text-sm">SchoolERP - Mid-Term Exam</h3>
                  <p className="text-xs text-gray-600">March 2026</p>
                </div>
                <table className="w-full text-xs">
                  <tbody>
                    <tr>
                      <td className="py-1 text-gray-600">Student Name:</td>
                      <td className="py-1 font-medium">Kamga Marie</td>
                    </tr>
                    <tr>
                      <td className="py-1 text-gray-600">Student ID:</td>
                      <td className="py-1 font-medium">STU001</td>
                    </tr>
                    <tr>
                      <td className="py-1 text-gray-600">Class:</td>
                      <td className="py-1 font-medium">Form 1A</td>
                    </tr>
                    <tr>
                      <td className="py-1 text-gray-600">Exam Date:</td>
                      <td className="py-1 font-medium">March 28, 2026</td>
                    </tr>
                    <tr>
                      <td className="py-1 text-gray-600">Room:</td>
                      <td className="py-1 font-medium">Hall A</td>
                    </tr>
                  </tbody>
                </table>
                <button className="mt-3 w-full border border-gray-300 px-2 py-1 text-xs hover:bg-gray-50">
                  Download PDF
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
