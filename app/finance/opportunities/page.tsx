'use client';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Modal, Toast, FormField, inputCls, selectCls } from '../../components/Modal';

const initOpps = [
  { id: 'OPP-001', name: 'ERP Implementation', company: 'Pinnacle Corp', value: '$60,000', stage: 'Negotiation', closeDate: 'Apr 30, 2026', prob: '70%' },
  { id: 'OPP-002', name: 'Finance Module License', company: 'Horizon Finance', value: '$40,000', stage: 'Proposal', closeDate: 'Apr 15, 2026', prob: '50%' },
  { id: 'OPP-003', name: 'Cloud Migration Services', company: 'Infinity Tech', value: '$25,000', stage: 'Qualified', closeDate: 'May 10, 2026', prob: '30%' },
];

const stageColors: Record<string,string> = {
  New:'bg-blue-50 text-blue-700 border border-blue-200', Qualified:'bg-amber-50 text-amber-700 border border-amber-200',
  Proposal:'bg-violet-50 text-violet-700 border border-violet-200', Negotiation:'bg-orange-50 text-orange-700 border border-orange-200',
};

export default function OpportunitiesPage() {
  const [opps, setOpps] = useState(initOpps);
  const [showCreate, setShowCreate] = useState(false);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({ name: '', company: '', value: '', stage: 'New', closeDate: '', prob: '10%' });

  const handleCreate = () => {
    if (!form.name || !form.company) return;
    setOpps(prev => [...prev, { id: `OPP-00${prev.length+1}`, ...form, value: form.value ? `$${form.value}` : '$0' }]);
    setForm({ name: '', company: '', value: '', stage: 'New', closeDate: '', prob: '10%' });
    setShowCreate(false);
    setToast('Opportunity added!');
  };

  const totalPipeline = opps.reduce((s, o) => s + parseFloat(o.value.replace(/[$,]/g, '')), 0);

  return (
    <div className="p-6 space-y-6">
      {toast && <Toast message={toast} onDone={() => setToast('')} />}
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-800">Opportunities</h1><p className="text-gray-500 text-sm mt-1">Track sales pipeline and opportunities</p></div>
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"><Plus className="w-4 h-4" /> Add Opportunity</button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[{label:'Pipeline Value',value:`$${totalPipeline.toLocaleString()}`},{label:'Open Deals',value:opps.length.toString()},{label:'In Negotiation',value:opps.filter(o=>o.stage==='Negotiation').length.toString()}].map(s=>
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"><div className="text-gray-500 text-sm mb-1">{s.label}</div><div className="text-2xl font-bold text-gray-800">{s.value}</div></div>
        )}
      </div>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead><tr className="bg-gray-50 border-b border-gray-100">{['ID','Opportunity','Company','Value','Stage','Close Date','Probability'].map(h=><th key={h} className="text-left text-gray-500 text-xs font-medium px-4 py-3">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-gray-100">
            {opps.map(o=>(
              <tr key={o.id} className="hover:bg-gray-50">
                <td className="px-4 py-3.5 text-blue-600 text-sm font-mono">{o.id}</td>
                <td className="px-4 py-3.5 text-gray-800 text-sm font-medium">{o.name}</td>
                <td className="px-4 py-3.5 text-gray-600 text-sm">{o.company}</td>
                <td className="px-4 py-3.5 text-emerald-600 text-sm font-semibold">{o.value}</td>
                <td className="px-4 py-3.5"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${stageColors[o.stage]}`}>{o.stage}</span></td>
                <td className="px-4 py-3.5 text-gray-500 text-sm">{o.closeDate}</td>
                <td className="px-4 py-3.5 text-amber-600 text-sm font-medium">{o.prob}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal open={showCreate} onClose={()=>setShowCreate(false)} title="Add Opportunity">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Opportunity Name"><input className={inputCls} value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} /></FormField>
            <FormField label="Company"><input className={inputCls} value={form.company} onChange={e=>setForm(f=>({...f,company:e.target.value}))} /></FormField>
          </div>
          <FormField label="Value ($)"><input type="number" className={inputCls} value={form.value} onChange={e=>setForm(f=>({...f,value:e.target.value}))} /></FormField>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Stage"><select className={selectCls} value={form.stage} onChange={e=>setForm(f=>({...f,stage:e.target.value}))}><option>New</option><option>Qualified</option><option>Proposal</option><option>Negotiation</option></select></FormField>
            <FormField label="Probability"><select className={selectCls} value={form.prob} onChange={e=>setForm(f=>({...f,prob:e.target.value}))}><option>10%</option><option>30%</option><option>50%</option><option>70%</option><option>90%</option></select></FormField>
          </div>
          <FormField label="Expected Close Date"><input type="date" className={inputCls} value={form.closeDate} onChange={e=>setForm(f=>({...f,closeDate:e.target.value}))} /></FormField>
          <div className="flex gap-3 pt-2">
            <button onClick={()=>setShowCreate(false)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
            <button onClick={handleCreate} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Add Opportunity</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
