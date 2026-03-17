'use client';
import { TrendingUp, DollarSign, BarChart2, PieChart } from 'lucide-react';

const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
const revenueData = [198000, 225000, 240000, 215000, 235000, 245800];
const expenseData = [87000, 95000, 102000, 89000, 94000, 98240];
const maxVal = Math.max(...revenueData);

const categories = [
  { name: 'Operations', pct: 39, color: 'bg-blue-500' },
  { name: 'HR & Payroll', pct: 29, color: 'bg-violet-500' },
  { name: 'Marketing', pct: 11, color: 'bg-emerald-500' },
  { name: 'Technology', pct: 10, color: 'bg-amber-500' },
  { name: 'Other', pct: 11, color: 'bg-gray-500' },
];

export default function FinanceAnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Financial Analytics</h1>
        <p className="text-gray-500 text-sm mt-1">AI-powered financial insights & forecasting</p>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Profit Margin', value: '57.5%', sub: '+3.2% vs last Q', icon: TrendingUp, color: 'text-emerald-400', iconBg: 'bg-emerald-500/20' },
          { label: 'Revenue Growth', value: '+14.2%', sub: 'Year over year', icon: BarChart2, color: 'text-blue-400', iconBg: 'bg-blue-500/20' },
          { label: 'Avg Invoice Value', value: '$9,308', sub: 'Last 6 months', icon: DollarSign, color: 'text-violet-400', iconBg: 'bg-violet-500/20' },
          { label: 'Collection Rate', value: '84.3%', sub: 'On-time payments', icon: PieChart, color: 'text-amber-400', iconBg: 'bg-amber-500/20' },
        ].map(s => (
          <div key={s.label} className="bg-gray-900 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-sm">{s.label}</span>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center ${s.iconBg}`}>
                <s.icon className={`w-4 h-4 ${s.color}`} />
              </div>
            </div>
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-gray-500 text-xs mt-1">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 bg-gray-900 rounded-xl p-5">
          <h2 className="text-white font-semibold mb-4">Revenue vs Expenses (6 months)</h2>
          <div className="flex items-end gap-3 h-48">
            {months.map((month, i) => (
              <div key={month} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex gap-1 items-end" style={{ height: '160px' }}>
                  <div className="flex-1 bg-blue-500 rounded-t opacity-80 transition-all" style={{ height: `${(revenueData[i] / maxVal) * 100}%` }} />
                  <div className="flex-1 bg-rose-500 rounded-t opacity-80 transition-all" style={{ height: `${(expenseData[i] / maxVal) * 100}%` }} />
                </div>
                <span className="text-gray-500 text-xs">{month}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-3">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-blue-500 rounded" /><span className="text-gray-400 text-xs">Revenue</span></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-rose-500 rounded" /><span className="text-gray-400 text-xs">Expenses</span></div>
          </div>
        </div>
        <div className="bg-gray-900 rounded-xl p-5">
          <h2 className="text-white font-semibold mb-4">Expense Breakdown</h2>
          <div className="space-y-3">
            {categories.map(c => (
              <div key={c.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300">{c.name}</span>
                  <span className="text-gray-400">{c.pct}%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${c.color}`} style={{ width: `${c.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
