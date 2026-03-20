// 'use client';
// import { useState } from 'react';
// import { Plus, BookOpen, Search, ArrowLeft } from 'lucide-react';
// import { Modal, Toast, FormField, inputCls, selectCls } from '../../../components/Modal';

// const initArticles = [
//   { id: 'KB-001', title: 'How to create an invoice', category: 'Invoicing', views: 342, date: 'Mar 01, 2026', body: 'Navigate to Finance → Invoices → New Invoice. Fill in client details, add line items, set due date, and click Send Invoice.' },
//   { id: 'KB-002', title: 'Processing vendor payments', category: 'Payments', views: 218, date: 'Feb 28, 2026', body: 'Go to Accounts Payable, find the bill, click Pay Now, confirm the amount and payment method, then confirm.' },
//   { id: 'KB-003', title: 'Running financial reports', category: 'Reports', views: 189, date: 'Feb 25, 2026', body: 'Navigate to Finance → Reports. Select the report type, choose your date range, and click View or Download.' },
//   { id: 'KB-004', title: 'Setting up budget alerts', category: 'Budgets', views: 156, date: 'Feb 20, 2026', body: 'Go to Settings → Notifications. Enable Budget Alert to receive notifications when a department reaches 80% of its budget.' },
//   { id: 'KB-005', title: 'GST filing walkthrough', category: 'Tax', views: 203, date: 'Feb 15, 2026', body: 'Navigate to Finance → Tax. Upcoming filings will show in the table. Click File Now, review details, and confirm.' },
// ];

// const categories = [...new Set(initArticles.map(a => a.category))];

// export default function KnowledgeBasePage() {
//   const [articles, setArticles] = useState(initArticles);
//   const [search, setSearch] = useState('');
//   const [showCreate, setShowCreate] = useState(false);
//   const [viewArticle, setViewArticle] = useState<typeof initArticles[0]|null>(null);
//   const [toast, setToast] = useState('');
//   const [form, setForm] = useState({ title: '', category: 'Invoicing', body: '' });

//   const filtered = articles.filter(a => a.title.toLowerCase().includes(search.toLowerCase()) || a.category.toLowerCase().includes(search.toLowerCase()));

//   const handleCreate = () => {
//     if (!form.title || !form.body) return;
//     const now = new Date().toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'});
//     setArticles(prev => [...prev, { id: `KB-00${prev.length+1}`, ...form, views: 0, date: now }]);
//     setForm({ title: '', category: 'Invoicing', body: '' });
//     setShowCreate(false);
//     setToast('Article published!');
//   };

//   const openArticle = (article: typeof initArticles[0]) => {
//     setArticles(prev => prev.map(a => a.id === article.id ? { ...a, views: a.views + 1 } : a));
//     setViewArticle(article);
//   };

//   return (
//     <div className="p-6 space-y-6">
//       {toast && <Toast message={toast} onDone={() => setToast('')} />}
//       <div className="flex items-center justify-between">
//         <div><h1 className="text-2xl font-bold text-white-800">Knowledge Base</h1><p className="text-gray-500 text-sm mt-1">Finance help articles and guides</p></div>
//         <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"><Plus className="w-4 h-4" /> New Article</button>
//       </div>

//       <div className="relative max-w-md">
//         <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//         <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search articles..." className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-gray-700 focus:outline-none shadow-sm" />
//       </div>

//       <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
//         {categories.map(cat => (
//           <div key={cat} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
//             <BookOpen className="w-5 h-5 text-blue-600 mb-2" />
//             <div className="text-gray-800 font-semibold text-sm">{cat}</div>
//             <div className="text-gray-400 text-xs mt-0.5">{articles.filter(a=>a.category===cat).length} articles</div>
//           </div>
//         ))}
//       </div>

//       <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
//         <div className="px-4 py-3 border-b border-gray-100 text-gray-700 font-semibold text-sm">All Articles</div>
//         {filtered.map(a => (
//           <div key={a.id} onClick={() => openArticle(a)} className="flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 cursor-pointer border-b border-gray-50 transition-colors">
//             <div>
//               <div className="text-gray-800 text-sm font-medium">{a.title}</div>
//               <div className="flex items-center gap-2 mt-0.5">
//                 <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">{a.category}</span>
//                 <span className="text-gray-400 text-xs">{a.views} views</span>
//                 <span className="text-gray-400 text-xs">· {a.date}</span>
//               </div>
//             </div>
//             <span className="text-blue-600 text-xs">Read →</span>
//           </div>
//         ))}
//       </div>

