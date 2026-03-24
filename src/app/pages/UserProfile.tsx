import { useState } from 'react';
import { Save, MoreVertical, Archive, Key, Mail, Building, Phone } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function UserProfile() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: 'Administrator',
        email: 'admin@schoolerp.cm',
        phone: '+237 677 000 000',
        type: 'Internal User',
        company: 'SchoolERP Cameroon',
        role: 'Admin',
    });

    const [permissions, setPermissions] = useState({
        students: 'Manager',
        admissions: 'Manager',
        fees: 'Manager',
        attendance: 'User',
        timetable: 'User',
        examinations: 'Manager',
        transportation: 'Manager',
        settings: 'Manager',
    });

    const [activeTab, setActiveTab] = useState('accessRights');

    const handleSave = () => {
        // Mock save
        navigate('/');
    };

    const handleDiscard = () => {
        navigate('/');
    };

    const permOptions = ['None', 'User', 'Manager'];

    return (
        <div className="h-full flex flex-col bg-[#f9f9f9]">
            {/* Form Header */}
            <div className="bg-white border-b border-gray-300">
                <div className="px-4 py-2 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                        <button onClick={() => navigate('/settings')} className="hover:text-gray-900">Settings</button>
                        <span>/</span>
                        <span className="hover:text-gray-900 cursor-pointer">Users</span>
                        <span>/</span>
                        <span className="text-gray-900 font-medium">{formData.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={handleDiscard} className="px-3 py-1 border border-gray-300 text-xs hover:bg-gray-50">
                            Discard
                        </button>
                        <button onClick={handleSave} className="px-3 py-1 bg-[#017e84] text-white text-xs hover:bg-[#016168]">
                            <Save size={14} className="inline mr-1" />
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
                    <div className="border-b border-gray-300 px-6 py-3 bg-gray-50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-sm">Active</span>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="flex items-start gap-6 mb-6">
                            <div className="w-24 h-24 bg-gray-200 border border-gray-300 flex items-center justify-center text-3xl font-bold text-gray-400">
                                {formData.name[0]}
                            </div>
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-2 py-1 mb-4 text-2xl font-semibold border-b border-transparent hover:border-gray-300 focus:outline-none focus:border-[#017e84] transition-colors"
                                    placeholder="User Name"
                                />

                                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                                    <div className="flex items-center gap-2">
                                        <Mail size={16} className="text-gray-400 w-5" />
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="flex-1 px-2 py-1 text-sm border-b border-transparent hover:border-gray-300 focus:outline-none focus:border-[#017e84]"
                                            placeholder="Email Address"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone size={16} className="text-gray-400 w-5" />
                                        <input
                                            type="text"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="flex-1 px-2 py-1 text-sm border-b border-transparent hover:border-gray-300 focus:outline-none focus:border-[#017e84]"
                                            placeholder="Phone Number"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Building size={16} className="text-gray-400 w-5" />
                                        <select
                                            value={formData.company}
                                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                            className="flex-1 px-2 py-1 text-sm border-b border-transparent hover:border-gray-300 focus:outline-none focus:border-[#017e84] bg-transparent"
                                        >
                                            <option>SchoolERP Cameroon</option>
                                            <option>SchoolERP Douala Branch</option>
                                        </select>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Key size={16} className="text-gray-400 w-5" />
                                        <select
                                            value={formData.type}
                                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                            className="flex-1 px-2 py-1 text-sm border-b border-transparent hover:border-gray-300 focus:outline-none focus:border-[#017e84] bg-transparent"
                                        >
                                            <option>Internal User</option>
                                            <option>Portal User</option>
                                            <option>Public User</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Notebook Tabs */}
                        <div className="border-t border-gray-300 mt-8 pt-2">
                            <div className="flex gap-4 mb-4 border-b border-gray-200 px-2">
                                <button
                                    onClick={() => setActiveTab('accessRights')}
                                    className={`px-4 py-2 text-sm font-medium ${activeTab === 'accessRights'
                                            ? 'text-[#017e84] border-b-2 border-[#017e84]'
                                            : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    Access Rights
                                </button>
                                <button
                                    onClick={() => setActiveTab('preferences')}
                                    className={`px-4 py-2 text-sm font-medium ${activeTab === 'preferences'
                                            ? 'text-[#017e84] border-b-2 border-[#017e84]'
                                            : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    Preferences
                                </button>
                            </div>

                            {activeTab === 'accessRights' && (
                                <div className="grid grid-cols-2 gap-x-12 gap-y-6 px-4 py-2">
                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-gray-700 border-b border-gray-200 pb-1 mb-3">Academic Management</h3>

                                        <div className="flex items-center justify-between">
                                            <label className="text-sm text-gray-600">Students</label>
                                            <select
                                                value={permissions.students}
                                                onChange={(e) => setPermissions({ ...permissions, students: e.target.value })}
                                                className="border border-gray-300 text-sm px-2 py-1 focus:outline-none focus:border-[#017e84] w-32"
                                            >
                                                {permOptions.map(o => <option key={o}>{o}</option>)}
                                            </select>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <label className="text-sm text-gray-600">Admissions</label>
                                            <select
                                                value={permissions.admissions}
                                                onChange={(e) => setPermissions({ ...permissions, admissions: e.target.value })}
                                                className="border border-gray-300 text-sm px-2 py-1 focus:outline-none focus:border-[#017e84] w-32"
                                            >
                                                {permOptions.map(o => <option key={o}>{o}</option>)}
                                            </select>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <label className="text-sm text-gray-600">Attendance</label>
                                            <select
                                                value={permissions.attendance}
                                                onChange={(e) => setPermissions({ ...permissions, attendance: e.target.value })}
                                                className="border border-gray-300 text-sm px-2 py-1 focus:outline-none focus:border-[#017e84] w-32"
                                            >
                                                {permOptions.map(o => <option key={o}>{o}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-gray-700 border-b border-gray-200 pb-1 mb-3">Administration</h3>

                                        <div className="flex items-center justify-between">
                                            <label className="text-sm text-gray-600">Fees Management</label>
                                            <select
                                                value={permissions.fees}
                                                onChange={(e) => setPermissions({ ...permissions, fees: e.target.value })}
                                                className="border border-gray-300 text-sm px-2 py-1 focus:outline-none focus:border-[#017e84] w-32"
                                            >
                                                {permOptions.map(o => <option key={o}>{o}</option>)}
                                            </select>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <label className="text-sm text-gray-600">Administration / Settings</label>
                                            <select
                                                value={permissions.settings}
                                                onChange={(e) => setPermissions({ ...permissions, settings: e.target.value })}
                                                className="border border-gray-300 text-sm px-2 py-1 focus:outline-none focus:border-[#017e84] w-32"
                                            >
                                                {permOptions.map(o => <option key={o}>{o}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'preferences' && (
                                <div className="px-4 py-2 text-sm text-gray-600">
                                    <p className="mb-4">User preferences (language, timezone, notifications) go here.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
