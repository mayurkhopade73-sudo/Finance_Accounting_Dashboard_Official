'use client';

const slaData = [
  { priority: 'Critical', responseTime: '1 hour', resolutionTime: '4 hours', compliance: '98%', status: 'Met' },
  { priority: 'High', responseTime: '4 hours', resolutionTime: '24 hours', compliance: '94%', status: 'Met' },
  { priority: 'Medium', responseTime: '8 hours', resolutionTime: '72 hours', compliance: '89%', status: 'At Risk' },
  { priority: 'Low', responseTime: '24 hours', resolutionTime: '7 days', compliance: '97%', status: 'Met' },
];

export default function SLAPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">SLA Management</h1>
        <p className="text-gray-500 text-sm mt-1">Service Level Agreement policies and compliance tracking</p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Overall Compliance', value: '94.5%', color: 'text-emerald-600' },
          { label: 'SLA Breaches (Mar)', value: '8', color: 'text-rose-600' },
          { label: 'Avg Response Time', value: '2.4h', color: 'text-blue-600' },
        ].map(s => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="text-gray-500 text-sm mb-2">{s.label}</div>
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100">
          <h2 className="text-gray-800 font-semibold text-sm">SLA Policies</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {['Priority', 'First Response', 'Resolution Time', 'Compliance Rate', 'Status'].map(h => (
                <th key={h} className="text-left text-gray-500 text-xs font-medium px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {slaData.map(s => (
              <tr key={s.priority} className="hover:bg-gray-50">
                <td className="px-4 py-3.5 text-gray-800 text-sm font-medium">{s.priority}</td>
                <td className="px-4 py-3.5 text-gray-600 text-sm">{s.responseTime}</td>
                <td className="px-4 py-3.5 text-gray-600 text-sm">{s.resolutionTime}</td>
                <td className="px-4 py-3.5 text-gray-700 text-sm font-medium">{s.compliance}</td>
                <td className="px-4 py-3.5">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${s.status === 'Met' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>{s.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
