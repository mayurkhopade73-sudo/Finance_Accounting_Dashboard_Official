// 'use client';
// import { Toast } from '../../components/Modal';
// import { useState } from 'react';
// import { Globe, RefreshCw } from 'lucide-react';

// const fxRates = [
//   { pair: 'USD/INR', rate: '83.42', change: '+0.12', trending: true },
//   { pair: 'EUR/INR', rate: '90.15', change: '-0.08', trending: false },
//   { pair: 'GBP/INR', rate: '105.30', change: '+0.22', trending: true },
//   { pair: 'AED/INR', rate: '22.70', change: '+0.03', trending: true },
//   { pair: 'SGD/INR', rate: '61.85', change: '-0.15', trending: false },
// ];

// const entities = [
//   { name: 'Cognexia India', country: '🇮🇳 India', currency: 'INR', revenue: '$8,45,000', employees: 120, status: 'Active' },
//   { name: 'Cognexia US Inc', country: '🇺🇸 United States', currency: 'USD', revenue: '$12,30,000', employees: 45, status: 'Active' },
//   { name: 'Cognexia UK Ltd', country: '🇬🇧 United Kingdom', currency: 'GBP', revenue: '$4,20,000', employees: 22, status: 'Active' },
//   { name: 'Cognexia APAC', country: '🇸🇬 Singapore', currency: 'SGD', revenue: '$2,15,000', employees: 18, status: 'Active' },
// ];

// const intercompany = [
//   { id: 'IC-001', from: 'Cognexia India', to: 'Cognexia US Inc', type: 'Service Fee', amount: '$45,000', currency: 'USD', date: 'Mar 10, 2026', status: 'Settled' },
//   { id: 'IC-002', from: 'Cognexia US Inc', to: 'Cognexia UK Ltd', type: 'Royalty', amount: '$18,000', currency: 'GBP', date: 'Mar 05, 2026', status: 'Pending' },
//   { id: 'IC-003', from: 'Cognexia India', to: 'Cognexia APAC', type: 'Management Fee', amount: '$12,000', currency: 'SGD', date: 'Feb 28, 2026', status: 'Settled' },
//   { id: 'IC-004', from: 'Cognexia UK Ltd', to: 'Cognexia India', type: 'Reimbursement', amount: '$8,500', currency: 'INR', date: 'Feb 20, 2026', status: 'Settled' },
// ];

// const globalCOA = [
//   { code: '1000', name: 'Cash & Cash Equivalents', type: 'Asset', entities: 'All', currency: 'Multi' },
//   { code: '1100', name: 'Accounts Receivable', type: 'Asset', entities: 'All', currency: 'Multi' },
//   { code: '1200', name: 'Prepaid Expenses', type: 'Asset', entities: 'IN, US', currency: 'INR, USD' },
//   { code: '2000', name: 'Accounts Payable', type: 'Liability', entities: 'All', currency: 'Multi' },
//   { code: '3000', name: 'Share Capital', type: 'Equity', entities: 'IN, UK', currency: 'INR, GBP' },
//   { code: '4000', name: 'Revenue - Products', type: 'Revenue', entities: 'All', currency: 'Multi' },
//   { code: '5000', name: 'Cost of Sales', type: 'Expense', entities: 'All', currency: 'Multi' },
//   { code: '6000', name: 'Operating Expenses', type: 'Expense', entities: 'All', currency: 'Multi' },
// ];

// const typeColor: Record<string, string> = {
//   Asset: 'bg-blue-500/20 text-blue-400',
//   Liability: 'bg-rose-500/20 text-rose-400',
//   Equity: 'bg-violet-500/20 text-violet-400',
//   Revenue: 'bg-emerald-500/20 text-emerald-400',
//   Expense: 'bg-amber-500/20 text-amber-400',
// };

// export default function GlobalOperationsPage() {
//   const [toast, setToast] = useState('');
//   const [activeTab, setActiveTab] = useState(0);

//   return (
//     <div className="p-6 space-y-6">
//       {toast && <Toast message={toast} onDone={() => setToast('')} />}
//       <div>
//         <h1 className="text-2xl font-bold text-white-800">Global Operations</h1>
//         <p className="text-gray-500 text-sm mt-1">Multi-currency, multi-entity, intercompany & global chart of accounts</p>
//       </div>

