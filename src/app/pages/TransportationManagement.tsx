import { useState } from 'react';
import { Plus, Filter } from 'lucide-react';

const mockRoutes = [
  { id: 'RT001', name: 'Route A - Yaoundé Center', stops: 8, students: 45, vehicle: 'BUS-001', driver: 'Mr. Kamga', status: 'Active' },
  { id: 'RT002', name: 'Route B - Bastos Area', stops: 6, students: 38, vehicle: 'BUS-002', driver: 'Mr. Ngono', status: 'Active' },
  { id: 'RT003', name: 'Route C - Mvan District', stops: 10, students: 52, vehicle: 'BUS-003', driver: 'Mrs. Fon', status: 'Active' },
  { id: 'RT004', name: 'Route D - Emana Zone', stops: 7, students: 41, vehicle: 'BUS-004', driver: 'Mr. Tchouake', status: 'Maintenance' },
];

const mockVehicles = [
  { id: 'BUS-001', type: 'School Bus', capacity: 50, registration: 'CM-YA-1234', lastService: '2026-03-01', status: 'Active' },
  { id: 'BUS-002', type: 'School Bus', capacity: 45, registration: 'CM-YA-5678', lastService: '2026-02-28', status: 'Active' },
  { id: 'BUS-003', type: 'Mini Bus', capacity: 30, registration: 'CM-YA-9012', lastService: '2026-03-10', status: 'Active' },
  { id: 'BUS-004', type: 'School Bus', capacity: 50, registration: 'CM-YA-3456', lastService: '2026-02-20', status: 'Maintenance' },
];

export default function TransportationManagement() {
  const [selectedTab, setSelectedTab] = useState('routes');

  return (
    <div className="h-full flex flex-col">
      {/* Control Panel */}
      <div className="bg-white border-b border-gray-300 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="bg-[#017e84] text-white px-3 py-1.5 text-xs font-medium hover:bg-[#016168] flex items-center gap-1">
            <Plus size={14} />
            Create
          </button>
          <button className="border border-gray-300 px-3 py-1.5 text-xs hover:bg-gray-50 flex items-center gap-1">
            <Filter size={14} />
            Filter
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-300 px-4 flex gap-4 text-xs">
        {['routes', 'vehicles', 'drivers'].map((tab) => (
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

      {/* Routes Tab */}
      {selectedTab === 'routes' && (
        <div className="flex-1 overflow-auto bg-white">
          <table className="w-full text-xs">
            <thead className="sticky top-0 bg-gray-50 border-b border-gray-300">
              <tr>
                <th className="text-left px-4 py-2 font-medium text-gray-700">Route ID</th>
                <th className="text-left px-4 py-2 font-medium text-gray-700">Route Name</th>
                <th className="text-center px-4 py-2 font-medium text-gray-700">Stops</th>
                <th className="text-center px-4 py-2 font-medium text-gray-700">Students</th>
                <th className="text-left px-4 py-2 font-medium text-gray-700">Vehicle</th>
                <th className="text-left px-4 py-2 font-medium text-gray-700">Driver</th>
                <th className="text-left px-4 py-2 font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockRoutes.map((route, index) => (
                <tr key={route.id} className={`border-b border-gray-200 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                  <td className="px-4 py-2 font-medium text-gray-900">{route.id}</td>
                  <td className="px-4 py-2 text-gray-900">{route.name}</td>
                  <td className="px-4 py-2 text-center text-gray-600">{route.stops}</td>
                  <td className="px-4 py-2 text-center text-gray-600">{route.students}</td>
                  <td className="px-4 py-2 text-gray-600">{route.vehicle}</td>
                  <td className="px-4 py-2 text-gray-600">{route.driver}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-0.5 text-xs ${
                      route.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {route.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Vehicles Tab */}
      {selectedTab === 'vehicles' && (
        <div className="flex-1 overflow-auto bg-white">
          <table className="w-full text-xs">
            <thead className="sticky top-0 bg-gray-50 border-b border-gray-300">
              <tr>
                <th className="text-left px-4 py-2 font-medium text-gray-700">Vehicle ID</th>
                <th className="text-left px-4 py-2 font-medium text-gray-700">Type</th>
                <th className="text-center px-4 py-2 font-medium text-gray-700">Capacity</th>
                <th className="text-left px-4 py-2 font-medium text-gray-700">Registration</th>
                <th className="text-left px-4 py-2 font-medium text-gray-700">Last Service</th>
                <th className="text-left px-4 py-2 font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockVehicles.map((vehicle, index) => (
                <tr key={vehicle.id} className={`border-b border-gray-200 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                  <td className="px-4 py-2 font-medium text-gray-900">{vehicle.id}</td>
                  <td className="px-4 py-2 text-gray-900">{vehicle.type}</td>
                  <td className="px-4 py-2 text-center text-gray-600">{vehicle.capacity}</td>
                  <td className="px-4 py-2 text-gray-600 font-mono">{vehicle.registration}</td>
                  <td className="px-4 py-2 text-gray-600">{vehicle.lastService}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-0.5 text-xs ${
                      vehicle.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {vehicle.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Drivers Tab */}
      {selectedTab === 'drivers' && (
        <div className="flex-1 overflow-auto bg-white">
          <table className="w-full text-xs">
            <thead className="sticky top-0 bg-gray-50 border-b border-gray-300">
              <tr>
                <th className="text-left px-4 py-2 font-medium text-gray-700">Driver Name</th>
                <th className="text-left px-4 py-2 font-medium text-gray-700">License Number</th>
                <th className="text-left px-4 py-2 font-medium text-gray-700">Phone</th>
                <th className="text-left px-4 py-2 font-medium text-gray-700">Assigned Route</th>
                <th className="text-left px-4 py-2 font-medium text-gray-700">Experience</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Mr. Kamga', license: 'DL-12345', phone: '+237 677 123 456', route: 'Route A', experience: '10 years' },
                { name: 'Mr. Ngono', license: 'DL-23456', phone: '+237 677 234 567', route: 'Route B', experience: '8 years' },
                { name: 'Mrs. Fon', license: 'DL-34567', phone: '+237 677 345 678', route: 'Route C', experience: '12 years' },
                { name: 'Mr. Tchouake', license: 'DL-45678', phone: '+237 677 456 789', route: 'Route D', experience: '7 years' },
              ].map((driver, index) => (
                <tr key={driver.license} className={`border-b border-gray-200 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                  <td className="px-4 py-2 text-gray-900">{driver.name}</td>
                  <td className="px-4 py-2 text-gray-600 font-mono">{driver.license}</td>
                  <td className="px-4 py-2 text-gray-600">{driver.phone}</td>
                  <td className="px-4 py-2 text-gray-600">{driver.route}</td>
                  <td className="px-4 py-2 text-gray-600">{driver.experience}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
