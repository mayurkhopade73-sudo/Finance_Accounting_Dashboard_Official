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
//           { label: 'Overdue', value: `$${receivables.filter(r => r.status === 'Overdue').reduce((s, r) => s + parseFloat(r.amount.replace(/[$,]/g, '')), 0).toLocaleString()}`, color: 'text-rose-400' },
//           { label: 'Collected', value: `$${collected.toLocaleString()}`, color: 'text-emerald-400' },
//           { label: 'Active Invoices', value: receivables.filter(r => r.status !== 'Paid').length.toString(), color: 'text-blue-400' },
//         ].map(s => (
//           <div key={s.label} className="bg-gray-900 rounded-xl p-5"><div className="text-gray-400 text-sm mb-2">{s.label}</div><div className={`text-2xl font-bold ${s.color}`}>{s.value}</div></div>
//         ))}
//       </div>

//       <div className="bg-gray-900 rounded-xl overflow-hidden">
//         <table className="w-full">
//           <thead><tr className="bg-gray-800 border-b border-gray-700">{['Invoice', 'Client', 'Amount', 'Due Date', 'Contact', 'Status', 'Actions'].map(h => <th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3">{h}</th>)}</tr></thead>
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
//           <FormField label="Client Name"><input className={inputCls} value={form.client} onChange={e => setForm(f => ({ ...f, client: e.target.value }))} placeholder="e.g. Acme Corporation" /></FormField>
//           <FormField label="Amount ($)"><input type="number" className={inputCls} value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} placeholder="e.g. 12400" /></FormField>
//           <FormField label="Due Date"><input type="date" className={inputCls} value={form.due} onChange={e => setForm(f => ({ ...f, due: e.target.value }))} /></FormField>
//           <FormField label="Contact Email"><input type="email" className={inputCls} value={form.contact} onChange={e => setForm(f => ({ ...f, contact: e.target.value }))} placeholder="billing@client.com" /></FormField>
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
import { useState, useMemo, useEffect } from 'react';
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

// Custom light-theme input class specifically for the white modal
const lightInputCls = "w-full border border-gray-300 rounded-md px-3 py-2.5 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm placeholder:text-gray-400 transition-colors";

