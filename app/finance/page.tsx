// 'use client';

// import {
//   DollarSign, TrendingUp, TrendingDown, CreditCard, FileText,
//   ArrowUpRight, ArrowDownRight, BarChart2, PieChart, Receipt,
//   Building2, Wallet, AlertCircle, CheckCircle2, Clock, Filter,
//   Download, Plus, RefreshCw
// } from 'lucide-react';

// import Link from 'next/link';

// const stats = [
//   { label: 'Total Revenue', value: '$2,45,800', change: '+12.5%', up: true, icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-50' },
//   { label: 'Total Expenses', value: '$98,240', change: '+4.2%', up: false, icon: CreditCard, color: 'text-rose-500', bg: 'bg-rose-50' },
//   { label: 'Net Profit', value: '$1,47,560', change: '+18.3%', up: true, icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-50' },
//   { label: 'Pending Invoices', value: '$34,200', change: '12 invoices', up: null, icon: FileText, color: 'text-amber-500', bg: 'bg-amber-50' },
// ];

// const recentTransactions = [
//   { id: 'TXN-001', name: 'Vendor Payment - SupplierCo', type: 'Expense', amount: '-$4,500', date: 'Mar 11, 2026', status: 'Completed', category: 'Procurement' },
//   { id: 'TXN-002', name: 'Client Invoice #INV-2045', type: 'Revenue', amount: '+$12,000', date: 'Mar 10, 2026', status: 'Completed', category: 'Sales' },
//   { id: 'TXN-003', name: 'Office Rent - March', type: 'Expense', amount: '-$3,200', date: 'Mar 10, 2026', status: 'Completed', category: 'Operations' },
//   { id: 'TXN-004', name: 'Client Invoice #INV-2044', type: 'Revenue', amount: '+$8,750', date: 'Mar 09, 2026', status: 'Pending', category: 'Sales' },
//   { id: 'TXN-005', name: 'Software Subscriptions', type: 'Expense', amount: '-$1,200', date: 'Mar 09, 2026', status: 'Completed', category: 'Technology' },
//   { id: 'TXN-006', name: 'Payroll - March Week 1', type: 'Expense', amount: '-$28,500', date: 'Mar 07, 2026', status: 'Completed', category: 'HR' },
// ];

// const quickLinks = [
//   { label: 'General Ledger', href: '/finance/general-ledger', icon: Building2, color: 'text-violet-600', bg: 'bg-violet-50' },
//   { label: 'Accounts Payable', href: '/finance/accounts-payable', icon: TrendingDown, color: 'text-rose-600', bg: 'bg-rose-50' },
//   { label: 'Accounts Receivable', href: '/finance/accounts-receivable', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
//   { label: 'Invoices', href: '/finance/invoices', icon: Receipt, color: 'text-blue-600', bg: 'bg-blue-50' },
//   { label: 'Expenses', href: '/finance/expenses', icon: Wallet, color: 'text-amber-600', bg: 'bg-amber-50' },
//   { label: 'Budgets', href: '/finance/budgets', icon: BarChart2, color: 'text-cyan-600', bg: 'bg-cyan-50' },
//   { label: 'Tax Management', href: '/finance/tax', icon: FileText, color: 'text-orange-600', bg: 'bg-orange-50' },
//   { label: 'Reports', href: '/finance/reports', icon: PieChart, color: 'text-pink-600', bg: 'bg-pink-50' },
// ];

// const budgetData = [
//   { category: 'Operations', budget: 50000, spent: 38000, pct: 76 },
//   { category: 'Marketing', budget: 30000, spent: 21000, pct: 70 },
//   { category: 'Technology', budget: 20000, spent: 18500, pct: 92 },
//   { category: 'HR & Payroll', budget: 80000, spent: 56000, pct: 70 },
// ];

// function StatusBadge({ status }: { status: string }) {
//   const map: Record<string, string> = {
//     Completed: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
//     Pending: 'bg-amber-50 text-amber-700 border border-amber-200',
//     Failed: 'bg-red-50 text-red-700 border border-red-200',
//   };

