'use client';
import { TrendingUp, Clock, ThumbsUp, Users } from 'lucide-react';

export default function SupportAnalysisPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Support Analytics</h1>
        <p className="text-gray-500 text-sm mt-1">Support team performance metrics</p>
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Total Tickets (Mar)', value: '142', change: '+12%', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Avg Resolution Time', value: '4.2h', change: '-8%', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
          { label: 'CSAT Score', value: '94%', change: '+2%', icon: ThumbsUp, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'First Contact Res.', value: '78%', change: '+5%', icon: TrendingUp, color: 'text-violet-500', bg: 'bg-violet-50' },
        ].map(s => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-500 text-sm">{s.label}</span>
              <div className={`p-2 rounded-lg ${s.bg}`}><s.icon className={`w-4 h-4 ${s.color}`} /></div>
            </div>
            <div className="text-2xl font-bold text-gray-900">{s.value}</div>
            <div className="text-xs text-gray-400 mt-1">{s.change} vs last month</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h2 className="text-gray-800 font-semibold mb-4">Ticket Volume by Day</h2>
          <div className="flex items-end gap-2 h-32">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
              const heights = [65, 80, 90, 75, 55, 30, 20];
              return (
                <div key={day} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-blue-500 rounded-t opacity-70" style={{ height: `${heights[i]}%` }} />
                  <span className="text-gray-400 text-[10px]">{day}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h2 className="text-gray-800 font-semibold mb-4">Top Agents</h2>
          <div className="space-y-3">
            {[
              { name: 'Raj Kumar', tickets: 42, csat: '96%' },
              { name: 'Priya Shah', tickets: 38, csat: '94%' },
              { name: 'Anil Mehta', tickets: 35, csat: '92%' },
              { name: 'Sunita Rao', tickets: 27, csat: '91%' },
            ].map(a => (
              <div key={a.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-700 text-xs font-bold">{a.name[0]}</span>
                  </div>
                  <span className="text-gray-700 text-sm font-medium">{a.name}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span>{a.tickets} tickets</span>
                  <span className="text-emerald-600 font-medium">{a.csat} CSAT</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
