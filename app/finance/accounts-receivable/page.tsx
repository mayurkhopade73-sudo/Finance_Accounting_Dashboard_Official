// 'use client';
// import { useState } from 'react';
// import { Plus } from 'lucide-react';
// import { Modal, Toast, FormField, inputCls, selectCls } from '../../components/Modal';

// const initReceivables = [
//   { invoice: 'INV-2046', client: 'Acme Corporation', amount: '$12,400', due: 'Mar 25, 2026', contact: 'john@acme.com', status: 'Overdue' },
//   { invoice: 'INV-2045', client: 'TechVentures Ltd', amount: '$8,200', due: 'Mar 28, 2026', contact: 'billing@techventures.com', status: 'Sent' },
//   { invoice: 'INV-2044', client: 'GlobalSoft Inc', amount: '$22,500', due: 'Apr 05, 2026', contact: 'accounts@globalsoft.com', status: 'Paid' },
//   { invoice: 'INV-2043', client: 'FinTech Solutions', amount: '$5,750', due: 'Mar 16, 2026', contact: 'finance@fintech.io', status: 'Overdue' },
//   { invoice: 'INV-2042', client: 'DataCorp', amount: '$18,900', due: 'Mar 11, 2026', contact: 'ap@datacorp.com', status: 'Paid' },
// ];

// const statusStyle: Record<string, string> = {
//   Paid: 'bg-emerald-500/20 text-emerald-400', Sent: 'bg-blue-500/20 text-blue-400', Overdue: 'bg-rose-500/20 text-rose-400',
// };

// export default function AccountsReceivablePage() {
//   const [receivables, setReceivables] = useState(initReceivables);
//   const [showCreate, setShowCreate] = useState(false);
//   const [reminderInv, setReminderInv] = useState<typeof initReceivables[0] | null>(null);
//   const [markPaid, setMarkPaid] = useState<string | null>(null);
//   const [toast, setToast] = useState('');
//   const [form, setForm] = useState({ client: '', amount: '', due: '', contact: '' });

//   const handleCreate = () => {
//     if (!form.client || !form.amount) return;
//     const newRec = { invoice: `INV-${2047 + receivables.length}`, client: form.client, amount: `$${form.amount}`, due: form.due || 'Apr 30, 2026', contact: form.contact, status: 'Sent' };
//     setReceivables(prev => [newRec, ...prev]);
//     setForm({ client: '', amount: '', due: '', contact: '' });
//     setShowCreate(false);
//     setToast('Invoice sent successfully!');
//   };

//   const handleReminder = () => {
//     setReminderInv(null);
//     setToast(`Payment reminder sent to ${reminderInv?.contact}!`);
//   };

//   const handleMarkPaid = (invoice: string) => {
//     setReceivables(prev => prev.map(r => r.invoice === invoice ? { ...r, status: 'Paid' } : r));
//     setMarkPaid(null);
//     setToast('Invoice marked as paid!');
//   };

//   const totalReceivable = receivables.filter(r => r.status !== 'Paid').reduce((s, r) => s + parseFloat(r.amount.replace(/[$,]/g, '')), 0);
//   const collected = receivables.filter(r => r.status === 'Paid').reduce((s, r) => s + parseFloat(r.amount.replace(/[$,]/g, '')), 0);

//   return (
//     <div className="p-6 space-y-6">
//       {toast && <Toast message={toast} onDone={() => setToast('')} />}
//       <div className="flex items-center justify-between">
//         <div><h1 className="text-2xl font-bold text-white-800">Accounts Receivable</h1><p className="text-gray-500 text-sm mt-1">Track customer invoices and incoming payments</p></div>
//         <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"><Plus className="w-4 h-4" /> New Invoice</button>
//       </div>

//       <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
//         {[
//           { label: 'Total Receivable', value: `$${totalReceivable.toLocaleString()}`, color: 'text-white' },
//           { label: 'Overdue', value: `$${receivables.filter(r=>r.status==='Overdue').reduce((s,r)=>s+parseFloat(r.amount.replace(/[$,]/g,'')),0).toLocaleString()}`, color: 'text-rose-400' },
//           { label: 'Collected', value: `$${collected.toLocaleString()}`, color: 'text-emerald-400' },
//           { label: 'Active Invoices', value: receivables.filter(r=>r.status!=='Paid').length.toString(), color: 'text-blue-400' },
//         ].map(s => (
//           <div key={s.label} className="bg-gray-900 rounded-xl p-5"><div className="text-gray-400 text-sm mb-2">{s.label}</div><div className={`text-2xl font-bold ${s.color}`}>{s.value}</div></div>
//         ))}
//       </div>

