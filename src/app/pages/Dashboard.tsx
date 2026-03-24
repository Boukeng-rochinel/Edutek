import { useNavigate } from 'react-router';
import {
  Users,
  UserPlus,
  CheckSquare,
  Calendar,
  FileText,
  Bus,
  UserCircle,
  BookOpen,
  Settings as SettingsIcon,
} from 'lucide-react';

const apps = [
  { icon: Users, label: 'Students', path: '/students', color: '#017e84' },
  { icon: UserPlus, label: 'Admissions', path: '/admissions', color: '#7C5CBF' },
  { icon: CheckSquare, label: 'Attendance', path: '/attendance', color: '#E67E22' },
  { icon: Calendar, label: 'Timetable', path: '/timetable', color: '#2980B9' },
  { icon: FileText, label: 'Examinations', path: '/examinations', color: '#C0392B' },
  { icon: Bus, label: 'Transportation', path: '/transportation', color: '#875A7B' },
  { icon: UserCircle, label: 'Parent Portal', path: '/parent-portal', color: '#16A085' },
  { icon: BookOpen, label: 'Gradebook', path: '/gradebook', color: '#D35400' },
  { icon: SettingsIcon, label: 'Settings', path: '/settings', color: '#7F8C8D' },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="h-full bg-[#f4f5f7] overflow-auto">
      <div className="max-w-6xl mx-auto px-10 py-10">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">
          Applications
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {apps.map((app) => {
            const Icon = app.icon;
            return (
              <button
                key={app.path}
                onClick={() => navigate(app.path)}
                className="group flex flex-col items-center gap-3 p-6 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-150 cursor-pointer"
              >
                {/* Icon — doubled from 56px to 112px */}
                <div
                  className="w-28 h-28 rounded-3xl flex items-center justify-center text-white shadow-sm group-hover:shadow-md transition-shadow duration-150"
                  style={{ backgroundColor: app.color }}
                >
                  <Icon size={52} />
                </div>
                <span className="text-sm text-gray-600 text-center font-medium group-hover:text-gray-900 leading-snug">
                  {app.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}