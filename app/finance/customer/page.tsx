// 'use client';
// import { useState } from 'react';
// import { Plus, Edit2, Trash2 } from 'lucide-react';
// import { Modal, Toast, FormField, inputCls, selectCls } from '../../components/Modal';

// const initCustomers = [
//   { id: 'CUS-001', name: 'Acme Corporation', contact: 'John Smith', email: 'john@acme.com', phone: '+91 98765 43210', type: 'Enterprise', outstanding: '$12,400', status: 'Active' },
//   { id: 'CUS-002', name: 'TechVentures Ltd', contact: 'Sarah Jones', email: 'sarah@techventures.com', phone: '+91 87654 32109', type: 'SMB', outstanding: '$8,200', status: 'Active' },
//   { id: 'CUS-003', name: 'GlobalSoft Inc', contact: 'Mike Chen', email: 'mike@globalsoft.com', phone: '+1 555 0123', type: 'Enterprise', outstanding: '$0', status: 'Active' },
//   { id: 'CUS-004', name: 'DataCorp', contact: 'Priya Nair', email: 'priya@datacorp.com', phone: '+91 76543 21098', type: 'SMB', outstanding: '$18,900', status: 'Inactive' },
// ];

// export default function CustomerPage() {
//   const [customers, setCustomers] = useState(initCustomers);
//   const [showCreate, setShowCreate] = useState(false);
//   const [deleteId, setDeleteId] = useState<string|null>(null);
//   const [toast, setToast] = useState('');
//   const [form, setForm] = useState({ name: '', contact: '', email: '', phone: '', type: 'SMB' });

//   const handleCreate = () => {
//     if (!form.name || !form.email) return;
//     setCustomers(prev => [...prev, { id: `CUS-00${prev.length+1}`, ...form, outstanding: '$0', status: 'Active' }]);
//     setForm({ name: '', contact: '', email: '', phone: '', type: 'SMB' });
//     setShowCreate(false);
//     setToast('Customer added successfully!');
//   };

//   const handleDelete = () => {
//     setCustomers(prev => prev.filter(c => c.id !== deleteId));
//     setDeleteId(null);
//     setToast('Customer removed.');
//   };

//   return (
//     <div className="p-6 space-y-6">
//       {toast && <Toast message={toast} onDone={() => setToast('')} />}
//       <div className="flex items-center justify-between">
//         <div><h1 className="text-2xl font-bold text-white-800">Customers</h1><p className="text-gray-500 text-sm mt-1">Manage customer accounts</p></div>
//         <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"><Plus className="w-4 h-4" /> Add Customer</button>
//       </div>
//       <div className="grid grid-cols-3 gap-4">
//         {[{label:'Total Customers',value:customers.length},{label:'Active',value:customers.filter(c=>c.status==='Active').length},{label:'Outstanding',value:`$${customers.reduce((s,c)=>s+parseFloat(c.outstanding.replace(/[$,]/g,'')),0).toLocaleString()}`}].map(s=>
//           <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"><div className="text-gray-500 text-sm mb-1">{s.label}</div><div className="text-2xl font-bold text-gray-800">{s.value}</div></div>
//         )}
//       </div>
//       <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
//         <table className="w-full">
//           <thead><tr className="bg-gray-50 border-b border-gray-100">{['ID','Name','Contact','Email','Phone','Type','Outstanding','Status','Actions'].map(h=><th key={h} className="text-left text-gray-500 text-xs font-medium px-4 py-3">{h}</th>)}</tr></thead>
//           <tbody className="divide-y divide-gray-100">
//             {customers.map(c=>(
//               <tr key={c.id} className="hover:bg-gray-50">
//                 <td className="px-4 py-3.5 text-blue-600 text-sm font-mono">{c.id}</td>
//                 <td className="px-4 py-3.5 text-gray-800 text-sm font-medium">{c.name}</td>
//                 <td className="px-4 py-3.5 text-gray-600 text-sm">{c.contact}</td>
//                 <td className="px-4 py-3.5 text-gray-500 text-sm">{c.email}</td>
//                 <td className="px-4 py-3.5 text-gray-500 text-sm">{c.phone}</td>
//                 <td className="px-4 py-3.5"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${c.type==='Enterprise'?'bg-blue-50 text-blue-700 border border-blue-200':'bg-gray-100 text-gray-600'}`}>{c.type}</span></td>
//                 <td className="px-4 py-3.5 text-gray-800 text-sm font-semibold">{c.outstanding}</td>
//                 <td className="px-4 py-3.5"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${c.status==='Active'?'bg-emerald-50 text-emerald-700 border border-emerald-200':'bg-gray-100 text-gray-500'}`}>{c.status}</span></td>
//                 <td className="px-4 py-3.5"><button onClick={()=>setDeleteId(c.id)} className="p-1.5 text-gray-400 hover:text-rose-500 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button></td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <Modal open={showCreate} onClose={()=>setShowCreate(false)} title="Add Customer">
//         <div className="space-y-4">
//           <FormField label="Company Name"><input className={inputCls} value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="e.g. Acme Corp" /></FormField>
//           <FormField label="Contact Person"><input className={inputCls} value={form.contact} onChange={e=>setForm(f=>({...f,contact:e.target.value}))} placeholder="Full name" /></FormField>
//           <FormField label="Email"><input type="email" className={inputCls} value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} placeholder="billing@company.com" /></FormField>
//           <FormField label="Phone"><input className={inputCls} value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} placeholder="+91 98765 43210" /></FormField>
//           <FormField label="Type"><select className={selectCls} value={form.type} onChange={e=>setForm(f=>({...f,type:e.target.value}))}><option>SMB</option><option>Enterprise</option><option>Startup</option></select></FormField>
//           <div className="flex gap-3 pt-2">
//             <button onClick={()=>setShowCreate(false)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
//             <button onClick={handleCreate} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Add Customer</button>
//           </div>
//         </div>
//       </Modal>
//       <Modal open={!!deleteId} onClose={()=>setDeleteId(null)} title="Remove Customer" size="sm">
//         <div className="space-y-4">
//           <p className="text-gray-600 text-sm">Are you sure you want to remove this customer? This cannot be undone.</p>
//           <div className="flex gap-3">
//             <button onClick={()=>setDeleteId(null)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
//             <button onClick={handleDelete} className="flex-1 px-4 py-2 bg-rose-600 text-white rounded-lg text-sm font-medium hover:bg-rose-700">Remove</button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// }



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