//       <div className="bg-gray-900 rounded-xl overflow-hidden">
//         <table className="w-full">
//           <thead><tr className="bg-gray-800 border-b border-gray-700">{['Invoice','Client','Amount','Due Date','Contact','Status','Actions'].map(h=><th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3">{h}</th>)}</tr></thead>
//           <tbody className="divide-y divide-gray-800">
//             {receivables.map(r => (
//               <tr key={r.invoice} className="hover:bg-gray-800/60">
//                 <td className="px-4 py-3.5 text-blue-400 text-sm font-mono">{r.invoice}</td>
//                 <td className="px-4 py-3.5 text-white text-sm font-medium">{r.client}</td>
//                 <td className="px-4 py-3.5 text-emerald-400 text-sm font-semibold">{r.amount}</td>
//                 <td className="px-4 py-3.5 text-gray-300 text-sm">{r.due}</td>
//                 <td className="px-4 py-3.5 text-gray-400 text-sm">{r.contact}</td>
//                 <td className="px-4 py-3.5"><span className={`px-2 py-0.5 rounded text-xs font-medium ${statusStyle[r.status]}`}>{r.status}</span></td>
//                 <td className="px-4 py-3.5 flex gap-1.5">
//                   {r.status !== 'Paid' && <>
//                     <button onClick={() => setReminderInv(r)} className="px-2 py-1 bg-gray-700 text-gray-300 border border-gray-600 rounded text-xs hover:bg-gray-600">Remind</button>
//                     <button onClick={() => setMarkPaid(r.invoice)} className="px-2 py-1 bg-emerald-600 text-white rounded text-xs hover:bg-emerald-700">Mark Paid</button>
//                   </>}
//                   {r.status === 'Paid' && <span className="text-emerald-400 text-xs">✓ Collected</span>}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Create Invoice">
//         <div className="space-y-4">
//           <FormField label="Client Name"><input className={inputCls} value={form.client} onChange={e=>setForm(f=>({...f,client:e.target.value}))} placeholder="e.g. Acme Corporation" /></FormField>
//           <FormField label="Amount ($)"><input type="number" className={inputCls} value={form.amount} onChange={e=>setForm(f=>({...f,amount:e.target.value}))} placeholder="e.g. 12400" /></FormField>
//           <FormField label="Due Date"><input type="date" className={inputCls} value={form.due} onChange={e=>setForm(f=>({...f,due:e.target.value}))} /></FormField>
//           <FormField label="Contact Email"><input type="email" className={inputCls} value={form.contact} onChange={e=>setForm(f=>({...f,contact:e.target.value}))} placeholder="billing@client.com" /></FormField>
//           <div className="flex gap-3 pt-2">
//             <button onClick={() => setShowCreate(false)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
//             <button onClick={handleCreate} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Send Invoice</button>
//           </div>
//         </div>
//       </Modal>

//       <Modal open={!!reminderInv} onClose={() => setReminderInv(null)} title="Send Payment Reminder" size="sm">
//         <div className="space-y-4">
//           <p className="text-gray-600 text-sm">Send a payment reminder to <strong>{reminderInv?.contact}</strong> for invoice <strong>{reminderInv?.invoice}</strong> ({reminderInv?.amount})?</p>
//           <div className="flex gap-3">
//             <button onClick={() => setReminderInv(null)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
//             <button onClick={handleReminder} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Send Reminder</button>
//           </div>
//         </div>
//       </Modal>

//       <Modal open={!!markPaid} onClose={() => setMarkPaid(null)} title="Mark as Paid" size="sm">
//         <div className="space-y-4">
//           <p className="text-gray-600 text-sm">Confirm that payment has been received for <strong>{markPaid}</strong>?</p>
//           <div className="flex gap-3">
//             <button onClick={() => setMarkPaid(null)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
//             <button onClick={() => handleMarkPaid(markPaid!)} className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700">Mark as Paid</button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// }


'use client';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Modal, Toast, FormField, inputCls, selectCls } from '../../components/Modal';

const initReceivables = [
  { invoice: 'INV-2046', client: 'Acme Corporation', amount: '$12,400', due: 'Mar 25, 2026', contact: 'john@acme.com', status: 'Overdue' },
  { invoice: 'INV-2045', client: 'TechVentures Ltd', amount: '$8,200', due: 'Mar 28, 2026', contact: 'billing@techventures.com', status: 'Sent' },
  { invoice: 'INV-2044', client: 'GlobalSoft Inc', amount: '$22,500', due: 'Apr 05, 2026', contact: 'accounts@globalsoft.com', status: 'Paid' },
  { invoice: 'INV-2043', client: 'FinTech Solutions', amount: '$5,750', due: 'Mar 16, 2026', contact: 'finance@fintech.io', status: 'Overdue' },
  { invoice: 'INV-2042', client: 'DataCorp', amount: '$18,900', due: 'Mar 11, 2026', contact: 'ap@datacorp.com', status: 'Paid' },
];

