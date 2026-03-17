'use client';
import { Toast } from '../../components/Modal';
import { useState } from 'react';
import { Globe, RefreshCw } from 'lucide-react';

const fxRates = [
  { pair: 'USD/INR', rate: '83.42', change: '+0.12', trending: true },
  { pair: 'EUR/INR', rate: '90.15', change: '-0.08', trending: false },
  { pair: 'GBP/INR', rate: '105.30', change: '+0.22', trending: true },
  { pair: 'AED/INR', rate: '22.70', change: '+0.03', trending: true },
  { pair: 'SGD/INR', rate: '61.85', change: '-0.15', trending: false },
];

const entities = [
  { name: 'Cognexia India', country: '🇮🇳 India', currency: 'INR', revenue: '$8,45,000', employees: 120, status: 'Active' },
  { name: 'Cognexia US Inc', country: '🇺🇸 United States', currency: 'USD', revenue: '$12,30,000', employees: 45, status: 'Active' },
  { name: 'Cognexia UK Ltd', country: '🇬🇧 United Kingdom', currency: 'GBP', revenue: '$4,20,000', employees: 22, status: 'Active' },
  { name: 'Cognexia APAC', country: '🇸🇬 Singapore', currency: 'SGD', revenue: '$2,15,000', employees: 18, status: 'Active' },
];

const intercompany = [
  { id: 'IC-001', from: 'Cognexia India', to: 'Cognexia US Inc', type: 'Service Fee', amount: '$45,000', currency: 'USD', date: 'Mar 10, 2026', status: 'Settled' },
  { id: 'IC-002', from: 'Cognexia US Inc', to: 'Cognexia UK Ltd', type: 'Royalty', amount: '$18,000', currency: 'GBP', date: 'Mar 05, 2026', status: 'Pending' },
  { id: 'IC-003', from: 'Cognexia India', to: 'Cognexia APAC', type: 'Management Fee', amount: '$12,000', currency: 'SGD', date: 'Feb 28, 2026', status: 'Settled' },
  { id: 'IC-004', from: 'Cognexia UK Ltd', to: 'Cognexia India', type: 'Reimbursement', amount: '$8,500', currency: 'INR', date: 'Feb 20, 2026', status: 'Settled' },
];

const globalCOA = [
  { code: '1000', name: 'Cash & Cash Equivalents', type: 'Asset', entities: 'All', currency: 'Multi' },
  { code: '1100', name: 'Accounts Receivable', type: 'Asset', entities: 'All', currency: 'Multi' },
  { code: '1200', name: 'Prepaid Expenses', type: 'Asset', entities: 'IN, US', currency: 'INR, USD' },
  { code: '2000', name: 'Accounts Payable', type: 'Liability', entities: 'All', currency: 'Multi' },
  { code: '3000', name: 'Share Capital', type: 'Equity', entities: 'IN, UK', currency: 'INR, GBP' },
  { code: '4000', name: 'Revenue - Products', type: 'Revenue', entities: 'All', currency: 'Multi' },
  { code: '5000', name: 'Cost of Sales', type: 'Expense', entities: 'All', currency: 'Multi' },
  { code: '6000', name: 'Operating Expenses', type: 'Expense', entities: 'All', currency: 'Multi' },
];

const typeColor: Record<string, string> = {
  Asset: 'bg-blue-500/20 text-blue-400',
  Liability: 'bg-rose-500/20 text-rose-400',
  Equity: 'bg-violet-500/20 text-violet-400',
  Revenue: 'bg-emerald-500/20 text-emerald-400',
  Expense: 'bg-amber-500/20 text-amber-400',
};

