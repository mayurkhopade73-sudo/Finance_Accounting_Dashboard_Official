'use client';
import { useState } from 'react';
import { CheckCircle2, AlertCircle, Shield, FileCheck, X, Plus } from 'lucide-react';

// Inline Toast
function Toast({ message, onDone }) {
  setTimeout(onDone, 2500);
  return (
    <div className="fixed top-4 right-4 z-50 bg-gray-900 border border-emerald-500/40 text-emerald-400 px-4 py-3 rounded-lg shadow-lg text-sm font-medium animate-pulse">
      {message}
    </div>
  );
}

// ─── Reusable components — white card layout matching Add Tax Filing form ───
function Field({ label, error, required = false, children }) {
  return (
    <div>
      <label className="block text-gray-600 text-xs font-medium mb-1">
        {label}{required && <span className="text-rose-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-rose-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function Input({ value, onChange, placeholder, type = 'text', error }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full bg-white border ${error ? 'border-rose-400' : 'border-gray-300'} rounded-lg px-3 py-2 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-colors`}
    />
  );
}

function Select({ value, onChange, options, error }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`w-full bg-white border ${error ? 'border-rose-400' : 'border-gray-300'} rounded-lg px-3 py-2 text-gray-800 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-colors`}
    >
      <option value="">Select...</option>
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
  );
}

