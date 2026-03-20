
'use client';
import { useState } from 'react';
import { Plus, Download } from 'lucide-react';
import { Modal, Toast, FormField, inputCls, selectCls } from '../../components/Modal';

const initEntries = [
  { id: 'JE-001', date: 'Mar 12, 2026', account: 'Cash & Equivalents', description: 'Client payment received - Acme Corp', debit: '$12,400', credit: '—', balance: '$2,37,500' },
  { id: 'JE-002', date: 'Mar 12, 2026', account: 'Accounts Receivable', description: 'Client payment received - Acme Corp', debit: '—', credit: '$12,400', balance: '$48,200' },
  { id: 'JE-003', date: 'Mar 11, 2026', account: 'Office Rent Expense', description: 'Monthly rent - Mumbai Office', debit: '$3,200', credit: '—', balance: '$38,400' },
  { id: 'JE-004', date: 'Mar 11, 2026', account: 'Cash & Equivalents', description: 'Monthly rent - Mumbai Office', debit: '—', credit: '$3,200', balance: '$2,25,100' },
  { id: 'JE-005', date: 'Mar 10, 2026', account: 'Revenue - Services', description: 'Invoice INV-2045 raised', debit: '—', credit: '$8,200', balance: '$7,45,000' },
];

export default function GeneralLedgerPage() {
  const [entries, setEntries] = useState(initEntries);
  const [showCreate, setShowCreate] = useState(false);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({ date: '', description: '', currency: 'USD', attachment: null as File | null });
  const [rows, setRows] = useState([{ account: '', debit: '', credit: '' }, { account: '', debit: '', credit: '' }]);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [search, setSearch] = useState('');
  const [filterAccount, setFilterAccount] = useState('All Accounts');

  const filteredEntries = entries.filter(e => {
  const q = search.trim().toLowerCase();
  const matchSearch = q === '' || 
    e.description.toLowerCase().includes(q) ||
    e.account.toLowerCase().includes(q) ||
    e.id.toLowerCase().includes(q) ||
    e.date.toLowerCase().includes(q);
  const matchAccount = filterAccount === 'All Accounts' || e.account === filterAccount;
  return matchSearch && matchAccount;
}); 

  const handleCreate = () => {
  const newErrors: Record<string, boolean> = {};
  if (!form.date) newErrors.date = true;
  if (!form.description) newErrors.description = true;
  const validRows = rows.filter(r => r.account);
  if (validRows.length === 0) newErrors.rows = true;
  if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

  validRows.forEach((r, i) => {
    const newEntry = {
      id: `JE-00${entries.length + i + 1}`,
      date: new Date(form.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      account: r.account,
      description: form.description,
      debit: r.debit ? `$${r.debit}` : '—',
      credit: r.credit ? `$${r.credit}` : '—',
      balance: '$0',
    };
    setEntries(prev => [...prev, newEntry]);
  });

  setForm({ date: '', description: '', currency: 'USD', attachment: null });
  setRows([{ account: '', debit: '', credit: '' }, { account: '', debit: '', credit: '' }]);
  setErrors({});
  setShowCreate(false);
  setToast('Journal entry posted successfully!');
};

  const handleExport = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    const tableRows = entries.map(e => `
      <tr>
        <td>${e.id}</td>
        <td>${e.date}</td>
        <td>${e.account}</td>
        <td>${e.description}</td>
        <td style="color:#10b981">${e.debit}</td>
        <td style="color:#f43f5e">${e.credit}</td>
        <td style="color:#f59e0b;font-weight:600">${e.balance}</td>
      </tr>
    `).join('');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>General Ledger</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 32px; color: #111; }
            h1 { font-size: 24px; margin-bottom: 4px; }
            p { color: #666; font-size: 13px; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; font-size: 13px; }
            th { background: #1f2937; color: #fff; text-align: left; padding: 10px 12px; }
            td { padding: 10px 12px; border-bottom: 1px solid #e5e7eb; }
            tr:nth-child(even) { background: #f9fafb; }
          </style>
        </head>
        <body>
          <h1>General Ledger</h1>
          <p>All journal entries and account balances — Exported on ${new Date().toLocaleDateString()}</p>
          <table>
            <thead>
              <tr>
                <th>Entry ID</th><th>Date</th><th>Account</th>
                <th>Description</th><th>Debit</th><th>Credit</th><th>Balance</th>
              </tr>
            </thead>
            <tbody>${tableRows}</tbody>
          </table>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();

//   'use client';
//   import { useState } from 'react';
//   import { Plus, Download } from 'lucide-react';
//   import { Modal, Toast, FormField, inputCls, selectCls } from '../../components/Modal';

//   const initEntries = [
//     { id: 'JE-001', date: 'Mar 12, 2026', account: 'Cash & Equivalents', description: 'Client payment received - Acme Corp', debit: '$12,400', credit: '—', balance: '$2,37,500' },
//     { id: 'JE-002', date: 'Mar 12, 2026', account: 'Accounts Receivable', description: 'Client payment received - Acme Corp', debit: '—', credit: '$12,400', balance: '$48,200' },
//     { id: 'JE-003', date: 'Mar 11, 2026', account: 'Office Rent Expense', description: 'Monthly rent - Mumbai Office', debit: '$3,200', credit: '—', balance: '$38,400' },
//     { id: 'JE-004', date: 'Mar 11, 2026', account: 'Cash & Equivalents', description: 'Monthly rent - Mumbai Office', debit: '—', credit: '$3,200', balance: '$2,25,100' },
//     { id: 'JE-005', date: 'Mar 10, 2026', account: 'Revenue - Services', description: 'Invoice INV-2045 raised', debit: '—', credit: '$8,200', balance: '$7,45,000' },
//   ];

//   export default function GeneralLedgerPage() {
//     const [entries, setEntries] = useState(initEntries);
//     const [showCreate, setShowCreate] = useState(false);
//     const [toast, setToast] = useState('');
//     const [form, setForm] = useState({ account: '', description: '', debit: '', credit: '' });

//     const handleCreate = () => {
//       if (!form.account || !form.description) return;
//       const newEntry = {
//         id: `JE-00${entries.length + 1}`,
//         date: 'Mar 13, 2026',
//         account: form.account,
//         description: form.description,
//         debit: form.debit ? `$${form.debit}` : '—',
//         credit: form.credit ? `$${form.credit}` : '—',
//         balance: '$0',
//       };
//       setEntries(prev => [newEntry, ...prev]);
//       setForm({ account: '', description: '', debit: '', credit: '' });
//       setShowCreate(false);
//       setToast('Journal entry posted successfully!');
//     };

//     const handleExport = () => {
//       const csv = ['ID,Date,Account,Description,Debit,Credit,Balance', ...entries.map(e => `${e.id},${e.date},${e.account},${e.description},${e.debit},${e.credit},${e.balance}`)].join('\n');
//       const blob = new Blob([csv], { type: 'text/csv' });
//       const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'general-ledger.csv'; a.click();
//     };


//   return (
//     <div className="p-6 space-y-6">
//       {toast && <Toast message={toast} onDone={() => setToast('')} />}
//       <div className="flex items-center justify-between">
//         <div><h1 className="text-2xl font-bold text-white-800">General Ledger</h1><p className="text-gray-500 text-sm mt-1">All journal entries and account balances</p></div>
//         <div className="flex gap-2">
//           <button onClick={handleExport} className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50"><Download className="w-4 h-4" /> Export</button>
//           <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"><Plus className="w-4 h-4" /> Journal Entry</button>
//         </div>
//       </div>

//       <div className="bg-gray-900 rounded-xl overflow-hidden">
//         <table className="w-full">
//           <thead><tr className="bg-gray-800 border-b border-gray-700">{['Entry ID','Date','Account','Description','Debit','Credit','Balance'].map(h=><th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3">{h}</th>)}</tr></thead>
//           <tbody className="divide-y divide-gray-800">
//             {entries.map(e => (
//               <tr key={e.id} className="hover:bg-gray-800/60">
//                 <td className="px-4 py-3.5 text-blue-400 text-sm font-mono">{e.id}</td>
//                 <td className="px-4 py-3.5 text-gray-400 text-sm">{e.date}</td>
//                 <td className="px-4 py-3.5 text-white text-sm font-medium">{e.account}</td>
//                 <td className="px-4 py-3.5 text-gray-300 text-sm">{e.description}</td>
//                 <td className="px-4 py-3.5 text-emerald-400 text-sm">{e.debit}</td>
//                 <td className="px-4 py-3.5 text-rose-400 text-sm">{e.credit}</td>
//                 <td className="px-4 py-3.5 text-amber-400 text-sm font-semibold">{e.balance}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <Modal open={showCreate} onClose={() => setShowCreate(false)} title="New Journal Entry">
//         <div className="space-y-4">
//           <FormField label="Account"><select className={selectCls} value={form.account} onChange={e=>setForm(f=>({...f,account:e.target.value}))}><option value="">Select account...</option><option>Cash & Equivalents</option><option>Accounts Receivable</option><option>Accounts Payable</option><option>Revenue - Services</option><option>Office Rent Expense</option><option>Salaries Expense</option></select></FormField>
//           <FormField label="Description"><input className={inputCls} placeholder="Transaction description" value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} /></FormField>
//           <div className="grid grid-cols-2 gap-3">
//             <FormField label="Debit ($)"><input type="number" className={inputCls} placeholder="0.00" value={form.debit} onChange={e=>setForm(f=>({...f,debit:e.target.value,credit:''}))} /></FormField>
//             <FormField label="Credit ($)"><input type="number" className={inputCls} placeholder="0.00" value={form.credit} onChange={e=>setForm(f=>({...f,credit:e.target.value,debit:''}))} /></FormField>
//           </div>
//           <div className="flex gap-3 pt-2">
//             <button onClick={() => setShowCreate(false)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
//             <button onClick={handleCreate} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Post Entry</button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// }
  


// // 'use client';
// // import { useState, useMemo, useEffect } from 'react';
// // import { Plus, X, Upload } from 'lucide-react';

// // function Modal({ open, onClose, title, children }) {
// //   if (!open) return null;
// //   return (
// //     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-3">
// //       <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-4 md:p-6 space-y-4">
// //         <div className="flex justify-between items-center">
// //           <h2 className="text-lg md:text-xl font-semibold">{title}</h2>
// //           <button onClick={onClose}><X size={18} /></button>
// //         </div>
// //         {children}
// //       </div>
// //     </div>
// //   );
// // }

// // function Toast({ message, onDone }) {
// //   useEffect(() => {
// //     const t = setTimeout(onDone, 2000);
// //     return () => clearTimeout(t);
// //   }, [message]);
// //   return (
// //     <div className="fixed bottom-5 right-5 bg-black text-white px-4 py-2 rounded text-sm">
// //       {message}
// //     </div>
// //   );
// // }

// // const inputCls = "w-full border rounded px-2 py-2 text-sm";
// // const selectCls = inputCls;

// // const currencies = ['USD','INR','EUR'];

// // const accountsList = [
// //   'Cash & Equivalents',
// //   'Accounts Receivable',
// //   'Accounts Payable',
// //   'Revenue - Services',
// //   'Office Rent Expense',
// //   'Salaries Expense'
// // ];

// // export default function GeneralLedgerPage() {

// //   const [entries, setEntries] = useState([
// //     { id: 1, date: '2026-03-15', description: 'Office Rent Payment', account: 'Office Rent Expense', debit: '5000', credit: '0', currency: 'INR', status: 'Posted', attachment: 'rent.pdf' },
// //     { id: 2, date: '2026-03-16', description: 'Client Service Revenue', account: 'Revenue - Services', debit: '0', credit: '8000', currency: 'USD', status: 'Posted', attachment: '' },
// //     { id: 3, date: '2026-03-17', description: 'Salary Payment', account: 'Salaries Expense', debit: '3000', credit: '0', currency: 'INR', status: 'Draft', attachment: 'salary.xlsx' }
// //   ]);

// //   const [toast, setToast] = useState('');
// //   const [search, setSearch] = useState('');
// //   const [selectedAccount, setSelectedAccount] = useState('');
// //   const [showCreate, setShowCreate] = useState(false);
// //   const [file, setFile] = useState(null);
// //   const [editId, setEditId] = useState(null);

// //   const [form, setForm] = useState({
// //     date: new Date().toISOString().split('T')[0],
// //     description: '',
// //     currency: 'USD',
// //     lines: [{ account: '', debit: '', credit: '' }]
// //   });

// //   const [errors, setErrors] = useState({});

// //   const addLine = () => setForm(f => ({ ...f, lines: [...f.lines, { account:'', debit:'', credit:'' }] }));

// //   const updateLine = (i, field, value) => {
// //     const lines = [...form.lines];
// //     lines[i][field] = value;
// //     if(field==='debit') lines[i].credit='';
// //     if(field==='credit') lines[i].debit='';
// //     setForm(f=>({...f, lines}));
// //   };

// //   const handleCreate = (type='Posted') => {

// //     let newErrors = {};
// //     if (!form.description) newErrors.description = 'Required';

// //     form.lines.forEach((l,i)=>{
// //       if (!l.account) newErrors[`account_${i}`] = 'Required';
// //       if (!l.debit && !l.credit) newErrors[`amount_${i}`] = 'Enter amount';
// //     });

// //     const totalDebit = form.lines.reduce((s,l)=>s+Number(l.debit||0),0);
// //     const totalCredit = form.lines.reduce((s,l)=>s+Number(l.credit||0),0);

// //     if (totalDebit !== totalCredit) {
// //       setToast('Debit & Credit must match');
// //       return;
// //     }

// //     if (Object.keys(newErrors).length) {
// //       setErrors(newErrors);
// //       return;
// //     }

// //     setErrors({});

// //     if (editId !== null) {
// //       setEntries(prev => prev.map(item =>
// //         item.id === editId
// //           ? { ...item, ...form.lines[0], date: form.date, description: form.description, currency: form.currency, status: type }
// //           : item
// //       ));
// //       setToast('Updated');
// //     } else {
// //       let nextId = Math.max(...entries.map(e => e.id), 0) + 1;
// //       const newData = form.lines.map(l => ({
// //         id: nextId++,
// //         date: form.date,
// //         description: form.description,
// //         account: l.account,
// //         debit: l.debit || '0',
// //         credit: l.credit || '0',
// //         currency: form.currency,
// //         status: type,
// //         attachment: file?.name || ''
// //       }));
// //       setEntries(prev => [...prev, ...newData]);
// //       setToast(type === 'Draft' ? 'Saved Draft' : 'Posted');
// //     }

// //     setShowCreate(false);
// //     setEditId(null);
// //     setFile(null);
// //   };

// //   const filteredEntries = useMemo(()=>{
// //     return entries.filter(e =>
// //       e.description.toLowerCase().includes(search.toLowerCase()) &&
// //       (!selectedAccount || e.account === selectedAccount)
// //     );
// //   },[entries, search, selectedAccount]);

// //   const totals = useMemo(()=>{
// //     let debit=0, credit=0;
// //     filteredEntries.forEach(e=>{
// //       debit += Number(e.debit);
// //       credit += Number(e.credit);
// //     });
// //     return { debit, credit, net: debit-credit, count: filteredEntries.length };
// //   },[filteredEntries]);

// //   const handleImport = (e) => {
// //     const file = e.target.files[0];
// //     if (!file || file.type !== 'application/pdf') {
// //       setToast('Only PDF allowed');
// //       return;
// //     }

// //     setEntries(prev => [...prev, {
// //       id: Math.max(...entries.map(e => e.id), 0) + 1,
// //       date: new Date().toISOString().split('T')[0],
// //       description: 'Imported Statement',
// //       account: 'Accounts Receivable',
// //       debit: '0',
// //       credit: '0',
// //       currency: 'USD',
// //       status: 'Posted',
// //       attachment: file.name
// //     }]);

// //     setToast('PDF Imported');
// //   };

// //   return (
// //     <div className="p-4 md:p-6 space-y-6">

// //       {toast && <Toast message={toast} onDone={()=>setToast('')} />}

// //       {/* HEADER */}
// //       <div className="flex flex-col md:flex-row justify-between gap-3">
// //         <div>
// //           <h1 className="text-2xl md:text-4xl font-bold">General Ledger</h1>
// //           <p className="text-gray-400 text-sm">All journal entries</p>
// //         </div>

// //         <div className="flex flex-wrap gap-2">
// //           <label className="border px-3 py-2 rounded flex gap-1 cursor-pointer text-sm">
// //             <Upload size={16}/> Import
// //             <input type="file" hidden onChange={handleImport}/>
// //           </label>

// //           <button
// //             className="bg-blue-600 text-white px-3 py-2 rounded flex gap-1 text-sm"
// //             onClick={()=>setShowCreate(true)}
// //           >
// //             <Plus size={16}/> New
// //           </button>
// //         </div>
// //       </div>

// //       {/* SEARCH */}
// //       <div className="flex flex-col md:flex-row gap-3">
// //         <input
// //           placeholder="Search..."
// //           className="border px-3 py-2 rounded w-full md:w-1/3"
// //           onChange={e=>setSearch(e.target.value)}
// //         />

// //         <select className="border px-3 py-2 rounded" onChange={e=>setSelectedAccount(e.target.value)}>
// //           <option value="">All Accounts</option>
// //           {accountsList.map(a=><option key={a}>{a}</option>)}
// //         </select>
// //       </div>

// //       {/* CARDS */}
// //       <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
// //         <div className="bg-gray-900 text-white p-3 rounded">Debit<br/>{totals.debit}</div>
// //         <div className="bg-gray-900 text-white p-3 rounded">Credit<br/>{totals.credit}</div>
// //         <div className="bg-gray-900 text-white p-3 rounded">Net<br/>{totals.net}</div>
// //         <div className="bg-gray-900 text-white p-3 rounded">Entries<br/>{totals.count}</div>
// //       </div>

// //       {/* TABLE */}
// //       <div className="overflow-x-auto border rounded-xl">
// //         <table className="min-w-[800px] w-full text-sm">
// //           <thead className="bg-gray-800 text-white">
// //             <tr>
// //               {['ID','Date','Desc','Account','Debit','Credit','Status','Actions'].map(h=>
// //                 <th key={h} className="px-3 py-2 text-left">{h}</th>
// //               )}
// //             </tr>
// //           </thead>

// //           <tbody>
// //             {filteredEntries.map(e=>(
// //               <tr key={e.id} className="border-t">
// //                 <td className="px-3 py-2">{e.id}</td>
// //                 <td className="px-3 py-2">{e.date}</td>
// //                 <td className="px-3 py-2">{e.description}</td>
// //                 <td className="px-3 py-2">{e.account}</td>
// //                 <td className="px-3 py-2 text-green-600">{e.debit}</td>
// //                 <td className="px-3 py-2 text-red-600">{e.credit}</td>
// //                 <td className="px-3 py-2">{e.status}</td>
// //                 <td className="px-3 py-2 flex gap-2">
// //                   <button className="text-xs bg-yellow-500 px-2 py-1 text-white rounded"
// //                     onClick={()=>{ setEditId(e.id); setShowCreate(true); }}>
// //                     Edit
// //                   </button>

// //                   <button className="text-xs bg-red-600 px-2 py-1 text-white rounded"
// //                     onClick={()=>setEntries(prev=>prev.filter(i=>i.id!==e.id))}>
// //                     Delete
// //                   </button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>

// //       {/* MODAL */}
// //       <Modal open={showCreate} onClose={()=>setShowCreate(false)} title="Journal Entry">

// //         <input type="date" className={inputCls}
// //           value={form.date}
// //           onChange={e=>setForm(f=>({...f,date:e.target.value}))}
// //         />

// //         <input className={inputCls}
// //           placeholder="Description"
// //           value={form.description}
// //           onChange={e=>setForm(f=>({...f,description:e.target.value}))}
// //         />

// //         <select className={selectCls}
// //           value={form.currency}
// //           onChange={e=>setForm(f=>({...f,currency:e.target.value}))}
// //         >
// //           {currencies.map(c=><option key={c}>{c}</option>)}
// //         </select>

// //         {form.lines.map((l,i)=>(
// //           <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-2">
// //             <select className={inputCls}
// //               value={l.account}
// //               onChange={e=>updateLine(i,'account',e.target.value)}
// //             >
// //               <option value="">Account</option>
// //               {accountsList.map(a=><option key={a}>{a}</option>)}
// //             </select>

// //             <input className={inputCls}
// //               placeholder="Debit"
// //               value={l.debit}
// //               onChange={e=>updateLine(i,'debit',e.target.value)}
// //             />

// //             <input className={inputCls}
// //               placeholder="Credit"
// //               value={l.credit}
// //               onChange={e=>updateLine(i,'credit',e.target.value)}
// //             />
// //           </div>
// //         ))}

// //         <input type="file" onChange={e=>setFile(e.target.files[0])}/>

// //         <div className="flex flex-wrap gap-2">
// //           <button onClick={addLine} className="px-3 py-2 border rounded">Add Row</button>
// //           <button onClick={()=>handleCreate('Draft')} className="px-3 py-2 bg-yellow-500 text-white rounded">Draft</button>
// //           <button onClick={()=>handleCreate('Posted')} className="px-3 py-2 bg-blue-600 text-white rounded">Post</button>
// //         </div>

// //       </Modal>
// //     </div>
// //   );
// // }


'use client';
import { useState } from 'react';
import { Plus, Download } from 'lucide-react';
import { Modal, Toast, FormField, inputCls, selectCls } from '../../components/Modal';

const initEntries = [
  { id: 'JE-001', date: 'Mar 12, 2026', account: 'Cash & Equivalents', description: 'Client payment received - Acme Corp', debit: '$12,400', credit: '—', balance: '$2,37,500' },
  { id: 'JE-002', date: 'Mar 12, 2026', account: 'Accounts Receivable', description: 'Client payment received - Acme Corp', debit: '—', credit: '$12,400', balance: '$48,200' },
  { id: 'JE-003', date: 'Mar 11, 2026', account: 'Office Rent Expense', description: 'Monthly rent - Mumbai Office', debit: '$3,200', credit: '—', balance: '$38,400' },
  { id: 'JE-004', date: 'Mar 11, 2026', account: 'Cash & Equivalents', description: 'Monthly rent - Mumbai Office', debit: '—', credit: '$3,200', balance: '$2,25,100' },
  { id: 'JE-005', date: 'Mar 10, 2026', account: 'Revenue - Services', description: 'Invoice INV-2045 raised', debit: '—', credit: '$8,200', balance: '$7,45,000' },
];

type FormState = {
  account: string;
  description: string;
  debit: string;
  credit: string;
};

type FormErrors = {
  account?: string;
  description?: string;
  amount?: string;
};

const defaultForm: FormState = { account: '', description: '', debit: '', credit: '' };

function validate(form: FormState): FormErrors {
  const errs: FormErrors = {};
  if (!form.account) errs.account = 'Please select an account.';
  if (!form.description.trim()) errs.description = 'Description is required.';
  if (!form.debit && !form.credit) errs.amount = 'Enter either a Debit or Credit amount.';
  return errs;
}

// Inline error message
function Err({ msg }: { msg?: string }) {
  return msg ? <p className="text-rose-500 text-xs mt-1">{msg}</p> : null;
}

// Field border helper
function fieldBorderCls(base: string, hasError: boolean) {
  return hasError
    ? base.replace('border-gray-200', 'border-rose-400').replace('focus:border-blue-400', 'focus:border-rose-400') + ' border-rose-400'
    : base;
}

export default function GeneralLedgerPage() {
  const [entries, setEntries] = useState(initEntries);
  const [showCreate, setShowCreate] = useState(false);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState<FormState>(defaultForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (field: keyof FormState, value: string) => {
    let updated = { ...form, [field]: value };
    // Debit and credit are mutually exclusive
    if (field === 'debit' && value) updated.credit = '';
    if (field === 'credit' && value) updated.debit = '';
    setForm(updated);
    // Re-validate touched fields
    if (Object.keys(touched).length > 0) {
      setErrors(validate(updated));
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setErrors(validate(form));
  };

  const handleCreate = () => {
    // Touch all fields on submit attempt
    setTouched({ account: true, description: true, amount: true });
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const newEntry = {
      id: `JE-00${entries.length + 1}`,
      date: 'Mar 13, 2026',
      account: form.account,
      description: form.description,
      debit: form.debit ? `$${form.debit}` : '—',
      credit: form.credit ? `$${form.credit}` : '—',
      balance: '$0',
    };
    setEntries(prev => [newEntry, ...prev]);
    setForm(defaultForm);
    setErrors({});
    setTouched({});
    setShowCreate(false);
    setToast('Journal entry posted successfully!');
  };

  const handleClose = () => {
    setShowCreate(false);
    setForm(defaultForm);
    setErrors({});
    setTouched({});
  };

  const handleExport = () => {
    const csv = [
      'ID,Date,Account,Description,Debit,Credit,Balance',
      ...entries.map(e => `${e.id},${e.date},${e.account},${e.description},${e.debit},${e.credit},${e.balance}`),
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'general-ledger.csv';
    a.click();

  };

  return (
    <div className="p-6 space-y-6">
      {toast && <Toast message={toast} onDone={() => setToast('')} />}


      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white-800">General Ledger</h1>
          <p className="text-gray-500 text-sm mt-1">All journal entries and account balances</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleExport} className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">
            <Download className="w-4 h-4" /> Export
          </button>
          <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
            <Plus className="w-4 h-4" /> Journal Entry
          </button>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex gap-3">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by description..."
          className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 focus:outline-none focus:border-blue-400"
        />
        <select
          value={filterAccount}
          onChange={e => setFilterAccount(e.target.value)}
          className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-blue-400"
        >
          <option>All Accounts</option>
          <option>Cash & Equivalents</option>
          <option>Accounts Receivable</option>
          <option>Accounts Payable</option>
          <option>Revenue - Services</option>
          <option>Office Rent Expense</option>
          <option>Salaries Expense</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-gray-900 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-800 border-b border-gray-700">

              {['Entry ID','Date','Account','Description','Debit','Credit','Balance'].map(h =>
                <th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3">{h}</th>
              )}

              {['Entry ID', 'Date', 'Account', 'Description', 'Debit', 'Credit', 'Balance'].map(h => (
                <th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3">{h}</th>
              ))}

            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filteredEntries.length > 0 ? filteredEntries.map(e => (
              <tr key={e.id} className="hover:bg-gray-800/60">
                <td className="px-4 py-3.5 text-blue-400 text-sm font-mono">{e.id}</td>
                <td className="px-4 py-3.5 text-gray-400 text-sm">{e.date}</td>
                <td className="px-4 py-3.5 text-white text-sm font-medium">{e.account}</td>
                <td className="px-4 py-3.5 text-gray-300 text-sm">{e.description}</td>
                <td className="px-4 py-3.5 text-emerald-400 text-sm">{e.debit}</td>
                <td className="px-4 py-3.5 text-rose-400 text-sm">{e.credit}</td>
                <td className="px-4 py-3.5 text-amber-400 text-sm font-semibold">{e.balance}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-500 text-sm">No entries found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>


      {/* New Journal Entry Modal */}
      {/* New Journal Entry Modal */}
<Modal open={showCreate} onClose={() => { setShowCreate(false); setErrors({}); }} title="Journal Entry" size="lg">
  <div className="space-y-4">

    {/* Date */}
    <div>
      <input
        type="date"
        className={`${inputCls} ${errors.date ? 'border-red-500' : ''}`}
        value={form.date}
        onChange={e => { setForm(f => ({ ...f, date: e.target.value })); setErrors(er => ({ ...er, date: false })); }}
      />
      {errors.date && <p className="text-red-500 text-xs mt-1">Date is required</p>}
    </div>

    {/* Description */}
    <div>
      <input
        className={`${inputCls} ${errors.description ? 'border-red-500' : ''}`}
        placeholder="Description"
        value={form.description}
        onChange={e => { setForm(f => ({ ...f, description: e.target.value })); setErrors(er => ({ ...er, description: false })); }}
      />
      {errors.description && <p className="text-red-500 text-xs mt-1">Description is required</p>}
    </div>

    {/* Currency */}
    <select
      className={selectCls}
      value={form.currency}
      onChange={e => setForm(f => ({ ...f, currency: e.target.value }))}
    >
      <option>USD</option>
      <option>INR</option>
      <option>EUR</option>
      <option>GBP</option>
    </select>

    {/* Entry Rows */}
    <div className="space-y-2">
      {errors.rows && <p className="text-red-500 text-xs">At least one account row is required</p>}
      {rows.map((row, i) => (
        <div key={i} className="grid grid-cols-3 gap-2">
          <select
            className={`${selectCls} ${errors.rows && !row.account ? 'border-red-500' : ''}`}
            value={row.account}
            onChange={e => { const updated = [...rows]; updated[i].account = e.target.value; setRows(updated); setErrors(er => ({ ...er, rows: false })); }}
          >
            <option value="">Select account</option>
            <option>Cash & Equivalents</option>
            <option>Accounts Receivable</option>
            <option>Accounts Payable</option>
            <option>Revenue - Services</option>
            <option>Office Rent Expense</option>
            <option>Salaries Expense</option>
          </select>
          <input
            type="number"
            className={inputCls}
            placeholder="Debit"
            value={row.debit}
            onChange={e => { const updated = [...rows]; updated[i].debit = e.target.value; updated[i].credit = ''; setRows(updated); }}
          />
          <input
            type="number"
            className={inputCls}
            placeholder="Credit"
            value={row.credit}
            onChange={e => { const updated = [...rows]; updated[i].credit = e.target.value; updated[i].debit = ''; setRows(updated); }}
          />

      <Modal open={showCreate} onClose={handleClose} title="New Journal Entry">
        <div className="space-y-4">

          <FormField label="Account">
            <select
              className={fieldBorderCls(selectCls, !!(touched.account && errors.account))}
              value={form.account}
              onChange={e => handleChange('account', e.target.value)}
              onBlur={() => handleBlur('account')}
            >
              <option value="">Select account...</option>
              <option>Cash & Equivalents</option>
              <option>Accounts Receivable</option>
              <option>Accounts Payable</option>
              <option>Revenue - Services</option>
              <option>Office Rent Expense</option>
              <option>Salaries Expense</option>
            </select>
            <Err msg={touched.account ? errors.account : undefined} />
          </FormField>

          <FormField label="Description">
            <input
              className={fieldBorderCls(inputCls, !!(touched.description && errors.description))}
              placeholder="Transaction description"
              value={form.description}
              onChange={e => handleChange('description', e.target.value)}
              onBlur={() => handleBlur('description')}
            />
            <Err msg={touched.description ? errors.description : undefined} />
          </FormField>

          <div className="grid grid-cols-2 gap-3">
            <FormField label="Debit ($)">
              <input
                type="number"
                className={fieldBorderCls(inputCls, !!(touched.amount && errors.amount))}
                placeholder="0.00"
                value={form.debit}
                onChange={e => handleChange('debit', e.target.value)}
                onBlur={() => handleBlur('amount')}
              />
            </FormField>
            <FormField label="Credit ($)">
              <input
                type="number"
                className={fieldBorderCls(inputCls, !!(touched.amount && errors.amount))}
                placeholder="0.00"
                value={form.credit}
                onChange={e => handleChange('credit', e.target.value)}
                onBlur={() => handleBlur('amount')}
              />
            </FormField>
          </div>
          {/* Amount error shown below both fields */}
          <Err msg={touched.amount ? errors.amount : undefined} />

          <div className="flex gap-3 pt-2">
            <button onClick={handleClose} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">
              Cancel
            </button>
            <button onClick={handleCreate} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
              Post Entry
            </button>
          </div>


        </div>
      ))}
    </div>

    {/* Attachment */}
    <div>
      <label className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-50 text-sm text-gray-500 w-fit">
        <input
          type="file"
          className="hidden"
          onChange={e => { const file = e.target.files?.[0]; if (file) setForm(f => ({ ...f, attachment: file })); }}
        />
        {form.attachment ? form.attachment.name : 'Choose File'}
      </label>
    </div>

    {/* Actions */}
    <div className="flex gap-3 pt-2">
      <button
        onClick={() => { setShowCreate(false); setErrors({}); setRows([{ account: '', debit: '', credit: '' }, { account: '', debit: '', credit: '' }]); }}
        className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50"
      >
        Add Row
      </button>
      <button
        onClick={() => setRows(r => [...r, { account: '', debit: '', credit: '' }])}
        className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50"
      >
        + Add Row
      </button>
      <button
        onClick={handleCreate}
        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
      >
        Post Entry
      </button>
    </div>

  </div>
</Modal>
    </div>
  );

}


// 'use client';
// import { useState, useMemo, useEffect } from 'react';
// import { Plus, X, Upload } from 'lucide-react';

// function Modal({ open, onClose, title, children }) {
//   if (!open) return null;
//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-3">
//       <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-4 md:p-6 space-y-4">
//         <div className="flex justify-between items-center">
//           <h2 className="text-lg md:text-xl font-semibold">{title}</h2>
//           <button onClick={onClose}><X size={18} /></button>
//         </div>
//         {children}
//       </div>
//     </div>
//   );
// }

// function Toast({ message, onDone }) {
//   useEffect(() => {
//     const t = setTimeout(onDone, 2000);
//     return () => clearTimeout(t);
//   }, [message]);
//   return (
//     <div className="fixed bottom-5 right-5 bg-black text-white px-4 py-2 rounded text-sm">
//       {message}
//     </div>
//   );
// }

// const inputCls = "w-full border rounded px-2 py-2 text-sm";
// const selectCls = inputCls;

// const currencies = ['USD','INR','EUR'];

// const accountsList = [
//   'Cash & Equivalents',
//   'Accounts Receivable',
//   'Accounts Payable',
//   'Revenue - Services',
//   'Office Rent Expense',
//   'Salaries Expense'
// ];

// export default function GeneralLedgerPage() {

//   const [entries, setEntries] = useState([
//     { id: 1, date: '2026-03-15', description: 'Office Rent Payment', account: 'Office Rent Expense', debit: '5000', credit: '0', currency: 'INR', status: 'Posted', attachment: 'rent.pdf' },
//     { id: 2, date: '2026-03-16', description: 'Client Service Revenue', account: 'Revenue - Services', debit: '0', credit: '8000', currency: 'USD', status: 'Posted', attachment: '' },
//     { id: 3, date: '2026-03-17', description: 'Salary Payment', account: 'Salaries Expense', debit: '3000', credit: '0', currency: 'INR', status: 'Draft', attachment: 'salary.xlsx' }
//   ]);

//   const [toast, setToast] = useState('');
//   const [search, setSearch] = useState('');
//   const [selectedAccount, setSelectedAccount] = useState('');
//   const [showCreate, setShowCreate] = useState(false);
//   const [file, setFile] = useState(null);
//   const [editId, setEditId] = useState(null);

//   const [form, setForm] = useState({
//     date: new Date().toISOString().split('T')[0],
//     description: '',
//     currency: 'USD',
//     lines: [{ account: '', debit: '', credit: '' }]
//   });

//   const [errors, setErrors] = useState({});

//   const addLine = () => setForm(f => ({ ...f, lines: [...f.lines, { account:'', debit:'', credit:'' }] }));

//   const updateLine = (i, field, value) => {
//     const lines = [...form.lines];
//     lines[i][field] = value;
//     if(field==='debit') lines[i].credit='';
//     if(field==='credit') lines[i].debit='';
//     setForm(f=>({...f, lines}));
//   };

//   const handleCreate = (type='Posted') => {

//     let newErrors = {};
//     if (!form.description) newErrors.description = 'Required';

//     form.lines.forEach((l,i)=>{
//       if (!l.account) newErrors[`account_${i}`] = 'Required';
//       if (!l.debit && !l.credit) newErrors[`amount_${i}`] = 'Enter amount';
//     });

//     const totalDebit = form.lines.reduce((s,l)=>s+Number(l.debit||0),0);
//     const totalCredit = form.lines.reduce((s,l)=>s+Number(l.credit||0),0);

//     if (totalDebit !== totalCredit) {
//       setToast('Debit & Credit must match');
//       return;
//     }

//     if (Object.keys(newErrors).length) {
//       setErrors(newErrors);
//       return;
//     }

//     setErrors({});

//     if (editId !== null) {
//       setEntries(prev => prev.map(item =>
//         item.id === editId
//           ? { ...item, ...form.lines[0], date: form.date, description: form.description, currency: form.currency, status: type }
//           : item
//       ));
//       setToast('Updated');
//     } else {
//       let nextId = Math.max(...entries.map(e => e.id), 0) + 1;
//       const newData = form.lines.map(l => ({
//         id: nextId++,
//         date: form.date,
//         description: form.description,
//         account: l.account,
//         debit: l.debit || '0',
//         credit: l.credit || '0',
//         currency: form.currency,
//         status: type,
//         attachment: file?.name || ''
//       }));
//       setEntries(prev => [...prev, ...newData]);
//       setToast(type === 'Draft' ? 'Saved Draft' : 'Posted');
//     }

//     setShowCreate(false);
//     setEditId(null);
//     setFile(null);
//   };

//   const filteredEntries = useMemo(()=>{
//     return entries.filter(e =>
//       e.description.toLowerCase().includes(search.toLowerCase()) &&
//       (!selectedAccount || e.account === selectedAccount)
//     );
//   },[entries, search, selectedAccount]);

//   const totals = useMemo(()=>{
//     let debit=0, credit=0;
//     filteredEntries.forEach(e=>{
//       debit += Number(e.debit);
//       credit += Number(e.credit);
//     });
//     return { debit, credit, net: debit-credit, count: filteredEntries.length };
//   },[filteredEntries]);

//   const handleImport = (e) => {
//     const file = e.target.files[0];
//     if (!file || file.type !== 'application/pdf') {
//       setToast('Only PDF allowed');
//       return;
//     }

//     setEntries(prev => [...prev, {
//       id: Math.max(...entries.map(e => e.id), 0) + 1,
//       date: new Date().toISOString().split('T')[0],
//       description: 'Imported Statement',
//       account: 'Accounts Receivable',
//       debit: '0',
//       credit: '0',
//       currency: 'USD',
//       status: 'Posted',
//       attachment: file.name
//     }]);

//     setToast('PDF Imported');
//   };

//   return (
//     <div className="p-4 md:p-6 space-y-6">

//       {toast && <Toast message={toast} onDone={()=>setToast('')} />}

//       {/* HEADER */}
//       <div className="flex flex-col md:flex-row justify-between gap-3">
//         <div>
//           <h1 className="text-2xl md:text-4xl font-bold">General Ledger</h1>
//           <p className="text-gray-400 text-sm">All journal entries</p>
//         </div>

//         <div className="flex flex-wrap gap-2">
//           <label className="border px-3 py-2 rounded flex gap-1 cursor-pointer text-sm">
//             <Upload size={16}/> Import
//             <input type="file" hidden onChange={handleImport}/>
//           </label>

//           <button
//             className="bg-blue-600 text-white px-3 py-2 rounded flex gap-1 text-sm"
//             onClick={()=>setShowCreate(true)}
//           >
//             <Plus size={16}/> New
//           </button>
//         </div>
//       </div>

//       {/* SEARCH */}
//       <div className="flex flex-col md:flex-row gap-3">
//         <input
//           placeholder="Search..."
//           className="border px-3 py-2 rounded w-full md:w-1/3"
//           onChange={e=>setSearch(e.target.value)}
//         />

//         <select className="border px-3 py-2 rounded" onChange={e=>setSelectedAccount(e.target.value)}>
//           <option value="">All Accounts</option>
//           {accountsList.map(a=><option key={a}>{a}</option>)}
//         </select>
//       </div>

//       {/* CARDS */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//         <div className="bg-gray-900 text-white p-3 rounded">Debit<br/>{totals.debit}</div>
//         <div className="bg-gray-900 text-white p-3 rounded">Credit<br/>{totals.credit}</div>
//         <div className="bg-gray-900 text-white p-3 rounded">Net<br/>{totals.net}</div>
//         <div className="bg-gray-900 text-white p-3 rounded">Entries<br/>{totals.count}</div>
//       </div>

//       {/* TABLE */}
//       <div className="overflow-x-auto border rounded-xl">
//         <table className="min-w-[800px] w-full text-sm">
//           <thead className="bg-gray-800 text-white">
//             <tr>
//               {['ID','Date','Desc','Account','Debit','Credit','Status','Actions'].map(h=>
//                 <th key={h} className="px-3 py-2 text-left">{h}</th>
//               )}
//             </tr>
//           </thead>

//           <tbody>
//             {filteredEntries.map(e=>(
//               <tr key={e.id} className="border-t">
//                 <td className="px-3 py-2">{e.id}</td>
//                 <td className="px-3 py-2">{e.date}</td>
//                 <td className="px-3 py-2">{e.description}</td>
//                 <td className="px-3 py-2">{e.account}</td>
//                 <td className="px-3 py-2 text-green-600">{e.debit}</td>
//                 <td className="px-3 py-2 text-red-600">{e.credit}</td>
//                 <td className="px-3 py-2">{e.status}</td>
//                 <td className="px-3 py-2 flex gap-2">
//                   <button className="text-xs bg-yellow-500 px-2 py-1 text-white rounded"
//                     onClick={()=>{ setEditId(e.id); setShowCreate(true); }}>
//                     Edit
//                   </button>

//                   <button className="text-xs bg-red-600 px-2 py-1 text-white rounded"
//                     onClick={()=>setEntries(prev=>prev.filter(i=>i.id!==e.id))}>
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* MODAL */}
//       <Modal open={showCreate} onClose={()=>setShowCreate(false)} title="Journal Entry">

//         <input type="date" className={inputCls}
//           value={form.date}
//           onChange={e=>setForm(f=>({...f,date:e.target.value}))}
//         />

//         <input className={inputCls}
//           placeholder="Description"
//           value={form.description}
//           onChange={e=>setForm(f=>({...f,description:e.target.value}))}
//         />

//         <select className={selectCls}
//           value={form.currency}
//           onChange={e=>setForm(f=>({...f,currency:e.target.value}))}
//         >
//           {currencies.map(c=><option key={c}>{c}</option>)}
//         </select>

//         {form.lines.map((l,i)=>(
//           <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-2">
//             <select className={inputCls}
//               value={l.account}
//               onChange={e=>updateLine(i,'account',e.target.value)}
//             >
//               <option value="">Account</option>
//               {accountsList.map(a=><option key={a}>{a}</option>)}
//             </select>

//             <input className={inputCls}
//               placeholder="Debit"
//               value={l.debit}
//               onChange={e=>updateLine(i,'debit',e.target.value)}
//             />

//             <input className={inputCls}
//               placeholder="Credit"
//               value={l.credit}
//               onChange={e=>updateLine(i,'credit',e.target.value)}
//             />
//           </div>
//         ))}

//         <input type="file" onChange={e=>setFile(e.target.files[0])}/>

//         <div className="flex flex-wrap gap-2">
//           <button onClick={addLine} className="px-3 py-2 border rounded">Add Row</button>
//           <button onClick={()=>handleCreate('Draft')} className="px-3 py-2 bg-yellow-500 text-white rounded">Draft</button>
//           <button onClick={()=>handleCreate('Posted')} className="px-3 py-2 bg-blue-600 text-white rounded">Post</button>
//         </div>

//       </Modal>
//     </div>
//   );
// }


}
