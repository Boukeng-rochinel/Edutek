import { useState } from 'react';
import { Save, Filter, MoreVertical } from 'lucide-react';

const students = [
  { id: 'STU001', name: 'Kamga Marie', math: 85, english: 78, french: 92, physics: 88, chemistry: 82, biology: 90 },
  { id: 'STU002', name: 'Ngono Jean-Paul', math: 92, english: 88, french: 85, physics: 90, chemistry: 88, biology: 86 },
  { id: 'STU003', name: 'Tchouake Grace', math: 78, english: 82, french: 88, physics: 75, chemistry: 80, biology: 85 },
  { id: 'STU004', name: 'Mballa Patrick', math: 88, english: 75, french: 80, physics: 85, chemistry: 78, biology: 82 },
  { id: 'STU005', name: 'Fon Bernadette', math: 95, english: 90, french: 92, physics: 93, chemistry: 91, biology: 94 },
  { id: 'STU006', name: 'Nkeng Samuel', math: 70, english: 72, french: 75, physics: 68, chemistry: 74, biology: 76 },
  { id: 'STU007', name: 'Ashu Emmanuel', math: 82, english: 85, french: 80, physics: 83, chemistry: 79, biology: 81 },
  { id: 'STU008', name: 'Nfor Precious', math: 90, english: 87, french: 89, physics: 91, chemistry: 86, biology: 88 },
];

export default function Gradebook() {
  const [selectedClass, setSelectedClass] = useState('Form 1A');
  const [selectedTerm, setSelectedTerm] = useState('Term 1');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');

  const calculateAverage = (student: typeof students[0]) => {
    const total = student.math + student.english + student.french + student.physics + student.chemistry + student.biology;
    return (total / 6).toFixed(1);
  };

  const getGrade = (average: number) => {
    if (average >= 90) return 'A+';
    if (average >= 80) return 'A';
    if (average >= 70) return 'B';
    if (average >= 60) return 'C';
    return 'D';
  };

  const classAverage = (students.reduce((sum, s) => sum + parseFloat(calculateAverage(s)), 0) / students.length).toFixed(1);
  const highestScore = Math.max(...students.map(s => parseFloat(calculateAverage(s)))).toFixed(1);
  const lowestScore = Math.min(...students.map(s => parseFloat(calculateAverage(s)))).toFixed(1);

  return (
    <div className="h-full flex flex-col">
      {/* Control Panel */}
      <div className="bg-white border-b border-gray-300 px-4 py-2">
        <div className="flex items-center gap-4">
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
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-600">Term:</label>
            <select
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              className="px-2 py-1 border border-gray-300 text-xs focus:outline-none focus:border-gray-400"
            >
              <option>Term 1</option>
              <option>Term 2</option>
              <option>Term 3</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-600">Subject:</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-2 py-1 border border-gray-300 text-xs focus:outline-none focus:border-gray-400"
            >
              <option>All Subjects</option>
              <option>Mathematics</option>
              <option>English</option>
              <option>French</option>
              <option>Physics</option>
              <option>Chemistry</option>
              <option>Biology</option>
            </select>
          </div>
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
            <span className="text-gray-600">Class Average:</span>
            <span className="font-semibold text-gray-900">{classAverage}%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Highest:</span>
            <span className="font-semibold text-green-600">{highestScore}%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Lowest:</span>
            <span className="font-semibold text-red-600">{lowestScore}%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Pass Rate:</span>
            <span className="font-semibold text-gray-900">100%</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto bg-white">
        <table className="w-full text-xs">
          <thead className="sticky top-0 bg-gray-50 border-b border-gray-300">
            <tr>
              <th className="text-left px-4 py-2 font-medium text-gray-700 sticky left-0 bg-gray-50 z-10">ID</th>
              <th className="text-left px-4 py-2 font-medium text-gray-700 sticky left-16 bg-gray-50 z-10">Student Name</th>
              <th className="text-center px-4 py-2 font-medium text-gray-700 w-20">Math</th>
              <th className="text-center px-4 py-2 font-medium text-gray-700 w-20">English</th>
              <th className="text-center px-4 py-2 font-medium text-gray-700 w-20">French</th>
              <th className="text-center px-4 py-2 font-medium text-gray-700 w-20">Physics</th>
              <th className="text-center px-4 py-2 font-medium text-gray-700 w-20">Chemistry</th>
              <th className="text-center px-4 py-2 font-medium text-gray-700 w-20">Biology</th>
              <th className="text-center px-4 py-2 font-medium text-gray-700 w-20 bg-gray-100">Average</th>
              <th className="text-center px-4 py-2 font-medium text-gray-700 w-20 bg-gray-100">Grade</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => {
              const average = parseFloat(calculateAverage(student));
              const grade = getGrade(average);
              return (
                <tr key={student.id} className={`border-b border-gray-200 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                  <td className="px-4 py-2 font-medium text-gray-900 sticky left-0 bg-inherit">{student.id}</td>
                  <td className="px-4 py-2 text-gray-900 sticky left-16 bg-inherit">{student.name}</td>
                  <td className="px-4 py-2 text-center">
                    <input
                      type="number"
                      defaultValue={student.math}
                      className="w-14 px-1 py-0.5 border border-gray-300 text-center text-xs focus:outline-none focus:border-[#017e84] bg-white"
                      max="100"
                      min="0"
                    />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <input
                      type="number"
                      defaultValue={student.english}
                      className="w-14 px-1 py-0.5 border border-gray-300 text-center text-xs focus:outline-none focus:border-[#017e84] bg-white"
                      max="100"
                      min="0"
                    />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <input
                      type="number"
                      defaultValue={student.french}
                      className="w-14 px-1 py-0.5 border border-gray-300 text-center text-xs focus:outline-none focus:border-[#017e84] bg-white"
                      max="100"
                      min="0"
                    />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <input
                      type="number"
                      defaultValue={student.physics}
                      className="w-14 px-1 py-0.5 border border-gray-300 text-center text-xs focus:outline-none focus:border-[#017e84] bg-white"
                      max="100"
                      min="0"
                    />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <input
                      type="number"
                      defaultValue={student.chemistry}
                      className="w-14 px-1 py-0.5 border border-gray-300 text-center text-xs focus:outline-none focus:border-[#017e84] bg-white"
                      max="100"
                      min="0"
                    />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <input
                      type="number"
                      defaultValue={student.biology}
                      className="w-14 px-1 py-0.5 border border-gray-300 text-center text-xs focus:outline-none focus:border-[#017e84] bg-white"
                      max="100"
                      min="0"
                    />
                  </td>
                  <td className="px-4 py-2 text-center font-semibold text-gray-900 bg-gray-50">{average}%</td>
                  <td className="px-4 py-2 text-center bg-gray-50">
                    <span className={`px-2 py-0.5 text-xs ${
                      grade.startsWith('A') ? 'bg-green-100 text-green-800' :
                      grade === 'B' ? 'bg-blue-100 text-blue-800' :
                      grade === 'C' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {grade}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-300 px-4 py-2 flex items-center justify-between text-xs text-gray-600">
        <div>Gradebook for {selectedClass} - {selectedTerm}</div>
        <div>{students.length} students</div>
      </div>
    </div>
  );
}
