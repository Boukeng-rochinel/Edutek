import { useState } from 'react';
import { Search, Download, Check } from 'lucide-react';

const installedApps = [
  { id: 1, name: 'Students', description: 'Student information and management', icon: '👨‍🎓', installed: true, version: '1.0' },
  { id: 2, name: 'Admissions', description: 'Manage student admissions and applications', icon: '📝', installed: true, version: '1.0' },
  { id: 3, name: 'Attendance', description: 'Track daily attendance and absences', icon: '✓', installed: true, version: '1.0' },
  { id: 4, name: 'Timetable', description: 'Class schedules and timetable management', icon: '📅', installed: true, version: '1.0' },
  { id: 5, name: 'Examinations', description: 'Exam scheduling and results management', icon: '📄', installed: true, version: '1.0' },
  { id: 6, name: 'Transportation', description: 'School bus routes and transportation', icon: '🚌', installed: true, version: '1.0' },
  { id: 7, name: 'Parent Portal', description: 'Parent access to student information', icon: '👪', installed: true, version: '1.0' },
  { id: 8, name: 'Gradebook', description: 'Grade management and report cards', icon: '📊', installed: true, version: '1.0' },
];

const availableApps = [
  { id: 9, name: 'Library Management', description: 'Manage school library and book lending', icon: '📚', installed: false, version: '1.0' },
  { id: 10, name: 'HR & Payroll', description: 'Staff management and payroll processing', icon: '💼', installed: false, version: '1.0' },
  { id: 11, name: 'Inventory', description: 'School inventory and asset management', icon: '📦', installed: false, version: '1.0' },
  { id: 12, name: 'Hostel Management', description: 'Manage school hostel and dormitories', icon: '🏠', installed: false, version: '1.0' },
  { id: 13, name: 'Cafeteria', description: 'Cafeteria and meal management', icon: '🍽️', installed: false, version: '1.0' },
  { id: 14, name: 'SMS Gateway', description: 'Send SMS notifications to parents', icon: '📱', installed: false, version: '1.0' },
];

export default function Apps() {
  const [selectedTab, setSelectedTab] = useState('installed');
  const [searchTerm, setSearchTerm] = useState('');

  const apps = selectedTab === 'installed' ? installedApps : availableApps;
  const filteredApps = apps.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col bg-[#f9f9f9]">
      {/* Header */}
      <div className="bg-white border-b border-gray-300 px-6 py-4">
        <h1 className="text-xl font-light text-gray-900 mb-2">Apps</h1>
        <p className="text-xs text-gray-600">Install and manage your SchoolERP applications</p>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-300 px-6 flex gap-6 text-xs">
        <button
          onClick={() => setSelectedTab('installed')}
          className={`py-3 px-1 border-b-2 ${
            selectedTab === 'installed'
              ? 'border-[#017e84] text-gray-900 font-medium'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Installed ({installedApps.length})
        </button>
        <button
          onClick={() => setSelectedTab('available')}
          className={`py-3 px-1 border-b-2 ${
            selectedTab === 'available'
              ? 'border-[#017e84] text-gray-900 font-medium'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Available ({availableApps.length})
        </button>
      </div>

      {/* Search */}
      <div className="bg-white border-b border-gray-300 px-6 py-3">
        <div className="relative max-w-md">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search applications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-300 text-xs focus:outline-none focus:border-gray-400"
          />
        </div>
      </div>

      {/* Apps Grid */}
      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl">
          {filteredApps.map((app) => (
            <div key={app.id} className="bg-white border border-gray-300 hover:shadow-md transition-shadow">
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div className="text-3xl">{app.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900 mb-1">{app.name}</h3>
                    <p className="text-xs text-gray-600 mb-3">{app.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">v{app.version}</span>
                      {app.installed ? (
                        <div className="flex items-center gap-1 text-xs text-green-600">
                          <Check size={12} />
                          Installed
                        </div>
                      ) : (
                        <button className="px-3 py-1 bg-[#017e84] text-white text-xs hover:bg-[#016168]">
                          Install
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {app.installed && (
                <div className="border-t border-gray-200 px-4 py-2 bg-gray-50 flex gap-2 text-xs">
                  <button className="text-gray-600 hover:text-gray-900">Configure</button>
                  <span className="text-gray-300">|</span>
                  <button className="text-gray-600 hover:text-gray-900">Uninstall</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