export default function AccountsReceivablePage() {
  const [receivables, setReceivables] = useState(initReceivables);
  const [showCreate, setShowCreate] = useState(false);
  const [reminderInv, setReminderInv] = useState<typeof initReceivables[0] | null>(null);
  const [markPaid, setMarkPaid] = useState<string | null>(null);
  const [toast, setToast] = useState('');

  // Extended Form State to match your image
  const [form, setForm] = useState({
    client: '',
    invoiceNumber: '',
    amount: '',
    tax: '',
    discount: '',
    paymentTerms: '',
    due: '',
    contact: ''
  });

  // Validation Errors State
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auto-fill Invoice number when modal opens (optional helpful feature)
  useEffect(() => {
    if (showCreate && !form.invoiceNumber) {
      setForm(prev => ({ ...prev, invoiceNumber: `INV-${2047 + receivables.length}` }));
    }
  }, [showCreate, receivables.length]);

  // Dynamically calculate final total
  const finalTotalAmount = useMemo(() => {
    const baseAmt = parseFloat(form.amount) || 0;
    const taxAmt = parseFloat(form.tax) || 0;
    const discAmt = parseFloat(form.discount) || 0;
    const total = baseAmt + (baseAmt * (taxAmt / 100)) - (baseAmt * (discAmt / 100));
    return total > 0 ? total.toFixed(2) : '';
  }, [form.amount, form.tax, form.discount]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!form.client.trim()) newErrors.client = "This field is required";
    if (!form.invoiceNumber.trim()) newErrors.invoiceNumber = "This field is required";
    if (!form.amount || isNaN(Number(form.amount))) newErrors.amount = "This field is required";
    if (!form.due) newErrors.due = "This field is required";
    if (!form.contact.trim()) newErrors.contact = "This field is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = () => {
    if (!validateForm()) return;

    const newRec = {
      invoice: form.invoiceNumber,
      client: form.client,
      amount: `$${Number(finalTotalAmount || form.amount).toLocaleString('en-US')}`,
      due: form.due,
      contact: form.contact,
      status: 'Sent'
    };

    setReceivables(prev => [newRec, ...prev]);

    // Reset Form
    setForm({ client: '', invoiceNumber: '', amount: '', tax: '', discount: '', paymentTerms: '', due: '', contact: '' });
    setErrors({});
    setShowCreate(false);
    setToast('Invoice sent successfully!');
  };

  const closeCreateModal = () => {
    setShowCreate(false);
    setErrors({});
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
              {['Invoice', 'Client', 'Amount', 'Due Date', 'Contact', 'Status', 'Actions'].map(h => <th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3">{h}</th>)}
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
                  {r.status !== 'Paid' && <>
                    <button onClick={() => setReminderInv(r)} className="px-2 py-1 bg-gray-700 text-gray-300 border border-gray-600 rounded text-xs hover:bg-gray-600">Remind</button>
                    <button onClick={() => setMarkPaid(r.invoice)} className="px-2 py-1 bg-emerald-600 text-white rounded text-xs hover:bg-emerald-700">Mark Paid</button>
                  </>}
                  {r.status === 'Paid' && <span className="text-emerald-400 text-xs">✓ Collected</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- UPDATED MODAL MATCHING EXACTLY WITH YOUR IMAGE --- */}
      <Modal open={showCreate} onClose={closeCreateModal} title="Create Invoice">
        <div className="space-y-5 pt-2">

          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <FormField label="CLIENT NAME">
                <input className={`${lightInputCls} ${errors.client ? 'border-red-500 ring-1 ring-red-500' : ''}`} value={form.client} onChange={e => setForm(f => ({ ...f, client: e.target.value }))} placeholder="e.g. Acme Corporation" />
              </FormField>
              {errors.client && <span className="text-red-500 text-xs mt-1 block">{errors.client}</span>}
            </div>
            <div>
              <FormField label="INVOICE NUMBER">
                <input className={`${lightInputCls} ${errors.invoiceNumber ? 'border-red-500 ring-1 ring-red-500' : ''}`} value={form.invoiceNumber} onChange={e => setForm(f => ({ ...f, invoiceNumber: e.target.value }))} placeholder="e.g., INV-2050" />
              </FormField>
              {errors.invoiceNumber && <span className="text-red-500 text-xs mt-1 block">{errors.invoiceNumber}</span>}
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <FormField label="AMOUNT ($)">
                <input type="number" className={`${lightInputCls} ${errors.amount ? 'border-red-500 ring-1 ring-red-500' : ''}`} value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} placeholder="e.g. 12400" />
              </FormField>
              {errors.amount && <span className="text-red-500 text-xs mt-1 block">{errors.amount}</span>}
            </div>
            <div>
              <FormField label="TAX AMOUNT (%)">
                <input type="number" className={lightInputCls} value={form.tax} onChange={e => setForm(f => ({ ...f, tax: e.target.value }))} placeholder="e.g., 5%" />
              </FormField>
            </div>
            <div>
              <FormField label="DISCOUNT (%)">
                <input type="number" className={lightInputCls} value={form.discount} onChange={e => setForm(f => ({ ...f, discount: e.target.value }))} placeholder="e.g., 2%" />
              </FormField>
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <FormField label="PAYMENT TERMS">
                <input className={lightInputCls} value={form.paymentTerms} onChange={e => setForm(f => ({ ...f, paymentTerms: e.target.value }))} placeholder="e.g., Net 30 days" />
              </FormField>
            </div>
            <div>
              <FormField label="FINAL TOTAL ($)">
                <input className={`${lightInputCls} bg-gray-100 text-gray-600 font-medium cursor-not-allowed border-gray-200`} value={finalTotalAmount} readOnly placeholder="e.g., 12770" />
              </FormField>
            </div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <FormField label="DUE DATE">
                <input type="date" className={`${lightInputCls} ${errors.due ? 'border-red-500 ring-1 ring-red-500' : ''}`} value={form.due} onChange={e => setForm(f => ({ ...f, due: e.target.value }))} />
              </FormField>
              {errors.due && <span className="text-red-500 text-xs mt-1 block">{errors.due}</span>}
            </div>
            <div>
              <FormField label="CONTACT EMAIL">
                <input type="email" className={`${lightInputCls} ${errors.contact ? 'border-red-500 ring-1 ring-red-500' : ''}`} value={form.contact} onChange={e => setForm(f => ({ ...f, contact: e.target.value }))} placeholder="billing@client.com" />
              </FormField>
              {errors.contact && <span className="text-red-500 text-xs mt-1 block">{errors.contact}</span>}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 mt-2">
            <button onClick={closeCreateModal} className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 bg-white rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm">Cancel</button>
            <button onClick={handleCreate} className="flex-1 px-4 py-2.5 bg-[#2563eb] text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm">Send Invoice</button>
          </div>

        </div>
      </Modal>

      {/* Existing Modals */}
      <Modal open={!!reminderInv} onClose={() => setReminderInv(null)} title="Send Payment Reminder" size="sm">
        <div className="space-y-4">
          <p className="text-gray-600 text-sm">Send a payment reminder to <strong>{reminderInv?.contact}</strong> for invoice <strong>{reminderInv?.invoice}</strong> ({reminderInv?.amount})?</p>
          <div className="flex gap-3">
            <button onClick={() => setReminderInv(null)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
            <button onClick={handleReminder} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Send Reminder</button>
          </div>
        </div>
      </Modal>

      <Modal open={!!markPaid} onClose={() => setMarkPaid(null)} title="Mark as Paid" size="sm">
        <div className="space-y-4">
          <p className="text-gray-600 text-sm">Confirm that payment has been received for <strong>{markPaid}</strong>?</p>
          <div className="flex gap-3">
            <button onClick={() => setMarkPaid(null)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
            <button onClick={() => handleMarkPaid(markPaid!)} className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700">Mark as Paid</button>
          </div>
        </div>
      </Modal>

    </div>
  );
}


