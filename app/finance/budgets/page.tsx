// 'use client';
// import { useState } from 'react';
// import { Plus, Edit2 } from 'lucide-react';
// import { Modal, Toast, FormField, inputCls, selectCls } from '../../components/Modal';

// const initBudgets = [
//   { id: 'BDG-001', dept: 'Engineering', allocated: 80000, spent: 72400, period: 'FY 2025-26' },
//   { id: 'BDG-002', dept: 'Marketing', allocated: 30000, spent: 28200, period: 'FY 2025-26' },
//   { id: 'BDG-003', dept: 'Operations', allocated: 50000, spent: 51200, period: 'FY 2025-26' },
//   { id: 'BDG-004', dept: 'HR & Admin', allocated: 25000, spent: 23100, period: 'FY 2025-26' },
//   { id: 'BDG-005', dept: 'Sales', allocated: 40000, spent: 38500, period: 'FY 2025-26' },
// ];

// export default function BudgetsPage() {
//   const [budgets, setBudgets] = useState(initBudgets);
//   const [showCreate, setShowCreate] = useState(false);
//   const [editBdg, setEditBdg] = useState<typeof initBudgets[0] | null>(null);
//   const [toast, setToast] = useState('');
//   const [form, setForm] = useState({ dept: '', allocated: '' });

//   const totalAllocated = budgets.reduce((s, b) => s + b.allocated, 0);
//   const totalSpent = budgets.reduce((s, b) => s + b.spent, 0);

//   const handleCreate = () => {
//     if (!form.dept || !form.allocated) return;
//     setBudgets(prev => [...prev, { id: `BDG-00${prev.length + 1}`, dept: form.dept, allocated: +form.allocated, spent: 0, period: 'FY 2025-26' }]);
//     setForm({ dept: '', allocated: '' });
//     setShowCreate(false);
//     setToast('Budget created successfully!');
//   };

//   const handleEdit = () => {
//     if (!editBdg) return;
//     setBudgets(prev => prev.map(b => b.id === editBdg.id ? editBdg : b));
//     setEditBdg(null);
//     setToast('Budget updated!');
//   };

//   return (
//     <div className="p-6 space-y-6">
//       {toast && <Toast message={toast} onDone={() => setToast('')} />}
//       <div className="flex items-center justify-between">
//         <div><h1 className="text-2xl font-bold text-white-800">Budgets</h1><p className="text-gray-500 text-sm mt-1">Manage departmental budgets and spend</p></div>
//         <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"><Plus className="w-4 h-4" /> New Budget</button>
//       </div>

//       <div className="grid grid-cols-3 gap-4">
//         {[
//           { label: 'Total Allocated', value: `$${totalAllocated.toLocaleString()}`, color: 'text-white' },
//           { label: 'Total Spent', value: `$${totalSpent.toLocaleString()}`, color: 'text-amber-400' },
//           { label: 'Remaining', value: `$${(totalAllocated - totalSpent).toLocaleString()}`, color: 'text-emerald-400' },
//         ].map(s => <div key={s.label} className="bg-gray-900 rounded-xl p-5"><div className="text-gray-400 text-sm mb-2">{s.label}</div><div className={`text-2xl font-bold ${s.color}`}>{s.value}</div></div>)}
//       </div>

