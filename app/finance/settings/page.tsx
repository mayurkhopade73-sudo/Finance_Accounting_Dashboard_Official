'use client';
import { Toast } from '../../components/Modal';
import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

const tabs = ['Company', 'Fiscal Year', 'Approval Workflows', 'User Roles', 'Notifications'];

const workflows = [
  { id: 'WF-001', name: 'Invoice Approval', trigger: 'Invoice > $5,000', approver: 'Finance Manager', fallback: 'Super Admin', status: 'Active' },
  { id: 'WF-002', name: 'Payment Release', trigger: 'All payments', approver: 'Accounts Head', fallback: 'Finance Manager', status: 'Active' },
  { id: 'WF-003', name: 'Budget Modification', trigger: 'Any budget change', approver: 'Super Admin', fallback: '—', status: 'Active' },
  { id: 'WF-004', name: 'Vendor Onboarding', trigger: 'New vendor', approver: 'Procurement Lead', fallback: 'Finance Manager', status: 'Active' },
  { id: 'WF-005', name: 'Expense > $1,000', trigger: 'Expense claim > $1,000', approver: 'Dept Head', fallback: 'Finance Manager', status: 'Inactive' },
];

const roles = [
  { name: 'Super Admin', users: 1, permissions: ['Full Access', 'User Management', 'Audit Logs', 'System Settings'], color: 'bg-red-50 text-red-700' },
  { name: 'Finance Manager', users: 2, permissions: ['View All', 'Approve Payments', 'Generate Reports', 'Manage Budgets'], color: 'bg-blue-50 text-blue-700' },
  { name: 'Accounts Team', users: 5, permissions: ['Create Invoices', 'Record Expenses', 'View Reports'], color: 'bg-emerald-50 text-emerald-700' },
  { name: 'Sales Team', users: 8, permissions: ['View Quotes', 'Create Orders', 'View Customer Data'], color: 'bg-violet-50 text-violet-700' },
  { name: 'Read Only', users: 3, permissions: ['View Dashboard', 'View Reports'], color: 'bg-gray-100 text-gray-600' },
];

