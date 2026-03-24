import { useState } from 'react';
import { Plus, Filter, MoreVertical, Search, Archive, Trash2, LayoutGrid, List, Check, ArrowRight } from 'lucide-react';

const initialApplications = [
  { id: 'ADM001', name: 'Ashu Emmanuel', department: 'Science', program: 'Secondary Education', course: 'Form 1', state: 'draft', date: '2026-03-20', score: 85, email: 'ashu.e@gmail.com', phone: '+237 677 123 456', parent: 'Mr. Ashu', address: 'Bamenda' },
  { id: 'ADM002', name: 'Nfor Precious', department: 'Arts', program: 'Secondary Education', course: 'Form 1', state: 'confirm', date: '2026-03-19', score: 92, email: 'nfor.p@gmail.com', phone: '+237 677 234 567', parent: 'Mrs. Nfor', address: 'Douala' },
  { id: 'ADM003', name: 'Bih Collins', department: 'Commercial', program: 'High School', course: 'Lower Sixth', state: 'finish', date: '2026-03-18', score: 78, email: 'bih.c@gmail.com', phone: '+237 677 345 678', parent: 'Mr. Bih', address: 'Yaoundé' },
];

export default function AdmissionManagement() {
  const [view, setView] = useState<'list' | 'form'>('list');
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('kanban');
  const [apps, setApps] = useState(initialApplications);
  const [selectedApp, setSelectedApp] = useState<typeof initialApplications[0] | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [departments, setDepartments] = useState(['Science', 'Arts', 'Commercial']);
  const [programs, setPrograms] = useState(['Primary', 'Secondary Education', 'High School']);
  const [courses, setCourses] = useState(['Form 1', 'Form 2', 'Lower Sixth', 'Upper Sixth']);

  const handleEdit = (app: typeof initialApplications[0]) => {
    setSelectedApp(app);
    setView('form');
  };

  const handleCreate = () => {
    setSelectedApp({
      id: `ADM00${apps.length + 1}`,
      name: '',
      department: '',
      program: '',
      course: '',
      state: 'draft',
      date: new Date().toISOString().split('T')[0],
      score: 0,
      email: '',
      phone: '',
      parent: '',
      address: ''
    });
    setView('form');
  };

  const handleChange = (field: string, value: any) => {
    if (selectedApp) setSelectedApp({ ...selectedApp, [field]: value });
  };

  const states = ['draft', 'confirm', 'finish'];

  const setState = (newState: string) => {
    if (selectedApp) handleChange('state', newState);
  };

  const handleSave = () => {
    if (!selectedApp) return;
    const existing = apps.find(a => a.id === selectedApp.id);
    if (existing) {
      setApps(apps.map(a => a.id === selectedApp.id ? selectedApp : a));
    } else {
      setApps([selectedApp, ...apps]);
    }
    setView('list');
  };

  const handleAddOption = (field: 'department' | 'course' | 'program', value: string) => {
    if (!value) return;
    if (field === 'department' && !departments.includes(value)) setDepartments([...departments, value]);
    if (field === 'course' && !courses.includes(value)) setCourses([...courses, value]);
    if (field === 'program' && !programs.includes(value)) setPrograms([...programs, value]);
  };

  if (view === 'form' && selectedApp) {
    const currentIndex = states.indexOf(selectedApp.state);

    return (
      <div className="h-full flex flex-col bg-[#f9f9f9]">
        <div className="bg-white border-b border-gray-300">
          <div className="px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <button onClick={() => setView('list')} className="hover:text-gray-900">Admissions</button>
              <span>/</span>
              <span className="text-gray-900">{selectedApp.name || 'New Application'}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setView('list')}
                className="px-3 py-1 border border-gray-300 text-xs hover:bg-gray-50"
              >
                Discard
              </button>
              <button
                onClick={handleSave}
                className="px-3 py-1 bg-[#017e84] text-white text-xs hover:bg-[#016168]"
              >
                Save
              </button>
              <button className="p-1 hover:bg-gray-100">
                <MoreVertical size={16} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto bg-white border border-gray-300 shadow-sm relative">

            {/* Odoo Style Status Bar */}
            <div className="border-b border-gray-300 bg-gray-50 flex items-center justify-between px-6 py-3">
              <div className="flex gap-2">
                {selectedApp.state === 'draft' && (
                  <button onClick={() => setState('confirm')} className="px-3 py-1.5 bg-[#017e84] text-white text-xs hover:bg-[#016168] rounded-sm">
                    Confirm Registration
                  </button>
                )}
                {selectedApp.state === 'confirm' && (
                  <button onClick={() => setState('finish')} className="px-3 py-1.5 bg-[#017e84] text-white text-xs hover:bg-[#016168] rounded-sm">
                    Create Student
                  </button>
                )}
                <button className="px-3 py-1.5 border border-gray-300 text-xs hover:bg-gray-50 rounded-sm bg-white">
                  Cancel
                </button>
              </div>

              {/* Status Tracker */}
              <div className="flex bg-gray-50 border border-gray-300 rounded-sm overflow-hidden text-xs">
                {states.map((st, idx) => {
                  const isActive = st === selectedApp.state;
                  const isPast = idx < currentIndex;
                  return (
                    <div
                      key={st}
                      className={`relative flex items-center px-4 py-1.5 uppercase tracking-wide font-medium cursor-pointer transition-colors ${isActive ? 'text-white bg-[#017e84]' :
                          isPast ? 'text-gray-800 bg-gray-200' :
                            'text-gray-500 bg-gray-100'
                        } ${idx !== 0 ? 'border-l border-white/20' : ''}`}
                      onClick={() => setState(st)}
                    >
                      {isPast && <Check size={12} className="mr-1" />}
                      {st}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  <input
                    type="text"
                    value={selectedApp.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Applicant Name"
                    className="w-full border-b border-transparent hover:border-gray-300 focus:outline-none focus:border-[#017e84] transition-colors"
                  />
                </h1>
                <h2 className="text-sm font-medium text-gray-500">
                  Application ID: {selectedApp.id}
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Program</label>
                    <div className="flex gap-2">
                      <select
                        value={selectedApp.program}
                        onChange={(e) => handleChange('program', e.target.value)}
                        className="w-full px-2 py-1.5 border border-gray-300 text-sm focus:outline-none focus:border-[#017e84] bg-white"
                      >
                        <option value="">Select or type...</option>
                        {programs.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                      <button
                        onClick={() => {
                          const p = prompt('Create new Program:');
                          if (p) { handleAddOption('program', p); handleChange('program', p); }
                        }}
                        className="px-2 py-1 border border-gray-300 text-xs text-gray-600 hover:bg-gray-50"
                        title="Create new option"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Department</label>
                    <div className="flex gap-2">
                      <select
                        value={selectedApp.department}
                        onChange={(e) => handleChange('department', e.target.value)}
                        className="w-full px-2 py-1.5 border border-gray-300 text-sm focus:outline-none focus:border-[#017e84] bg-white"
                      >
                        <option value="">Select or type...</option>
                        {departments.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                      <button
                        onClick={() => {
                          const p = prompt('Create new Department:');
                          if (p) { handleAddOption('department', p); handleChange('department', p); }
                        }}
                        className="px-2 py-1 border border-gray-300 text-xs text-gray-600 hover:bg-gray-50"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Course / Class</label>
                    <div className="flex gap-2">
                      <select
                        value={selectedApp.course}
                        onChange={(e) => handleChange('course', e.target.value)}
                        className="w-full px-2 py-1.5 border border-gray-300 text-sm focus:outline-none focus:border-[#017e84] bg-white"
                      >
                        <option value="">Select or type...</option>
                        {courses.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <button
                        onClick={() => {
                          const p = prompt('Create new Course:');
                          if (p) { handleAddOption('course', p); handleChange('course', p); }
                        }}
                        className="px-2 py-1 border border-gray-300 text-xs text-gray-600 hover:bg-gray-50"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      value={selectedApp.date}
                      onChange={(e) => handleChange('date', e.target.value)}
                      className="w-full px-2 py-1.5 border border-gray-300 text-sm focus:outline-none focus:border-[#017e84]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={selectedApp.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="w-full px-2 py-1.5 border border-gray-300 text-sm focus:outline-none focus:border-[#017e84]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Phone</label>
                    <input
                      type="text"
                      value={selectedApp.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="w-full px-2 py-1.5 border border-gray-300 text-sm focus:outline-none focus:border-[#017e84]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const filteredApps = apps.filter(app => app.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white border-b border-gray-300 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={handleCreate}
            className="bg-[#017e84] text-white px-3 py-1.5 text-xs font-medium hover:bg-[#016168] flex items-center gap-1"
          >
            <Plus size={14} />
            New
          </button>
          <div className="h-4 w-px bg-gray-300"></div>
          <button className="px-2 py-1.5 text-xs hover:bg-gray-100 flex items-center gap-1">
            <Archive size={14} />
            Archive
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-7 pr-3 py-1.5 border border-gray-300 text-xs focus:outline-none focus:border-gray-400 w-64"
            />
          </div>
          <div className="flex border border-gray-300 rounded-sm overflow-hidden">
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 ${viewMode === 'list' ? 'bg-gray-200 text-gray-800' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
            >
              <List size={14} />
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 ${viewMode === 'kanban' ? 'bg-gray-200 text-gray-800' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
            >
              <LayoutGrid size={14} />
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'list' && (
        <div className="flex-1 overflow-auto bg-white">
          <table className="w-full text-xs">
            <thead className="sticky top-0 bg-gray-50 border-b border-gray-300">
              <tr>
                <th className="text-left px-4 py-2 text-gray-700 font-medium">App ID</th>
                <th className="text-left px-4 py-2 text-gray-700 font-medium">Name</th>
                <th className="text-left px-4 py-2 text-gray-700 font-medium">Department</th>
                <th className="text-left px-4 py-2 text-gray-700 font-medium">Course</th>
                <th className="text-left px-4 py-2 text-gray-700 font-medium">State</th>
              </tr>
            </thead>
            <tbody>
              {filteredApps.map((app, i) => (
                <tr
                  key={app.id}
                  onClick={() => handleEdit(app)}
                  className={`border-b border-gray-200 hover:bg-gray-50 cursor-pointer ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                >
                  <td className="px-4 py-2 font-medium">{app.id}</td>
                  <td className="px-4 py-2">{app.name}</td>
                  <td className="px-4 py-2 text-gray-600">{app.department}</td>
                  <td className="px-4 py-2 text-gray-600">{app.course}</td>
                  <td className="px-4 py-2 uppercase font-medium text-[10px] text-gray-500">{app.state}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {viewMode === 'kanban' && (
        <div className="flex-1 overflow-auto bg-gray-100 p-6 flex gap-6">
          {['draft', 'confirm', 'finish'].map(state => (
            <div key={state} className="w-80 shrink-0 flex flex-col">
              <div className="flex items-center justify-between mb-3 group">
                <span className="text-sm font-semibold text-gray-700 uppercase">{state}</span>
                <span className="bg-gray-200 text-gray-600 text-xs font-semibold px-2 py-0.5 rounded-full">
                  {filteredApps.filter(a => a.state === state).length}
                </span>
              </div>

              <div className="flex-1 space-y-3 pb-8">
                {filteredApps.filter(a => a.state === state).map(app => (
                  <div
                    key={app.id}
                    onClick={() => handleEdit(app)}
                    className="bg-white p-4 border border-gray-300 shadow-sm hover:shadow-md cursor-pointer rounded-sm border-l-4 border-l-[#017e84] transition-shadow"
                  >
                    <div className="font-semibold text-gray-900 text-sm mb-1">{app.name}</div>
                    <div className="text-xs text-gray-500 mb-2">{app.id} • {app.date}</div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {app.department && <span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 text-[10px] rounded-sm">{app.department}</span>}
                      {app.course && <span className="bg-purple-50 text-purple-700 px-1.5 py-0.5 text-[10px] rounded-sm">{app.course}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