//       <div className="space-y-3">
//         {budgets.map(b => {
//           const pct = Math.min((b.spent / b.allocated) * 100, 100);
//           const over = b.spent > b.allocated;
//           return (
//             <div key={b.id} className="bg-gray-900 rounded-xl p-5">
//               <div className="flex items-center justify-between mb-3">
//                 <div>
//                   <span className="text-white font-semibold text-sm">{b.dept}</span>
//                   <span className="text-gray-500 text-xs ml-2">{b.period}</span>
//                 </div>
//                 <div className="flex items-center gap-4">
//                   <span className={`text-sm font-semibold ${over ? 'text-rose-400' : 'text-emerald-400'}`}>
//                     ${b.spent.toLocaleString()} / ${b.allocated.toLocaleString()}
//                   </span>
//                   <button onClick={() => setEditBdg({ ...b })} className="p-1.5 text-gray-500 hover:text-amber-400 hover:bg-gray-700 rounded transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
//                 </div>
//               </div>
//               <div className="w-full h-2.5 bg-gray-700 rounded-full overflow-hidden">
//                 <div className={`h-full rounded-full transition-all ${over ? 'bg-rose-500' : pct > 80 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${pct}%` }} />
//               </div>
//               <div className="flex justify-between mt-1.5">
//                 <span className="text-gray-500 text-xs">{pct.toFixed(1)}% used</span>
//                 <span className={`text-xs ${over ? 'text-rose-400' : 'text-gray-400'}`}>{over ? `$${(b.spent - b.allocated).toLocaleString()} over budget` : `$${(b.allocated - b.spent).toLocaleString()} remaining`}</span>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Create Budget" size="sm">
//         <div className="space-y-4">
//           <FormField label="Department"><input className={inputCls} placeholder="e.g. Finance" value={form.dept} onChange={e=>setForm(f=>({...f,dept:e.target.value}))} /></FormField>
//           <FormField label="Allocated Amount ($)"><input type="number" className={inputCls} placeholder="e.g. 50000" value={form.allocated} onChange={e=>setForm(f=>({...f,allocated:e.target.value}))} /></FormField>
//           <div className="flex gap-3 pt-2">
//             <button onClick={() => setShowCreate(false)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
//             <button onClick={handleCreate} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Create</button>
//           </div>
//         </div>
//       </Modal>

//       <Modal open={!!editBdg} onClose={() => setEditBdg(null)} title="Edit Budget" size="sm">
//         {editBdg && <div className="space-y-4">
//           <FormField label="Department"><input className={inputCls} value={editBdg.dept} onChange={e=>setEditBdg(b=>b?{...b,dept:e.target.value}:b)} /></FormField>
//           <FormField label="Allocated ($)"><input type="number" className={inputCls} value={editBdg.allocated} onChange={e=>setEditBdg(b=>b?{...b,allocated:+e.target.value}:b)} /></FormField>
//           <FormField label="Spent ($)"><input type="number" className={inputCls} value={editBdg.spent} onChange={e=>setEditBdg(b=>b?{...b,spent:+e.target.value}:b)} /></FormField>
//           <div className="flex gap-3 pt-2">
//             <button onClick={() => setEditBdg(null)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
//             <button onClick={handleEdit} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Save</button>
//           </div>
//         </div>}
//       </Modal>
//     </div>
//   );
// }


'use client';
import { useState } from 'react';
import { Plus, Edit2 } from 'lucide-react';
import { Modal, Toast, FormField, inputCls, selectCls } from '../../components/Modal';

const initBudgets = [
  { id: 'BDG-001', dept: 'Engineering', allocated: 80000, spent: 72400, period: 'FY 2025-26' },
  { id: 'BDG-002', dept: 'Marketing', allocated: 30000, spent: 28200, period: 'FY 2025-26' },
  { id: 'BDG-003', dept: 'Operations', allocated: 50000, spent: 51200, period: 'FY 2025-26' },
  { id: 'BDG-004', dept: 'HR & Admin', allocated: 25000, spent: 23100, period: 'FY 2025-26' },
  { id: 'BDG-005', dept: 'Sales', allocated: 40000, spent: 38500, period: 'FY 2025-26' },
];

// ─── Types ────────────────────────────────────────────────────────────────────

type CreateForm = { dept: string; allocated: string };
type CreateErrors = { dept?: string; allocated?: string };

type EditErrors = { dept?: string; allocated?: string; spent?: string };

const defaultCreateForm: CreateForm = { dept: '', allocated: '' };

// ─── Validation ───────────────────────────────────────────────────────────────

function validateCreate(form: CreateForm): CreateErrors {
  const errs: CreateErrors = {};
  if (!form.dept.trim())
    errs.dept = 'Department name is required.';
  if (!form.allocated) {
    errs.allocated = 'Allocated amount is required.';
  } else if (isNaN(Number(form.allocated)) || Number(form.allocated) <= 0) {
    errs.allocated = 'Enter a valid amount greater than 0.';
  }
  return errs;
}

