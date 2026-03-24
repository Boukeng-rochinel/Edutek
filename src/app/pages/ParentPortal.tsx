import { useState } from 'react';

export default function ParentPortal() {
  const [selectedTab, setSelectedTab] = useState('overview');

  return (
    <div className="h-full flex flex-col">
      {/* Student Info Bar */}
      <div className="bg-white border-b border-gray-300 px-4 py-3">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-300 border border-gray-400 flex items-center justify-center text-lg font-medium">
            KM
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">Kamga Marie</div>
            <div className="text-xs text-gray-600">Student ID: STU001 | Class: Form 1A</div>
          </div>
          <div className="flex-1"></div>
          <div className="grid grid-cols-3 gap-4 text-xs">
            <div>
              <div className="text-gray-600">Overall Grade</div>
              <div className="font-semibold text-gray-900">A (85.8%)</div>
            </div>
            <div>
              <div className="text-gray-600">Attendance</div>
              <div className="font-semibold text-gray-900">96%</div>
            </div>
            <div>
              <div className="text-gray-600">Fee Balance</div>
              <div className="font-semibold text-red-600">150,000 FCFA</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-300 px-4 flex gap-4 text-xs">
        {['overview', 'attendance', 'results', 'fees'].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`py-2 px-1 border-b-2 capitalize ${
              selectedTab === tab
                ? 'border-[#017e84] text-gray-900 font-medium'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {selectedTab === 'overview' && (
        <div className="flex-1 overflow-auto bg-white p-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Recent Attendance */}
            <div className="border border-gray-300">
              <div className="border-b border-gray-300 px-3 py-2 bg-gray-50">
                <h3 className="text-xs font-medium">Recent Attendance</h3>
              </div>
              <div className="p-3">
                <table className="w-full text-xs">
                  <tbody>
                    {[
                      { date: '2026-03-23', status: 'Present', time: '07:45' },
                      { date: '2026-03-22', status: 'Present', time: '07:50' },
                      { date: '2026-03-21', status: 'Late', time: '08:15' },
                      { date: '2026-03-20', status: 'Present', time: '07:42' },
                    ].map((record, i) => (
                      <tr key={i} className="border-b border-gray-200 last:border-0">
                        <td className="py-2">{record.date}</td>
                        <td className="py-2 text-right">
                          <span className={`px-2 py-0.5 ${
                            record.status === 'Present' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {record.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Latest Results */}
            <div className="border border-gray-300">
              <div className="border-b border-gray-300 px-3 py-2 bg-gray-50">
                <h3 className="text-xs font-medium">Latest Exam Results</h3>
              </div>
              <div className="p-3">
                <table className="w-full text-xs">
                  <tbody>
                    {[
                      { subject: 'Mathematics', marks: 85, grade: 'A' },
                      { subject: 'English', marks: 78, grade: 'B+' },
                      { subject: 'French', marks: 92, grade: 'A+' },
                      { subject: 'Physics', marks: 88, grade: 'A' },
                    ].map((result, i) => (
                      <tr key={i} className="border-b border-gray-200 last:border-0">
                        <td className="py-2">{result.subject}</td>
                        <td className="py-2 text-right">{result.marks}%</td>
                        <td className="py-2 text-right">
                          <span className="px-2 py-0.5 bg-green-100 text-green-800">
                            {result.grade}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Attendance Tab */}
      {selectedTab === 'attendance' && (
        <div className="flex-1 overflow-auto bg-white">
          <table className="w-full text-xs">
            <thead className="sticky top-0 bg-gray-50 border-b border-gray-300">
              <tr>
                <th className="text-left px-4 py-2 font-medium text-gray-700">Date</th>
                <th className="text-left px-4 py-2 font-medium text-gray-700">Check-in Time</th>
                <th className="text-left px-4 py-2 font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { date: '2026-03-23', time: '07:45 AM', status: 'Present' },
                { date: '2026-03-22', time: '07:50 AM', status: 'Present' },
                { date: '2026-03-21', time: '08:15 AM', status: 'Late' },
                { date: '2026-03-20', time: '07:42 AM', status: 'Present' },
                { date: '2026-03-19', time: '07:48 AM', status: 'Present' },
              ].map((record, index) => (
                <tr key={index} className={`border-b border-gray-200 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                  <td className="px-4 py-2 text-gray-900">{record.date}</td>
                  <td className="px-4 py-2 text-gray-600">{record.time}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-0.5 text-xs ${
                      record.status === 'Present' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {record.status}
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
        <div className="flex-1 overflow-auto bg-white">
          <table className="w-full text-xs">
            <thead className="sticky top-0 bg-gray-50 border-b border-gray-300">
              <tr>
                <th className="text-left px-4 py-2 font-medium text-gray-700">Exam</th>
                <th className="text-center px-4 py-2 font-medium text-gray-700">Marks</th>
                <th className="text-center px-4 py-2 font-medium text-gray-700">Total</th>
                <th className="text-center px-4 py-2 font-medium text-gray-700">Grade</th>
              </tr>
            </thead>
            <tbody>
              {[
                { exam: 'Mid-Term Mathematics', marks: 85, total: 100, grade: 'A' },
                { exam: 'Mid-Term English', marks: 78, total: 100, grade: 'B+' },
                { exam: 'Mid-Term French', marks: 92, total: 100, grade: 'A+' },
                { exam: 'Mid-Term Physics', marks: 88, total: 100, grade: 'A' },
              ].map((result, index) => (
                <tr key={index} className={`border-b border-gray-200 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                  <td className="px-4 py-2 text-gray-900">{result.exam}</td>
                  <td className="px-4 py-2 text-center font-medium text-gray-900">{result.marks}</td>
                  <td className="px-4 py-2 text-center text-gray-600">{result.total}</td>
                  <td className="px-4 py-2 text-center">
                    <span className="px-2 py-0.5 bg-green-100 text-green-800">
                      {result.grade}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Fees Tab */}
      {selectedTab === 'fees' && (
        <div className="flex-1 overflow-auto bg-white">
          <table className="w-full text-xs">
            <thead className="sticky top-0 bg-gray-50 border-b border-gray-300">
              <tr>
                <th className="text-left px-4 py-2 font-medium text-gray-700">Description</th>
                <th className="text-left px-4 py-2 font-medium text-gray-700">Amount</th>
                <th className="text-left px-4 py-2 font-medium text-gray-700">Payment Date</th>
                <th className="text-left px-4 py-2 font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { desc: 'Tuition Fee - Term 1', amount: '150,000 FCFA', date: '2026-01-15', status: 'Paid' },
                { desc: 'Transport Fee - Term 1', amount: '25,000 FCFA', date: '2026-01-15', status: 'Paid' },
                { desc: 'Library Fee - Term 1', amount: '10,000 FCFA', date: '2026-01-15', status: 'Paid' },
                { desc: 'Tuition Fee - Term 2', amount: '150,000 FCFA', date: '-', status: 'Pending' },
              ].map((fee, index) => (
                <tr key={index} className={`border-b border-gray-200 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                  <td className="px-4 py-2 text-gray-900">{fee.desc}</td>
                  <td className="px-4 py-2 font-medium text-gray-900">{fee.amount}</td>
                  <td className="px-4 py-2 text-gray-600">{fee.date}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-0.5 text-xs ${
                      fee.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {fee.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
