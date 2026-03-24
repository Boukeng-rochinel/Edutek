import { useState } from 'react';
import { Plus, Filter, MoreVertical, Search, Archive, Trash2, Check, X } from 'lucide-react';

const mockApplications = [
  { id: 'ADM001', name: 'Ashu Emmanuel', class: 'Form 1', status: 'pending', date: '2026-03-20', score: 85, email: 'ashu.e@gmail.com', phone: '+237 677 123 456', parent: 'Mr. Ashu', address: 'Bamenda' },
  { id: 'ADM002', name: 'Nfor Precious', class: 'Form 1', status: 'approved', date: '2026-03-19', score: 92, email: 'nfor.p@gmail.com', phone: '+237 677 234 567', parent: 'Mrs. Nfor', address: 'Douala' },
  { id: 'ADM003', name: 'Bih Collins', class: 'Form 2', status: 'pending', date: '2026-03-18', score: 78, email: 'bih.c@gmail.com', phone: '+237 677 345 678', parent: 'Mr. Bih', address: 'Yaoundé' },
  { id: 'ADM004', name: 'Tabe Christelle', class: 'Form 1', status: 'rejected', date: '2026-03-17', score: 45, email: 'tabe.c@gmail.com', phone: '+237 677 456 789', parent: 'Mrs. Tabe', address: 'Buea' },
  { id: 'ADM005', name: 'Njong Stella', class: 'Form 3', status: 'approved', date: '2026-03-16', score: 88, email: 'njong.s@gmail.com', phone: '+237 677 567 890', parent: 'Mr. Njong', address: 'Limbe' },
  { id: 'ADM006', name: 'Fouda Michel', class: 'Form 1', status: 'pending', date: '2026-03-15', score: 82, email: 'fouda.m@gmail.com', phone: '+237 677 678 901', parent: 'Mrs. Fouda', address: 'Bafoussam' },
];

