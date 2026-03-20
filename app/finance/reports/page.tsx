// 'use client';
// import { useState } from 'react';
// import { Download, FileText, TrendingUp, DollarSign, PieChart, BarChart2 } from 'lucide-react';
// import { Toast } from '../../components/Modal';

// const reports = [
//   { name: 'Profit & Loss Statement', desc: 'Income, expenses, net profit', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50', period: 'Mar 2026' },
//   { name: 'Balance Sheet', desc: 'Assets, liabilities, equity', icon: DollarSign, color: 'text-blue-600', bg: 'bg-blue-50', period: 'Mar 2026' },
//   { name: 'Cash Flow Statement', desc: 'Operating, investing, financing', icon: PieChart, color: 'text-violet-600', bg: 'bg-violet-50', period: 'Q4 FY26' },
//   { name: 'Accounts Receivable Aging', desc: 'Outstanding invoices by age', icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50', period: 'Mar 2026' },
//   { name: 'Accounts Payable Report', desc: 'Vendor payments due', icon: FileText, color: 'text-rose-600', bg: 'bg-rose-50', period: 'Mar 2026' },
//   { name: 'Budget vs Actual', desc: 'Department spend analysis', icon: BarChart2, color: 'text-indigo-600', bg: 'bg-indigo-50', period: 'FY 2025-26' },
// ];

// const plData = [
//   { item: 'Revenue - Products', type: 'revenue', amount: '$1,25,000' },
//   { item: 'Revenue - Services', amount: '$80,000', type: 'revenue' },
//   { item: 'Total Revenue', amount: '$2,05,000', type: 'total' },
//   { item: 'Cost of Goods Sold', amount: '$62,000', type: 'expense' },
//   { item: 'Gross Profit', amount: '$1,43,000', type: 'subtotal' },
//   { item: 'Salaries & Benefits', amount: '$55,000', type: 'expense' },
//   { item: 'Rent & Utilities', amount: '$8,200', type: 'expense' },
//   { item: 'Marketing', amount: '$12,000', type: 'expense' },
//   { item: 'Technology', amount: '$9,400', type: 'expense' },
//   { item: 'Total Expenses', amount: '$84,600', type: 'total' },
//   { item: 'Net Profit', amount: '$58,400', type: 'profit' },
// ];

// export default function ReportsPage() {
//   const [toast, setToast] = useState('');

//   const handleDownload = (name: string) => {
//     const csv = `Report: ${name}\nGenerated: ${new Date().toLocaleDateString()}\n\n${plData.map(r=>`${r.item},${r.amount}`).join('\n')}`;
//     const blob = new Blob([csv], { type: 'text/csv' });
//     const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `${name.replace(/\s+/g,'-').toLowerCase()}.csv`; a.click();
//     setToast(`${name} downloaded!`);
//   };

//   return (
//     <div className="p-6 space-y-6">
//       {toast && <Toast message={toast} onDone={() => setToast('')} />}
//       <div><h1 className="text-2xl font-bold text-white-800">Financial Reports</h1><p className="text-gray-500 text-sm mt-1">Generate and download financial reports</p></div>

//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
//         {reports.map(r => (
//           <div key={r.name} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
//             <div className="flex items-start gap-4 mb-4">
//               <div className={`p-3 rounded-xl ${r.bg} flex-shrink-0`}><r.icon className={`w-5 h-5 ${r.color}`} /></div>
//               <div className="flex-1">
//                 <div className="text-gray-800 font-semibold text-sm">{r.name}</div>
//                 <div className="text-gray-400 text-xs mt-0.5">{r.desc}</div>
//                 <div className="text-gray-400 text-xs mt-1">Period: {r.period}</div>
//               </div>
//             </div>
//             <div className="flex gap-2">
//               <button onClick={() => handleDownload(r.name)} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-xs hover:bg-gray-50"><Download className="w-3.5 h-3.5" /> Download</button>
//               <button onClick={() => setToast(`Viewing ${r.name}...`)} className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-xs hover:bg-blue-700">View Report</button>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="bg-gray-900 rounded-xl overflow-hidden">
//         <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
//           <h2 className="text-white font-semibold text-sm">Profit & Loss — March 2026</h2>
//           <button onClick={() => handleDownload('P&L Statement')} className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 text-gray-300 rounded-lg text-xs hover:bg-gray-600"><Download className="w-3.5 h-3.5" /> Export</button>
//         </div>
//         <table className="w-full">
//           <thead><tr className="bg-gray-800 border-b border-gray-700"><th className="text-left text-gray-400 text-xs font-medium px-4 py-3">Line Item</th><th className="text-right text-gray-400 text-xs font-medium px-4 py-3">Amount</th></tr></thead>
//           <tbody className="divide-y divide-gray-800">
//             {plData.map((r, i) => (
//               <tr key={i} className={`${r.type === 'total' || r.type === 'subtotal' ? 'bg-gray-800/60' : 'hover:bg-gray-800/40'}`}>
//                 <td className={`px-4 py-3 text-sm ${r.type === 'profit' ? 'text-emerald-400 font-bold' : r.type === 'total' || r.type === 'subtotal' ? 'text-white font-semibold' : 'text-gray-300'}`}>{r.item}</td>
//                 <td className={`px-4 py-3 text-sm text-right ${r.type === 'profit' ? 'text-emerald-400 font-bold' : r.type === 'expense' ? 'text-rose-400' : r.type === 'total' || r.type === 'subtotal' ? 'text-white font-semibold' : 'text-emerald-400'}`}>{r.amount}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
'use client';
import { useState, useEffect } from 'react';
import { Download, FileText, TrendingUp, DollarSign, PieChart, BarChart2, X, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Toast } from '../../components/Modal';

