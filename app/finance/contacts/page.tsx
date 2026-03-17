'use client';
import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Modal, Toast, FormField, inputCls, selectCls } from '../../components/Modal';

const initContacts = [
  { id: 'CON-001', name: 'John Smith', company: 'Acme Corp', email: 'john@acme.com', phone: '+91 98765 43210', type: 'Customer', role: 'CFO' },
  { id: 'CON-002', name: 'Priya Sharma', company: 'SupplierCo', email: 'priya@supplierco.in', phone: '+91 87654 32109', type: 'Vendor', role: 'Account Manager' },
  { id: 'CON-003', name: 'Mike Chen', company: 'GlobalSoft', email: 'mike@globalsoft.com', phone: '+1 555 0123', type: 'Customer', role: 'CEO' },
  { id: 'CON-004', name: 'Raj Kumar', company: 'TechParts', email: 'raj@techparts.in', phone: '+91 76543 21098', type: 'Vendor', role: 'Sales Rep' },
];

export default function ContactsPage() {
  const [contacts, setContacts] = useState(initContacts);
  const [showCreate, setShowCreate] = useState(false);
  const [deleteId, setDeleteId] = useState<string|null>(null);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', type: 'Customer', role: '' });

  const handleCreate = () => {
    if (!form.name || !form.email) return;
    setContacts(prev => [...prev, { id: `CON-00${prev.length+1}`, ...form }]);
    setForm({ name: '', company: '', email: '', phone: '', type: 'Customer', role: '' });
    setShowCreate(false);
    setToast('Contact added!');
  };

  return (
    <div className="p-6 space-y-6">
      {toast && <Toast message={toast} onDone={() => setToast('')} />}
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-800">Contacts</h1><p className="text-gray-500 text-sm mt-1">Manage customers and vendor contacts</p></div>
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"><Plus className="w-4 h-4" /> Add Contact</button>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead><tr className="bg-gray-50 border-b border-gray-100">{['ID','Name','Company','Email','Phone','Type','Role','Actions'].map(h=><th key={h} className="text-left text-gray-500 text-xs font-medium px-4 py-3">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-gray-100">
            {contacts.map(c=>(
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-4 py-3.5 text-blue-600 text-sm font-mono">{c.id}</td>
                <td className="px-4 py-3.5 text-gray-800 text-sm font-medium">{c.name}</td>
                <td className="px-4 py-3.5 text-gray-600 text-sm">{c.company}</td>
                <td className="px-4 py-3.5 text-gray-500 text-sm">{c.email}</td>
                <td className="px-4 py-3.5 text-gray-500 text-sm">{c.phone}</td>
                <td className="px-4 py-3.5"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${c.type==='Customer'?'bg-blue-50 text-blue-700 border border-blue-200':'bg-amber-50 text-amber-700 border border-amber-200'}`}>{c.type}</span></td>
                <td className="px-4 py-3.5 text-gray-500 text-sm">{c.role}</td>
                <td className="px-4 py-3.5"><button onClick={()=>setDeleteId(c.id)} className="p-1.5 text-gray-400 hover:text-rose-500 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal open={showCreate} onClose={()=>setShowCreate(false)} title="Add Contact">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Full Name"><input className={inputCls} value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} /></FormField>
            <FormField label="Company"><input className={inputCls} value={form.company} onChange={e=>setForm(f=>({...f,company:e.target.value}))} /></FormField>
          </div>
          <FormField label="Email"><input type="email" className={inputCls} value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} /></FormField>
          <FormField label="Phone"><input className={inputCls} value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} /></FormField>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Type"><select className={selectCls} value={form.type} onChange={e=>setForm(f=>({...f,type:e.target.value}))}><option>Customer</option><option>Vendor</option></select></FormField>
            <FormField label="Role"><input className={inputCls} value={form.role} onChange={e=>setForm(f=>({...f,role:e.target.value}))} placeholder="e.g. CFO" /></FormField>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={()=>setShowCreate(false)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
            <button onClick={handleCreate} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Add Contact</button>
          </div>
        </div>
      </Modal>
      <Modal open={!!deleteId} onClose={()=>setDeleteId(null)} title="Remove Contact" size="sm">
        <div className="space-y-4">
          <p className="text-gray-600 text-sm">Remove this contact?</p>
          <div className="flex gap-3">
            <button onClick={()=>setDeleteId(null)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
            <button onClick={()=>{setContacts(p=>p.filter(c=>c.id!==deleteId));setDeleteId(null);setToast('Contact removed.');}} className="flex-1 px-4 py-2 bg-rose-600 text-white rounded-lg text-sm font-medium">Remove</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
