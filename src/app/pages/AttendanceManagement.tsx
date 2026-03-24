import { useState } from 'react';
import { Save, Filter, MoreVertical, Calendar as CalendarIcon } from 'lucide-react';

const mockAttendance = [
  { id: 'STU001', name: 'Kamga Marie', class: 'Form 1A', status: 'present' },
  { id: 'STU002', name: 'Ngono Jean-Paul', class: 'Form 1A', status: 'present' },
  { id: 'STU003', name: 'Tchouake Grace', class: 'Form 1A', status: 'absent' },
  { id: 'STU004', name: 'Mballa Patrick', class: 'Form 1A', status: 'late' },
  { id: 'STU005', name: 'Fon Bernadette', class: 'Form 1A', status: 'present' },
  { id: 'STU006', name: 'Nkeng Samuel', class: 'Form 1A', status: 'present' },
  { id: 'STU007', name: 'Ashu Emmanuel', class: 'Form 1A', status: 'present' },
  { id: 'STU008', name: 'Nfor Precious', class: 'Form 1A', status: 'late' },
  { id: 'STU009', name: 'Bih Collins', class: 'Form 1A', status: 'present' },
  { id: 'STU010', name: 'Tabe Christelle', class: 'Form 1A', status: 'present' },
];

export default function AttendanceManagement() {
  const [selectedDate, setSelectedDate] = useState('2026-03-24');
  const [selectedClass, setSelectedClass] = useState('Form 1A');
  const [attendanceRecords, setAttendanceRecords] = useState(mockAttendance);

  const handleStatusChange = (id: string, newStatus: string) => {
    setAttendanceRecords(records =>
      records.map(record =>
        record.id === id ? { ...record, status: newStatus } : record
      )
    );
  };

  const handleMarkAll = (status: string) => {
    setAttendanceRecords(records =>
      records.map(record => ({ ...record, status }))
    );
  };

  const getStatusCount = (status: string) => {
    return attendanceRecords.filter(r => r.status === status).length;
  };

  const attendanceRate = ((getStatusCount('present') + getStatusCount('late')) / attendanceRecords.length * 100).toFixed(1);

  return (
    <div className="h-full flex flex-col">
      {/* Control Panel */}
      <div className="bg-white border-b border-gray-300 px-4 py-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <CalendarIcon size={14} className="text-gray-600" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-2 py-1 border border-gray-300 text-xs focus:outline-none focus:border-gray-400"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-600">Class:</label>
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
          <div className="h-4 w-px bg-gray-300"></div>
          <button 
            onClick={() => handleMarkAll('present')}
            className="px-3 py-1 text-xs hover:bg-gray-100 text-gray-700"
          >
            Mark All Present
          </button>
          <button 
            onClick={() => handleMarkAll('absent')}
            className="px-3 py-1 text-xs hover:bg-gray-100 text-gray-700"
          >
            Mark All Absent
          </button>
          <div className="flex-1"></div>
          <button className="border border-gray-300 px-3 py-1 text-xs hover:bg-gray-50 flex items-center gap-1">
            <Filter size={14} />
            Filters
          </button>
          <button className="bg-[#017e84] text-white px-3 py-1 text-xs hover:bg-[#016168] flex items-center gap-1">
            <Save size={14} />
            Save
          </button>
          <button className="p-1 hover:bg-gray-100">
            <MoreVertical size={16} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-[#f0f0f0] border-b border-gray-300 px-4 py-2">
        <div className="flex gap-6 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Total:</span>
            <span className="font-semibold text-gray-900">{attendanceRecords.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Present:</span>
            <span className="font-semibold text-green-600">{getStatusCount('present')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Absent:</span>
            <span className="font-semibold text-red-600">{getStatusCount('absent')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Late:</span>
            <span className="font-semibold text-yellow-600">{getStatusCount('late')}</span>
          </div>
          <div className="h-4 w-px bg-gray-400"></div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Attendance Rate:</span>
            <span className="font-semibold text-gray-900">{attendanceRate}%</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto bg-white">
        <table className="w-full text-xs">
          <thead className="sticky top-0 bg-gray-50 border-b border-gray-300">
            <tr>
              <th className="text-left px-4 py-2 font-medium text-gray-700">Student ID</th>
              <th className="text-left px-4 py-2 font-medium text-gray-700">Student Name</th>
              <th className="text-left px-4 py-2 font-medium text-gray-700">Class</th>
              <th className="text-center px-4 py-2 font-medium text-gray-700 w-24">Present</th>
              <th className="text-center px-4 py-2 font-medium text-gray-700 w-24">Absent</th>
              <th className="text-center px-4 py-2 font-medium text-gray-700 w-24">Late</th>
              <th className="text-center px-4 py-2 font-medium text-gray-700 w-24">Excused</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.map((record, index) => (
              <tr key={record.id} className={`border-b border-gray-200 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                <td className="px-4 py-2 font-medium text-gray-900">{record.id}</td>
                <td className="px-4 py-2 text-gray-900">{record.name}</td>
                <td className="px-4 py-2 text-gray-600">{record.class}</td>
                <td className="px-4 py-2 text-center">
                  <input
                    type="radio"
                    name={`attendance-${record.id}`}
                    checked={record.status === 'present'}
                    onChange={() => handleStatusChange(record.id, 'present')}
                    className="border-gray-300"
                  />
                </td>
                <td className="px-4 py-2 text-center">
                  <input
                    type="radio"
                    name={`attendance-${record.id}`}
                    checked={record.status === 'absent'}
                    onChange={() => handleStatusChange(record.id, 'absent')}
                    className="border-gray-300"
                  />
                </td>
                <td className="px-4 py-2 text-center">
                  <input
                    type="radio"
                    name={`attendance-${record.id}`}
                    checked={record.status === 'late'}
                    onChange={() => handleStatusChange(record.id, 'late')}
                    className="border-gray-300"
                  />
                </td>
                <td className="px-4 py-2 text-center">
                  <input
                    type="radio"
                    name={`attendance-${record.id}`}
                    checked={record.status === 'excused'}
                    onChange={() => handleStatusChange(record.id, 'excused')}
                    className="border-gray-300"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-300 px-4 py-2 flex items-center justify-between text-xs text-gray-600">
        <div>Attendance for {selectedClass} on {selectedDate}</div>
        <div>{attendanceRecords.length} students</div>
      </div>
    </div>
  );
}
