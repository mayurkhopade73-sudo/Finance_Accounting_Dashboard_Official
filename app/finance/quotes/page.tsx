'use client';
import { useState } from 'react';
import { Plus, Eye } from 'lucide-react';
import { Modal, Toast, FormField, inputCls, selectCls } from '../../components/Modal';

const initQuotes = [
  { id: 'QT-001', title: 'ERP Implementation Proposal', client: 'Pinnacle Corp', amount: '$60,000', created: 'Mar 10, 2026', expires: 'Apr 10, 2026', status: 'Sent' },
  { id: 'QT-002', title: 'Finance Module License', client: 'Horizon Finance', amount: '$40,000', created: 'Mar 08, 2026', expires: 'Apr 08, 2026', status: 'Draft' },
  { id: 'QT-003', title: 'Analytics Dashboard Setup', client: 'BlueSky Analytics', amount: '$15,000', created: 'Mar 05, 2026', expires: 'Apr 05, 2026', status: 'Accepted' },
];

const statusStyle: Record<string,string> = {
  Sent:'bg-blue-50 text-blue-700 border border-blue-200', Draft:'bg-gray-100 text-gray-600',
  Accepted:'bg-emerald-50 text-emerald-700 border border-emerald-200', Expired:'bg-red-50 text-red-700 border border-red-200',
};

export default function QuotesPage() {
  const [quotes, setQuotes] = useState(initQuotes);
  const [showCreate, setShowCreate] = useState(false);
  const [viewQuote, setViewQuote] = useState<typeof initQuotes[0]|null>(null);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({ title: '', client: '', amount: '', expires: '', status: 'Draft' });

  const handleCreate = () => {
    if (!form.title || !form.client) return;
    const today = new Date().toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'});
    setQuotes(prev => [...prev, { id: `QT-00${prev.length+1}`, ...form, amount: form.amount?`$${form.amount}`:'$0', created: today }]);
    setForm({ title: '', client: '', amount: '', expires: '', status: 'Draft' });
    setShowCreate(false);
    setToast('Quote created!');
  };

  const handleAccept = (id: string) => {
    setQuotes(prev => prev.map(q => q.id === id ? { ...q, status: 'Accepted' } : q));
    setViewQuote(null);
    setToast('Quote accepted!');
  };

  return (
    <div className="p-6 space-y-6">
      {toast && <Toast message={toast} onDone={() => setToast('')} />}
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-white-800">Quotes</h1><p className="text-gray-500 text-sm mt-1">Sales quotes and proposals</p></div>
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"><Plus className="w-4 h-4" /> New Quote</button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {[{label:'Total',value:quotes.length},{label:'Accepted',value:quotes.filter(q=>q.status==='Accepted').length},{label:'Pending',value:quotes.filter(q=>q.status==='Sent'||q.status==='Draft').length},{label:'Total Value',value:`$${quotes.reduce((s,q)=>s+parseFloat(q.amount.replace(/[$,]/g,'')),0).toLocaleString()}`}].map(s=>
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"><div className="text-gray-500 text-sm mb-1">{s.label}</div><div className="text-2xl font-bold text-gray-800">{s.value}</div></div>
        )}
      </div>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead><tr className="bg-gray-50 border-b border-gray-100">{['ID','Title','Client','Amount','Created','Expires','Status','Action'].map(h=><th key={h} className="text-left text-gray-500 text-xs font-medium px-4 py-3">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-gray-100">
            {quotes.map(q=>(
              <tr key={q.id} className="hover:bg-gray-50">
                <td className="px-4 py-3.5 text-blue-600 text-sm font-mono">{q.id}</td>
                <td className="px-4 py-3.5 text-gray-800 text-sm font-medium">{q.title}</td>
                <td className="px-4 py-3.5 text-gray-600 text-sm">{q.client}</td>
                <td className="px-4 py-3.5 text-emerald-600 text-sm font-semibold">{q.amount}</td>
                <td className="px-4 py-3.5 text-gray-500 text-sm">{q.created}</td>
                <td className="px-4 py-3.5 text-gray-500 text-sm">{q.expires}</td>
                <td className="px-4 py-3.5"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle[q.status]}`}>{q.status}</span></td>
                <td className="px-4 py-3.5"><button onClick={()=>setViewQuote(q)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"><Eye className="w-3.5 h-3.5" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal open={showCreate} onClose={()=>setShowCreate(false)} title="Create Quote">
        <div className="space-y-4">
          <FormField label="Quote Title"><input className={inputCls} value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} placeholder="e.g. ERP Implementation Proposal" /></FormField>
          <FormField label="Client"><input className={inputCls} value={form.client} onChange={e=>setForm(f=>({...f,client:e.target.value}))} /></FormField>
          <FormField label="Amount ($)"><input type="number" className={inputCls} value={form.amount} onChange={e=>setForm(f=>({...f,amount:e.target.value}))} /></FormField>
          <FormField label="Expires"><input type="date" className={inputCls} value={form.expires} onChange={e=>setForm(f=>({...f,expires:e.target.value}))} /></FormField>
          <div className="flex gap-3 pt-2">
            <button onClick={()=>setShowCreate(false)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
            <button onClick={handleCreate} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Create Quote</button>
          </div>
        </div>
      </Modal>
      <Modal open={!!viewQuote} onClose={()=>setViewQuote(null)} title={`Quote ${viewQuote?.id}`} size="sm">
        {viewQuote && <div className="space-y-3">
          <div><span className="text-gray-500 text-xs uppercase">Title</span><p className="text-gray-800 font-medium mt-0.5">{viewQuote.title}</p></div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div><span className="text-gray-500 text-xs uppercase">Client</span><p className="text-gray-700 mt-0.5">{viewQuote.client}</p></div>
            <div><span className="text-gray-500 text-xs uppercase">Amount</span><p className="text-emerald-600 font-bold mt-0.5">{viewQuote.amount}</p></div>
            <div><span className="text-gray-500 text-xs uppercase">Expires</span><p className="text-gray-700 mt-0.5">{viewQuote.expires}</p></div>
            <div><span className="text-gray-500 text-xs uppercase">Status</span><p className="mt-0.5"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle[viewQuote.status]}`}>{viewQuote.status}</span></p></div>
          </div>
          {viewQuote.status === 'Sent' && <button onClick={()=>handleAccept(viewQuote.id)} className="w-full mt-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700">Mark as Accepted</button>}
        </div>}
      </Modal>
    </div>
  );
}