// ─── Load jsPDF via script tag (Next.js safe) ─────────────────────────────────
function useJsPDF() {
  useEffect(() => {
    if ((window as any).jspdf) return;
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    script.async = true;
    document.head.appendChild(script);
  }, []);
}

// ─── Report Data ──────────────────────────────────────────────────────────────
const plData = [
  { item: 'Revenue - Products', type: 'revenue', amount: '$1,25,000' },
  { item: 'Revenue - Services', type: 'revenue', amount: '$80,000' },
  { item: 'Total Revenue', type: 'total', amount: '$2,05,000' },
  { item: 'Cost of Goods Sold', type: 'expense', amount: '$62,000' },
  { item: 'Gross Profit', type: 'subtotal', amount: '$1,43,000' },
  { item: 'Salaries & Benefits', type: 'expense', amount: '$55,000' },
  { item: 'Rent & Utilities', type: 'expense', amount: '$8,200' },
  { item: 'Marketing', type: 'expense', amount: '$12,000' },
  { item: 'Technology', type: 'expense', amount: '$9,400' },
  { item: 'Total Expenses', type: 'total', amount: '$84,600' },
  { item: 'Net Profit', type: 'profit', amount: '$58,400' },
];

const balanceSheetData = [
  { item: 'Cash & Equivalents', type: 'revenue', amount: '$3,20,000' },
  { item: 'Accounts Receivable', type: 'revenue', amount: '$95,000' },
  { item: 'Inventory', type: 'revenue', amount: '$48,000' },
  { item: 'Fixed Assets (Net)', type: 'revenue', amount: '$10,25,325' },
  { item: 'Total Assets', type: 'total', amount: '$14,88,325' },
  { item: 'Accounts Payable', type: 'expense', amount: '$72,000' },
  { item: 'Short-term Loans', type: 'expense', amount: '$1,50,000' },
  { item: 'Long-term Debt', type: 'expense', amount: '$3,00,000' },
  { item: 'Total Liabilities', type: 'total', amount: '$5,22,000' },
  { item: "Shareholders' Equity", type: 'subtotal', amount: '$8,50,000' },
  { item: 'Retained Earnings', type: 'revenue', amount: '$1,16,325' },
  { item: 'Total Equity', type: 'profit', amount: '$9,66,325' },
];

const cashFlowData = [
  { item: 'Net Income', type: 'revenue', amount: '$58,400' },
  { item: 'Depreciation Add-back', type: 'revenue', amount: '$42,250' },
  { item: 'Changes in Working Capital', type: 'expense', amount: '-$12,000' },
  { item: 'Operating Cash Flow', type: 'total', amount: '$88,650' },
  { item: 'Purchase of Fixed Assets', type: 'expense', amount: '-$45,000' },
  { item: 'Investing Cash Flow', type: 'subtotal', amount: '-$45,000' },
  { item: 'Loan Repayment', type: 'expense', amount: '-$20,000' },
  { item: 'Dividends Paid', type: 'expense', amount: '-$15,000' },
  { item: 'Financing Cash Flow', type: 'subtotal', amount: '-$35,000' },
  { item: 'Net Cash Flow', type: 'profit', amount: '$8,650' },
];

