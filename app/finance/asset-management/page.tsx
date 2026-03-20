'use client';
import { useState, useEffect } from 'react';
import { Plus, X, Upload, Download, FileText } from 'lucide-react';

// ─── Load jsPDF ───────────────────────────────────────────────────────────────
function useJsPDF() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if ((window as any).jspdf) { setLoaded(true); return; }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    script.async = true;
    script.onload = () => setLoaded(true);
    document.head.appendChild(script);
  }, []);
  return loaded;
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ message, onDone }: { message: string; onDone: () => void }) {
  setTimeout(onDone, 3000);
  return (
    <div className="fixed top-5 right-5 z-50 bg-gray-800 border border-gray-700 text-white text-sm px-4 py-3 rounded-lg shadow-lg">
      {message}
    </div>
  );
}

// ─── White Modal Wrapper ──────────────────────────────────────────────────────
function WhiteModal({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
        {children}
      </div>
    </div>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────
type Asset = { id: string; name: string; category: string; value: string; acquired: string; dep: string; netBook: string; status: string; };
type LifecycleRow = { asset: string; stage: string; date: string; notes: string; };
type TransferRow = { id: string; asset: string; from: string; to: string; transferDate: string; approvedBy: string; status: string; };
type ValuationRow = { asset: string; bookValue: string; marketValue: string; revaluation: string; lastValued: string; method: string; };

// ─── ADD ASSET MODAL ──────────────────────────────────────────────────────────
function AddAssetModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: (asset: Asset, msg: string) => void }) {
  const [form, setForm] = useState({ id: '', name: '', category: '', value: '', acquired: '', depRate: '', depMethod: 'SLM', location: '', serialNo: '', vendor: '', warrantyExpiry: '', notes: '' });
  const categories = ['Real Estate', 'IT Equipment', 'Vehicles', 'Equipment', 'Furniture', 'Other'];
  const hc = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.category || !form.value) return;
    const acquiredDisplay = form.acquired ? new Date(form.acquired).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'N/A';
    const valueDisplay = form.value.startsWith('$') ? form.value : `$${form.value}`;
    onSubmit({
      id: form.id || `AST-${String(Date.now()).slice(-3)}`,
      name: form.name,
      category: form.category,
      value: valueDisplay,
      acquired: acquiredDisplay,
      dep: form.depRate ? `${form.depRate}%/yr` : 'N/A',
      netBook: valueDisplay,
      status: 'Active',
    }, `Asset "${form.name}" added successfully!`);
    onClose();
  };

  const cls = 'w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2.5 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors';

  return (
    <WhiteModal onClose={onClose}>
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0 bg-white rounded-t-2xl">
        <div><h2 className="text-gray-800 font-semibold text-lg">Add New Asset</h2><p className="text-gray-500 text-xs mt-0.5">Fill in the details to register a new company asset</p></div>
        <button onClick={onClose} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"><X className="w-5 h-5" /></button>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-gray-600 text-xs font-medium mb-1.5">Asset ID</label><input name="id" value={form.id} onChange={hc} placeholder="e.g. AST-006" className={cls} /></div>
          <div><label className="block text-gray-600 text-xs font-medium mb-1.5">Serial / Tag No.</label><input name="serialNo" value={form.serialNo} onChange={hc} placeholder="e.g. SN-2024-001" className={cls} /></div>
        </div>
        <div><label className="block text-gray-600 text-xs font-medium mb-1.5">Asset Name <span className="text-rose-500">*</span></label><input name="name" value={form.name} onChange={hc} required placeholder="e.g. Office Building - Pune Branch" className={cls} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600 text-xs font-medium mb-1.5">Category <span className="text-rose-500">*</span></label>
            <select name="category" value={form.category} onChange={hc} required className={`${cls} appearance-none`}>
              <option value="">Select category</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div><label className="block text-gray-600 text-xs font-medium mb-1.5">Original Value ($) <span className="text-rose-500">*</span></label><input name="value" value={form.value} onChange={hc} required placeholder="e.g. 50,000" className={cls} /></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-gray-600 text-xs font-medium mb-1.5">Acquisition Date</label><input type="date" name="acquired" value={form.acquired} onChange={hc} className={cls} /></div>
          <div><label className="block text-gray-600 text-xs font-medium mb-1.5">Location / Department</label><input name="location" value={form.location} onChange={hc} placeholder="e.g. Mumbai HQ - 3rd Floor" className={cls} /></div>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <p className="text-blue-700 text-xs font-semibold uppercase tracking-wider mb-3">Depreciation Details</p>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-gray-600 text-xs font-medium mb-1.5">Depreciation Rate (%/yr)</label><input name="depRate" value={form.depRate} onChange={hc} placeholder="e.g. 10" className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors" /></div>
            <div>
              <label className="block text-gray-600 text-xs font-medium mb-1.5">Depreciation Method</label>
              <select name="depMethod" value={form.depMethod} onChange={hc} className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-gray-800 text-sm focus:outline-none focus:border-blue-500 transition-colors appearance-none">
                <option value="SLM">SLM - Straight Line</option>
                <option value="WDV">WDV - Written Down Value</option>
              </select>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-gray-600 text-xs font-medium mb-1.5">Vendor / Supplier</label><input name="vendor" value={form.vendor} onChange={hc} placeholder="e.g. Dell Technologies" className={cls} /></div>
          <div><label className="block text-gray-600 text-xs font-medium mb-1.5">Warranty Expiry</label><input type="date" name="warrantyExpiry" value={form.warrantyExpiry} onChange={hc} className={cls} /></div>
        </div>
        <div><label className="block text-gray-600 text-xs font-medium mb-1.5">Notes / Remarks</label><textarea name="notes" value={form.notes} onChange={hc} rows={3} placeholder="Additional notes..." className={`${cls} resize-none`} /></div>
        <div>
          <label className="block text-gray-600 text-xs font-medium mb-1.5">Attach Document / Invoice</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg px-4 py-5 flex flex-col items-center gap-1.5 hover:border-blue-400 transition-colors cursor-pointer">
            <Upload className="w-5 h-5 text-gray-400" />
            <span className="text-gray-500 text-xs">Drag & drop or <span className="text-blue-500">browse</span></span>
            <span className="text-gray-400 text-xs">PDF, PNG, JPG up to 10MB</span>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-200">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200 transition-colors">Cancel</button>
          <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">Add Asset</button>
        </div>
      </form>
    </WhiteModal>
  );
}

