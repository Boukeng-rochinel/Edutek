import { useState, useRef, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import {
  Search,
  HelpCircle,
  Grid3x3,
  Settings,
  ChevronDown,
  LogOut,
  User,
} from 'lucide-react';

const routeLabels: Record<string, string> = {
  '/': 'Dashboard',
  '/students': 'Students',
  '/admissions': 'Admissions',
  '/attendance': 'Attendance',
  '/timetable': 'Timetable',
  '/examinations': 'Examinations',
  '/transportation': 'Transportation',
  '/parent-portal': 'Parent Portal',
  '/gradebook': 'Gradebook',
  '/apps': 'Apps',
  '/settings': 'Settings',
  '/profile': 'User Profile',
  '/fees': 'Fees Management',
};

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [avatarOpen, setAvatarOpen] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) navigate('/login');
  }, [navigate]);

  // Close avatar dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) {
        setAvatarOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const userRole = localStorage.getItem('userRole') || 'Admin';
  const isOnDashboard = location.pathname === '/';
  const currentLabel = routeLabels[location.pathname] ?? 'SchoolERP';
  const initial = userRole[0].toUpperCase();

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* ── Top Bar ──────────────────────────────────────────── */}
      <header className="h-11 bg-[#017e84] px-3 flex items-center justify-between shrink-0 z-10">
        {/* Left: home grid + brand / breadcrumb */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => navigate('/')}
            title="Home"
            className="p-1.5 rounded hover:bg-white/15 transition-colors"
          >
            <Grid3x3 size={16} className="text-white" />
          </button>

          {!isOnDashboard && (
            <>
              <span className="text-white/40 text-xs mx-0.5">›</span>
              <span
                className="text-white text-xs font-medium cursor-pointer hover:text-white/80 transition-colors"
                onClick={() => navigate(location.pathname)}
              >
                {currentLabel}
              </span>
            </>
          )}

          {isOnDashboard && (
            <span className="text-white text-xs font-semibold tracking-wide ml-1">
              SchoolERP
            </span>
          )}
        </div>

        {/* Center: search bar */}
        <div className="flex-1 max-w-xs mx-4">
          <div className="relative">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/50" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-7 pr-3 py-1 bg-white/15 border border-white/20 rounded text-xs text-white placeholder-white/50 focus:outline-none focus:bg-white/25 focus:border-white/40 transition-colors"
            />
          </div>
        </div>

        {/* Right: icons + avatar */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => navigate('/settings')}
            title="Settings"
            className="p-1.5 rounded hover:bg-white/15 transition-colors"
          >
            <Settings size={15} className="text-white/80" />
          </button>
          <button
            title="Help"
            className="p-1.5 rounded hover:bg-white/15 transition-colors"
          >
            <HelpCircle size={15} className="text-white/80" />
          </button>

          <div className="w-px h-5 bg-white/20 mx-1" />

          {/* Avatar dropdown */}
          <div className="relative" ref={avatarRef}>
            <button
              onClick={() => setAvatarOpen(v => !v)}
              className="flex items-center gap-1.5 pl-1 pr-2 py-1 rounded hover:bg-white/15 transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-white/25 border border-white/30 flex items-center justify-center text-white text-xs font-semibold">
                {initial}
              </div>
              <span className="text-xs text-white/90 hidden sm:block">{userRole}</span>
              <ChevronDown size={12} className={`text-white/60 transition-transform ${avatarOpen ? 'rotate-180' : ''}`} />
            </button>

            {avatarOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <div className="px-3 py-2 border-b border-gray-100">
                  <p className="text-xs font-semibold text-gray-800">{userRole}</p>
                  <p className="text-xs text-gray-400">Active session</p>
                </div>
                <button
                  onClick={() => {
                    setAvatarOpen(false);
                    navigate('/profile');
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <User size={13} className="text-gray-400" />
                  My Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={13} />
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ── Page Content ─────────────────────────────────────── */}
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}