export default function GlobalOperationsPage() {
  const [toast, setToast] = useState('');
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="p-6 space-y-6">
      {toast && <Toast message={toast} onDone={() => setToast('')} />}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Global Operations</h1>
        <p className="text-gray-500 text-sm mt-1">Multi-currency, multi-entity, intercompany & global chart of accounts</p>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Global Revenue', value: '$27,10,000', color: 'text-white' },
          { label: 'Active Entities', value: '4', color: 'text-blue-400' },
          { label: 'Currencies', value: '5', color: 'text-emerald-400' },
          { label: 'Intercompany Txns', value: '$83,500', color: 'text-amber-400' },
        ].map(s => (
          <div key={s.label} className="bg-gray-900 rounded-xl p-5">
            <div className="text-gray-400 text-sm mb-2">{s.label}</div>
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="border-b border-gray-200">
        <div className="flex">{['Multi Currency', 'Multi Entity', 'Intercompany', 'Global COA'].map((tab, i) => <button key={tab} onClick={() => setActiveTab(i)} className={`px-4 py-2.5 text-sm border-b-2 transition-colors ${activeTab === i ? 'text-blue-600 font-medium border-blue-600' : 'text-gray-500 border-transparent hover:text-gray-700'}`}>{tab}</button>)}</div>
      </div>

      {activeTab === 0 && (
        <div className="bg-gray-900 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
            <h2 className="text-white font-semibold text-sm">Live Exchange Rates (vs INR)</h2>
            <button className="flex items-center gap-1 text-blue-400 text-xs hover:text-blue-300"><RefreshCw className="w-3 h-3" /> Refresh</button>
          </div>
          <table className="w-full">
            <thead><tr className="bg-gray-800 border-b border-gray-700">{['Currency Pair', 'Exchange Rate', '24h Change', 'Trend', 'Action'].map(h => <th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-800">
              {fxRates.map(r => (
                <tr key={r.pair} className="hover:bg-gray-800/60">
                  <td className="px-4 py-3.5 text-white text-sm font-medium">{r.pair}</td>
                  <td className="px-4 py-3.5 text-amber-400 text-sm font-mono font-bold">{r.rate}</td>
                  <td className={`px-4 py-3.5 text-sm font-medium ${r.trending ? 'text-emerald-400' : 'text-rose-400'}`}>{r.trending ? '+' : ''}{r.change}%</td>
                  <td className="px-4 py-3.5"><span className={`px-2 py-0.5 rounded text-xs ${r.trending ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>{r.trending ? '↑ Up' : '↓ Down'}</span></td>
                  <td className="px-4 py-3.5"><button onClick={() => setToast(`FX conversion request for ${r.pair} submitted!`)} className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">Convert</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 1 && (
        <div className="bg-gray-900 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
            <h2 className="text-white font-semibold text-sm">Legal Entities</h2>
            <button onClick={() => setToast('Add Entity — contact compliance team')} className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">+ Add Entity</button>
          </div>
          <table className="w-full">
            <thead><tr className="bg-gray-800 border-b border-gray-700">{['Entity', 'Country', 'Base Currency', 'Revenue (USD)', 'Employees', 'Status'].map(h => <th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-800">
              {entities.map(e => (
                <tr key={e.name} className="hover:bg-gray-800/60">
                  <td className="px-4 py-3.5 text-white text-sm font-medium">{e.name}</td>
                  <td className="px-4 py-3.5 text-gray-300 text-sm">{e.country}</td>
                  <td className="px-4 py-3.5 text-blue-400 text-sm font-mono">{e.currency}</td>
                  <td className="px-4 py-3.5 text-emerald-400 text-sm font-semibold">{e.revenue}</td>
                  <td className="px-4 py-3.5 text-gray-300 text-sm">{e.employees}</td>
                  <td className="px-4 py-3.5"><span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded text-xs">{e.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 2 && (
        <div className="bg-gray-900 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
            <h2 className="text-white font-semibold text-sm">Intercompany Transactions</h2>
            <button onClick={() => setToast('New intercompany transaction initiated')} className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">+ New Transaction</button>
          </div>
          <table className="w-full">
            <thead><tr className="bg-gray-800 border-b border-gray-700">{['ID', 'From Entity', 'To Entity', 'Type', 'Amount', 'Currency', 'Date', 'Status'].map(h => <th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-800">
              {intercompany.map(t => (
                <tr key={t.id} className="hover:bg-gray-800/60">
                  <td className="px-4 py-3.5 text-blue-400 text-sm font-mono">{t.id}</td>
                  <td className="px-4 py-3.5 text-white text-sm">{t.from}</td>
                  <td className="px-4 py-3.5 text-gray-300 text-sm">{t.to}</td>
                  <td className="px-4 py-3.5"><span className="bg-violet-500/20 text-violet-400 px-2 py-0.5 rounded text-xs">{t.type}</span></td>
                  <td className="px-4 py-3.5 text-amber-400 text-sm font-semibold">{t.amount}</td>
                  <td className="px-4 py-3.5 text-gray-400 text-sm">{t.currency}</td>
                  <td className="px-4 py-3.5 text-gray-400 text-sm">{t.date}</td>
                  <td className="px-4 py-3.5"><span className={`px-2 py-0.5 rounded text-xs font-medium ${t.status === 'Settled' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>{t.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 3 && (
        <div className="bg-gray-900 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
            <h2 className="text-white font-semibold text-sm">Global Chart of Accounts</h2>
            <button onClick={() => setToast('Account code added to COA')} className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">+ Add Account</button>
          </div>
          <table className="w-full">
            <thead><tr className="bg-gray-800 border-b border-gray-700">{['Account Code', 'Account Name', 'Type', 'Used in Entities', 'Currency'].map(h => <th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-800">
              {globalCOA.map(a => (
                <tr key={a.code} className="hover:bg-gray-800/60">
                  <td className="px-4 py-3.5 text-blue-400 text-sm font-mono font-bold">{a.code}</td>
                  <td className="px-4 py-3.5 text-white text-sm font-medium">{a.name}</td>
                  <td className="px-4 py-3.5"><span className={`px-2 py-0.5 rounded text-xs font-medium ${typeColor[a.type]}`}>{a.type}</span></td>
                  <td className="px-4 py-3.5 text-gray-300 text-sm">{a.entities}</td>
                  <td className="px-4 py-3.5 text-gray-400 text-sm">{a.currency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
