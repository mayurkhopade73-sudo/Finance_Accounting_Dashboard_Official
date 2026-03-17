'use client';
import { Toast } from '../../components/Modal';
import { useState } from 'react';
import { Plus } from 'lucide-react';

const tabs = ['Fixed Assets', 'Depreciation', 'Asset Lifecycle', 'Transfer', 'Valuation'];

const assets = [
  { id: 'AST-001', name: 'Office Building - Mumbai HQ', category: 'Real Estate', value: '$8,50,000', acquired: 'Jan 2020', dep: '5%/yr', netBook: '$7,02,500', status: 'Active' },
  { id: 'AST-002', name: 'Server Infrastructure - Rack A', category: 'IT Equipment', value: '$1,25,000', acquired: 'Mar 2023', dep: '33%/yr', netBook: '$41,625', status: 'Active' },
  { id: 'AST-003', name: 'Company Vehicles (Fleet 5)', category: 'Vehicles', value: '$2,20,000', acquired: 'Jun 2022', dep: '20%/yr', netBook: '$1,32,000', status: 'Active' },
  { id: 'AST-004', name: 'Industrial Generators', category: 'Equipment', value: '$45,000', acquired: 'Nov 2021', dep: '10%/yr', netBook: '$29,250', status: 'Active' },
  { id: 'AST-005', name: 'Office Furniture & Fittings', category: 'Furniture', value: '$38,000', acquired: 'Jan 2021', dep: '10%/yr', netBook: '$19,950', status: 'Disposed' },
];

const depSchedule = [
  { asset: 'Office Building', fy: 'FY 2025-26', opening: '$7,44,750', charge: '$42,250', closing: '$7,02,500', method: 'SLM' },
  { asset: 'Server Infrastructure', fy: 'FY 2025-26', opening: '$83,750', charge: '$41,250', closing: '$41,625', method: 'WDV' },
  { asset: 'Company Vehicles', fy: 'FY 2025-26', opening: '$1,65,000', charge: '$33,000', closing: '$1,32,000', method: 'SLM' },
  { asset: 'Generators', fy: 'FY 2025-26', opening: '$32,500', charge: '$3,250', closing: '$29,250', method: 'SLM' },
];

const lifecycle = [
  { asset: 'Server Rack B', stage: 'Procurement', date: 'Mar 01, 2026', notes: 'PO raised, awaiting delivery' },
  { asset: 'Office Building', stage: 'In Use', date: 'Jan 2020', notes: 'Annual maintenance scheduled Apr 2026' },
  { asset: 'Office Furniture', stage: 'Disposed', date: 'Feb 2026', notes: 'Sold at $5,000. Gain recorded.' },
  { asset: 'Server Rack A', stage: 'Maintenance', date: 'Mar 10, 2026', notes: 'Scheduled firmware update in progress' },
];

const transfers = [
  { id: 'TRF-001', asset: 'Laptop - Dell XPS', from: 'Engineering', to: 'Sales', transferDate: 'Mar 08, 2026', approvedBy: 'Super Admin', status: 'Completed' },
  { id: 'TRF-002', asset: 'Projector - Epson', from: 'Training Room', to: 'Conference Hall', transferDate: 'Mar 05, 2026', approvedBy: 'Super Admin', status: 'Completed' },
  { id: 'TRF-003', asset: 'Company Car - MH12AB1234', from: 'Operations', to: 'Sales', transferDate: 'Mar 12, 2026', approvedBy: 'Pending', status: 'Pending' },
];

const valuations = [
  { asset: 'Office Building - Mumbai HQ', bookValue: '$7,02,500', marketValue: '$9,50,000', revaluation: '+$2,47,500', lastValued: 'Mar 2026', method: 'Market Approach' },
  { asset: 'Company Vehicles (Fleet 5)', bookValue: '$1,32,000', marketValue: '$1,10,000', revaluation: '-$22,000', lastValued: 'Jan 2026', method: 'Cost Approach' },
  { asset: 'Server Infrastructure', bookValue: '$41,625', marketValue: '$38,000', revaluation: '-$3,625', lastValued: 'Feb 2026', method: 'Income Approach' },
];

const stageColor: Record<string, string> = {
  Procurement: 'bg-blue-500/20 text-blue-400',
  'In Use': 'bg-emerald-500/20 text-emerald-400',
  Maintenance: 'bg-amber-500/20 text-amber-400',
  Disposed: 'bg-gray-500/20 text-gray-400',
};