const arAgingData = [
  { item: '0–30 Days', type: 'revenue', amount: '$42,000' },
  { item: '31–60 Days', type: 'revenue', amount: '$28,500' },
  { item: '61–90 Days', type: 'expense', amount: '$15,200' },
  { item: '91–120 Days', type: 'expense', amount: '$7,800' },
  { item: 'Over 120 Days', type: 'expense', amount: '$4,500' },
  { item: 'Total Outstanding', type: 'profit', amount: '$98,000' },
];

const apReportData = [
  { item: 'Vendor - Tech Supplies Co', type: 'expense', amount: '$18,400' },
  { item: 'Vendor - Office Essentials', type: 'expense', amount: '$9,200' },
  { item: 'Vendor - Cloud Services Ltd', type: 'expense', amount: '$14,800' },
  { item: 'Vendor - Marketing Agency', type: 'expense', amount: '$12,000' },
  { item: 'Total Payable (Current)', type: 'total', amount: '$54,400' },
  { item: 'Overdue (> 30 days)', type: 'expense', amount: '$17,600' },
  { item: 'Total Accounts Payable', type: 'profit', amount: '$72,000' },
];

const budgetData = [
  { item: 'Engineering', type: 'revenue', amount: '$40,000 / $42,000' },
  { item: 'Marketing', type: 'expense', amount: '$12,000 / $10,000' },
  { item: 'Operations', type: 'revenue', amount: '$18,200 / $20,000' },
  { item: 'HR & Admin', type: 'revenue', amount: '$9,400 / $10,000' },
  { item: 'Technology', type: 'expense', amount: '$9,400 / $8,000' },
  { item: 'Total Spend', type: 'total', amount: '$89,000 / $90,000' },
  { item: 'Budget Utilization', type: 'profit', amount: '98.9%' },
];

const reportDataMap: Record<string, typeof plData> = {
  'Profit & Loss Statement': plData,
  'Balance Sheet': balanceSheetData,
  'Cash Flow Statement': cashFlowData,
  'Accounts Receivable Aging': arAgingData,
  'Accounts Payable Report': apReportData,
  'Budget vs Actual': budgetData,
};

const reports = [
  { name: 'Profit & Loss Statement', desc: 'Income, expenses, net profit', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50', period: 'Mar 2026' },
  { name: 'Balance Sheet', desc: 'Assets, liabilities, equity', icon: DollarSign, color: 'text-blue-600', bg: 'bg-blue-50', period: 'Mar 2026' },
  { name: 'Cash Flow Statement', desc: 'Operating, investing, financing', icon: PieChart, color: 'text-violet-600', bg: 'bg-violet-50', period: 'Q4 FY26' },
  { name: 'Accounts Receivable Aging', desc: 'Outstanding invoices by age', icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50', period: 'Mar 2026' },
  { name: 'Accounts Payable Report', desc: 'Vendor payments due', icon: FileText, color: 'text-rose-600', bg: 'bg-rose-50', period: 'Mar 2026' },
  { name: 'Budget vs Actual', desc: 'Department spend analysis', icon: BarChart2, color: 'text-indigo-600', bg: 'bg-indigo-50', period: 'FY 2025-26' },
];

// ─── PDF Export ───────────────────────────────────────────────────────────────
function exportReportPDF(
  reportName: string,
  period: string,
  data: typeof plData,
  onToast: (msg: string) => void
) {
  const win = window as any;
  if (!win.jspdf?.jsPDF) {
    onToast('PDF library loading, please try again in a moment.');
    return;
  }
  const { jsPDF } = win.jspdf;
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  // Header
  doc.setFillColor(30, 41, 59);
  doc.rect(0, 0, pageWidth, 28, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(15);
  doc.setFont('helvetica', 'bold');
  doc.text(reportName, 14, 14);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184);
  doc.text(`Period: ${period}   |   Generated: ${today}`, 14, 22);

  // Sub-header
  doc.setFillColor(248, 250, 252);
  doc.rect(0, 28, pageWidth, 9, 'F');
  doc.setTextColor(100, 116, 139);
  doc.setFontSize(7.5);
  doc.text('CognexiaAI Finance & Accounting \u2014 Financial Reports', 14, 34);
  doc.text('CONFIDENTIAL', pageWidth - 14, 34, { align: 'right' });

  // Table header
  const tableY = 44;
  const colWidths = [130, 46];
  const colX = [14, 14 + colWidths[0]];
  const totalW = colWidths[0] + colWidths[1];

  doc.setFillColor(51, 65, 85);
  doc.rect(14, tableY, totalW, 9, 'F');
  doc.setTextColor(226, 232, 240);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.text('Line Item', colX[0] + 3, tableY + 6);
  doc.text('Amount', colX[1] + colWidths[1] - 3, tableY + 6, { align: 'right' });

  let rowY = tableY + 9;
  const rowH = 9;

  data.forEach((row, idx) => {
    const isHighlight = row.type === 'total' || row.type === 'subtotal' || row.type === 'profit';
    if (isHighlight) {
      doc.setFillColor(row.type === 'profit' ? 236 : 241, row.type === 'profit' ? 253 : 245, row.type === 'profit' ? 245 : 249);
    } else {
      doc.setFillColor(idx % 2 === 0 ? 255 : 248, idx % 2 === 0 ? 255 : 250, idx % 2 === 0 ? 255 : 252);
    }
    doc.rect(14, rowY, totalW, rowH, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.25);
    doc.line(14, rowY + rowH, 14 + totalW, rowY + rowH);

    // Label
    doc.setFontSize(8.5);
    if (isHighlight) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(row.type === 'profit' ? 5 : 30, row.type === 'profit' ? 150 : 41, row.type === 'profit' ? 105 : 59);
    } else {
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(71, 85, 105);
    }
    doc.text(row.item, colX[0] + 3, rowY + 6);

    // Amount
    if (row.type === 'expense' || (row.amount && row.amount.startsWith('-'))) {
      doc.setTextColor(220, 38, 38);
    } else if (row.type === 'profit') {
      doc.setTextColor(5, 150, 105);
    } else if (isHighlight) {
      doc.setTextColor(30, 41, 59);
    } else {
      doc.setTextColor(5, 150, 105);
    }
    doc.text(row.amount, colX[1] + colWidths[1] - 3, rowY + 6, { align: 'right' });

    rowY += rowH;
  });

  // Outer border
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.5);
  doc.rect(14, tableY, totalW, rowY - tableY);

  // Footer
  const pageHeight = doc.internal.pageSize.getHeight();
  doc.setFillColor(30, 41, 59);
  doc.rect(0, pageHeight - 10, pageWidth, 10, 'F');
  doc.setTextColor(148, 163, 184);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.text('Generated by CognexiaAI Financial Reporting System', 14, pageHeight - 3.5);
  doc.text('Page 1 of 1', pageWidth - 14, pageHeight - 3.5, { align: 'right' });

  doc.save(`${reportName.replace(/\s+/g, '-').toLowerCase()}-${period.replace(/\s+/g, '-')}.pdf`);
  onToast(`${reportName} downloaded as PDF!`);
}

