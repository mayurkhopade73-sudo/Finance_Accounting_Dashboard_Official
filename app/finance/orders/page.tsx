'use client';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Modal, Toast, FormField, inputCls, selectCls } from '../../components/Modal';

const initOrders = [
  { id: 'ORD-001', client: 'Acme Corporation', product: 'ERP License - 50 users', amount: '$60,000', date: 'Mar 10, 2026', delivery: 'Apr 01, 2026', status: 'Confirmed' },
  { id: 'ORD-002', client: 'Horizon Finance', product: 'Finance Module - Annual', amount: '$40,000', date: 'Mar 08, 2026', delivery: 'Mar 25, 2026', status: 'Processing' },
  { id: 'ORD-003', client: 'BlueSky Analytics', product: 'Analytics Dashboard', amount: '$15,000', date: 'Mar 05, 2026', delivery: 'Mar 20, 2026', status: 'Delivered' },
];

const statusStyle: Record<string,string> = {
  Confirmed:'bg-blue-50 text-blue-700 border border-blue-200', Processing:'bg-amber-50 text-amber-700 border border-amber-200',
  Delivered:'bg-emerald-50 text-emerald-700 border border-emerald-200', Cancelled:'bg-red-50 text-red-700 border border-red-200',
};

export default function OrdersPage() {
  const [orders, setOrders] = useState(initOrders);
  const [showCreate, setShowCreate] = useState(false);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({ client: '', product: '', amount: '', delivery: '' });

  const handleCreate = () => {
    if (!form.client || !form.product) return;
    const today = new Date().toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'});
    setOrders(prev => [...prev, { id: `ORD-00${prev.length+1}`, ...form, amount: form.amount?`$${form.amount}`:'$0', date: today, status: 'Confirmed' }]);
    setForm({ client: '', product: '', amount: '', delivery: '' });
    setShowCreate(false);
    setToast('Order created!');
  };

  const handleDeliver = (id: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'Delivered' } : o));
    setToast('Order marked as delivered!');
  };

  return (
    <div className="p-6 space-y-6">
      {toast && <Toast message={toast} onDone={() => setToast('')} />}
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-800">Orders</h1><p className="text-gray-500 text-sm mt-1">Track sales orders and delivery status</p></div>
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"><Plus className="w-4 h-4" /> New Order</button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {[{label:'Total Orders',value:orders.length},{label:'Delivered',value:orders.filter(o=>o.status==='Delivered').length},{label:'In Progress',value:orders.filter(o=>o.status==='Processing'||o.status==='Confirmed').length},{label:'Total Value',value:`$${orders.reduce((s,o)=>s+parseFloat(o.amount.replace(/[$,]/g,'')),0).toLocaleString()}`}].map(s=>
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"><div className="text-gray-500 text-sm mb-1">{s.label}</div><div className="text-2xl font-bold text-gray-800">{s.value}</div></div>
        )}
      </div>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead><tr className="bg-gray-50 border-b border-gray-100">{['Order ID','Client','Product','Amount','Order Date','Delivery Date','Status','Action'].map(h=><th key={h} className="text-left text-gray-500 text-xs font-medium px-4 py-3">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map(o=>(
              <tr key={o.id} className="hover:bg-gray-50">
                <td className="px-4 py-3.5 text-blue-600 text-sm font-mono">{o.id}</td>
                <td className="px-4 py-3.5 text-gray-800 text-sm font-medium">{o.client}</td>
                <td className="px-4 py-3.5 text-gray-600 text-sm">{o.product}</td>
                <td className="px-4 py-3.5 text-emerald-600 text-sm font-semibold">{o.amount}</td>
                <td className="px-4 py-3.5 text-gray-500 text-sm">{o.date}</td>
                <td className="px-4 py-3.5 text-gray-500 text-sm">{o.delivery}</td>
                <td className="px-4 py-3.5"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle[o.status]}`}>{o.status}</span></td>
                <td className="px-4 py-3.5">
                  {o.status === 'Processing' && <button onClick={()=>handleDeliver(o.id)} className="px-3 py-1 bg-emerald-600 text-white rounded text-xs hover:bg-emerald-700">Mark Delivered</button>}
                  {o.status === 'Delivered' && <span className="text-emerald-600 text-xs">✓ Done</span>}
                  {o.status === 'Confirmed' && <span className="text-blue-600 text-xs">Pending dispatch</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal open={showCreate} onClose={()=>setShowCreate(false)} title="New Order">
        <div className="space-y-4">
          <FormField label="Client"><input className={inputCls} value={form.client} onChange={e=>setForm(f=>({...f,client:e.target.value}))} /></FormField>
          <FormField label="Product / Service"><input className={inputCls} value={form.product} onChange={e=>setForm(f=>({...f,product:e.target.value}))} /></FormField>
          <FormField label="Amount ($)"><input type="number" className={inputCls} value={form.amount} onChange={e=>setForm(f=>({...f,amount:e.target.value}))} /></FormField>
          <FormField label="Expected Delivery"><input type="date" className={inputCls} value={form.delivery} onChange={e=>setForm(f=>({...f,delivery:e.target.value}))} /></FormField>
          <div className="flex gap-3 pt-2">
            <button onClick={()=>setShowCreate(false)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
            <button onClick={handleCreate} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Create Order</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
