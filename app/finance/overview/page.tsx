'use client';
import { DollarSign, TrendingUp, TrendingDown, BarChart2, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import Link from 'next/link';

const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
const revenue = [180000, 195000, 210000, 198000, 225000, 240000, 215000, 235000, 245800];
const expenses = [82000, 88000, 91000, 87000, 95000, 102000, 89000, 94000, 98240];

export default function FinanceOverviewPage() {
  const maxVal = Math.max(...revenue);
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Financial Overview</h1>
        <p className="text-gray-500 text-sm mt-1">9-month performance summary</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'YTD Revenue', value: '$1,943,800', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50', change: '+14.2%', up: true },
          { label: 'YTD Expenses', value: '$826,240', icon: TrendingDown, color: 'text-rose-600', bg: 'bg-rose-50', change: '+6.1%', up: false },
          { label: 'Net Profit Margin', value: '57.5%', icon: BarChart2, color: 'text-blue-600', bg: 'bg-blue-50', change: '+3.2%', up: true },
        ].map(s => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-500 text-sm">{s.label}</span>
              <div className={`p-2 rounded-lg ${s.bg}`}><s.icon className={`w-4 h-4 ${s.color}`} /></div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{s.value}</div>
            <div className="flex items-center gap-1">
              {s.up ? <ArrowUpRight className="w-3 h-3 text-emerald-500" /> : <ArrowDownRight className="w-3 h-3 text-rose-500" />}
              <span className={`text-xs ${s.up ? 'text-emerald-500' : 'text-rose-500'}`}>{s.change}</span>
              <span className="text-gray-400 text-xs">YoY</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <h2 className="text-gray-800 font-semibold mb-4">Revenue vs Expenses Trend</h2>
        <div className="flex items-end gap-2 h-48">
          {months.map((month, i) => (
            <div key={month} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex gap-0.5 items-end" style={{ height: '160px' }}>
                <div className="flex-1 bg-emerald-500 rounded-t opacity-80" style={{ height: `${(revenue[i] / maxVal) * 100}%` }} />
                <div className="flex-1 bg-rose-400 rounded-t opacity-80" style={{ height: `${(expenses[i] / maxVal) * 100}%` }} />
              </div>
              <span className="text-gray-400 text-[10px]">{month}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-3">
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-emerald-500 rounded" /><span className="text-gray-500 text-xs">Revenue</span></div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-rose-400 rounded" /><span className="text-gray-500 text-xs">Expenses</span></div>
        </div>
      </div>
    </div>
  );
}