export default function AdmissionManagement() {
  const [view, setView] = useState<'list' | 'form'>('list');
  const [selectedApp, setSelectedApp] = useState<typeof mockApplications[0] | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredApps = filterStatus === 'all' 
    ? mockApplications 
    : mockApplications.filter(app => app.status === filterStatus);

  const handleEdit = (app: typeof mockApplications[0]) => {
    setSelectedApp(app);
    setView('form');
  };

  if (view === 'form' && selectedApp) {
    return (
      <div className="h-full flex flex-col bg-[#f9f9f9]">
        {/* Form Header */}
        <div className="bg-white border-b border-gray-300">
          <div className="px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <button onClick={() => setView('list')} className="hover:text-gray-900">Admissions</button>
              <span>/</span>
              <span className="text-gray-900">{selectedApp.name}</span>
            </div>
            <div className="flex items-center gap-2">
              {selectedApp.status === 'pending' && (
                <>
                  <button className="px-3 py-1 bg-green-600 text-white text-xs hover:bg-green-700 flex items-center gap-1">
                    <Check size={14} />
                    Approve
                  </button>
                  <button className="px-3 py-1 bg-red-600 text-white text-xs hover:bg-red-700 flex items-center gap-1">
                    <X size={14} />
                    Reject
                  </button>
                </>
              )}
              <button className="p-1 hover:bg-gray-100">
                <MoreVertical size={16} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto bg-white border border-gray-300">
            {/* Status Bar */}
            <div className="border-b border-gray-300 px-6 py-3 bg-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-700">Status:</span>
                <span className={`px-2 py-0.5 text-xs ${
                  selectedApp.status === 'approved' ? 'bg-green-100 text-green-800' :
                  selectedApp.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {selectedApp.status.toUpperCase()}
                </span>
              </div>
              <div className="text-xs text-gray-500">
                Application ID: {selectedApp.id}
              </div>
            </div>

            {/* Application Details */}
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-sm font-medium text-gray-700 mb-4 pb-2 border-b border-gray-200">
                  Applicant Information
                </h2>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-xs">
                  <div>
                    <div className="text-gray-600 mb-0.5">Full Name</div>
                    <div className="font-medium text-gray-900">{selectedApp.name}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-0.5">Applying for Class</div>
                    <div className="font-medium text-gray-900">{selectedApp.class}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-0.5">Email</div>
                    <div className="font-medium text-gray-900">{selectedApp.email}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-0.5">Phone</div>
                    <div className="font-medium text-gray-900">{selectedApp.phone}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-0.5">Parent/Guardian</div>
                    <div className="font-medium text-gray-900">{selectedApp.parent}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-0.5">Address</div>
                    <div className="font-medium text-gray-900">{selectedApp.address}</div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-sm font-medium text-gray-700 mb-4 pb-2 border-b border-gray-200">
                  Application Details
                </h2>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-xs">
                  <div>
                    <div className="text-gray-600 mb-0.5">Application Date</div>
                    <div className="font-medium text-gray-900">{selectedApp.date}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-0.5">Test Score</div>
                    <div className={`font-medium ${selectedApp.score >= 80 ? 'text-green-600' : selectedApp.score >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {selectedApp.score}%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-t border-gray-300">
              <div className="px-6 py-0 flex gap-4 text-xs border-b border-gray-300">
                <button className="px-3 py-2 border-b-2 border-[#017e84] text-gray-900">Documents</button>
                <button className="px-3 py-2 border-b-2 border-transparent text-gray-600 hover:text-gray-900">Notes</button>
              </div>
              <div className="p-6 min-h-[150px] bg-gray-50">
                <p className="text-xs text-gray-500">Documents will be displayed here...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Control Panel */}
      <div className="bg-white border-b border-gray-300 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="bg-[#017e84] text-white px-3 py-1.5 text-xs font-medium hover:bg-[#016168] flex items-center gap-1">
            <Plus size={14} />
            New
          </button>
          <div className="h-4 w-px bg-gray-300"></div>
          <button className="px-2 py-1.5 text-xs hover:bg-gray-100 flex items-center gap-1">
            <Archive size={14} />
            Archive
          </button>
          <button className="px-2 py-1.5 text-xs hover:bg-gray-100 flex items-center gap-1">
            <Trash2 size={14} />
            Delete
          </button>
          <div className="h-4 w-px bg-gray-300"></div>
          <button className="border border-gray-300 px-3 py-1.5 text-xs hover:bg-gray-50 flex items-center gap-1">
            <Filter size={14} />
            Filters
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-7 pr-3 py-1.5 border border-gray-300 text-xs focus:outline-none focus:border-gray-400 w-64"
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white border-b border-gray-300 px-4 flex gap-4 text-xs">
        {[
          { id: 'all', label: 'All', count: mockApplications.length },
          { id: 'pending', label: 'Pending', count: mockApplications.filter(a => a.status === 'pending').length },
          { id: 'approved', label: 'Approved', count: mockApplications.filter(a => a.status === 'approved').length },
          { id: 'rejected', label: 'Rejected', count: mockApplications.filter(a => a.status === 'rejected').length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterStatus(tab.id)}
            className={`py-2 px-1 border-b-2 ${
              filterStatus === tab.id
                ? 'border-[#017e84] text-gray-900 font-medium'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label} <span className="text-gray-500">({tab.count})</span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto bg-white">
        <table className="w-full text-xs">
          <thead className="sticky top-0 bg-gray-50 border-b border-gray-300">
            <tr>
              <th className="text-left px-4 py-2 font-medium text-gray-700 w-8">
                <input type="checkbox" className="border-gray-300" />
              </th>
              <th className="text-left px-4 py-2 font-medium text-gray-700">Application ID</th>
              <th className="text-left px-4 py-2 font-medium text-gray-700">Student Name</th>
              <th className="text-left px-4 py-2 font-medium text-gray-700">Class</th>
              <th className="text-left px-4 py-2 font-medium text-gray-700">Email</th>
              <th className="text-left px-4 py-2 font-medium text-gray-700">Phone</th>
              <th className="text-left px-4 py-2 font-medium text-gray-700">Date</th>
              <th className="text-center px-4 py-2 font-medium text-gray-700">Score</th>
              <th className="text-left px-4 py-2 font-medium text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredApps.map((app, index) => (
              <tr 
                key={app.id} 
                className={`border-b border-gray-200 hover:bg-gray-50 cursor-pointer ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}
                onClick={() => handleEdit(app)}
              >
                <td className="px-4 py-2" onClick={(e) => e.stopPropagation()}>
                  <input type="checkbox" className="border-gray-300" />
                </td>
                <td className="px-4 py-2 font-medium text-gray-900">{app.id}</td>
                <td className="px-4 py-2 text-gray-900">{app.name}</td>
                <td className="px-4 py-2 text-gray-600">{app.class}</td>
                <td className="px-4 py-2 text-gray-600">{app.email}</td>
                <td className="px-4 py-2 text-gray-600">{app.phone}</td>
                <td className="px-4 py-2 text-gray-600">{app.date}</td>
                <td className="px-4 py-2 text-center">
                  <span className={`font-medium ${app.score >= 80 ? 'text-green-600' : app.score >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {app.score}%
                  </span>
                </td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-0.5 text-xs ${
                    app.status === 'approved' ? 'bg-green-100 text-green-800' :
                    app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {app.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-300 px-4 py-2 flex items-center justify-between text-xs text-gray-600">
        <div>{filteredApps.length} records</div>
      </div>
    </div>
  );
}