//   return (
//     <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${map[status]}`}>
//       {status}
//     </span>
//   );
// }

// export default function FinanceDashboardPage() {

//   return (
//     <div className="p-6 space-y-6">

//       {/* Header */}

//       <div className="flex items-start justify-between flex-wrap gap-3">

//         <div>
//           <h1 className="text-2xl font-bold text-white-800">
//             Welcome back, Finance & Accounting
//           </h1>
//           <p className="text-gray-500 text-sm mt-1">
//             Enterprise financial overview — March 2026
//           </p>
//         </div>

//         <div className="flex items-center gap-2 flex-wrap">

//           <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-200 text-gray-600 text-sm hover:bg-gray-50">
//             <Filter className="w-4 h-4" /> Filter
//           </button>

//           <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-200 text-gray-600 text-sm hover:bg-gray-50">
//             <Download className="w-4 h-4" /> Export
//           </button>

//           <Link href="/finance/invoices/new">
//             <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">
//               <Plus className="w-4 h-4" /> New Invoice
//             </button>
//           </Link>

//         </div>

//       </div>

//       {/* KPI Cards */}

//       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

//         {stats.map((s) => (

//           <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md">

//             <div className="flex items-center justify-between mb-4">

//               <span className="text-gray-500 text-sm">
//                 {s.label}
//               </span>

//               <div className={`p-2 rounded-lg ${s.bg}`}>
//                 <s.icon className={`w-4 h-4 ${s.color}`} />
//               </div>

//             </div>

//             <div className="text-2xl font-bold text-gray-900 mb-1">
//               {s.value}
//             </div>

//             <div className="flex items-center gap-1">

//               {s.up === true && <ArrowUpRight className="w-3 h-3 text-emerald-500" />}
//               {s.up === false && <ArrowDownRight className="w-3 h-3 text-rose-500" />}
//               {s.up === null && <Clock className="w-3 h-3 text-amber-500" />}

//               <span className={`text-xs ${s.up === true ? 'text-emerald-500'
//                   : s.up === false ? 'text-rose-500'
//                     : 'text-amber-500'
//                 }`}>
//                 {s.change}
//               </span>

//               {s.up !== null &&
//                 <span className="text-gray-400 text-xs">
//                   vs last month
//                 </span>
//               }

//             </div>

//           </div>

//         ))}

//       </div>

//       {/* Quick Access */}

//       <div>

//         <h2 className="text-gray-800 font-semibold mb-3">
//           Quick Access
//         </h2>

//         <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-3">

//           {quickLinks.map((q) => (

//             <Link key={q.label} href={q.href}>

//               <div className="bg-white border border-gray-200 rounded-xl h-[110px] flex flex-col justify-center items-center hover:shadow-md hover:border-gray-300 transition group">

//                 <div className={`w-10 h-10 rounded-lg ${q.bg} flex items-center justify-center mb-2`}>
//                   <q.icon className={`w-5 h-5 ${q.color}`} />
//                 </div>

//                 <div className="text-gray-700 text-xs font-medium text-center">
//                   {q.label}
//                 </div>

//               </div>

//             </Link>

//           ))}

//         </div>

//       </div>

//       {/* Main Content */}

//       <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

//         {/* Recent Transactions */}

//         <div className="xl:col-span-2 bg-white border border-gray-200 rounded-xl shadow-sm">

//           <div className="flex items-center justify-between p-5 border-b">

//             <div>
//               <h2 className="text-gray-800 font-semibold">
//                 Recent Transactions
//               </h2>
//               <p className="text-gray-400 text-xs">
//                 Latest financial activity
//               </p>
//             </div>

//             <button className="flex items-center gap-1 text-blue-600 text-sm">
//               <RefreshCw className="w-3 h-3" /> Refresh
//             </button>

//           </div>

//           <div>

