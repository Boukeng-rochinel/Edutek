import { useState, useRef } from 'react';
import { Plus, Filter, Download, Edit, Trash2, Search, X, Save, MoreVertical, Archive, List, LayoutGrid, Upload, FileUp, DollarSign } from 'lucide-react';

const mockStudents = [
  { id: 'STU001', name: 'Kamga Marie', class: 'Form 1A', gender: 'Female', phone: '+237 677 123 456', email: 'kamga.marie@school.cm', dob: '2010-05-15', address: 'Yaoundé, Bastos', status: 'Active', parent: 'Mr. Kamga', parentPhone: '+237 677 111 222', image: '' },
  { id: 'STU002', name: 'Ngono Jean-Paul', class: 'Form 2B', gender: 'Male', phone: '+237 677 234 567', email: 'ngono.jp@school.cm', dob: '2009-08-20', address: 'Douala, Akwa', status: 'Active', parent: 'Mrs. Ngono', parentPhone: '+237 677 222 333', image: '' },
  { id: 'STU003', name: 'Tchouake Grace', class: 'Form 3A', gender: 'Female', phone: '+237 677 345 678', email: 'tchouake.g@school.cm', dob: '2008-11-10', address: 'Yaoundé, Mvan', status: 'Active', parent: 'Mr. Tchouake', parentPhone: '+237 677 333 444', image: '' },
  { id: 'STU004', name: 'Mballa Patrick', class: 'Form 1A', gender: 'Male', phone: '+237 677 456 789', email: 'mballa.p@school.cm', dob: '2010-02-28', address: 'Yaoundé, Essos', status: 'Active', parent: 'Mrs. Mballa', parentPhone: '+237 677 444 555', image: '' },
  { id: 'STU005', name: 'Fon Bernadette', class: 'Form 4C', gender: 'Female', phone: '+237 677 567 890', email: 'fon.b@school.cm', dob: '2007-07-05', address: 'Bamenda, Commercial Avenue', status: 'Active', parent: 'Mr. Fon', parentPhone: '+237 677 555 666', image: '' },
  { id: 'STU006', name: 'Nkeng Samuel', class: 'Form 2A', gender: 'Male', phone: '+237 677 678 901', email: 'nkeng.s@school.cm', dob: '2009-12-18', address: 'Yaoundé, Emana', status: 'Inactive', parent: 'Mrs. Nkeng', parentPhone: '+237 677 666 777', image: '' },
];

