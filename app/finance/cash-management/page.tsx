'use client';
import { Toast } from '../../components/Modal';
import { useState } from 'react';
import { Plus, DollarSign, TrendingUp, Building, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';

const tabs = ['Bank Accounts', 'Cash Flow', 'Bank Reconciliation', 'Treasury', 'Foreign Exchange'];

const accounts = [
  { bank: 'HDFC Bank', account: 'XXXX-4521', type: 'Current', balance: '$1,25,400', status: 'Active' },
  { bank: 'ICICI Bank', account: 'XXXX-7832', type: 'Savings', balance: '$45,200', status: 'Active' },
  { bank: 'SBI', account: 'XXXX-1190', type: 'Current', balance: '$78,900', status: 'Active' },
  { bank: 'Axis Bank', account: 'XXXX-3345', type: 'OD Account', balance: '-$12,000', status: 'Overdrawn' },
];

const cashFlowData = [
  { month: 'Jan', inflow: 215000, outflow: 89000 },
  { month: 'Feb', inflow: 235000, outflow: 94000 },
  { month: 'Mar', inflow: 245800, outflow: 98240 },
];

const reconciliation = [
  { date: 'Mar 11', ref: 'REF-441', desc: 'Client Payment - Acme Corp', bankAmt: '$12,000', bookAmt: '$12,000', status: 'Matched' },
  { date: 'Mar 10', ref: 'REF-440', desc: 'Office Rent Payment', bankAmt: '$3,200', bookAmt: '$3,200', status: 'Matched' },
  { date: 'Mar 09', ref: 'REF-439', desc: 'Software Subscription', bankAmt: '$1,200', bookAmt: '$1,200', status: 'Matched' },
  { date: 'Mar 08', ref: 'REF-438', desc: 'Unidentified Credit', bankAmt: '$850', bookAmt: '—', status: 'Unmatched' },
  { date: 'Mar 07', ref: 'REF-437', desc: 'Payroll Transfer', bankAmt: '$28,500', bookAmt: '$28,500', status: 'Matched' },
];

const treasury = [
  { instrument: 'Fixed Deposit - HDFC', principal: '$50,000', rate: '7.5%', maturity: 'Jun 30, 2026', value: '$51,875' },
  { instrument: 'Liquid Fund - ICICI', principal: '$80,000', rate: '6.8%', maturity: 'On Demand', value: '$82,720' },
  { instrument: 'T-Bill 91 day', principal: '$30,000', rate: '6.95%', maturity: 'May 15, 2026', value: '$30,521' },
  { instrument: 'Corp Bond - Reliance', principal: '$1,00,000', rate: '8.2%', maturity: 'Dec 31, 2026', value: '$1,04,100' },
];

const fxRates = [
  { pair: 'USD/INR', rate: '83.42', change: '+0.12%', trending: true },
  { pair: 'EUR/INR', rate: '90.15', change: '-0.08%', trending: false },
  { pair: 'GBP/INR', rate: '105.30', change: '+0.22%', trending: true },
  { pair: 'AED/INR', rate: '22.70', change: '+0.03%', trending: true },
  { pair: 'SGD/INR', rate: '61.85', change: '-0.15%', trending: false },
  { pair: 'JPY/INR', rate: '0.55', change: '-0.05%', trending: false },
];

export default function CashManagementPage() {
  const [toast, setToast] = useState('');
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="p-6 space-y-6">
      {toast && <Toast message={toast} onDone={() => setToast('')} />}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white-800">Cash Management</h1>
          <p className="text-gray-500 text-sm mt-1">Bank accounts, cash flow & treasury operations</p>
        </div>
        <button onClick={() => setToast('Account form — contact your bank admin')} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
          <Plus className="w-4 h-4" /> Add Account
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Total Cash', value: '$2,37,500', valueColor: 'text-white', iconBg: 'bg-gray-700', icon: DollarSign, iconColor: 'text-gray-300' },
          { label: 'Monthly Inflow', value: '$2,45,800', valueColor: 'text-emerald-400', iconBg: 'bg-emerald-500/20', icon: TrendingUp, iconColor: 'text-emerald-400' },
          { label: 'Monthly Outflow', value: '$98,240', valueColor: 'text-rose-400', iconBg: 'bg-rose-500/20', icon: TrendingUp, iconColor: 'text-rose-400' },
          { label: 'Bank Accounts', value: '4', valueColor: 'text-blue-400', iconBg: 'bg-blue-500/20', icon: Building, iconColor: 'text-blue-400' },
        ].map(s => (
          <div key={s.label} className="bg-gray-900 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-sm">{s.label}</span>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center ${s.iconBg}`}>
                <s.icon className={`w-4 h-4 ${s.iconColor}`} />
              </div>
            </div>
            <div className={`text-2xl font-bold ${s.valueColor}`}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex">
          {tabs.map((tab, i) => (
            <button key={tab} onClick={() => setActiveTab(i)} className={`px-4 py-2.5 text-sm border-b-2 transition-colors ${activeTab === i ? 'text-blue-600 font-medium border-blue-600' : 'text-gray-500 border-transparent hover:text-gray-700'}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 0: Bank Accounts */}
      {activeTab === 0 && (
        <div className="bg-gray-900 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800 border-b border-gray-700">
                {['Bank', 'Account No.', 'Type', 'Balance', 'Status', 'Action'].map(h => (
                  <th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {accounts.map(a => (
                <tr key={a.account} className="hover:bg-gray-800/60 transition-colors">
                  <td className="px-4 py-3.5 text-white text-sm font-medium">{a.bank}</td>
                  <td className="px-4 py-3.5 text-blue-400 text-sm font-mono">{a.account}</td>
                  <td className="px-4 py-3.5 text-gray-300 text-sm">{a.type}</td>
                  <td className={`px-4 py-3.5 text-sm font-semibold ${a.balance.startsWith('-') ? 'text-rose-400' : 'text-emerald-400'}`}>{a.balance}</td>
                  <td className="px-4 py-3.5">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${a.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>{a.status}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <button onClick={() => setToast(`Managing ${a.bank}`)} className="px-3 py-1 bg-gray-700 text-gray-300 rounded text-xs hover:bg-gray-600">Manage</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 1: Cash Flow */}
      {activeTab === 1 && (
        <div className="bg-gray-900 rounded-xl p-5">
          <h2 className="text-white font-semibold mb-5">Cash Flow — Last 3 Months</h2>
          <div className="space-y-6">
            {cashFlowData.map(d => {
              const max = 250000;
              return (
                <div key={d.month}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300 text-sm font-medium">{d.month} 2026</span>
                    <span className="text-emerald-400 text-xs">Net: +${(d.inflow - d.outflow).toLocaleString()}</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-500 text-xs w-14">Inflow</span>
                      <div className="flex-1 h-5 bg-gray-800 rounded overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded flex items-center pl-2" style={{ width: `${(d.inflow / max) * 100}%` }}>
                          <span className="text-white text-[10px] font-medium">${(d.inflow / 1000).toFixed(0)}k</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-500 text-xs w-14">Outflow</span>
                      <div className="flex-1 h-5 bg-gray-800 rounded overflow-hidden">
                        <div className="h-full bg-rose-500 rounded flex items-center pl-2" style={{ width: `${(d.outflow / max) * 100}%` }}>
                          <span className="text-white text-[10px] font-medium">${(d.outflow / 1000).toFixed(0)}k</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Bank Reconciliation */}
      {activeTab === 2 && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Matched Transactions', value: '4', color: 'text-emerald-400' },
              { label: 'Unmatched', value: '1', color: 'text-rose-400' },
              { label: 'Last Reconciled', value: 'Mar 11', color: 'text-white' },
            ].map(s => (
              <div key={s.label} className="bg-gray-900 rounded-xl p-4">
                <div className="text-gray-400 text-sm mb-1">{s.label}</div>
                <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
              </div>
            ))}
          </div>
          <div className="bg-gray-900 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
              <h2 className="text-white font-semibold text-sm">Bank Statement vs Books</h2>
              <button onClick={() => setToast('Reconciliation started! Processing...')} className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">Run Reconciliation</button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-800 border-b border-gray-700">
                  {['Date', 'Reference', 'Description', 'Bank Amount', 'Book Amount', 'Status'].map(h => (
                    <th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {reconciliation.map((r, i) => (
                  <tr key={i} className="hover:bg-gray-800/60 transition-colors">
                    <td className="px-4 py-3.5 text-gray-400 text-sm">{r.date}</td>
                    <td className="px-4 py-3.5 text-blue-400 text-sm font-mono">{r.ref}</td>
                    <td className="px-4 py-3.5 text-white text-sm">{r.desc}</td>
                    <td className="px-4 py-3.5 text-emerald-400 text-sm">{r.bankAmt}</td>
                    <td className="px-4 py-3.5 text-gray-300 text-sm">{r.bookAmt}</td>
                    <td className="px-4 py-3.5">
                      <span className={`flex items-center gap-1 w-fit px-2 py-0.5 rounded text-xs font-medium ${r.status === 'Matched' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                        {r.status === 'Matched' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Treasury */}
      {activeTab === 3 && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Total Invested', value: '$2,60,000', color: 'text-white' },
              { label: 'Current Value', value: '$2,69,216', color: 'text-emerald-400' },
              { label: 'Unrealised Gain', value: '+$9,216', color: 'text-emerald-400' },
            ].map(s => (
              <div key={s.label} className="bg-gray-900 rounded-xl p-4">
                <div className="text-gray-400 text-sm mb-1">{s.label}</div>
                <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
              </div>
            ))}
          </div>
          <div className="bg-gray-900 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
              <h2 className="text-white font-semibold text-sm">Treasury Portfolio</h2>
              <button onClick={() => setToast('Add Investment — contact treasury manager')} className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">+ Add Investment</button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-800 border-b border-gray-700">
                  {['Instrument', 'Principal', 'Rate', 'Maturity', 'Current Value', 'Action'].map(h => (
                    <th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {treasury.map((t, i) => (
                  <tr key={i} className="hover:bg-gray-800/60 transition-colors">
                    <td className="px-4 py-3.5 text-white text-sm font-medium">{t.instrument}</td>
                    <td className="px-4 py-3.5 text-amber-400 text-sm">{t.principal}</td>
                    <td className="px-4 py-3.5 text-blue-400 text-sm font-mono">{t.rate}</td>
                    <td className="px-4 py-3.5 text-gray-300 text-sm">{t.maturity}</td>
                    <td className="px-4 py-3.5 text-emerald-400 text-sm font-semibold">{t.value}</td>
                    <td className="px-4 py-3.5">
                      <button onClick={() => setToast(`Managing ${t.instrument}`)} className="px-3 py-1 bg-gray-700 text-gray-300 rounded text-xs hover:bg-gray-600">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Foreign Exchange */}
      {activeTab === 4 && (
        <div className="bg-gray-900 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
            <h2 className="text-white font-semibold text-sm">Live FX Rates (vs INR)</h2>
            <button className="flex items-center gap-1 text-blue-400 text-xs hover:text-blue-300"><RefreshCw className="w-3 h-3" /> Refresh</button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800 border-b border-gray-700">
                {['Currency Pair', 'Rate', '24h Change', 'Trend', 'Action'].map(h => (
                  <th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {fxRates.map(r => (
                <tr key={r.pair} className="hover:bg-gray-800/60 transition-colors">
                  <td className="px-4 py-3.5 text-white text-sm font-medium">{r.pair}</td>
                  <td className="px-4 py-3.5 text-amber-400 text-sm font-mono font-bold">{r.rate}</td>
                  <td className={`px-4 py-3.5 text-sm font-medium ${r.trending ? 'text-emerald-400' : 'text-rose-400'}`}>{r.change}</td>
                  <td className="px-4 py-3.5">
                    <span className={`px-2 py-0.5 rounded text-xs ${r.trending ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                      {r.trending ? '↑ Up' : '↓ Down'}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <button onClick={() => setToast(`FX conversion request for ${r.pair} submitted!`)} className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">Convert</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
