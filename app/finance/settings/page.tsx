// 'use client';
// import { Toast } from '../../components/Modal';
// import { useState } from 'react';
// import { Plus, Trash2 } from 'lucide-react';

// const tabs = ['Company', 'Fiscal Year', 'Approval Workflows', 'User Roles', 'Notifications'];

// const workflows = [
//   { id: 'WF-001', name: 'Invoice Approval', trigger: 'Invoice > $5,000', approver: 'Finance Manager', fallback: 'Super Admin', status: 'Active' },
//   { id: 'WF-002', name: 'Payment Release', trigger: 'All payments', approver: 'Accounts Head', fallback: 'Finance Manager', status: 'Active' },
//   { id: 'WF-003', name: 'Budget Modification', trigger: 'Any budget change', approver: 'Super Admin', fallback: '—', status: 'Active' },
//   { id: 'WF-004', name: 'Vendor Onboarding', trigger: 'New vendor', approver: 'Procurement Lead', fallback: 'Finance Manager', status: 'Active' },
//   { id: 'WF-005', name: 'Expense > $1,000', trigger: 'Expense claim > $1,000', approver: 'Dept Head', fallback: 'Finance Manager', status: 'Inactive' },
// ];

// const roles = [
//   { name: 'Super Admin', users: 1, permissions: ['Full Access', 'User Management', 'Audit Logs', 'System Settings'], color: 'bg-red-50 text-red-700' },
//   { name: 'Finance Manager', users: 2, permissions: ['View All', 'Approve Payments', 'Generate Reports', 'Manage Budgets'], color: 'bg-blue-50 text-blue-700' },
//   { name: 'Accounts Team', users: 5, permissions: ['Create Invoices', 'Record Expenses', 'View Reports'], color: 'bg-emerald-50 text-emerald-700' },
//   { name: 'Sales Team', users: 8, permissions: ['View Quotes', 'Create Orders', 'View Customer Data'], color: 'bg-violet-50 text-violet-700' },
//   { name: 'Read Only', users: 3, permissions: ['View Dashboard', 'View Reports'], color: 'bg-gray-100 text-gray-600' },
// ];

// const notifDefaults = {
//   invoiceCreated: true, paymentReceived: true, billDue: true, budgetAlert: true,
//   taxReminder: false, reportReady: true, loginAlert: false, systemUpdate: true,
// };
// const notifLabels: Record<string, string> = {
//   invoiceCreated: 'New Invoice Created', paymentReceived: 'Payment Received', billDue: 'Bill Due Reminder',
//   budgetAlert: 'Budget Alert (>80%)', taxReminder: 'Tax Filing Reminder', reportReady: 'Report Ready',
//   loginAlert: 'New Login from Unknown Device', systemUpdate: 'System Update Available',
// };

// export default function SettingsPage() {
//   const [activeTab, setActiveTab] = useState(0);
//   const [toast, setToast] = useState('');
//   const [notifications, setNotifications] = useState(notifDefaults);

//   return (
//     <div className="p-6 space-y-6">
//       {toast && <Toast message={toast} onDone={() => setToast("")} />}
//       <div>
//         <h1 className="text-2xl font-bold text-white-800">Settings</h1>
//         <p className="text-gray-500 text-sm mt-1">Manage platform configuration and preferences</p>
//       </div>

//       <div className="border-b border-gray-200">
//         <div className="flex">{tabs.map((tab, i) => <button key={tab} onClick={() => setActiveTab(i)} className={`px-4 py-2.5 text-sm border-b-2 transition-colors ${activeTab === i ? 'text-blue-600 font-medium border-blue-600' : 'text-gray-500 border-transparent hover:text-gray-700'}`}>{tab}</button>)}</div>
//       </div>

//       {activeTab === 0 && (
//         <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4 max-w-2xl">
//           <h2 className="text-gray-800 font-semibold">Company Information</h2>
//           <div className="grid grid-cols-2 gap-4">
//             {[['Company Name', 'Cognexia.AI'], ['GST Number', '27AABCC1234F1ZK'], ['PAN Number', 'AABCC1234F'], ['CIN', 'U72200MH2018PTC123456'], ['Website', 'www.cognexia.com'], ['Industry', 'Information Technology']].map(([label, val]) => (
//               <div key={label}>
//                 <label className="block text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">{label}</label>
//                 <input defaultValue={val} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-blue-400" />
//               </div>
//             ))}
//           </div>
//           <div>
//             <label className="block text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">Registered Address</label>
//             <textarea rows={2} defaultValue="123 Business Park, Bandra Kurla Complex, Mumbai 400051, Maharashtra" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none resize-none" />
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">Base Currency</label>
//               <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none">
//                 <option>INR — Indian Rupee</option><option>USD — US Dollar</option><option>EUR — Euro</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">Date Format</label>
//               <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none">
//                 <option>DD MMM YYYY</option><option>MM/DD/YYYY</option><option>YYYY-MM-DD</option>
//               </select>
//             </div>
//           </div>
//           <button onClick={() => setToast('Company settings saved!')} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Save Changes</button>
//         </div>
//       )}

