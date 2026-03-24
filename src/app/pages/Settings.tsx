import { useState } from 'react';
import type React from 'react';
import {
  Building,
  DollarSign,
  Bell,
  Shield,
  Globe,
  Mail,
  Users,
  UserCheck,
  Layers,
  ChevronRight,
  Save,
  Database,
  Code,
  Lock,
} from 'lucide-react';

/* ─── Types ──────────────────────────────────────────────────────────────── */
type SettingType = 'text' | 'number' | 'select' | 'toggle' | 'readonly';

interface Setting {
  label: string;
  description?: string;
  value?: string | boolean;
  type: SettingType;
  options?: string[];
}

interface SideGroup { title: string; settings: Setting[] }
interface SideCategory { id: string; name: string; icon: React.ElementType; groups: SideGroup[] }
interface TopSection { id: string; label: string; categories: SideCategory[] }

/* ─── Data ───────────────────────────────────────────────────────────────── */
const topSections: TopSection[] = [
  {
    id: 'general',
    label: 'General Settings',
    categories: [
      {
        id: 'company',
        name: 'Company',
        icon: Building,
        groups: [
          {
            title: 'School Information',
            settings: [
              { label: 'School Name', value: 'SchoolERP Cameroon', type: 'text', description: 'Official name of your institution' },
              { label: 'Academic Year', value: '2025/2026', type: 'text' },
              { label: 'Address', value: 'Yaoundé, Cameroon', type: 'text' },
              { label: 'Phone', value: '+237 677 000 000', type: 'text' },
              { label: 'Email', value: 'info@schoolerp.cm', type: 'text' },
            ],
          },
          {
            title: 'Localization',
            settings: [
              { label: 'Language', value: 'French (Cameroon)', type: 'select', options: ['French (Cameroon)', 'English (UK)', 'English (US)'] },
              { label: 'Timezone', value: 'Africa/Douala', type: 'select', options: ['Africa/Douala', 'Africa/Lagos', 'Europe/Paris'] },
              { label: 'Currency', value: 'FCFA', type: 'select', options: ['FCFA', 'USD', 'EUR'] },
            ],
          },
        ],
      },
      {
        id: 'fees',
        name: 'Fee Management',
        icon: DollarSign,
        groups: [
          {
            title: 'Payment',
            settings: [
              { label: 'Late Payment Fee (FCFA)', value: '5000', type: 'number' },
              { label: 'Payment Gateway', value: 'Mobile Money', type: 'select', options: ['Mobile Money', 'Bank Transfer', 'Cash'] },
              { label: 'Send Fee Reminders', value: true, type: 'toggle', description: 'Notify parents before due dates' },
              { label: 'Reminder Days Before', value: '7', type: 'number' },
            ],
          },
        ],
      },
      {
        id: 'notifications',
        name: 'Notifications',
        icon: Bell,
        groups: [
          {
            title: 'Channels',
            settings: [
              { label: 'Email Notifications', value: true, type: 'toggle' },
              { label: 'SMS Notifications', value: true, type: 'toggle' },
              { label: 'In-App Notifications', value: true, type: 'toggle' },
            ],
          },
          {
            title: 'Audience',
            settings: [
              { label: 'Notify Parents', value: true, type: 'toggle' },
              { label: 'Notify Teachers', value: true, type: 'toggle' },
              { label: 'Notify Students', value: false, type: 'toggle' },
            ],
          },
        ],
      },
      {
        id: 'email',
        name: 'Email',
        icon: Mail,
        groups: [
          {
            title: 'Outgoing Mail Server',
            settings: [
              { label: 'SMTP Host', value: 'smtp.gmail.com', type: 'text' },
              { label: 'SMTP Port', value: '587', type: 'number' },
              { label: 'SMTP Username', value: '', type: 'text' },
              { label: 'Use TLS/SSL', value: true, type: 'toggle' },
            ],
          },
        ],
      },
      {
        id: 'integrations',
        name: 'Integrations',
        icon: Globe,
        groups: [
          {
            title: 'Third-Party Services',
            settings: [
              { label: 'Enable Google SSO', value: false, type: 'toggle', description: 'Let users sign in with Google' },
              { label: 'API Access', value: true, type: 'toggle', description: 'Enable REST API access' },
              { label: 'Webhook URL', value: '', type: 'text', description: 'POST events to this endpoint' },
            ],
          },
        ],
      },
      {
        id: 'security',
        name: 'Security',
        icon: Shield,
        groups: [
          {
            title: 'Authentication',
            settings: [
              { label: 'Two-Factor Auth', value: false, type: 'toggle', description: 'Require 2FA on login' },
              { label: 'Session Timeout (min)', value: '30', type: 'number' },
            ],
          },
          {
            title: 'Password Policy',
            settings: [
              { label: 'Password Expiry (days)', value: '90', type: 'number' },
              { label: 'Minimum Password Length', value: '8', type: 'number' },
              { label: 'Require Special Characters', value: true, type: 'toggle' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'users',
    label: 'Users & Companies',
    categories: [
      {
        id: 'users-list',
        name: 'Users',
        icon: Users,
        groups: [
          {
            title: 'User Accounts',
            settings: [
              { label: 'Total Users', value: '247', type: 'readonly' },
              { label: 'Allow Self-Registration', value: false, type: 'toggle', description: 'Users can register from login page' },
              { label: 'Require Admin Approval', value: true, type: 'toggle', description: 'New accounts need admin approval' },
            ],
          },
          {
            title: 'Default User Permissions',
            settings: [
              { label: 'Default Role', value: 'Teacher', type: 'select', options: ['Admin', 'Teacher', 'Parent', 'Student', 'Accountant'] },
            ],
          },
        ],
      },
      {
        id: 'groups',
        name: 'Groups',
        icon: UserCheck,
        groups: [
          {
            title: 'Access Groups',
            settings: [
              { label: 'Admin', type: 'readonly', value: '3 members' },
              { label: 'Teacher', type: 'readonly', value: '98 members' },
              { label: 'Parent', type: 'readonly', value: '120 members' },
              { label: 'Student', type: 'readonly', value: '20 members' },
              { label: 'Accountant', type: 'readonly', value: '6 members' },
              { label: 'Librarian', type: 'readonly', value: '2 members' },
              { label: 'Transport Manager', type: 'readonly', value: '1 member' },
              { label: 'Receptionist', type: 'readonly', value: '4 members' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'technical',
    label: 'Technical',
    categories: [
      {
        id: 'database',
        name: 'Database',
        icon: Database,
        groups: [
          {
            title: 'Backup & Maintenance',
            settings: [
              { label: 'Automatic Backup', value: true, type: 'toggle', description: 'Schedule daily backups' },
              { label: 'Backup Frequency', value: 'Daily', type: 'select', options: ['Daily', 'Weekly', 'Monthly'] },
              { label: 'Retention Period', value: '30', type: 'number', description: 'Days to keep old backups' },
            ],
          },
        ],
      },
      {
        id: 'developer',
        name: 'Developer Tools',
        icon: Code,
        groups: [
          {
            title: 'Debug & Logging',
            settings: [
              { label: 'Debug Mode', value: false, type: 'toggle', description: 'Enable verbose logging' },
              { label: 'API Logging', value: true, type: 'toggle' },
              { label: 'Log Level', value: 'Error', type: 'select', options: ['Error', 'Warning', 'Info', 'Debug'] },
            ],
          },
        ],
      },
      {
        id: 'permissions',
        name: 'Permissions',
        icon: Lock,
        groups: [
          {
            title: 'Access Control',
            settings: [
              { label: 'Restrict API by IP', value: false, type: 'toggle' },
              { label: 'Allowed IP Ranges', value: '', type: 'text', description: 'Comma-separated CIDR ranges' },
              { label: 'Audit Trail', value: true, type: 'toggle', description: 'Log all user actions' },
            ],
          },
        ],
      },
      {
        id: 'modules',
        name: 'Installed Modules',
        icon: Layers,
        groups: [
          {
            title: 'Active Modules',
            settings: [
              { label: 'Student Management', value: 'Installed', type: 'readonly' },
              { label: 'Admissions', value: 'Installed', type: 'readonly' },
              { label: 'Attendance', value: 'Installed', type: 'readonly' },
              { label: 'Timetable', value: 'Installed', type: 'readonly' },
              { label: 'Examinations', value: 'Installed', type: 'readonly' },
              { label: 'Transportation', value: 'Installed', type: 'readonly' },
              { label: 'Parent Portal', value: 'Installed', type: 'readonly' },
              { label: 'Gradebook', value: 'Installed', type: 'readonly' },
            ],
          },
        ],
      },
    ],
  },
];

/* ─── Toggle Switch ─────────────────────────────────────────────────────── */
function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#017e84]/30
        ${checked ? 'bg-[#017e84]' : 'bg-gray-300'}`}
    >
      <span
        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
          ${checked ? 'translate-x-4' : 'translate-x-0'}`}
      />
    </button>
  );
}

/* ─── Main ──────────────────────────────────────────────────────────────── */
export default function Settings() {
  const [activeSection, setActiveSection] = useState('general');
  const [activeCatId, setActiveCatId] = useState('company');
  const [overrides, setOverrides] = useState<Record<string, string | boolean>>({});
  const [dirty, setDirty] = useState(false);

  const section = topSections.find(s => s.id === activeSection)!;

  // When switching top section, default to first category
  const switchSection = (id: string) => {
    setActiveSection(id);
    const sec = topSections.find(s => s.id === id)!;
    setActiveCatId(sec.categories[0].id);
  };

  const category = section.categories.find(c => c.id === activeCatId) ?? section.categories[0];

  const getVal = (k: string, setting: Setting) => (k in overrides ? overrides[k] : setting.value);
  const setVal = (k: string, v: string | boolean) => { setOverrides(p => ({ ...p, [k]: v })); setDirty(true); };

  const key = (group: string, label: string) => `${activeSection}.${activeCatId}.${group}.${label}`;

  return (
    <div className="h-full flex flex-col bg-[#f4f5f7]">

      {/* ── Top sub-navigation (Odoo-style) ───────────────── */}
      <div className="bg-white border-b border-gray-200 px-6 flex items-center justify-between shrink-0">
        <nav className="flex items-center gap-0">
          {topSections.map(sec => (
            <button
              key={sec.id}
              onClick={() => switchSection(sec.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeSection === sec.id
                ? 'border-[#017e84] text-[#017e84]'
                : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
                }`}
            >
              {sec.label}
            </button>
          ))}
        </nav>

        {/* Save / Discard */}
        <div className="flex items-center gap-2 py-2">
          {dirty && (
            <button
              onClick={() => { setOverrides({}); setDirty(false); }}
              className="px-3 py-1.5 text-xs border border-gray-300 rounded-md hover:bg-gray-50 text-gray-600 transition-colors"
            >
              Discard
            </button>
          )}
          <button
            onClick={() => setDirty(false)}
            disabled={!dirty}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-semibold transition-colors ${dirty
              ? 'bg-[#017e84] text-white hover:bg-[#016168] shadow-sm'
              : 'bg-gray-100 text-gray-400 cursor-default'
              }`}
          >
            <Save size={13} />
            Save
          </button>
        </div>
      </div>

      {/* ── Body: sidebar + content ────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Left sidebar */}
        <aside className="w-56 bg-white border-r border-gray-200 overflow-auto shrink-0">
          <div className="py-2">
            {section.categories.map(cat => {
              const Icon = cat.icon;
              const active = cat.id === activeCatId;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCatId(cat.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-medium transition-colors ${active
                    ? 'bg-[#017e84]/10 text-[#017e84] border-r-2 border-[#017e84]'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                >
                  <Icon size={15} className="shrink-0" />
                  <span className="truncate">{cat.name}</span>
                  {active && <ChevronRight size={13} className="ml-auto shrink-0 opacity-50" />}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Settings content */}
        <main className="flex-1 overflow-auto px-8 py-6">
          <div className="max-w-2xl space-y-5">
            <h1 className="text-lg font-semibold text-gray-800 mb-2">{category.name}</h1>

            {category.groups.map(group => (
              <div key={group.title} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                {/* Group header */}
                <div className="px-5 py-2.5 border-b border-gray-100 bg-gray-50/70">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {group.title}
                  </h3>
                </div>

                {/* Setting rows */}
                <div className="divide-y divide-gray-100">
                  {group.settings.map((setting, i) => {
                    const k = key(group.title, setting.label);
                    const val = getVal(k, setting);

                    return (
                      <div key={i} className="flex items-center justify-between px-5 py-3.5 gap-6">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-800 font-medium">{setting.label}</p>
                          {setting.description && (
                            <p className="text-xs text-gray-400 mt-0.5">{setting.description}</p>
                          )}
                        </div>

                        <div className="shrink-0">
                          {setting.type === 'toggle' && (
                            <Toggle
                              checked={val as boolean}
                              onChange={() => setVal(k, !(val as boolean))}
                            />
                          )}
                          {setting.type === 'text' && (
                            <input
                              type="text"
                              defaultValue={val as string}
                              onChange={e => setVal(k, e.target.value)}
                              className="w-60 px-3 py-1.5 border border-gray-300 rounded-md text-xs focus:outline-none focus:border-[#017e84] focus:ring-2 focus:ring-[#017e84]/20 text-gray-800"
                            />
                          )}
                          {setting.type === 'number' && (
                            <input
                              type="number"
                              defaultValue={val as string}
                              onChange={e => setVal(k, e.target.value)}
                              className="w-28 px-3 py-1.5 border border-gray-300 rounded-md text-xs focus:outline-none focus:border-[#017e84] focus:ring-2 focus:ring-[#017e84]/20 text-gray-800"
                            />
                          )}
                          {setting.type === 'select' && (
                            <select
                              defaultValue={val as string}
                              onChange={e => setVal(k, e.target.value)}
                              className="w-48 px-3 py-1.5 border border-gray-300 rounded-md text-xs focus:outline-none focus:border-[#017e84] focus:ring-2 focus:ring-[#017e84]/20 text-gray-800 bg-white"
                            >
                              {setting.options?.map(opt => (
                                <option key={opt}>{opt}</option>
                              ))}
                            </select>
                          )}
                          {setting.type === 'readonly' && (
                            <span className="inline-flex items-center px-3 py-1 rounded-md bg-gray-100 text-xs text-gray-600 font-medium">
                              {val as string}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