//       <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
//         {[
//           { label: 'Global Revenue', value: '$27,10,000', color: 'text-white' },
//           { label: 'Active Entities', value: '4', color: 'text-blue-400' },
//           { label: 'Currencies', value: '5', color: 'text-emerald-400' },
//           { label: 'Intercompany Txns', value: '$83,500', color: 'text-amber-400' },
//         ].map(s => (
//           <div key={s.label} className="bg-gray-900 rounded-xl p-5">
//             <div className="text-gray-400 text-sm mb-2">{s.label}</div>
//             <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
//           </div>
//         ))}
//       </div>

//       <div className="border-b border-gray-200">
//         <div className="flex">{['Multi Currency', 'Multi Entity', 'Intercompany', 'Global COA'].map((tab, i) => <button key={tab} onClick={() => setActiveTab(i)} className={`px-4 py-2.5 text-sm border-b-2 transition-colors ${activeTab === i ? 'text-blue-600 font-medium border-blue-600' : 'text-gray-500 border-transparent hover:text-gray-700'}`}>{tab}</button>)}</div>
//       </div>

//       {activeTab === 0 && (
//         <div className="bg-gray-900 rounded-xl overflow-hidden">
//           <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
//             <h2 className="text-white font-semibold text-sm">Live Exchange Rates (vs INR)</h2>
//             <button className="flex items-center gap-1 text-blue-400 text-xs hover:text-blue-300"><RefreshCw className="w-3 h-3" /> Refresh</button>
//           </div>
//           <table className="w-full">
//             <thead><tr className="bg-gray-800 border-b border-gray-700">{['Currency Pair', 'Exchange Rate', '24h Change', 'Trend', 'Action'].map(h => <th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3">{h}</th>)}</tr></thead>
//             <tbody className="divide-y divide-gray-800">
//               {fxRates.map(r => (
//                 <tr key={r.pair} className="hover:bg-gray-800/60">
//                   <td className="px-4 py-3.5 text-white text-sm font-medium">{r.pair}</td>
//                   <td className="px-4 py-3.5 text-amber-400 text-sm font-mono font-bold">{r.rate}</td>
//                   <td className={`px-4 py-3.5 text-sm font-medium ${r.trending ? 'text-emerald-400' : 'text-rose-400'}`}>{r.trending ? '+' : ''}{r.change}%</td>
//                   <td className="px-4 py-3.5"><span className={`px-2 py-0.5 rounded text-xs ${r.trending ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>{r.trending ? '↑ Up' : '↓ Down'}</span></td>
//                   <td className="px-4 py-3.5"><button onClick={() => setToast(`FX conversion request for ${r.pair} submitted!`)} className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">Convert</button></td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {activeTab === 1 && (
//         <div className="bg-gray-900 rounded-xl overflow-hidden">
//           <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
//             <h2 className="text-white font-semibold text-sm">Legal Entities</h2>
//             <button onClick={() => setToast('Add Entity — contact compliance team')} className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">+ Add Entity</button>
//           </div>
//           <table className="w-full">
//             <thead><tr className="bg-gray-800 border-b border-gray-700">{['Entity', 'Country', 'Base Currency', 'Revenue (USD)', 'Employees', 'Status'].map(h => <th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3">{h}</th>)}</tr></thead>
//             <tbody className="divide-y divide-gray-800">
//               {entities.map(e => (
//                 <tr key={e.name} className="hover:bg-gray-800/60">
//                   <td className="px-4 py-3.5 text-white text-sm font-medium">{e.name}</td>
//                   <td className="px-4 py-3.5 text-gray-300 text-sm">{e.country}</td>
//                   <td className="px-4 py-3.5 text-blue-400 text-sm font-mono">{e.currency}</td>
//                   <td className="px-4 py-3.5 text-emerald-400 text-sm font-semibold">{e.revenue}</td>
//                   <td className="px-4 py-3.5 text-gray-300 text-sm">{e.employees}</td>
//                   <td className="px-4 py-3.5"><span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded text-xs">{e.status}</span></td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {activeTab === 2 && (
//         <div className="bg-gray-900 rounded-xl overflow-hidden">
//           <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
//             <h2 className="text-white font-semibold text-sm">Intercompany Transactions</h2>
//             <button onClick={() => setToast('New intercompany transaction initiated')} className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">+ New Transaction</button>
//           </div>
//           <table className="w-full">
//             <thead><tr className="bg-gray-800 border-b border-gray-700">{['ID', 'From Entity', 'To Entity', 'Type', 'Amount', 'Currency', 'Date', 'Status'].map(h => <th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3">{h}</th>)}</tr></thead>
//             <tbody className="divide-y divide-gray-800">
//               {intercompany.map(t => (
//                 <tr key={t.id} className="hover:bg-gray-800/60">
//                   <td className="px-4 py-3.5 text-blue-400 text-sm font-mono">{t.id}</td>
//                   <td className="px-4 py-3.5 text-white text-sm">{t.from}</td>
//                   <td className="px-4 py-3.5 text-gray-300 text-sm">{t.to}</td>
//                   <td className="px-4 py-3.5"><span className="bg-violet-500/20 text-violet-400 px-2 py-0.5 rounded text-xs">{t.type}</span></td>
//                   <td className="px-4 py-3.5 text-amber-400 text-sm font-semibold">{t.amount}</td>
//                   <td className="px-4 py-3.5 text-gray-400 text-sm">{t.currency}</td>
//                   <td className="px-4 py-3.5 text-gray-400 text-sm">{t.date}</td>
//                   <td className="px-4 py-3.5"><span className={`px-2 py-0.5 rounded text-xs font-medium ${t.status === 'Settled' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>{t.status}</span></td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {activeTab === 3 && (
//         <div className="bg-gray-900 rounded-xl overflow-hidden">
//           <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
//             <h2 className="text-white font-semibold text-sm">Global Chart of Accounts</h2>
//             <button onClick={() => setToast('Account code added to COA')} className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">+ Add Account</button>
//           </div>
//           <table className="w-full">
//             <thead><tr className="bg-gray-800 border-b border-gray-700">{['Account Code', 'Account Name', 'Type', 'Used in Entities', 'Currency'].map(h => <th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3">{h}</th>)}</tr></thead>
//             <tbody className="divide-y divide-gray-800">
//               {globalCOA.map(a => (
//                 <tr key={a.code} className="hover:bg-gray-800/60">
//                   <td className="px-4 py-3.5 text-blue-400 text-sm font-mono font-bold">{a.code}</td>
//                   <td className="px-4 py-3.5 text-white text-sm font-medium">{a.name}</td>
//                   <td className="px-4 py-3.5"><span className={`px-2 py-0.5 rounded text-xs font-medium ${typeColor[a.type]}`}>{a.type}</span></td>
//                   <td className="px-4 py-3.5 text-gray-300 text-sm">{a.entities}</td>
//                   <td className="px-4 py-3.5 text-gray-400 text-sm">{a.currency}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

