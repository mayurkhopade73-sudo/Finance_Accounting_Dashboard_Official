'use client';
import { useState } from 'react';
import { Plus, X } from 'lucide-react';

function Toast({ message, onDone }: { message: string; onDone: () => void }) {
  setTimeout(onDone, 2500);
  return (
    <div className="fixed top-4 right-4 z-50 bg-gray-900 border border-emerald-500/40 text-emerald-400 px-4 py-3 rounded-lg shadow-lg text-sm font-medium animate-pulse">
      {message}
    </div>
  );
}

type CostCenter = { id: string; name: string; head: string; budget: string; actual: string; variance: string };
type Job = { id: string; name: string; client: string; budget: string; actual: string; completion: string; status: string };

function AddCostCenterModal({ onClose, onAdd }: { onClose: () => void; onAdd: (c: CostCenter) => void }) {
  const [form, setForm] = useState({ id: '', name: '', head: '', budget: '', actual: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.id.trim()) e.id = 'Cost Center ID is required';
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.head.trim()) e.head = 'Department Head is required';
    if (!form.budget.trim()) e.budget = 'Budget is required';
    else if (isNaN(Number(form.budget.replace(/[,$]/g, '')))) e.budget = 'Enter a valid number';
    if (!form.actual.trim()) e.actual = 'Actual Spend is required';
    else if (isNaN(Number(form.actual.replace(/[,$]/g, '')))) e.actual = 'Enter a valid number';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    const budget = Number(form.budget.replace(/[,$]/g, ''));
    const actual = Number(form.actual.replace(/[,$]/g, ''));
    const diff = budget - actual;
    onAdd({
      id: form.id.toUpperCase(),
      name: form.name,
      head: form.head,
      budget: `$${budget.toLocaleString()}`,
      actual: `$${actual.toLocaleString()}`,
      variance: diff >= 0 ? `+$${diff.toLocaleString()}` : `-$${Math.abs(diff).toLocaleString()}`,
    });
    onClose();
  };

  const field = (key: keyof typeof form, label: string, placeholder: string, required = false) => (
    <div key={key}>
      <label className="block text-gray-600 text-xs font-medium mb-1">
        {label}{required && <span className="text-rose-500 ml-0.5">*</span>}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={form[key]}
        onChange={e => { setForm(p => ({ ...p, [key]: e.target.value })); setErrors(p => ({ ...p, [key]: '' })); }}
        className={`w-full bg-white border ${errors[key] ? 'border-rose-400' : 'border-gray-300'} rounded-lg px-3 py-2 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-colors`}
      />
      {errors[key] && <p className="text-rose-500 text-xs mt-1">{errors[key]}</p>}
    </div>
  );

  const bv = Number(form.budget.replace(/[,$]/g, ''));
  const av = Number(form.actual.replace(/[,$]/g, ''));
  const hasVals = form.budget && form.actual && !isNaN(bv) && !isNaN(av);
  const diff = bv - av;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-gray-100">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-gray-900 font-semibold text-base">Add Cost Center</h2>
            <p className="text-gray-400 text-xs mt-0.5">Fill in the details to register a new cost center</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {field('id', 'Cost Center ID', 'e.g. CC-006')}
            {field('name', 'Department Name', 'e.g. Finance', true)}
          </div>
          {field('head', 'Department Head', 'e.g. Rahul Sharma', true)}
          <div className="grid grid-cols-2 gap-4">
            {field('budget', 'Budget (₹/$)', 'e.g. 45,000', true)}
            {field('actual', 'Actual Spend (₹/$)', 'e.g. 38,000', true)}
          </div>
          <div>
            <label className="block text-gray-600 text-xs font-medium mb-1">Variance <span className="text-gray-400">(auto)</span></label>
            <div className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm select-none">
              {hasVals
                ? diff >= 0
                  ? <span className="text-emerald-600 font-semibold">+${diff.toLocaleString()}</span>
                  : <span className="text-rose-500 font-semibold">-${Math.abs(diff).toLocaleString()}</span>
                : <span className="text-gray-400">Will be calculated automatically</span>}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
          <button onClick={onClose} className="px-4 py-2 text-gray-500 hover:text-gray-700 text-sm rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button onClick={handleSubmit} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
            <Plus className="w-4 h-4" /> Add Cost Center
          </button>
        </div>
      </div>
    </div>
  );
}

