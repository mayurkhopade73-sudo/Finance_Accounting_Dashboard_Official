'use client';
import { Toast } from '../../components/Modal';
import { useState } from 'react';
import { CheckCircle2, AlertCircle, Shield, FileCheck, Lock, Eye } from 'lucide-react';

const auditLogs = [
  { time: 'Mar 12, 09:15', user: 'Super Admin', action: 'Invoice created', resource: 'INV-2046', ip: '192.168.1.10', risk: 'Low' },
  { time: 'Mar 12, 08:42', user: 'Finance Manager', action: 'Payment approved', resource: 'BILL-0091', ip: '192.168.1.22', risk: 'Medium' },
  { time: 'Mar 11, 17:30', user: 'Super Admin', action: 'Report exported', resource: 'P&L Q1 2026', ip: '192.168.1.10', risk: 'Low' },
  { time: 'Mar 11, 14:10', user: 'Accounts Team', action: 'Vendor updated', resource: 'SupplierCo Ltd', ip: '192.168.1.35', risk: 'Medium' },
  { time: 'Mar 11, 11:05', user: 'Super Admin', action: 'Budget modified', resource: 'Technology Dept', ip: '192.168.1.10', risk: 'High' },
  { time: 'Mar 10, 16:20', user: 'Finance Manager', action: 'User role changed', resource: 'Accounts Team', ip: '192.168.1.22', risk: 'High' },
];