function validateEdit(b: typeof initBudgets[0]): EditErrors {
  const errs: EditErrors = {};
  if (!b.dept.trim())
    errs.dept = 'Department name is required.';
  if (!b.allocated || b.allocated <= 0)
    errs.allocated = 'Enter a valid allocated amount greater than 0.';
  if (b.spent < 0)
    errs.spent = 'Spent amount cannot be negative.';
  return errs;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Err({ msg }: { msg?: string }) {
  return msg ? <p className="text-rose-500 text-xs mt-1">{msg}</p> : null;
}

function errBorder(base: string, hasError: boolean) {
  return hasError ? base + ' !border-rose-400' : base;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState(initBudgets);
  const [showCreate, setShowCreate] = useState(false);
  const [editBdg, setEditBdg] = useState<typeof initBudgets[0] | null>(null);
  const [toast, setToast] = useState('');

  // Create form state
  const [form, setForm] = useState<CreateForm>(defaultCreateForm);
  const [createErrors, setCreateErrors] = useState<CreateErrors>({});
  const [createTouched, setCreateTouched] = useState<Record<string, boolean>>({});

  // Edit form state
  const [editErrors, setEditErrors] = useState<EditErrors>({});
  const [editTouched, setEditTouched] = useState<Record<string, boolean>>({});

  const totalAllocated = budgets.reduce((s, b) => s + b.allocated, 0);
  const totalSpent = budgets.reduce((s, b) => s + b.spent, 0);

  // ── Create handlers ──

  const handleCreateChange = (field: keyof CreateForm, value: string) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    if (createTouched[field]) setCreateErrors(validateCreate(updated));
  };

  const handleCreateBlur = (field: keyof CreateErrors) => {
    setCreateTouched(prev => ({ ...prev, [field]: true }));
    setCreateErrors(validateCreate(form));
  };

  const handleCreate = () => {
    setCreateTouched({ dept: true, allocated: true });
    const errs = validateCreate(form);
    setCreateErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setBudgets(prev => [
      ...prev,
      { id: `BDG-00${prev.length + 1}`, dept: form.dept, allocated: +form.allocated, spent: 0, period: 'FY 2025-26' },
    ]);
    setForm(defaultCreateForm);
    setCreateErrors({});
    setCreateTouched({});
    setShowCreate(false);
    setToast('Budget created successfully!');
  };

  const handleCreateClose = () => {
    setShowCreate(false);
    setForm(defaultCreateForm);
    setCreateErrors({});
    setCreateTouched({});
  };

  // ── Edit handlers ──

  const handleEditChange = (field: keyof typeof initBudgets[0], value: string | number) => {
    if (!editBdg) return;
    const updated = { ...editBdg, [field]: value };
    setEditBdg(updated);
    if (editTouched[field]) setEditErrors(validateEdit(updated));
  };

  const handleEditBlur = (field: keyof EditErrors) => {
    if (!editBdg) return;
    setEditTouched(prev => ({ ...prev, [field]: true }));
    setEditErrors(validateEdit(editBdg));
  };

  const handleEdit = () => {
    if (!editBdg) return;
    setEditTouched({ dept: true, allocated: true, spent: true });
    const errs = validateEdit(editBdg);
    setEditErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setBudgets(prev => prev.map(b => b.id === editBdg.id ? editBdg : b));
    setEditBdg(null);
    setEditErrors({});
    setEditTouched({});
    setToast('Budget updated!');
  };

  const handleEditClose = () => {
    setEditBdg(null);
    setEditErrors({});
    setEditTouched({});
  };

  return (
    <div className="p-6 space-y-6">
      {toast && <Toast message={toast} onDone={() => setToast('')} />}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white-800">Budgets</h1>
          <p className="text-gray-500 text-sm mt-1">Manage departmental budgets and spend</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
          <Plus className="w-4 h-4" /> New Budget
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Allocated', value: `$${totalAllocated.toLocaleString()}`, color: 'text-white' },
          { label: 'Total Spent', value: `$${totalSpent.toLocaleString()}`, color: 'text-amber-400' },
          { label: 'Remaining', value: `$${(totalAllocated - totalSpent).toLocaleString()}`, color: 'text-emerald-400' },
        ].map(s => (
          <div key={s.label} className="bg-gray-900 rounded-xl p-5">
            <div className="text-gray-400 text-sm mb-2">{s.label}</div>
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {budgets.map(b => {
          const pct = Math.min((b.spent / b.allocated) * 100, 100);
          const over = b.spent > b.allocated;
          return (
            <div key={b.id} className="bg-gray-900 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-white font-semibold text-sm">{b.dept}</span>
                  <span className="text-gray-500 text-xs ml-2">{b.period}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-sm font-semibold ${over ? 'text-rose-400' : 'text-emerald-400'}`}>
                    ${b.spent.toLocaleString()} / ${b.allocated.toLocaleString()}
                  </span>
                  <button
                    onClick={() => { setEditBdg({ ...b }); setEditErrors({}); setEditTouched({}); }}
                    className="p-1.5 text-gray-500 hover:text-amber-400 hover:bg-gray-700 rounded transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="w-full h-2.5 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${over ? 'bg-rose-500' : pct > 80 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="flex justify-between mt-1.5">
                <span className="text-gray-500 text-xs">{pct.toFixed(1)}% used</span>
                <span className={`text-xs ${over ? 'text-rose-400' : 'text-gray-400'}`}>
                  {over ? `$${(b.spent - b.allocated).toLocaleString()} over budget` : `$${(b.allocated - b.spent).toLocaleString()} remaining`}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Budget Modal */}
      <Modal open={showCreate} onClose={handleCreateClose} title="Create Budget" size="sm">
        <div className="space-y-4">

          <FormField label="Department">
            <input
              className={errBorder(inputCls, !!(createTouched.dept && createErrors.dept))}
              placeholder="e.g. Finance"
              value={form.dept}
              onChange={e => handleCreateChange('dept', e.target.value)}
              onBlur={() => handleCreateBlur('dept')}
            />
            <Err msg={createTouched.dept ? createErrors.dept : undefined} />
          </FormField>

          <FormField label="Allocated Amount ($)">
            <input
              type="number"
              className={errBorder(inputCls, !!(createTouched.allocated && createErrors.allocated))}
              placeholder="e.g. 50000"
              value={form.allocated}
              onChange={e => handleCreateChange('allocated', e.target.value)}
              onBlur={() => handleCreateBlur('allocated')}
            />
            <Err msg={createTouched.allocated ? createErrors.allocated : undefined} />
          </FormField>

          <div className="flex gap-3 pt-2">
            <button onClick={handleCreateClose} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">
              Cancel
            </button>
            <button onClick={handleCreate} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
              Create
            </button>
          </div>

        </div>
      </Modal>

      {/* Edit Budget Modal */}
      <Modal open={!!editBdg} onClose={handleEditClose} title="Edit Budget" size="sm">
        {editBdg && (
          <div className="space-y-4">

            <FormField label="Department">
              <input
                className={errBorder(inputCls, !!(editTouched.dept && editErrors.dept))}
                value={editBdg.dept}
                onChange={e => handleEditChange('dept', e.target.value)}
                onBlur={() => handleEditBlur('dept')}
              />
              <Err msg={editTouched.dept ? editErrors.dept : undefined} />
            </FormField>

            <FormField label="Allocated ($)">
              <input
                type="number"
                className={errBorder(inputCls, !!(editTouched.allocated && editErrors.allocated))}
                value={editBdg.allocated}
                onChange={e => handleEditChange('allocated', +e.target.value)}
                onBlur={() => handleEditBlur('allocated')}
              />
              <Err msg={editTouched.allocated ? editErrors.allocated : undefined} />
            </FormField>

            <FormField label="Spent ($)">
              <input
                type="number"
                className={errBorder(inputCls, !!(editTouched.spent && editErrors.spent))}
                value={editBdg.spent}
                onChange={e => handleEditChange('spent', +e.target.value)}
                onBlur={() => handleEditBlur('spent')}
              />
              <Err msg={editTouched.spent ? editErrors.spent : undefined} />
            </FormField>

            <div className="flex gap-3 pt-2">
              <button onClick={handleEditClose} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={handleEdit} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                Save
              </button>
            </div>

          </div>
        )}
      </Modal>
    </div>
  );
}