export default function AssetManagementPage() {
  const [toast, setToast] = useState('');
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="p-6 space-y-6">
      {toast && <Toast message={toast} onDone={() => setToast('')} />}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Asset Management</h1>
          <p className="text-gray-500 text-sm mt-1">Track, manage, and depreciate company assets</p>
        </div>
        <button onClick={() => setToast('Add Asset form initiated')} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
          <Plus className="w-4 h-4" /> Add Asset
        </button>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Total Asset Value', value: '$12,78,000', color: 'text-white' },
          { label: 'Net Book Value', value: '$10,25,325', color: 'text-emerald-400' },
          { label: 'Accumulated Dep.', value: '$2,52,675', color: 'text-amber-400' },
          { label: 'Active Assets', value: '4', color: 'text-blue-400' },
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
            <thead><tr className="bg-gray-800 border-b border-gray-700">{['ID', 'Asset Name', 'Category', 'Original Value', 'Acquired', 'Depreciation', 'Net Book Value', 'Status'].map(h => <th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-800">
              {assets.map(a => (
                <tr key={a.id} className="hover:bg-gray-800/60 transition-colors">
                  <td className="px-4 py-3.5 text-blue-400 text-sm font-mono">{a.id}</td>
                  <td className="px-4 py-3.5 text-white text-sm font-medium">{a.name}</td>
                  <td className="px-4 py-3.5 text-gray-300 text-sm">{a.category}</td>
                  <td className="px-4 py-3.5 text-amber-400 text-sm">{a.value}</td>
                  <td className="px-4 py-3.5 text-gray-300 text-sm">{a.acquired}</td>
                  <td className="px-4 py-3.5 text-gray-300 text-sm">{a.dep}</td>
                  <td className="px-4 py-3.5 text-emerald-400 text-sm font-semibold">{a.netBook}</td>
                  <td className="px-4 py-3.5"><span className={`px-2 py-0.5 rounded text-xs font-medium ${a.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-500/20 text-gray-400'}`}>{a.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 1 && (
        <div className="bg-gray-900 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
            <h2 className="text-white font-semibold text-sm">Depreciation Schedule — FY 2025-26</h2>
            <button onClick={() => setToast('Depreciation schedule exported!')} className="px-3 py-1.5 bg-gray-700 text-gray-300 rounded text-xs hover:bg-gray-600">Export</button>
          </div>
          <table className="w-full">
            <thead><tr className="bg-gray-800 border-b border-gray-700">{['Asset', 'FY', 'Opening WDV', 'Dep. Charge', 'Closing WDV', 'Method'].map(h => <th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-800">
              {depSchedule.map((d, i) => (
                <tr key={i} className="hover:bg-gray-800/60">
                  <td className="px-4 py-3.5 text-white text-sm font-medium">{d.asset}</td>
                  <td className="px-4 py-3.5 text-gray-300 text-sm">{d.fy}</td>
                  <td className="px-4 py-3.5 text-amber-400 text-sm">{d.opening}</td>
                  <td className="px-4 py-3.5 text-rose-400 text-sm">-{d.charge}</td>
                  <td className="px-4 py-3.5 text-emerald-400 text-sm font-semibold">{d.closing}</td>
                  <td className="px-4 py-3.5"><span className="bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded text-xs">{d.method}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 2 && (
        <div className="bg-gray-900 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-700"><h2 className="text-white font-semibold text-sm">Asset Lifecycle Tracking</h2></div>
          <table className="w-full">
            <thead><tr className="bg-gray-800 border-b border-gray-700">{['Asset', 'Lifecycle Stage', 'Date', 'Notes'].map(h => <th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-800">
              {lifecycle.map((l, i) => (
                <tr key={i} className="hover:bg-gray-800/60">
                  <td className="px-4 py-3.5 text-white text-sm font-medium">{l.asset}</td>
                  <td className="px-4 py-3.5"><span className={`px-2 py-0.5 rounded text-xs font-medium ${stageColor[l.stage]}`}>{l.stage}</span></td>
                  <td className="px-4 py-3.5 text-gray-300 text-sm">{l.date}</td>
                  <td className="px-4 py-3.5 text-gray-400 text-sm">{l.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 3 && (
        <div className="bg-gray-900 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
            <h2 className="text-white font-semibold text-sm">Asset Transfers</h2>
            <button onClick={() => setToast('Transfer request submitted!')} className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">+ New Transfer</button>
          </div>
          <table className="w-full">
            <thead><tr className="bg-gray-800 border-b border-gray-700">{['Transfer ID', 'Asset', 'From', 'To', 'Date', 'Approved By', 'Status'].map(h => <th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-800">
              {transfers.map(t => (
                <tr key={t.id} className="hover:bg-gray-800/60">
                  <td className="px-4 py-3.5 text-blue-400 text-sm font-mono">{t.id}</td>
                  <td className="px-4 py-3.5 text-white text-sm font-medium">{t.asset}</td>
                  <td className="px-4 py-3.5 text-gray-300 text-sm">{t.from}</td>
                  <td className="px-4 py-3.5 text-gray-300 text-sm">{t.to}</td>
                  <td className="px-4 py-3.5 text-gray-400 text-sm">{t.transferDate}</td>
                  <td className="px-4 py-3.5 text-gray-300 text-sm">{t.approvedBy}</td>
                  <td className="px-4 py-3.5"><span className={`px-2 py-0.5 rounded text-xs font-medium ${t.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>{t.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 4 && (
        <div className="bg-gray-900 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
            <h2 className="text-white font-semibold text-sm">Asset Valuation</h2>
            <button onClick={() => setToast('Valuation request submitted!')} className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">Request Valuation</button>
          </div>
          <table className="w-full">
            <thead><tr className="bg-gray-800 border-b border-gray-700">{['Asset', 'Book Value', 'Market Value', 'Revaluation', 'Last Valued', 'Method'].map(h => <th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-800">
              {valuations.map((v, i) => (
                <tr key={i} className="hover:bg-gray-800/60">
                  <td className="px-4 py-3.5 text-white text-sm font-medium">{v.asset}</td>
                  <td className="px-4 py-3.5 text-gray-300 text-sm">{v.bookValue}</td>
                  <td className="px-4 py-3.5 text-amber-400 text-sm font-semibold">{v.marketValue}</td>
                  <td className={`px-4 py-3.5 text-sm font-bold ${v.revaluation.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>{v.revaluation}</td>
                  <td className="px-4 py-3.5 text-gray-400 text-sm">{v.lastValued}</td>
                  <td className="px-4 py-3.5 text-gray-300 text-sm">{v.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
