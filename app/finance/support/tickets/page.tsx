'use client';
import { useState } from 'react';
import { Plus, Eye } from 'lucide-react';
import { Modal, Toast, FormField, inputCls, selectCls } from '../../../components/Modal';

const initTickets = [
  { id: 'TKT-001', subject: 'Invoice INV-2046 dispute', client: 'Acme Corp', priority: 'High', status: 'Open', created: 'Mar 12, 2026', assignee: 'Support Team' },
  { id: 'TKT-002', subject: 'Payment gateway error', client: 'TechVentures', priority: 'Critical', status: 'In Progress', created: 'Mar 11, 2026', assignee: 'Finance Manager' },
  { id: 'TKT-003', subject: 'Report download not working', client: 'GlobalSoft', priority: 'Low', status: 'Resolved', created: 'Mar 09, 2026', assignee: 'Support Team' },
  { id: 'TKT-004', subject: 'Access to budget module', client: 'DataCorp', priority: 'Medium', status: 'Open', created: 'Mar 08, 2026', assignee: 'Super Admin' },
];

const priorityStyle: Record<string,string> = {
  Critical: 'bg-rose-50 text-rose-700 border border-rose-200', High: 'bg-orange-50 text-orange-700 border border-orange-200',
  Medium: 'bg-amber-50 text-amber-700 border border-amber-200', Low: 'bg-gray-100 text-gray-600',
};
const statusStyle: Record<string,string> = {
  Open: 'bg-blue-50 text-blue-700 border border-blue-200', 'In Progress': 'bg-amber-50 text-amber-700 border border-amber-200',
  Resolved: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
};

export default function TicketsPage() {
  const [tickets, setTickets] = useState(initTickets);
  const [showCreate, setShowCreate] = useState(false);
  const [viewTicket, setViewTicket] = useState<typeof initTickets[0]|null>(null);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({ subject: '', client: '', priority: 'Medium', assignee: 'Support Team' });

  const handleCreate = () => {
    if (!form.subject || !form.client) return;
    setTickets(prev => [{ id: `TKT-00${prev.length+1}`, ...form, status: 'Open', created: 'Mar 13, 2026' }, ...prev]);
    setForm({ subject: '', client: '', priority: 'Medium', assignee: 'Support Team' });
    setShowCreate(false);
    setToast('Ticket created!');
  };

  const handleResolve = (id: string) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status: 'Resolved' } : t));
    setViewTicket(null);
    setToast('Ticket resolved!');
  };

  return (
    <div className="p-6 space-y-6">
      {toast && <Toast message={toast} onDone={() => setToast('')} />}
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-white-800">Support Tickets</h1><p className="text-gray-500 text-sm mt-1">Track and resolve customer issues</p></div>
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"><Plus className="w-4 h-4" /> New Ticket</button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[{label:'Open',value:tickets.filter(t=>t.status==='Open').length},{label:'In Progress',value:tickets.filter(t=>t.status==='In Progress').length},{label:'Resolved',value:tickets.filter(t=>t.status==='Resolved').length}].map(s=>
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"><div className="text-gray-500 text-sm mb-1">{s.label}</div><div className="text-2xl font-bold text-gray-800">{s.value}</div></div>
        )}
      </div>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead><tr className="bg-gray-50 border-b border-gray-100">{['ID','Subject','Client','Priority','Status','Created','Assignee','Actions'].map(h=><th key={h} className="text-left text-gray-500 text-xs font-medium px-4 py-3">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-gray-100">
            {tickets.map(t=>(
              <tr key={t.id} className="hover:bg-gray-50">
                <td className="px-4 py-3.5 text-blue-600 text-sm font-mono">{t.id}</td>
                <td className="px-4 py-3.5 text-gray-800 text-sm font-medium">{t.subject}</td>
                <td className="px-4 py-3.5 text-gray-600 text-sm">{t.client}</td>
                <td className="px-4 py-3.5"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${priorityStyle[t.priority]}`}>{t.priority}</span></td>
                <td className="px-4 py-3.5"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle[t.status]}`}>{t.status}</span></td>
                <td className="px-4 py-3.5 text-gray-500 text-sm">{t.created}</td>
                <td className="px-4 py-3.5 text-gray-600 text-sm">{t.assignee}</td>
                <td className="px-4 py-3.5"><button onClick={()=>setViewTicket(t)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"><Eye className="w-3.5 h-3.5" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal open={showCreate} onClose={()=>setShowCreate(false)} title="New Support Ticket">
        <div className="space-y-4">
          <FormField label="Subject"><input className={inputCls} value={form.subject} onChange={e=>setForm(f=>({...f,subject:e.target.value}))} placeholder="Describe the issue" /></FormField>
          <FormField label="Client"><input className={inputCls} value={form.client} onChange={e=>setForm(f=>({...f,client:e.target.value}))} placeholder="Client name" /></FormField>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Priority"><select className={selectCls} value={form.priority} onChange={e=>setForm(f=>({...f,priority:e.target.value}))}><option>Low</option><option>Medium</option><option>High</option><option>Critical</option></select></FormField>
            <FormField label="Assignee"><select className={selectCls} value={form.assignee} onChange={e=>setForm(f=>({...f,assignee:e.target.value}))}><option>Support Team</option><option>Finance Manager</option><option>Super Admin</option></select></FormField>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={()=>setShowCreate(false)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
            <button onClick={handleCreate} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Create Ticket</button>
          </div>
        </div>
      </Modal>
      <Modal open={!!viewTicket} onClose={()=>setViewTicket(null)} title={`Ticket ${viewTicket?.id}`} size="sm">
        {viewTicket && <div className="space-y-3">
          <div><span className="text-gray-500 text-xs uppercase">Subject</span><p className="text-gray-800 font-medium mt-0.5">{viewTicket.subject}</p></div>
          <div className="grid grid-cols-2 gap-3">
            <div><span className="text-gray-500 text-xs uppercase">Client</span><p className="text-gray-700 mt-0.5">{viewTicket.client}</p></div>
            <div><span className="text-gray-500 text-xs uppercase">Assignee</span><p className="text-gray-700 mt-0.5">{viewTicket.assignee}</p></div>
          </div>
          {viewTicket.status !== 'Resolved' && <button onClick={()=>handleResolve(viewTicket.id)} className="w-full mt-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700">Mark as Resolved</button>}
          {viewTicket.status === 'Resolved' && <p className="text-emerald-600 text-sm text-center font-medium">✓ This ticket is resolved</p>}
        </div>}
      </Modal>
    </div>
  );
}