'use client';
import { Toast } from '../../components/Modal';
import { useState, useEffect } from 'react';
import { Globe, RefreshCw, X, Search } from 'lucide-react';

// --- Types ---
interface Entity {
  name: string;
  country: string;
  currency: string;
  revenue: string;
  employees: number;
  status: string;
}

// --- Data ---
const fxRates = [
  { pair: 'USD/INR', rate: '83.42', change: '+0.12', trending: true },
  { pair: 'EUR/INR', rate: '90.15', change: '-0.08', trending: false },
  { pair: 'GBP/INR', rate: '105.30', change: '+0.22', trending: true },
  { pair: 'AED/INR', rate: '22.70', change: '+0.03', trending: true },
  { pair: 'SGD/INR', rate: '61.85', change: '-0.15', trending: false },
];

const initialEntities: Entity[] = [
  { name: 'Cognexia India', country: '🇮🇳 India', currency: 'INR', revenue: '$8,45,000', employees: 120, status: 'Active' },
  { name: 'Cognexia US Inc', country: '🇺🇸 United States', currency: 'USD', revenue: '$12,30,000', employees: 45, status: 'Active' },
  { name: 'Cognexia UK Ltd', country: '🇬🇧 United Kingdom', currency: 'GBP', revenue: '$4,20,000', employees: 22, status: 'Active' },
  { name: 'Cognexia APAC', country: '🇸🇬 Singapore', currency: 'SGD', revenue: '$2,15,000', employees: 18, status: 'Active' },
];

