'use client';
import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Modal, Toast, FormField, inputCls, selectCls } from '../../components/Modal';

const initCustomers = [
  { id: 'CUS-001', name: 'Acme Corporation', contact: 'John Smith', email: 'john@acme.com', phone: '+91 98765 43210', type: 'Enterprise', outstanding: '$12,400', status: 'Active' },
  { id: 'CUS-002', name: 'TechVentures Ltd', contact: 'Sarah Jones', email: 'sarah@techventures.com', phone: '+91 87654 32109', type: 'SMB', outstanding: '$8,200', status: 'Active' },
  { id: 'CUS-003', name: 'GlobalSoft Inc', contact: 'Mike Chen', email: 'mike@globalsoft.com', phone: '+1 555 0123', type: 'Enterprise', outstanding: '$0', status: 'Active' },
  { id: 'CUS-004', name: 'DataCorp', contact: 'Priya Nair', email: 'priya@datacorp.com', phone: '+91 76543 21098', type: 'SMB', outstanding: '$18,900', status: 'Inactive' },
];

export default function CustomerPage() {
  const [customers, setCustomers] = useState(initCustomers);
  const [showCreate, setShowCreate] = useState(false);
  const [deleteId, setDeleteId] = useState<string|null>(null);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({ name: '', contact: '', email: '', phone: '', type: 'SMB' });

  const handleCreate = () => {
    if (!form.name || !form.email) return;
    setCustomers(prev => [...prev, { id: `CUS-00${prev.length+1}`, ...form, outstanding: '$0', status: 'Active' }]);
    setForm({ name: '', contact: '', email: '', phone: '', type: 'SMB' });
    setShowCreate(false);
    setToast('Customer added successfully!');
  };

  const handleDelete = () => {
    setCustomers(prev => prev.filter(c => c.id !== deleteId));
    setDeleteId(null);
    setToast('Customer removed.');
  };

  return (
    <div className="p-6 space-y-6">
      {toast && <Toast message={toast} onDone={() => setToast('')} />}
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-800">Customers</h1><p className="text-gray-500 text-sm mt-1">Manage customer accounts</p></div>
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"><Plus className="w-4 h-4" /> Add Customer</button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[{label:'Total Customers',value:customers.length},{label:'Active',value:customers.filter(c=>c.status==='Active').length},{label:'Outstanding',value:`$${customers.reduce((s,c)=>s+parseFloat(c.outstanding.replace(/[$,]/g,'')),0).toLocaleString()}`}].map(s=>
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"><div className="text-gray-500 text-sm mb-1">{s.label}</div><div className="text-2xl font-bold text-gray-800">{s.value}</div></div>
        )}
      </div>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead><tr className="bg-gray-50 border-b border-gray-100">{['ID','Name','Contact','Email','Phone','Type','Outstanding','Status','Actions'].map(h=><th key={h} className="text-left text-gray-500 text-xs font-medium px-4 py-3">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-gray-100">
            {customers.map(c=>(
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-4 py-3.5 text-blue-600 text-sm font-mono">{c.id}</td>
                <td className="px-4 py-3.5 text-gray-800 text-sm font-medium">{c.name}</td>
                <td className="px-4 py-3.5 text-gray-600 text-sm">{c.contact}</td>
                <td className="px-4 py-3.5 text-gray-500 text-sm">{c.email}</td>
                <td className="px-4 py-3.5 text-gray-500 text-sm">{c.phone}</td>
                <td className="px-4 py-3.5"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${c.type==='Enterprise'?'bg-blue-50 text-blue-700 border border-blue-200':'bg-gray-100 text-gray-600'}`}>{c.type}</span></td>
                <td className="px-4 py-3.5 text-gray-800 text-sm font-semibold">{c.outstanding}</td>
                <td className="px-4 py-3.5"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${c.status==='Active'?'bg-emerald-50 text-emerald-700 border border-emerald-200':'bg-gray-100 text-gray-500'}`}>{c.status}</span></td>
                <td className="px-4 py-3.5"><button onClick={()=>setDeleteId(c.id)} className="p-1.5 text-gray-400 hover:text-rose-500 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal open={showCreate} onClose={()=>setShowCreate(false)} title="Add Customer">
        <div className="space-y-4">
          <FormField label="Company Name"><input className={inputCls} value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="e.g. Acme Corp" /></FormField>
          <FormField label="Contact Person"><input className={inputCls} value={form.contact} onChange={e=>setForm(f=>({...f,contact:e.target.value}))} placeholder="Full name" /></FormField>
          <FormField label="Email"><input type="email" className={inputCls} value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} placeholder="billing@company.com" /></FormField>
          <FormField label="Phone"><input className={inputCls} value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} placeholder="+91 98765 43210" /></FormField>
          <FormField label="Type"><select className={selectCls} value={form.type} onChange={e=>setForm(f=>({...f,type:e.target.value}))}><option>SMB</option><option>Enterprise</option><option>Startup</option></select></FormField>
          <div className="flex gap-3 pt-2">
            <button onClick={()=>setShowCreate(false)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
            <button onClick={handleCreate} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Add Customer</button>
          </div>
        </div>
      </Modal>
      <Modal open={!!deleteId} onClose={()=>setDeleteId(null)} title="Remove Customer" size="sm">
        <div className="space-y-4">
          <p className="text-gray-600 text-sm">Are you sure you want to remove this customer? This cannot be undone.</p>
          <div className="flex gap-3">
            <button onClick={()=>setDeleteId(null)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
            <button onClick={handleDelete} className="flex-1 px-4 py-2 bg-rose-600 text-white rounded-lg text-sm font-medium hover:bg-rose-700">Remove</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