const notifDefaults = {
  invoiceCreated: true, paymentReceived: true, billDue: true, budgetAlert: true,
  taxReminder: false, reportReady: true, loginAlert: false, systemUpdate: true,
};
const notifLabels: Record<string, string> = {
  invoiceCreated: 'New Invoice Created', paymentReceived: 'Payment Received', billDue: 'Bill Due Reminder',
  budgetAlert: 'Budget Alert (>80%)', taxReminder: 'Tax Filing Reminder', reportReady: 'Report Ready',
  loginAlert: 'New Login from Unknown Device', systemUpdate: 'System Update Available',
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [toast, setToast] = useState('');
  const [notifications, setNotifications] = useState(notifDefaults);

  return (
    <div className="p-6 space-y-6">
      {toast && <Toast message={toast} onDone={() => setToast("")} />}
      <div>
        <h1 className="text-2xl font-bold text-white-800">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage platform configuration and preferences</p>
      </div>

      <div className="border-b border-gray-200">
        <div className="flex">{tabs.map((tab, i) => <button key={tab} onClick={() => setActiveTab(i)} className={`px-4 py-2.5 text-sm border-b-2 transition-colors ${activeTab === i ? 'text-blue-600 font-medium border-blue-600' : 'text-gray-500 border-transparent hover:text-gray-700'}`}>{tab}</button>)}</div>
      </div>

      {activeTab === 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4 max-w-2xl">
          <h2 className="text-gray-800 font-semibold">Company Information</h2>
          <div className="grid grid-cols-2 gap-4">
            {[['Company Name', 'Cognexia.AI'], ['GST Number', '27AABCC1234F1ZK'], ['PAN Number', 'AABCC1234F'], ['CIN', 'U72200MH2018PTC123456'], ['Website', 'www.cognexia.com'], ['Industry', 'Information Technology']].map(([label, val]) => (
              <div key={label}>
                <label className="block text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">{label}</label>
                <input defaultValue={val} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-blue-400" />
              </div>
            ))}
          </div>
          <div>
            <label className="block text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">Registered Address</label>
            <textarea rows={2} defaultValue="123 Business Park, Bandra Kurla Complex, Mumbai 400051, Maharashtra" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">Base Currency</label>
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none">
                <option>INR — Indian Rupee</option><option>USD — US Dollar</option><option>EUR — Euro</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">Date Format</label>
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none">
                <option>DD MMM YYYY</option><option>MM/DD/YYYY</option><option>YYYY-MM-DD</option>
              </select>
            </div>
          </div>
          <button onClick={() => setToast('Company settings saved!')} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Save Changes</button>
        </div>
      )}

      {activeTab === 1 && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4 max-w-2xl">
          <h2 className="text-gray-800 font-semibold">Fiscal Year Configuration</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">Fiscal Year Start</label>
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none"><option>April 1</option><option>January 1</option><option>July 1</option></select></div>
            <div><label className="block text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">Fiscal Year End</label>
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none"><option>March 31</option><option>December 31</option><option>June 30</option></select></div>
            <div><label className="block text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">Current FY</label>
              <input defaultValue="FY 2025-26" readOnly className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-400 bg-gray-50" /></div>
            <div><label className="block text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">Reporting Period</label>
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none"><option>Monthly</option><option>Quarterly</option><option>Annually</option></select></div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <span className="text-amber-600 text-sm">⚠️ Changing fiscal year settings will affect all historical reports. Contact support before making changes.</span>
          </div>
          <button onClick={() => setToast('Fiscal year settings saved!')} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Save Changes</button>
        </div>
      )}

      {activeTab === 2 && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden max-w-5xl">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <h2 className="text-gray-800 font-semibold text-sm">Approval Workflows</h2>
            <button onClick={() => setToast('Add Workflow modal — use the form below')} className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"><Plus className="w-3.5 h-3.5" /> Add Workflow</button>
          </div>
          <table className="w-full">
            <thead><tr className="bg-gray-50 border-b border-gray-100">{['ID', 'Workflow Name', 'Trigger Condition', 'Primary Approver', 'Fallback', 'Status', 'Actions'].map(h => <th key={h} className="text-left text-gray-500 text-xs font-medium px-4 py-3">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-100">
              {workflows.map(w => (
                <tr key={w.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3.5 text-blue-600 text-sm font-mono">{w.id}</td>
                  <td className="px-4 py-3.5 text-gray-800 text-sm font-medium">{w.name}</td>
                  <td className="px-4 py-3.5 text-gray-600 text-sm">{w.trigger}</td>
                  <td className="px-4 py-3.5 text-gray-600 text-sm">{w.approver}</td>
                  <td className="px-4 py-3.5 text-gray-400 text-sm">{w.fallback}</td>
                  <td className="px-4 py-3.5"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${w.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-gray-100 text-gray-500'}`}>{w.status}</span></td>
                  <td className="px-4 py-3.5 flex gap-2">
                    <button onClick={() => setToast(`Editing workflow ${w.id}`)} className="px-3 py-1 bg-white border border-gray-200 text-gray-600 rounded text-xs hover:bg-gray-50">Edit</button>
                    <button onClick={() => setToast(`Workflow ${w.id} deleted`)} className="p-1 text-gray-400 hover:text-rose-500 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 3 && (
        <div className="space-y-4 max-w-5xl">
          <div className="flex justify-end">
            <button onClick={() => setToast('Add Role — contact Super Admin')} className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700"><Plus className="w-3.5 h-3.5" /> Add Role</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roles.map(role => (
              <div key={role.name} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${role.color}`}>{role.name}</span>
                    <span className="text-gray-400 text-xs">{role.users} user{role.users !== 1 ? 's' : ''}</span>
                  </div>
                  <button onClick={() => setToast(`Editing role: ${role.name}`)} className="text-blue-600 text-xs hover:text-blue-700">Edit</button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {role.permissions.map(p => (
                    <span key={p} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">{p}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 4 && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm max-w-lg">
          <h2 className="text-gray-800 font-semibold mb-4">Notification Preferences</h2>
          <div className="space-y-1">
            {Object.entries(notifications).map(([key, val]) => (
              <div key={key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <span className="text-gray-700 text-sm">{notifLabels[key]}</span>
                <button
                  onClick={() => setNotifications(n => ({ ...n, [key]: !val }))}
                  className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${val ? 'bg-blue-600' : 'bg-gray-200'}`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${val ? 'left-[22px]' : 'left-0.5'}`} />
                </button>
              </div>
            ))}
          </div>
          <button onClick={() => setToast('Notification preferences saved!')} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Save Preferences</button>
        </div>
      )}
    </div>
  );
}
