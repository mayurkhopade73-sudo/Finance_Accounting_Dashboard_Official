'use client';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Modal, Toast, FormField, inputCls, selectCls } from '../../components/Modal';

const initBills = [
  { invoice: 'BILL-0091', vendor: 'SupplierCo Ltd', amount: '$4,200', due: 'Mar 15, 2026', category: 'Raw Materials', status: 'Overdue' },
  { invoice: 'BILL-0090', vendor: 'TechParts Inc', amount: '$1,800', due: 'Mar 20, 2026', category: 'Technology', status: 'Due Soon' },
  { invoice: 'BILL-0089', vendor: 'Office World', amount: '$620', due: 'Mar 25, 2026', category: 'Office Supplies', status: 'Pending' },
  { invoice: 'BILL-0088', vendor: 'Logistics Pro', amount: '$3,100', due: 'Feb 28, 2026', category: 'Logistics', status: 'Paid' },
  { invoice: 'BILL-0087', vendor: 'CloudHost GmbH', amount: '$2,400', due: 'Feb 20, 2026', category: 'Technology', status: 'Paid' },
];

const statusStyle: Record<string, string> = {
  Overdue: 'bg-rose-500/20 text-rose-400', 'Due Soon': 'bg-amber-500/20 text-amber-400',
  Pending: 'bg-blue-500/20 text-blue-400', Paid: 'bg-emerald-500/20 text-emerald-400',
};

export default function AccountsPayablePage() {
  const [bills, setBills] = useState(initBills);
  const [showCreate, setShowCreate] = useState(false);
  const [payBill, setPayBill] = useState<string | null>(null);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({ vendor: '', amount: '', due: '', category: 'Technology' });

  const handleCreate = () => {
    if (!form.vendor || !form.amount) return;
    const newBill = { invoice: `BILL-009${bills.length}`, vendor: form.vendor, amount: `$${form.amount}`, due: form.due || 'Apr 30, 2026', category: form.category, status: 'Pending' };
    setBills(prev => [newBill, ...prev]);
    setForm({ vendor: '', amount: '', due: '', category: 'Technology' });
    setShowCreate(false);
    setToast('Bill recorded successfully!');
  };

  const handlePay = (invoice: string) => {
    setBills(prev => prev.map(b => b.invoice === invoice ? { ...b, status: 'Paid' } : b));
    setPayBill(null);
    setToast('Payment processed successfully!');
  };

  const totalDue = bills.filter(b => b.status !== 'Paid').reduce((s, b) => s + parseFloat(b.amount.replace(/[$,]/g, '')), 0);
  const overdue = bills.filter(b => b.status === 'Overdue').reduce((s, b) => s + parseFloat(b.amount.replace(/[$,]/g, '')), 0);
  const paid = bills.filter(b => b.status === 'Paid').reduce((s, b) => s + parseFloat(b.amount.replace(/[$,]/g, '')), 0);

  return (
    <div className="p-6 space-y-6">
      {toast && <Toast message={toast} onDone={() => setToast('')} />}
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-white-800">Accounts Payable</h1><p className="text-gray-500 text-sm mt-1">Manage vendor bills and outgoing payments</p></div>
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"><Plus className="w-4 h-4" /> Record Bill</button>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Total Payable', value: `$${(totalDue + paid).toLocaleString()}`, color: 'text-white' },
          { label: 'Amount Due', value: `$${totalDue.toLocaleString()}`, color: 'text-amber-400' },
          { label: 'Overdue', value: `$${overdue.toLocaleString()}`, color: 'text-rose-400' },
          { label: 'Paid This Month', value: `$${paid.toLocaleString()}`, color: 'text-emerald-400' },
        ].map(s => (
          <div key={s.label} className="bg-gray-900 rounded-xl p-5"><div className="text-gray-400 text-sm mb-2">{s.label}</div><div className={`text-2xl font-bold ${s.color}`}>{s.value}</div></div>
        ))}
      </div>

      <div className="bg-gray-900 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead><tr className="bg-gray-800 border-b border-gray-700">{['Invoice', 'Vendor', 'Amount', 'Due Date', 'Category', 'Status', 'Action'].map(h => <th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-gray-800">
            {bills.map(b => (
              <tr key={b.invoice} className="hover:bg-gray-800/60">
                <td className="px-4 py-3.5 text-blue-400 text-sm font-mono">{b.invoice}</td>
                <td className="px-4 py-3.5 text-white text-sm font-medium">{b.vendor}</td>
                <td className="px-4 py-3.5 text-rose-400 text-sm font-semibold">{b.amount}</td>
                <td className="px-4 py-3.5 text-gray-300 text-sm">{b.due}</td>
                <td className="px-4 py-3.5 text-gray-400 text-sm">{b.category}</td>
                <td className="px-4 py-3.5"><span className={`px-2 py-0.5 rounded text-xs font-medium ${statusStyle[b.status]}`}>{b.status}</span></td>
                <td className="px-4 py-3.5">
                  {b.status !== 'Paid' ? (
                    <button onClick={() => setPayBill(b.invoice)} className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">Pay Now</button>
                  ) : (
                    <span className="text-emerald-400 text-xs">✓ Paid</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Record Bill Modal */}
      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Record New Bill">
        <div className="space-y-4">
          <FormField label="Vendor Name"><input className={inputCls} placeholder="e.g. SupplierCo Ltd" value={form.vendor} onChange={e => setForm(f => ({ ...f, vendor: e.target.value }))} /></FormField>
          <FormField label="Amount ($)"><input type="number" className={inputCls} placeholder="e.g. 4200" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} /></FormField>
          <FormField label="Due Date"><input type="date" className={inputCls} value={form.due} onChange={e => setForm(f => ({ ...f, due: e.target.value }))} /></FormField>
          <FormField label="Category"><select className={selectCls} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}><option>Technology</option><option>Raw Materials</option><option>Office Supplies</option><option>Logistics</option><option>Marketing</option></select></FormField>
          <div className="flex gap-3 pt-2">
            <button onClick={() => setShowCreate(false)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
            <button onClick={handleCreate} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Record Bill</button>
          </div>
        </div>
      </Modal>

      {/* Pay Now Confirmation Modal */}
      <Modal open={!!payBill} onClose={() => setPayBill(null)} title="Confirm Payment" size="sm">
        <div className="space-y-4">
          <p className="text-gray-600 text-sm">Are you sure you want to process payment for <strong>{payBill}</strong>? This action will mark it as Paid.</p>
          <div className="flex gap-3">
            <button onClick={() => setPayBill(null)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
            <button onClick={() => handlePay(payBill!)} className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700">Confirm Payment</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