// ─── ADD LIFECYCLE MODAL ──────────────────────────────────────────────────────
function AddLifecycleModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: (row: LifecycleRow, msg: string) => void }) {
  const [form, setForm] = useState({ asset: '', stage: '', date: '', notes: '' });
  const stages = ['Procurement', 'In Use', 'Maintenance', 'Disposed'];
  const hc = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const cls = 'w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2.5 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.asset || !form.stage) return;
    const dateDisplay = form.date ? new Date(form.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    onSubmit({ asset: form.asset, stage: form.stage, date: dateDisplay, notes: form.notes }, `Lifecycle entry for "${form.asset}" added!`);
    onClose();
  };

  return (
    <WhiteModal onClose={onClose}>
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0 bg-white rounded-t-2xl">
        <div><h2 className="text-gray-800 font-semibold text-lg">Add Lifecycle Tracking</h2><p className="text-gray-500 text-xs mt-0.5">Record a lifecycle stage for an asset</p></div>
        <button onClick={onClose} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"><X className="w-5 h-5" /></button>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        <div><label className="block text-gray-600 text-xs font-medium mb-1.5">Asset Name <span className="text-rose-500">*</span></label><input name="asset" value={form.asset} onChange={hc} required placeholder="e.g. Server Rack C" className={cls} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600 text-xs font-medium mb-1.5">Lifecycle Stage <span className="text-rose-500">*</span></label>
            <select name="stage" value={form.stage} onChange={hc} required className={`${cls} appearance-none`}>
              <option value="">Select stage</option>
              {stages.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div><label className="block text-gray-600 text-xs font-medium mb-1.5">Date</label><input type="date" name="date" value={form.date} onChange={hc} className={cls} /></div>
        </div>
        <div><label className="block text-gray-600 text-xs font-medium mb-1.5">Notes</label><textarea name="notes" value={form.notes} onChange={hc} rows={3} placeholder="Additional notes..." className={`${cls} resize-none`} /></div>
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-200">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200 transition-colors">Cancel</button>
          <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">Add Tracking</button>
        </div>
      </form>
    </WhiteModal>
  );
}

// ─── NEW TRANSFER MODAL ───────────────────────────────────────────────────────
function NewTransferModal({ onClose, onSubmit, nextId }: { onClose: () => void; onSubmit: (row: TransferRow, msg: string) => void; nextId: string; }) {
  const [form, setForm] = useState({ asset: '', from: '', to: '', date: '', notes: '' });
  const hc = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const cls = 'w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2.5 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.asset || !form.from || !form.to) return;
    const dateDisplay = form.date ? new Date(form.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    onSubmit({ id: nextId, asset: form.asset, from: form.from, to: form.to, transferDate: dateDisplay, approvedBy: 'Pending', status: 'Pending' }, `Transfer for "${form.asset}" submitted successfully!`);
    onClose();
  };

  return (
    <WhiteModal onClose={onClose}>
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0 bg-white rounded-t-2xl">
        <div><h2 className="text-gray-800 font-semibold text-lg">New Asset Transfer</h2><p className="text-gray-500 text-xs mt-0.5">Submit a transfer request for an asset</p></div>
        <button onClick={onClose} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"><X className="w-5 h-5" /></button>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        <div><label className="block text-gray-600 text-xs font-medium mb-1.5">Asset Name <span className="text-rose-500">*</span></label><input name="asset" value={form.asset} onChange={hc} required placeholder="e.g. Laptop - Dell XPS" className={cls} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-gray-600 text-xs font-medium mb-1.5">Transfer From <span className="text-rose-500">*</span></label><input name="from" value={form.from} onChange={hc} required placeholder="e.g. Engineering" className={cls} /></div>
          <div><label className="block text-gray-600 text-xs font-medium mb-1.5">Transfer To <span className="text-rose-500">*</span></label><input name="to" value={form.to} onChange={hc} required placeholder="e.g. Sales" className={cls} /></div>
        </div>
        <div><label className="block text-gray-600 text-xs font-medium mb-1.5">Transfer Date</label><input type="date" name="date" value={form.date} onChange={hc} className={cls} /></div>
        <div><label className="block text-gray-600 text-xs font-medium mb-1.5">Reason / Notes</label><textarea name="notes" value={form.notes} onChange={hc} rows={3} placeholder="Reason for transfer..." className={`${cls} resize-none`} /></div>
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-200">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200 transition-colors">Cancel</button>
          <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">Submit Transfer</button>
        </div>
      </form>
    </WhiteModal>
  );
}

// ─── REQUEST VALUATION MODAL ──────────────────────────────────────────────────
function RequestValuationModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: (v: ValuationRow, msg: string) => void; }) {
  const [form, setForm] = useState({ asset: '', method: '', valuationDate: '', valuedBy: '', bookValue: '', marketValue: '', notes: '' });
  const methods = ['Market Approach', 'Cost Approach', 'Income Approach'];
  const hc = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const cls = 'w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2.5 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.asset || !form.method) return;
    const dateDisplay = form.valuationDate ? new Date(form.valuationDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    const bookRaw = form.bookValue.trim() || '0';
    const marketRaw = form.marketValue.trim() || '0';
    const bookDisplay = bookRaw.startsWith('$') ? bookRaw : `$${bookRaw}`;
    const marketDisplay = marketRaw.startsWith('$') ? marketRaw : `$${marketRaw}`;
    const bookNum = parseFloat(bookRaw.replace(/[$,]/g, ''));
    const marketNum = parseFloat(marketRaw.replace(/[$,]/g, ''));
    let revaluation = 'N/A';
    if (!isNaN(bookNum) && !isNaN(marketNum)) {
      const diff = marketNum - bookNum;
      revaluation = diff >= 0 ? `+$${Math.abs(diff).toLocaleString('en-US')}` : `-$${Math.abs(diff).toLocaleString('en-US')}`;
    }
    onSubmit({ asset: form.asset, bookValue: bookDisplay, marketValue: marketDisplay, revaluation, lastValued: dateDisplay, method: form.method }, `Valuation for "${form.asset}" added to the table!`);
    onClose();
  };

  return (
    <WhiteModal onClose={onClose}>
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0 bg-white rounded-t-2xl">
        <div><h2 className="text-gray-800 font-semibold text-lg">Request Asset Valuation</h2><p className="text-gray-500 text-xs mt-0.5">Submit valuation details — they will appear in the table</p></div>
        <button onClick={onClose} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"><X className="w-5 h-5" /></button>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        <div><label className="block text-gray-600 text-xs font-medium mb-1.5">Asset Name <span className="text-rose-500">*</span></label><input name="asset" value={form.asset} onChange={hc} required placeholder="e.g. Office Building - Mumbai HQ" className={cls} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600 text-xs font-medium mb-1.5">Valuation Method <span className="text-rose-500">*</span></label>
            <select name="method" value={form.method} onChange={hc} required className={`${cls} appearance-none`}>
              <option value="">Select method</option>
              {methods.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div><label className="block text-gray-600 text-xs font-medium mb-1.5">Valuation Date</label><input type="date" name="valuationDate" value={form.valuationDate} onChange={hc} className={cls} /></div>
        </div>
        <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
          <p className="text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-3">Valuation Figures</p>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-gray-600 text-xs font-medium mb-1.5">Book Value ($)</label><input name="bookValue" value={form.bookValue} onChange={hc} placeholder="e.g. 7,02,500" className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors" /></div>
            <div>
              <label className="block text-gray-600 text-xs font-medium mb-1.5">Market Value ($)</label>
              <input name="marketValue" value={form.marketValue} onChange={hc} placeholder="e.g. 9,50,000" className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors" />
              <p className="text-gray-400 text-xs mt-1">Revaluation diff is auto-calculated.</p>
            </div>
          </div>
        </div>
        <div><label className="block text-gray-600 text-xs font-medium mb-1.5">Valued By / Appraiser</label><input name="valuedBy" value={form.valuedBy} onChange={hc} placeholder="e.g. External Auditor / Internal Team" className={cls} /></div>
        <div><label className="block text-gray-600 text-xs font-medium mb-1.5">Notes / Remarks</label><textarea name="notes" value={form.notes} onChange={hc} rows={3} placeholder="Additional information..." className={`${cls} resize-none`} /></div>
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-200">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200 transition-colors">Cancel</button>
          <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">Submit Request</button>
        </div>
      </form>
    </WhiteModal>
  );
}

// ─── EXPORT PDF ───────────────────────────────────────────────────────────────
function exportDepreciationPDF(data: { asset: string; fy: string; opening: string; charge: string; closing: string; method: string }[], onToast: (msg: string) => void) {
  const win = window as any;
  if (!win.jspdf?.jsPDF) { onToast('PDF library not ready yet, please try again.'); return; }
  const { jsPDF } = win.jspdf;
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  doc.setFillColor(30, 41, 59); doc.rect(0, 0, pageWidth, 22, 'F');
  doc.setTextColor(255, 255, 255); doc.setFontSize(14); doc.setFont('helvetica', 'bold');
  doc.text('Depreciation Schedule \u2014 FY 2025-26', 14, 14);
  doc.setFontSize(9); doc.setFont('helvetica', 'normal');
  doc.text(`Exported: ${today}`, pageWidth - 14, 14, { align: 'right' });
  doc.setFillColor(248, 250, 252); doc.rect(0, 22, pageWidth, 10, 'F');
  doc.setTextColor(100, 116, 139); doc.setFontSize(8);
  doc.text('CognexiaAI Finance & Accounting \u2014 Asset Management', 14, 28.5);
  doc.text('CONFIDENTIAL', pageWidth - 14, 28.5, { align: 'right' });
  const headers = ['Asset', 'FY', 'Opening WDV', 'Dep. Charge', 'Closing WDV', 'Method'];
  const colWidths = [72, 30, 42, 38, 42, 28];
  const colX: number[] = []; let cx = 14;
  colWidths.forEach(w => { colX.push(cx); cx += w; });
  const tableStartY = 38; const totalTableWidth = colWidths.reduce((a, b) => a + b, 0);
  doc.setFillColor(51, 65, 85); doc.rect(14, tableStartY, totalTableWidth, 9, 'F');
  doc.setTextColor(226, 232, 240); doc.setFontSize(8.5); doc.setFont('helvetica', 'bold');
  headers.forEach((h, i) => doc.text(h, colX[i] + 3, tableStartY + 6));
  let rowY = tableStartY + 9; const rowHeight = 10;
  data.forEach((row, idx) => {
    doc.setFillColor(idx % 2 === 0 ? 241 : 255, idx % 2 === 0 ? 245 : 255, idx % 2 === 0 ? 249 : 255);
    doc.rect(14, rowY, totalTableWidth, rowHeight, 'F');
    doc.setDrawColor(226, 232, 240); doc.setLineWidth(0.3);
    doc.line(14, rowY + rowHeight, 14 + totalTableWidth, rowY + rowHeight);
    const values = [row.asset, row.fy, row.opening, `-${row.charge}`, row.closing, row.method];
    doc.setFontSize(8.5); doc.setFont('helvetica', 'normal');
    values.forEach((val, i) => {
      if (i === 5) {
        const badgeX = colX[i] + 2; const color = val === 'SLM' ? [59, 130, 246] : [139, 92, 246];
        doc.setFillColor(color[0], color[1], color[2]);
        doc.roundedRect(badgeX, rowY + 2.5, 18, 5.5, 1.5, 1.5, 'F');
        doc.setTextColor(255, 255, 255); doc.setFont('helvetica', 'bold'); doc.setFontSize(7.5);
        doc.text(val, badgeX + 9, rowY + 6.5, { align: 'center' });
        doc.setFontSize(8.5); doc.setFont('helvetica', 'normal');
      } else {
        if (i === 3) doc.setTextColor(220, 38, 38);
        else if (i === 4) doc.setTextColor(5, 150, 105);
        else if (i === 2) doc.setTextColor(180, 120, 0);
        else doc.setTextColor(30, 41, 59);
        doc.text(val, colX[i] + 3, rowY + 6.5);
      }
    });
    rowY += rowHeight;
  });
  doc.setDrawColor(203, 213, 225); doc.setLineWidth(0.5);
  doc.rect(14, tableStartY, totalTableWidth, rowY - tableStartY);
  const summaryY = rowY + 8;
  doc.setFillColor(239, 246, 255); doc.setDrawColor(191, 219, 254); doc.setLineWidth(0.4);
  doc.roundedRect(14, summaryY, 110, 18, 2, 2, 'FD');
  doc.setTextColor(30, 64, 175); doc.setFontSize(8); doc.setFont('helvetica', 'bold');
  doc.text('Summary', 18, summaryY + 6);
  doc.setFont('helvetica', 'normal'); doc.setFontSize(7.5);
  doc.text(`Total Assets: ${data.length}`, 18, summaryY + 12);
  doc.text('Report Period: FY 2025-26', 65, summaryY + 12);
  const pageHeight = doc.internal.pageSize.getHeight();
  doc.setFillColor(30, 41, 59); doc.rect(0, pageHeight - 10, pageWidth, 10, 'F');
  doc.setTextColor(148, 163, 184); doc.setFontSize(7); doc.setFont('helvetica', 'normal');
  doc.text('Generated by CognexiaAI Asset Management System', 14, pageHeight - 3.5);
  doc.text('Page 1 of 1', pageWidth - 14, pageHeight - 3.5, { align: 'right' });
  doc.save('depreciation-schedule-fy2025-26.pdf');
  onToast('Depreciation schedule exported as PDF!');
}

// ─── Initial State Data ───────────────────────────────────────────────────────
const initAssets: Asset[] = [
  { id: 'AST-001', name: 'Office Building - Mumbai HQ', category: 'Real Estate', value: '$8,50,000', acquired: 'Jan 2020', dep: '5%/yr', netBook: '$7,02,500', status: 'Active' },
  { id: 'AST-002', name: 'Server Infrastructure - Rack A', category: 'IT Equipment', value: '$1,25,000', acquired: 'Mar 2023', dep: '33%/yr', netBook: '$41,625', status: 'Active' },
  { id: 'AST-003', name: 'Company Vehicles (Fleet 5)', category: 'Vehicles', value: '$2,20,000', acquired: 'Jun 2022', dep: '20%/yr', netBook: '$1,32,000', status: 'Active' },
  { id: 'AST-004', name: 'Industrial Generators', category: 'Equipment', value: '$45,000', acquired: 'Nov 2021', dep: '10%/yr', netBook: '$29,250', status: 'Active' },
  { id: 'AST-005', name: 'Office Furniture & Fittings', category: 'Furniture', value: '$38,000', acquired: 'Jan 2021', dep: '10%/yr', netBook: '$19,950', status: 'Disposed' },
];

const depSchedule = [
  { asset: 'Office Building', fy: 'FY 2025-26', opening: '$7,44,750', charge: '$42,250', closing: '$7,02,500', method: 'SLM' },
  { asset: 'Server Infrastructure', fy: 'FY 2025-26', opening: '$83,750', charge: '$41,250', closing: '$41,625', method: 'WDV' },
  { asset: 'Company Vehicles', fy: 'FY 2025-26', opening: '$1,65,000', charge: '$33,000', closing: '$1,32,000', method: 'SLM' },
  { asset: 'Generators', fy: 'FY 2025-26', opening: '$32,500', charge: '$3,250', closing: '$29,250', method: 'SLM' },
];

const initLifecycle: LifecycleRow[] = [
  { asset: 'Server Rack B', stage: 'Procurement', date: 'Mar 01, 2026', notes: 'PO raised, awaiting delivery' },
  { asset: 'Office Building', stage: 'In Use', date: 'Jan 2020', notes: 'Annual maintenance scheduled Apr 2026' },
  { asset: 'Office Furniture', stage: 'Disposed', date: 'Feb 2026', notes: 'Sold at $5,000. Gain recorded.' },
  { asset: 'Server Rack A', stage: 'Maintenance', date: 'Mar 10, 2026', notes: 'Scheduled firmware update in progress' },
];

const initTransfers: TransferRow[] = [
  { id: 'TRF-001', asset: 'Laptop - Dell XPS', from: 'Engineering', to: 'Sales', transferDate: 'Mar 08, 2026', approvedBy: 'Super Admin', status: 'Completed' },
  { id: 'TRF-002', asset: 'Projector - Epson', from: 'Training Room', to: 'Conference Hall', transferDate: 'Mar 05, 2026', approvedBy: 'Super Admin', status: 'Completed' },
  { id: 'TRF-003', asset: 'Company Car - MH12AB1234', from: 'Operations', to: 'Sales', transferDate: 'Mar 12, 2026', approvedBy: 'Pending', status: 'Pending' },
];

const initValuations: ValuationRow[] = [
  { asset: 'Office Building - Mumbai HQ', bookValue: '$7,02,500', marketValue: '$9,50,000', revaluation: '+$2,47,500', lastValued: 'Mar 2026', method: 'Market Approach' },
  { asset: 'Company Vehicles (Fleet 5)', bookValue: '$1,32,000', marketValue: '$1,10,000', revaluation: '-$22,000', lastValued: 'Jan 2026', method: 'Cost Approach' },
  { asset: 'Server Infrastructure', bookValue: '$41,625', marketValue: '$38,000', revaluation: '-$3,625', lastValued: 'Feb 2026', method: 'Income Approach' },
];

const stageColor: Record<string, string> = {
  Procurement: 'bg-blue-500/20 text-blue-400',
  'In Use': 'bg-emerald-500/20 text-emerald-400',
  Maintenance: 'bg-amber-500/20 text-amber-400',
  Disposed: 'bg-gray-500/20 text-gray-400',
};

const tabs = ['Fixed Assets', 'Depreciation', 'Asset Lifecycle', 'Transfer', 'Valuation'];

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AssetManagementPage() {
  // All 4 lists are now state — new entries persist immediately
  const [assets, setAssets] = useState<Asset[]>(initAssets);
  const [lifecycle, setLifecycle] = useState<LifecycleRow[]>(initLifecycle);
  const [transfers, setTransfers] = useState<TransferRow[]>(initTransfers);
  const [valuations, setValuations] = useState<ValuationRow[]>(initValuations);

  const [toast, setToast] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [showAddAsset, setShowAddAsset] = useState(false);
  const [showAddLifecycle, setShowAddLifecycle] = useState(false);
  const [showNewTransfer, setShowNewTransfer] = useState(false);
  const [showRequestValuation, setShowRequestValuation] = useState(false);

  useJsPDF();

  const activeCount = assets.filter(a => a.status === 'Active').length;
  const nextTransferId = `TRF-${String(transfers.length + 1).padStart(3, '0')}`;

  return (
    <div className="p-6 space-y-6">
      {toast && <Toast message={toast} onDone={() => setToast('')} />}

      {showAddAsset && (
        <AddAssetModal
          onClose={() => setShowAddAsset(false)}
          onSubmit={(asset, msg) => { setAssets(p => [...p, asset]); setToast(msg); setActiveTab(0); }}
        />
      )}
      {showAddLifecycle && (
        <AddLifecycleModal
          onClose={() => setShowAddLifecycle(false)}
          onSubmit={(row, msg) => { setLifecycle(p => [...p, row]); setToast(msg); }}
        />
      )}
      {showNewTransfer && (
        <NewTransferModal
          nextId={nextTransferId}
          onClose={() => setShowNewTransfer(false)}
          onSubmit={(row, msg) => { setTransfers(p => [...p, row]); setToast(msg); }}
        />
      )}
      {showRequestValuation && (
        <RequestValuationModal
          onClose={() => setShowRequestValuation(false)}
          onSubmit={(v, msg) => { setValuations(p => [...p, v]); setToast(msg); setActiveTab(4); }}
        />
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white-800">Asset Management</h1>
          <p className="text-gray-500 text-sm mt-1">Track, manage, and depreciate company assets</p>
        </div>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Total Asset Value', value: '$12,78,000', color: 'text-white' },
          { label: 'Net Book Value', value: '$10,25,325', color: 'text-emerald-400' },
          { label: 'Accumulated Dep.', value: '$2,52,675', color: 'text-amber-400' },
          { label: 'Active Assets', value: String(activeCount), color: 'text-blue-400' },
        ].map(s => (
          <div key={s.label} className="bg-gray-900 rounded-xl p-5">
            <div className="text-gray-400 text-sm mb-2">{s.label}</div>
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="border-b border-gray-200">
        <div className="flex">{tabs.map((tab, i) => (
          <button key={tab} onClick={() => setActiveTab(i)}
            className={`px-4 py-2.5 text-sm border-b-2 transition-colors ${activeTab === i ? 'text-blue-600 font-medium border-blue-600' : 'text-gray-500 border-transparent hover:text-gray-700'}`}>
            {tab}
          </button>
        ))}</div>
      </div>

      {/* Tab 0: Fixed Assets */}
      {activeTab === 0 && (
        <div className="bg-gray-900 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
            <h2 className="text-white font-semibold text-sm">Fixed Assets</h2>
            <button onClick={() => setShowAddAsset(true)} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4" /> Add Asset
            </button>
          </div>
          <table className="w-full">
            <thead><tr className="bg-gray-800 border-b border-gray-700">
              {['ID', 'Asset Name', 'Category', 'Original Value', 'Acquired', 'Depreciation', 'Net Book Value', 'Status'].map(h =>
                <th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3">{h}</th>)}
            </tr></thead>
            <tbody className="divide-y divide-gray-800">
              {assets.map(a => (
                <tr key={a.id} className="hover:bg-gray-800/60 transition-colors">
                  <td className="px-4 py-3.5 text-blue-400 text-sm font-mono">{a.id}</td>
                  <td className="px-4 py-3.5 text-white text-sm font-medium">{a.name}</td>
                  <td className="px-4 py-3.5 text-gray-300 text-sm">{a.category}</td>
                  <td className="px-4 py-3.5 text-amber-400 text-sm">{a.value}</td>
                  <td className="px-4 py-3.5 text-gray-300 text-sm">{a.acquired}</td>
                  <td className="px-4 py-3.5 text-gray-300 text-sm">{a.dep}</td>
                  <td className="px-4 py-3.5 text-emerald-400 text-sm font-semibold">{a.netBook}</td>
                  <td className="px-4 py-3.5"><span className={`px-2 py-0.5 rounded text-xs font-medium ${a.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-500/20 text-gray-400'}`}>{a.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 1: Depreciation */}
      {activeTab === 1 && (
        <div className="bg-gray-900 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
            <h2 className="text-white font-semibold text-sm">Depreciation Schedule — FY 2025-26</h2>
            <button onClick={() => exportDepreciationPDF(depSchedule, setToast)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-700 text-gray-300 rounded text-xs hover:bg-gray-600 transition-colors">
              <Download className="w-3.5 h-3.5" /> Export PDF
            </button>
          </div>
          <table className="w-full">
            <thead><tr className="bg-gray-800 border-b border-gray-700">
              {['Asset', 'FY', 'Opening WDV', 'Dep. Charge', 'Closing WDV', 'Method'].map(h =>
                <th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3">{h}</th>)}
            </tr></thead>
            <tbody className="divide-y divide-gray-800">
              {depSchedule.map((d, i) => (
                <tr key={i} className="hover:bg-gray-800/60">
                  <td className="px-4 py-3.5 text-white text-sm font-medium">{d.asset}</td>
                  <td className="px-4 py-3.5 text-gray-300 text-sm">{d.fy}</td>
                  <td className="px-4 py-3.5 text-amber-400 text-sm">{d.opening}</td>
                  <td className="px-4 py-3.5 text-rose-400 text-sm">-{d.charge}</td>
                  <td className="px-4 py-3.5 text-emerald-400 text-sm font-semibold">{d.closing}</td>
                  <td className="px-4 py-3.5"><span className="bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded text-xs">{d.method}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 2: Asset Lifecycle */}
      {activeTab === 2 && (
        <div className="bg-gray-900 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
            <h2 className="text-white font-semibold text-sm">Asset Lifecycle Tracking</h2>
            <button onClick={() => setShowAddLifecycle(true)} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors">
              <Plus className="w-3.5 h-3.5" /> Add Tracking
            </button>
          </div>
          <table className="w-full">
            <thead><tr className="bg-gray-800 border-b border-gray-700">
              {['Asset', 'Lifecycle Stage', 'Date', 'Notes'].map(h =>
                <th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3">{h}</th>)}
            </tr></thead>
            <tbody className="divide-y divide-gray-800">
              {lifecycle.map((l, i) => (
                <tr key={i} className="hover:bg-gray-800/60">
                  <td className="px-4 py-3.5 text-white text-sm font-medium">{l.asset}</td>
                  <td className="px-4 py-3.5"><span className={`px-2 py-0.5 rounded text-xs font-medium ${stageColor[l.stage] ?? 'bg-gray-500/20 text-gray-400'}`}>{l.stage}</span></td>
                  <td className="px-4 py-3.5 text-gray-300 text-sm">{l.date}</td>
                  <td className="px-4 py-3.5 text-gray-400 text-sm">{l.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 3: Transfers */}
      {activeTab === 3 && (
        <div className="bg-gray-900 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
            <h2 className="text-white font-semibold text-sm">Asset Transfers</h2>
            <button onClick={() => setShowNewTransfer(true)} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors">
              <Plus className="w-3.5 h-3.5" /> New Transfer
            </button>
          </div>
          <table className="w-full">
            <thead><tr className="bg-gray-800 border-b border-gray-700">
              {['Transfer ID', 'Asset', 'From', 'To', 'Date', 'Approved By', 'Status'].map(h =>
                <th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3">{h}</th>)}
            </tr></thead>
            <tbody className="divide-y divide-gray-800">
              {transfers.map(t => (
                <tr key={t.id} className="hover:bg-gray-800/60">
                  <td className="px-4 py-3.5 text-blue-400 text-sm font-mono">{t.id}</td>
                  <td className="px-4 py-3.5 text-white text-sm font-medium">{t.asset}</td>
                  <td className="px-4 py-3.5 text-gray-300 text-sm">{t.from}</td>
                  <td className="px-4 py-3.5 text-gray-300 text-sm">{t.to}</td>
                  <td className="px-4 py-3.5 text-gray-400 text-sm">{t.transferDate}</td>
                  <td className="px-4 py-3.5 text-gray-300 text-sm">{t.approvedBy}</td>
                  <td className="px-4 py-3.5"><span className={`px-2 py-0.5 rounded text-xs font-medium ${t.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>{t.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 4: Valuation */}
      {activeTab === 4 && (
        <div className="bg-gray-900 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
            <h2 className="text-white font-semibold text-sm">Asset Valuation</h2>
            <button onClick={() => setShowRequestValuation(true)} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors">
              <FileText className="w-3.5 h-3.5" /> Request Valuation
            </button>
          </div>
          <table className="w-full">
            <thead><tr className="bg-gray-800 border-b border-gray-700">
              {['Asset', 'Book Value', 'Market Value', 'Revaluation', 'Last Valued', 'Method'].map(h =>
                <th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3">{h}</th>)}
            </tr></thead>
            <tbody className="divide-y divide-gray-800">
              {valuations.map((v, i) => (
                <tr key={i} className="hover:bg-gray-800/60">
                  <td className="px-4 py-3.5 text-white text-sm font-medium">{v.asset}</td>
                  <td className="px-4 py-3.5 text-gray-300 text-sm">{v.bookValue}</td>
                  <td className="px-4 py-3.5 text-amber-400 text-sm font-semibold">{v.marketValue}</td>
                  <td className={`px-4 py-3.5 text-sm font-bold ${v.revaluation.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>{v.revaluation}</td>
                  <td className="px-4 py-3.5 text-gray-400 text-sm">{v.lastValued}</td>
                  <td className="px-4 py-3.5 text-gray-300 text-sm">{v.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}