//       {activeTab === 1 && (
//         <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4 max-w-2xl">
//           <h2 className="text-gray-800 font-semibold">Fiscal Year Configuration</h2>
//           <div className="grid grid-cols-2 gap-4">
//             <div><label className="block text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">Fiscal Year Start</label>
//               <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none"><option>April 1</option><option>January 1</option><option>July 1</option></select></div>
//             <div><label className="block text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">Fiscal Year End</label>
//               <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none"><option>March 31</option><option>December 31</option><option>June 30</option></select></div>
//             <div><label className="block text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">Current FY</label>
//               <input defaultValue="FY 2025-26" readOnly className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-400 bg-gray-50" /></div>
//             <div><label className="block text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">Reporting Period</label>
//               <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none"><option>Monthly</option><option>Quarterly</option><option>Annually</option></select></div>
//           </div>
//           <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
//             <span className="text-amber-600 text-sm">⚠️ Changing fiscal year settings will affect all historical reports. Contact support before making changes.</span>
//           </div>
//           <button onClick={() => setToast('Fiscal year settings saved!')} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Save Changes</button>
//         </div>
//       )}

//       {activeTab === 2 && (
//         <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden max-w-5xl">
//           <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
//             <h2 className="text-gray-800 font-semibold text-sm">Approval Workflows</h2>
//             <button onClick={() => setToast('Add Workflow modal — use the form below')} className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"><Plus className="w-3.5 h-3.5" /> Add Workflow</button>
//           </div>
//           <table className="w-full">
//             <thead><tr className="bg-gray-50 border-b border-gray-100">{['ID', 'Workflow Name', 'Trigger Condition', 'Primary Approver', 'Fallback', 'Status', 'Actions'].map(h => <th key={h} className="text-left text-gray-500 text-xs font-medium px-4 py-3">{h}</th>)}</tr></thead>
//             <tbody className="divide-y divide-gray-100">
//               {workflows.map(w => (
//                 <tr key={w.id} className="hover:bg-gray-50">
//                   <td className="px-4 py-3.5 text-blue-600 text-sm font-mono">{w.id}</td>
//                   <td className="px-4 py-3.5 text-gray-800 text-sm font-medium">{w.name}</td>
//                   <td className="px-4 py-3.5 text-gray-600 text-sm">{w.trigger}</td>
//                   <td className="px-4 py-3.5 text-gray-600 text-sm">{w.approver}</td>
//                   <td className="px-4 py-3.5 text-gray-400 text-sm">{w.fallback}</td>
//                   <td className="px-4 py-3.5"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${w.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-gray-100 text-gray-500'}`}>{w.status}</span></td>
//                   <td className="px-4 py-3.5 flex gap-2">
//                     <button onClick={() => setToast(`Editing workflow ${w.id}`)} className="px-3 py-1 bg-white border border-gray-200 text-gray-600 rounded text-xs hover:bg-gray-50">Edit</button>
//                     <button onClick={() => setToast(`Workflow ${w.id} deleted`)} className="p-1 text-gray-400 hover:text-rose-500 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {activeTab === 3 && (
//         <div className="space-y-4 max-w-5xl">
//           <div className="flex justify-end">
//             <button onClick={() => setToast('Add Role — contact Super Admin')} className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700"><Plus className="w-3.5 h-3.5" /> Add Role</button>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {roles.map(role => (
//               <div key={role.name} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
//                 <div className="flex items-center justify-between mb-3">
//                   <div className="flex items-center gap-3">
//                     <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${role.color}`}>{role.name}</span>
//                     <span className="text-gray-400 text-xs">{role.users} user{role.users !== 1 ? 's' : ''}</span>
//                   </div>
//                   <button onClick={() => setToast(`Editing role: ${role.name}`)} className="text-blue-600 text-xs hover:text-blue-700">Edit</button>
//                 </div>
//                 <div className="flex flex-wrap gap-1.5">
//                   {role.permissions.map(p => (
//                     <span key={p} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">{p}</span>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {activeTab === 4 && (
//         <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm max-w-lg">
//           <h2 className="text-gray-800 font-semibold mb-4">Notification Preferences</h2>
//           <div className="space-y-1">
//             {Object.entries(notifications).map(([key, val]) => (
//               <div key={key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
//                 <span className="text-gray-700 text-sm">{notifLabels[key]}</span>
//                 <button
//                   onClick={() => setNotifications(n => ({ ...n, [key]: !val }))}
//                   className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${val ? 'bg-blue-600' : 'bg-gray-200'}`}
//                 >
//                   <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${val ? 'left-[22px]' : 'left-0.5'}`} />
//                 </button>
//               </div>
//             ))}
//           </div>
//           <button onClick={() => setToast('Notification preferences saved!')} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Save Preferences</button>
//         </div>
//       )}
//     </div>
//   );
// }


