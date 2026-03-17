'use client';
import { useState } from 'react';
import { Toast } from '../../../components/Modal';
import { useRouter } from 'next/navigation';

export default function NewExpensePage() {
  const router = useRouter();
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({ desc: '', category: 'Technology', amount: '', date: '', notes: '', receipt: '' });

  const handleSubmit = () => {
    if (!form.desc || !form.amount) { setToast('Please fill required fields'); return; }
    setToast('Expense submitted for approval!');
    setTimeout(() => router.push('/finance/expenses'), 1500);
  };

  return (
    <div className="p-6 max-w-xl space-y-6">
      {toast && <Toast message={toast} onDone={() => setToast('')} />}
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-800">New Expense</h1><p className="text-gray-500 text-sm mt-1">Submit an expense for approval</p></div>
        <button onClick={() => router.back()} className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">← Back</button>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
        {[['Description *','text','desc','e.g. Team lunch'],['Amount ($) *','number','amount','e.g. 1200'],['Date','date','date',''],['Notes','text','notes','Optional notes']].map(([label, type, field, placeholder]) => (
          <div key={field as string}>
            <label className="block text-gray-500 text-xs font-medium uppercase tracking-wide mb-1.5">{label as string}</label>
            <input type={type as string} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-blue-400" placeholder={placeholder as string} value={(form as any)[field as string]} onChange={e => setForm(f => ({...f, [field as string]: e.target.value}))} />
          </div>
        ))}
        <div>
          <label className="block text-gray-500 text-xs font-medium uppercase tracking-wide mb-1.5">Category</label>
          <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none bg-white" value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))}>
            <option>Technology</option><option>Travel</option><option>Entertainment</option><option>Admin</option><option>Marketing</option><option>Other</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-500 text-xs font-medium uppercase tracking-wide mb-1.5">Receipt Upload</label>
          <div className="border-2 border-dashed border-gray-200 rounded-lg px-4 py-6 text-center cursor-pointer hover:border-blue-400 transition-colors" onClick={() => { const i = document.createElement('input'); i.type='file'; i.accept='image/*,.pdf'; i.onchange=(e:any)=>{ if(e.target.files[0]) { setForm(f=>({...f,receipt:e.target.files[0].name})); setToast(`File "${e.target.files[0].name}" attached!`); } }; i.click(); }}>
            {form.receipt ? <p className="text-emerald-600 text-sm font-medium">✓ {form.receipt}</p> : <><p className="text-gray-400 text-sm">Click to upload receipt</p><p className="text-gray-300 text-xs mt-1">JPG, PNG or PDF</p></>}
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button onClick={() => router.back()} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
          <button onClick={handleSubmit} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Submit Expense</button>
        </div>
      </div>
    </div>
  );
}
