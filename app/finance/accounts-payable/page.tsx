'use client';
import { useState } from 'react';
import { Plus, UploadCloud, Eye } from 'lucide-react';
import { Modal, Toast } from '../../components/Modal';

// ─── Types ────────────────────────────────────────────────────────────────────

interface BillRecord {
  invoice: string;
  vendor: string;
  amount: string;
  due: string;
  category: string;
  status: string;
  fileUrl: string | null;
}

type FormState = {
  vendorName: string;
  billDate: string;
  invoiceNumber: string;
  dueDate: string;
  expenseCategory: string;
  totalAmount: string;
  description: string;
  taxRate: string;
  file: File | null;
  filePreview: string | null;
};

// ─── Constants ────────────────────────────────────────────────────────────────

const initBills: BillRecord[] = [
  { invoice: 'BILL-0091', vendor: 'SupplierCo Ltd', amount: '$4,200', due: '2026-03-15', category: 'Raw Materials', status: 'Overdue', fileUrl: null },
  { invoice: 'BILL-0090', vendor: 'TechParts Inc', amount: '$1,800', due: '2026-03-20', category: 'Technology', status: 'Due Soon', fileUrl: null },
  { invoice: 'BILL-0089', vendor: 'Office World', amount: '$620', due: '2026-03-25', category: 'Office Supplies', status: 'Pending', fileUrl: null },
];

const statusStyle: Record<string, string> = {
  Overdue: 'bg-rose-500/20 text-rose-400',
  'Due Soon': 'bg-amber-500/20 text-amber-400',
  Pending: 'bg-blue-500/20 text-blue-400',
  Paid: 'bg-emerald-500/20 text-emerald-400',
};

