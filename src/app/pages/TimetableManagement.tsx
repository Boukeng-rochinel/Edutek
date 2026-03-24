import { useState } from 'react';
import { Plus, Download } from 'lucide-react';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const periods = [
  '08:00-09:00',
  '09:00-10:00',
  '10:00-11:00',
  'BREAK',
  '11:30-12:30',
  '12:30-13:30',
  '14:00-15:00',
  '15:00-16:00',
];

const timetableData: Record<string, Record<string, { subject: string; teacher: string; room: string } | null>> = {
  Monday: {
    '08:00-09:00': { subject: 'Mathematics', teacher: 'Mr. Nkeng', room: '101' },
    '09:00-10:00': { subject: 'English', teacher: 'Mrs. Fon', room: '102' },
    '10:00-11:00': { subject: 'French', teacher: 'Mme. Kamga', room: '103' },
    '11:30-12:30': { subject: 'Physics', teacher: 'Mr. Tchouake', room: 'Lab1' },
    '12:30-13:30': null,
    '14:00-15:00': { subject: 'Chemistry', teacher: 'Dr. Mballa', room: 'Lab2' },
    '15:00-16:00': { subject: 'Biology', teacher: 'Mrs. Ngono', room: '104' },
  },
  Tuesday: {
    '08:00-09:00': { subject: 'History', teacher: 'Mr. Ashu', room: '105' },
    '09:00-10:00': { subject: 'Geography', teacher: 'Mrs. Bih', room: '106' },
    '10:00-11:00': { subject: 'Mathematics', teacher: 'Mr. Nkeng', room: '101' },
    '11:30-12:30': { subject: 'Computer Science', teacher: 'Mr. Tabe', room: 'CompLab' },
    '12:30-13:30': null,
    '14:00-15:00': { subject: 'Physical Education', teacher: 'Coach Njong', room: 'Field' },
    '15:00-16:00': { subject: 'Art', teacher: 'Mrs. Stella', room: 'Art' },
  },
};

export default function TimetableManagement() {
  const [selectedClass, setSelectedClass] = useState('Form 1A');

  return (
    <div className="h-full flex flex-col">
      {/* Control Panel */}
      <div className="bg-white border-b border-gray-300 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <label className="text-xs text-gray-600 mr-2">Class:</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-2 py-1 border border-gray-300 text-xs focus:outline-none focus:border-gray-400"
            >
              <option>Form 1A</option>
              <option>Form 1B</option>
              <option>Form 2A</option>
              <option>Form 2B</option>
              <option>Form 3A</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-600 mr-2">Academic Year:</label>
            <span className="text-xs text-gray-900 font-medium">2025/2026</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="border border-gray-300 px-3 py-1 text-xs hover:bg-gray-50 flex items-center gap-1">
            <Download size={14} />
            Export
          </button>
          <button className="bg-[#017e84] text-white px-3 py-1 text-xs hover:bg-[#016168] flex items-center gap-1">
            <Plus size={14} />
            Add Period
          </button>
        </div>
      </div>

      {/* Timetable Grid */}
      <div className="flex-1 overflow-auto bg-white p-4">
        <table className="w-full text-xs border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 bg-gray-50 px-3 py-2 text-left font-medium text-gray-700 w-32">
                Time
              </th>
              {days.map((day) => (
                <th key={day} className="border border-gray-300 bg-gray-50 px-3 py-2 text-center font-medium text-gray-700">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {periods.map((period) => (
              <tr key={period}>
                <td className="border border-gray-300 bg-gray-50 px-3 py-2 font-medium text-gray-700">
                  {period}
                </td>
                {period === 'BREAK' ? (
                  <td colSpan={5} className="border border-gray-300 bg-yellow-50 px-3 py-2 text-center font-medium text-yellow-800">
                    BREAK TIME
                  </td>
                ) : (
                  days.map((day) => {
                    const slot = timetableData[day]?.[period];
                    return (
                      <td key={day} className="border border-gray-300 px-3 py-3 hover:bg-gray-50">
                        {slot ? (
                          <div>
                            <div className="font-medium text-gray-900">{slot.subject}</div>
                            <div className="text-gray-600 mt-0.5">{slot.teacher}</div>
                            <div className="text-gray-500 mt-0.5">Room: {slot.room}</div>
                          </div>
                        ) : (
                          <div className="text-gray-400 text-center">-</div>
                        )}
                      </td>
                    );
                  })
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