const compliance = [
  { label: 'GST Compliance', status: 'Compliant', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', detail: 'All returns filed on time' },
  { label: 'Income Tax Filing', status: 'Compliant', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', detail: 'FY 2024-25 assessed' },
  { label: 'Payroll Compliance', status: 'Compliant', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', detail: 'PF, ESI up to date' },
  { label: 'Data Privacy (DPDP)', status: 'In Progress', icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50', detail: 'Policy update underway' },
  { label: 'ISO 27001', status: 'Certified', icon: Shield, color: 'text-blue-600', bg: 'bg-blue-50', detail: 'Valid until Dec 2026' },
  { label: 'SOC 2 Type II', status: 'Certified', icon: FileCheck, color: 'text-purple-600', bg: 'bg-purple-50', detail: 'Last audit Feb 2026' },
];

const controls = [
  { id: 'IC-001', control: 'Dual approval for payments > $5,000', category: 'Financial', owner: 'Finance Manager', status: 'Effective', tested: 'Mar 2026' },
  { id: 'IC-002', control: 'Monthly bank reconciliation', category: 'Financial', owner: 'Accounts Team', status: 'Effective', tested: 'Mar 2026' },
  { id: 'IC-003', control: 'Segregation of duties - AP/AR', category: 'Operational', owner: 'Super Admin', status: 'Effective', tested: 'Feb 2026' },
  { id: 'IC-004', control: 'Quarterly budget variance review', category: 'Financial', owner: 'Finance Manager', status: 'Needs Review', tested: 'Dec 2025' },
  { id: 'IC-005', control: 'Vendor onboarding KYC process', category: 'Compliance', owner: 'Procurement', status: 'Effective', tested: 'Mar 2026' },
  { id: 'IC-006', control: 'IT access control - role based', category: 'IT', owner: 'IT Admin', status: 'Effective', tested: 'Feb 2026' },
];

const financialAudits = [
  { auditId: 'AUD-2026-01', type: 'Internal Audit', scope: 'Accounts Payable Process', auditor: 'Internal Audit Team', period: 'Q4 2025', status: 'Completed', findings: 2 },
  { auditId: 'AUD-2026-02', type: 'Statutory Audit', scope: 'Annual Financial Statements', auditor: 'Deloitte India', period: 'FY 2025-26', status: 'In Progress', findings: 0 },
  { auditId: 'AUD-2025-04', type: 'Tax Audit', scope: 'Income Tax Assessment', auditor: 'EY India', period: 'FY 2024-25', status: 'Completed', findings: 1 },
  { auditId: 'AUD-2025-03', type: 'Internal Audit', scope: 'Payroll & HR Compliance', auditor: 'Internal Audit Team', period: 'Q3 2025', status: 'Completed', findings: 0 },
];

const riskStyle: Record<string, string> = {
  Low: 'bg-emerald-500/20 text-emerald-400',
  Medium: 'bg-amber-500/20 text-amber-400',
  High: 'bg-rose-500/20 text-rose-400',
};

export default function ComplianceAuditPage() {
  const [toast, setToast] = useState('');
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="p-6 space-y-6">
      {toast && <Toast message={toast} onDone={() => setToast('')} />}
      <div>
        <h1 className="text-2xl font-bold text-white-800">Compliance & Audit</h1>
        <p className="text-gray-500 text-sm mt-1">Audit trails, compliance monitoring, internal controls & auditing</p>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Compliance Score', value: '96%', color: 'text-emerald-400' },
          { label: 'Open Audit Items', value: '3', color: 'text-amber-400' },
          { label: 'Controls Active', value: '24', color: 'text-blue-400' },
          { label: 'Last Audit', value: 'Feb 2026', color: 'text-white' },
        ].map(s => (
          <div key={s.label} className="bg-gray-900 rounded-xl p-5">
            <div className="text-gray-400 text-sm mb-2">{s.label}</div>
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="border-b border-gray-200">
        <div className="flex">{['Audit Logs', 'Compliance Dashboard', 'Internal Controls', 'Financial Auditing'].map((tab, i) => <button key={tab} onClick={() => setActiveTab(i)} className={`px-4 py-2.5 text-sm border-b-2 transition-colors ${activeTab === i ? 'text-blue-600 font-medium border-blue-600' : 'text-gray-500 border-transparent hover:text-gray-700'}`}>{tab}</button>)}</div>
      </div>

      {activeTab === 0 && (
        <div className="bg-gray-900 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
            <h2 className="text-white font-semibold text-sm">System Audit Trail</h2>
            <button onClick={() => setToast('Audit logs exported!')} className="px-3 py-1.5 bg-gray-700 text-gray-300 rounded text-xs hover:bg-gray-600">Export Logs</button>
          </div>
          <table className="w-full">
            <thead><tr className="bg-gray-800 border-b border-gray-700">{['Timestamp', 'User', 'Action', 'Resource', 'IP Address', 'Risk Level'].map(h => <th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-800">
              {auditLogs.map((log, i) => (
                <tr key={i} className="hover:bg-gray-800/60">
                  <td className="px-4 py-3.5 text-gray-400 text-sm">{log.time}</td>
                  <td className="px-4 py-3.5 text-white text-sm font-medium">{log.user}</td>
                  <td className="px-4 py-3.5 text-gray-300 text-sm">{log.action}</td>
                  <td className="px-4 py-3.5 text-blue-400 text-sm">{log.resource}</td>
                  <td className="px-4 py-3.5 text-gray-500 text-sm font-mono">{log.ip}</td>
                  <td className="px-4 py-3.5"><span className={`px-2 py-0.5 rounded text-xs font-medium ${riskStyle[log.risk]}`}>{log.risk}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {compliance.map(c => (
            <div key={c.label} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${c.bg} flex-shrink-0`}><c.icon className={`w-5 h-5 ${c.color}`} /></div>
                <div className="flex-1">
                  <div className="text-gray-800 font-semibold text-sm">{c.label}</div>
                  <div className={`text-sm font-medium mt-0.5 ${c.color}`}>{c.status}</div>
                  <div className="text-gray-400 text-xs mt-1">{c.detail}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 2 && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-gray-800 font-semibold text-sm">Internal Controls Register</h2>
            <button onClick={() => setToast('New control added to register!')} className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">+ Add Control</button>
          </div>
          <table className="w-full">
            <thead><tr className="bg-gray-50 border-b border-gray-100">{['Control ID', 'Control Description', 'Category', 'Owner', 'Status', 'Last Tested'].map(h => <th key={h} className="text-left text-gray-500 text-xs font-medium px-4 py-3">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-100">
              {controls.map(c => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3.5 text-blue-600 text-sm font-mono">{c.id}</td>
                  <td className="px-4 py-3.5 text-gray-800 text-sm">{c.control}</td>
                  <td className="px-4 py-3.5"><span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">{c.category}</span></td>
                  <td className="px-4 py-3.5 text-gray-600 text-sm">{c.owner}</td>
                  <td className="px-4 py-3.5">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${c.status === 'Effective' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>{c.status}</span>
                  </td>
                  <td className="px-4 py-3.5 text-gray-500 text-sm">{c.tested}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 3 && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-gray-800 font-semibold text-sm">Financial Audit Register</h2>
            <button onClick={() => setToast('Audit scheduled!')} className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">Schedule Audit</button>
          </div>
          <table className="w-full">
            <thead><tr className="bg-gray-50 border-b border-gray-100">{['Audit ID', 'Type', 'Scope', 'Auditor', 'Period', 'Status', 'Findings'].map(h => <th key={h} className="text-left text-gray-500 text-xs font-medium px-4 py-3">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-100">
              {financialAudits.map(a => (
                <tr key={a.auditId} className="hover:bg-gray-50">
                  <td className="px-4 py-3.5 text-blue-600 text-sm font-mono">{a.auditId}</td>
                  <td className="px-4 py-3.5"><span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">{a.type}</span></td>
                  <td className="px-4 py-3.5 text-gray-800 text-sm">{a.scope}</td>
                  <td className="px-4 py-3.5 text-gray-600 text-sm">{a.auditor}</td>
                  <td className="px-4 py-3.5 text-gray-500 text-sm">{a.period}</td>
                  <td className="px-4 py-3.5">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${a.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-blue-50 text-blue-700 border border-blue-200'}`}>{a.status}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${a.findings > 0 ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'}`}>{a.findings} {a.findings === 1 ? 'finding' : 'findings'}</span>
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
