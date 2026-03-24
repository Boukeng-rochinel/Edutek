import { useState } from 'react';
import {
  Building,
  Users,
  DollarSign,
  Bell,
  Shield,
  Search,
  Save,
  ChevronRight,
} from 'lucide-react';

/* ─── data ─────────────────────────────────────────────────────────────── */

type SettingType = 'text' | 'number' | 'select' | 'toggle' | 'readonly' | 'group-header';

interface Setting {
  label: string;
  description?: string;
  value?: string | boolean;
  type: SettingType;
  options?: string[];
}

interface Category {
  id: string;
  name: string;
  icon: React.ElementType;
  groups: { title: string; settings: Setting[] }[];
}

const settingsCategories: Category[] = [
  {
    id: 'general',
    name: 'General Settings',
    icon: Building,
    groups: [
      {
        title: 'School Information',
        settings: [
          { label: 'School Name', value: 'SchoolERP Cameroon', type: 'text', description: 'The official name of your institution' },
          { label: 'Academic Year', value: '2025/2026', type: 'text', description: 'Current academic year label' },
          { label: 'School Address', value: 'Yaoundé, Cameroon', type: 'text' },
          { label: 'Phone Number', value: '+237 677 000 000', type: 'text' },
          { label: 'Email Address', value: 'info@schoolerp.cm', type: 'text' },
        ],
      },
      {
        title: 'Localization',
        settings: [
          { label: 'Language', value: 'French (Cameroon)', type: 'select', options: ['French (Cameroon)', 'English (UK)', 'English (US)'] },
          { label: 'Timezone', value: 'Africa/Douala', type: 'select', options: ['Africa/Douala', 'Africa/Lagos', 'Europe/Paris'] },
        ],
      },
    ],
  },
  {
    id: 'users',
    name: 'Users & Groups',
    icon: Users,
    groups: [
      {
        title: 'User Management',
        settings: [
          { label: 'Total Users', value: '247', type: 'readonly' },
          { label: 'Active Groups', value: '8', type: 'readonly' },
          { label: 'Allow Self-Registration', value: false, type: 'toggle', description: 'Let users create accounts from the login page' },
          { label: 'Require Admin Approval', value: true, type: 'toggle', description: 'New accounts must be approved by an admin' },
        ],
      },
      {
        title: 'User Groups',
        settings: [
          { label: 'Admin', type: 'readonly', value: '3 members' },
          { label: 'Teacher', type: 'readonly', value: '98 members' },
          { label: 'Parent', type: 'readonly', value: '120 members' },
          { label: 'Student', type: 'readonly', value: '20 members' },
          { label: 'Accountant', type: 'readonly', value: '6 members' },
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
        title: 'Payment Settings',
        settings: [
          { label: 'Currency', value: 'FCFA', type: 'select', options: ['FCFA', 'USD', 'EUR'] },
          { label: 'Late Payment Fee (FCFA)', value: '5000', type: 'number' },
          { label: 'Payment Gateway', value: 'Mobile Money', type: 'select', options: ['Mobile Money', 'Bank Transfer', 'Cash'] },
        ],
      },
      {
        title: 'Reminders',
        settings: [
          { label: 'Send Fee Reminders', value: true, type: 'toggle', description: 'Automatically notify parents before due dates' },
          { label: 'Reminder Days Before', value: '7', type: 'number', description: 'Days before due date to send reminders' },
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
          { label: 'Email Notifications', value: true, type: 'toggle', description: 'Send updates via email' },
          { label: 'SMS Notifications', value: true, type: 'toggle', description: 'Send SMS for urgent alerts' },
          { label: 'In-App Notifications', value: true, type: 'toggle', description: 'Show notifications within the app' },
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
    id: 'security',
    name: 'Security',
    icon: Shield,
    groups: [
      {
        title: 'Authentication',
        settings: [
          { label: 'Two-Factor Authentication', value: false, type: 'toggle', description: 'Require a second factor on login' },
          { label: 'Session Timeout (min)', value: '30', type: 'number', description: 'Auto-logout after inactivity' },
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
];

/* ─── Toggle Switch component ───────────────────────────────────────────── */
function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#017e84]/30 ${checked ? 'bg-[#017e84]' : 'bg-gray-200'
        }`}
    >
      <span
        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-4' : 'translate-x-0'
          }`}
      />
    </button>
  );
}

/* ─── Main component ────────────────────────────────────────────────────── */
export default function Settings() {
  const [selectedId, setSelectedId] = useState('general');
  const [search, setSearch] = useState('');
  const [dirty, setDirty] = useState(false);

  // Local mutable state for toggles / inputs (keyed by `catId.groupTitle.label`)
  const [overrides, setOverrides] = useState<Record<string, string | boolean>>({});

  const category = settingsCategories.find(c => c.id === selectedId)!;

  const getVal = (catId: string, groupTitle: string, setting: Setting) => {
    const key = `${catId}.${groupTitle}.${setting.label}`;
    return key in overrides ? overrides[key] : setting.value;
  };

  const setVal = (catId: string, groupTitle: string, setting: Setting, value: string | boolean) => {
    const key = `${catId}.${groupTitle}.${setting.label}`;
    setOverrides(prev => ({ ...prev, [key]: value }));
    setDirty(true);
  };

  const handleSave = () => setDirty(false);
  const handleDiscard = () => { setOverrides({}); setDirty(false); };

  const filteredCats = settingsCategories.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-full flex bg-[#f4f5f7]">
      {/* ── Left Sidebar ─────────────────────────────────────── */}
      <aside className="w-60 bg-white border-r border-gray-200 flex flex-col shrink-0">
        {/* Sidebar header */}
        <div className="px-4 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-800 mb-3">Settings</h2>
          <div className="relative">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search settings..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-7 pr-3 py-1.5 bg-gray-100 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-[#017e84]/20 text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-auto py-2">
          {filteredCats.map(cat => {
            const Icon = cat.icon;
            const active = cat.id === selectedId;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedId(cat.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-medium transition-colors ${active
                    ? 'bg-[#017e84]/10 text-[#017e84] border-r-2 border-[#017e84]'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
              >
                <Icon size={15} />
                <span>{cat.name}</span>
                {active && <ChevronRight size={13} className="ml-auto opacity-60" />}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* ── Main Content ─────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top breadcrumb / action bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="font-medium text-gray-800">{category.name}</span>
          </div>
          <div className="flex items-center gap-2">
            {dirty && (
              <button
                onClick={handleDiscard}
                className="px-3 py-1.5 text-xs border border-gray-300 rounded-md hover:bg-gray-50 text-gray-600 transition-colors"
              >
                Discard
              </button>
            )}
            <button
              onClick={handleSave}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-medium transition-colors ${dirty
                  ? 'bg-[#017e84] text-white hover:bg-[#016168] shadow-sm'
                  : 'bg-gray-100 text-gray-400 cursor-default'
                }`}
              disabled={!dirty}
            >
              <Save size={13} />
              Save
            </button>
          </div>
        </div>

        {/* Scrollable settings body */}
        <div className="flex-1 overflow-auto px-6 py-6">
          <div className="max-w-2xl space-y-6">
            {category.groups.map(group => (
              <div key={group.title} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                {/* Group header */}
                <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/60">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {group.title}
                  </h3>
                </div>

                {/* Settings rows */}
                <div className="divide-y divide-gray-100">
                  {group.settings.map((setting, i) => {
                    const val = getVal(category.id, group.title, setting);
                    return (
                      <div key={i} className="flex items-center justify-between px-5 py-3.5 gap-4">
                        {/* Label + description */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-800 font-medium leading-snug">{setting.label}</p>
                          {setting.description && (
                            <p className="text-xs text-gray-400 mt-0.5">{setting.description}</p>
                          )}
                        </div>

                        {/* Control */}
                        <div className="shrink-0">
                          {setting.type === 'toggle' && (
                            <Toggle
                              checked={val as boolean}
                              onChange={() => setVal(category.id, group.title, setting, !(val as boolean))}
                            />
                          )}
                          {setting.type === 'text' && (
                            <input
                              type="text"
                              defaultValue={val as string}
                              onChange={e => setVal(category.id, group.title, setting, e.target.value)}
                              className="w-56 px-3 py-1.5 border border-gray-300 rounded-md text-xs focus:outline-none focus:border-[#017e84] focus:ring-2 focus:ring-[#017e84]/20 text-gray-800"
                            />
                          )}
                          {setting.type === 'number' && (
                            <input
                              type="number"
                              defaultValue={val as string}
                              onChange={e => setVal(category.id, group.title, setting, e.target.value)}
                              className="w-28 px-3 py-1.5 border border-gray-300 rounded-md text-xs focus:outline-none focus:border-[#017e84] focus:ring-2 focus:ring-[#017e84]/20 text-gray-800"
                            />
                          )}
                          {setting.type === 'select' && (
                            <select
                              defaultValue={val as string}
                              onChange={e => setVal(category.id, group.title, setting, e.target.value)}
                              className="w-44 px-3 py-1.5 border border-gray-300 rounded-md text-xs focus:outline-none focus:border-[#017e84] focus:ring-2 focus:ring-[#017e84]/20 text-gray-800 bg-white"
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
        </div>
      </div>
    </div>
  );
}
