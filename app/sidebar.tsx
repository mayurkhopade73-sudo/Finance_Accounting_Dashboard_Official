'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Users, UserCircle, BookOpen, Target, Briefcase,
  FileText, ShoppingCart, TrendingUp, TrendingDown, BookMarked,
  DollarSign, Building2, BarChart2, Package, LineChart, Receipt,
  Calculator, Bot, FileCog, ShieldCheck, Globe, Link2, Settings,
  Search, ChevronLeft, ChevronRight, Headphones, Ticket, MessageSquare,
  BookOpenCheck, BarChart, SlidersHorizontal
} from 'lucide-react';

type NavItem = { label: string; href: string; icon: React.ElementType };
type NavSection = { title?: string; badge?: string; items: NavItem[] };

const sections: NavSection[] = [
  {
    items: [
      { label: 'Dashboard', href: '/finance', icon: LayoutDashboard },
      { label: 'Accounts', href: '/finance/account', icon: UserCircle },
      { label: 'Customers', href: '/finance/customer', icon: Users },
      { label: 'Contacts', href: '/finance/contacts', icon: BookOpen },
      { label: 'Leads', href: '/finance/leads', icon: Target },
      { label: 'Opportunities', href: '/finance/opportunities', icon: Briefcase },
    ],
  },
  {
    title: 'Sales',
    items: [
      { label: 'Quotes', href: '/finance/quotes', icon: FileText },
      { label: 'Orders', href: '/finance/orders', icon: ShoppingCart },
    ],
  },
  {
    title: 'Basic Features',
    badge: 'BASIC',
    items: [
      { label: 'ROI', href: '/finance/roi', icon: TrendingUp },
      { label: 'Content', href: '/finance/content', icon: BookMarked },
    ],
  },
  {
    title: 'Support',
    items: [
      { label: 'Support Home', href: '/finance/support', icon: Headphones },
      { label: 'Tickets', href: '/finance/support/tickets', icon: Ticket },
      { label: 'Live Chat', href: '/finance/support/live-chat', icon: MessageSquare },
      { label: 'Knowledge Base', href: '/finance/support/knowledge-base', icon: BookOpenCheck },
      { label: 'SLA', href: '/finance/support/sla', icon: SlidersHorizontal },
      { label: 'Support Analytics', href: '/finance/support/analysis', icon: BarChart },
      { label: 'Products', href: '/finance/products', icon: Package },
    ],
  },
  {
    title: 'Account & Finance',
    items: [
      { label: 'General Ledger', href: '/finance/general-ledger', icon: BookMarked },
      { label: 'Accounts Payable', href: '/finance/accounts-payable', icon: TrendingDown },
      { label: 'Accounts Receivable', href: '/finance/accounts-receivable', icon: TrendingUp },
      { label: 'Cash Management', href: '/finance/cash-management', icon: DollarSign },
      { label: 'Budget Management', href: '/finance/budgets', icon: BarChart2 },
      { label: 'Asset Management', href: '/finance/asset-management', icon: Building2 },
      { label: 'Financial Reporting', href: '/finance/reports', icon: LineChart },
      { label: 'Cost Accounting', href: '/finance/cost-accounting', icon: Calculator },
      { label: 'Financial Analytics', href: '/finance/analytics', icon: Bot },
      { label: 'Tax Management', href: '/finance/tax', icon: Receipt },
      { label: 'Compliance & Audit', href: '/finance/compliance-audit', icon: ShieldCheck },
      { label: 'Global Operations', href: '/finance/global-operations', icon: Globe },
      { label: 'Integrations', href: '/finance/integrations', icon: Link2 },
    ],
  },
];

const settingsItem: NavItem = { label: 'Settings', href: '/finance/settings', icon: Settings };

