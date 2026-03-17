'use client';
import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Toast } from '../../../components/Modal';
import { useRouter } from 'next/navigation';

export default function NewInvoicePage() {
  const router = useRouter();
  const [toast, setToast] = useState('');
  const [client, setClient] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [items, setItems] = useState([{ desc: '', qty: 1, rate: 0 }]);

  const addItem = () => setItems(p => [...p, { desc: '', qty: 1, rate: 0 }]);
  const removeItem = (i: number) => setItems(p => p.filter((_, idx) => idx !== i));
  const updateItem = (i: number, field: string, val: string | number) => setItems(p => p.map((item, idx) => idx === i ? { ...item, [field]: val } : item));

  const subtotal = items.reduce((s, i) => s + i.qty * i.rate, 0);
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  const handleSend = () => {
    if (!client) return;
    setToast('Invoice sent successfully!');
    setTimeout(() => router.push('/finance/invoices'), 2000);
  };

  const handleDraft = () => {
    setToast('Invoice saved as draft!');
    setTimeout(() => router.push('/finance/invoices'), 2000);
  };

  return (
    <div className="p-6 max-w-3xl">
      {toast && <Toast message={toast} onDone={() => setToast('')} />}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Create Invoice</h1>
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-500 text-xs font-medium uppercase tracking-wide mb-1.5">Client Name *</label>
            <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-blue-400" value={client} onChange={e=>setClient(e.target.value)} placeholder="e.g. Acme Corporation" />
          </div>
          <div>
            <label className="block text-gray-500 text-xs font-medium uppercase tracking-wide mb-1.5">Due Date</label>
            <input type="date" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-blue-400" value={dueDate} onChange={e=>setDueDate(e.target.value)} />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-gray-500 text-xs font-medium uppercase tracking-wide">Line Items</label>
            <button onClick={addItem} className="flex items-center gap-1 text-blue-600 text-xs hover:text-blue-700"><Plus className="w-3.5 h-3.5" /> Add Item</button>
          </div>
          <div className="space-y-2">
            <div className="grid grid-cols-12 gap-2 text-gray-400 text-xs uppercase px-1">
              <div className="col-span-6">Description</div><div className="col-span-2">Qty</div><div className="col-span-2">Rate</div><div className="col-span-2">Amount</div>
            </div>
            {items.map((item, i) => (
              <div key={i} className="grid grid-cols-12 gap-2 items-center">
                <input className="col-span-6 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none" value={item.desc} onChange={e=>updateItem(i,'desc',e.target.value)} placeholder="Item description" />
                <input type="number" className="col-span-2 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none" value={item.qty} onChange={e=>updateItem(i,'qty',+e.target.value)} min={1} />
                <input type="number" className="col-span-2 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none" value={item.rate} onChange={e=>updateItem(i,'rate',+e.target.value)} placeholder="0.00" />
                <div className="col-span-1 text-gray-700 text-sm font-medium">${(item.qty * item.rate).toLocaleString()}</div>
                {items.length > 1 && <button onClick={() => removeItem(i)} className="col-span-1 p-1 text-gray-400 hover:text-rose-500"><Trash2 className="w-3.5 h-3.5" /></button>}
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4 space-y-1.5 text-sm max-w-xs ml-auto">
          <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>${subtotal.toLocaleString()}</span></div>
          <div className="flex justify-between text-gray-600"><span>GST (18%)</span><span>${tax.toLocaleString()}</span></div>
          <div className="flex justify-between text-gray-800 font-bold text-base border-t border-gray-200 pt-2 mt-2"><span>Total</span><span>${total.toLocaleString()}</span></div>
        </div>

        <div className="flex gap-3">
          <button onClick={() => router.back()} className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
          <button onClick={handleDraft} className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50">Save Draft</button>
          <button onClick={handleSend} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Send Invoice</button>
        </div>
      </div>
    </div>
  );
}
