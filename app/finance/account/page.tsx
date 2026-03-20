// 'use client';
// import { useState } from 'react';
// import { Modal, Toast, FormField, inputCls } from '../../components/Modal';

// const activity = [
//   { action: 'Invoice INV-2046 created', time: 'Mar 12, 09:15', type: 'Invoice' },
//   { action: 'Payment approved — BILL-0091', time: 'Mar 12, 08:42', type: 'Payment' },
//   { action: 'Report exported — P&L Q1', time: 'Mar 11, 17:30', type: 'Report' },
//   { action: 'Budget modified — Technology', time: 'Mar 11, 11:05', type: 'Budget' },
// ];

// export default function AccountPage() {
//   const [showEdit, setShowEdit] = useState(false);
//   const [toast, setToast] = useState('');
//   const [profile, setProfile] = useState({ name: 'User1', email: 'user123@gmail.com', phone: '+91 98765 43210',  company: 'Cognexia.AI' });
//   const [form, setForm] = useState({ ...profile });

//   const handleSave = () => {
//     setProfile({ ...form });
//     setShowEdit(false);
//     setToast('Profile updated successfully!');
//   };

//   return (
//     <div className="p-6 space-y-6">
//       {toast && <Toast message={toast} onDone={() => setToast('')} />}
//       <h1 className="text-2xl font-bold text-gray-800">My Account</h1>
//       <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex items-start gap-6">
//         <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
//           <span className="text-white text-2xl font-bold">U</span>
//         </div>
//         <div className="flex-1">
//           <div className="text-gray-800 text-xl font-bold">{profile.name}</div>
//           <div className="text-gray-500 text-sm mt-0.5">{profile.role} — {profile.company}</div>
//           <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
//             <div><span className="text-gray-400 text-xs uppercase">Email</span><p className="text-gray-700 mt-0.5">{profile.email}</p></div>
//             <div><span className="text-gray-400 text-xs uppercase">Phone</span><p className="text-gray-700 mt-0.5">{profile.phone}</p></div>
//           </div>
//           <button onClick={() => { setForm({ ...profile }); setShowEdit(true); }} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Edit Profile</button>
//         </div>
//       </div>

//       <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
//         <div className="px-4 py-3 border-b border-gray-100"><h2 className="text-gray-800 font-semibold text-sm">Recent Activity</h2></div>
//         <table className="w-full">
//           <thead><tr className="bg-gray-50 border-b border-gray-100">{['Action','Time','Type'].map(h=><th key={h} className="text-left text-gray-500 text-xs font-medium px-4 py-3">{h}</th>)}</tr></thead>
//           <tbody className="divide-y divide-gray-100">
//             {activity.map((a,i) => (
//               <tr key={i} className="hover:bg-gray-50">
//                 <td className="px-4 py-3.5 text-gray-800 text-sm">{a.action}</td>
//                 <td className="px-4 py-3.5 text-gray-500 text-sm">{a.time}</td>
//                 <td className="px-4 py-3.5"><span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">{a.type}</span></td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <Modal open={showEdit} onClose={() => setShowEdit(false)} title="Edit Profile">
//         <div className="space-y-4">
//           <FormField label="Full Name"><input className={inputCls} value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} /></FormField>
//           <FormField label="Email"><input type="email" className={inputCls} value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} /></FormField>
//           <FormField label="Phone"><input className={inputCls} value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} /></FormField>
//           <FormField label="Role"><input className={inputCls} value={form.role} onChange={e=>setForm(f=>({...f,role:e.target.value}))} /></FormField>
//           <div className="flex gap-3 pt-2">
//             <button onClick={() => setShowEdit(false)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
//             <button onClick={handleSave} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Save Changes</button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// }



'use client';
import { useState, useMemo } from 'react';
import { Shield } from 'lucide-react';
import { Modal, Toast, FormField, inputCls } from '../../components/Modal';

