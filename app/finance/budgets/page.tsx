'use client';
import { useState } from 'react';
import { Plus, Edit2 } from 'lucide-react';
import { Modal, Toast, FormField } from '../../components/Modal';

const inputCls = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100";
const inputErrCls = "w-full border border-rose-400 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-100";
const errMsg = "text-rose-500 text-xs mt-1";

const initBudgets = [
  { id: 'BDG-001', dept: 'Engineering', allocated: 80000, spent: 72400, period: 'FY 2025-26' },
  { id: 'BDG-002', dept: 'Marketing', allocated: 30000, spent: 28200, period: 'FY 2025-26' },
  { id: 'BDG-003', dept: 'Operations', allocated: 50000, spent: 51200, period: 'FY 2025-26' },
  { id: 'BDG-004', dept: 'HR & Admin', allocated: 25000, spent: 23100, period: 'FY 2025-26' },
  { id: 'BDG-005', dept: 'Sales', allocated: 40000, spent: 38500, period: 'FY 2025-26' },
];
    
type Budget = typeof initBudgets[0];

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState(initBudgets);
  const [toast, setToast] = useState('');

  // ── Create Budget state ───────────────────────────────────────────────────
  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState({ dept: '', allocated: '' });
  const [createTouched, setCreateTouched] = useState<Record<string, boolean>>({});

  // ── Edit Budget state ─────────────────────────────────────────────────────
  const [editBdg, setEditBdg] = useState<Budget | null>(null);
  const [editTouched, setEditTouched] = useState<Record<string, boolean>>({});

  const totalAllocated = budgets.reduce((s, b) => s + b.allocated, 0);
  const totalSpent = budgets.reduce((s, b) => s + b.spent, 0);

  // ── Class helpers ─────────────────────────────────────────────────────────
  const crtCls = (f: string) =>
    !createForm[f as keyof typeof createForm] && createTouched[f] ? inputErrCls : inputCls;

  const edtCls = (f: string, val: string | number) =>
    !val && editTouched[f] ? inputErrCls : inputCls;

  // ── Create handlers ───────────────────────────────────────────────────────
  function touchCreate(f: string) {
    setCreateTouched(p => ({ ...p, [f]: true }));
  }

  function handleCreate() {
    // Mark all fields touched to show all errors at once
    setCreateTouched({ dept: true, allocated: true });
    if (!createForm.dept || !createForm.allocated) return;
    setBudgets(prev => [...prev, {
      id: `BDG-00${prev.length + 1}`,
      dept: createForm.dept,
      allocated: Number(createForm.allocated),
      spent: 0,
      period: 'FY 2025-26',
    }]);
    setCreateForm({ dept: '', allocated: '' });
    setCreateTouched({});
    setShowCreate(false);
    setToast('Budget created successfully!');
  }

  function closeCreate() {
    setShowCreate(false);
    setCreateForm({ dept: '', allocated: '' });
    setCreateTouched({});
  }

  // ── Edit handlers ─────────────────────────────────────────────────────────
  function touchEdit(f: string) {
    setEditTouched(p => ({ ...p, [f]: true }));
  }

  function openEdit(b: Budget) {
    setEditBdg({ ...b });
    setEditTouched({});
  }

  function handleEdit() {
    if (!editBdg) return;
    setEditTouched({ dept: true, allocated: true, spent: true });
    if (!editBdg.dept || !editBdg.allocated) return;
    setBudgets(prev => prev.map(b => b.id === editBdg.id ? editBdg : b));
    setEditBdg(null);
    setEditTouched({});
    setToast('Budget updated successfully!');
  }

  function closeEdit() {
    setEditBdg(null);
    setEditTouched({});
  }

  return (
    <div className="p-6 space-y-6">
      {toast && <Toast message={toast} onDone={() => setToast('')} />}

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Budgets</h1>
          <p className="text-gray-500 text-sm mt-1">Manage departmental budgets and spend</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
          <Plus className="w-4 h-4" /> New Budget
        </button>
      </div>

      {/* ── KPI Cards ─────────────────────────────────────────────────────── */}
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

      {/* ── Budget List ───────────────────────────────────────────────────── */}
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
                  <button onClick={() => openEdit(b)} className="p-1.5 text-gray-500 hover:text-amber-400 hover:bg-gray-700 rounded transition-colors">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="w-full h-2.5 bg-gray-700 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all ${over ? 'bg-rose-500' : pct > 80 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${pct}%` }} />
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

      {/* ── Create Budget Modal ───────────────────────────────────────────── */}
      <Modal open={showCreate} onClose={closeCreate} title="Create Budget" size="sm">
        <div className="space-y-4">

          <FormField label="Department *">
            <input
              className={crtCls('dept')}
              placeholder="e.g. Finance"
              value={createForm.dept}
              onChange={e => setCreateForm(p => ({ ...p, dept: e.target.value }))}
              onBlur={() => touchCreate('dept')}
            />
            {!createForm.dept && createTouched.dept && (
              <p className={errMsg}>Department name is required</p>
            )}
          </FormField>

          <FormField label="Allocated Amount ($) *">
            <input
              type="number"
              className={crtCls('allocated')}
              placeholder="e.g. 50000"
              value={createForm.allocated}
              onChange={e => setCreateForm(p => ({ ...p, allocated: e.target.value }))}
              onBlur={() => touchCreate('allocated')}
            />
            {!createForm.allocated && createTouched.allocated && (
              <p className={errMsg}>Allocated amount is required</p>
            )}
          </FormField>

          <div className="flex gap-3 pt-2">
            <button onClick={closeCreate} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
            <button onClick={handleCreate} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Create</button>
          </div>

        </div>
      </Modal>

      {/* ── Edit Budget Modal ─────────────────────────────────────────────── */}
      <Modal open={!!editBdg} onClose={closeEdit} title="Edit Budget" size="sm">
        {editBdg && (
          <div className="space-y-4">

            <FormField label="Department *">
              <input
                className={edtCls('dept', editBdg.dept)}
                value={editBdg.dept}
                onChange={e => setEditBdg(b => b ? { ...b, dept: e.target.value } : b)}
                onBlur={() => touchEdit('dept')}
              />
              {!editBdg.dept && editTouched.dept && (
                <p className={errMsg}>Department name is required</p>
              )}
            </FormField>

            <FormField label="Allocated Amount ($) *">
              <input
                type="number"
                className={edtCls('allocated', editBdg.allocated)}
                value={editBdg.allocated}
                onChange={e => setEditBdg(b => b ? { ...b, allocated: Number(e.target.value) } : b)}
                onBlur={() => touchEdit('allocated')}
              />
              {!editBdg.allocated && editTouched.allocated && (
                <p className={errMsg}>Allocated amount is required</p>
              )}
            </FormField>

            <FormField label="Spent Amount ($) *">
              <input
                type="number"
                className={edtCls('spent', editBdg.spent)}
                value={editBdg.spent}
                onChange={e => setEditBdg(b => b ? { ...b, spent: Number(e.target.value) } : b)}
                onBlur={() => touchEdit('spent')}
              />
              {!editBdg.spent && editTouched.spent && (
                <p className={errMsg}>Spent amount is required</p>
              )}
            </FormField>

            <div className="flex gap-3 pt-2">
              <button onClick={closeEdit} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
              <button onClick={handleEdit} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Save Changes</button>
            </div>

          </div>
        )}
      </Modal>
    </div>
  );
}