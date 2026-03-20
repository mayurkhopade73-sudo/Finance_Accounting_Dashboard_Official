'use client';
import { useState } from 'react';
import { Plus, Search, Eye, Edit2, X } from 'lucide-react';
import { Modal, Toast, FormField, inputCls, selectCls } from '../../components/Modal';

const initContent = [
  { id: 'CNT-001', title: 'Q1 2026 Financial Review', type: 'Report', author: 'Super Admin', status: 'Published', date: 'Mar 11, 2026', views: 142, body: 'Q1 2026 financial performance summary. Revenue grew 18% YoY to $2.05M. Expenses controlled at $1.47M. Net profit $580K.' },
  { id: 'CNT-002', title: 'Accounts Payable Best Practices', type: 'Guide', author: 'Finance Manager', status: 'Published', date: 'Mar 08, 2026', views: 98, body: 'This guide covers AP best practices including 3-way matching, early payment discounts, and vendor management.' },
  { id: 'CNT-003', title: 'GST Filing Checklist 2026', type: 'Checklist', author: 'Tax Team', status: 'Draft', date: 'Mar 05, 2026', views: 0, body: 'Step-by-step GST filing checklist for FY 2025-26.' },
  { id: 'CNT-004', title: 'New Employee Finance Onboarding', type: 'Guide', author: 'HR Manager', status: 'Published', date: 'Feb 28, 2026', views: 56, body: 'Finance onboarding guide for new employees covering expense policies, approval workflows, and budget access.' },
];

const typeStyle: Record<string,string> = {
  Report:'bg-blue-50 text-blue-700 border border-blue-200', Guide:'bg-violet-50 text-violet-700 border border-violet-200',
  Checklist:'bg-amber-50 text-amber-700 border border-amber-200', Template:'bg-emerald-50 text-emerald-700 border border-emerald-200',
};