export default function StudentManagement() {
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');
  const [view, setView] = useState<'list' | 'form'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<typeof mockStudents[0] | null>(null);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [activeTab, setActiveTab] = useState('academic');
  const [studentImage, setStudentImage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    class: 'Form 1A',
    gender: 'Male',
    phone: '',
    email: '',
    dob: '',
    address: '',
    status: 'Active',
    parent: '',
    parentPhone: '',
    image: ''
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStudentImage(reader.result as string);
        setFormData({...formData, image: reader.result as string});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreate = () => {
    setFormData({
      id: '',
      name: '',
      class: 'Form 1A',
      gender: 'Male',
      phone: '',
      email: '',
      dob: '',
      address: '',
      status: 'Active',
      parent: '',
      parentPhone: '',
      image: ''
    });
    setStudentImage('');
    setSelectedStudent(null);
    setView('form');
  };

  const handleEdit = (student: typeof mockStudents[0]) => {
    setFormData(student);
    setStudentImage(student.image);
    setSelectedStudent(student);
    setView('form');
  };

  const handleSave = () => {
    setView('list');
  };

  const handleDiscard = () => {
    setView('list');
  };

  if (view === 'form') {
    return (
      <div className="h-full flex flex-col bg-[#f9f9f9]">
        {/* Form Header */}
        <div className="bg-white border-b border-gray-300">
          <div className="px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <button onClick={() => setView('list')} className="hover:text-gray-900">Students</button>
              <span>/</span>
              <span className="text-gray-900">{selectedStudent ? selectedStudent.name : 'New'}</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handleDiscard} className="px-3 py-1 border border-gray-300 text-xs hover:bg-gray-50">
                Discard
              </button>
              <button onClick={handleSave} className="px-3 py-1 bg-[#017e84] text-white text-xs hover:bg-[#016168]">
                Save
              </button>
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
                <select 
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="px-2 py-0.5 border border-gray-300 text-xs focus:outline-none focus:border-gray-400"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Graduated</option>
                  <option>Transferred</option>
                </select>
              </div>
              {selectedStudent && (
                <div className="text-xs text-gray-500">
                  Student ID: {selectedStudent.id}
                </div>
              )}
            </div>

            {/* Form Fields */}
            <div className="p-6">
              {/* Image Upload */}
              <div className="mb-6 flex items-start gap-6">
                <div>
                  <div className="w-32 h-32 border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 relative">
                    {studentImage ? (
                      <img src={studentImage} alt="Student" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center">
                        <Upload size={24} className="text-gray-400 mx-auto mb-1" />
                        <p className="text-xs text-gray-500">Photo</p>
                      </div>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-2 w-32 px-2 py-1 border border-gray-300 text-xs hover:bg-gray-50"
                  >
                    Upload Photo
                  </button>
                </div>
                
                <div className="flex-1">
                  <h2 className="text-sm font-medium text-gray-700 mb-4">Personal Information</h2>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Full Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-2 py-1.5 border border-gray-300 text-xs focus:outline-none focus:border-[#017e84]"
                        placeholder="Enter student name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Date of Birth <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="date"
                        value={formData.dob}
                        onChange={(e) => setFormData({...formData, dob: e.target.value})}
                        className="w-full px-2 py-1.5 border border-gray-300 text-xs focus:outline-none focus:border-[#017e84]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Gender <span className="text-red-600">*</span>
                      </label>
                      <select
                        value={formData.gender}
                        onChange={(e) => setFormData({...formData, gender: e.target.value})}
                        className="w-full px-2 py-1.5 border border-gray-300 text-xs focus:outline-none focus:border-[#017e84]"
                      >
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Class <span className="text-red-600">*</span>
                      </label>
                      <select
                        value={formData.class}
                        onChange={(e) => setFormData({...formData, class: e.target.value})}
                        className="w-full px-2 py-1.5 border border-gray-300 text-xs focus:outline-none focus:border-[#017e84]"
                      >
                        <option>Form 1A</option>
                        <option>Form 1B</option>
                        <option>Form 2A</option>
                        <option>Form 2B</option>
                        <option>Form 3A</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-sm font-medium text-gray-700 mb-4 pb-2 border-b border-gray-200">
                  Contact Information
                </h2>
                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-2 py-1.5 border border-gray-300 text-xs focus:outline-none focus:border-[#017e84]"
                      placeholder="+237"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-2 py-1.5 border border-gray-300 text-xs focus:outline-none focus:border-[#017e84]"
                      placeholder="student@school.cm"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">Address</label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      rows={2}
                      className="w-full px-2 py-1.5 border border-gray-300 text-xs focus:outline-none focus:border-[#017e84]"
                      placeholder="Enter address"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-sm font-medium text-gray-700 mb-4 pb-2 border-b border-gray-200">
                  Parent/Guardian Information
                </h2>
                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Parent/Guardian Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.parent}
                      onChange={(e) => setFormData({...formData, parent: e.target.value})}
                      className="w-full px-2 py-1.5 border border-gray-300 text-xs focus:outline-none focus:border-[#017e84]"
                      placeholder="Enter parent name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Parent Phone <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.parentPhone}
                      onChange={(e) => setFormData({...formData, parentPhone: e.target.value})}
                      className="w-full px-2 py-1.5 border border-gray-300 text-xs focus:outline-none focus:border-[#017e84]"
                      placeholder="+237"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Notebook Tabs */}
            <div className="border-t border-gray-300">
              <div className="px-6 py-0 flex gap-4 text-xs border-b border-gray-300">
                <button 
                  onClick={() => setActiveTab('academic')}
                  className={`px-3 py-2 border-b-2 ${activeTab === 'academic' ? 'border-[#017e84] text-gray-900' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
                >
                  Academic Records
                </button>
                <button 
                  onClick={() => setActiveTab('fees')}
                  className={`px-3 py-2 border-b-2 flex items-center gap-1 ${activeTab === 'fees' ? 'border-[#017e84] text-gray-900' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
                >
                  <DollarSign size={12} />
                  School Fees
                </button>
                <button 
                  onClick={() => setActiveTab('health')}
                  className={`px-3 py-2 border-b-2 ${activeTab === 'health' ? 'border-[#017e84] text-gray-900' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
                >
                  Health Records
                </button>
                <button 
                  onClick={() => setActiveTab('documents')}
                  className={`px-3 py-2 border-b-2 ${activeTab === 'documents' ? 'border-[#017e84] text-gray-900' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
                >
                  Documents
                </button>
              </div>
              
              <div className="p-6 min-h-[200px] bg-gray-50">
                {activeTab === 'academic' && (
                  <p className="text-xs text-gray-500">Academic records will be displayed here...</p>
                )}
                {activeTab === 'fees' && (
                  <div>
                    <div className="bg-white border border-gray-200 p-4 mb-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-gray-900">Fee Summary</h3>
                        <button className="px-3 py-1 bg-[#017e84] text-white text-xs hover:bg-[#016168]">
                          Record Payment
                        </button>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-xs">
                        <div>
                          <div className="text-gray-600 mb-1">Total Fees</div>
                          <div className="text-lg font-semibold text-gray-900">185,000 FCFA</div>
                        </div>
                        <div>
                          <div className="text-gray-600 mb-1">Paid</div>
                          <div className="text-lg font-semibold text-green-600">185,000 FCFA</div>
                        </div>
                        <div>
                          <div className="text-gray-600 mb-1">Balance</div>
                          <div className="text-lg font-semibold text-red-600">0 FCFA</div>
                        </div>
                      </div>
                    </div>
                    
                    <table className="w-full text-xs border border-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="text-left px-3 py-2 border-b border-gray-200">Description</th>
                          <th className="text-right px-3 py-2 border-b border-gray-200">Amount</th>
                          <th className="text-left px-3 py-2 border-b border-gray-200">Date</th>
                          <th className="text-left px-3 py-2 border-b border-gray-200">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        <tr>
                          <td className="px-3 py-2 border-b">Tuition - Term 1</td>
                          <td className="px-3 py-2 text-right border-b">150,000 FCFA</td>
                          <td className="px-3 py-2 border-b">2026-01-15</td>
                          <td className="px-3 py-2 border-b">
                            <span className="px-2 py-0.5 bg-green-100 text-green-800">Paid</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 border-b">Transport - Term 1</td>
                          <td className="px-3 py-2 text-right border-b">25,000 FCFA</td>
                          <td className="px-3 py-2 border-b">2026-01-15</td>
                          <td className="px-3 py-2 border-b">
                            <span className="px-2 py-0.5 bg-green-100 text-green-800">Paid</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2">Library Fee</td>
                          <td className="px-3 py-2 text-right">10,000 FCFA</td>
                          <td className="px-3 py-2">2026-01-15</td>
                          <td className="px-3 py-2">
                            <span className="px-2 py-0.5 bg-green-100 text-green-800">Paid</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
                {activeTab === 'health' && (
                  <p className="text-xs text-gray-500">Health records will be displayed here...</p>
                )}
                {activeTab === 'documents' && (
                  <p className="text-xs text-gray-500">Documents will be displayed here...</p>
                )}
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
          <button
            onClick={handleCreate}
            className="bg-[#017e84] text-white px-3 py-1.5 text-xs font-medium hover:bg-[#016168] flex items-center gap-1"
          >
            <Plus size={14} />
            New
          </button>
          <div className="h-4 w-px bg-gray-300"></div>
          <div className="relative">
            <button 
              onClick={() => setShowMoreMenu(!showMoreMenu)}
              className="px-2 py-1.5 text-xs hover:bg-gray-100 flex items-center gap-1"
            >
              <MoreVertical size={14} />
              Actions
            </button>
            {showMoreMenu && (
              <div className="absolute left-0 top-full mt-1 bg-white border border-gray-300 shadow-lg z-50 min-w-[160px]">
                <button className="w-full px-3 py-2 text-xs text-left hover:bg-gray-50 flex items-center gap-2">
                  <Archive size={12} />
                  Archive
                </button>
                <button className="w-full px-3 py-2 text-xs text-left hover:bg-gray-50 flex items-center gap-2">
                  <Trash2 size={12} />
                  Delete
                </button>
                <div className="border-t border-gray-200"></div>
                <button className="w-full px-3 py-2 text-xs text-left hover:bg-gray-50 flex items-center gap-2">
                  <FileUp size={12} />
                  Import
                </button>
                <button className="w-full px-3 py-2 text-xs text-left hover:bg-gray-50 flex items-center gap-2">
                  <Download size={12} />
                  Export
                </button>
              </div>
            )}
          </div>
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-7 pr-3 py-1.5 border border-gray-300 text-xs focus:outline-none focus:border-gray-400 w-64"
            />
          </div>
          <div className="flex border border-gray-300">
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 ${viewMode === 'list' ? 'bg-gray-200' : 'hover:bg-gray-50'}`}
            >
              <List size={14} className="text-gray-600" />
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 ${viewMode === 'kanban' ? 'bg-gray-200' : 'hover:bg-gray-50'}`}
            >
              <LayoutGrid size={14} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* List View */}
      {viewMode === 'list' && (
        <>
          <div className="flex-1 overflow-auto bg-white">
            <table className="w-full text-xs">
              <thead className="sticky top-0 bg-gray-50 border-b border-gray-300">
                <tr>
                  <th className="text-left px-4 py-2 font-medium text-gray-700 w-8">
                    <input type="checkbox" className="border-gray-300" />
                  </th>
                  <th className="text-left px-4 py-2 font-medium text-gray-700">Name</th>
                  <th className="text-left px-4 py-2 font-medium text-gray-700">Student ID</th>
                  <th className="text-left px-4 py-2 font-medium text-gray-700">Class</th>
                  <th className="text-left px-4 py-2 font-medium text-gray-700">Gender</th>
                  <th className="text-left px-4 py-2 font-medium text-gray-700">Phone</th>
                  <th className="text-left px-4 py-2 font-medium text-gray-700">Email</th>
                  <th className="text-left px-4 py-2 font-medium text-gray-700">Parent</th>
                  <th className="text-left px-4 py-2 font-medium text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockStudents.map((student, index) => (
                  <tr 
                    key={student.id} 
                    className={`border-b border-gray-200 hover:bg-gray-50 cursor-pointer ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}
                    onClick={() => handleEdit(student)}
                  >
                    <td className="px-4 py-2" onClick={(e) => e.stopPropagation()}>
                      <input type="checkbox" className="border-gray-300" />
                    </td>
                    <td className="px-4 py-2 text-gray-900 font-medium">{student.name}</td>
                    <td className="px-4 py-2 text-gray-600">{student.id}</td>
                    <td className="px-4 py-2 text-gray-600">{student.class}</td>
                    <td className="px-4 py-2 text-gray-600">{student.gender}</td>
                    <td className="px-4 py-2 text-gray-600">{student.phone}</td>
                    <td className="px-4 py-2 text-gray-600">{student.email}</td>
                    <td className="px-4 py-2 text-gray-600">{student.parent}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-0.5 text-xs ${student.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {student.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-white border-t border-gray-300 px-4 py-2 flex items-center justify-between text-xs text-gray-600">
            <div>{mockStudents.length} records</div>
          </div>
        </>
      )}

      {/* Kanban View */}
      {viewMode === 'kanban' && (
        <div className="flex-1 overflow-auto bg-white p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {mockStudents.map((student) => (
              <div
                key={student.id}
                onClick={() => handleEdit(student)}
                className="border border-gray-300 bg-white hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="p-4">
                  <div className="w-16 h-16 bg-gray-200 mx-auto mb-3 flex items-center justify-center text-2xl">
                    {student.image ? (
                      <img src={student.image} alt={student.name} className="w-full h-full object-cover" />
                    ) : (
                      <span>{student.name.split(' ').map(n => n[0]).join('')}</span>
                    )}
                  </div>
                  <h3 className="text-xs font-medium text-gray-900 text-center mb-1">{student.name}</h3>
                  <p className="text-xs text-gray-600 text-center mb-2">{student.id}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">{student.class}</span>
                    <span className={`px-2 py-0.5 ${student.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {student.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