//             {recentTransactions.map((tx) => (

//               <div key={tx.id} className="px-5 py-4 border-b border-gray-100">

//                 <div className="flex items-start gap-3">

//                   <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${tx.type === 'Revenue'
//                       ? 'bg-emerald-50'
//                       : 'bg-rose-50'
//                     }`}>

//                     {tx.type === 'Revenue'
//                       ? <ArrowUpRight className="w-4 h-4 text-emerald-500" />
//                       : <ArrowDownRight className="w-4 h-4 text-rose-500" />
//                     }

//                   </div>

//                   <div className="flex-1">

//                     <div className="text-gray-800 text-sm font-medium">
//                       {tx.name}
//                     </div>

//                     <div className="text-gray-400 text-xs mt-1">
//                       {tx.id} · {tx.date} · {tx.category}
//                     </div>

//                     <div className="flex items-center justify-between mt-2">

//                       <StatusBadge status={tx.status} />

//                       <span className={`text-sm font-semibold ${tx.type === 'Revenue'
//                           ? 'text-emerald-600'
//                           : 'text-rose-600'
//                         }`}>
//                         {tx.amount}
//                       </span>

//                     </div>

//                   </div>

//                 </div>

//               </div>

//             ))}

//           </div>

//         </div>

//         {/* Budget + Alerts */}

//         <div className="flex flex-col gap-4">

//           <div className="bg-white border border-gray-200 rounded-xl p-5">

//             <h2 className="text-gray-800 font-semibold mb-4">
//               Budget Overview
//             </h2>

//             <div className="space-y-4">

//               {budgetData.map((b) => (

//                 <div key={b.category}>

//                   <div className="flex justify-between text-xs mb-1">
//                     <span>{b.category}</span>
//                     <span>${b.spent} / ${b.budget}</span>
//                   </div>

//                   <div className="h-1.5 bg-gray-100 rounded-full">

//                     <div
//                       className={`h-full rounded-full ${b.pct >= 90
//                           ? 'bg-rose-500'
//                           : b.pct >= 75
//                             ? 'bg-amber-500'
//                             : 'bg-blue-500'
//                         }`}
//                       style={{ width: `${b.pct}%` }}
//                     />

//                   </div>

//                 </div>

//               ))}

//             </div>

//           </div>

//           <div className="bg-white border border-gray-200 rounded-xl p-5">

//             <h2 className="text-gray-800 font-semibold mb-4">
//               Finance Alerts
//             </h2>

//             <div className="space-y-3">

//               <div className="flex gap-3 p-3 rounded-lg bg-red-50 border">

//                 <AlertCircle className="w-4 h-4 text-rose-500" />

//                 <div>
//                   <div className="text-red-700 text-xs font-medium">
//                     Technology budget at 92%
//                   </div>
//                   <div className="text-gray-500 text-xs">
//                     $1,500 remaining this month
//                   </div>
//                 </div>

//               </div>

//               <div className="flex gap-3 p-3 rounded-lg bg-amber-50 border">

//                 <Clock className="w-4 h-4 text-amber-500" />

//                 <div>
//                   <div className="text-amber-700 text-xs font-medium">
//                     4 invoices overdue
//                   </div>
//                   <div className="text-gray-500 text-xs">
//                     Total: $18,400 pending
//                   </div>
//                 </div>

//               </div>

//               <div className="flex gap-3 p-3 rounded-lg bg-emerald-50 border">

//                 <CheckCircle2 className="w-4 h-4 text-emerald-500" />

//                 <div>
//                   <div className="text-emerald-700 text-xs font-medium">
//                     Tax filing complete
//                   </div>
//                   <div className="text-gray-500 text-xs">
//                     Q1 2026 submitted successfully
//                   </div>
//                 </div>

//               </div>

//             </div>

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// }

// ai 
'use client';

