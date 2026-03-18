'use client';
import Link from 'next/link';
import { Ticket, MessageSquare, BookOpenCheck, BarChart, SlidersHorizontal, HeadphonesIcon } from 'lucide-react';

const stats = [
  { label: 'Open Tickets', value: '14', color: 'text-amber-400' },
  { label: 'Resolved Today', value: '8', color: 'text-emerald-400' },
  { label: 'Avg Response Time', value: '2.4h', color: 'text-blue-400' },
  { label: 'CSAT Score', value: '94%', color: 'text-white' },
];

const modules = [
  { label: 'Tickets', href: '/finance/support/tickets', icon: Ticket, desc: 'Manage support tickets', color: 'text-amber-500', bg: 'bg-amber-50' },
  { label: 'Live Chat', href: '/finance/support/live-chat', icon: MessageSquare, desc: 'Real-time customer support', color: 'text-blue-500', bg: 'bg-blue-50' },
  { label: 'Knowledge Base', href: '/finance/support/knowledge-base', icon: BookOpenCheck, desc: 'Articles & documentation', color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { label: 'Analytics', href: '/finance/support/analysis', icon: BarChart, desc: 'Support performance metrics', color: 'text-violet-500', bg: 'bg-violet-50' },
  { label: 'SLA', href: '/finance/support/sla', icon: SlidersHorizontal, desc: 'SLA policies & tracking', color: 'text-rose-500', bg: 'bg-rose-50' },
];

export default function SupportHomePage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white-800">Support Home</h1>
        <p className="text-gray-500 text-sm mt-1">Customer support operations dashboard</p>
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="text-gray-500 text-sm mb-2">{s.label}</div>
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {modules.map(m => (
          <Link key={m.label} href={m.href}>
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex items-center gap-4">
              <div className={`p-3 rounded-xl ${m.bg}`}><m.icon className={`w-5 h-5 ${m.color}`} /></div>
              <div>
                <div className="text-gray-800 font-semibold text-sm">{m.label}</div>
                <div className="text-gray-400 text-xs">{m.desc}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