// ─── View Report Modal (white theme) ─────────────────────────────────────────
function ViewReportModal({
  report,
  onClose,
  onDownload,
}: {
  report: typeof reports[0];
  onClose: () => void;
  onDownload: () => void;
}) {
  const data = reportDataMap[report.name] ?? plData;

  const rowStyle = (type: string) => {
    switch (type) {
      case 'total':    return 'bg-gray-100 font-semibold';
      case 'subtotal': return 'bg-gray-50 font-semibold';
      case 'profit':   return 'bg-emerald-50';
      default:         return 'hover:bg-gray-50';
    }
  };
  const amtStyle = (type: string, amount: string) => {
    if (type === 'profit') return 'text-emerald-600 font-bold';
    if (type === 'expense' || amount.startsWith('-')) return 'text-rose-500';
    if (type === 'total' || type === 'subtotal') return 'text-gray-800 font-semibold';
    return 'text-emerald-600';
  };
  const labelStyle = (type: string) => {
    if (type === 'profit') return 'text-emerald-700 font-bold';
    if (type === 'total' || type === 'subtotal') return 'text-gray-800 font-semibold';
    return 'text-gray-600';
  };

  // Summary stats
  const totalRow = data.find(d => d.type === 'profit') ?? data[data.length - 1];
  const revenueRow = data.find(d => d.type === 'total');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 bg-white border border-gray-200 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden mx-4 flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 flex-shrink-0 bg-white rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${report.bg} flex-shrink-0`}>
              <report.icon className={`w-4 h-4 ${report.color}`} />
            </div>
            <div>
              <h2 className="text-gray-800 font-semibold text-base">{report.name}</h2>
              <p className="text-gray-400 text-xs mt-0.5">Period: {report.period} &nbsp;·&nbsp; {report.desc}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-xs hover:bg-gray-200 transition-colors border border-gray-200"
            >
              <Download className="w-3.5 h-3.5" /> Export PDF
            </button>
            <button onClick={onClose} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="px-6 py-4 grid grid-cols-2 gap-3 flex-shrink-0 border-b border-gray-200 bg-gray-50">
          <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm">
            <div className="text-gray-400 text-xs mb-1">{revenueRow?.item ?? 'Key Metric'}</div>
            <div className="text-gray-800 font-bold text-lg">{revenueRow?.amount ?? '—'}</div>
            <div className="flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-emerald-600 text-xs">+8.4% vs last period</span>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm">
            <div className="text-gray-400 text-xs mb-1">{totalRow?.item ?? 'Net Result'}</div>
            <div className="text-emerald-600 font-bold text-lg">{totalRow?.amount ?? '—'}</div>
            <div className="flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-emerald-600 text-xs">+12.1% vs last period</span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-y-auto flex-1 bg-white">
          <table className="w-full">
            <thead className="sticky top-0">
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left text-gray-500 text-xs font-medium px-5 py-3">Line Item</th>
                <th className="text-right text-gray-500 text-xs font-medium px-5 py-3">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.map((r, i) => (
                <tr key={i} className={`transition-colors ${rowStyle(r.type)}`}>
                  <td className={`px-5 py-3 text-sm ${labelStyle(r.type)}`}>{r.item}</td>
                  <td className={`px-5 py-3 text-sm text-right ${amtStyle(r.type, r.amount)}`}>{r.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-gray-200 flex-shrink-0 bg-gray-50 rounded-b-2xl">
          <p className="text-gray-400 text-xs text-center">
            CognexiaAI Financial Reporting &nbsp;·&nbsp; Generated {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ReportsPage() {
  const [toast, setToast] = useState('');
  const [viewReport, setViewReport] = useState<typeof reports[0] | null>(null);

  useJsPDF();

  const handleDownload = (reportName: string, period: string) => {
    const data = reportDataMap[reportName] ?? plData;
    exportReportPDF(reportName, period, data, setToast);
  };

  return (
    <div className="p-6 space-y-6">
      {toast && <Toast message={toast} onDone={() => setToast('')} />}

      {viewReport && (
        <ViewReportModal
          report={viewReport}
          onClose={() => setViewReport(null)}
          onDownload={() => handleDownload(viewReport.name, viewReport.period)}
        />
      )}

      <div>
        <h1 className="text-2xl font-bold text-white-800">Financial Reports</h1>
        <p className="text-gray-500 text-sm mt-1">Generate and download financial reports</p>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {reports.map(r => (
          <div key={r.name} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className={`p-3 rounded-xl ${r.bg} flex-shrink-0`}>
                <r.icon className={`w-5 h-5 ${r.color}`} />
              </div>
              <div className="flex-1">
                <div className="text-gray-800 font-semibold text-sm">{r.name}</div>
                <div className="text-gray-400 text-xs mt-0.5">{r.desc}</div>
                <div className="text-gray-400 text-xs mt-1">Period: {r.period}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleDownload(r.name, r.period)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-xs hover:bg-gray-50 transition-colors"
              >
                <Download className="w-3.5 h-3.5" /> Download
              </button>
              <button
                onClick={() => setViewReport(r)}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-600 text-white rounded-lg text-xs hover:bg-blue-700 transition-colors"
              >
                View Report
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* P&L Summary Table */}
      <div className="bg-gray-900 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
          <h2 className="text-white font-semibold text-sm">Profit & Loss — March 2026</h2>
          <button
            onClick={() => handleDownload('Profit & Loss Statement', 'Mar 2026')}
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 text-gray-300 rounded-lg text-xs hover:bg-gray-600 transition-colors"
          >
            <Download className="w-3.5 h-3.5" /> Export PDF
          </button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-800 border-b border-gray-700">
              <th className="text-left text-gray-400 text-xs font-medium px-4 py-3">Line Item</th>
              <th className="text-right text-gray-400 text-xs font-medium px-4 py-3">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {plData.map((r, i) => (
              <tr key={i} className={`${r.type === 'total' || r.type === 'subtotal' ? 'bg-gray-800/60' : 'hover:bg-gray-800/40'}`}>
                <td className={`px-4 py-3 text-sm ${r.type === 'profit' ? 'text-emerald-400 font-bold' : r.type === 'total' || r.type === 'subtotal' ? 'text-white font-semibold' : 'text-gray-300'}`}>
                  {r.item}
                </td>
                <td className={`px-4 py-3 text-sm text-right ${r.type === 'profit' ? 'text-emerald-400 font-bold' : r.type === 'expense' ? 'text-rose-400' : r.type === 'total' || r.type === 'subtotal' ? 'text-white font-semibold' : 'text-emerald-400'}`}>
                  {r.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}