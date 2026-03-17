'use client';
import { useState } from 'react';
import { TrendingUp, DollarSign, Percent, Calculator } from 'lucide-react';

const roiData = [
  { project: 'ERP Implementation', investment: '$1,20,000', returns: '$3,60,000', roi: '200%', period: '18 months', status: 'Positive' },
  { project: 'Marketing Campaign Q1', investment: '$30,000', returns: '$85,000', roi: '183%', period: '3 months', status: 'Positive' },
  { project: 'Cloud Migration', investment: '$45,000', returns: '$52,000', roi: '16%', period: '6 months', status: 'Positive' },
  { project: 'Training Program', investment: '$15,000', returns: '$12,000', roi: '-20%', period: '12 months', status: 'Negative' },
  { project: 'New Product Launch', investment: '$80,000', returns: '$2,40,000', roi: '200%', period: '9 months', status: 'Positive' },
];

export default function ROIPage() {
  const [investment, setInvestment] = useState('');
  const [returns, setReturns] = useState('');
  const calcROI = investment && returns
    ? (((+returns - +investment) / +investment) * 100).toFixed(1)
    : null;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">ROI Analysis</h1>
        <p className="text-gray-500 text-sm mt-1">Return on investment tracking and calculator</p>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Avg ROI', value: '116%', color: 'text-emerald-600', icon: TrendingUp, bg: 'bg-emerald-50' },
          { label: 'Total Invested', value: '$2,90,000', color: 'text-gray-800', icon: DollarSign, bg: 'bg-gray-100' },
          { label: 'Total Returns', value: '$7,49,000', color: 'text-blue-600', icon: DollarSign, bg: 'bg-blue-50' },
          { label: 'Net Gain', value: '$4,59,000', color: 'text-emerald-600', icon: Percent, bg: 'bg-emerald-50' },
        ].map(s => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-500 text-sm">{s.label}</span>
              <div className={`p-2 rounded-lg ${s.bg}`}><s.icon className={`w-4 h-4 ${s.color}`} /></div>
            </div>
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Calculator */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm max-w-md">
        <div className="flex items-center gap-2 mb-4">
          <Calculator className="w-5 h-5 text-blue-600" />
          <h2 className="text-gray-800 font-semibold">ROI Calculator</h2>
        </div>
        <div className="space-y-3">
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">Investment Amount ($)</label>
            <input type="number" value={investment} onChange={e => setInvestment(e.target.value)} placeholder="e.g. 50000" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-blue-400" />
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">Expected Returns ($)</label>
            <input type="number" value={returns} onChange={e => setReturns(e.target.value)} placeholder="e.g. 120000" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-blue-400" />
          </div>
          {calcROI && (
            <div className={`p-4 rounded-xl ${+calcROI >= 0 ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'}`}>
              <div className="text-gray-600 text-sm">Calculated ROI</div>
              <div className={`text-3xl font-bold ${+calcROI >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{calcROI}%</div>
              <div className="text-gray-500 text-xs mt-1">Net gain: ${(+returns - +investment).toLocaleString()}</div>
            </div>
          )}
        </div>
      </div>

      {/* ROI Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100">
          <h2 className="text-gray-800 font-semibold text-sm">Project ROI Breakdown</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {['Project', 'Investment', 'Returns', 'ROI', 'Period', 'Status'].map(h => (
                <th key={h} className="text-left text-gray-500 text-xs font-medium px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {roiData.map(r => (
              <tr key={r.project} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3.5 text-gray-800 text-sm font-medium">{r.project}</td>
                <td className="px-4 py-3.5 text-rose-600 text-sm">{r.investment}</td>
                <td className="px-4 py-3.5 text-emerald-600 text-sm">{r.returns}</td>
                <td className={`px-4 py-3.5 text-sm font-bold ${r.roi.startsWith('-') ? 'text-red-600' : 'text-emerald-600'}`}>{r.roi}</td>
                <td className="px-4 py-3.5 text-gray-500 text-sm">{r.period}</td>
                <td className="px-4 py-3.5">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${r.status === 'Positive' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>{r.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