//       <Modal open={showCreate} onClose={()=>setShowCreate(false)} title="New Article" size="lg">
//         <div className="space-y-4">
//           <FormField label="Title"><input className={inputCls} value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} placeholder="Article title" /></FormField>
//           <FormField label="Category"><select className={selectCls} value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))}>{categories.map(c=><option key={c}>{c}</option>)}<option>General</option></select></FormField>
//           <FormField label="Content"><textarea rows={6} className={`${inputCls} resize-none`} value={form.body} onChange={e=>setForm(f=>({...f,body:e.target.value}))} placeholder="Write the article content here..." /></FormField>
//           <div className="flex gap-3 pt-2">
//             <button onClick={()=>setShowCreate(false)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
//             <button onClick={handleCreate} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Publish</button>
//           </div>
//         </div>
//       </Modal>

//       <Modal open={!!viewArticle} onClose={()=>setViewArticle(null)} title={viewArticle?.title||''} size="lg">
//         {viewArticle && <div className="space-y-3">
//           <div className="flex items-center gap-2">
//             <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">{viewArticle.category}</span>
//             <span className="text-gray-400 text-xs">{viewArticle.date}</span>
//           </div>
//           <p className="text-gray-700 text-sm leading-relaxed">{viewArticle.body}</p>
//         </div>}
//       </Modal>
//     </div>
//   );
// }


'use client';
import { useState } from 'react';
import { Plus, BookOpen, Search, ArrowLeft } from 'lucide-react';
import { Modal, Toast, FormField, inputCls, selectCls } from '../../../components/Modal';

const initArticles = [
  { id: 'KB-001', title: 'How to create an invoice', category: 'Invoicing', views: 342, date: 'Mar 01, 2026', body: 'Navigate to Finance → Invoices → New Invoice. Fill in client details, add line items, set due date, and click Send Invoice.' },
  { id: 'KB-002', title: 'Processing vendor payments', category: 'Payments', views: 218, date: 'Feb 28, 2026', body: 'Go to Accounts Payable, find the bill, click Pay Now, confirm the amount and payment method, then confirm.' },
  { id: 'KB-003', title: 'Running financial reports', category: 'Reports', views: 189, date: 'Feb 25, 2026', body: 'Navigate to Finance → Reports. Select the report type, choose your date range, and click View or Download.' },
  { id: 'KB-004', title: 'Setting up budget alerts', category: 'Budgets', views: 156, date: 'Feb 20, 2026', body: 'Go to Settings → Notifications. Enable Budget Alert to receive notifications when a department reaches 80% of its budget.' },
  { id: 'KB-005', title: 'GST filing walkthrough', category: 'Tax', views: 203, date: 'Feb 15, 2026', body: 'Navigate to Finance → Tax. Upcoming filings will show in the table. Click File Now, review details, and confirm.' },
];

const categories = [...new Set(initArticles.map(a => a.category))];

// ─── Types ────────────────────────────────────────────────────────────────────

type FormState = { title: string; category: string; body: string };
type FormErrors = { title?: string; body?: string };

const defaultForm: FormState = { title: '', category: 'Invoicing', body: '' };

// ─── Validation ───────────────────────────────────────────────────────────────