function AddJobModal({ onClose, onAdd }: { onClose: () => void; onAdd: (j: Job) => void }) {
  const [form, setForm] = useState({ id: '', name: '', client: '', budget: '', actual: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.id.trim()) e.id = 'Job ID is required';
    if (!form.name.trim()) e.name = 'Job Name is required';
    if (!form.client.trim()) e.client = 'Client is required';
    if (!form.budget.trim()) e.budget = 'Budget is required';
    else if (isNaN(Number(form.budget.replace(/[,$]/g, '')))) e.budget = 'Enter a valid number';
    if (!form.actual.trim()) e.actual = 'Actual Cost is required';
    else if (isNaN(Number(form.actual.replace(/[,$]/g, '')))) e.actual = 'Enter a valid number';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    const budget = Number(form.budget.replace(/[,$]/g, ''));
    const actual = Number(form.actual.replace(/[,$]/g, ''));
    const pct = Math.min(Math.round((actual / budget) * 100), 100);
    const autoStatus = actual > budget ? 'Over Budget' : actual === budget ? 'Completed' : 'In Progress';
    onAdd({
      id: form.id.toUpperCase(),
      name: form.name,
      client: form.client,
      budget: `$${budget.toLocaleString()}`,
      actual: `$${actual.toLocaleString()}`,
      completion: `${pct}%`,
      status: autoStatus,
    });
    onClose();
  };

  const field = (key: keyof typeof form, label: string, placeholder: string, required = false) => (
    <div key={key}>
      <label className="block text-gray-600 text-xs font-medium mb-1">
        {label}{required && <span className="text-rose-500 ml-0.5">*</span>}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={form[key]}
        onChange={ev => { setForm(p => ({ ...p, [key]: ev.target.value })); setErrors(p => ({ ...p, [key]: '' })); }}
        className={`w-full bg-white border ${errors[key] ? 'border-rose-400' : 'border-gray-300'} rounded-lg px-3 py-2 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-colors`}
      />
      {errors[key] && <p className="text-rose-500 text-xs mt-1">{errors[key]}</p>}
    </div>
  );

  const b = Number(form.budget.replace(/[,$]/g, ''));
  const a = Number(form.actual.replace(/[,$]/g, ''));
  const hasVals = form.budget && form.actual && !isNaN(b) && !isNaN(a) && b > 0;
  const pctPreview = hasVals ? Math.min(Math.round((a / b) * 100), 100) : null;
  const statusPreview = hasVals ? (a > b ? 'Over Budget' : a === b ? 'Completed' : 'In Progress') : null;
  const statusColor = statusPreview === 'Over Budget' ? 'text-rose-500' : statusPreview === 'Completed' ? 'text-emerald-600' : 'text-blue-600';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-gray-100">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-gray-900 font-semibold text-base">New Job</h2>
            <p className="text-gray-400 text-xs mt-0.5">Fill in the details to create a new job</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {field('id', 'Job ID', 'e.g. JOB-005')}
            {field('name', 'Job Name', 'e.g. CRM Setup - Acme', true)}
          </div>
          {field('client', 'Client', 'e.g. Acme Corp', true)}
          <div className="bg-blue-50 rounded-lg px-4 py-2">
            <p className="text-blue-600 text-xs font-semibold tracking-wide uppercase">Cost Details</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {field('budget', 'Budget (₹/$)', 'e.g. 50,000', true)}
            {field('actual', 'Actual Cost (₹/$)', 'e.g. 32,000', true)}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 text-xs font-medium mb-1">Completion <span className="text-gray-400">(auto)</span></label>
              <div className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm select-none">
                {pctPreview !== null ? <span className="text-blue-600 font-semibold">{pctPreview}%</span> : <span className="text-gray-400">Auto</span>}
              </div>
            </div>
            <div>
              <label className="block text-gray-600 text-xs font-medium mb-1">Status <span className="text-gray-400">(auto)</span></label>
              <div className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm select-none">
                {statusPreview ? <span className={`font-semibold ${statusColor}`}>{statusPreview}</span> : <span className="text-gray-400">Auto</span>}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
          <button onClick={onClose} className="px-4 py-2 text-gray-500 hover:text-gray-700 text-sm rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button onClick={handleSubmit} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
            <Plus className="w-4 h-4" /> Add Job
          </button>
        </div>
      </div>
    </div>
  );
}

const tabs = ['Cost Centers', 'Job Costing', 'ABC Costing', 'Cost Allocation', 'Profitability'];

const initialCostCenters: CostCenter[] = [
  { id: 'CC-001', name: 'Engineering', head: 'Raj Kumar', budget: '$80,000', actual: '$72,400', variance: '+$7,600' },
  { id: 'CC-002', name: 'Marketing', head: 'Priya Shah', budget: '$30,000', actual: '$28,200', variance: '+$1,800' },
  { id: 'CC-003', name: 'Operations', head: 'Anil Mehta', budget: '$50,000', actual: '$51,200', variance: '-$1,200' },
  { id: 'CC-004', name: 'HR & Admin', head: 'Sunita Rao', budget: '$25,000', actual: '$23,100', variance: '+$1,900' },
  { id: 'CC-005', name: 'Sales', head: 'Deepak Gupta', budget: '$40,000', actual: '$38,500', variance: '+$1,500' },
];