'use client';
import { Toast } from '../../components/Modal';
import { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronRight, X } from 'lucide-react';

const tabs = ['Company', 'Fiscal Year', 'Approval Workflows', 'User Roles', 'Notifications'];

const initialWorkflows = [
  { id: 'WF-001', name: 'Invoice Approval', trigger: 'Invoice > $5,000', approver: 'Finance Manager', fallback: 'Super Admin', status: 'Active' },
  { id: 'WF-002', name: 'Payment Release', trigger: 'All payments', approver: 'Accounts Head', fallback: 'Finance Manager', status: 'Active' },
  { id: 'WF-003', name: 'Budget Modification', trigger: 'Any budget change', approver: 'Super Admin', fallback: '—', status: 'Active' },
  { id: 'WF-004', name: 'Vendor Onboarding', trigger: 'New vendor', approver: 'Procurement Lead', fallback: 'Finance Manager', status: 'Active' },
  { id: 'WF-005', name: 'Expense > $1,000', trigger: 'Expense claim > $1,000', approver: 'Dept Head', fallback: 'Finance Manager', status: 'Inactive' },
];

const initialRoles = [
  { name: 'Super Admin', users: 1, permissions: ['Full Access', 'User Management', 'Audit Logs', 'System Settings'], color: 'bg-red-50 text-red-700' },
  { name: 'Finance Manager', users: 2, permissions: ['View All', 'Approve Payments', 'Generate Reports', 'Manage Budgets'], color: 'bg-blue-50 text-blue-700' },
  { name: 'Accounts Team', users: 5, permissions: ['Create Invoices', 'Record Expenses', 'View Reports'], color: 'bg-emerald-50 text-emerald-700' },
  { name: 'Sales Team', users: 8, permissions: ['View Quotes', 'Create Orders', 'View Customer Data'], color: 'bg-violet-50 text-violet-700' },
  { name: 'Read Only', users: 3, permissions: ['View Dashboard', 'View Reports'], color: 'bg-gray-100 text-gray-600' },
];

const ALL_PERMISSIONS = [
  'Full Access', 'User Management', 'Audit Logs', 'System Settings',
  'View All', 'Approve Payments', 'Generate Reports', 'Manage Budgets',
  'Create Invoices', 'Record Expenses', 'View Reports',
  'View Quotes', 'Create Orders', 'View Customer Data', 'View Dashboard',
];

const APPROVER_OPTIONS = ['Finance Manager', 'Accounts Head', 'Super Admin', 'Procurement Lead', 'Dept Head'];
const TRIGGER_OPTIONS = ['Invoice > $5,000', 'All payments', 'Any budget change', 'New vendor', 'Expense claim > $1,000', 'Custom'];

const notifDefaults = {
  invoiceCreated: true, paymentReceived: true, billDue: true, budgetAlert: true,
  taxReminder: false, reportReady: true, loginAlert: false, systemUpdate: true,
};
const notifLabels: Record<string, string> = {
  invoiceCreated: 'New Invoice Created', paymentReceived: 'Payment Received', billDue: 'Bill Due Reminder',
  budgetAlert: 'Budget Alert (>80%)', taxReminder: 'Tax Filing Reminder', reportReady: 'Report Ready',
  loginAlert: 'New Login from Unknown Device', systemUpdate: 'System Update Available',
};

// ─── Validation helpers ───────────────────────────────────────────────────────