const initialIntercompany = [
  { id: 'IC-001', from: 'Cognexia India', to: 'Cognexia US Inc', type: 'Service Fee', amount: '$45,000', currency: 'USD', date: '2026-03-10', status: 'Settled' },
  { id: 'IC-002', from: 'Cognexia US Inc', to: 'Cognexia UK Ltd', type: 'Royalty', amount: '$18,000', currency: 'GBP', date: '2026-03-05', status: 'Pending' },
  { id: 'IC-003', from: 'Cognexia India', to: 'Cognexia APAC', type: 'Management Fee', amount: '$12,000', currency: 'SGD', date: '2026-02-28', status: 'Settled' },
];

const initialGlobalCOA = [
  { code: '1000', name: 'Cash & Cash Equivalents', type: 'Asset', entities: 'All', currency: 'Multi' },
  { code: '1100', name: 'Accounts Receivable', type: 'Asset', entities: 'All', currency: 'Multi' },
  { code: '4000', name: 'Revenue - Products', type: 'Revenue', entities: 'All', currency: 'Multi' },
];

const typeColor: Record<string, string> = {
  Asset: 'bg-blue-500/20 text-blue-400',
  Liability: 'bg-rose-500/20 text-rose-400',
  Revenue: 'bg-emerald-500/20 text-emerald-400',
};