const initialJobs: Job[] = [
  { id: 'JOB-001', name: 'ERP Implementation - Pinnacle', client: 'Pinnacle Corp', budget: '$1,20,000', actual: '$98,400', completion: '82%', status: 'In Progress' },
  { id: 'JOB-002', name: 'Finance Module - Horizon', client: 'Horizon Finance', budget: '$40,000', actual: '$40,000', completion: '100%', status: 'Completed' },
  { id: 'JOB-003', name: 'Analytics Setup - BlueSky', client: 'BlueSky Analytics', budget: '$15,000', actual: '$8,200', completion: '55%', status: 'In Progress' },
  { id: 'JOB-004', name: 'Cloud Migration - Infinity', client: 'Infinity Tech', budget: '$25,000', actual: '$26,100', completion: '100%', status: 'Over Budget' },
];

const abcActivities = [
  { activity: 'Customer Support', driver: 'No. of support tickets', driverQty: 142, costPerDriver: '$28.17', totalCost: '$4,000' },
  { activity: 'Order Processing', driver: 'No. of orders', driverQty: 89, costPerDriver: '$56.18', totalCost: '$5,000' },
  { activity: 'Product Development', driver: 'Engineering hours', driverQty: 320, costPerDriver: '$93.75', totalCost: '$30,000' },
  { activity: 'Marketing Campaigns', driver: 'Campaign count', driverQty: 8, costPerDriver: '$3,750', totalCost: '$30,000' },
  { activity: 'Finance & Admin', driver: 'Headcount', driverQty: 42, costPerDriver: '$595.24', totalCost: '$25,000' },
];

const allocations = [
  { from: 'IT Infrastructure', to: 'Engineering', method: 'Headcount', amount: '$12,400', basis: '40%' },
  { from: 'IT Infrastructure', to: 'Operations', method: 'Headcount', amount: '$9,300', basis: '30%' },
  { from: 'IT Infrastructure', to: 'Sales', method: 'Headcount', amount: '$6,200', basis: '20%' },
  { from: 'IT Infrastructure', to: 'HR & Admin', method: 'Headcount', amount: '$3,100', basis: '10%' },
  { from: 'Office Rent', to: 'Engineering', method: 'Floor Area', amount: '$8,000', basis: '50%' },
  { from: 'Office Rent', to: 'Operations', method: 'Floor Area', amount: '$4,800', basis: '30%' },
];

const profitability = [
  { segment: 'ERP Products', revenue: '$1,25,000', cogs: '$45,000', grossProfit: '$80,000', margin: '64%' },
  { segment: 'Implementation Services', revenue: '$80,000', cogs: '$52,000', grossProfit: '$28,000', margin: '35%' },
  { segment: 'Annual Support Contracts', revenue: '$24,000', cogs: '$8,000', grossProfit: '$16,000', margin: '67%' },
  { segment: 'Training Programs', revenue: '$16,800', cogs: '$9,200', grossProfit: '$7,600', margin: '45%' },
];

