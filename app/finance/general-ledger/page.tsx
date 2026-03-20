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
  const [form, setForm] = useState({ date: '', description: '', currency: 'USD', attachment: null as File | null });
  const [rows, setRows] = useState([{ account: '', debit: '', credit: '' }, { account: '', debit: '', credit: '' }]);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [search, setSearch] = useState('');
  const [filterAccount, setFilterAccount] = useState('All Accounts');

  const filteredEntries = entries.filter(e => {
  const q = search.trim().toLowerCase();
  const matchSearch = q === '' || 
    e.description.toLowerCase().includes(q) ||
    e.account.toLowerCase().includes(q) ||
    e.id.toLowerCase().includes(q) ||
    e.date.toLowerCase().includes(q);
  const matchAccount = filterAccount === 'All Accounts' || e.account === filterAccount;
  return matchSearch && matchAccount;
}); 

  const handleCreate = () => {
  const newErrors: Record<string, boolean> = {};
  if (!form.date) newErrors.date = true;
  if (!form.description) newErrors.description = true;
  const validRows = rows.filter(r => r.account);
  if (validRows.length === 0) newErrors.rows = true;
  if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

  validRows.forEach((r, i) => {
    const newEntry = {
      id: `JE-00${entries.length + i + 1}`,
      date: new Date(form.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      account: r.account,
      description: form.description,
      debit: r.debit ? `$${r.debit}` : '—',
      credit: r.credit ? `$${r.credit}` : '—',
      balance: '$0',
    };
    setEntries(prev => [...prev, newEntry]);
  });

  setForm({ date: '', description: '', currency: 'USD', attachment: null });
  setRows([{ account: '', debit: '', credit: '' }, { account: '', debit: '', credit: '' }]);
  setErrors({});
  setShowCreate(false);
  setToast('Journal entry posted successfully!');
};

  const handleExport = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    const tableRows = entries.map(e => `
      <tr>
        <td>${e.id}</td>
        <td>${e.date}</td>
        <td>${e.account}</td>
        <td>${e.description}</td>
        <td style="color:#10b981">${e.debit}</td>
        <td style="color:#f43f5e">${e.credit}</td>
        <td style="color:#f59e0b;font-weight:600">${e.balance}</td>
      </tr>
    `).join('');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>General Ledger</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 32px; color: #111; }
            h1 { font-size: 24px; margin-bottom: 4px; }
            p { color: #666; font-size: 13px; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; font-size: 13px; }
            th { background: #1f2937; color: #fff; text-align: left; padding: 10px 12px; }
            td { padding: 10px 12px; border-bottom: 1px solid #e5e7eb; }
            tr:nth-child(even) { background: #f9fafb; }
          </style>
        </head>
        <body>
          <h1>General Ledger</h1>
          <p>All journal entries and account balances — Exported on ${new Date().toLocaleDateString()}</p>
          <table>
            <thead>
              <tr>
                <th>Entry ID</th><th>Date</th><th>Account</th>
                <th>Description</th><th>Debit</th><th>Credit</th><th>Balance</th>
              </tr>
            </thead>
            <tbody>${tableRows}</tbody>
          </table>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="p-6 space-y-6">
      {toast && <Toast message={toast} onDone={() => setToast('')} />}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white-800">General Ledger</h1>
          <p className="text-gray-500 text-sm mt-1">All journal entries and account balances</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleExport} className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">
            <Download className="w-4 h-4" /> Export
          </button>
          <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
            <Plus className="w-4 h-4" /> Journal Entry
          </button>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex gap-3">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by description..."
          className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 focus:outline-none focus:border-blue-400"
        />
        <select
          value={filterAccount}
          onChange={e => setFilterAccount(e.target.value)}
          className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-blue-400"
        >
          <option>All Accounts</option>
          <option>Cash & Equivalents</option>
          <option>Accounts Receivable</option>
          <option>Accounts Payable</option>
          <option>Revenue - Services</option>
          <option>Office Rent Expense</option>
          <option>Salaries Expense</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-gray-900 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-800 border-b border-gray-700">
              {['Entry ID','Date','Account','Description','Debit','Credit','Balance'].map(h =>
                <th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3">{h}</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filteredEntries.length > 0 ? filteredEntries.map(e => (
              <tr key={e.id} className="hover:bg-gray-800/60">
                <td className="px-4 py-3.5 text-blue-400 text-sm font-mono">{e.id}</td>
                <td className="px-4 py-3.5 text-gray-400 text-sm">{e.date}</td>
                <td className="px-4 py-3.5 text-white text-sm font-medium">{e.account}</td>
                <td className="px-4 py-3.5 text-gray-300 text-sm">{e.description}</td>
                <td className="px-4 py-3.5 text-emerald-400 text-sm">{e.debit}</td>
                <td className="px-4 py-3.5 text-rose-400 text-sm">{e.credit}</td>
                <td className="px-4 py-3.5 text-amber-400 text-sm font-semibold">{e.balance}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-500 text-sm">No entries found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* New Journal Entry Modal */}
      {/* New Journal Entry Modal */}
<Modal open={showCreate} onClose={() => { setShowCreate(false); setErrors({}); }} title="Journal Entry" size="lg">
  <div className="space-y-4">

    {/* Date */}
    <div>
      <input
        type="date"
        className={`${inputCls} ${errors.date ? 'border-red-500' : ''}`}
        value={form.date}
        onChange={e => { setForm(f => ({ ...f, date: e.target.value })); setErrors(er => ({ ...er, date: false })); }}
      />
      {errors.date && <p className="text-red-500 text-xs mt-1">Date is required</p>}
    </div>

    {/* Description */}
    <div>
      <input
        className={`${inputCls} ${errors.description ? 'border-red-500' : ''}`}
        placeholder="Description"
        value={form.description}
        onChange={e => { setForm(f => ({ ...f, description: e.target.value })); setErrors(er => ({ ...er, description: false })); }}
      />
      {errors.description && <p className="text-red-500 text-xs mt-1">Description is required</p>}
    </div>

    {/* Currency */}
    <select
      className={selectCls}
      value={form.currency}
      onChange={e => setForm(f => ({ ...f, currency: e.target.value }))}
    >
      <option>USD</option>
      <option>INR</option>
      <option>EUR</option>
      <option>GBP</option>
    </select>

    {/* Entry Rows */}
    <div className="space-y-2">
      {errors.rows && <p className="text-red-500 text-xs">At least one account row is required</p>}
      {rows.map((row, i) => (
        <div key={i} className="grid grid-cols-3 gap-2">
          <select
            className={`${selectCls} ${errors.rows && !row.account ? 'border-red-500' : ''}`}
            value={row.account}
            onChange={e => { const updated = [...rows]; updated[i].account = e.target.value; setRows(updated); setErrors(er => ({ ...er, rows: false })); }}
          >
            <option value="">Select account</option>
            <option>Cash & Equivalents</option>
            <option>Accounts Receivable</option>
            <option>Accounts Payable</option>
            <option>Revenue - Services</option>
            <option>Office Rent Expense</option>
            <option>Salaries Expense</option>
          </select>
          <input
            type="number"
            className={inputCls}
            placeholder="Debit"
            value={row.debit}
            onChange={e => { const updated = [...rows]; updated[i].debit = e.target.value; updated[i].credit = ''; setRows(updated); }}
          />
          <input
            type="number"
            className={inputCls}
            placeholder="Credit"
            value={row.credit}
            onChange={e => { const updated = [...rows]; updated[i].credit = e.target.value; updated[i].debit = ''; setRows(updated); }}
          />
        </div>
      ))}
    </div>

    {/* Attachment */}
    <div>
      <label className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-50 text-sm text-gray-500 w-fit">
        <input
          type="file"
          className="hidden"
          onChange={e => { const file = e.target.files?.[0]; if (file) setForm(f => ({ ...f, attachment: file })); }}
        />
        {form.attachment ? form.attachment.name : 'Choose File'}
      </label>
    </div>

    {/* Actions */}
    <div className="flex gap-3 pt-2">
      <button
        onClick={() => { setShowCreate(false); setErrors({}); setRows([{ account: '', debit: '', credit: '' }, { account: '', debit: '', credit: '' }]); }}
        className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50"
      >
        Add Row
      </button>
      <button
        onClick={() => setRows(r => [...r, { account: '', debit: '', credit: '' }])}
        className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50"
      >
        + Add Row
      </button>
      <button
        onClick={handleCreate}
        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
      >
        Post Entry
      </button>
    </div>

  </div>
</Modal>
    </div>
  );
}