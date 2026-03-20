'use client';
import { useState } from 'react';
import { Plus, Search, Edit2, X, Package, Tag, DollarSign, Layers, AlertCircle, CheckCircle2, Trash2 } from 'lucide-react';
import { Toast } from '../../components/Modal';

const initProducts = [
  { id: 'PRD-001', name: 'ERP Suite - Enterprise', category: 'Software', price: '$2,400/yr', stock: 'Unlimited', status: 'Active' },
  { id: 'PRD-002', name: 'Finance Module', category: 'Software', price: '$800/yr', stock: 'Unlimited', status: 'Active' },
  { id: 'PRD-003', name: 'Analytics Dashboard', category: 'Software', price: '$600/yr', stock: 'Unlimited', status: 'Active' },
  { id: 'PRD-004', name: 'Implementation Service', category: 'Service', price: '$5,000', stock: 'On Demand', status: 'Active' },
  { id: 'PRD-005', name: 'Support Package - Annual', category: 'Service', price: '$1,200/yr', stock: 'On Demand', status: 'Active' },
  { id: 'PRD-006', name: 'Legacy CRM Module', category: 'Software', price: '$400/yr', stock: 'Unlimited', status: 'Discontinued' },
];

const emptyForm = {
  name: '',
  category: '',
  price: '',
  stock: '',
  status: 'Active',
  description: '',
  sku: '',
};

type FormErrors = Partial<Record<keyof typeof emptyForm, string>>;

// ─── Validation ───────────────────────────────────────────────────────────────
function validate(form: typeof emptyForm): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = 'Product name is required.';
  else if (form.name.trim().length < 3) errors.name = 'Name must be at least 3 characters.';
  if (!form.category) errors.category = 'Please select a category.';
  if (!form.price.trim()) errors.price = 'Price is required.';
  else if (!/^\$?[\d,]+(\.\d{1,2})?(\/\w+)?$/.test(form.price.trim()))
    errors.price = 'Enter a valid price (e.g. $2,400/yr or $5,000).';
  if (!form.stock) errors.stock = 'Please select availability.';
  if (form.sku && !/^[A-Z0-9\-]{3,20}$/.test(form.sku.trim()))
    errors.sku = 'SKU must be 3–20 uppercase letters, numbers, or hyphens.';
  return errors;
}

// ─── Field wrapper ────────────────────────────────────────────────────────────
function Field({
  label, required, error, icon, children,
}: {
  label: string; required?: boolean; error?: string; icon?: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">
        {icon && <span className="text-gray-400">{icon}</span>}
        {label}
        {required && <span className="text-rose-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <div className="flex items-center gap-1.5 text-rose-500 text-xs">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          {error}
        </div>
      )}
    </div>
  );
}