function validate(form: FormState): FormErrors {
  const errs: FormErrors = {};
  if (!form.title.trim()) errs.title = 'Title is required.';
  if (!form.body.trim()) errs.body = 'Content is required.';
  else if (form.body.trim().length < 10) errs.body = 'Content must be at least 10 characters.';
  return errs;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Err({ msg }: { msg?: string }) {
  return msg ? <p className="text-rose-500 text-xs mt-1">{msg}</p> : null;
}

function errBorder(base: string, hasError: boolean) {
  return hasError ? base + ' !border-rose-400' : base;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function KnowledgeBasePage() {
  const [articles, setArticles] = useState(initArticles);
  const [search, setSearch] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [viewArticle, setViewArticle] = useState<typeof initArticles[0] | null>(null);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState<FormState>(defaultForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const filtered = articles.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (field: keyof FormState, value: string) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    if (touched[field]) setErrors(validate(updated));
  };

  const handleBlur = (field: keyof FormErrors) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setErrors(validate(form));
  };

  const handleCreate = () => {
    setTouched({ title: true, body: true });
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const now = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    setArticles(prev => [...prev, { id: `KB-00${prev.length + 1}`, ...form, views: 0, date: now }]);
    setForm(defaultForm);
    setErrors({});
    setTouched({});
    setShowCreate(false);
    setToast('Article published!');
  };

  const handleClose = () => {
    setShowCreate(false);
    setForm(defaultForm);
    setErrors({});
    setTouched({});
  };

  const openArticle = (article: typeof initArticles[0]) => {
    setArticles(prev => prev.map(a => a.id === article.id ? { ...a, views: a.views + 1 } : a));
    setViewArticle(article);
  };

  return (
    <div className="p-6 space-y-6">
      {toast && <Toast message={toast} onDone={() => setToast('')} />}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white-800">Knowledge Base</h1>
          <p className="text-gray-500 text-sm mt-1">Finance help articles and guides</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
          <Plus className="w-4 h-4" /> New Article
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search articles..."
          className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-gray-700 focus:outline-none shadow-sm"
        />
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        {categories.map(cat => (
          <div key={cat} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <BookOpen className="w-5 h-5 text-blue-600 mb-2" />
            <div className="text-gray-800 font-semibold text-sm">{cat}</div>
            <div className="text-gray-400 text-xs mt-0.5">{articles.filter(a => a.category === cat).length} articles</div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 text-gray-700 font-semibold text-sm">All Articles</div>
        {filtered.map(a => (
          <div
            key={a.id}
            onClick={() => openArticle(a)}
            className="flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 cursor-pointer border-b border-gray-50 transition-colors"
          >
            <div>
              <div className="text-gray-800 text-sm font-medium">{a.title}</div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">{a.category}</span>
                <span className="text-gray-400 text-xs">{a.views} views</span>
                <span className="text-gray-400 text-xs">· {a.date}</span>
              </div>
            </div>
            <span className="text-blue-600 text-xs">Read →</span>
          </div>
        ))}
      </div>

      {/* New Article Modal */}
      <Modal open={showCreate} onClose={handleClose} title="New Article" size="lg">
        <div className="space-y-4">

          <FormField label="Title">
            <input
              className={errBorder(inputCls, !!(touched.title && errors.title))}
              value={form.title}
              onChange={e => handleChange('title', e.target.value)}
              onBlur={() => handleBlur('title')}
              placeholder="Article title"
            />
            <Err msg={touched.title ? errors.title : undefined} />
          </FormField>

          <FormField label="Category">
            <select
              className={selectCls}
              value={form.category}
              onChange={e => handleChange('category', e.target.value)}
            >
              {categories.map(c => <option key={c}>{c}</option>)}
              <option>General</option>
            </select>
          </FormField>

          <FormField label="Content">
            <textarea
              rows={6}
              className={errBorder(`${inputCls} resize-none`, !!(touched.body && errors.body))}
              value={form.body}
              onChange={e => handleChange('body', e.target.value)}
              onBlur={() => handleBlur('body')}
              placeholder="Write the article content here..."
            />
            <Err msg={touched.body ? errors.body : undefined} />
          </FormField>

          <div className="flex gap-3 pt-2">
            <button onClick={handleClose} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">
              Cancel
            </button>
            <button onClick={handleCreate} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
              Publish
            </button>
          </div>

        </div>
      </Modal>

      {/* View Article Modal */}
      <Modal open={!!viewArticle} onClose={() => setViewArticle(null)} title={viewArticle?.title || ''} size="lg">
        {viewArticle && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">{viewArticle.category}</span>
              <span className="text-gray-400 text-xs">{viewArticle.date}</span>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">{viewArticle.body}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}