const statusStyle: Record<string, string> = {
  Paid: 'bg-emerald-500/20 text-emerald-400',
  Sent: 'bg-blue-500/20 text-blue-400',
  Overdue: 'bg-rose-500/20 text-rose-400',
};

// ─── Types ────────────────────────────────────────────────────────────────────

type FormState = {
  client: string;
  amount: string;
  due: string;
  contact: string;
};

type FormErrors = {
  client?: string;
  amount?: string;
  due?: string;
  contact?: string;
};

const defaultForm: FormState = { client: '', amount: '', due: '', contact: '' };

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ─── Validation ───────────────────────────────────────────────────────────────

function validate(form: FormState): FormErrors {
  const errs: FormErrors = {};

  if (!form.client.trim())
    errs.client = 'Client name is required.';

  if (!form.amount) {
    errs.amount = 'Amount is required.';
  } else if (isNaN(Number(form.amount)) || Number(form.amount) <= 0) {
    errs.amount = 'Enter a valid amount greater than 0.';
  }

  if (!form.due) {
    errs.due = 'Due date is required.';
  } else {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (new Date(form.due) < today)
      errs.due = 'Due date cannot be in the past.';
  }

  if (!form.contact.trim()) {
    errs.contact = 'Contact email is required.';
  } else if (!emailRegex.test(form.contact.trim())) {
    errs.contact = 'Enter a valid email address.';
  }

  return errs;
}

// 

function Err({ msg }: { msg?: string }) {
  return msg ? <p className="text-rose-500 text-xs mt-1">{msg}</p> : null;
}

function errBorder(base: string, hasError: boolean) {
  return hasError ? base + ' !border-rose-400' : base;
}


