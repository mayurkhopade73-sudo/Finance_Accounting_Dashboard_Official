'use client';
import { useState } from 'react';
import { Plus, Download, Search, Trash2 } from 'lucide-react';
import { Modal, Toast, FormField, inputCls, selectCls } from '../../components/Modal';

const initExpenses = [
  { id: 'EXP-001', desc: 'Cloud Server - AWS', category: 'Technology', amount: '$3,200', date: 'Mar 10, 2026', submittedBy: 'Super Admin', status: 'Approved' },
  { id: 'EXP-002', desc: 'Office Supplies', category: 'Admin', amount: '$450', date: 'Mar 08, 2026', submittedBy: 'Accounts Team', status: 'Approved' },
  { id: 'EXP-003', desc: 'Team Lunch - Client Meeting', category: 'Entertainment', amount: '$620', date: 'Mar 07, 2026', submittedBy: 'Sales Team', status: 'Pending' },
  { id: 'EXP-004', desc: 'Flight - Delhi Conference', category: 'Travel', amount: '$1,840', date: 'Mar 05, 2026', submittedBy: 'Finance Manager', status: 'Approved' },
  { id: 'EXP-005', desc: 'Software License - Figma', category: 'Technology', amount: '$240', date: 'Mar 02, 2026', submittedBy: 'Super Admin', status: 'Rejected' },
];

const statusStyle: Record<string, string> = {
  Approved: 'bg-emerald-500/20 text-emerald-400', Pending: 'bg-amber-500/20 text-amber-400', Rejected: 'bg-rose-500/20 text-rose-400',
};

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState(initExpenses);
  const [search, setSearch] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({ desc: '', category: 'Technology', amount: '', date: '' });

  const filtered = expenses.filter(e => e.desc.toLowerCase().includes(search.toLowerCase()) || e.category.toLowerCase().includes(search.toLowerCase()));

  const handleCreate = () => {
    if (!form.desc || !form.amount) return;
    const newExp = { id: `EXP-00${expenses.length + 1}`, desc: form.desc, category: form.category, amount: `$${form.amount}`, date: form.date || 'Mar 13, 2026', submittedBy: 'Super Admin', status: 'Pending' };
    setExpenses(prev => [newExp, ...prev]);
    setForm({ desc: '', category: 'Technology', amount: '', date: '' });
    setShowCreate(false);
    setToast('Expense submitted for approval!');
  };

  const handleDelete = (id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
    setToast('Expense deleted.');
  };

  const handleApprove = (id: string) => {
    setExpenses(prev => prev.map(e => e.id === id ? { ...e, status: 'Approved' } : e));
    setToast('Expense approved!');
  };

  const handleExport = () => {
    const csv = ['ID,Description,Category,Amount,Date,Submitted By,Status', ...expenses.map(e => `${e.id},${e.desc},${e.category},${e.amount},${e.date},${e.submittedBy},${e.status}`)].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'expenses.csv'; a.click();
  };

  return (
    <div className="p-6 space-y-6">
      {toast && <Toast message={toast} onDone={() => setToast('')} />}
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-800">Expenses</h1><p className="text-gray-500 text-sm mt-1">Track and manage all business expenses</p></div>
        <div className="flex gap-2">
          <button onClick={handleExport} className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50"><Download className="w-4 h-4" /> Export</button>
          <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"><Plus className="w-4 h-4" /> New Expense</button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Expenses', value: expenses.length.toString(), color: 'text-white' },
          { label: 'Pending', value: expenses.filter(e=>e.status==='Pending').length.toString(), color: 'text-amber-400' },
          { label: 'This Month', value: `$${expenses.filter(e=>e.status!=='Rejected').reduce((s,e)=>s+parseFloat(e.amount.replace(/[$,]/g,'')),0).toLocaleString()}`, color: 'text-emerald-400' },
          { label: 'Rejected', value: expenses.filter(e=>e.status==='Rejected').length.toString(), color: 'text-rose-400' },
        ].map(s => (
          <div key={s.label} className="bg-gray-900 rounded-xl p-5"><div className="text-gray-400 text-sm mb-1">{s.label}</div><div className={`text-2xl font-bold ${s.color}`}>{s.value}</div></div>
        ))}
      </div>

      <div className="bg-gray-900 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-gray-700">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search expenses..." className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-300 focus:outline-none" />
          </div>
        </div>
        <table className="w-full">
          <thead><tr className="bg-gray-800 border-b border-gray-700">{['ID','Description','Category','Amount','Date','Submitted By','Status','Actions'].map(h=><th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-gray-800">
            {filtered.map(exp => (
              <tr key={exp.id} className="hover:bg-gray-800/60">
                <td className="px-4 py-3.5 text-blue-400 text-sm font-mono">{exp.id}</td>
                <td className="px-4 py-3.5 text-white text-sm font-medium">{exp.desc}</td>
                <td className="px-4 py-3.5 text-gray-300 text-sm">{exp.category}</td>
                <td className="px-4 py-3.5 text-rose-400 text-sm font-semibold">{exp.amount}</td>
                <td className="px-4 py-3.5 text-gray-400 text-sm">{exp.date}</td>
                <td className="px-4 py-3.5 text-gray-300 text-sm">{exp.submittedBy}</td>
                <td className="px-4 py-3.5"><span className={`px-2 py-0.5 rounded text-xs font-medium ${statusStyle[exp.status]}`}>{exp.status}</span></td>
                <td className="px-4 py-3.5 flex gap-1.5">
                  {exp.status === 'Pending' && <button onClick={() => handleApprove(exp.id)} className="px-2 py-1 bg-emerald-600 text-white rounded text-xs hover:bg-emerald-700">Approve</button>}
                  <button onClick={() => handleDelete(exp.id)} className="p-1.5 text-gray-500 hover:text-rose-400 hover:bg-gray-700 rounded transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Submit New Expense">
        <div className="space-y-4">
          <FormField label="Description"><input className={inputCls} placeholder="e.g. Team Lunch" value={form.desc} onChange={e=>setForm(f=>({...f,desc:e.target.value}))} /></FormField>
          <FormField label="Category"><select className={selectCls} value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))}><option>Technology</option><option>Travel</option><option>Entertainment</option><option>Admin</option><option>Marketing</option></select></FormField>
          <FormField label="Amount ($)"><input type="number" className={inputCls} placeholder="e.g. 1200" value={form.amount} onChange={e=>setForm(f=>({...f,amount:e.target.value}))} /></FormField>
          <FormField label="Date"><input type="date" className={inputCls} value={form.date} onChange={e=>setForm(f=>({...f,date:e.target.value}))} /></FormField>
          <div className="flex gap-3 pt-2">
            <button onClick={() => setShowCreate(false)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
            <button onClick={handleCreate} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Submit Expense</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
