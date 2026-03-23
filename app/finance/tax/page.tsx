'use client';
import { useState } from 'react';
import { Download, X, Plus } from 'lucide-react';
import jsPDF from 'jspdf';

// Inline Toast
function Toast({ message, onDone }) {
  setTimeout(onDone, 2500);
  return (
    <div className="fixed top-4 right-4 z-50 bg-gray-900 border border-emerald-500/40 text-emerald-400 px-4 py-3 rounded-lg shadow-lg text-sm font-medium animate-pulse">
      {message}
    </div>
  );
}

// Add Client Modal — layout matches Add New Asset / Add Cost Center form
function AddClientModal({ onClose, onAdd, nextId }) {
  const [form, setForm] = useState({ type: '', period: '', dueDate: '', amount: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.type.trim()) e.type = 'Tax Type is required';
    if (!form.period.trim()) e.period = 'Period is required';
    if (!form.dueDate.trim()) e.dueDate = 'Due Date is required';
    if (!form.amount.trim()) e.amount = 'Amount is required';
    else if (isNaN(Number(form.amount.replace(/[$,]/g, '')))) e.amount = 'Enter a valid number';
    return e;
  };

  const getAutoStatus = (dueDateStr) => {
    if (!dueDateStr) return null;
    const due = new Date(dueDateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return due < today ? 'Overdue' : 'Upcoming';
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    const amount = Number(form.amount.replace(/[$,]/g, ''));
    const autoStatus = getAutoStatus(form.dueDate) || 'Upcoming';
    const dueFmt = new Date(form.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    onAdd({ id: nextId, type: form.type, period: form.period, dueDate: dueFmt, amount: `$${amount.toLocaleString()}`, status: autoStatus });
    onClose();
  };

  const field = (key, label, placeholder, required = false, type = 'text') => (
    <div>
      <label className="block text-gray-600 text-xs font-medium mb-1">
        {label}{required && <span className="text-rose-500 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={form[key]}
        onChange={ev => { setForm(p => ({ ...p, [key]: ev.target.value })); setErrors(p => ({ ...p, [key]: '' })); }}
        className={`w-full bg-white border ${errors[key] ? 'border-rose-400' : 'border-gray-300'} rounded-lg px-3 py-2 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-colors`}
      />
      {errors[key] && <p className="text-rose-500 text-xs mt-1">{errors[key]}</p>}
    </div>
  );

  const statusPreview = getAutoStatus(form.dueDate);
  const statusColor = statusPreview === 'Overdue' ? 'text-rose-500' : 'text-amber-500';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-gray-900 font-semibold text-base">Add Tax Filing</h2>
            <p className="text-gray-400 text-xs mt-0.5">Fill in the details to create a new tax filing entry</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <div className="px-6 py-5 space-y-4">
          {/* Tax Type — full width */}
          <div>
            <label className="block text-gray-600 text-xs font-medium mb-1">
              Tax Type<span className="text-rose-500 ml-0.5">*</span>
            </label>
            <select
              value={form.type}
              onChange={ev => { setForm(p => ({ ...p, type: ev.target.value })); setErrors(p => ({ ...p, type: '' })); }}
              className={`w-full bg-white border ${errors.type ? 'border-rose-400' : 'border-gray-300'} rounded-lg px-3 py-2 text-gray-800 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-colors`}
            >
              <option value="">Select tax type...</option>
              <option>GST Monthly Return (GSTR-3B)</option>
              <option>TDS Return (Form 26Q)</option>
              <option>Advance Tax (Q4)</option>
              <option>Annual Income Tax Return</option>
              <option>TDS Return (Form 24Q)</option>
              <option>GST Annual Return (GSTR-9)</option>
            </select>
            {errors.type && <p className="text-rose-500 text-xs mt-1">{errors.type}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {field('period', 'Period', 'e.g. Mar 2026', true)}
            {field('dueDate', 'Due Date', '', true, 'date')}
          </div>

 

          <div className="grid grid-cols-2 gap-4">
            {field('amount', 'Amount (₹/$)', 'e.g. 15,000', true)}
            <div>
              <label className="block text-gray-600 text-xs font-medium mb-1">Status <span className="text-gray-400">(auto)</span></label>
              <div className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm select-none">
                {statusPreview
                  ? <span className={`font-semibold ${statusColor}`}>{statusPreview}</span>
                  : <span className="text-gray-400">Set after due date</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
          <button onClick={onClose} className="px-4 py-2 text-gray-500 hover:text-gray-700 text-sm rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button onClick={handleSubmit} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
            <Plus className="w-4 h-4" /> Add Filing
          </button>
        </div>
      </div>
    </div>
  );
}

// Inline confirm modal
function ConfirmModal({ filing, onClose, onConfirm }) {
  if (!filing) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6 space-y-4">
        <h2 className="text-gray-800 font-semibold text-base">Confirm Tax Filing</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-gray-500">Filing Type</span><span className="text-gray-800 font-medium">{filing.type}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Period</span><span className="text-gray-800">{filing.period}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Amount</span><span className="text-amber-600 font-bold">{filing.amount}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Due Date</span><span className="text-gray-800">{filing.dueDate}</span></div>
        </div>
        <div className="flex gap-3 pt-2">
          <button onClick={onClose} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
          <button onClick={onConfirm} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Confirm & File</button>
        </div>
      </div>
    </div>
  );
}

const statusStyle = {
  Filed: 'bg-emerald-500/20 text-emerald-400',
  Upcoming: 'bg-amber-500/20 text-amber-400',
  Overdue: 'bg-rose-500/20 text-rose-400',
};

const initFilings = [
  { id: 'TAX-001', type: 'GST Monthly Return (GSTR-3B)', period: 'Feb 2026', dueDate: 'Mar 20, 2026', amount: '$18,400', status: 'Filed' },
  { id: 'TAX-002', type: 'TDS Return (Form 26Q)', period: 'Q3 FY26', dueDate: 'Mar 31, 2026', amount: '$9,200', status: 'Upcoming' },
  { id: 'TAX-003', type: 'GST Monthly Return (GSTR-3B)', period: 'Mar 2026', dueDate: 'Apr 20, 2026', amount: '$21,000', status: 'Upcoming' },
  { id: 'TAX-004', type: 'Advance Tax (Q4)', period: 'Q4 FY26', dueDate: 'Mar 15, 2026', amount: '$45,000', status: 'Filed' },
  { id: 'TAX-005', type: 'Annual Income Tax Return', period: 'FY 2024-25', dueDate: 'Jul 31, 2025', amount: '$1,20,000', status: 'Filed' },
];

export default function TaxPage() {
  const [filings, setFilings] = useState(initFilings);
  const [fileNow, setFileNow] = useState(null);
  const [toast, setToast] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const nextId = `TAX-${String(filings.length + 1).padStart(3, '0')}`;

  const handleFile = () => {
    if (!fileNow) return;
    setFilings(prev => prev.map(f => f.id === fileNow.id ? { ...f, status: 'Filed' } : f));
    setToast(`${fileNow.type} filed successfully!`);
    setFileNow(null);
  };

  const handleDownload = (filing) => {
    const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const doc = new jsPDF();
    const pageW = doc.internal.pageSize.getWidth();

    // Blue header bar
    doc.setFillColor(37, 99, 235);
    doc.rect(0, 0, pageW, 28, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16); doc.setFont('helvetica', 'bold');
    doc.text('Finance & Accounting', 14, 12);
    doc.setFontSize(9); doc.setFont('helvetica', 'normal');
    doc.text('Tax Management System', 14, 20);

    // FILED badge
    doc.setFillColor(220, 252, 231);
    doc.roundedRect(pageW - 46, 8, 32, 12, 3, 3, 'F');
    doc.setTextColor(22, 163, 74);
    doc.setFontSize(9); doc.setFont('helvetica', 'bold');
    doc.text('FILED', pageW - 30, 16, { align: 'center' });

    // Title
    doc.setTextColor(17, 24, 39);
    doc.setFontSize(15); doc.setFont('helvetica', 'bold');
    doc.text('Tax Filing Receipt', 14, 42);
    doc.setFontSize(9); doc.setFont('helvetica', 'normal');
    doc.setTextColor(107, 114, 128);
    doc.text(`Receipt ID: ${filing.id}   |   Generated: ${today}`, 14, 50);

    // Divider
    doc.setDrawColor(229, 231, 235);
    doc.line(14, 54, pageW - 14, 54);

    // Details box
    doc.setFillColor(249, 250, 251);
    doc.roundedRect(14, 58, pageW - 28, 90, 4, 4, 'F');
    doc.setDrawColor(229, 231, 235);
    doc.roundedRect(14, 58, pageW - 28, 90, 4, 4, 'S');

    const rows = [
      ['Filing ID', filing.id],
      ['Tax Type', filing.type],
      ['Period', filing.period],
      ['Due Date', filing.dueDate],
      ['Status', filing.status],
      ['Amount', filing.amount],
      ['Filed On', today],
    ];

    rows.forEach(([label, value], i) => {
      const y = 70 + i * 11;
      doc.setFontSize(10); doc.setFont('helvetica', 'normal');
      doc.setTextColor(107, 114, 128);
      doc.text(label, 22, y);
      doc.setFont('helvetica', 'bold');
      if (label === 'Amount') { doc.setTextColor(217, 119, 6); doc.setFontSize(11); }
      else if (label === 'Status') { doc.setTextColor(22, 163, 74); }
      else { doc.setTextColor(17, 24, 39); doc.setFontSize(10); }
      doc.text(value, pageW - 22, y, { align: 'right' });
      if (i < rows.length - 1) { doc.setDrawColor(229, 231, 235); doc.line(22, y + 4, pageW - 22, y + 4); }
    });

    // Footer
    doc.setFontSize(8); doc.setFont('helvetica', 'normal');
    doc.setTextColor(156, 163, 175);
    doc.line(14, 160, pageW - 14, 160);
    doc.text('This is a system-generated receipt. No signature required.  |  Finance & Accounting Tax Management', pageW / 2, 166, { align: 'center' });

    doc.save(`${filing.id}-receipt.pdf`);
    setToast('Receipt downloaded!');
  };

  const handleAddFiling = (newFiling) => {
    setFilings(prev => [...prev, newFiling]);
    setToast('Tax filing added successfully!');
  };

  const totalPaid = filings.filter(f => f.status === 'Filed').reduce((s, f) => s + parseFloat(f.amount.replace(/[$,]/g, '')), 0);
  const totalPending = filings.filter(f => f.status === 'Upcoming').reduce((s, f) => s + parseFloat(f.amount.replace(/[$,]/g, '')), 0);

  return (
    <div className="p-6 space-y-6">
      {toast && <Toast message={toast} onDone={() => setToast('')} />}
      {showAddModal && <AddClientModal onClose={() => setShowAddModal(false)} onAdd={handleAddFiling} nextId={nextId} />}
      <ConfirmModal filing={fileNow} onClose={() => setFileNow(null)} onConfirm={handleFile} />

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Tax Management</h1>
          <p className="text-gray-500 text-sm mt-1">GST, TDS, income tax filings and compliance</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
        >
          + Add Client
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Filed', value: `$${totalPaid.toLocaleString()}`, color: 'text-emerald-400' },
          { label: 'Pending', value: `$${totalPending.toLocaleString()}`, color: 'text-amber-400' },
          { label: 'Compliance Rate', value: '100%', color: 'text-blue-400' },
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
              {['ID', 'Tax Type', 'Period', 'Due Date', 'Amount', 'Status', 'Action'].map(h =>
                <th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3">{h}</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filings.map(f => (
              <tr key={f.id} className="hover:bg-gray-800/60">
                <td className="px-4 py-3.5 text-blue-400 text-sm font-mono">{f.id}</td>
                <td className="px-4 py-3.5 text-white text-sm font-medium">{f.type}</td>
                <td className="px-4 py-3.5 text-gray-300 text-sm">{f.period}</td>
                <td className="px-4 py-3.5 text-gray-300 text-sm">{f.dueDate}</td>
                <td className="px-4 py-3.5 text-amber-400 text-sm font-semibold">{f.amount}</td>
                <td className="px-4 py-3.5">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusStyle[f.status]}`}>{f.status}</span>
                </td>
                <td className="px-4 py-3.5 flex gap-1.5">
                  {f.status === 'Upcoming' && <button onClick={() => setFileNow(f)} className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">File Now</button>}
                  {f.status === 'Overdue' && <button onClick={() => setFileNow(f)} className="px-3 py-1 bg-rose-600 text-white rounded text-xs hover:bg-rose-700">File Now</button>}
                  {f.status === 'Filed' && <button onClick={() => handleDownload(f)} className="flex items-center gap-1 px-3 py-1 bg-gray-700 text-gray-300 rounded text-xs hover:bg-gray-600"><Download className="w-3 h-3" /> Receipt</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}