export default function AccountsReceivablePage() {
  const [receivables, setReceivables] = useState(initReceivables);
  const [showCreate, setShowCreate] = useState(false);
  const [reminderInv, setReminderInv] = useState<typeof initReceivables[0] | null>(null);
  const [markPaid, setMarkPaid] = useState<string | null>(null);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState<FormState>(defaultForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (field: keyof FormState, value: string) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    if (touched[field]) {
      setErrors(validate(updated));
    }
  };

  const handleBlur = (field: keyof FormErrors) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setErrors(validate(form));
  };

  const handleCreate = () => {
    setTouched({ client: true, amount: true, due: true, contact: true });
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const newRec = {
      invoice: `INV-${2047 + receivables.length}`,
      client: form.client,
      amount: `$${Number(form.amount).toLocaleString()}`,
      due: new Date(form.due).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      contact: form.contact,
      status: 'Sent',
    };
    setReceivables(prev => [newRec, ...prev]);
    setForm(defaultForm);
    setErrors({});
    setTouched({});
    setShowCreate(false);
    setToast('Invoice sent successfully!');
  };

  const handleClose = () => {
    setShowCreate(false);
    setForm(defaultForm);
    setErrors({});
    setTouched({});
  };

  const handleReminder = () => {
    setReminderInv(null);
    setToast(`Payment reminder sent to ${reminderInv?.contact}!`);
  };

  const handleMarkPaid = (invoice: string) => {
    setReceivables(prev => prev.map(r => r.invoice === invoice ? { ...r, status: 'Paid' } : r));
    setMarkPaid(null);
    setToast('Invoice marked as paid!');
  };

  const totalReceivable = receivables.filter(r => r.status !== 'Paid').reduce((s, r) => s + parseFloat(r.amount.replace(/[$,]/g, '')), 0);
  const collected = receivables.filter(r => r.status === 'Paid').reduce((s, r) => s + parseFloat(r.amount.replace(/[$,]/g, '')), 0);

  return (
    <div className="p-6 space-y-6">
      {toast && <Toast message={toast} onDone={() => setToast('')} />}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white-800">Accounts Receivable</h1>
          <p className="text-gray-500 text-sm mt-1">Track customer invoices and incoming payments</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
          <Plus className="w-4 h-4" /> New Invoice
        </button>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Total Receivable', value: `$${totalReceivable.toLocaleString()}`, color: 'text-white' },
          { label: 'Overdue', value: `$${receivables.filter(r => r.status === 'Overdue').reduce((s, r) => s + parseFloat(r.amount.replace(/[$,]/g, '')), 0).toLocaleString()}`, color: 'text-rose-400' },
          { label: 'Collected', value: `$${collected.toLocaleString()}`, color: 'text-emerald-400' },
          { label: 'Active Invoices', value: receivables.filter(r => r.status !== 'Paid').length.toString(), color: 'text-blue-400' },
        ].map(s => (
          <div key={s.label} className="bg-gray-900 rounded-xl p-5">
            <div className="text-gray-400 text-sm mb-2">{s.label}</div>
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-gray-900 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-800 border-b border-gray-700">
              {['Invoice', 'Client', 'Amount', 'Due Date', 'Contact', 'Status', 'Actions'].map(h => (
                <th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {receivables.map(r => (
              <tr key={r.invoice} className="hover:bg-gray-800/60">
                <td className="px-4 py-3.5 text-blue-400 text-sm font-mono">{r.invoice}</td>
                <td className="px-4 py-3.5 text-white text-sm font-medium">{r.client}</td>
                <td className="px-4 py-3.5 text-emerald-400 text-sm font-semibold">{r.amount}</td>
                <td className="px-4 py-3.5 text-gray-300 text-sm">{r.due}</td>
                <td className="px-4 py-3.5 text-gray-400 text-sm">{r.contact}</td>
                <td className="px-4 py-3.5">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusStyle[r.status]}`}>{r.status}</span>
                </td>
                <td className="px-4 py-3.5 flex gap-1.5">
                  {r.status !== 'Paid' && (
                    <>
                      <button onClick={() => setReminderInv(r)} className="px-2 py-1 bg-gray-700 text-gray-300 border border-gray-600 rounded text-xs hover:bg-gray-600">Remind</button>
                      <button onClick={() => setMarkPaid(r.invoice)} className="px-2 py-1 bg-emerald-600 text-white rounded text-xs hover:bg-emerald-700">Mark Paid</button>
                    </>
                  )}
                  {r.status === 'Paid' && <span className="text-emerald-400 text-xs">✓ Collected</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Invoice Modal */}
      <Modal open={showCreate} onClose={handleClose} title="Create Invoice">
        <div className="space-y-4">

          <FormField label="Client Name">
            <input
              className={errBorder(inputCls, !!(touched.client && errors.client))}
              value={form.client}
              onChange={e => handleChange('client', e.target.value)}
              onBlur={() => handleBlur('client')}
              placeholder="e.g. Acme Corporation"
            />
            <Err msg={touched.client ? errors.client : undefined} />
          </FormField>

          <FormField label="Amount ($)">
            <input
              type="number"
              className={errBorder(inputCls, !!(touched.amount && errors.amount))}
              value={form.amount}
              onChange={e => handleChange('amount', e.target.value)}
              onBlur={() => handleBlur('amount')}
              placeholder="e.g. 12400"
            />
            <Err msg={touched.amount ? errors.amount : undefined} />
          </FormField>

          <FormField label="Due Date">
            <input
              type="date"
              className={errBorder(inputCls, !!(touched.due && errors.due))}
              value={form.due}
              onChange={e => handleChange('due', e.target.value)}
              onBlur={() => handleBlur('due')}
            />
            <Err msg={touched.due ? errors.due : undefined} />
          </FormField>

          <FormField label="Contact Email">
            <input
              type="email"
              className={errBorder(inputCls, !!(touched.contact && errors.contact))}
              value={form.contact}
              onChange={e => handleChange('contact', e.target.value)}
              onBlur={() => handleBlur('contact')}
              placeholder="billing@client.com"
            />
            <Err msg={touched.contact ? errors.contact : undefined} />
          </FormField>

          <div className="flex gap-3 pt-2">
            <button onClick={handleClose} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">
              Cancel
            </button>
            <button onClick={handleCreate} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
              Send Invoice
            </button>
          </div>

        </div>
      </Modal>

      {/* Send Reminder Modal */}
      <Modal open={!!reminderInv} onClose={() => setReminderInv(null)} title="Send Payment Reminder" size="sm">
        <div className="space-y-4">
          <p className="text-gray-600 text-sm">
            Send a payment reminder to <strong>{reminderInv?.contact}</strong> for invoice <strong>{reminderInv?.invoice}</strong> ({reminderInv?.amount})?
          </p>
          <div className="flex gap-3">
            <button onClick={() => setReminderInv(null)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
            <button onClick={handleReminder} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Send Reminder</button>
          </div>
        </div>
      </Modal>

      {/* Mark Paid Modal */}
      <Modal open={!!markPaid} onClose={() => setMarkPaid(null)} title="Mark as Paid" size="sm">
        <div className="space-y-4">
          <p className="text-gray-600 text-sm">
            Confirm that payment has been received for <strong>{markPaid}</strong>?
          </p>
          <div className="flex gap-3">
            <button onClick={() => setMarkPaid(null)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
            <button onClick={() => handleMarkPaid(markPaid!)} className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700">Mark as Paid</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}