type FormErrors = {
  name?: string;
  contact?: string;
  email?: string;
  phone?: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[+\d][\d\s\-()]{6,19}$/;

export default function CustomerPage() {
  const [customers, setCustomers] = useState(initCustomers);
  const [showCreate, setShowCreate] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({ name: '', contact: '', email: '', phone: '', type: 'SMB' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = (data: typeof form): FormErrors => {
    const errs: FormErrors = {};
    if (!data.name.trim()) errs.name = 'Company name is required.';
    if (!data.contact.trim()) errs.contact = 'Contact person is required.';
    if (!data.email.trim()) {
      errs.email = 'Email is required.';
    } else if (!emailRegex.test(data.email.trim())) {
      errs.email = 'Enter a valid email address.';
    }
    if (!data.phone.trim()) {
      errs.phone = 'Phone number is required.';
    } else if (!phoneRegex.test(data.phone.trim())) {
      errs.phone = 'Enter a valid phone number.';
    }
    return errs;
  };

  const handleChange = (field: keyof typeof form, value: string) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    if (touched[field]) {
      setErrors(validate(updated));
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setErrors(validate(form));
  };

  const handleCreate = () => {
    // Mark all fields as touched
    setTouched({ name: true, contact: true, email: true, phone: true });
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setCustomers(prev => [
      ...prev,
      { id: `CUS-00${prev.length + 1}`, ...form, outstanding: '$0', status: 'Active' },
    ]);
    setForm({ name: '', contact: '', email: '', phone: '', type: 'SMB' });
    setErrors({});
    setTouched({});
    setShowCreate(false);
    setToast('Customer added successfully!');
  };

  const handleCloseModal = () => {
    setShowCreate(false);
    setErrors({});
    setTouched({});
    setForm({ name: '', contact: '', email: '', phone: '', type: 'SMB' });
  };

  const handleDelete = () => {
    setCustomers(prev => prev.filter(c => c.id !== deleteId));
    setDeleteId(null);
    setToast('Customer removed.');
  };

  // Reusable inline error message
  const ErrorMsg = ({ msg }: { msg?: string }) =>
    msg ? <p className="text-rose-500 text-xs mt-1">{msg}</p> : null;

  // Input class with error state
  const fieldCls = (field: keyof FormErrors) =>
    `${inputCls} ${errors[field] && touched[field] ? 'border-rose-400 focus:ring-rose-300' : ''}`;

  return (
    <div className="p-6 space-y-6">
      {toast && <Toast message={toast} onDone={() => setToast('')} />}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white-800">Customers</h1>
          <p className="text-gray-500 text-sm mt-1">Manage customer accounts</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" /> Add Customer
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Customers', value: customers.length },
          { label: 'Active', value: customers.filter(c => c.status === 'Active').length },
          { label: 'Outstanding', value: `$${customers.reduce((s, c) => s + parseFloat(c.outstanding.replace(/[$,]/g, '')), 0).toLocaleString()}` },
        ].map(s => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="text-gray-500 text-sm mb-1">{s.label}</div>
            <div className="text-2xl font-bold text-gray-800">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {['ID', 'Name', 'Contact', 'Email', 'Phone', 'Type', 'Outstanding', 'Status', 'Actions'].map(h => (
                <th key={h} className="text-left text-gray-500 text-xs font-medium px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {customers.map(c => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-4 py-3.5 text-blue-600 text-sm font-mono">{c.id}</td>
                <td className="px-4 py-3.5 text-gray-800 text-sm font-medium">{c.name}</td>
                <td className="px-4 py-3.5 text-gray-600 text-sm">{c.contact}</td>
                <td className="px-4 py-3.5 text-gray-500 text-sm">{c.email}</td>
                <td className="px-4 py-3.5 text-gray-500 text-sm">{c.phone}</td>
                <td className="px-4 py-3.5">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${c.type === 'Enterprise' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-gray-100 text-gray-600'}`}>
                    {c.type}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-gray-800 text-sm font-semibold">{c.outstanding}</td>
                <td className="px-4 py-3.5">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${c.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-gray-100 text-gray-500'}`}>
                    {c.status}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <button onClick={() => setDeleteId(c.id)} className="p-1.5 text-gray-400 hover:text-rose-500 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Customer Modal */}
      <Modal open={showCreate} onClose={handleCloseModal} title="Add Customer">
        <div className="space-y-4">

          <FormField label="Company Name">
            <input
              className={fieldCls('name')}
              value={form.name}
              onChange={e => handleChange('name', e.target.value)}
              onBlur={() => handleBlur('name')}
              placeholder="e.g. Acme Corp"
            />
            <ErrorMsg msg={touched.name ? errors.name : undefined} />
          </FormField>

          <FormField label="Contact Person">
            <input
              className={fieldCls('contact')}
              value={form.contact}
              onChange={e => handleChange('contact', e.target.value)}
              onBlur={() => handleBlur('contact')}
              placeholder="Full name"
            />
            <ErrorMsg msg={touched.contact ? errors.contact : undefined} />
          </FormField>

          <FormField label="Email">
            <input
              type="email"
              className={fieldCls('email')}
              value={form.email}
              onChange={e => handleChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              placeholder="billing@company.com"
            />
            <ErrorMsg msg={touched.email ? errors.email : undefined} />
          </FormField>

          <FormField label="Phone">
            <input
              className={fieldCls('phone')}
              value={form.phone}
              onChange={e => handleChange('phone', e.target.value)}
              onBlur={() => handleBlur('phone')}
              placeholder="+91 98765 43210"
            />
            <ErrorMsg msg={touched.phone ? errors.phone : undefined} />
          </FormField>

          <FormField label="Type">
            <select
              className={selectCls}
              value={form.type}
              onChange={e => handleChange('type', e.target.value)}
            >
              <option>SMB</option>
              <option>Enterprise</option>
              <option>Startup</option>
            </select>
          </FormField>

          <div className="flex gap-3 pt-2">
            <button onClick={handleCloseModal} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">
              Cancel
            </button>
            <button onClick={handleCreate} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
              Add Customer
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="Remove Customer" size="sm">
        <div className="space-y-4">
          <p className="text-gray-600 text-sm">Are you sure you want to remove this customer? This cannot be undone.</p>
          <div className="flex gap-3">
            <button onClick={() => setDeleteId(null)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">
              Cancel
            </button>
            <button onClick={handleDelete} className="flex-1 px-4 py-2 bg-rose-600 text-white rounded-lg text-sm font-medium hover:bg-rose-700">
              Remove
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}