export default function GlobalOperationsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [toast, setToast] = useState('');
  const [activeTab, setActiveTab] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [entityList, setEntityList] = useState<Entity[]>(initialEntities);

  const [intercompanyList, setIntercompanyList] = useState(initialIntercompany);
  const [isIcModalOpen, setIsIcModalOpen] = useState(false);

  const [formData, setFormData] = useState({ name: '', country: 'United States', currency: 'USD - US Dollar', employees: 1 });
  const [errors, setErrors] = useState({ name: false });

  const [icFormData, setIcFormData] = useState({ date: '', from: 'Cognexia India', to: 'Cognexia US Inc', type: 'Intercompany Loan', currency: 'USD', amount: '', memo: '' });
  const [icErrors, setIcErrors] = useState({ date: false, amount: false });

  // --- NEW STATES FOR COA ---
  const [coaList, setCoaList] = useState(initialGlobalCOA);
  const [isCoaModalOpen, setIsCoaModalOpen] = useState(false);
  const [coaFormData, setCoaFormData] = useState({ code: '', name: '', type: 'Asset', entities: 'All' });
  const [coaErrors, setCoaErrors] = useState({ code: false, name: false });

  const handleAddEntity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrors({ name: true });
      return;
    }

    const newEntity: Entity = {
      name: formData.name,
      country: `🇺🇸 ${formData.country}`,
      currency: formData.currency.split(' ')[0],
      revenue: '$0',
      employees: formData.employees,
      status: 'Active'
    };

    setEntityList([...entityList, newEntity]);
    setIsModalOpen(false);
    setErrors({ name: false });
    setToast(`${formData.name} added successfully!`);
    setFormData({ name: '', country: 'United States', currency: 'USD - US Dollar', employees: 1 });
  };

  const handleAddIntercompany = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      date: !icFormData.date.trim(),
      amount: !icFormData.amount.toString().trim()
    };

    setIcErrors(newErrors);

    if (newErrors.date || newErrors.amount) {
      return;
    }

    const formattedAmount = icFormData.currency === 'USD'
      ? `$${Number(icFormData.amount).toLocaleString()}`
      : `${icFormData.currency} ${Number(icFormData.amount).toLocaleString()}`;

    const newTxn = {
      id: `IC-00${intercompanyList.length + 1}`,
      from: icFormData.from,
      to: icFormData.to,
      type: icFormData.type,
      amount: formattedAmount,
      currency: icFormData.currency,
      date: icFormData.date,
      status: 'Pending'
    };

    setIntercompanyList([...intercompanyList, newTxn]);
    setIsIcModalOpen(false);
    setIcErrors({ date: false, amount: false });
    setToast('Intercompany transaction added successfully!');
    setIcFormData({ date: '', from: entityList[0]?.name || 'Cognexia India', to: entityList[1]?.name || 'Cognexia US Inc', type: 'Intercompany Loan', currency: 'USD', amount: '', memo: '' });
  };

  // --- NEW HANDLER FOR COA ---
  const handleAddCoa = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      code: !coaFormData.code.trim(),
      name: !coaFormData.name.trim()
    };
    setCoaErrors(newErrors);

    if (newErrors.code || newErrors.name) return;

    setCoaList([...coaList, { ...coaFormData, currency: 'Multi' }]);
    setIsCoaModalOpen(false);
    setToast('Account added to Global COA!');
    setCoaFormData({ code: '', name: '', type: 'Asset', entities: 'All' });
  };

  if (!isAuthenticated) return <div className="p-10 text-white font-sans">Please login...</div>;

  return (
    <div className="p-6 space-y-6 relative font-sans min-h-screen text-white">
      {toast && <Toast message={toast} onDone={() => setToast('')} />}

      {/* --- ADD ENTITY MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-800">Add New Entity (Lite)</h2>
              <button onClick={() => { setIsModalOpen(false); setErrors({ name: false }); }} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddEntity} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Entity Name</label>
                <input
                  type="text"
                  className={`w-full px-3 py-2 border rounded-lg outline-none text-gray-900 transition-colors ${errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:ring-2 focus:ring-blue-500'}`}
                  placeholder="e.g., Cognexia France SARL"
                  value={formData.name}
                  onChange={(e) => { setFormData({ ...formData, name: e.target.value }); if (e.target.value) setErrors({ name: false }); }}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1.5 font-medium">This field is required</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Country</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5">🇺🇸</span>
                  <input type="text" className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900" value={formData.country} readOnly />
                  <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Base Currency</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white" value={formData.currency} onChange={(e) => setFormData({ ...formData, currency: e.target.value })}>
                  <option>USD - US Dollar</option>
                  <option>INR - Indian Rupee</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Employee Count</label>
                <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900" value={formData.employees} onChange={(e) => setFormData({ ...formData, employees: parseInt(e.target.value) })} />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">Add Entity</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- ADD INTERCOMPANY TRANSACTION MODAL --- */}
      {isIcModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-800">Create New Intercompany Transaction</h2>
              <button onClick={() => { setIsIcModalOpen(false); setIcErrors({ date: false, amount: false }); }} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddIntercompany} className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Transaction Date <span className="text-red-500">*</span></label>
                  <input
                    type="date"
                    className={`w-full px-3 py-2 border rounded-lg outline-none text-gray-900 transition-colors ${icErrors.date ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:ring-2 focus:ring-blue-500'}`}
                    value={icFormData.date}
                    onChange={(e) => { setIcFormData({ ...icFormData, date: e.target.value }); if (e.target.value) setIcErrors({ ...icErrors, date: false }); }}
                  />
                  {icErrors.date && <p className="text-red-500 text-xs mt-1.5 font-medium">This field is required</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Source Entity</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white" value={icFormData.from} onChange={(e) => setIcFormData({ ...icFormData, from: e.target.value })}>
                    {entityList.map(e => <option key={e.name} value={e.name}>{e.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Destination Entity</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white" value={icFormData.to} onChange={(e) => setIcFormData({ ...icFormData, to: e.target.value })}>
                    {entityList.map(e => <option key={e.name} value={e.name}>{e.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Transaction Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white" value={icFormData.type} onChange={(e) => setIcFormData({ ...icFormData, type: e.target.value })}>
                    <option>Intercompany Loan</option>
                    <option>Service Fee</option>
                    <option>Royalty</option>
                    <option>Management Fee</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Currency</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white" value={icFormData.currency} onChange={(e) => setIcFormData({ ...icFormData, currency: e.target.value })}>
                    <option value="USD">USD</option>
                    <option value="INR">INR</option>
                    <option value="GBP">GBP</option>
                    <option value="SGD">SGD</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Amount <span className="text-red-500">*</span></label>
                  <input
                    type="number"
                    className={`w-full px-3 py-2 border rounded-lg outline-none text-gray-900 transition-colors ${icErrors.amount ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:ring-2 focus:ring-blue-500'}`}
                    value={icFormData.amount}
                    onChange={(e) => { setIcFormData({ ...icFormData, amount: e.target.value }); if (e.target.value) setIcErrors({ ...icErrors, amount: false }); }}
                  />
                  {icErrors.amount && <p className="text-red-500 text-xs mt-1.5 font-medium">This field is required</p>}
                </div>
              </div>

              <div className="flex gap-3 pt-2 justify-end">
                <button type="button" onClick={() => setIsIcModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">Create Transaction</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- ADD GLOBAL COA MODAL (NEW) --- */}
      {isCoaModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-800">Add Global COA</h2>
              <button onClick={() => { setIsCoaModalOpen(false); setCoaErrors({ code: false, name: false }); }} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddCoa} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Account Code</label>
                <input
                  type="text"
                  placeholder="e.g. 1000"
                  className={`w-full px-3 py-2 border rounded-lg outline-none text-gray-900 ${coaErrors.code ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:ring-2 focus:ring-blue-500'}`}
                  value={coaFormData.code}
                  onChange={(e) => { setCoaFormData({ ...coaFormData, code: e.target.value }); if (e.target.value) setCoaErrors({ ...coaErrors, code: false }); }}
                />
                {coaErrors.code && <p className="text-red-500 text-xs mt-1">This field is required</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Account Name</label>
                <input
                  type="text"
                  placeholder="e.g. Cash"
                  className={`w-full px-3 py-2 border rounded-lg outline-none text-gray-900 ${coaErrors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:ring-2 focus:ring-blue-500'}`}
                  value={coaFormData.name}
                  onChange={(e) => { setCoaFormData({ ...coaFormData, name: e.target.value }); if (e.target.value) setCoaErrors({ ...coaErrors, name: false }); }}
                />
                {coaErrors.name && <p className="text-red-500 text-xs mt-1">This field is required</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white" value={coaFormData.type} onChange={(e) => setCoaFormData({ ...coaFormData, type: e.target.value })}>
                    <option>Asset</option>
                    <option>Liability</option>
                    <option>Revenue</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Entities</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white" value={coaFormData.entities} onChange={(e) => setCoaFormData({ ...coaFormData, entities: e.target.value })}>
                    <option>All</option>
                    <option>Selected</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsCoaModalOpen(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">Save Account</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- PAGE HEADER --- */}
      <div>
        <h1 className="text-2xl font-bold text-white">Global Operations</h1>
        <p className="text-gray-400 text-sm mt-1">Multi-currency, multi-entity, intercompany & global chart of accounts</p>
      </div>

      {/* --- STAT CARDS --- */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Global Revenue', value: '$27,10,000', color: 'text-white' },
          { label: 'Active Entities', value: entityList.length.toString(), color: 'text-blue-400' },
          { label: 'Currencies', value: '5', color: 'text-emerald-400' },
          { label: 'Intercompany Txns', value: '$83,500', color: 'text-amber-400' },
        ].map(s => (
          <div key={s.label} className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <div className="text-gray-400 text-sm mb-2">{s.label}</div>
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* --- TABS --- */}
      <div className="border-b border-gray-800">
        <div className="flex">
          {['Multi Currency', 'Multi Entity', 'Intercompany', 'Global COA'].map((tab, i) => (
            <button key={tab} onClick={() => setActiveTab(i)} className={`px-4 py-2.5 text-sm border-b-2 transition-colors ${activeTab === i ? 'text-blue-400 font-medium border-blue-400' : 'text-gray-500 border-transparent hover:text-gray-400'}`}>{tab}</button>
          ))}
        </div>
      </div>

      {/* --- TAB CONTENT --- */}
      <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800">

        {activeTab === 0 && (
          <table className="w-full">
            <thead className="bg-gray-800/50">
              <tr>{['Currency Pair', 'Exchange Rate', '24h Change', 'Trend'].map(h => <th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3 uppercase">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {fxRates.map(r => (
                <tr key={r.pair} className="hover:bg-gray-800/40">
                  <td className="px-4 py-3.5 text-sm font-medium">{r.pair}</td>
                  <td className="px-4 py-3.5 text-amber-400 font-mono">{r.rate}</td>
                  <td className={`px-4 py-3.5 text-sm ${r.trending ? 'text-emerald-400' : 'text-rose-400'}`}>{r.change}%</td>
                  <td className="px-4 py-3.5"><span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${r.trending ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>{r.trending ? 'Up' : 'Down'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 1 && (
          <>
            <div className="px-4 py-3 border-b border-gray-800 flex items-center justify-between bg-gray-900">
              <h2 className="text-white font-semibold text-sm">Legal Entities</h2>
              <button onClick={() => setIsModalOpen(true)} className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">+ Add Entity</button>
            </div>
            <table className="w-full">
              <thead className="bg-gray-800/50">
                <tr>{['Entity', 'Country', 'Base Currency', 'Revenue (USD)', 'Employees', 'Status'].map(h => <th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3 uppercase">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {entityList.map((e, idx) => (
                  <tr key={idx} className="hover:bg-gray-800/40">
                    <td className="px-4 py-3.5 text-sm font-medium">{e.name}</td>
                    <td className="px-4 py-3.5 text-gray-300 text-sm">{e.country}</td>
                    <td className="px-4 py-3.5 text-blue-400 text-sm font-mono">{e.currency}</td>
                    <td className="px-4 py-3.5 text-emerald-400 text-sm font-semibold">{e.revenue}</td>
                    <td className="px-4 py-3.5 text-gray-300 text-sm">{e.employees}</td>
                    <td className="px-4 py-3.5"><span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold">{e.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {activeTab === 2 && (
          <>
            <div className="px-4 py-3 border-b border-gray-800 flex items-center justify-between bg-gray-900">
              <h2 className="text-white font-semibold text-sm">Intercompany Transactions</h2>
              <button onClick={() => setIsIcModalOpen(true)} className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">+ Add Transaction</button>
            </div>
            <table className="w-full">
              <thead className="bg-gray-800/50">
                <tr>{['ID', 'Date', 'From', 'To', 'Type', 'Amount', 'Status'].map(h => <th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3 uppercase">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {intercompanyList.map(t => (
                  <tr key={t.id} className="hover:bg-gray-800/40">
                    <td className="px-4 py-3.5 text-blue-400 font-mono text-sm">{t.id}</td>
                    <td className="px-4 py-3.5 text-sm text-gray-300">{t.date}</td>
                    <td className="px-4 py-3.5 text-sm">{t.from}</td>
                    <td className="px-4 py-3.5 text-sm">{t.to}</td>
                    <td className="px-4 py-3.5 text-xs text-violet-400">{t.type}</td>
                    <td className="px-4 py-3.5 text-amber-400 font-semibold">{t.amount}</td>
                    <td className="px-4 py-3.5"><span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded text-[10px]">{t.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {activeTab === 3 && (
          <>
            {/* Global COA Header with Add Button */}
            <div className="px-4 py-3 border-b border-gray-800 flex items-center justify-between bg-gray-900">
              <h2 className="text-white font-semibold text-sm">Chart of Accounts</h2>
              <button onClick={() => setIsCoaModalOpen(true)} className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">+ Add Account</button>
            </div>
            <table className="w-full">
              <thead className="bg-gray-800/50">
                <tr>{['Code', 'Name', 'Type', 'Entities'].map(h => <th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3 uppercase">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {coaList.map(a => (
                  <tr key={a.code} className="hover:bg-gray-800/40">
                    <td className="px-4 py-3.5 text-blue-400 font-mono text-sm">{a.code}</td>
                    <td className="px-4 py-3.5 text-sm font-medium">{a.name}</td>
                    <td className="px-4 py-3.5"><span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${typeColor[a.type]}`}>{a.type}</span></td>
                    <td className="px-4 py-3.5 text-gray-300 text-sm">{a.entities}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

      </div>
    </div>
  );
}