const inputBase = 'w-full bg-gray-50 border rounded-lg px-3 py-2.5 text-gray-800 text-sm placeholder-gray-400 focus:outline-none transition-colors';
const inputNormal = `${inputBase} border-gray-300 focus:border-blue-500 focus:bg-white`;
const inputError  = `${inputBase} border-rose-400 bg-rose-50 focus:border-rose-500 focus:bg-white`;

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────
function DeleteConfirmModal({
  product,
  onClose,
  onConfirm,
}: {
  product: typeof initProducts[0];
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
        {/* Red top accent */}
        <div className="h-1.5 bg-rose-500 w-full" />
        <div className="p-6">
          {/* Icon + title */}
          <div className="flex items-start gap-4 mb-5">
            <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <Trash2 className="w-5 h-5 text-rose-500" />
            </div>
            <div>
              <h2 className="text-gray-800 font-semibold text-base">Delete Product</h2>
              <p className="text-gray-500 text-sm mt-1">This action cannot be undone.</p>
            </div>
          </div>

          {/* Product info card */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-5">
            <p className="text-xs text-gray-400 mb-0.5 font-medium uppercase tracking-wider">Product to delete</p>
            <p className="text-gray-800 font-semibold text-sm">{product.name}</p>
            <div className="flex items-center gap-3 mt-1.5">
              <span className="text-xs text-blue-600 font-mono">{product.id}</span>
              <span className="text-gray-300">·</span>
              <span className="text-xs text-gray-500">{product.category}</span>
              <span className="text-gray-300">·</span>
              <span className="text-xs text-emerald-600 font-semibold">{product.price}</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2.5 bg-rose-600 text-white rounded-lg text-sm font-medium hover:bg-rose-700 transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Add Product Modal ────────────────────────────────────────────────────────
function AddProductModal({
  onClose,
  onAdd,
  existingIds,
}: {
  onClose: () => void;
  onAdd: (product: typeof initProducts[0]) => void;
  existingIds: string[];
}) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof typeof emptyForm, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);

  const set = (field: keyof typeof emptyForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    if (touched[field]) {
      const newErrors = validate({ ...form, [field]: e.target.value });
      setErrors(prev => ({ ...prev, [field]: newErrors[field] }));
    }
  };

  const blur = (field: keyof typeof emptyForm) => () => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const newErrors = validate(form);
    setErrors(prev => ({ ...prev, [field]: newErrors[field] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const allTouched = Object.keys(emptyForm).reduce(
      (acc, k) => ({ ...acc, [k]: true }),
      {} as typeof touched
    );
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const nextNum = existingIds.length + 1;
    const newId = `PRD-${String(nextNum).padStart(3, '0')}`;
    onAdd({
      id: newId,
      name: form.name.trim(),
      category: form.category,
      price: form.price.trim(),
      stock: form.stock,
      status: form.status,
    });
    onClose();
  };

  const isClean = Object.keys(validate(form)).length === 0;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[92vh] overflow-y-auto mx-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
              <Package className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h2 className="text-gray-800 font-semibold text-base">Add New Product</h2>
              <p className="text-gray-400 text-xs mt-0.5">Fill in all required fields to register a product</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="p-6 space-y-5">
          <Field label="Product Name" required error={errors.name} icon={<Package className="w-3.5 h-3.5" />}>
            <input value={form.name} onChange={set('name')} onBlur={blur('name')} placeholder="e.g. ERP Suite - Enterprise" className={errors.name ? inputError : inputNormal} />
          </Field>

          <Field label="SKU / Product Code" error={errors.sku} icon={<Tag className="w-3.5 h-3.5" />}>
            <input value={form.sku} onChange={set('sku')} onBlur={blur('sku')} placeholder="e.g. ERP-ENT-001 (optional)" className={errors.sku ? inputError : inputNormal} />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Category" required error={errors.category} icon={<Layers className="w-3.5 h-3.5" />}>
              <select value={form.category} onChange={set('category')} onBlur={blur('category')} className={errors.category ? inputError : inputNormal}>
                <option value="">Select category</option>
                <option value="Software">Software</option>
                <option value="Service">Service</option>
                <option value="Hardware">Hardware</option>
                <option value="Subscription">Subscription</option>
              </select>
            </Field>
            <Field label="Status" required>
              <select value={form.status} onChange={set('status')} className={inputNormal}>
                <option value="Active">Active</option>
                <option value="Discontinued">Discontinued</option>
                <option value="Draft">Draft</option>
              </select>
            </Field>
          </div>

          <Field label="Price" required error={errors.price} icon={<DollarSign className="w-3.5 h-3.5" />}>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input value={form.price} onChange={set('price')} onBlur={blur('price')} placeholder="2,400/yr  or  5,000" className={`${errors.price ? inputError : inputNormal} pl-7`} />
            </div>
          </Field>

          <Field label="Availability" required error={errors.stock}>
            <select value={form.stock} onChange={set('stock')} onBlur={blur('stock')} className={errors.stock ? inputError : inputNormal}>
              <option value="">Select availability</option>
              <option value="Unlimited">Unlimited</option>
              <option value="On Demand">On Demand</option>
              <option value="Limited Stock">Limited Stock</option>
              <option value="Pre-order">Pre-order</option>
            </select>
          </Field>

          <Field label="Description (optional)">
            <textarea value={form.description} onChange={set('description')} rows={3} placeholder="Brief description of the product..." className={`${inputNormal} resize-none`} />
          </Field>

          {submitted && Object.keys(errors).length > 0 && (
            <div className="flex items-start gap-2.5 bg-rose-50 border border-rose-200 rounded-lg px-4 py-3">
              <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
              <p className="text-rose-600 text-xs">
                Please fix the {Object.keys(errors).length} error{Object.keys(errors).length > 1 ? 's' : ''} above before submitting.
              </p>
            </div>
          )}

          <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">Cancel</button>
            <button type="submit" className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${isClean ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-400 text-white cursor-not-allowed'}`}>
              <Plus className="w-4 h-4" /> Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Edit Product Modal ───────────────────────────────────────────────────────
function EditProductModal({
  product,
  onClose,
  onSave,
}: {
  product: typeof initProducts[0];
  onClose: () => void;
  onSave: (updated: typeof initProducts[0]) => void;
}) {
  const [form, setForm] = useState({ ...product });
  const [errors, setErrors] = useState<FormErrors>({});

  const set = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = 'Product name is required.';
    if (!form.price.trim()) errs.price = 'Price is required.';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
              <Edit2 className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <h2 className="text-gray-800 font-semibold text-base">Edit Product</h2>
              <p className="text-gray-400 text-xs mt-0.5">{product.id}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSave} className="p-6 space-y-4">
          <Field label="Product Name" required error={errors.name}>
            <input value={form.name} onChange={set('name')} className={errors.name ? inputError : inputNormal} />
          </Field>
          <Field label="Price" required error={errors.price} icon={<DollarSign className="w-3.5 h-3.5" />}>
            <input value={form.price} onChange={set('price')} placeholder="e.g. $2,400/yr" className={errors.price ? inputError : inputNormal} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Category">
              <select value={form.category} onChange={set('category')} className={inputNormal}>
                <option>Software</option><option>Service</option><option>Hardware</option><option>Subscription</option>
              </select>
            </Field>
            <Field label="Status">
              <select value={form.status} onChange={set('status')} className={inputNormal}>
                <option>Active</option><option>Discontinued</option><option>Draft</option>
              </select>
            </Field>
          </div>
          <Field label="Availability">
            <select value={form.stock} onChange={set('stock')} className={inputNormal}>
              <option>Unlimited</option><option>On Demand</option><option>Limited Stock</option><option>Pre-order</option>
            </select>
          </Field>
          <div className="flex gap-3 pt-2 border-t border-gray-100">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">Cancel</button>
            <button type="submit" className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ProductsPage() {
  const [products, setProducts] = useState(initProducts);
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [editProduct, setEditProduct] = useState<typeof initProducts[0] | null>(null);
  const [deleteProduct, setDeleteProduct] = useState<typeof initProducts[0] | null>(null);
  const [toast, setToast] = useState('');

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const totalProducts = products.length;
  const activeCount = products.filter(p => p.status === 'Active').length;
  const categoryCount = Array.from(new Set(products.map(p => p.category))).length;

  const handleAdd = (product: typeof initProducts[0]) => {
    setProducts(prev => [...prev, product]);
    setToast(`Product "${product.name}" added successfully!`);
  };

  const handleSave = (updated: typeof initProducts[0]) => {
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
    setToast(`Product "${updated.name}" updated successfully!`);
  };

  const handleDelete = () => {
    if (!deleteProduct) return;
    setProducts(prev => prev.filter(p => p.id !== deleteProduct.id));
    setToast(`Product "${deleteProduct.name}" deleted.`);
    setDeleteProduct(null);
  };

  return (
    <div className="p-6 space-y-6">
      {toast && <Toast message={toast} onDone={() => setToast('')} />}

      {showAdd && (
        <AddProductModal onClose={() => setShowAdd(false)} onAdd={handleAdd} existingIds={products.map(p => p.id)} />
      )}
      {editProduct && (
        <EditProductModal product={editProduct} onClose={() => setEditProduct(null)} onSave={handleSave} />
      )}
      {deleteProduct && (
        <DeleteConfirmModal product={deleteProduct} onClose={() => setDeleteProduct(null)} onConfirm={handleDelete} />
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white-800">Products</h1>
          <p className="text-gray-500 text-sm mt-1">Manage product catalog and pricing</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Products', value: totalProducts },
          { label: 'Active', value: activeCount },
          { label: 'Categories', value: categoryCount },
        ].map(s => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="text-gray-500 text-sm mb-1">{s.label}</div>
            <div className="text-2xl font-bold text-gray-800">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..."
              className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-blue-400" />
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {['ID', 'Product Name', 'Category', 'Price', 'Availability', 'Status', 'Actions'].map(h => (
                <th key={h} className="text-left text-gray-500 text-xs font-medium px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-400 text-sm">
                  No products found matching &quot;{search}&quot;
                </td>
              </tr>
            ) : filtered.map(p => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3.5 text-blue-600 text-sm font-mono">{p.id}</td>
                <td className="px-4 py-3.5 text-gray-800 text-sm font-medium">{p.name}</td>
                <td className="px-4 py-3.5 text-gray-600 text-sm">{p.category}</td>
                <td className="px-4 py-3.5 text-emerald-600 text-sm font-semibold">{p.price}</td>
                <td className="px-4 py-3.5 text-gray-500 text-sm">{p.stock}</td>
                <td className="px-4 py-3.5">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    p.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : p.status === 'Draft' ? 'bg-blue-50 text-blue-600 border border-blue-200'
                    : 'bg-gray-100 text-gray-500 border border-gray-200'
                  }`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1">
                    {/* Edit */}
                    <button
                      onClick={() => setEditProduct({ ...p })}
                      className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                      title="Edit product"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    {/* Delete */}
                    <button
                      onClick={() => setDeleteProduct({ ...p })}
                      className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete product"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}