'use client';
import { useState } from 'react';
import { Plus, Download } from 'lucide-react';
import { Modal, Toast, FormField, inputCls, selectCls } from '../../components/Modal';

const initEntries = [
  { id: 'JE-001', date: 'Mar 12, 2026', account: 'Cash & Equivalents', description: 'Client payment received - Acme Corp', debit: '$12,400', credit: '—', balance: '$2,37,500' },
  { id: 'JE-002', date: 'Mar 12, 2026', account: 'Accounts Receivable', description: 'Client payment received - Acme Corp', debit: '—', credit: '$12,400', balance: '$48,200' },
  { id: 'JE-003', date: 'Mar 11, 2026', account: 'Office Rent Expense', description: 'Monthly rent - Mumbai Office', debit: '$3,200', credit: '—', balance: '$38,400' },
  { id: 'JE-004', date: 'Mar 11, 2026', account: 'Cash & Equivalents', description: 'Monthly rent - Mumbai Office', debit: '—', credit: '$3,200', balance: '$2,25,100' },
  { id: 'JE-005', date: 'Mar 10, 2026', account: 'Revenue - Services', description: 'Invoice INV-2045 raised', debit: '—', credit: '$8,200', balance: '$7,45,000' },
];

export default function GeneralLedgerPage() {
  const [entries, setEntries] = useState(initEntries);
  const [showCreate, setShowCreate] = useState(false);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({ account: '', description: '', debit: '', credit: '' });

  const handleCreate = () => {
    if (!form.account || !form.description) return;
    const newEntry = {
      id: `JE-00${entries.length + 1}`,
      date: 'Mar 13, 2026',
      account: form.account,
      description: form.description,
      debit: form.debit ? `$${form.debit}` : '—',
      credit: form.credit ? `$${form.credit}` : '—',
      balance: '$0',
    };
    setEntries(prev => [newEntry, ...prev]);
    setForm({ account: '', description: '', debit: '', credit: '' });
    setShowCreate(false);
    setToast('Journal entry posted successfully!');
  };

  const handleExport = () => {
    const csv = ['ID,Date,Account,Description,Debit,Credit,Balance', ...entries.map(e => `${e.id},${e.date},${e.account},${e.description},${e.debit},${e.credit},${e.balance}`)].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'general-ledger.csv'; a.click();
  };

  return (
    <div className="p-6 space-y-6">
      {toast && <Toast message={toast} onDone={() => setToast('')} />}
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-white-800">General Ledger</h1><p className="text-gray-500 text-sm mt-1">All journal entries and account balances</p></div>
        <div className="flex gap-2">
          <button onClick={handleExport} className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50"><Download className="w-4 h-4" /> Export</button>
          <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"><Plus className="w-4 h-4" /> Journal Entry</button>
        </div>
      </div>

      <div className="bg-gray-900 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead><tr className="bg-gray-800 border-b border-gray-700">{['Entry ID','Date','Account','Description','Debit','Credit','Balance'].map(h=><th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-gray-800">
            {entries.map(e => (
              <tr key={e.id} className="hover:bg-gray-800/60">
                <td className="px-4 py-3.5 text-blue-400 text-sm font-mono">{e.id}</td>
                <td className="px-4 py-3.5 text-gray-400 text-sm">{e.date}</td>
                <td className="px-4 py-3.5 text-white text-sm font-medium">{e.account}</td>
                <td className="px-4 py-3.5 text-gray-300 text-sm">{e.description}</td>
                <td className="px-4 py-3.5 text-emerald-400 text-sm">{e.debit}</td>
                <td className="px-4 py-3.5 text-rose-400 text-sm">{e.credit}</td>
                <td className="px-4 py-3.5 text-amber-400 text-sm font-semibold">{e.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="New Journal Entry">
        <div className="space-y-4">
          <FormField label="Account"><select className={selectCls} value={form.account} onChange={e=>setForm(f=>({...f,account:e.target.value}))}><option value="">Select account...</option><option>Cash & Equivalents</option><option>Accounts Receivable</option><option>Accounts Payable</option><option>Revenue - Services</option><option>Office Rent Expense</option><option>Salaries Expense</option></select></FormField>
          <FormField label="Description"><input className={inputCls} placeholder="Transaction description" value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} /></FormField>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Debit ($)"><input type="number" className={inputCls} placeholder="0.00" value={form.debit} onChange={e=>setForm(f=>({...f,debit:e.target.value,credit:''}))} /></FormField>
            <FormField label="Credit ($)"><input type="number" className={inputCls} placeholder="0.00" value={form.credit} onChange={e=>setForm(f=>({...f,credit:e.target.value,debit:''}))} /></FormField>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={() => setShowCreate(false)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
            <button onClick={handleCreate} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Post Entry</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
   