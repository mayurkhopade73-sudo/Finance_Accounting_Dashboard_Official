'use client';
import { useState } from 'react';
import { Download, Send, ArrowLeft } from 'lucide-react';
import { Modal, Toast, FormField, inputCls } from '../../../components/Modal';
import Link from 'next/link';

export default function InvoiceDetailPage({ params }: { params: { id: string } }) {
  const [toast, setToast] = useState('');
  const [showSend, setShowSend] = useState(false);
  const [email, setEmail] = useState('billing@client.com');

  const inv = {
    id: params.id, client: 'Acme Corporation', email: 'john@acme.com',
    amount: '$12,400', date: 'Mar 10, 2026', due: 'Mar 25, 2026', status: 'Overdue',
    items: [
      { desc: 'ERP License - 10 users', qty: 10, rate: 800, total: 8000 },
      { desc: 'Implementation Services', qty: 1, rate: 3600, total: 3600 },
      { desc: 'Training Package', qty: 1, rate: 800, total: 800 },
    ],
  };

  const subtotal = inv.items.reduce((s, i) => s + i.total, 0);
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  const handleDownload = () => {
    const content = `INVOICE ${inv.id}\nClient: ${inv.client}\nDate: ${inv.date}\nDue: ${inv.due}\n\n${inv.items.map(i=>`${i.desc} x${i.qty} @ $${i.rate} = $${i.total}`).join('\n')}\n\nSubtotal: $${subtotal}\nGST (18%): $${tax.toFixed(0)}\nTotal: $${total.toFixed(0)}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `${inv.id}.txt`; a.click();
    setToast('Invoice downloaded!');
  };

  const handleSend = () => {
    setShowSend(false);
    setToast(`Invoice sent to ${email}!`);
  };

  return (
    <div className="p-6 max-w-3xl">
      {toast && <Toast message={toast} onDone={() => setToast('')} />}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/finance/invoices" className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"><ArrowLeft className="w-4 h-4" /></Link>
          <div><h1 className="text-2xl font-bold text-gray-800">{inv.id}</h1><p className="text-gray-500 text-sm">Invoice Detail</p></div>
        </div>
        <div className="flex gap-2">
          <button onClick={handleDownload} className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50"><Download className="w-4 h-4" /> Download</button>
          <button onClick={() => setShowSend(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"><Send className="w-4 h-4" /> Send</button>
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><span className="text-gray-400 text-xs uppercase">Client</span><p className="text-gray-800 font-semibold mt-0.5">{inv.client}</p></div>
          <div><span className="text-gray-400 text-xs uppercase">Status</span><p className="mt-0.5"><span className="bg-rose-50 text-rose-600 border border-rose-200 px-2 py-0.5 rounded-full text-xs font-medium">{inv.status}</span></p></div>
          <div><span className="text-gray-400 text-xs uppercase">Invoice Date</span><p className="text-gray-700 mt-0.5">{inv.date}</p></div>
          <div><span className="text-gray-400 text-xs uppercase">Due Date</span><p className="text-gray-700 mt-0.5">{inv.due}</p></div>
        </div>
        <table className="w-full">
          <thead><tr className="bg-gray-50 border-b border-gray-100">{['Description','Qty','Rate','Total'].map(h=><th key={h} className="text-left text-gray-500 text-xs font-medium px-3 py-2">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-gray-100">
            {inv.items.map((item, i) => (
              <tr key={i}><td className="px-3 py-3 text-gray-800 text-sm">{item.desc}</td><td className="px-3 py-3 text-gray-600 text-sm">{item.qty}</td><td className="px-3 py-3 text-gray-600 text-sm">${item.rate.toLocaleString()}</td><td className="px-3 py-3 text-gray-800 font-medium text-sm">${item.total.toLocaleString()}</td></tr>
            ))}
          </tbody>
        </table>
        <div className="space-y-1.5 text-sm max-w-xs ml-auto">
          <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>${subtotal.toLocaleString()}</span></div>
          <div className="flex justify-between text-gray-600"><span>GST (18%)</span><span>${tax.toFixed(0)}</span></div>
          <div className="flex justify-between text-gray-800 font-bold text-base border-t border-gray-200 pt-2"><span>Total</span><span>${total.toFixed(0)}</span></div>
        </div>
      </div>
      <Modal open={showSend} onClose={() => setShowSend(false)} title="Send Invoice" size="sm">
        <div className="space-y-4">
          <p className="text-gray-600 text-sm">Send <strong>{inv.id}</strong> to the client.</p>
          <FormField label="Recipient Email"><input type="email" className={inputCls} value={email} onChange={e=>setEmail(e.target.value)} /></FormField>
          <div className="flex gap-3 pt-2">
            <button onClick={() => setShowSend(false)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
            <button onClick={handleSend} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Send Invoice</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
