'use client';
import { Toast } from '../../components/Modal';
import { useState } from 'react';
import { Plus } from 'lucide-react';

const tabs = ['Cost Centers', 'Job Costing', 'ABC Costing', 'Cost Allocation', 'Profitability'];

const costCenters = [
  { id: 'CC-001', name: 'Engineering', head: 'Raj Kumar', budget: '$80,000', actual: '$72,400', variance: '+$7,600' },
  { id: 'CC-002', name: 'Marketing', head: 'Priya Shah', budget: '$30,000', actual: '$28,200', variance: '+$1,800' },
  { id: 'CC-003', name: 'Operations', head: 'Anil Mehta', budget: '$50,000', actual: '$51,200', variance: '-$1,200' },
  { id: 'CC-004', name: 'HR & Admin', head: 'Sunita Rao', budget: '$25,000', actual: '$23,100', variance: '+$1,900' },
  { id: 'CC-005', name: 'Sales', head: 'Deepak Gupta', budget: '$40,000', actual: '$38,500', variance: '+$1,500' },
];

const jobs = [
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

  return (
    <div className="p-6 space-y-6">
      {toast && <Toast message={toast} onDone={() => setToast('')} />}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Cost Accounting</h1>
          <p className="text-gray-500 text-sm mt-1">Cost centers, job costing, ABC & profitability</p>
        </div>
        <button onClick={() => setToast('Cost center added!')} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
          <Plus className="w-4 h-4" /> Add Cost Center
        </button>
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
        <div className="flex">{tabs.map((tab, i) => <button key={tab} onClick={() => setActiveTab(i)} className={`px-4 py-2.5 text-sm border-b-2 transition-colors ${activeTab === i ? 'text-blue-600 font-medium border-blue-600' : 'text-gray-500 border-transparent hover:text-gray-700'}`}>{tab}</button>)}</div>
      </div>

      {activeTab === 0 && (
        <div className="bg-gray-900 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead><tr className="bg-gray-800 border-b border-gray-700">{['Cost Center ID', 'Name', 'Department Head', 'Budget', 'Actual Spend', 'Variance'].map(h => <th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3">{h}</th>)}</tr></thead>
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
            <button onClick={() => setToast('New job created!')} className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">+ New Job</button>
          </div>
          <table className="w-full">
            <thead><tr className="bg-gray-800 border-b border-gray-700">{['Job ID', 'Job Name', 'Client', 'Budget', 'Actual Cost', 'Completion', 'Status'].map(h => <th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-800">
              {jobs.map(j => (
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
            <thead><tr className="bg-gray-800 border-b border-gray-700">{['Activity', 'Cost Driver', 'Driver Qty', 'Cost per Driver', 'Total Cost'].map(h => <th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3">{h}</th>)}</tr></thead>
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
            <thead><tr className="bg-gray-800 border-b border-gray-700">{['From (Cost Pool)', 'To (Cost Center)', 'Allocation Method', 'Amount', 'Basis %'].map(h => <th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3">{h}</th>)}</tr></thead>
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
            <thead><tr className="bg-gray-800 border-b border-gray-700">{['Segment', 'Revenue', 'COGS', 'Gross Profit', 'Gross Margin'].map(h => <th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3">{h}</th>)}</tr></thead>
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