import { useState, useRef, useEffect } from 'react';
import {
  DollarSign, TrendingUp, TrendingDown, CreditCard, FileText,
  ArrowUpRight, ArrowDownRight, BarChart2, PieChart, Receipt,
  Building2, Wallet, AlertCircle, CheckCircle2, Clock, Filter,
  Download, Plus, RefreshCw, X, ChevronDown
} from 'lucide-react';

import Link from 'next/link';

const stats = [
  { label: 'Total Revenue', value: '$2,45,800', change: '+12.5%', up: true, icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { label: 'Total Expenses', value: '$98,240', change: '+4.2%', up: false, icon: CreditCard, color: 'text-rose-500', bg: 'bg-rose-50' },
  { label: 'Net Profit', value: '$1,47,560', change: '+18.3%', up: true, icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-50' },
  { label: 'Pending Invoices', value: '$34,200', change: '12 invoices', up: null, icon: FileText, color: 'text-amber-500', bg: 'bg-amber-50' },
];

const allTransactions = [
  { id: 'TXN-001', name: 'Vendor Payment - SupplierCo', type: 'Expense', amount: '-$4,500', date: 'Mar 11, 2026', status: 'Completed', category: 'Procurement' },
  { id: 'TXN-002', name: 'Client Invoice #INV-2045', type: 'Revenue', amount: '+$12,000', date: 'Mar 10, 2026', status: 'Completed', category: 'Sales' },
  { id: 'TXN-003', name: 'Office Rent - March', type: 'Expense', amount: '-$3,200', date: 'Mar 10, 2026', status: 'Completed', category: 'Operations' },
  { id: 'TXN-004', name: 'Client Invoice #INV-2044', type: 'Revenue', amount: '+$8,750', date: 'Mar 09, 2026', status: 'Pending', category: 'Sales' },
  { id: 'TXN-005', name: 'Software Subscriptions', type: 'Expense', amount: '-$1,200', date: 'Mar 09, 2026', status: 'Completed', category: 'Technology' },
  { id: 'TXN-006', name: 'Payroll - March Week 1', type: 'Expense', amount: '-$28,500', date: 'Mar 07, 2026', status: 'Completed', category: 'HR' },
];

const quickLinks = [
  { label: 'General Ledger', href: '/finance/general-ledger', icon: Building2, color: 'text-violet-600', bg: 'bg-violet-50' },
  { label: 'Accounts Payable', href: '/finance/accounts-payable', icon: TrendingDown, color: 'text-rose-600', bg: 'bg-rose-50' },
  { label: 'Accounts Receivable', href: '/finance/accounts-receivable', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Invoices', href: '/finance/invoices', icon: Receipt, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Expenses', href: '/finance/expenses', icon: Wallet, color: 'text-amber-600', bg: 'bg-amber-50' },
  { label: 'Budgets', href: '/finance/budgets', icon: BarChart2, color: 'text-cyan-600', bg: 'bg-cyan-50' },
  { label: 'Tax Management', href: '/finance/tax', icon: FileText, color: 'text-orange-600', bg: 'bg-orange-50' },
  { label: 'Reports', href: '/finance/reports', icon: PieChart, color: 'text-pink-600', bg: 'bg-pink-50' },
];

const budgetData = [
  { category: 'Operations', budget: 50000, spent: 38000, pct: 76 },
  { category: 'Marketing', budget: 30000, spent: 21000, pct: 70 },
  { category: 'Technology', budget: 20000, spent: 18500, pct: 92 },
  { category: 'HR & Payroll', budget: 80000, spent: 56000, pct: 70 },
];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Completed: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    Pending: 'bg-amber-50 text-amber-700 border border-amber-200',
    Failed: 'bg-red-50 text-red-700 border border-red-200',
  };

  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${map[status]}`}>
      {status}
    </span>
  );
}

// ─── Filter Dropdown ─────────────────────────────────────────────────────────

type FilterState = {
  type: string;
  status: string;
  category: string;
  dateFrom: string;
  dateTo: string;
};

const defaultFilters: FilterState = {
  type: 'All',
  status: 'All',
  category: 'All',
  dateFrom: '',
  dateTo: '',
};

function FilterDropdown({
  filters,
  onChange,
  onApply,
  onReset,
  onClose,
}: {
  filters: FilterState;
  onChange: (f: FilterState) => void;
  onApply: () => void;
  onReset: () => void;
  onClose: () => void;
}) {
  const categories = ['All', 'Procurement', 'Sales', 'Operations', 'Technology', 'HR'];

  return (
    <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-gray-800 font-semibold text-sm">Filter Transactions</span>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Type */}
      <div className="mb-3">
        <label className="text-gray-500 text-xs mb-1 block">Type</label>
        <div className="flex gap-2">
          {['All', 'Revenue', 'Expense'].map((t) => (
            <button
              key={t}
              onClick={() => onChange({ ...filters, type: t })}
              className={`flex-1 py-1.5 rounded-lg text-xs font-medium border transition ${
                filters.type === t
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="mb-3">
        <label className="text-gray-500 text-xs mb-1 block">Status</label>
        <div className="flex gap-2">
          {['All', 'Completed', 'Pending'].map((s) => (
            <button
              key={s}
              onClick={() => onChange({ ...filters, status: s })}
              className={`flex-1 py-1.5 rounded-lg text-xs font-medium border transition ${
                filters.status === s
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Category */}
      <div className="mb-3">
        <label className="text-gray-500 text-xs mb-1 block">Category</label>
        <div className="relative">
          <select
            value={filters.category}
            onChange={(e) => onChange({ ...filters, category: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-700 appearance-none pr-8 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <ChevronDown className="w-3 h-3 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Date Range */}
      <div className="mb-4 grid grid-cols-2 gap-2">
        <div>
          <label className="text-gray-500 text-xs mb-1 block">Date From</label>
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => onChange({ ...filters, dateFrom: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="text-gray-500 text-xs mb-1 block">Date To</label>
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => onChange({ ...filters, dateTo: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onReset}
          className="flex-1 py-1.5 rounded-lg text-xs font-medium border border-gray-200 text-gray-600 hover:bg-gray-50"
        >
          Reset
        </button>
        <button
          onClick={onApply}
          className="flex-1 py-1.5 rounded-lg text-xs font-medium bg-blue-600 text-white hover:bg-blue-700"
        >
          Apply
        </button>
      </div>
    </div>
  );
}

// ─── Export Dropdown ──────────────────────────────────────────────────────────

function ExportDropdown({
  transactions,
  onClose,
}: {
  transactions: typeof allTransactions;
  onClose: () => void;
}) {
  const exportCSV = () => {
    const headers = ['ID', 'Name', 'Type', 'Amount', 'Date', 'Status', 'Category'];
    const rows = transactions.map((t) => [
      t.id, t.name, t.type, t.amount, t.date, t.status, t.category,
    ]);
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
    downloadFile(csv, 'transactions.csv', 'text/csv');
    onClose();
  };

  const exportJSON = () => {
    const json = JSON.stringify(transactions, null, 2);
    downloadFile(json, 'transactions.json', 'application/json');
    onClose();
  };

  const exportPrint = () => {
    const html = `
      <html><head><title>Finance Report</title>
      <style>body{font-family:sans-serif;padding:24px}table{width:100%;border-collapse:collapse}
      th,td{border:1px solid #ddd;padding:8px;text-align:left;font-size:13px}
      th{background:#f5f5f5;font-weight:600}h2{margin-bottom:16px}</style></head>
      <body><h2>Finance Dashboard — March 2026</h2>
      <table><tr>${['ID','Name','Type','Amount','Date','Status','Category'].map(h=>`<th>${h}</th>`).join('')}</tr>
      ${transactions.map(t=>`<tr><td>${t.id}</td><td>${t.name}</td><td>${t.type}</td><td>${t.amount}</td><td>${t.date}</td><td>${t.status}</td><td>${t.category}</td></tr>`).join('')}
      </table></body></html>
    `;
    const w = window.open('', '_blank');
    if (w) { w.document.write(html); w.document.close(); w.print(); }
    onClose();
  };

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="absolute right-0 top-full mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-50 py-1">
      <div className="px-3 py-2 border-b border-gray-100">
        <span className="text-gray-500 text-xs font-medium">Export As</span>
      </div>
      {[
        { label: 'Export CSV', action: exportCSV },
        { label: 'Export JSON', action: exportJSON },
        { label: 'Print / PDF', action: exportPrint },
      ].map((opt) => (
        <button
          key={opt.label}
          onClick={opt.action}
          className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function FinanceDashboardPage() {
  const [showFilter, setShowFilter] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [pendingFilters, setPendingFilters] = useState<FilterState>(defaultFilters);
  const [appliedFilters, setAppliedFilters] = useState<FilterState>(defaultFilters);
  const [activeFilterCount, setActiveFilterCount] = useState(0);

  const filterRef = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) setShowFilter(false);
      if (exportRef.current && !exportRef.current.contains(e.target as Node)) setShowExport(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const applyFilters = () => {
    setAppliedFilters(pendingFilters);
    const count = [
      pendingFilters.type !== 'All',
      pendingFilters.status !== 'All',
      pendingFilters.category !== 'All',
      !!pendingFilters.dateFrom,
      !!pendingFilters.dateTo,
    ].filter(Boolean).length;
    setActiveFilterCount(count);
    setShowFilter(false);
  };

  const resetFilters = () => {
    setPendingFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
    setActiveFilterCount(0);
  };

  // Filter transactions
  const filteredTransactions = allTransactions.filter((tx) => {
    if (appliedFilters.type !== 'All' && tx.type !== appliedFilters.type) return false;
    if (appliedFilters.status !== 'All' && tx.status !== appliedFilters.status) return false;
    if (appliedFilters.category !== 'All' && tx.category !== appliedFilters.category) return false;
    return true;
  });

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white-800">
            Welcome back, Finance & Accounting
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Enterprise financial overview — March 2026
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">

          {/* Filter Button */}
          <div className="relative" ref={filterRef}>
            <button
              onClick={() => { setShowFilter(!showFilter); setShowExport(false); }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-200 text-gray-600 text-sm hover:bg-gray-50 relative"
            >
              <Filter className="w-4 h-4" /> Filter
              {activeFilterCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
            {showFilter && (
              <FilterDropdown
                filters={pendingFilters}
                onChange={setPendingFilters}
                onApply={applyFilters}
                onReset={resetFilters}
                onClose={() => setShowFilter(false)}
              />
            )}
          </div>

          {/* Export Button */}
          <div className="relative" ref={exportRef}>
            <button
              onClick={() => { setShowExport(!showExport); setShowFilter(false); }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-200 text-gray-600 text-sm hover:bg-gray-50"
            >
              <Download className="w-4 h-4" /> Export
            </button>
            {showExport && (
              <ExportDropdown
                transactions={filteredTransactions}
                onClose={() => setShowExport(false)}
              />
            )}
          </div>

          <Link href="/finance/invoices/new">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">
              <Plus className="w-4 h-4" /> New Invoice
            </button>
          </Link>

        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500 text-sm">{s.label}</span>
              <div className={`p-2 rounded-lg ${s.bg}`}>
                <s.icon className={`w-4 h-4 ${s.color}`} />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{s.value}</div>
            <div className="flex items-center gap-1">
              {s.up === true && <ArrowUpRight className="w-3 h-3 text-emerald-500" />}
              {s.up === false && <ArrowDownRight className="w-3 h-3 text-rose-500" />}
              {s.up === null && <Clock className="w-3 h-3 text-amber-500" />}
              <span className={`text-xs ${s.up === true ? 'text-emerald-500' : s.up === false ? 'text-rose-500' : 'text-amber-500'}`}>
                {s.change}
              </span>
              {s.up !== null && <span className="text-gray-400 text-xs">vs last month</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Access */}
      <div>
        <h2 className="text-gray-800 font-semibold mb-3">Quick Access</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-3">
          {quickLinks.map((q) => (
            <Link key={q.label} href={q.href}>
              <div className="bg-white border border-gray-200 rounded-xl h-[110px] flex flex-col justify-center items-center hover:shadow-md hover:border-gray-300 transition group">
                <div className={`w-10 h-10 rounded-lg ${q.bg} flex items-center justify-center mb-2`}>
                  <q.icon className={`w-5 h-5 ${q.color}`} />
                </div>
                <div className="text-gray-700 text-xs font-medium text-center">{q.label}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

        {/* Recent Transactions */}
        <div className="xl:col-span-2 bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="flex items-center justify-between p-5 border-b">
            <div>
              <h2 className="text-gray-800 font-semibold">Recent Transactions</h2>
              <p className="text-gray-400 text-xs">
                {activeFilterCount > 0
                  ? `${filteredTransactions.length} of ${allTransactions.length} transactions (filtered)`
                  : 'Latest financial activity'}
              </p>
            </div>
            <button className="flex items-center gap-1 text-blue-600 text-sm">
              <RefreshCw className="w-3 h-3" /> Refresh
            </button>
          </div>

          <div>
            {filteredTransactions.length === 0 ? (
              <div className="px-5 py-10 text-center text-gray-400 text-sm">
                No transactions match the selected filters.
              </div>
            ) : (
              filteredTransactions.map((tx) => (
                <div key={tx.id} className="px-5 py-4 border-b border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${tx.type === 'Revenue' ? 'bg-emerald-50' : 'bg-rose-50'}`}>
                      {tx.type === 'Revenue'
                        ? <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                        : <ArrowDownRight className="w-4 h-4 text-rose-500" />}
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-800 text-sm font-medium">{tx.name}</div>
                      <div className="text-gray-400 text-xs mt-1">{tx.id} · {tx.date} · {tx.category}</div>
                      <div className="flex items-center justify-between mt-2">
                        <StatusBadge status={tx.status} />
                        <span className={`text-sm font-semibold ${tx.type === 'Revenue' ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {tx.amount}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Budget + Alerts */}
        <div className="flex flex-col gap-4">
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="text-gray-800 font-semibold mb-4">Budget Overview</h2>
            <div className="space-y-4">
              {budgetData.map((b) => (
                <div key={b.category}>
                  <div className="flex justify-between text-xs mb-1">
                    <span>{b.category}</span>
                    <span>${b.spent} / ${b.budget}</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full">
                    <div
                      className={`h-full rounded-full ${b.pct >= 90 ? 'bg-rose-500' : b.pct >= 75 ? 'bg-amber-500' : 'bg-blue-500'}`}
                      style={{ width: `${b.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="text-gray-800 font-semibold mb-4">Finance Alerts</h2>
            <div className="space-y-3">
              <div className="flex gap-3 p-3 rounded-lg bg-red-50 border">
                <AlertCircle className="w-4 h-4 text-rose-500" />
                <div>
                  <div className="text-red-700 text-xs font-medium">Technology budget at 92%</div>
                  <div className="text-gray-500 text-xs">$1,500 remaining this month</div>
                </div>
              </div>
              <div className="flex gap-3 p-3 rounded-lg bg-amber-50 border">
                <Clock className="w-4 h-4 text-amber-500" />
                <div>
                  <div className="text-amber-700 text-xs font-medium">4 invoices overdue</div>
                  <div className="text-gray-500 text-xs">Total: $18,400 pending</div>
                </div>
              </div>
              <div className="flex gap-3 p-3 rounded-lg bg-emerald-50 border">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <div>
                  <div className="text-emerald-700 text-xs font-medium">Tax filing complete</div>
                  <div className="text-gray-500 text-xs">Q1 2026 submitted successfully</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}