'use client';
import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Modal, Toast, FormField, inputCls, selectCls } from '../../components/Modal';

const initLeads = [
  { id: 'LED-001', name: 'Ravi Sharma', company: 'Startup Hub', email: 'ravi@startuphub.in', source: 'Website', stage: 'New', value: '$8,000' },
  { id: 'LED-002', name: 'Emily Watson', company: 'FinEdge Ltd', email: 'emily@finedge.com', source: 'Referral', stage: 'Contacted', value: '$15,000' },
  { id: 'LED-003', name: 'Arjun Mehta', company: 'CloudBase', email: 'arjun@cloudbase.io', source: 'LinkedIn', stage: 'Qualified', value: '$32,000' },
  { id: 'LED-004', name: 'Neha Kapoor', company: 'RetailPlus', email: 'neha@retailplus.in', source: 'Conference', stage: 'Proposal', value: '$22,000' },
];

const stageStyle: Record<string, string> = {
  New: 'bg-blue-50 text-blue-700 border border-blue-200', Contacted: 'bg-amber-50 text-amber-700 border border-amber-200',
  Qualified: 'bg-violet-50 text-violet-700 border border-violet-200', Proposal: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
};

export default function LeadsPage() {
  const [leads, setLeads] = useState(initLeads);
  const [showCreate, setShowCreate] = useState(false);
  const [deleteId, setDeleteId] = useState<string|null>(null);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({ name: '', company: '', email: '', source: 'Website', stage: 'New', value: '' });

  const handleCreate = () => {
    if (!form.name || !form.company) return;
    setLeads(prev => [...prev, { id: `LED-00${prev.length+1}`, ...form, value: form.value ? `$${form.value}` : '$0' }]);
    setForm({ name: '', company: '', email: '', source: 'Website', stage: 'New', value: '' });
    setShowCreate(false);
    setToast('Lead added!');
  };

  return (
    <div className="p-6 space-y-6">
      {toast && <Toast message={toast} onDone={() => setToast('')} />}
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-800">Leads</h1><p className="text-gray-500 text-sm mt-1">Track and convert sales leads</p></div>
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"><Plus className="w-4 h-4" /> Add Lead</button>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead><tr className="bg-gray-50 border-b border-gray-100">{['ID','Name','Company','Email','Source','Stage','Est. Value','Actions'].map(h=><th key={h} className="text-left text-gray-500 text-xs font-medium px-4 py-3">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-gray-100">
            {leads.map(l=>(
              <tr key={l.id} className="hover:bg-gray-50">
                <td className="px-4 py-3.5 text-blue-600 text-sm font-mono">{l.id}</td>
                <td className="px-4 py-3.5 text-gray-800 text-sm font-medium">{l.name}</td>
                <td className="px-4 py-3.5 text-gray-600 text-sm">{l.company}</td>
                <td className="px-4 py-3.5 text-gray-500 text-sm">{l.email}</td>
                <td className="px-4 py-3.5 text-gray-500 text-sm">{l.source}</td>
                <td className="px-4 py-3.5"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${stageStyle[l.stage]}`}>{l.stage}</span></td>
                <td className="px-4 py-3.5 text-emerald-600 text-sm font-semibold">{l.value}</td>
                <td className="px-4 py-3.5"><button onClick={()=>setDeleteId(l.id)} className="p-1.5 text-gray-400 hover:text-rose-500 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal open={showCreate} onClose={()=>setShowCreate(false)} title="Add Lead">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Name"><input className={inputCls} value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} /></FormField>
            <FormField label="Company"><input className={inputCls} value={form.company} onChange={e=>setForm(f=>({...f,company:e.target.value}))} /></FormField>
          </div>
          <FormField label="Email"><input type="email" className={inputCls} value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} /></FormField>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Source"><select className={selectCls} value={form.source} onChange={e=>setForm(f=>({...f,source:e.target.value}))}><option>Website</option><option>Referral</option><option>LinkedIn</option><option>Conference</option><option>Cold Outreach</option></select></FormField>
            <FormField label="Stage"><select className={selectCls} value={form.stage} onChange={e=>setForm(f=>({...f,stage:e.target.value}))}><option>New</option><option>Contacted</option><option>Qualified</option><option>Proposal</option></select></FormField>
          </div>
          <FormField label="Estimated Value ($)"><input type="number" className={inputCls} value={form.value} onChange={e=>setForm(f=>({...f,value:e.target.value}))} placeholder="e.g. 25000" /></FormField>
          <div className="flex gap-3 pt-2">
            <button onClick={()=>setShowCreate(false)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
            <button onClick={handleCreate} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Add Lead</button>
          </div>
        </div>
      </Modal>
      <Modal open={!!deleteId} onClose={()=>setDeleteId(null)} title="Remove Lead" size="sm">
        <div className="space-y-4">
          <p className="text-gray-600 text-sm">Remove this lead from the pipeline?</p>
          <div className="flex gap-3">
            <button onClick={()=>setDeleteId(null)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
            <button onClick={()=>{setLeads(p=>p.filter(l=>l.id!==deleteId));setDeleteId(null);setToast('Lead removed.');}} className="flex-1 px-4 py-2 bg-rose-600 text-white rounded-lg text-sm font-medium">Remove</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