const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const cinRegex = /^[UL][0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$/;
const urlRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+/;

type CompanyForm = {
  companyName: string; gst: string; pan: string; cin: string;
  website: string; industry: string; address: string;
};
type CompanyErrors = Partial<Record<keyof CompanyForm, string>>;

function validateCompany(f: CompanyForm): CompanyErrors {
  const e: CompanyErrors = {};
  if (!f.companyName.trim()) e.companyName = 'Company name is required.';
  if (!f.gst.trim()) { e.gst = 'GST number is required.'; }
  else if (!gstRegex.test(f.gst.trim().toUpperCase())) { e.gst = 'Enter a valid GST number (e.g. 27AABCC1234F1ZK).'; }
  if (!f.pan.trim()) { e.pan = 'PAN number is required.'; }
  else if (!panRegex.test(f.pan.trim().toUpperCase())) { e.pan = 'Enter a valid PAN (e.g. AABCC1234F).'; }
  if (!f.cin.trim()) { e.cin = 'CIN is required.'; }
  else if (!cinRegex.test(f.cin.trim().toUpperCase())) { e.cin = 'Enter a valid CIN (e.g. U72200MH2018PTC123456).'; }
  if (!f.website.trim()) { e.website = 'Website is required.'; }
  else if (!urlRegex.test(f.website.trim())) { e.website = 'Enter a valid website URL.'; }
  if (!f.industry.trim()) e.industry = 'Industry is required.';
  if (!f.address.trim()) e.address = 'Registered address is required.';
  return e;
}

function Err({ msg }: { msg?: string }) {
  return msg ? <p className="text-rose-500 text-xs mt-1">{msg}</p> : null;
}
function fieldBorder(hasError: boolean) {
  return `w-full border rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none ${
    hasError ? 'border-rose-400 focus:border-rose-400' : 'border-gray-200 focus:border-blue-400'
  }`;
}

// ─── Add Workflow Modal ───────────────────────────────────────────────────────

type WorkflowForm = { name: string; trigger: string; approver: string; fallback: string; status: string };
type WorkflowErrors = Partial<Record<keyof WorkflowForm, string>>;

function validateWorkflow(f: WorkflowForm): WorkflowErrors {
  const e: WorkflowErrors = {};
  if (!f.name.trim()) e.name = 'Workflow name is required.';
  if (!f.trigger.trim()) e.trigger = 'Trigger condition is required.';
  if (!f.approver.trim()) e.approver = 'Primary approver is required.';
  return e;
}

function AddWorkflowModal({ onClose, onSave }: { onClose: () => void; onSave: (w: WorkflowForm) => void }) {
  const [form, setForm] = useState<WorkflowForm>({ name: '', trigger: '', approver: '', fallback: '', status: 'Active' });
  const [errors, setErrors] = useState<WorkflowErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof WorkflowForm, boolean>>>({});

  const change = (field: keyof WorkflowForm, val: string) => {
    const updated = { ...form, [field]: val };
    setForm(updated);
    if (touched[field]) setErrors(validateWorkflow(updated));
  };
  const blur = (field: keyof WorkflowForm) => {
    setTouched(p => ({ ...p, [field]: true }));
    setErrors(validateWorkflow(form));
  };
  const err = (field: keyof WorkflowForm) => touched[field] ? errors[field] : undefined;

  const handleSave = () => {
    const allTouched = Object.fromEntries(Object.keys(form).map(k => [k, true])) as Partial<Record<keyof WorkflowForm, boolean>>;
    setTouched(allTouched);
    const errs = validateWorkflow(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-800 font-semibold">Add Workflow</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">Workflow Name *</label>
            <input value={form.name} onChange={e => change('name', e.target.value)} onBlur={() => blur('name')}
              placeholder="e.g. Invoice Approval" className={fieldBorder(!!err('name'))} />
            <Err msg={err('name')} />
          </div>

          <div>
            <label className="block text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">Trigger Condition *</label>
            <select value={form.trigger} onChange={e => change('trigger', e.target.value)} onBlur={() => blur('trigger')}
              className={`w-full border rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none ${err('trigger') ? 'border-rose-400' : 'border-gray-200 focus:border-blue-400'}`}>
              <option value="">— Select trigger —</option>
              {TRIGGER_OPTIONS.map(o => <option key={o}>{o}</option>)}
            </select>
            <Err msg={err('trigger')} />
          </div>

          <div>
            <label className="block text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">Primary Approver *</label>
            <select value={form.approver} onChange={e => change('approver', e.target.value)} onBlur={() => blur('approver')}
              className={`w-full border rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none ${err('approver') ? 'border-rose-400' : 'border-gray-200 focus:border-blue-400'}`}>
              <option value="">— Select approver —</option>
              {APPROVER_OPTIONS.map(o => <option key={o}>{o}</option>)}
            </select>
            <Err msg={err('approver')} />
          </div>

          <div>
            <label className="block text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">Fallback Approver</label>
            <select value={form.fallback} onChange={e => change('fallback', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-blue-400">
              <option value="">— None —</option>
              {APPROVER_OPTIONS.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">Status</label>
            <select value={form.status} onChange={e => change('status', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-blue-400">
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700">Add Workflow</button>
        </div>
      </div>
    </div>
  );
}

// ─── Edit Workflow Modal ──────────────────────────────────────────────────────

function EditWorkflowModal({ workflow, onClose, onSave }: {
  workflow: typeof initialWorkflows[0]; onClose: () => void;
  onSave: (w: typeof initialWorkflows[0]) => void;
}) {
  const [form, setForm] = useState({ ...workflow });
  const [errors, setErrors] = useState<WorkflowErrors>({});
  const [touched, setTouched] = useState<Partial<Record<string, boolean>>>({});

  const change = (field: string, val: string) => {
    const updated = { ...form, [field]: val };
    setForm(updated as typeof workflow);
    if (touched[field]) setErrors(validateWorkflow(updated as WorkflowForm));
  };
  const blur = (field: string) => {
    setTouched(p => ({ ...p, [field]: true }));
    setErrors(validateWorkflow(form as WorkflowForm));
  };
  const err = (field: string) => touched[field] ? (errors as Record<string, string>)[field] : undefined;

  const handleSave = () => {
    const allTouched = { name: true, trigger: true, approver: true };
    setTouched(allTouched);
    const errs = validateWorkflow(form as WorkflowForm);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    onSave(form as typeof workflow);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-800 font-semibold">Edit Workflow <span className="text-blue-600 font-mono text-sm">{workflow.id}</span></h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">Workflow Name *</label>
            <input value={form.name} onChange={e => change('name', e.target.value)} onBlur={() => blur('name')}
              className={fieldBorder(!!err('name'))} />
            <Err msg={err('name')} />
          </div>
          <div>
            <label className="block text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">Trigger Condition *</label>
            <select value={form.trigger} onChange={e => change('trigger', e.target.value)} onBlur={() => blur('trigger')}
              className={`w-full border rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none ${err('trigger') ? 'border-rose-400' : 'border-gray-200 focus:border-blue-400'}`}>
              {TRIGGER_OPTIONS.map(o => <option key={o}>{o}</option>)}
            </select>
            <Err msg={err('trigger')} />
          </div>
          <div>
            <label className="block text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">Primary Approver *</label>
            <select value={form.approver} onChange={e => change('approver', e.target.value)} onBlur={() => blur('approver')}
              className={`w-full border rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none ${err('approver') ? 'border-rose-400' : 'border-gray-200 focus:border-blue-400'}`}>
              {APPROVER_OPTIONS.map(o => <option key={o}>{o}</option>)}
            </select>
            <Err msg={err('approver')} />
          </div>
          <div>
            <label className="block text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">Fallback Approver</label>
            <select value={form.fallback === '—' ? '' : form.fallback} onChange={e => change('fallback', e.target.value || '—')}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-blue-400">
              <option value="">— None —</option>
              {APPROVER_OPTIONS.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">Status</label>
            <select value={form.status} onChange={e => change('status', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-blue-400">
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700">Save Changes</button>
        </div>
      </div>
    </div>
  );
}

// ─── Edit Role Modal ──────────────────────────────────────────────────────────

type RoleType = typeof initialRoles[0];

function EditRoleModal({ role, onClose, onSave }: {
  role: RoleType; onClose: () => void; onSave: (r: RoleType) => void;
}) {
  const [name, setName] = useState(role.name);
  const [users, setUsers] = useState(role.users);
  const [permissions, setPermissions] = useState<string[]>([...role.permissions]);
  const [nameError, setNameError] = useState('');

  const togglePerm = (p: string) => {
    setPermissions(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  };

  const handleSave = () => {
    if (!name.trim()) { setNameError('Role name is required.'); return; }
    onSave({ ...role, name: name.trim(), users, permissions });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-800 font-semibold">Edit Role</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">Role Name *</label>
            <input value={name} onChange={e => { setName(e.target.value); if (nameError) setNameError(''); }}
              className={fieldBorder(!!nameError)} />
            <Err msg={nameError} />
          </div>

          <div>
            <label className="block text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">Number of Users</label>
            <input type="number" min={0} value={users} onChange={e => setUsers(Number(e.target.value))}
              className={fieldBorder(false)} />
          </div>

          <div>
            <label className="block text-gray-500 text-xs font-medium mb-2 uppercase tracking-wide">Permissions</label>
            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
              {ALL_PERMISSIONS.map(p => {
                const active = permissions.includes(p);
                return (
                  <button key={p} type="button" onClick={() => togglePerm(p)}
                    className={`px-2.5 py-1 rounded text-xs font-medium border transition-colors ${
                      active ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
                    }`}>
                    {p}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700">Save Changes</button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [toast, setToast] = useState('');
  const [notifications, setNotifications] = useState(notifDefaults);

  // Approval Workflows state
  const [workflows, setWorkflows] = useState(initialWorkflows);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [showAddWorkflow, setShowAddWorkflow] = useState(false);
  const [editingWorkflow, setEditingWorkflow] = useState<typeof initialWorkflows[0] | null>(null);

  const toggleRow = (id: string) => {
    setExpandedRows(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleAddWorkflow = (form: WorkflowForm) => {
    const newId = `WF-${String(workflows.length + 1).padStart(3, '0')}`;
    setWorkflows(prev => [...prev, { id: newId, ...form, fallback: form.fallback || '—' }]);
    setShowAddWorkflow(false);
    setToast('Workflow added successfully!');
  };

  const handleEditWorkflow = (updated: typeof initialWorkflows[0]) => {
    setWorkflows(prev => prev.map(w => w.id === updated.id ? updated : w));
    setEditingWorkflow(null);
    setToast(`Workflow ${updated.id} updated!`);
  };

  const handleDeleteWorkflow = (id: string) => {
    setWorkflows(prev => prev.filter(w => w.id !== id));
    setToast(`Workflow ${id} deleted.`);
  };

  // User Roles state
  const [roles, setRoles] = useState(initialRoles);
  const [editingRole, setEditingRole] = useState<RoleType | null>(null);

  const handleEditRole = (updated: RoleType) => {
    setRoles(prev => prev.map(r => r.name === editingRole!.name ? updated : r));
    setEditingRole(null);
    setToast(`Role "${updated.name}" updated!`);
  };

  // Company form state
  const [company, setCompany] = useState<CompanyForm>({
    companyName: 'Cognexia.AI', gst: '27AABCC1234F1ZK', pan: 'AABCC1234F',
    cin: 'U72200MH2018PTC123456', website: 'www.cognexia.com',
    industry: 'Information Technology',
    address: '123 Business Park, Bandra Kurla Complex, Mumbai 400051, Maharashtra',
  });
  const [companyErrors, setCompanyErrors] = useState<CompanyErrors>({});
  const [companyTouched, setCompanyTouched] = useState<Partial<Record<keyof CompanyForm, boolean>>>({});

  const handleCompanyChange = (field: keyof CompanyForm, value: string) => {
    const updated = { ...company, [field]: value };
    setCompany(updated);
    if (companyTouched[field]) setCompanyErrors(validateCompany(updated));
  };
  const handleCompanyBlur = (field: keyof CompanyForm) => {
    setCompanyTouched(prev => ({ ...prev, [field]: true }));
    setCompanyErrors(validateCompany(company));
  };
  const handleCompanySave = () => {
    const allTouched = Object.fromEntries(Object.keys(company).map(k => [k, true])) as Partial<Record<keyof CompanyForm, boolean>>;
    setCompanyTouched(allTouched);
    const errs = validateCompany(company);
    setCompanyErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setToast('Company settings saved!');
  };
  const cErr = (field: keyof CompanyForm) => companyTouched[field] ? companyErrors[field] : undefined;

  // Fiscal Year state
  const [fyStart, setFyStart] = useState('April 1');
  const [fyEnd, setFyEnd] = useState('March 31');
  const [fyPeriod, setFyPeriod] = useState('Monthly');
  const [fyErrors, setFyErrors] = useState<{ start?: string; end?: string }>({});
  const [fyTouched, setFyTouched] = useState({ start: false, end: false });
  const validateFY = (start: string, end: string) => {
    const errs: { start?: string; end?: string } = {};
    if (!start) errs.start = 'Fiscal year start is required.';
    if (!end) errs.end = 'Fiscal year end is required.';
    return errs;
  };
  const handleFYSave = () => {
    setFyTouched({ start: true, end: true });
    const errs = validateFY(fyStart, fyEnd);
    setFyErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setToast('Fiscal year settings saved!');
  };

  return (
    <div className="p-6 space-y-6">
      {toast && <Toast message={toast} onDone={() => setToast('')} />}

      {/* Add Workflow Modal */}
      {showAddWorkflow && (
        <AddWorkflowModal onClose={() => setShowAddWorkflow(false)} onSave={handleAddWorkflow} />
      )}

      {/* Edit Workflow Modal */}
      {editingWorkflow && (
        <EditWorkflowModal
          workflow={editingWorkflow}
          onClose={() => setEditingWorkflow(null)}
          onSave={handleEditWorkflow}
        />
      )}

      {/* Edit Role Modal */}
      {editingRole && (
        <EditRoleModal
          role={editingRole}
          onClose={() => setEditingRole(null)}
          onSave={handleEditRole}
        />
      )}

      <div>
        <h1 className="text-2xl font-bold text-white-800">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage platform configuration and preferences</p>
      </div>

      <div className="border-b border-gray-200">
        <div className="flex">
          {tabs.map((tab, i) => (
            <button key={tab} onClick={() => setActiveTab(i)}
              className={`px-4 py-2.5 text-sm border-b-2 transition-colors ${
                activeTab === i ? 'text-blue-600 font-medium border-blue-600' : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ── Company Tab ── */}
      {activeTab === 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4 max-w-2xl">
          <h2 className="text-gray-800 font-semibold">Company Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">Company Name</label>
              <input value={company.companyName} onChange={e => handleCompanyChange('companyName', e.target.value)}
                onBlur={() => handleCompanyBlur('companyName')} className={fieldBorder(!!cErr('companyName'))} />
              <Err msg={cErr('companyName')} />
            </div>
            <div>
              <label className="block text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">GST Number</label>
              <input value={company.gst} onChange={e => handleCompanyChange('gst', e.target.value)}
                onBlur={() => handleCompanyBlur('gst')} className={fieldBorder(!!cErr('gst'))} />
              <Err msg={cErr('gst')} />
            </div>
            <div>
              <label className="block text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">PAN Number</label>
              <input value={company.pan} onChange={e => handleCompanyChange('pan', e.target.value)}
                onBlur={() => handleCompanyBlur('pan')} className={fieldBorder(!!cErr('pan'))} />
              <Err msg={cErr('pan')} />
            </div>
            <div>
              <label className="block text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">CIN</label>
              <input value={company.cin} onChange={e => handleCompanyChange('cin', e.target.value)}
                onBlur={() => handleCompanyBlur('cin')} className={fieldBorder(!!cErr('cin'))} />
              <Err msg={cErr('cin')} />
            </div>
            <div>
              <label className="block text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">Website</label>
              <input value={company.website} onChange={e => handleCompanyChange('website', e.target.value)}
                onBlur={() => handleCompanyBlur('website')} className={fieldBorder(!!cErr('website'))} />
              <Err msg={cErr('website')} />
            </div>
            <div>
              <label className="block text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">Industry</label>
              <input value={company.industry} onChange={e => handleCompanyChange('industry', e.target.value)}
                onBlur={() => handleCompanyBlur('industry')} className={fieldBorder(!!cErr('industry'))} />
              <Err msg={cErr('industry')} />
            </div>
          </div>
          <div>
            <label className="block text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">Registered Address</label>
            <textarea rows={2} value={company.address} onChange={e => handleCompanyChange('address', e.target.value)}
              onBlur={() => handleCompanyBlur('address')} className={`${fieldBorder(!!cErr('address'))} resize-none`} />
            <Err msg={cErr('address')} />
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
          <button onClick={handleCompanySave} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      )}

      {/* ── Fiscal Year Tab ── */}
      {activeTab === 1 && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4 max-w-2xl">
          <h2 className="text-gray-800 font-semibold">Fiscal Year Configuration</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">Fiscal Year Start</label>
              <select value={fyStart}
                onChange={e => { setFyStart(e.target.value); if (fyTouched.start) setFyErrors(validateFY(e.target.value, fyEnd)); }}
                onBlur={() => { setFyTouched(p => ({ ...p, start: true })); setFyErrors(validateFY(fyStart, fyEnd)); }}
                className={`w-full border rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none ${fyTouched.start && fyErrors.start ? 'border-rose-400' : 'border-gray-200'}`}>
                <option value="">— Select —</option>
                <option>April 1</option><option>January 1</option><option>July 1</option>
              </select>
              <Err msg={fyTouched.start ? fyErrors.start : undefined} />
            </div>
            <div>
              <label className="block text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">Fiscal Year End</label>
              <select value={fyEnd}
                onChange={e => { setFyEnd(e.target.value); if (fyTouched.end) setFyErrors(validateFY(fyStart, e.target.value)); }}
                onBlur={() => { setFyTouched(p => ({ ...p, end: true })); setFyErrors(validateFY(fyStart, fyEnd)); }}
                className={`w-full border rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none ${fyTouched.end && fyErrors.end ? 'border-rose-400' : 'border-gray-200'}`}>
                <option value="">— Select —</option>
                <option>March 31</option><option>December 31</option><option>June 30</option>
              </select>
              <Err msg={fyTouched.end ? fyErrors.end : undefined} />
            </div>
            <div>
              <label className="block text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">Current FY</label>
              <input defaultValue="FY 2025-26" readOnly className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-400 bg-gray-50" />
            </div>
            <div>
              <label className="block text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">Reporting Period</label>
              <select value={fyPeriod} onChange={e => setFyPeriod(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none">
                <option>Monthly</option><option>Quarterly</option><option>Annually</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <span className="text-amber-600 text-sm">⚠️ Changing fiscal year settings will affect all historical reports. Contact support before making changes.</span>
          </div>
          <button onClick={handleFYSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      )}

      {/* ── Approval Workflows Tab ── */}
      {activeTab === 2 && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden max-w-5xl">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <h2 className="text-gray-800 font-semibold text-sm">Approval Workflows</h2>
            <button
              onClick={() => setShowAddWorkflow(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
            >
              <Plus className="w-3.5 h-3.5" /> Add Workflow
            </button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {/* Extra column for expand toggle */}
                <th className="w-8 px-2 py-3"></th>
                {['ID', 'Workflow Name', 'Trigger Condition', 'Primary Approver', 'Fallback', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left text-gray-500 text-xs font-medium px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {workflows.map(w => {
                const isExpanded = expandedRows.has(w.id);
                return (
                  <>
                    <tr key={w.id} className="hover:bg-gray-50">
                      {/* Expand/Collapse toggle */}
                      <td className="px-2 py-3.5">
                        <button
                          onClick={() => toggleRow(w.id)}
                          className="text-gray-400 hover:text-blue-500 transition-colors"
                          title={isExpanded ? 'Collapse' : 'Expand'}
                        >
                          {isExpanded
                            ? <ChevronDown className="w-4 h-4" />
                            : <ChevronRight className="w-4 h-4" />
                          }
                        </button>
                      </td>
                      <td className="px-4 py-3.5 text-blue-600 text-sm font-mono">{w.id}</td>
                      <td className="px-4 py-3.5 text-gray-800 text-sm font-medium">{w.name}</td>
                      <td className="px-4 py-3.5 text-gray-600 text-sm">{w.trigger}</td>
                      <td className="px-4 py-3.5 text-gray-600 text-sm">{w.approver}</td>
                      <td className="px-4 py-3.5 text-gray-400 text-sm">{w.fallback}</td>
                      <td className="px-4 py-3.5">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          w.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-gray-100 text-gray-500'
                        }`}>{w.status}</span>
                      </td>
                      <td className="px-4 py-3.5 flex gap-2">
                        <button
                          onClick={() => setEditingWorkflow(w)}
                          className="px-3 py-1 bg-white border border-gray-200 text-gray-600 rounded text-xs hover:bg-gray-50"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteWorkflow(w.id)}
                          className="p-1 text-gray-400 hover:text-rose-500 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>

                    {/* Expanded detail row */}
                    {isExpanded && (
                      <tr key={`${w.id}-detail`} className="bg-blue-50/40">
                        <td colSpan={8} className="px-8 py-4">
                          <div className="grid grid-cols-3 gap-6 text-sm">
                            <div>
                              <p className="text-gray-400 text-xs uppercase font-medium mb-1">Workflow ID</p>
                              <p className="text-blue-600 font-mono font-semibold">{w.id}</p>
                            </div>
                            <div>
                              <p className="text-gray-400 text-xs uppercase font-medium mb-1">Workflow Name</p>
                              <p className="text-gray-800 font-medium">{w.name}</p>
                            </div>
                            <div>
                              <p className="text-gray-400 text-xs uppercase font-medium mb-1">Status</p>
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                w.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-gray-100 text-gray-500'
                              }`}>{w.status}</span>
                            </div>
                            <div>
                              <p className="text-gray-400 text-xs uppercase font-medium mb-1">Trigger Condition</p>
                              <p className="text-gray-700">{w.trigger}</p>
                            </div>
                            <div>
                              <p className="text-gray-400 text-xs uppercase font-medium mb-1">Primary Approver</p>
                              <p className="text-gray-700">{w.approver}</p>
                            </div>
                            <div>
                              <p className="text-gray-400 text-xs uppercase font-medium mb-1">Fallback Approver</p>
                              <p className="text-gray-500">{w.fallback}</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ── User Roles Tab ── */}
      {activeTab === 3 && (
        <div className="space-y-4 max-w-5xl">
          <div className="flex justify-end">
            <button
              onClick={() => setToast('Add Role — contact Super Admin')}
              className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700"
            >
              <Plus className="w-3.5 h-3.5" /> Add Role
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roles.map(role => (
              <div key={role.name} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${role.color}`}>{role.name}</span>
                    <span className="text-gray-400 text-xs">{role.users} user{role.users !== 1 ? 's' : ''}</span>
                  </div>
                  <button
                    onClick={() => setEditingRole(role)}
                    className="text-blue-600 text-xs hover:text-blue-700"
                  >
                    Edit
                  </button>
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

      {/* ── Notifications Tab ── */}
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
          <button onClick={() => setToast('Notification preferences saved!')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
            Save Preferences
          </button>
        </div>
      )}
    </div>
  );
}