export default function ContentPage() {
  const [content, setContent] = useState(initContent);
  const [search, setSearch] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [viewItem, setViewItem] = useState<typeof initContent[0]|null>(null);
  const [editItem, setEditItem] = useState<typeof initContent[0]|null>(null);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({ title: '', type: 'Guide', status: 'Draft', body: '', author: '', category: '', publicationDate: '', tags: [] as string[], tagInput: '' });
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const filtered = content.filter(c => c.title.toLowerCase().includes(search.toLowerCase()));

  const handleCreate = () => {
  const newErrors: Record<string, boolean> = {};
  if (!form.title) newErrors.title = true;
  if (!form.author) newErrors.author = true;
  if (!form.category) newErrors.category = true;
  if (!form.status) newErrors.status = true;
  if (!form.publicationDate) newErrors.publicationDate = true;
  if (!form.body) newErrors.body = true;
  if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
  const now = new Date().toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'});
  setContent(prev => [...prev, { id: `CNT-00${prev.length+1}`, title: form.title, type: form.type, status: form.status, body: form.body, author: form.author, date: now, views: 0 }]);
  setForm({ title: '', type: 'Guide', status: 'Draft', body: '', author: '', category: '', publicationDate: '', tags: [], tagInput: '' });
  setErrors({});
  setShowCreate(false);
  setToast('Content created!');
};

  const handleEditSave = () => {
    if (!editItem) return;
    setContent(prev => prev.map(c => c.id === editItem.id ? editItem : c));
    setEditItem(null);
    setToast('Content updated!');
  };

  return (
    <div className="p-6 space-y-6">
      {toast && <Toast message={toast} onDone={() => setToast('')} />}
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-white-800">Content</h1><p className="text-gray-500 text-sm mt-1">Manage guides, reports and templates</p></div>
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"><Plus className="w-4 h-4" /> New Content</button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {[{label:'Total',value:content.length},{label:'Published',value:content.filter(c=>c.status==='Published').length},{label:'Drafts',value:content.filter(c=>c.status==='Draft').length},{label:'Total Views',value:content.reduce((s,c)=>s+c.views,0)}].map(s=>
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"><div className="text-gray-500 text-sm mb-1">{s.label}</div><div className="text-2xl font-bold text-gray-800">{s.value}</div></div>
        )}
      </div>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="relative max-w-sm"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search content..." className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none" /></div>
        </div>
        <table className="w-full">
          <thead><tr className="bg-gray-50 border-b border-gray-100">{['ID','Title','Type','Author','Status','Date','Views','Actions'].map(h=><th key={h} className="text-left text-gray-500 text-xs font-medium px-4 py-3">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map(c=>(
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-4 py-3.5 text-blue-600 text-sm font-mono">{c.id}</td>
                <td className="px-4 py-3.5 text-gray-800 text-sm font-medium">{c.title}</td>
                <td className="px-4 py-3.5"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeStyle[c.type]}`}>{c.type}</span></td>
                <td className="px-4 py-3.5 text-gray-600 text-sm">{c.author}</td>
                <td className="px-4 py-3.5"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${c.status==='Published'?'bg-emerald-50 text-emerald-700 border border-emerald-200':'bg-gray-100 text-gray-600'}`}>{c.status}</span></td>
                <td className="px-4 py-3.5 text-gray-500 text-sm">{c.date}</td>
                <td className="px-4 py-3.5 text-gray-500 text-sm">{c.views}</td>
                <td className="px-4 py-3.5 flex gap-1.5">
                  <button onClick={()=>setViewItem(c)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"><Eye className="w-3.5 h-3.5" /></button>
                  <button onClick={()=>setEditItem({...c})} className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={showCreate} onClose={()=>{ setShowCreate(false); setErrors({}); }} title="New Content" size="lg">
  <div className="space-y-4">

    {/* Row 1 - Title + Author */}
    <div className="grid grid-cols-2 gap-3">
      <FormField label="Title">
        <input
          className={`${inputCls} ${errors.title ? 'border-red-500 focus:border-red-500' : ''}`}
          value={form.title} onChange={e=>{ setForm(f=>({...f,title:e.target.value})); setErrors(er=>({...er,title:false})); }}
          placeholder="Content title"
        />
        {errors.title && <p className="text-red-500 text-xs mt-1">Title is required</p>}
      </FormField>
      <FormField label="Author">
        <select
          className={`${selectCls} ${errors.author ? 'border-red-500' : ''}`}
          value={form.author} onChange={e=>{ setForm(f=>({...f,author:e.target.value})); setErrors(er=>({...er,author:false})); }}
        >
          <option value="">Select Author...</option>
          <option>Anjali Sharma</option>
          <option>Rohit Kumar</option>
          <option>Super Admin</option>
          <option>Finance Manager</option>
        </select>
        {errors.author && <p className="text-red-500 text-xs mt-1">Author is required</p>}
      </FormField>
    </div>

    {/* Row 2 - Type + Category */}
    <div className="grid grid-cols-2 gap-3">
      <FormField label="Type">
        <select className={selectCls} value={form.type} onChange={e=>setForm(f=>({...f,type:e.target.value}))}>
          <option>Guide</option><option>Report</option><option>Checklist</option><option>Template</option>
        </select>
      </FormField>
      <FormField label="Category">
        <select
          className={`${selectCls} ${errors.category ? 'border-red-500' : ''}`}
          value={form.category} onChange={e=>{ setForm(f=>({...f,category:e.target.value})); setErrors(er=>({...er,category:false})); }}
        >
          <option value="">Select Category...</option>
          <option>Financial Procedures</option>
          <option>Accounts Payable</option>
          <option>Internal Audit</option>
          <option>Compliance</option>
          <option>Onboarding</option>
        </select>
        {errors.category && <p className="text-red-500 text-xs mt-1">Category is required</p>}
      </FormField>
    </div>

    {/* Row 3 - Status + Publication Date */}
    <div className="grid grid-cols-2 gap-3">
      <FormField label="Status">
        <select
          className={`${selectCls} ${errors.status ? 'border-red-500' : ''}`}
          value={form.status} onChange={e=>{ setForm(f=>({...f,status:e.target.value})); setErrors(er=>({...er,status:false})); }}
        >
          <option>Draft</option><option>Published</option>
        </select>
        {errors.status && <p className="text-red-500 text-xs mt-1">Status is required</p>}
      </FormField>
      <FormField label="Publication Date">
        <input
          type="date"
          className={`${inputCls} ${errors.publicationDate ? 'border-red-500' : ''}`}
          value={form.publicationDate} onChange={e=>{ setForm(f=>({...f,publicationDate:e.target.value})); setErrors(er=>({...er,publicationDate:false})); }}
        />
        {errors.publicationDate && <p className="text-red-500 text-xs mt-1">Publication date is required</p>}
      </FormField>
    </div>

    {/* Body with toolbar */}
    <FormField label="Body">
      <div className={`border rounded-lg overflow-hidden ${errors.body ? 'border-red-500' : 'border-gray-200'}`}>
        <div className="flex gap-1 px-2 py-1.5 bg-gray-50 border-b border-gray-200">
          {['B','I','U'].map(t=><button key={t} type="button" className={`w-6 h-6 text-xs font-${t==='B'?'bold':t==='I'?'italic':'normal'} text-gray-600 hover:bg-gray-200 rounded`}>{t}</button>)}
          <div className="w-px bg-gray-300 mx-1" />
          {['≡','⋮'].map(t=><button key={t} type="button" className="w-6 h-6 text-xs text-gray-600 hover:bg-gray-200 rounded">{t}</button>)}
        </div>
        <textarea
          rows={4} className="w-full px-3 py-2 text-sm focus:outline-none resize-none"
          value={form.body} onChange={e=>{ setForm(f=>({...f,body:e.target.value})); setErrors(er=>({...er,body:false})); }}
          placeholder="Write content here..."
        />
      </div>
      {errors.body && <p className="text-red-500 text-xs mt-1">Body is required</p>}
    </FormField>

    {/* Tags */}
    <FormField label="Tags">
      <div className="flex flex-wrap gap-1.5 px-3 py-2 border border-gray-200 rounded-lg min-h-[40px] bg-white">
        {form.tags.map(tag=>(
          <span key={tag} className="flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">
            {tag}
            <button type="button" onClick={()=>setForm(f=>({...f,tags:f.tags.filter(t=>t!==tag)}))}><X className="w-3 h-3" /></button>
          </span>
        ))}
        <input
          className="outline-none text-sm flex-1 min-w-[100px]"
          placeholder="Type and press Enter..."
          value={form.tagInput}
          onChange={e=>setForm(f=>({...f,tagInput:e.target.value}))}
          onKeyDown={e=>{ if(e.key==='Enter' && form.tagInput.trim()){ e.preventDefault(); setForm(f=>({...f,tags:[...f.tags, f.tagInput.trim()],tagInput:''})); }}}
        />
      </div>
    </FormField>

    <div className="flex gap-3 pt-2">
      <button onClick={()=>{ setShowCreate(false); setErrors({}); }} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
      <button onClick={handleCreate} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Create</button>
    </div>
  </div>
</Modal>

      <Modal open={!!viewItem} onClose={()=>setViewItem(null)} title={viewItem?.title||''} size="lg">
        {viewItem && <div className="space-y-3">
          <div className="flex gap-3">
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeStyle[viewItem.type]}`}>{viewItem.type}</span>
            <span className="text-gray-400 text-xs">By {viewItem.author} — {viewItem.date}</span>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">{viewItem.body}</p>
        </div>}
      </Modal>

      <Modal open={!!editItem} onClose={()=>setEditItem(null)} title="Edit Content" size="lg">
        {editItem && <div className="space-y-4">
          <FormField label="Title"><input className={inputCls} value={editItem.title} onChange={e=>setEditItem(i=>i?{...i,title:e.target.value}:i)} /></FormField>
          <FormField label="Status"><select className={selectCls} value={editItem.status} onChange={e=>setEditItem(i=>i?{...i,status:e.target.value}:i)}><option>Draft</option><option>Published</option></select></FormField>
          <FormField label="Body"><textarea rows={5} className={`${inputCls} resize-none`} value={editItem.body} onChange={e=>setEditItem(i=>i?{...i,body:e.target.value}:i)} /></FormField>
          <div className="flex gap-3 pt-2">
            <button onClick={()=>setEditItem(null)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
            <button onClick={handleEditSave} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Save</button>
          </div>
        </div>}
      </Modal>
    </div>
  );
}