const allActivity = [
  { action: 'Invoice INV-2046 created', time: 'Mar 12, 09:15', type: 'Invoice' },
  { action: 'Payment approved — BILL-0091', time: 'Mar 12, 08:42', type: 'Payment' },
  { action: 'Report exported — P&L Q1', time: 'Mar 11, 17:30', type: 'Report' },
  { action: 'Budget modified — Technology', time: 'Mar 11, 11:05', type: 'Budget' },
  { action: 'Invoice INV-2047 created', time: 'Mar 10, 14:20', type: 'Invoice' },
  { action: 'Payment approved — BILL-0092', time: 'Mar 10, 10:15', type: 'Payment' },
  { action: 'Report exported — Cash Flow Mar', time: 'Mar 09, 16:00', type: 'Report' },
  { action: 'Budget created — Marketing Q2', time: 'Mar 09, 13:45', type: 'Budget' },
  { action: 'Invoice INV-2048 created', time: 'Mar 08, 11:30', type: 'Invoice' },
  { action: 'Payment approved — BILL-0093', time: 'Mar 08, 10:00', type: 'Payment' },
  { action: 'Invoice INV-2049 sent to client', time: 'Mar 07, 15:20', type: 'Invoice' },
  { action: 'Report exported — Balance Sheet', time: 'Mar 07, 12:10', type: 'Report' },
  { action: 'Budget modified — Operations', time: 'Mar 06, 17:55', type: 'Budget' },
  { action: 'Payment approved — BILL-0094', time: 'Mar 06, 09:30', type: 'Payment' },
  { action: 'Invoice INV-2050 created', time: 'Mar 05, 14:00', type: 'Invoice' },
  { action: 'Report exported — Revenue Q1', time: 'Mar 05, 11:25', type: 'Report' },
  { action: 'Budget approved — HR Department', time: 'Mar 04, 16:40', type: 'Budget' },
  { action: 'Payment approved — BILL-0095', time: 'Mar 04, 08:55', type: 'Payment' },
  { action: 'Invoice INV-2051 created', time: 'Mar 03, 13:10', type: 'Invoice' },
  { action: 'Report exported — Expense Summary', time: 'Mar 03, 10:30', type: 'Report' },
  { action: 'Budget modified — Sales Q2', time: 'Mar 02, 15:00', type: 'Budget' },
  { action: 'Payment approved — BILL-0096', time: 'Mar 02, 09:15', type: 'Payment' },
  { action: 'Invoice INV-2052 created', time: 'Mar 01, 14:45', type: 'Invoice' },
  { action: 'Report exported — P&L Feb', time: 'Mar 01, 11:00', type: 'Report' },
  { action: 'Budget created — Infrastructure', time: 'Feb 28, 16:20', type: 'Budget' },
  { action: 'Payment approved — BILL-0097', time: 'Feb 28, 08:40', type: 'Payment' },
  { action: 'Invoice INV-2053 sent to client', time: 'Feb 27, 13:30', type: 'Invoice' },
  { action: 'Report exported — Tax Summary', time: 'Feb 27, 10:15', type: 'Report' },
  { action: 'Budget modified — R&D Division', time: 'Feb 26, 15:50', type: 'Budget' },
  { action: 'Payment approved — BILL-0098', time: 'Feb 26, 09:00', type: 'Payment' },
];
const stats = [
  { label: 'Revenue (MTD)', value: '₹1,24,000' },
  { label: 'Invoices', value: '32' },
  { label: 'Pending', value: '₹45,000' },
  { label: 'Overdue', value: '₹12,000' },
];

const TABS = ['Profile', 'Security', 'Billing', 'Activity'];
const FILTERS = ['All', 'Invoice', 'Payment', 'Report', 'Budget'];
const PAGE_SIZE = 2;

