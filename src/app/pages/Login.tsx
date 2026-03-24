import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function Login() {
  const [role, setRole] = useState('Admin');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', role);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex items-center justify-center p-4">
      <div className="bg-white border border-gray-300 w-full max-w-md">
        {/* Logo */}
        <div className="bg-[#017e84] p-6 text-center">
          <h1 className="text-2xl font-medium text-white">SchoolERP</h1>
          <p className="text-sm text-white/80 mt-1">Cameroon School Management System</p>
        </div>

        <form onSubmit={handleLogin} className="p-8 space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="text"
              placeholder="admin@schoolerp.cm"
              className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-gray-400"
              defaultValue="admin@schoolerp.cm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-gray-400"
              defaultValue="password"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Login as
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-gray-400"
            >
              <option>Admin</option>
              <option>Teacher</option>
              <option>Parent</option>
              <option>Student</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#017e84] text-white py-2 text-sm font-medium hover:bg-[#016168] transition-colors"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}