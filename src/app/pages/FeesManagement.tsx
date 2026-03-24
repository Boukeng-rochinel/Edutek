import { useState } from 'react';
import { Plus, Filter, Search, Download, FileUp, MoreVertical, Archive, Trash2, DollarSign } from 'lucide-react';

const mockFees = [
    { id: 'FEE001', studentName: 'Kamga Marie', class: 'Form 1A', amount: 185000, paid: 185000, balance: 0, status: 'Paid', date: '2026-01-15' },
    { id: 'FEE002', studentName: 'Ngono Jean-Paul', class: 'Form 2B', amount: 185000, paid: 100000, balance: 85000, status: 'Partial', date: '2026-01-20' },
    { id: 'FEE003', studentName: 'Tchouake Grace', class: 'Form 3A', amount: 195000, paid: 0, balance: 195000, status: 'Unpaid', date: '2026-01-25' },
];

export default function FeesManagement() {
    const [view, setView] = useState<'list' | 'form'>('list');
    const [selectedFee, setSelectedFee] = useState<typeof mockFees[0] | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleCreate = () => {
        setSelectedFee(null);
        setView('form');
    };

    const handleEdit = (fee: typeof mockFees[0]) => {
        setSelectedFee(fee);
        setView('form');
    };

    if (view === 'form') {
        return (
            <div className="h-full flex flex-col bg-[#f9f9f9]">
                <div className="bg-white border-b border-gray-300">
                    <div className="px-4 py-2 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                            <button onClick={() => setView('list')} className="hover:text-gray-900">Fees</button>
                            <span>/</span>
                            <span className="text-gray-900">{selectedFee ? selectedFee.id : 'New'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={() => setView('list')} className="px-3 py-1 border border-gray-300 text-xs hover:bg-gray-50">
                                Discard
                            </button>
                            <button className="px-3 py-1 bg-[#017e84] text-white text-xs hover:bg-[#016168]">
                                Save
                            </button>
                            {selectedFee && selectedFee.balance > 0 && (
                                <button className="px-3 py-1 bg-green-600 text-white text-xs hover:bg-green-700">
                                    Register Payment
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-auto p-6">
                    <div className="max-w-4xl mx-auto bg-white border border-gray-300 p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-6">Fee Details</h2>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
                            <div>
                                <label className="block font-medium text-gray-700 mb-1">Student</label>
                                <input
                                    type="text"
                                    defaultValue={selectedFee?.studentName || ''}
                                    className="w-full px-2 py-1.5 border border-gray-300 focus:outline-none focus:border-[#017e84]"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700 mb-1">Class</label>
                                <input
                                    type="text"
                                    defaultValue={selectedFee?.class || ''}
                                    className="w-full px-2 py-1.5 border border-gray-300 focus:outline-none focus:border-[#017e84]"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700 mb-1">Total Amount (FCFA)</label>
                                <input
                                    type="number"
                                    defaultValue={selectedFee?.amount || 0}
                                    className="w-full px-2 py-1.5 border border-gray-300 focus:outline-none focus:border-[#017e84]"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700 mb-1">Paid Amount (FCFA)</label>
                                <input
                                    type="number"
                                    defaultValue={selectedFee?.paid || 0}
                                    readOnly
                                    className="w-full px-2 py-1.5 border border-gray-300 bg-gray-50"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col">
            <div className="bg-white border-b border-gray-300 px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <button onClick={handleCreate} className="bg-[#017e84] text-white px-3 py-1.5 text-xs font-medium hover:bg-[#016168] flex items-center gap-1">
                        <Plus size={14} /> New Invoice
                    </button>
                    <div className="h-4 w-px bg-gray-300"></div>
                    <button className="px-2 py-1.5 text-xs hover:bg-gray-100 flex items-center gap-1">
                        <Download size={14} /> Export
                    </button>
                    <button className="border border-gray-300 px-3 py-1.5 text-xs hover:bg-gray-50 flex items-center gap-1">
                        <Filter size={14} /> Filters
                    </button>
                </div>
                <div className="relative">
                    <Search size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search fees..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-7 pr-3 py-1.5 border border-gray-300 text-xs focus:outline-none focus:border-gray-400 w-64"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-auto bg-white">
                <table className="w-full text-xs">
                    <thead className="sticky top-0 bg-gray-50 border-b border-gray-300">
                        <tr>
                            <th className="text-left px-4 py-2 font-medium text-gray-700 w-8"><input type="checkbox" /></th>
                            <th className="text-left px-4 py-2 font-medium text-gray-700">Invoice ID</th>
                            <th className="text-left px-4 py-2 font-medium text-gray-700">Student Name</th>
                            <th className="text-left px-4 py-2 font-medium text-gray-700">Class</th>
                            <th className="text-right px-4 py-2 font-medium text-gray-700">Total Amount</th>
                            <th className="text-right px-4 py-2 font-medium text-gray-700">Balance</th>
                            <th className="text-left px-4 py-2 font-medium text-gray-700">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockFees.map((fee, i) => (
                            <tr
                                key={fee.id}
                                className={`border-b border-gray-200 hover:bg-gray-50 cursor-pointer ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}
                                onClick={() => handleEdit(fee)}
                            >
                                <td className="px-4 py-2" onClick={e => e.stopPropagation()}><input type="checkbox" /></td>
                                <td className="px-4 py-2 font-medium text-gray-900">{fee.id}</td>
                                <td className="px-4 py-2 text-gray-900">{fee.studentName}</td>
                                <td className="px-4 py-2 text-gray-600">{fee.class}</td>
                                <td className="px-4 py-2 text-right">{fee.amount.toLocaleString()} FCFA</td>
                                <td className="px-4 py-2 text-right text-red-600 font-medium">{fee.balance.toLocaleString()} FCFA</td>
                                <td className="px-4 py-2">
                                    <span className={`px-2 py-0.5 text-xs ${fee.status === 'Paid' ? 'bg-green-100 text-green-800' :
                                            fee.status === 'Partial' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                        }`}>
                                        {fee.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