function NavItemRow({ item, isActive, collapsed }: { item: NavItem; isActive: boolean; collapsed: boolean }) {
  return (
    <Link href={item.href} title={collapsed ? item.label : undefined}>
      <div className={`flex items-center gap-3 rounded-lg text-sm cursor-pointer transition-colors ${collapsed ? 'justify-center p-2' : 'px-3 py-2'} ${isActive ? 'bg-black text-white font-semibold' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}>
        <item.icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-400'}`} />
        {!collapsed && <span className="truncate">{item.label}</span>}
      </div>
    </Link>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch] = useState('');

  const isActive = (href: string) =>
    pathname === href || (href !== '/finance' && pathname.startsWith(href + '/'));

  const allItems = sections.flatMap(s => s.items).concat([settingsItem]);
  const filtered = search ? allItems.filter(i => i.label.toLowerCase().includes(search.toLowerCase())) : null;

  return (
    <aside className={`${collapsed ? 'w-16' : 'w-64'} bg-white border-r border-gray-200 flex flex-col h-full flex-shrink-0 transition-all duration-300 relative`}>
      {/* Logo */}
      <div className="flex items-center justify-between h-20 px-2 py-4 border-b border-gray-200 min-h-[57px]">
        {!collapsed && (
          <button onClick={() => window.open('https://www.cognexiaai.com/')} className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">

            <span className="font-bold text-gray-900 text-sm tracking-tight">
              <img src="/logo.png" alt="Cognexia AI" className="w-50 mt-4" />
            </span>
          </button>
        )}
        {collapsed && (
          <button onClick={() => window.open('https://www.cognexia.com')} className="w-10 flex items-center justify-center mx-auto cursor-pointer">
            <img src="/logo2.png" alt="Cognexia AI" className=" " />
          </button>
        )}
        {!collapsed && (
          <button onClick={() => setCollapsed(true)} className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>


      {/* Expand button when collapsed */}
      {collapsed && (
        <button onClick={() => setCollapsed(false)} className="absolute -right-3 top-[18px] bg-white border border-gray-200 rounded-full p-0.5 shadow-sm hover:bg-gray-50 text-gray-400 z-50 w-6 h-6 flex items-center justify-center">
          <ChevronRight className="w-3 h-3" />
        </button>
      )}

      {/* Search */}
      {!collapsed && (
        <div className="px-3 py-3 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search features..."
              className="w-full bg-gray-100 rounded-lg pl-8 pr-3 py-2 text-sm text-gray-500 placeholder-gray-400 border-0 focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-2">
        {filtered ? (
          <div className="space-y-0.5">
            {filtered.map(item => <NavItemRow key={item.href} item={item} isActive={isActive(item.href)} collapsed={collapsed} />)}
          </div>
        ) : (
          <>
            {sections.map((section, idx) => (
              <div key={idx}>
                {section.title && !collapsed && (
                  <div className="flex items-center gap-2 px-3 pt-3 pb-1">
                    <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{section.title}</span>
                    {section.badge && <span className="text-[9px] font-semibold bg-gray-200 text-gray-500 px-1.5 py-0.5 rounded">{section.badge}</span>}
                  </div>
                )}
                <div className="space-y-0.5">
                  {section.items.map(item => <NavItemRow key={item.href} item={item} isActive={isActive(item.href)} collapsed={collapsed} />)}
                </div>
              </div>
            ))}
            <div className="mt-1 pt-1 border-t border-gray-100">
              <NavItemRow item={settingsItem} isActive={isActive(settingsItem.href)} collapsed={collapsed} />
            </div>
          </>
        )}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-200 px-3 py-3">
        {!collapsed ? (
          <>
            <div className="flex items-center gap-1.5 flex-wrap mb-2">
              <span className="bg-blue-600 text-white text-[10px] px-2.5 py-0.5 rounded-full font-medium">CMMI Level 5</span>
              <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-medium">ISO 27001</span>
              <span className="bg-purple-100 text-purple-700 text-[10px] px-2 py-0.5 rounded-full font-medium">SOC 2</span>
            </div>
            {/* <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-[10px] font-bold">N</span>
              </div>
              
            </div> */}
          </>
        ) : (
          <div className="w-7 h-7 bg-gray-800 rounded-full flex items-center justify-center mx-auto">
            <span className="text-white text-[10px] font-bold">N</span>
          </div>
        )}
      </div>
    </aside>
  );
}