const initialFormState: FormState = {
  vendorName: '',
  billDate: '',
  invoiceNumber: '',
  dueDate: '',
  expenseCategory: '',
  totalAmount: '',
  description: '',
  taxRate: '0',
  file: null,
  filePreview: null,
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AccountsPayablePage() {
  const [bills, setBills] = useState<BillRecord[]>(initBills);
  const [showCreate, setShowCreate] = useState(false);
  const [payBill, setPayBill] = useState<string | null>(null);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ─── Handlers ───────────────────────────────────────────────────────────────

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setForm(prev => ({ ...prev, file, filePreview: URL.createObjectURL(file) }));
      setErrors(prev => ({ ...prev, file: '' }));
    }
  };

  const handleClose = () => {
    setShowCreate(false);
    setForm(initialFormState);
    setErrors({});
  };

  const handleCreate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.vendorName) newErrors.vendorName = 'Vendor name is required';
    if (!form.billDate) newErrors.billDate = 'Bill date is required';
    if (!form.invoiceNumber) newErrors.invoiceNumber = 'Invoice number is required';
    if (!form.dueDate) newErrors.dueDate = 'Due date is required';
    if (!form.expenseCategory) newErrors.expenseCategory = 'Please select a category';
    if (!form.totalAmount) newErrors.totalAmount = 'Amount is required';
    if (!form.description) newErrors.description = 'Description is required';
    if (!form.file) newErrors.file = 'Please upload the original bill copy';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newBill: BillRecord = {
      invoice: form.invoiceNumber,
      vendor: form.vendorName,
      amount: `$${parseFloat(form.totalAmount).toLocaleString()}`,
      due: form.dueDate,
      category: form.expenseCategory,
      status: 'Pending',
      fileUrl: form.filePreview,
    };

    setBills(prev => [newBill, ...prev]);
    setForm(initialFormState);
    setErrors({});
    setShowCreate(false);
    setToast('Bill recorded successfully!');
  };

  const handlePay = (invoice: string) => {
    setBills(prev => prev.map(b => b.invoice === invoice ? { ...b, status: 'Paid' } : b));
    setPayBill(null);
    setToast('Payment processed successfully!');
  };

  // ─── Stats ──────────────────────────────────────────────────────────────────

  const parseAmt = (val: string) => parseFloat(val.replace(/[$,]/g, '')) || 0;
  const totalDue = bills.filter(b => b.status !== 'Paid').reduce((s, b) => s + parseAmt(b.amount), 0);
  const overdue = bills.filter(b => b.status === 'Overdue').reduce((s, b) => s + parseAmt(b.amount), 0);
  const paid = bills.filter(b => b.status === 'Paid').reduce((s, b) => s + parseAmt(b.amount), 0);

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="p-6 space-y-6 min-h-screen bg-transparent">
      {toast && <Toast message={toast} onDone={() => setToast('')} />}

      {/* Header */}
      <div className="flex items-center justify-between pt-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Accounts Payable</h1>
          <p className="text-gray-500 text-sm mt-1">Manage vendor bills and outgoing payments</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" /> Record Bill
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Total Payable', value: `$${(totalDue + paid).toLocaleString()}`, color: 'text-white' },
          { label: 'Amount Due', value: `$${totalDue.toLocaleString()}`, color: 'text-amber-400' },
          { label: 'Overdue', value: `$${overdue.toLocaleString()}`, color: 'text-rose-400' },
          { label: 'Paid This Month', value: `$${paid.toLocaleString()}`, color: 'text-emerald-400' },
        ].map(s => (
          <div key={s.label} className="bg-gray-900 rounded-xl p-5 border border-gray-800 shadow-md">
            <div className="text-gray-400 text-sm mb-2">{s.label}</div>
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-800/50 border-b border-gray-700">
                {['Invoice', 'Vendor', 'Amount', 'Due Date', 'Category', 'Status', 'File', 'Action'].map(h => (
                  <th key={h} className="text-gray-400 text-[11px] font-bold px-4 py-4 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {bills.map((b, idx) => (
                <tr key={idx} className="hover:bg-gray-800/40 transition-colors">
                  <td className="px-4 py-4 text-blue-400 text-sm font-mono">{b.invoice}</td>
                  <td className="px-4 py-4 text-white text-sm font-medium">{b.vendor}</td>
                  <td className="px-4 py-4 text-rose-400 text-sm font-semibold">{b.amount}</td>
                  <td className="px-4 py-4 text-gray-300 text-sm">{b.due}</td>
                  <td className="px-4 py-4 text-gray-400 text-sm">{b.category}</td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tight ${statusStyle[b.status]}`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    {b.fileUrl ? (
                      <a href={b.fileUrl} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-xs">
                        <Eye className="w-3 h-3" /> View Bill
                      </a>
                    ) : (
                      <span className="text-gray-600 text-xs italic">No File</span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    {b.status !== 'Paid' ? (
                      <button
                        onClick={() => setPayBill(b.invoice)}
                        className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-xs font-semibold hover:bg-blue-700 shadow-sm transition-all"
                      >
                        Pay Now
                      </button>
                    ) : (
                      <span className="text-emerald-400 text-xs font-medium">✓ Settled</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Bill Modal */}
      <Modal open={showCreate} onClose={handleClose} title="Record Vendor Bill">
        <div className="p-1 bg-white rounded-lg text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">

            {/* Vendor */}
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1 tracking-wider">Vendor Name*</label>
              <select
                className={`w-full border rounded-lg p-2.5 text-sm text-gray-800 bg-white focus:ring-1 focus:ring-blue-500 outline-none transition-all ${errors.vendorName ? 'border-red-500 bg-red-50/10' : 'border-gray-300'}`}
                value={form.vendorName}
                onChange={e => { setForm(f => ({ ...f, vendorName: e.target.value })); setErrors(er => ({ ...er, vendorName: '' })); }}
              >
                <option value="">Select Vendor...</option>
                <option value="SupplierCo Ltd">SupplierCo Ltd</option>
                <option value="TechParts Inc">TechParts Inc</option>
                <option value="Office World">Office World</option>
                <option value="CloudHost GmbH">CloudHost GmbH</option>
                <option value="Logistics Pro">Logistics Pro</option>
              </select>
              {errors.vendorName && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.vendorName}</p>}
            </div>

            {/* Bill Date */}
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1 tracking-wider">Bill Date*</label>
              <input
                type="date"
                className={`w-full border rounded-lg p-2.5 text-sm outline-none ${errors.billDate ? 'border-red-500' : 'border-gray-300'}`}
                value={form.billDate}
                onChange={e => { setForm(f => ({ ...f, billDate: e.target.value })); setErrors(er => ({ ...er, billDate: '' })); }}
              />
              {errors.billDate && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.billDate}</p>}
            </div>

            {/* Invoice # */}
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1 tracking-wider">Invoice #*</label>
              <input
                type="text"
                placeholder="e.g. BILL-001"
                className={`w-full border rounded-lg p-2.5 text-sm outline-none ${errors.invoiceNumber ? 'border-red-500' : 'border-gray-300'}`}
                value={form.invoiceNumber}
                onChange={e => { setForm(f => ({ ...f, invoiceNumber: e.target.value })); setErrors(er => ({ ...er, invoiceNumber: '' })); }}
              />
              {errors.invoiceNumber && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.invoiceNumber}</p>}
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1 tracking-wider">Due Date*</label>
              <input
                type="date"
                className={`w-full border rounded-lg p-2.5 text-sm outline-none ${errors.dueDate ? 'border-red-500' : 'border-gray-300'}`}
                value={form.dueDate}
                onChange={e => { setForm(f => ({ ...f, dueDate: e.target.value })); setErrors(er => ({ ...er, dueDate: '' })); }}
              />
              {errors.dueDate && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.dueDate}</p>}
            </div>

            {/* Category */}
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1 tracking-wider">Expense Category*</label>
              <select
                className={`w-full border rounded-lg p-2.5 text-sm outline-none bg-white ${errors.expenseCategory ? 'border-red-500' : 'border-gray-300'}`}
                value={form.expenseCategory}
                onChange={e => { setForm(f => ({ ...f, expenseCategory: e.target.value })); setErrors(er => ({ ...er, expenseCategory: '' })); }}
              >
                <option value="">Select Category...</option>
                <option value="Technology">Technology</option>
                <option value="Raw Materials">Raw Materials</option>
                <option value="Office Supplies">Office Supplies</option>
                <option value="Logistics">Logistics</option>
                <option value="Marketing">Marketing</option>
              </select>
              {errors.expenseCategory && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.expenseCategory}</p>}
            </div>

            {/* Amount */}
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1 tracking-wider">Total Amount ($)*</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-400 text-sm">$</span>
                <input
                  type="number"
                  placeholder="0.00"
                  className={`w-full pl-8 border rounded-lg p-2.5 text-sm outline-none ${errors.totalAmount ? 'border-red-500' : 'border-gray-300'}`}
                  value={form.totalAmount}
                  onChange={e => { setForm(f => ({ ...f, totalAmount: e.target.value })); setErrors(er => ({ ...er, totalAmount: '' })); }}
                />
              </div>
              {errors.totalAmount && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.totalAmount}</p>}
            </div>
          </div>

          {/* Description */}
          <div className="mt-4">
            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1 tracking-wider">Description / Notes*</label>
            <textarea
              rows={2}
              placeholder="Briefly describe the purpose of this bill (e.g., Monthly server hosting)..."
              className={`w-full border rounded-lg p-2.5 text-sm resize-none outline-none transition-all ${errors.description ? 'border-red-500 bg-red-50/10' : 'border-gray-300'}`}
              value={form.description}
              onChange={e => { setForm(f => ({ ...f, description: e.target.value })); setErrors(er => ({ ...er, description: '' })); }}
            />
            {errors.description && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.description}</p>}
          </div>

          {/* File Upload & Tax */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 items-start">
            <div className="w-full">
              <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1 tracking-wider">Upload Original Bill*</label>
              <div className={`flex flex-col justify-center items-center w-full min-h-[4rem] p-3 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${errors.file ? 'border-red-500 bg-red-50/10' : 'border-gray-200 bg-gray-50 hover:bg-gray-100'}`}>
                <input type="file" id="file-upload" className="hidden" accept="image/*,.pdf" onChange={handleFileChange} />
                <label htmlFor="file-upload" className="flex items-center justify-center w-full h-full cursor-pointer text-xs text-center text-gray-500 font-medium">
                  <UploadCloud className="w-5 h-5 mr-3 text-gray-400 shrink-0" />
                  {form.file ? (
                    <span className="text-blue-600 font-bold truncate max-w-[180px]">{form.file.name}</span>
                  ) : (
                    <span>Click to <span className="text-blue-600 font-bold underline">upload document</span> (PDF, PNG, JPG)</span>
                  )}
                </label>
              </div>
              {errors.file && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.file}</p>}
            </div>

            <div className="w-full">
              <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1 tracking-wider">Tax Rate (%)</label>
              <select
                className="w-full border border-gray-300 rounded-lg p-2.5 h-[4rem] text-sm bg-white outline-none"
                value={form.taxRate}
                onChange={e => setForm(f => ({ ...f, taxRate: e.target.value }))}
              >
                <option value="0">Zero Tax (0%)</option>
                <option value="5">Standard (5%)</option>
                <option value="12">Reduced (12%)</option>
                <option value="18">GST (18%)</option>
              </select>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-100">
            <button
              onClick={handleClose}
              className="px-6 py-2 border border-gray-300 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <div className="flex gap-3">
              <button className="px-6 py-2 border border-blue-900 text-blue-900 rounded-lg text-sm font-medium hover:bg-blue-50 transition-all">
                Save as Draft
              </button>
              <button
                onClick={handleCreate}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
              >
                Record Bill
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Pay Confirmation Modal */}
      <Modal open={!!payBill} onClose={() => setPayBill(null)} title="Process Payment" size="sm">
        <div className="space-y-4">
          <p className="text-gray-600 text-sm leading-relaxed">
            Confirm payment for <strong>{payBill}</strong>? This will update the status to{' '}
            <span className="text-emerald-600 font-bold uppercase tracking-tighter">Paid</span>.
          </p>
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setPayBill(null)}
              className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-500 font-medium hover:bg-gray-50 transition-all"
            >
              No, Cancel
            </button>
            <button
              onClick={() => handlePay(payBill!)}
              className="flex-1 px-4 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700 shadow-md transition-all"
            >
              Yes, Confirm Pay
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}