export default function AccountPage() {
  const [showEdit, setShowEdit] = useState(false);
  const [toast, setToast] = useState('');
  const [activeTab, setActiveTab] = useState('Profile');

  const [profile, setProfile] = useState({
    name: 'User1',
    email: 'user123@gmail.com',
    phone: '+91 98765 43210',
    company: 'Cognexia.AI',
    role: 'Admin',
  });

  const [form, setForm] = useState({ ...profile });

  // Activity state
  const [viewMode, setViewMode] = useState('pagination'); // 'pagination' | 'infinite'
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [page, setPage] = useState(0);
  const [infiniteCount, setInfiniteCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    return allActivity.filter((a) => {
      const matchType = filter === 'All' || a.type === filter;
      const matchSearch =
        search === '' ||
        a.action.toLowerCase().includes(search.toLowerCase()) ||
        a.type.toLowerCase().includes(search.toLowerCase());
      return matchType && matchSearch;
    });
  }, [filter, search]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pagedItems =
    viewMode === 'pagination'
      ? filtered.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)
      : filtered.slice(0, infiniteCount);

  const handleSave = () => {
    setProfile({ ...form });
    setShowEdit(false);
    setToast('Profile updated successfully!');
  };

  return (
    <div className="p-4 md:p-6 space-y-4">
      {toast && <Toast message={toast} onDone={() => setToast('')} />}

      {/* ── Profile Header Card ── */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-5 shadow-sm flex items-center gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white text-xl font-bold">U</span>
        </div>

        {/* Name / role / status */}
        <div className="flex-1 min-w-0">
          <div className="text-gray-900 text-base md:text-lg font-bold leading-tight">
            {profile.name}
          </div>
          <div className="text-gray-500 text-sm mt-0.5">
            {profile.role} — {profile.company}
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
            <span className="text-green-600 text-xs font-medium">Active</span>
          </div>
        </div>

        {/* Edit button top-right */}
        <button
          onClick={() => {
            setForm({ ...profile });
            setShowEdit(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex-shrink-0"
        >
          Edit Profile
        </button>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
          >
            <div className="text-gray-500 text-xs">{s.label}</div>
            <div className="text-gray-900 text-lg font-bold mt-1">{s.value}</div>
          </div>
        ))}
      </div>

      {/* ── Tabs + Content ── */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {/* Tab bar */}
        <div className="flex border-b border-gray-100 px-4">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setPage(0);
                setSearch('');
                setFilter('All');
              }}
              className={`px-3 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Profile Tab ── */}
        {activeTab === 'Profile' && (
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400 text-xs uppercase">Email</span>
              <p className="text-gray-800 mt-0.5 break-all">{profile.email}</p>
            </div>
            <div>
              <span className="text-gray-400 text-xs uppercase">Phone</span>
              <p className="text-gray-800 mt-0.5">{profile.phone}</p>
            </div>
          </div>
        )}

        {/* ── Security Tab ── */}
        {activeTab === 'Security' && (
          <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Shield size={15} />
                <span>Two-Factor Authentication</span>
              </div>
              <button className="px-3 py-2 border rounded-lg text-sm">Enable 2FA</button>
            </div>
          )}

        {/* ── Billing Tab ── */}
        {activeTab === 'Billing' && (
          <div className="p-6 text-sm text-gray-500">
            Billing information coming soon.
          </div>
        )}

        {/* ── Activity Tab ── */}
        {activeTab === 'Activity' && (
          <div className="p-4 space-y-3">
            {/* pagination / infinite toggle */}
            <div className="flex gap-2">
              {['pagination', 'infinite'].map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setViewMode(m);
                    setPage(0);
                    setInfiniteCount(PAGE_SIZE);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    viewMode === m
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            {/* Search + Filter row */}
            <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
              <input
                type="text"
                placeholder="Search activity..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(0);
                }}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-56"
              />
              <div className="flex gap-2 flex-wrap">
                {FILTERS.map((f) => (
                  <button
                    key={f}
                    onClick={() => {
                      setFilter(f);
                      setPage(0);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      filter === f
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Activity list */}
            <div className="divide-y divide-gray-100">
              {pagedItems.length === 0 ? (
                <p className="text-gray-400 text-sm py-4 text-center">
                  No activity found.
                </p>
              ) : (
                pagedItems.map((a, i) => (
                  <div key={i} className="flex items-start gap-3 py-3">
                    {/* icon */}
                    <div className="mt-0.5 text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h5l5 5v11a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-gray-800 text-sm font-medium">
                        {a.action}
                      </div>
                      <div className="text-gray-400 text-xs mt-0.5">
                        {a.time} &bull; {a.type}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination controls */}
            {viewMode === 'pagination' && (
              <div className="flex gap-2 pt-1">
                <button
                  disabled={page === 0}
                  onClick={() => setPage((p) => p - 1)}
                  className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Prev
                </button>
                <button
                  disabled={page >= totalPages - 1}
                  onClick={() => setPage((p) => p + 1)}
                  className="px-4 py-2 text-sm rounded-lg border border-gray-200 bg-white text-gray-800 font-medium hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}

            {/* Load more for infinite */}
            {viewMode === 'infinite' && infiniteCount < filtered.length && (
              <button
                onClick={() => setInfiniteCount((c) => c + PAGE_SIZE)}
                className="w-full py-2 text-sm text-blue-600 hover:underline"
              >
                Load more
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── Edit Profile Modal ── */}
      <Modal open={showEdit} onClose={() => setShowEdit(false)} title="Edit Profile">
        <div className="space-y-4">
          <FormField label="Full Name">
            <input
              className={inputCls}
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
          </FormField>

          <FormField label="Email">
            <input
              type="email"
              className={inputCls}
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            />
          </FormField>

          <FormField label="Phone">
            <input
              className={inputCls}
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            />
          </FormField>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setShowEdit(false)}
              className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}






