'use client';
import { useState } from 'react';
import { Plus, Download, Search, Eye, Edit2 } from 'lucide-react';
import { Modal, Toast, FormField, inputCls, selectCls } from '../../components/Modal';
import Link from 'next/link';

const initInvoices = [
  { id: 'INV-2046', client: 'Acme Corporation', amount: '$12,400', date: 'Mar 10, 2026', due: 'Mar 25, 2026', status: 'Overdue' },
  { id: 'INV-2045', client: 'TechVentures Ltd', amount: '$8,200', date: 'Mar 08, 2026', due: 'Mar 28, 2026', status: 'Sent' },
  { id: 'INV-2044', client: 'GlobalSoft Inc', amount: '$22,500', date: 'Mar 05, 2026', due: 'Apr 05, 2026', status: 'Paid' },
  { id: 'INV-2043', client: 'FinTech Solutions', amount: '$5,750', date: 'Mar 01, 2026', due: 'Mar 16, 2026', status: 'Paid' },
  { id: 'INV-2042', client: 'DataCorp', amount: '$18,900', date: 'Feb 25, 2026', due: 'Mar 11, 2026', status: 'Overdue' },
];

const statusStyle: Record<string, string> = {
  Paid: 'bg-emerald-500/20 text-emerald-400', Sent: 'bg-blue-500/20 text-blue-400',
  Overdue: 'bg-rose-500/20 text-rose-400', Draft: 'bg-gray-500/20 text-gray-400',
};

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState(initInvoices);
  const [search, setSearch] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({ client: '', amount: '', due: '', status: 'Draft' });
  const [editInv, setEditInv] = useState<typeof initInvoices[0] | null>(null);

  const filtered = invoices.filter(i => i.client.toLowerCase().includes(search.toLowerCase()) || i.id.includes(search));

  const handleCreate = () => {
    if (!form.client || !form.amount) return;
    const newInv = { id: `INV-${2047 + invoices.length}`, client: form.client, amount: `$${form.amount}`, date: 'Mar 13, 2026', due: form.due || 'Apr 13, 2026', status: form.status };
    setInvoices(prev => [newInv, ...prev]);
    setForm({ client: '', amount: '', due: '', status: 'Draft' });
    setShowCreate(false);
    setToast('Invoice created successfully!');
  };

  const handleEdit = () => {
    if (!editInv) return;
    setInvoices(prev => prev.map(i => i.id === editInv.id ? editInv : i));
    setEditInv(null);
    setToast('Invoice updated successfully!');
  };

  const handleExport = () => {
    const csv = ['ID,Client,Amount,Date,Due,Status', ...invoices.map(i => `${i.id},${i.client},${i.amount},${i.date},${i.due},${i.status}`)].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'invoices.csv'; a.click();
  };

  return (
    <div className="p-6 space-y-6">
      {toast && <Toast message={toast} onDone={() => setToast('')} />}
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-800">Invoices</h1><p className="text-gray-500 text-sm mt-1">Manage customer invoices</p></div>
        <div className="flex gap-2">
          <button onClick={handleExport} className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50"><Download className="w-4 h-4" /> Export</button>
          <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"><Plus className="w-4 h-4" /> New Invoice</button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[{ label: 'Total', value: invoices.length.toString() }, { label: 'Paid', value: invoices.filter(i=>i.status==='Paid').length.toString() }, { label: 'Overdue', value: invoices.filter(i=>i.status==='Overdue').length.toString() }, { label: 'Total Value', value: `$${invoices.reduce((s,i)=>s+parseFloat(i.amount.replace(/[$,]/g,'')),0).toLocaleString()}` }].map(s => (
          <div key={s.label} className="bg-gray-900 rounded-xl p-5"><div className="text-gray-400 text-sm mb-1">{s.label}</div><div className="text-2xl font-bold text-white">{s.value}</div></div>
        ))}
      </div>

      <div className="bg-gray-900 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-gray-700">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search invoices..." className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-blue-500" />
          </div>
        </div>
        <table className="w-full">
          <thead><tr className="bg-gray-800 border-b border-gray-700">{['Invoice #','Client','Amount','Date','Due Date','Status','Actions'].map(h=><th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-gray-800">
            {filtered.map(inv => (
              <tr key={inv.id} className="hover:bg-gray-800/60">
                <td className="px-4 py-3.5 text-blue-400 text-sm font-mono">{inv.id}</td>
                <td className="px-4 py-3.5 text-white text-sm font-medium">{inv.client}</td>
                <td className="px-4 py-3.5 text-emerald-400 text-sm font-semibold">{inv.amount}</td>
                <td className="px-4 py-3.5 text-gray-400 text-sm">{inv.date}</td>
                <td className="px-4 py-3.5 text-gray-400 text-sm">{inv.due}</td>
                <td className="px-4 py-3.5"><span className={`px-2 py-0.5 rounded text-xs font-medium ${statusStyle[inv.status]}`}>{inv.status}</span></td>
                <td className="px-4 py-3.5 flex gap-2">
                  <Link href={`/finance/invoices/${inv.id}`} className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-gray-700 rounded transition-colors"><Eye className="w-3.5 h-3.5" /></Link>
                  <button onClick={() => setEditInv({...inv})} className="p-1.5 text-gray-400 hover:text-amber-400 hover:bg-gray-700 rounded transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Modal */}
      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Create New Invoice">
        <div className="space-y-4">
          <FormField label="Client Name"><input className={inputCls} placeholder="e.g. Acme Corporation" value={form.client} onChange={e=>setForm(f=>({...f,client:e.target.value}))} /></FormField>
          <FormField label="Amount ($)"><input type="number" className={inputCls} placeholder="e.g. 12400" value={form.amount} onChange={e=>setForm(f=>({...f,amount:e.target.value}))} /></FormField>
          <FormField label="Due Date"><input type="date" className={inputCls} value={form.due} onChange={e=>setForm(f=>({...f,due:e.target.value}))} /></FormField>
          <FormField label="Status"><select className={selectCls} value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))}><option>Draft</option><option>Sent</option></select></FormField>
          <div className="flex gap-3 pt-2">
            <button onClick={() => setShowCreate(false)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
            <button onClick={handleCreate} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Create Invoice</button>
          </div>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal open={!!editInv} onClose={() => setEditInv(null)} title="Edit Invoice">
        {editInv && <div className="space-y-4">
          <FormField label="Client Name"><input className={inputCls} value={editInv.client} onChange={e=>setEditInv(i=>i?{...i,client:e.target.value}:i)} /></FormField>
          <FormField label="Amount"><input className={inputCls} value={editInv.amount} onChange={e=>setEditInv(i=>i?{...i,amount:e.target.value}:i)} /></FormField>
          <FormField label="Due Date"><input className={inputCls} value={editInv.due} onChange={e=>setEditInv(i=>i?{...i,due:e.target.value}:i)} /></FormField>
          <FormField label="Status"><select className={selectCls} value={editInv.status} onChange={e=>setEditInv(i=>i?{...i,status:e.target.value}:i)}><option>Draft</option><option>Sent</option><option>Paid</option><option>Overdue</option></select></FormField>
          <div className="flex gap-3 pt-2">
            <button onClick={() => setEditInv(null)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
            <button onClick={handleEdit} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Save Changes</button>
          </div>
        </div>}
      </Modal>
    </div>
  );
}
