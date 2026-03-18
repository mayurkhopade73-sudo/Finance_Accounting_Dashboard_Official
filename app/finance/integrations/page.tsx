'use client';
import { useState } from 'react';
import { Toast } from '../../components/Modal';

const tabs = ['Connected', 'Available', 'Webhooks'];

const integrations = [
  { name: 'Razorpay', desc: 'Payment gateway for invoices', logo: '💳', connected: true, plan: 'Live Mode', lastSync: '2 min ago' },
  { name: 'Tally Prime', desc: 'Accounting software sync', logo: '📊', connected: true, plan: 'API v2', lastSync: '1h ago' },
  { name: 'GST Portal', desc: 'Auto GST filing integration', logo: '🏛️', connected: true, plan: 'Govt API', lastSync: '6h ago' },
  { name: 'Stripe', desc: 'International payment processing', logo: '⚡', connected: false, plan: 'Free plan available' },
  { name: 'QuickBooks', desc: 'Accounting & bookkeeping', logo: '📒', connected: false, plan: 'Starts $25/mo' },
  { name: 'Zoho Books', desc: 'Accounting platform', logo: '📗', connected: false, plan: 'Free for 1 user' },
  { name: 'Slack', desc: 'Finance alert notifications', logo: '💬', connected: false, plan: 'Free Tier' },
  { name: 'Google Sheets', desc: 'Export reports to Sheets', logo: '📄', connected: false, plan: 'Free' },
];

const webhooks = [
  { id: 'WH-001', event: 'invoice.paid', url: 'https://app.company.com/webhooks/invoice', status: 'Active', lastTriggered: 'Mar 12, 09:15' },
  { id: 'WH-002', event: 'payment.failed', url: 'https://app.company.com/webhooks/payment', status: 'Active', lastTriggered: 'Mar 10, 14:22' },
  { id: 'WH-003', event: 'budget.alert', url: 'https://alerts.company.com/budget', status: 'Inactive', lastTriggered: 'Mar 08, 11:00' },
];

export default function IntegrationsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [items, setItems] = useState(integrations);
  const [toast, setToast] = useState('');

  const connected = items.filter(i => i.connected);
  const available = items.filter(i => !i.connected);

  const handleConnect = (name: string) => {
    setItems(prev => prev.map(i => i.name === name ? { ...i, connected: true, lastSync: 'Just now' } : i));
    setToast(`${name} connected successfully!`);
  };

  const handleDisconnect = (name: string) => {
    setItems(prev => prev.map(i => i.name === name ? { ...i, connected: false } : i));
    setToast(`${name} disconnected.`);
  };

  const toggleWebhook = (id: string) => {
    setToast(`Webhook ${id} status toggled!`);
  };

  return (
    <div className="p-6 space-y-6">
      {toast && <Toast message={toast} onDone={() => setToast('')} />}
      <div><h1 className="text-2xl font-bold text-white-800">Integrations</h1><p className="text-gray-500 text-sm mt-1">Connect your finance stack with third-party tools</p></div>

      <div className="grid grid-cols-3 gap-4">
        {[{label:'Connected',value:connected.length},{label:'Available',value:available.length},{label:'Webhooks',value:webhooks.length}].map(s=>
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"><div className="text-gray-500 text-sm mb-1">{s.label}</div><div className="text-2xl font-bold text-gray-800">{s.value}</div></div>
        )}
      </div>

      <div className="border-b border-gray-200">
        <div className="flex">{tabs.map((tab, i) => <button key={tab} onClick={() => setActiveTab(i)} className={`px-4 py-2.5 text-sm border-b-2 transition-colors ${activeTab === i ? 'text-blue-600 font-medium border-blue-600' : 'text-gray-500 border-transparent hover:text-gray-700'}`}>{tab}</button>)}</div>
      </div>

      {activeTab === 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {connected.map(item => (
            <div key={item.name} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{item.logo}</span>
                  <div><div className="text-gray-800 font-semibold text-sm">{item.name}</div><div className="text-gray-400 text-xs">{item.desc}</div></div>
                </div>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-2 py-0.5 rounded-full font-medium">Active</span>
              </div>
              <div className="text-gray-400 text-xs mb-3">Last sync: {item.lastSync} · {item.plan}</div>
              <button onClick={() => handleDisconnect(item.name)} className="w-full px-3 py-1.5 border border-rose-200 text-rose-600 rounded-lg text-xs hover:bg-rose-50 transition-colors">Disconnect</button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {available.map(item => (
            <div key={item.name} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-3xl">{item.logo}</span>
                <div><div className="text-gray-800 font-semibold text-sm">{item.name}</div><div className="text-gray-400 text-xs">{item.desc}</div></div>
              </div>
              <div className="text-gray-400 text-xs mb-3">{item.plan}</div>
              <button onClick={() => handleConnect(item.name)} className="w-full px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs hover:bg-blue-700 transition-colors font-medium">Connect</button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 2 && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-gray-700 font-semibold text-sm">Webhook Endpoints</h2>
            <button onClick={() => setToast('Add Webhook — coming in next release')} className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">+ Add Webhook</button>
          </div>
          <table className="w-full">
            <thead><tr className="bg-gray-50 border-b border-gray-100">{['ID','Event','URL','Status','Last Triggered','Action'].map(h=><th key={h} className="text-left text-gray-500 text-xs font-medium px-4 py-3">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-100">
              {webhooks.map(w=>(
                <tr key={w.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3.5 text-blue-600 text-sm font-mono">{w.id}</td>
                  <td className="px-4 py-3.5 text-gray-700 text-sm font-mono">{w.event}</td>
                  <td className="px-4 py-3.5 text-gray-500 text-xs truncate max-w-xs">{w.url}</td>
                  <td className="px-4 py-3.5"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${w.status==='Active'?'bg-emerald-50 text-emerald-700 border border-emerald-200':'bg-gray-100 text-gray-500'}`}>{w.status}</span></td>
                  <td className="px-4 py-3.5 text-gray-400 text-sm">{w.lastTriggered}</td>
                  <td className="px-4 py-3.5"><button onClick={()=>toggleWebhook(w.id)} className="px-3 py-1 bg-white border border-gray-200 text-gray-600 rounded text-xs hover:bg-gray-50">{w.status==='Active'?'Disable':'Enable'}</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
