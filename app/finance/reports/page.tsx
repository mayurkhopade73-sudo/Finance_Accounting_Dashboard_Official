'use client';
import { useState } from 'react';
import { Download, FileText, TrendingUp, DollarSign, PieChart, BarChart2 } from 'lucide-react';
import { Toast } from '../../components/Modal';

const reports = [
  { name: 'Profit & Loss Statement', desc: 'Income, expenses, net profit', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50', period: 'Mar 2026' },
  { name: 'Balance Sheet', desc: 'Assets, liabilities, equity', icon: DollarSign, color: 'text-blue-600', bg: 'bg-blue-50', period: 'Mar 2026' },
  { name: 'Cash Flow Statement', desc: 'Operating, investing, financing', icon: PieChart, color: 'text-violet-600', bg: 'bg-violet-50', period: 'Q4 FY26' },
  { name: 'Accounts Receivable Aging', desc: 'Outstanding invoices by age', icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50', period: 'Mar 2026' },
  { name: 'Accounts Payable Report', desc: 'Vendor payments due', icon: FileText, color: 'text-rose-600', bg: 'bg-rose-50', period: 'Mar 2026' },
  { name: 'Budget vs Actual', desc: 'Department spend analysis', icon: BarChart2, color: 'text-indigo-600', bg: 'bg-indigo-50', period: 'FY 2025-26' },
];

const plData = [
  { item: 'Revenue - Products', type: 'revenue', amount: '$1,25,000' },
  { item: 'Revenue - Services', amount: '$80,000', type: 'revenue' },
  { item: 'Total Revenue', amount: '$2,05,000', type: 'total' },
  { item: 'Cost of Goods Sold', amount: '$62,000', type: 'expense' },
  { item: 'Gross Profit', amount: '$1,43,000', type: 'subtotal' },
  { item: 'Salaries & Benefits', amount: '$55,000', type: 'expense' },
  { item: 'Rent & Utilities', amount: '$8,200', type: 'expense' },
  { item: 'Marketing', amount: '$12,000', type: 'expense' },
  { item: 'Technology', amount: '$9,400', type: 'expense' },
  { item: 'Total Expenses', amount: '$84,600', type: 'total' },
  { item: 'Net Profit', amount: '$58,400', type: 'profit' },
];

export default function ReportsPage() {
  const [toast, setToast] = useState('');

  const handleDownload = (name: string) => {
    const csv = `Report: ${name}\nGenerated: ${new Date().toLocaleDateString()}\n\n${plData.map(r=>`${r.item},${r.amount}`).join('\n')}`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `${name.replace(/\s+/g,'-').toLowerCase()}.csv`; a.click();
    setToast(`${name} downloaded!`);
  };

  return (
    <div className="p-6 space-y-6">
      {toast && <Toast message={toast} onDone={() => setToast('')} />}
      <div><h1 className="text-2xl font-bold text-white-800">Financial Reports</h1><p className="text-gray-500 text-sm mt-1">Generate and download financial reports</p></div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {reports.map(r => (
          <div key={r.name} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className={`p-3 rounded-xl ${r.bg} flex-shrink-0`}><r.icon className={`w-5 h-5 ${r.color}`} /></div>
              <div className="flex-1">
                <div className="text-gray-800 font-semibold text-sm">{r.name}</div>
                <div className="text-gray-400 text-xs mt-0.5">{r.desc}</div>
                <div className="text-gray-400 text-xs mt-1">Period: {r.period}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleDownload(r.name)} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-xs hover:bg-gray-50"><Download className="w-3.5 h-3.5" /> Download</button>
              <button onClick={() => setToast(`Viewing ${r.name}...`)} className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-xs hover:bg-blue-700">View Report</button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-900 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
          <h2 className="text-white font-semibold text-sm">Profit & Loss — March 2026</h2>
          <button onClick={() => handleDownload('P&L Statement')} className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 text-gray-300 rounded-lg text-xs hover:bg-gray-600"><Download className="w-3.5 h-3.5" /> Export</button>
        </div>
        <table className="w-full">
          <thead><tr className="bg-gray-800 border-b border-gray-700"><th className="text-left text-gray-400 text-xs font-medium px-4 py-3">Line Item</th><th className="text-right text-gray-400 text-xs font-medium px-4 py-3">Amount</th></tr></thead>
          <tbody className="divide-y divide-gray-800">
            {plData.map((r, i) => (
              <tr key={i} className={`${r.type === 'total' || r.type === 'subtotal' ? 'bg-gray-800/60' : 'hover:bg-gray-800/40'}`}>
                <td className={`px-4 py-3 text-sm ${r.type === 'profit' ? 'text-emerald-400 font-bold' : r.type === 'total' || r.type === 'subtotal' ? 'text-white font-semibold' : 'text-gray-300'}`}>{r.item}</td>
                <td className={`px-4 py-3 text-sm text-right ${r.type === 'profit' ? 'text-emerald-400 font-bold' : r.type === 'expense' ? 'text-rose-400' : r.type === 'total' || r.type === 'subtotal' ? 'text-white font-semibold' : 'text-emerald-400'}`}>{r.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