export default function CostAccountingPage() {
  const [toast, setToast] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);
  const [costCenters, setCostCenters] = useState<CostCenter[]>(initialCostCenters);
  const [jobList, setJobList] = useState<Job[]>(initialJobs);

  const handleAddCostCenter = (newCenter: CostCenter) => {
    setCostCenters(prev => [...prev, newCenter]);
    setToast('Cost center added successfully!');
  };

  const handleAddJob = (newJob: Job) => {
    setJobList(prev => [...prev, newJob]);
    setToast('New job added successfully!');
  };

  return (
    <div className="p-6 space-y-6">
      {toast && <Toast message={toast} onDone={() => setToast('')} />}
      {showJobModal && <AddJobModal onClose={() => setShowJobModal(false)} onAdd={handleAddJob} />}
      {showModal && <AddCostCenterModal onClose={() => setShowModal(false)} onAdd={handleAddCostCenter} />}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white-800">Cost Accounting</h1>
          <p className="text-gray-500 text-sm mt-1">Cost centers, job costing, ABC & profitability</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Budget', value: '$2,25,000', color: 'text-white' },
          { label: 'Total Actual', value: '$2,13,400', color: 'text-emerald-400' },
          { label: 'Net Variance', value: '+$11,600', color: 'text-emerald-400' },
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
            <button key={tab} onClick={() => setActiveTab(i)} className={`px-4 py-2.5 text-sm border-b-2 transition-colors ${activeTab === i ? 'text-blue-600 font-medium border-blue-600' : 'text-gray-500 border-transparent hover:text-gray-700'}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 0 && (
        <div className="bg-gray-900 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
            <h2 className="text-white font-semibold text-sm">Job Cost Center</h2>
            <button onClick={() => setShowModal(true)} className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">+ Add Cost Center</button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800 border-b border-gray-700">
                {['Cost Center ID', 'Name', 'Department Head', 'Budget', 'Actual Spend', 'Variance'].map(h => (
                  <th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {costCenters.map(c => (
                <tr key={c.id} className="hover:bg-gray-800/60">
                  <td className="px-4 py-3.5 text-blue-400 text-sm font-mono">{c.id}</td>
                  <td className="px-4 py-3.5 text-white text-sm font-medium">{c.name}</td>
                  <td className="px-4 py-3.5 text-gray-300 text-sm">{c.head}</td>
                  <td className="px-4 py-3.5 text-amber-400 text-sm">{c.budget}</td>
                  <td className="px-4 py-3.5 text-gray-300 text-sm">{c.actual}</td>
                  <td className={`px-4 py-3.5 text-sm font-semibold ${c.variance.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>{c.variance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 1 && (
        <div className="bg-gray-900 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
            <h2 className="text-white font-semibold text-sm">Job Cost Tracking</h2>
            <button onClick={() => setShowJobModal(true)} className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">+ New Job</button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800 border-b border-gray-700">
                {['Job ID', 'Job Name', 'Client', 'Budget', 'Actual Cost', 'Completion', 'Status'].map(h => (
                  <th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {jobList.map(j => (
                <tr key={j.id} className="hover:bg-gray-800/60">
                  <td className="px-4 py-3.5 text-blue-400 text-sm font-mono">{j.id}</td>
                  <td className="px-4 py-3.5 text-white text-sm font-medium">{j.name}</td>
                  <td className="px-4 py-3.5 text-gray-300 text-sm">{j.client}</td>
                  <td className="px-4 py-3.5 text-amber-400 text-sm">{j.budget}</td>
                  <td className="px-4 py-3.5 text-gray-300 text-sm">{j.actual}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: j.completion }} />
                      </div>
                      <span className="text-gray-300 text-xs">{j.completion}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${j.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400' : j.status === 'Over Budget' ? 'bg-rose-500/20 text-rose-400' : 'bg-blue-500/20 text-blue-400'}`}>{j.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 2 && (
        <div className="bg-gray-900 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-700"><h2 className="text-white font-semibold text-sm">Activity-Based Costing</h2></div>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800 border-b border-gray-700">
                {['Activity', 'Cost Driver', 'Driver Qty', 'Cost per Driver', 'Total Cost'].map(h => (
                  <th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {abcActivities.map((a, i) => (
                <tr key={i} className="hover:bg-gray-800/60">
                  <td className="px-4 py-3.5 text-white text-sm font-medium">{a.activity}</td>
                  <td className="px-4 py-3.5 text-gray-300 text-sm">{a.driver}</td>
                  <td className="px-4 py-3.5 text-blue-400 text-sm">{a.driverQty}</td>
                  <td className="px-4 py-3.5 text-amber-400 text-sm">{a.costPerDriver}</td>
                  <td className="px-4 py-3.5 text-emerald-400 text-sm font-semibold">{a.totalCost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 3 && (
        <div className="bg-gray-900 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-700"><h2 className="text-white font-semibold text-sm">Cost Allocation Matrix</h2></div>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800 border-b border-gray-700">
                {['From (Cost Pool)', 'To (Cost Center)', 'Allocation Method', 'Amount', 'Basis %'].map(h => (
                  <th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {allocations.map((a, i) => (
                <tr key={i} className="hover:bg-gray-800/60">
                  <td className="px-4 py-3.5 text-white text-sm font-medium">{a.from}</td>
                  <td className="px-4 py-3.5 text-gray-300 text-sm">{a.to}</td>
                  <td className="px-4 py-3.5"><span className="bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded text-xs">{a.method}</span></td>
                  <td className="px-4 py-3.5 text-amber-400 text-sm font-semibold">{a.amount}</td>
                  <td className="px-4 py-3.5 text-gray-300 text-sm">{a.basis}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 4 && (
        <div className="bg-gray-900 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-700"><h2 className="text-white font-semibold text-sm">Profitability by Segment</h2></div>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800 border-b border-gray-700">
                {['Segment', 'Revenue', 'COGS', 'Gross Profit', 'Gross Margin'].map(h => (
                  <th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {profitability.map((p, i) => (
                <tr key={i} className="hover:bg-gray-800/60">
                  <td className="px-4 py-3.5 text-white text-sm font-medium">{p.segment}</td>
                  <td className="px-4 py-3.5 text-emerald-400 text-sm font-semibold">{p.revenue}</td>
                  <td className="px-4 py-3.5 text-rose-400 text-sm">{p.cogs}</td>
                  <td className="px-4 py-3.5 text-blue-400 text-sm font-semibold">{p.grossProfit}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: p.margin }} />
                      </div>
                      <span className="text-emerald-400 text-xs font-semibold">{p.margin}</span>
                    </div>
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