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
import { useState } from 'react';
import { Modal, Toast, FormField, inputCls } from '../../components/Modal';

const activity = [
  { action: 'Invoice INV-2046 created', time: 'Mar 12, 09:15', type: 'Invoice' },
  { action: 'Payment approved — BILL-0091', time: 'Mar 12, 08:42', type: 'Payment' },
  { action: 'Report exported — P&L Q1', time: 'Mar 11, 17:30', type: 'Report' },
  { action: 'Budget modified — Technology', time: 'Mar 11, 11:05', type: 'Budget' },
];

export default function AccountPage() {
  const [showEdit, setShowEdit] = useState(false);
  const [toast, setToast] = useState('');
  const [profile, setProfile] = useState({
    name: 'User1',
    email: 'user123@gmail.com',
    phone: '+91 98765 43210',
    company: 'Cognexia.AI',
    role: 'Admin'
  });

  const [form, setForm] = useState({ ...profile });

  const handleSave = () => {
    setProfile({ ...form });
    setShowEdit(false);
    setToast('Profile updated successfully!');
  };

  return (
    <div className="p-4 md:p-6 space-y-6">

      {toast && <Toast message={toast} onDone={() => setToast('')} />}

      <h1 className="text-xl md:text-2xl font-bold text-white-800">
        My Account
      </h1>

      {/* Profile Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 shadow-sm flex flex-col md:flex-row items-start gap-4 md:gap-6">

        <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white text-xl md:text-2xl font-bold">U</span>
        </div>

        <div className="flex-1 w-full">
          <div className="text-gray-800 text-lg md:text-xl font-bold">
            {profile.name}
          </div>

          <div className="text-gray-500 text-sm mt-0.5">
            {profile.role} — {profile.company}
          </div>

          {/* Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm">

            <div>
              <span className="text-gray-400 text-xs uppercase">Email</span>
              <p className="text-gray-700 mt-0.5 break-all">{profile.email}</p>
            </div>

            <div>
              <span className="text-gray-400 text-xs uppercase">Phone</span>
              <p className="text-gray-700 mt-0.5">{profile.phone}</p>
            </div>

          </div>

          <button
            onClick={() => {
              setForm({ ...profile });
              setShowEdit(true);
            }}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Activity Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

        <div className="px-4 py-3 border-b border-gray-100">
          <h2 className="text-gray-800 font-semibold text-sm">
            Recent Activity
          </h2>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {['Action', 'Time', 'Type'].map((h) => (
                  <th
                    key={h}
                    className="text-left text-gray-500 text-xs font-medium px-4 py-3"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {activity.map((a, i) => (
                <tr key={i} className="hover:bg-gray-50">

                  <td className="px-4 py-3.5 text-gray-800 text-sm">
                    {a.action}
                  </td>

                  <td className="px-4 py-3.5 text-gray-500 text-sm whitespace-nowrap">
                    {a.time}
                  </td>

                  <td className="px-4 py-3.5">
                    <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">
                      {a.type}
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>

      {/* Modal */}
      <Modal open={showEdit} onClose={() => setShowEdit(false)} title="Edit Profile">

        <div className="space-y-4">

          <FormField label="Full Name">
            <input
              className={inputCls}
              value={form.name}
              onChange={(e) =>
                setForm((f) => ({ ...f, name: e.target.value }))
              }
            />
          </FormField>

          <FormField label="Email">
            <input
              type="email"
              className={inputCls}
              value={form.email}
              onChange={(e) =>
                setForm((f) => ({ ...f, email: e.target.value }))
              }
            />
          </FormField>

          <FormField label="Phone">
            <input
              className={inputCls}
              value={form.phone}
              onChange={(e) =>
                setForm((f) => ({ ...f, phone: e.target.value }))
              }
            />
          </FormField>

          <FormField label="Role">
            <input
              className={inputCls}
              value={form.role}
              onChange={(e) =>
                setForm((f) => ({ ...f, role: e.target.value }))
              }
            />
          </FormField>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">

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
              Save Changes
            </button>

          </div>

        </div>

      </Modal>
    </div>
  );
}