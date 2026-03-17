'use client';
import { useState } from 'react';
import { Plus, Search, Edit2 } from 'lucide-react';
import { Modal, Toast, FormField, inputCls, selectCls } from '../../components/Modal';

const initProducts = [
  { id: 'PRD-001', name: 'ERP Suite - Enterprise', category: 'Software', price: '$2,400/yr', stock: 'Unlimited', status: 'Active' },
  { id: 'PRD-002', name: 'Finance Module', category: 'Software', price: '$800/yr', stock: 'Unlimited', status: 'Active' },
  { id: 'PRD-003', name: 'Analytics Dashboard', category: 'Software', price: '$600/yr', stock: 'Unlimited', status: 'Active' },
  { id: 'PRD-004', name: 'Implementation Service', category: 'Service', price: '$5,000', stock: 'On Demand', status: 'Active' },
  { id: 'PRD-005', name: 'Support Package - Annual', category: 'Service', price: '$1,200/yr', stock: 'On Demand', status: 'Active' },
  { id: 'PRD-006', name: 'Legacy CRM Module', category: 'Software', price: '$400/yr', stock: 'Unlimited', status: 'Discontinued' },
];

export default function ProductsPage() {
  const [products, setProducts] = useState(initProducts);
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [editProduct, setEditProduct] = useState<typeof initProducts[0]|null>(null);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({ name: '', category: 'Software', price: '', stock: 'Unlimited', status: 'Active' });

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const handleAdd = () => {
    if (!form.name || !form.price) return;
    setProducts(prev => [...prev, { id: `PRD-00${prev.length+1}`, ...form }]);
    setForm({ name: '', category: 'Software', price: '', stock: 'Unlimited', status: 'Active' });
    setShowAdd(false);
    setToast('Product added!');
  };

  const handleEdit = () => {
    if (!editProduct) return;
    setProducts(prev => prev.map(p => p.id === editProduct.id ? editProduct : p));
    setEditProduct(null);
    setToast('Product updated!');
  };

  return (
    <div className="p-6 space-y-6">
      {toast && <Toast message={toast} onDone={() => setToast('')} />}
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-800">Products</h1><p className="text-gray-500 text-sm mt-1">Manage product catalog and pricing</p></div>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"><Plus className="w-4 h-4" /> Add Product</button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[{label:'Total Products',value:products.length},{label:'Active',value:products.filter(p=>p.status==='Active').length},{label:'Categories',value:[...new Set(products.map(p=>p.category))].length}].map(s=>
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"><div className="text-gray-500 text-sm mb-1">{s.label}</div><div className="text-2xl font-bold text-gray-800">{s.value}</div></div>
        )}
      </div>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products..." className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-700 focus:outline-none" />
          </div>
        </div>
        <table className="w-full">
          <thead><tr className="bg-gray-50 border-b border-gray-100">{['ID','Product Name','Category','Price','Availability','Status','Actions'].map(h=><th key={h} className="text-left text-gray-500 text-xs font-medium px-4 py-3">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map(p=>(
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-4 py-3.5 text-blue-600 text-sm font-mono">{p.id}</td>
                <td className="px-4 py-3.5 text-gray-800 text-sm font-medium">{p.name}</td>
                <td className="px-4 py-3.5 text-gray-600 text-sm">{p.category}</td>
                <td className="px-4 py-3.5 text-emerald-600 text-sm font-semibold">{p.price}</td>
                <td className="px-4 py-3.5 text-gray-500 text-sm">{p.stock}</td>
                <td className="px-4 py-3.5"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${p.status==='Active'?'bg-emerald-50 text-emerald-700 border border-emerald-200':'bg-gray-100 text-gray-500'}`}>{p.status}</span></td>
                <td className="px-4 py-3.5"><button onClick={()=>setEditProduct({...p})} className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded transition-colors"><Edit2 className="w-3.5 h-3.5" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal open={showAdd} onClose={()=>setShowAdd(false)} title="Add Product">
        <div className="space-y-4">
          <FormField label="Product Name"><input className={inputCls} value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} /></FormField>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Category"><select className={selectCls} value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))}><option>Software</option><option>Service</option><option>Hardware</option></select></FormField>
            <FormField label="Status"><select className={selectCls} value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))}><option>Active</option><option>Discontinued</option></select></FormField>
          </div>
          <FormField label="Price"><input className={inputCls} value={form.price} onChange={e=>setForm(f=>({...f,price:e.target.value}))} placeholder="e.g. $2,400/yr" /></FormField>
          <FormField label="Availability"><select className={selectCls} value={form.stock} onChange={e=>setForm(f=>({...f,stock:e.target.value}))}><option>Unlimited</option><option>On Demand</option><option>Limited Stock</option></select></FormField>
          <div className="flex gap-3 pt-2">
            <button onClick={()=>setShowAdd(false)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
            <button onClick={handleAdd} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Add Product</button>
          </div>
        </div>
      </Modal>
      <Modal open={!!editProduct} onClose={()=>setEditProduct(null)} title="Edit Product">
        {editProduct && <div className="space-y-4">
          <FormField label="Product Name"><input className={inputCls} value={editProduct.name} onChange={e=>setEditProduct(p=>p?{...p,name:e.target.value}:p)} /></FormField>
          <FormField label="Price"><input className={inputCls} value={editProduct.price} onChange={e=>setEditProduct(p=>p?{...p,price:e.target.value}:p)} /></FormField>
          <FormField label="Status"><select className={selectCls} value={editProduct.status} onChange={e=>setEditProduct(p=>p?{...p,status:e.target.value}:p)}><option>Active</option><option>Discontinued</option></select></FormField>
          <div className="flex gap-3 pt-2">
            <button onClick={()=>setEditProduct(null)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
            <button onClick={handleEdit} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Save Changes</button>
          </div>
        </div>}
      </Modal>
    </div>
  );
}
