'use client';
import { useState } from 'react';
import { Download } from 'lucide-react';
import { Modal, Toast } from '../../components/Modal';

const initFilings = [
  { id: 'TAX-001', type: 'GST Monthly Return (GSTR-3B)', period: 'Feb 2026', dueDate: 'Mar 20, 2026', amount: '$18,400', status: 'Filed' },
  { id: 'TAX-002', type: 'TDS Return (Form 26Q)', period: 'Q3 FY26', dueDate: 'Mar 31, 2026', amount: '$9,200', status: 'Upcoming' },
  { id: 'TAX-003', type: 'GST Monthly Return (GSTR-3B)', period: 'Mar 2026', dueDate: 'Apr 20, 2026', amount: '$21,000', status: 'Upcoming' },
  { id: 'TAX-004', type: 'Advance Tax (Q4)', period: 'Q4 FY26', dueDate: 'Mar 15, 2026', amount: '$45,000', status: 'Filed' },
  { id: 'TAX-005', type: 'Annual Income Tax Return', period: 'FY 2024-25', dueDate: 'Jul 31, 2025', amount: '$1,20,000', status: 'Filed' },
];

const statusStyle: Record<string,string> = {
  Filed: 'bg-emerald-500/20 text-emerald-400', Upcoming: 'bg-amber-500/20 text-amber-400', Overdue: 'bg-rose-500/20 text-rose-400',
};

export default function TaxPage() {
  const [filings, setFilings] = useState(initFilings);
  const [fileNow, setFileNow] = useState<typeof initFilings[0]|null>(null);
  const [toast, setToast] = useState('');

  const handleFile = () => {
    if (!fileNow) return;
    setFilings(prev => prev.map(f => f.id === fileNow.id ? { ...f, status: 'Filed' } : f));
    setFileNow(null);
    setToast(`${fileNow.type} filed successfully!`);
  };

  const handleDownload = (filing: typeof initFilings[0]) => {
    const content = `TAX FILING RECEIPT\n\nType: ${filing.type}\nPeriod: ${filing.period}\nAmount: ${filing.amount}\nStatus: ${filing.status}\nFiled on: ${new Date().toLocaleDateString()}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `${filing.id}-receipt.txt`; a.click();
    setToast('Receipt downloaded!');
  };

  const totalPaid = filings.filter(f=>f.status==='Filed').reduce((s,f)=>s+parseFloat(f.amount.replace(/[$,]/g,'')),0);
  const totalPending = filings.filter(f=>f.status==='Upcoming').reduce((s,f)=>s+parseFloat(f.amount.replace(/[$,]/g,'')),0);

  return (
    <div className="p-6 space-y-6">
      {toast && <Toast message={toast} onDone={() => setToast('')} />}
      <div><h1 className="text-2xl font-bold text-gray-800">Tax Management</h1><p className="text-gray-500 text-sm mt-1">GST, TDS, income tax filings and compliance</p></div>
      <div className="grid grid-cols-3 gap-4">
        {[{label:'Total Filed',value:`$${totalPaid.toLocaleString()}`,color:'text-emerald-400'},{label:'Pending',value:`$${totalPending.toLocaleString()}`,color:'text-amber-400'},{label:'Compliance Rate',value:'100%',color:'text-blue-400'}].map(s=>
          <div key={s.label} className="bg-gray-900 rounded-xl p-5"><div className="text-gray-400 text-sm mb-2">{s.label}</div><div className={`text-2xl font-bold ${s.color}`}>{s.value}</div></div>
        )}
      </div>
      <div className="bg-gray-900 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead><tr className="bg-gray-800 border-b border-gray-700">{['ID','Tax Type','Period','Due Date','Amount','Status','Action'].map(h=><th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-gray-800">
            {filings.map(f=>(
              <tr key={f.id} className="hover:bg-gray-800/60">
                <td className="px-4 py-3.5 text-blue-400 text-sm font-mono">{f.id}</td>
                <td className="px-4 py-3.5 text-white text-sm font-medium">{f.type}</td>
                <td className="px-4 py-3.5 text-gray-300 text-sm">{f.period}</td>
                <td className="px-4 py-3.5 text-gray-300 text-sm">{f.dueDate}</td>
                <td className="px-4 py-3.5 text-amber-400 text-sm font-semibold">{f.amount}</td>
                <td className="px-4 py-3.5"><span className={`px-2 py-0.5 rounded text-xs font-medium ${statusStyle[f.status]}`}>{f.status}</span></td>
                <td className="px-4 py-3.5 flex gap-1.5">
                  {f.status === 'Upcoming' && <button onClick={() => setFileNow(f)} className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">File Now</button>}
                  {f.status === 'Filed' && <button onClick={() => handleDownload(f)} className="flex items-center gap-1 px-3 py-1 bg-gray-700 text-gray-300 rounded text-xs hover:bg-gray-600"><Download className="w-3 h-3" /> Receipt</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal open={!!fileNow} onClose={() => setFileNow(null)} title="Confirm Tax Filing" size="sm">
        {fileNow && <div className="space-y-4">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Filing Type</span><span className="text-gray-800 font-medium">{fileNow.type}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Period</span><span className="text-gray-800">{fileNow.period}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Amount</span><span className="text-amber-600 font-bold">{fileNow.amount}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Due Date</span><span className="text-gray-800">{fileNow.dueDate}</span></div>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={() => setFileNow(null)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
            <button onClick={handleFile} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Confirm & File</button>
          </div>
        </div>}
      </Modal>
    </div>
  );
}