function ModalShell({ title, subtitle, onClose, onSubmit, submitLabel, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-gray-100">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-gray-900 font-semibold text-base">{title}</h2>
            <p className="text-gray-400 text-xs mt-0.5">{subtitle}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="px-6 py-5 space-y-4">{children}</div>
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
          <button onClick={onClose} className="px-4 py-2 text-gray-500 hover:text-gray-700 text-sm rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">Cancel</button>
          <button onClick={onSubmit} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
            <Plus className="w-4 h-4" /> {submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Add Audit Modal ───
function AddAuditModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ user: '', action: '', resource: '', ip: '' });
  const [errors, setErrors] = useState({});

  const set = (k, v) => { setForm(p => ({ ...p, [k]: v })); setErrors(p => ({ ...p, [k]: '' })); };

  // Auto risk from action text
  const getAutoRisk = (action) => {
    const a = action.toLowerCase();
    if (a.includes('role') || a.includes('budget') || a.includes('delete') || a.includes('admin')) return 'High';
    if (a.includes('payment') || a.includes('vendor') || a.includes('approved') || a.includes('updated')) return 'Medium';
    return 'Low';
  };

  const riskPreview = form.action ? getAutoRisk(form.action) : null;
  const riskPreviewColor = riskPreview === 'High' ? 'text-rose-500' : riskPreview === 'Medium' ? 'text-amber-500' : 'text-emerald-600';

  const handleSubmit = () => {
    const e = {};
    if (!form.user.trim()) e.user = 'User is required';
    if (!form.action.trim()) e.action = 'Action is required';
    if (!form.resource.trim()) e.resource = 'Resource is required';
    if (!form.ip.trim()) e.ip = 'IP Address is required';
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    const now = new Date();
    const time = `${now.toLocaleString('en-US', { month: 'short', day: 'numeric' })}, ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    onAdd({ time, user: form.user, action: form.action, resource: form.resource, ip: form.ip, risk: getAutoRisk(form.action) });
    onClose();
  };

  return (
    <ModalShell title="Add Audit Log" subtitle="Manually add a new audit trail entry" onClose={onClose} onSubmit={handleSubmit} submitLabel="Add Log">
      <Field label="User" error={errors.user} required>
        <Input value={form.user} onChange={e => set('user', e.target.value)} placeholder="e.g. Finance Manager" error={errors.user} />
      </Field>
      <Field label="Action" error={errors.action} required>
        <Input value={form.action} onChange={e => set('action', e.target.value)} placeholder="e.g. Invoice created" error={errors.action} />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Resource" error={errors.resource} required>
          <Input value={form.resource} onChange={e => set('resource', e.target.value)} placeholder="e.g. INV-2047" error={errors.resource} />
        </Field>
        <Field label="IP Address" error={errors.ip} required>
          <Input value={form.ip} onChange={e => set('ip', e.target.value)} placeholder="e.g. 192.168.1.10" error={errors.ip} />
        </Field>
      </div>
      <div>
        <label className="block text-gray-600 text-xs font-medium mb-1">Risk Level <span className="text-gray-400">(auto)</span></label>
        <div className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm select-none">
          {riskPreview
            ? <span className={`font-semibold ${riskPreviewColor}`}>{riskPreview}</span>
            : <span className="text-gray-400">Set after entering Action</span>}
        </div>
      </div>
    </ModalShell>
  );
}

// ─── Add Control Modal ───
function AddControlModal({ onClose, onAdd, nextId }) {
  const [form, setForm] = useState({ control: '', category: '', owner: '', tested: '' });
  const [errors, setErrors] = useState({});

  const set = (k, v) => { setForm(p => ({ ...p, [k]: v })); setErrors(p => ({ ...p, [k]: '' })); };

  // Auto status from last tested date — older than 3 months = Needs Review
  const getAutoStatus = (testedStr) => {
    if (!testedStr.trim()) return null;
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const parts = testedStr.trim().split(' ');
    if (parts.length !== 2) return 'Effective';
    const mIdx = months.findIndex(m => parts[0].startsWith(m));
    const yr = parseInt(parts[1]);
    if (mIdx === -1 || isNaN(yr)) return 'Effective';
    const tested = new Date(yr, mIdx, 1);
    const now = new Date();
    const diffMonths = (now.getFullYear() - tested.getFullYear()) * 12 + (now.getMonth() - tested.getMonth());
    return diffMonths > 3 ? 'Needs Review' : 'Effective';
  };

  const statusPreview = getAutoStatus(form.tested);
  const statusPreviewColor = statusPreview === 'Needs Review' ? 'text-amber-500' : 'text-emerald-600';

  const handleSubmit = () => {
    const e = {};
    if (!form.control.trim()) e.control = 'Control description is required';
    if (!form.category) e.category = 'Category is required';
    if (!form.owner.trim()) e.owner = 'Owner is required';
    if (!form.tested.trim()) e.tested = 'Last tested date is required';
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    onAdd({ id: nextId, control: form.control, category: form.category, owner: form.owner, status: getAutoStatus(form.tested) || 'Effective', tested: form.tested });
    onClose();
  };

  return (
    <ModalShell title="Add Internal Control" subtitle="Register a new internal control" onClose={onClose} onSubmit={handleSubmit} submitLabel="Add Control">
      <Field label="Control Description" error={errors.control} required>
        <Input value={form.control} onChange={e => set('control', e.target.value)} placeholder="e.g. Monthly reconciliation review" error={errors.control} />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Category" error={errors.category} required>
          <Select value={form.category} onChange={e => set('category', e.target.value)} options={['Financial', 'Operational', 'Compliance', 'IT']} error={errors.category} />
        </Field>
        <Field label="Owner" error={errors.owner} required>
          <Input value={form.owner} onChange={e => set('owner', e.target.value)} placeholder="e.g. Finance Manager" error={errors.owner} />
        </Field>
      </div>
      <Field label="Last Tested" error={errors.tested} required>
        <Input value={form.tested} onChange={e => set('tested', e.target.value)} placeholder="e.g. Mar 2026" error={errors.tested} />
      </Field>
      <div>
        <label className="block text-gray-600 text-xs font-medium mb-1">Status <span className="text-gray-400">(auto)</span></label>
        <div className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm select-none">
          {statusPreview
            ? <span className={`font-semibold ${statusPreviewColor}`}>{statusPreview}</span>
            : <span className="text-gray-400">Set after entering Last Tested date</span>}
        </div>
      </div>
    </ModalShell>
  );
}

// ─── Schedule Audit Modal ───
function ScheduleAuditModal({ onClose, onAdd, nextId }) {
  const [form, setForm] = useState({ type: '', scope: '', auditor: '', period: '' });
  const [errors, setErrors] = useState({});

  const set = (k, v) => { setForm(p => ({ ...p, [k]: v })); setErrors(p => ({ ...p, [k]: '' })); };

  const handleSubmit = () => {
    const e = {};
    if (!form.type) e.type = 'Audit type is required';
    if (!form.scope.trim()) e.scope = 'Scope is required';
    if (!form.auditor.trim()) e.auditor = 'Auditor is required';
    if (!form.period.trim()) e.period = 'Period is required';
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    onAdd({ auditId: nextId, type: form.type, scope: form.scope, auditor: form.auditor, period: form.period, status: 'In Progress', findings: 0 });
    onClose();
  };

  return (
    <ModalShell title="Schedule Audit" subtitle="Create a new financial audit entry" onClose={onClose} onSubmit={handleSubmit} submitLabel="Schedule Audit">
      <Field label="Audit Type" error={errors.type} required>
        <Select value={form.type} onChange={e => set('type', e.target.value)} options={['Internal Audit', 'Statutory Audit', 'Tax Audit', 'Compliance Audit']} error={errors.type} />
      </Field>
      <Field label="Scope" error={errors.scope} required>
        <Input value={form.scope} onChange={e => set('scope', e.target.value)} placeholder="e.g. Accounts Payable Process" error={errors.scope} />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Auditor" error={errors.auditor} required>
          <Input value={form.auditor} onChange={e => set('auditor', e.target.value)} placeholder="e.g. Deloitte India" error={errors.auditor} />
        </Field>
        <Field label="Period" error={errors.period} required>
          <Input value={form.period} onChange={e => set('period', e.target.value)} placeholder="e.g. Q1 2026" error={errors.period} />
        </Field>
      </div>
    </ModalShell>
  );
}

// ─── Static data ───
const initAuditLogs = [
  { time: 'Mar 12, 09:15', user: 'Super Admin', action: 'Invoice created', resource: 'INV-2046', ip: '192.168.1.10', risk: 'Low' },
  { time: 'Mar 12, 08:42', user: 'Finance Manager', action: 'Payment approved', resource: 'BILL-0091', ip: '192.168.1.22', risk: 'Medium' },
  { time: 'Mar 11, 17:30', user: 'Super Admin', action: 'Report exported', resource: 'P&L Q1 2026', ip: '192.168.1.10', risk: 'Low' },
  { time: 'Mar 11, 14:10', user: 'Accounts Team', action: 'Vendor updated', resource: 'SupplierCo Ltd', ip: '192.168.1.35', risk: 'Medium' },
  { time: 'Mar 11, 11:05', user: 'Super Admin', action: 'Budget modified', resource: 'Technology Dept', ip: '192.168.1.10', risk: 'High' },
  { time: 'Mar 10, 16:20', user: 'Finance Manager', action: 'User role changed', resource: 'Accounts Team', ip: '192.168.1.22', risk: 'High' },
];

const compliance = [
  { label: 'GST Compliance', status: 'Compliant', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', detail: 'All returns filed on time' },
  { label: 'Income Tax Filing', status: 'Compliant', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', detail: 'FY 2024-25 assessed' },
  { label: 'Payroll Compliance', status: 'Compliant', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', detail: 'PF, ESI up to date' },
  { label: 'Data Privacy (DPDP)', status: 'In Progress', icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50', detail: 'Policy update underway' },
  { label: 'ISO 27001', status: 'Certified', icon: Shield, color: 'text-blue-600', bg: 'bg-blue-50', detail: 'Valid until Dec 2026' },
  { label: 'SOC 2 Type II', status: 'Certified', icon: FileCheck, color: 'text-purple-600', bg: 'bg-purple-50', detail: 'Last audit Feb 2026' },
];

const initControls = [
  { id: 'IC-001', control: 'Dual approval for payments > $5,000', category: 'Financial', owner: 'Finance Manager', status: 'Effective', tested: 'Mar 2026' },
  { id: 'IC-002', control: 'Monthly bank reconciliation', category: 'Financial', owner: 'Accounts Team', status: 'Effective', tested: 'Mar 2026' },
  { id: 'IC-003', control: 'Segregation of duties - AP/AR', category: 'Operational', owner: 'Super Admin', status: 'Effective', tested: 'Feb 2026' },
  { id: 'IC-004', control: 'Quarterly budget variance review', category: 'Financial', owner: 'Finance Manager', status: 'Needs Review', tested: 'Dec 2025' },
  { id: 'IC-005', control: 'Vendor onboarding KYC process', category: 'Compliance', owner: 'Procurement', status: 'Effective', tested: 'Mar 2026' },
  { id: 'IC-006', control: 'IT access control - role based', category: 'IT', owner: 'IT Admin', status: 'Effective', tested: 'Feb 2026' },
];

const initAudits = [
  { auditId: 'AUD-2026-01', type: 'Internal Audit', scope: 'Accounts Payable Process', auditor: 'Internal Audit Team', period: 'Q4 2025', status: 'Completed', findings: 2 },
  { auditId: 'AUD-2026-02', type: 'Statutory Audit', scope: 'Annual Financial Statements', auditor: 'Deloitte India', period: 'FY 2025-26', status: 'In Progress', findings: 0 },
  { auditId: 'AUD-2025-04', type: 'Tax Audit', scope: 'Income Tax Assessment', auditor: 'EY India', period: 'FY 2024-25', status: 'Completed', findings: 1 },
  { auditId: 'AUD-2025-03', type: 'Internal Audit', scope: 'Payroll & HR Compliance', auditor: 'Internal Audit Team', period: 'Q3 2025', status: 'Completed', findings: 0 },
];

const riskStyle = {
  Low: 'bg-emerald-500/20 text-emerald-400',
  Medium: 'bg-amber-500/20 text-amber-400',
  High: 'bg-rose-500/20 text-rose-400',
};

const tabs = ['Audit Logs', 'Compliance Dashboard', 'Internal Controls', 'Financial Auditing'];

export default function ComplianceAuditPage() {
  const [toast, setToast] = useState('');
  const [activeTab, setActiveTab] = useState(0);

  const [auditLogs, setAuditLogs] = useState(initAuditLogs);
  const [controls, setControls] = useState(initControls);
  const [financialAudits, setFinancialAudits] = useState(initAudits);

  const [showAddAudit, setShowAddAudit] = useState(false);
  const [showAddControl, setShowAddControl] = useState(false);
  const [showScheduleAudit, setShowScheduleAudit] = useState(false);

  const nextControlId = `IC-${String(controls.length + 1).padStart(3, '0')}`;
  const nextAuditId = `AUD-2026-${String(financialAudits.length + 1).padStart(2, '0')}`;

  return (
    <div className="p-6 space-y-6">
      {toast && <Toast message={toast} onDone={() => setToast('')} />}

      {showAddAudit && (
        <AddAuditModal
          onClose={() => setShowAddAudit(false)}
          onAdd={(log) => { setAuditLogs(prev => [log, ...prev]); setToast('Audit log added!'); }}
        />
      )}
      {showAddControl && (
        <AddControlModal
          onClose={() => setShowAddControl(false)}
          nextId={nextControlId}
          onAdd={(c) => { setControls(prev => [...prev, c]); setToast('Control added to register!'); }}
        />
      )}
      {showScheduleAudit && (
        <ScheduleAuditModal
          onClose={() => setShowScheduleAudit(false)}
          nextId={nextAuditId}
          onAdd={(a) => { setFinancialAudits(prev => [...prev, a]); setToast('Audit scheduled!'); }}
        />
      )}

      <div>
        <h1 className="text-2xl font-bold text-gray-800">Compliance & Audit</h1>
        <p className="text-gray-500 text-sm mt-1">Audit trails, compliance monitoring, internal controls & auditing</p>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Compliance Score', value: '96%', color: 'text-emerald-400' },
          { label: 'Open Audit Items', value: '3', color: 'text-amber-400' },
          { label: 'Controls Active', value: '24', color: 'text-blue-400' },
          { label: 'Last Audit', value: 'Feb 2026', color: 'text-white' },
        ].map(s => (
          <div key={s.label} className="bg-gray-900 rounded-xl p-5">
            <div className="text-gray-400 text-sm mb-2">{s.label}</div>
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="border-b border-gray-200">
        <div className="flex">
          {tabs.map((tab, i) => (
            <button key={tab} onClick={() => setActiveTab(i)} className={`px-4 py-2.5 text-sm border-b-2 transition-colors ${activeTab === i ? 'text-blue-600 font-medium border-blue-600' : 'text-gray-500 border-transparent hover:text-gray-700'}`}>{tab}</button>
          ))}
        </div>
      </div>

      {/* ── Audit Logs ── */}
      {activeTab === 0 && (
        <div className="bg-gray-900 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
            <h2 className="text-white font-semibold text-sm">System Audit Trail</h2>
            <div className="flex gap-2">
              <button onClick={() => setShowAddAudit(true)} className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">+ Add Audit</button>
              
            </div>
          </div>
          <table className="w-full">
            <thead><tr className="bg-gray-800 border-b border-gray-700">{['Timestamp', 'User', 'Action', 'Resource', 'IP Address', 'Risk Level'].map(h => <th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-800">
              {auditLogs.map((log, i) => (
                <tr key={i} className="hover:bg-gray-800/60">
                  <td className="px-4 py-3.5 text-gray-400 text-sm">{log.time}</td>
                  <td className="px-4 py-3.5 text-white text-sm font-medium">{log.user}</td>
                  <td className="px-4 py-3.5 text-gray-300 text-sm">{log.action}</td>
                  <td className="px-4 py-3.5 text-blue-400 text-sm">{log.resource}</td>
                  <td className="px-4 py-3.5 text-gray-500 text-sm font-mono">{log.ip}</td>
                  <td className="px-4 py-3.5"><span className={`px-2 py-0.5 rounded text-xs font-medium ${riskStyle[log.risk]}`}>{log.risk}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Compliance Dashboard ── */}
      {activeTab === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {compliance.map(c => (
            <div key={c.label} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${c.bg} flex-shrink-0`}><c.icon className={`w-5 h-5 ${c.color}`} /></div>
                <div className="flex-1">
                  <div className="text-gray-800 font-semibold text-sm">{c.label}</div>
                  <div className={`text-sm font-medium mt-0.5 ${c.color}`}>{c.status}</div>
                  <div className="text-gray-400 text-xs mt-1">{c.detail}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Internal Controls ── */}
      {activeTab === 2 && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-gray-800 font-semibold text-sm">Internal Controls Register</h2>
            <button onClick={() => setShowAddControl(true)} className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">+ Add Control</button>
          </div>
          <table className="w-full">
            <thead><tr className="bg-gray-50 border-b border-gray-100">{['Control ID', 'Control Description', 'Category', 'Owner', 'Status', 'Last Tested'].map(h => <th key={h} className="text-left text-gray-500 text-xs font-medium px-4 py-3">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-100">
              {controls.map(c => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3.5 text-blue-600 text-sm font-mono">{c.id}</td>
                  <td className="px-4 py-3.5 text-gray-800 text-sm">{c.control}</td>
                  <td className="px-4 py-3.5"><span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">{c.category}</span></td>
                  <td className="px-4 py-3.5 text-gray-600 text-sm">{c.owner}</td>
                  <td className="px-4 py-3.5">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${c.status === 'Effective' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>{c.status}</span>
                  </td>
                  <td className="px-4 py-3.5 text-gray-500 text-sm">{c.tested}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Financial Auditing ── */}
      {activeTab === 3 && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-gray-800 font-semibold text-sm">Financial Audit Register</h2>
            <button onClick={() => setShowScheduleAudit(true)} className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">Schedule Audit</button>
          </div>
          <table className="w-full">
            <thead><tr className="bg-gray-50 border-b border-gray-100">{['Audit ID', 'Type', 'Scope', 'Auditor', 'Period', 'Status', 'Findings'].map(h => <th key={h} className="text-left text-gray-500 text-xs font-medium px-4 py-3">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-100">
              {financialAudits.map(a => (
                <tr key={a.auditId} className="hover:bg-gray-50">
                  <td className="px-4 py-3.5 text-blue-600 text-sm font-mono">{a.auditId}</td>
                  <td className="px-4 py-3.5"><span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">{a.type}</span></td>
                  <td className="px-4 py-3.5 text-gray-800 text-sm">{a.scope}</td>
                  <td className="px-4 py-3.5 text-gray-600 text-sm">{a.auditor}</td>
                  <td className="px-4 py-3.5 text-gray-500 text-sm">{a.period}</td>
                  <td className="px-4 py-3.5">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${a.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-blue-50 text-blue-700 border border-blue-200'}`}>{a.status}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${a.findings > 0 ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'}`}>{a.findings} {a.findings === 1 ? 'finding' : 'findings'}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}