'use client';
import { Toast, Modal, FormField } from '../../components/Modal';
import { useState } from 'react';
import { Plus, DollarSign, TrendingUp, Building, RefreshCw, CheckCircle2, AlertCircle, Pencil, ArrowLeftRight, Eye } from 'lucide-react';

const inputCls = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100";
const inputErrCls = "w-full border border-rose-400 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-100";
const selectCls = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-blue-400 bg-white";
const selectErrCls = "w-full border border-rose-400 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-rose-400 bg-white";
const errMsg = "text-rose-500 text-xs mt-1";

const tabs = ['Bank Accounts', 'Cash Flow', 'Bank Reconciliation', 'Treasury', 'Foreign Exchange'];

const initAccounts = [
  { bank: 'HDFC Bank', account: 'XXXX-4521', type: 'Current', balance: '$1,25,400', status: 'Active', ifsc: 'HDFC0001234', branch: 'Andheri West', holder: 'CognexiaAI Pvt Ltd' },
  { bank: 'ICICI Bank', account: 'XXXX-7832', type: 'Savings', balance: '$45,200', status: 'Active', ifsc: 'ICIC0002345', branch: 'Bandra East', holder: 'CognexiaAI Pvt Ltd' },
  { bank: 'SBI', account: 'XXXX-1190', type: 'Current', balance: '$78,900', status: 'Active', ifsc: 'SBIN0003456', branch: 'Fort Mumbai', holder: 'CognexiaAI Pvt Ltd' },
  { bank: 'Axis Bank', account: 'XXXX-3345', type: 'OD Account', balance: '-$12,000', status: 'Overdrawn', ifsc: 'UTIB0004567', branch: 'Nariman Point', holder: 'CognexiaAI Pvt Ltd' },
];

const cashFlowData = [
  { month: 'Jan', inflow: 215000, outflow: 89000 },
  { month: 'Feb', inflow: 235000, outflow: 94000 },
  { month: 'Mar', inflow: 245800, outflow: 98240 },
];

const initReconciliation = [
  { date: 'Mar 11', ref: 'REF-441', desc: 'Client Payment - Acme Corp', bankAmt: '$12,000', bookAmt: '$12,000', status: 'Matched' },
  { date: 'Mar 10', ref: 'REF-440', desc: 'Office Rent Payment', bankAmt: '$3,200', bookAmt: '$3,200', status: 'Matched' },
  { date: 'Mar 09', ref: 'REF-439', desc: 'Software Subscription', bankAmt: '$1,200', bookAmt: '$1,200', status: 'Matched' },
  { date: 'Mar 08', ref: 'REF-438', desc: 'Unidentified Credit', bankAmt: '$850', bookAmt: '—', status: 'Unmatched' },
  { date: 'Mar 07', ref: 'REF-437', desc: 'Payroll Transfer', bankAmt: '$28,500', bookAmt: '$28,500', status: 'Matched' },
];

const initTreasury = [
  { instrument: 'Fixed Deposit - HDFC', type: 'Fixed Deposit', principal: '$50,000', principalNum: 50000, rate: '7.5%', maturity: 'Jun 30, 2026', value: '$51,875', valueNum: 51875, bank: 'HDFC Bank', status: 'Active' },
  { instrument: 'Liquid Fund - ICICI', type: 'Liquid Fund', principal: '$80,000', principalNum: 80000, rate: '6.8%', maturity: 'On Demand', value: '$82,720', valueNum: 82720, bank: 'ICICI Bank', status: 'Active' },
  { instrument: 'T-Bill 91 day', type: 'T-Bill', principal: '$30,000', principalNum: 30000, rate: '6.95%', maturity: 'May 15, 2026', value: '$30,521', valueNum: 30521, bank: 'SBI', status: 'Active' },
  { instrument: 'Corp Bond - Reliance', type: 'Corporate Bond', principal: '$1,00,000', principalNum: 100000, rate: '8.2%', maturity: 'Dec 31, 2026', value: '$1,04,100', valueNum: 104100, bank: 'HDFC Bank', status: 'Active' },
];

const fxRates = [
  { pair: 'USD/INR', rate: '83.42', change: '+0.12%', trending: true },
  { pair: 'EUR/INR', rate: '90.15', change: '-0.08%', trending: false },
  { pair: 'GBP/INR', rate: '105.30', change: '+0.22%', trending: true },
  { pair: 'AED/INR', rate: '22.70', change: '+0.03%', trending: true },
  { pair: 'SGD/INR', rate: '61.85', change: '-0.15%', trending: false },
  { pair: 'JPY/INR', rate: '0.55', change: '-0.05%', trending: false },
];

const emptyAccountForm = { bankName: '', accountNumber: '', holderName: '', accountType: '', openingBalance: '', ifscCode: '', branchName: '' };
const emptyInvestmentForm = { instrumentName: '', instrumentType: '', principal: '', rate: '', maturityDate: '', onDemand: false, linkedAccount: '' };
const emptyConvertForm = { fromAccount: '', amount: '', purpose: '' };
const emptyResolveForm = { description: '', postTo: '', remarks: '' };

type Account = typeof initAccounts[0];
type TreasuryItem = typeof initTreasury[0];
type ReconItem = typeof initReconciliation[0];

export default function CashManagementPage() {
  const [toast, setToast] = useState('');
  const [activeTab, setActiveTab] = useState(0);

  // Bank Accounts
  const [accounts, setAccounts] = useState(initAccounts);
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [accountForm, setAccountForm] = useState(emptyAccountForm);
  const [accountTouched, setAccountTouched] = useState<Record<string, boolean>>({});
  const [manageAccount, setManageAccount] = useState<Account | null>(null);
  const [manageForm, setManageForm] = useState({ holderName: '', accountType: '', ifscCode: '', branchName: '', status: '' });
  const [manageTouched, setManageTouched] = useState<Record<string, boolean>>({});

  // Treasury
  const [treasury, setTreasury] = useState(initTreasury);
  const [showAddInvestment, setShowAddInvestment] = useState(false);
  const [investmentForm, setInvestmentForm] = useState(emptyInvestmentForm);
  const [investmentTouched, setInvestmentTouched] = useState<Record<string, boolean>>({});
  const [viewInvestment, setViewInvestment] = useState<TreasuryItem | null>(null);

  // Reconciliation
  const [reconciliation, setReconciliation] = useState(initReconciliation);
  const [reconciling, setReconciling] = useState(false);
  const [resolveItem, setResolveItem] = useState<ReconItem | null>(null);
  const [resolveForm, setResolveForm] = useState(emptyResolveForm);
  const [resolveTouched, setResolveTouched] = useState<Record<string, boolean>>({});
  const matchedCount = reconciliation.filter(r => r.status === 'Matched').length;
  const unmatchedCount = reconciliation.filter(r => r.status === 'Unmatched').length;

  // FX Convert
  const [convertFx, setConvertFx] = useState<{ pair: string; rate: string } | null>(null);
  const [convertForm, setConvertForm] = useState(emptyConvertForm);
  const [convertTouched, setConvertTouched] = useState<Record<string, boolean>>({});

  const totalInvested = treasury.reduce((sum, t) => sum + t.principalNum, 0);
  const totalValue = treasury.reduce((sum, t) => sum + t.valueNum, 0);
  const totalGain = totalValue - totalInvested;

  // Touch helpers
  function touchAcc(f: string) { setAccountTouched(p => ({ ...p, [f]: true })); }
  function touchInv(f: string) { setInvestmentTouched(p => ({ ...p, [f]: true })); }
  function touchManage(f: string) { setManageTouched(p => ({ ...p, [f]: true })); }
  function touchConvert(f: string) { setConvertTouched(p => ({ ...p, [f]: true })); }
  function touchResolve(f: string) { setResolveTouched(p => ({ ...p, [f]: true })); }

  // Class helpers
  const accCls    = (f: string) => !accountForm[f as keyof typeof accountForm] && accountTouched[f] ? inputErrCls : inputCls;
  const accSelCls = (f: string) => !accountForm[f as keyof typeof accountForm] && accountTouched[f] ? selectErrCls : selectCls;
  const invCls    = (f: string) => !investmentForm[f as keyof typeof investmentForm] && investmentTouched[f] ? inputErrCls : inputCls;
  const invSelCls = (f: string) => !investmentForm[f as keyof typeof investmentForm] && investmentTouched[f] ? selectErrCls : selectCls;
  const mngCls    = (f: string) => !manageForm[f as keyof typeof manageForm] && manageTouched[f] ? inputErrCls : inputCls;
  const mngSelCls = (f: string) => !manageForm[f as keyof typeof manageForm] && manageTouched[f] ? selectErrCls : selectCls;
  const cvtCls    = (f: string) => !convertForm[f as keyof typeof convertForm] && convertTouched[f] ? inputErrCls : inputCls;
  const cvtSelCls = (f: string) => !convertForm[f as keyof typeof convertForm] && convertTouched[f] ? selectErrCls : selectCls;
  const rsvCls    = (f: string) => !resolveForm[f as keyof typeof resolveForm] && resolveTouched[f] ? inputErrCls : inputCls;
  const rsvSelCls = (f: string) => !resolveForm[f as keyof typeof resolveForm] && resolveTouched[f] ? selectErrCls : selectCls;

  // Add Account
  function handleAddAccount() {
    const all = { bankName: true, accountNumber: true, holderName: true, accountType: true, openingBalance: true, ifscCode: true, branchName: true };
    setAccountTouched(all);
    const { bankName, accountNumber, holderName, accountType, openingBalance, ifscCode, branchName } = accountForm;
    if (!bankName || !accountNumber || !holderName || !accountType || !openingBalance || !ifscCode || !branchName) return;
    setAccounts(prev => [...prev, { bank: bankName, account: 'XXXX-' + accountNumber.slice(-4), type: accountType, balance: `$${Number(openingBalance).toLocaleString()}`, status: 'Active', ifsc: ifscCode, branch: branchName, holder: holderName }]);
    setAccountForm(emptyAccountForm); setAccountTouched({});
    setShowAddAccount(false);
    setToast(`Account at ${bankName} added successfully!`);
  }

  // Manage Account
  function openManage(a: Account) {
    setManageAccount(a);
    setManageForm({ holderName: a.holder, accountType: a.type, ifscCode: a.ifsc, branchName: a.branch, status: a.status });
    setManageTouched({});
  }
  function handleSaveManage() {
    const all = { holderName: true, accountType: true, ifscCode: true, branchName: true, status: true };
    setManageTouched(all);
    const { holderName, accountType, ifscCode, branchName, status } = manageForm;
    if (!holderName || !accountType || !ifscCode || !branchName || !status) return;
    setAccounts(prev => prev.map(a => a.account === manageAccount!.account ? { ...a, holder: holderName, type: accountType, ifsc: ifscCode, branch: branchName, status } : a));
    setManageAccount(null);
    setToast(`${manageAccount!.bank} updated successfully!`);
  }
  function handleDeactivate() {
    setAccounts(prev => prev.map(a => a.account === manageAccount!.account ? { ...a, status: 'Inactive' } : a));
    setManageAccount(null);
    setToast(`${manageAccount!.bank} account deactivated.`);
  }

  // Add Investment
  function handleAddInvestment() {
    const all = { instrumentName: true, instrumentType: true, principal: true, rate: true, maturityDate: true, linkedAccount: true };
    setInvestmentTouched(all);
    const { instrumentName, instrumentType, principal, rate, maturityDate, onDemand, linkedAccount } = investmentForm;
    if (!instrumentName || !instrumentType || !principal || !rate || (!maturityDate && !onDemand) || !linkedAccount) return;
    const principalNum = Number(principal);
    const valueNum = Math.round(principalNum * (1 + Number(rate) / 100));
    setTreasury(prev => [...prev, {
      instrument: `${instrumentName} - ${linkedAccount}`,
      type: instrumentType,
      principal: `$${principalNum.toLocaleString()}`,
      principalNum,
      rate: `${rate}%`,
      maturity: onDemand ? 'On Demand' : maturityDate,
      value: `$${valueNum.toLocaleString()}`,
      valueNum,
      bank: linkedAccount,
      status: 'Active',
    }]);
    setInvestmentForm(emptyInvestmentForm); setInvestmentTouched({});
    setShowAddInvestment(false);
    setToast(`Investment "${instrumentName}" added to Treasury Portfolio!`);
  }

  // Reconciliation
  function handleRunReconciliation() {
    setReconciling(true);
    setTimeout(() => {
      let newlyMatched = 0;
      const updated = reconciliation.map(r => {
        if (r.status === 'Unmatched' && r.bankAmt === r.bookAmt) { newlyMatched++; return { ...r, status: 'Matched' }; }
        return r;
      });
      setReconciliation(updated); setReconciling(false);
      setToast(newlyMatched > 0
        ? `Reconciliation complete! ${newlyMatched} transaction${newlyMatched > 1 ? 's' : ''} newly matched.`
        : 'Reconciliation complete! No new matches found. 1 transaction needs manual review.');
    }, 2000);
  }

  // Resolve unmatched
  function openResolve(r: ReconItem) {
    setResolveItem(r);
    setResolveForm(emptyResolveForm);
    setResolveTouched({});
  }
  function handleResolve() {
    const all = { description: true, postTo: true, remarks: true };
    setResolveTouched(all);
    const { description, postTo, remarks } = resolveForm;
    if (!description || !postTo || !remarks) return;
    setReconciliation(prev => prev.map(r =>
      r.ref === resolveItem!.ref ? { ...r, bookAmt: r.bankAmt, status: 'Matched' } : r
    ));
    setResolveItem(null);
    setToast(`Transaction ${resolveItem!.ref} resolved and posted to ${postTo}!`);
  }

  // FX Convert
  function openConvert(pair: string, rate: string) {
    setConvertFx({ pair, rate });
    setConvertForm(emptyConvertForm);
    setConvertTouched({});
  }
  function handleConvert() {
    const all = { fromAccount: true, amount: true, purpose: true };
    setConvertTouched(all);
    const { fromAccount, amount, purpose } = convertForm;
    if (!fromAccount || !amount || !purpose) return;
    const converted = (parseFloat(amount) * parseFloat(convertFx!.rate)).toFixed(2);
    const pairFrom = convertFx!.pair.split('/')[0];
    const pairTo = convertFx!.pair.split('/')[1];
    setConvertFx(null); setConvertForm(emptyConvertForm); setConvertTouched({});
    setToast(`Converted $${Number(amount).toLocaleString()} ${pairFrom} → ${pairTo === 'INR' ? '₹' : ''}${Number(converted).toLocaleString()} ${pairTo}`);
  }

  return (
    <div className="p-6 space-y-6">
      {toast && <Toast message={toast} onDone={() => setToast('')} />}

      {/* ── Add Account Modal ─────────────────────────────────────────────── */}
      <Modal open={showAddAccount} onClose={() => { setShowAddAccount(false); setAccountForm(emptyAccountForm); setAccountTouched({}); }} title="Add Bank Account" size="md">
        <div className="space-y-4">
          <FormField label="Bank Name *">
            <input className={accCls('bankName')} placeholder="e.g. HDFC Bank" value={accountForm.bankName} onChange={e => setAccountForm(p => ({ ...p, bankName: e.target.value }))} onBlur={() => touchAcc('bankName')} />
            {!accountForm.bankName && accountTouched.bankName && <p className={errMsg}>Bank name is required</p>}
          </FormField>
          <FormField label="Account Number *">
            <input className={accCls('accountNumber')} placeholder="Enter full account number" value={accountForm.accountNumber} onChange={e => setAccountForm(p => ({ ...p, accountNumber: e.target.value }))} onBlur={() => touchAcc('accountNumber')} />
            {!accountForm.accountNumber && accountTouched.accountNumber && <p className={errMsg}>Account number is required</p>}
          </FormField>
          <FormField label="Account Holder Name *">
            <input className={accCls('holderName')} placeholder="As per bank records" value={accountForm.holderName} onChange={e => setAccountForm(p => ({ ...p, holderName: e.target.value }))} onBlur={() => touchAcc('holderName')} />
            {!accountForm.holderName && accountTouched.holderName && <p className={errMsg}>Holder name is required</p>}
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Account Type *">
              <select className={accSelCls('accountType')} value={accountForm.accountType} onChange={e => setAccountForm(p => ({ ...p, accountType: e.target.value }))} onBlur={() => touchAcc('accountType')}>
                <option value="">Select type</option>
                <option>Current</option><option>Savings</option><option>OD Account</option>
              </select>
              {!accountForm.accountType && accountTouched.accountType && <p className={errMsg}>Please select a type</p>}
            </FormField>
            <FormField label="Opening Balance ($) *">
              <input className={accCls('openingBalance')} type="number" placeholder="0.00" value={accountForm.openingBalance} onChange={e => setAccountForm(p => ({ ...p, openingBalance: e.target.value }))} onBlur={() => touchAcc('openingBalance')} />
              {!accountForm.openingBalance && accountTouched.openingBalance && <p className={errMsg}>Balance is required</p>}
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="IFSC Code *">
              <input className={accCls('ifscCode')} placeholder="e.g. HDFC0001234" value={accountForm.ifscCode} onChange={e => setAccountForm(p => ({ ...p, ifscCode: e.target.value.toUpperCase() }))} onBlur={() => touchAcc('ifscCode')} />
              {!accountForm.ifscCode && accountTouched.ifscCode && <p className={errMsg}>IFSC code is required</p>}
            </FormField>
            <FormField label="Branch Name *">
              <input className={accCls('branchName')} placeholder="e.g. Andheri West" value={accountForm.branchName} onChange={e => setAccountForm(p => ({ ...p, branchName: e.target.value }))} onBlur={() => touchAcc('branchName')} />
              {!accountForm.branchName && accountTouched.branchName && <p className={errMsg}>Branch name is required</p>}
            </FormField>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={() => { setShowAddAccount(false); setAccountForm(emptyAccountForm); setAccountTouched({}); }} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
            <button onClick={handleAddAccount} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Add Account</button>
          </div>
        </div>
      </Modal>

      {/* ── Manage Account Modal ──────────────────────────────────────────── */}
      <Modal open={!!manageAccount} onClose={() => setManageAccount(null)} title={`Manage — ${manageAccount?.bank}`} size="md">
        {manageAccount && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 bg-gray-50 rounded-xl p-4">
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wide">Account No.</p>
                <p className="text-gray-700 text-sm font-mono font-medium mt-0.5">{manageAccount.account}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wide">Current Balance</p>
                <p className={`text-sm font-bold mt-0.5 ${manageAccount.balance.startsWith('-') ? 'text-rose-500' : 'text-emerald-600'}`}>{manageAccount.balance}</p>
              </div>
            </div>
            <FormField label="Account Holder Name *">
              <input className={mngCls('holderName')} value={manageForm.holderName} onChange={e => setManageForm(p => ({ ...p, holderName: e.target.value }))} onBlur={() => touchManage('holderName')} />
              {!manageForm.holderName && manageTouched.holderName && <p className={errMsg}>Holder name is required</p>}
            </FormField>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Account Type *">
                <select className={mngSelCls('accountType')} value={manageForm.accountType} onChange={e => setManageForm(p => ({ ...p, accountType: e.target.value }))} onBlur={() => touchManage('accountType')}>
                  <option value="">Select type</option>
                  <option>Current</option><option>Savings</option><option>OD Account</option>
                </select>
                {!manageForm.accountType && manageTouched.accountType && <p className={errMsg}>Type is required</p>}
              </FormField>
              <FormField label="Status *">
                <select className={mngSelCls('status')} value={manageForm.status} onChange={e => setManageForm(p => ({ ...p, status: e.target.value }))} onBlur={() => touchManage('status')}>
                  <option value="">Select status</option>
                  <option>Active</option><option>Inactive</option><option>Overdrawn</option>
                </select>
                {!manageForm.status && manageTouched.status && <p className={errMsg}>Status is required</p>}
              </FormField>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="IFSC Code *">
                <input className={mngCls('ifscCode')} value={manageForm.ifscCode} onChange={e => setManageForm(p => ({ ...p, ifscCode: e.target.value.toUpperCase() }))} onBlur={() => touchManage('ifscCode')} />
                {!manageForm.ifscCode && manageTouched.ifscCode && <p className={errMsg}>IFSC is required</p>}
              </FormField>
              <FormField label="Branch Name *">
                <input className={mngCls('branchName')} value={manageForm.branchName} onChange={e => setManageForm(p => ({ ...p, branchName: e.target.value }))} onBlur={() => touchManage('branchName')} />
                {!manageForm.branchName && manageTouched.branchName && <p className={errMsg}>Branch is required</p>}
              </FormField>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-3">Recent Transactions</p>
              <div className="space-y-2">
                {[{ desc: 'Opening Balance', amt: manageAccount.balance, date: 'Jan 01, 2026' }, { desc: 'Inward Transfer', amt: '+$12,000', date: 'Mar 11, 2026' }, { desc: 'Rent Payment', amt: '-$3,200', date: 'Mar 10, 2026' }].map((tx, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div><p className="text-gray-700 text-xs font-medium">{tx.desc}</p><p className="text-gray-400 text-xs">{tx.date}</p></div>
                    <span className={`text-xs font-semibold ${tx.amt.startsWith('-') ? 'text-rose-500' : 'text-emerald-600'}`}>{tx.amt}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={handleDeactivate} className="px-4 py-2 border border-rose-200 text-rose-600 rounded-lg text-sm hover:bg-rose-50">Deactivate</button>
              <button onClick={() => setManageAccount(null)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
              <button onClick={handleSaveManage} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Save Changes</button>
            </div>
          </div>
        )}
      </Modal>

      {/* ── View Investment Modal ─────────────────────────────────────────── */}
      <Modal open={!!viewInvestment} onClose={() => setViewInvestment(null)} title="Investment Details" size="md">
        {viewInvestment && (
          <div className="space-y-4">
            {/* Header card */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-5 text-white">
              <p className="text-blue-200 text-xs font-medium uppercase tracking-wide mb-1">{viewInvestment.type}</p>
              <p className="text-xl font-bold">{viewInvestment.instrument}</p>
              <p className="text-blue-200 text-sm mt-1">Linked to {viewInvestment.bank}</p>
            </div>

            {/* Key numbers */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-gray-400 text-xs mb-1">Principal</p>
                <p className="text-gray-800 font-bold text-base">{viewInvestment.principal}</p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-3 text-center">
                <p className="text-gray-400 text-xs mb-1">Current Value</p>
                <p className="text-emerald-600 font-bold text-base">{viewInvestment.value}</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-3 text-center">
                <p className="text-gray-400 text-xs mb-1">Gain</p>
                <p className="text-blue-600 font-bold text-base">+${(viewInvestment.valueNum - viewInvestment.principalNum).toLocaleString()}</p>
              </div>
            </div>

            {/* Details list */}
            <div className="divide-y divide-gray-100 rounded-xl border border-gray-100 overflow-hidden">
              {[
                { label: 'Interest / Return Rate', value: viewInvestment.rate },
                { label: 'Maturity Date', value: viewInvestment.maturity },
                { label: 'Status', value: viewInvestment.status },
                { label: 'Linked Bank', value: viewInvestment.bank },
                { label: 'Return on Investment', value: `${(((viewInvestment.valueNum - viewInvestment.principalNum) / viewInvestment.principalNum) * 100).toFixed(2)}%` },
              ].map(row => (
                <div key={row.label} className="flex items-center justify-between px-4 py-3">
                  <span className="text-gray-500 text-sm">{row.label}</span>
                  <span className="text-gray-800 text-sm font-medium">{row.value}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={() => setViewInvestment(null)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Close</button>
              <button onClick={() => { setViewInvestment(null); setToast(`Redemption request for ${viewInvestment.instrument} submitted!`); }}
                className="flex-1 px-4 py-2 bg-rose-600 text-white rounded-lg text-sm font-medium hover:bg-rose-700">Redeem Investment</button>
            </div>
          </div>
        )}
      </Modal>

      {/* ── Add Investment Modal ───────────────────────────────────────────── */}
      <Modal open={showAddInvestment} onClose={() => { setShowAddInvestment(false); setInvestmentForm(emptyInvestmentForm); setInvestmentTouched({}); }} title="Add Investment" size="md">
        <div className="space-y-4">
          <FormField label="Instrument Name *">
            <input className={invCls('instrumentName')} placeholder="e.g. Fixed Deposit - HDFC" value={investmentForm.instrumentName} onChange={e => setInvestmentForm(p => ({ ...p, instrumentName: e.target.value }))} onBlur={() => touchInv('instrumentName')} />
            {!investmentForm.instrumentName && investmentTouched.instrumentName && <p className={errMsg}>Instrument name is required</p>}
          </FormField>
          <FormField label="Instrument Type *">
            <select className={invSelCls('instrumentType')} value={investmentForm.instrumentType} onChange={e => setInvestmentForm(p => ({ ...p, instrumentType: e.target.value }))} onBlur={() => touchInv('instrumentType')}>
              <option value="">Select type</option>
              <option>Fixed Deposit</option><option>Liquid Fund</option><option>T-Bill</option><option>Corporate Bond</option><option>Mutual Fund</option>
            </select>
            {!investmentForm.instrumentType && investmentTouched.instrumentType && <p className={errMsg}>Please select a type</p>}
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Principal Amount ($) *">
              <input className={invCls('principal')} type="number" placeholder="0.00" value={investmentForm.principal} onChange={e => setInvestmentForm(p => ({ ...p, principal: e.target.value }))} onBlur={() => touchInv('principal')} />
              {!investmentForm.principal && investmentTouched.principal && <p className={errMsg}>Principal is required</p>}
            </FormField>
            <FormField label="Interest / Return Rate (%) *">
              <input className={invCls('rate')} type="number" step="0.01" placeholder="e.g. 7.5" value={investmentForm.rate} onChange={e => setInvestmentForm(p => ({ ...p, rate: e.target.value }))} onBlur={() => touchInv('rate')} />
              {!investmentForm.rate && investmentTouched.rate && <p className={errMsg}>Rate is required</p>}
            </FormField>
          </div>
          <FormField label="Maturity Date *">
            <input className={!investmentForm.maturityDate && !investmentForm.onDemand && investmentTouched.maturityDate ? inputErrCls : inputCls} type="date" value={investmentForm.maturityDate} disabled={investmentForm.onDemand} onChange={e => setInvestmentForm(p => ({ ...p, maturityDate: e.target.value }))} onBlur={() => touchInv('maturityDate')} />
            {!investmentForm.maturityDate && !investmentForm.onDemand && investmentTouched.maturityDate && <p className={errMsg}>Select a date or check On Demand</p>}
            <label className="flex items-center gap-2 mt-2 cursor-pointer">
              <input type="checkbox" checked={investmentForm.onDemand} onChange={e => setInvestmentForm(p => ({ ...p, onDemand: e.target.checked, maturityDate: e.target.checked ? '' : p.maturityDate }))} className="w-4 h-4 rounded border-gray-300 text-blue-600" />
              <span className="text-sm text-gray-500">On Demand (no fixed maturity)</span>
            </label>
          </FormField>
          <FormField label="Linked Bank Account *">
            <select className={invSelCls('linkedAccount')} value={investmentForm.linkedAccount} onChange={e => setInvestmentForm(p => ({ ...p, linkedAccount: e.target.value }))} onBlur={() => touchInv('linkedAccount')}>
              <option value="">Select account</option>
              {accounts.map(a => <option key={a.account} value={a.bank}>{a.bank} ({a.account})</option>)}
            </select>
            {!investmentForm.linkedAccount && investmentTouched.linkedAccount && <p className={errMsg}>Please select an account</p>}
          </FormField>
          <div className="flex gap-3 pt-2">
            <button onClick={() => { setShowAddInvestment(false); setInvestmentForm(emptyInvestmentForm); setInvestmentTouched({}); }} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
            <button onClick={handleAddInvestment} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Add Investment</button>
          </div>
        </div>
      </Modal>

      {/* ── Resolve Unmatched Modal ───────────────────────────────────────── */}
      <Modal open={!!resolveItem} onClose={() => setResolveItem(null)} title="Resolve Unmatched Transaction" size="md">
        {resolveItem && (
          <div className="space-y-4">
            {/* Transaction info */}
            <div className="bg-rose-50 border border-rose-100 rounded-xl p-4">
              <p className="text-rose-600 text-xs font-medium uppercase tracking-wide mb-2">Unmatched Transaction</p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><p className="text-gray-400 text-xs">Reference</p><p className="text-gray-700 font-mono font-medium">{resolveItem.ref}</p></div>
                <div><p className="text-gray-400 text-xs">Date</p><p className="text-gray-700 font-medium">{resolveItem.date}</p></div>
                <div><p className="text-gray-400 text-xs">Description</p><p className="text-gray-700 font-medium">{resolveItem.desc}</p></div>
                <div><p className="text-gray-400 text-xs">Bank Amount</p><p className="text-emerald-600 font-bold">{resolveItem.bankAmt}</p></div>
              </div>
            </div>

            {/* Info banner */}
            <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
              <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-[9px] font-bold">i</span>
              </div>
              <p className="text-blue-600 text-xs">This amount appeared in your bank statement but has no matching entry in your books. Fill the form below to record it in your accounts.</p>
            </div>

            <FormField label="What is this transaction? *">
              <input className={rsvCls('description')} placeholder="e.g. Advance payment from XYZ client" value={resolveForm.description} onChange={e => setResolveForm(p => ({ ...p, description: e.target.value }))} onBlur={() => touchResolve('description')} />
              {!resolveForm.description && resolveTouched.description && <p className={errMsg}>Description is required</p>}
            </FormField>

            <FormField label="Post this amount to which account? *">
              <select className={rsvSelCls('postTo')} value={resolveForm.postTo} onChange={e => setResolveForm(p => ({ ...p, postTo: e.target.value }))} onBlur={() => touchResolve('postTo')}>
                <option value="">Select account</option>
                <option>Accounts Receivable</option>
                <option>Miscellaneous Income</option>
                <option>Suspense Account</option>
                <option>Revenue - Services</option>
                <option>Advance from Customer</option>
              </select>
              {!resolveForm.postTo && resolveTouched.postTo && <p className={errMsg}>Please select where to post this amount</p>}
            </FormField>

            <FormField label="Remarks / Notes *">
              <input className={rsvCls('remarks')} placeholder="e.g. Follow up with bank for sender details" value={resolveForm.remarks} onChange={e => setResolveForm(p => ({ ...p, remarks: e.target.value }))} onBlur={() => touchResolve('remarks')} />
              {!resolveForm.remarks && resolveTouched.remarks && <p className={errMsg}>Remarks are required</p>}
            </FormField>

            <div className="flex gap-3 pt-2">
              <button onClick={() => setResolveItem(null)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
              <button onClick={handleResolve} className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700">Resolve & Match</button>
            </div>
          </div>
        )}
      </Modal>

      {/* ── FX Convert Modal ──────────────────────────────────────────────── */}
      <Modal open={!!convertFx} onClose={() => { setConvertFx(null); setConvertForm(emptyConvertForm); setConvertTouched({}); }} title="Currency Conversion" size="sm">
        {convertFx && (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
              <p className="text-blue-400 text-xs font-medium uppercase tracking-wide mb-1">Current Rate</p>
              <p className="text-blue-700 text-2xl font-bold">{convertFx.pair}</p>
              <p className="text-blue-500 text-sm mt-0.5">1 {convertFx.pair.split('/')[0]} = {convertFx.rate} {convertFx.pair.split('/')[1]}</p>
            </div>
            <FormField label="From Bank Account *">
              <select className={cvtSelCls('fromAccount')} value={convertForm.fromAccount} onChange={e => setConvertForm(p => ({ ...p, fromAccount: e.target.value }))} onBlur={() => touchConvert('fromAccount')}>
                <option value="">Select account to debit</option>
                {accounts.filter(a => a.status === 'Active').map(a => <option key={a.account} value={a.bank}>{a.bank} ({a.account}) — {a.balance}</option>)}
              </select>
              {!convertForm.fromAccount && convertTouched.fromAccount && <p className={errMsg}>Please select an account</p>}
            </FormField>
            <FormField label={`Amount (${convertFx.pair.split('/')[0]}) *`}>
              <input className={cvtCls('amount')} type="number" placeholder="Enter amount to convert" value={convertForm.amount} onChange={e => setConvertForm(p => ({ ...p, amount: e.target.value }))} onBlur={() => touchConvert('amount')} />
              {!convertForm.amount && convertTouched.amount && <p className={errMsg}>Amount is required</p>}
              {convertForm.amount && <p className="text-emerald-600 text-xs mt-1 font-medium">≈ {convertFx.pair.split('/')[1] === 'INR' ? '₹' : ''}{(parseFloat(convertForm.amount) * parseFloat(convertFx.rate)).toLocaleString(undefined, { maximumFractionDigits: 2 })} {convertFx.pair.split('/')[1]}</p>}
            </FormField>
            <FormField label="Purpose / Remarks *">
              <input className={cvtCls('purpose')} placeholder="e.g. Vendor payment, Import purchase" value={convertForm.purpose} onChange={e => setConvertForm(p => ({ ...p, purpose: e.target.value }))} onBlur={() => touchConvert('purpose')} />
              {!convertForm.purpose && convertTouched.purpose && <p className={errMsg}>Purpose is required</p>}
            </FormField>
            <div className="flex gap-3 pt-2">
              <button onClick={() => { setConvertFx(null); setConvertForm(emptyConvertForm); setConvertTouched({}); }} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
              <button onClick={handleConvert} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center justify-center gap-2">
                <ArrowLeftRight className="w-3.5 h-3.5" /> Convert Now
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* ── Page Header ───────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Cash Management</h1>
          <p className="text-gray-500 text-sm mt-1">Bank accounts, cash flow & treasury operations</p>
        </div>
        <button onClick={() => setShowAddAccount(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
          <Plus className="w-4 h-4" /> Add Account
        </button>
      </div>

      {/* ── KPI Cards ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Total Cash', value: '$2,37,500', valueColor: 'text-white', iconBg: 'bg-gray-700', icon: DollarSign, iconColor: 'text-gray-300' },
          { label: 'Monthly Inflow', value: '$2,45,800', valueColor: 'text-emerald-400', iconBg: 'bg-emerald-500/20', icon: TrendingUp, iconColor: 'text-emerald-400' },
          { label: 'Monthly Outflow', value: '$98,240', valueColor: 'text-rose-400', iconBg: 'bg-rose-500/20', icon: TrendingUp, iconColor: 'text-rose-400' },
          { label: 'Bank Accounts', value: String(accounts.length), valueColor: 'text-blue-400', iconBg: 'bg-blue-500/20', icon: Building, iconColor: 'text-blue-400' },
        ].map(s => (
          <div key={s.label} className="bg-gray-900 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-sm">{s.label}</span>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center ${s.iconBg}`}>
                <s.icon className={`w-4 h-4 ${s.iconColor}`} />
              </div>
            </div>
            <div className={`text-2xl font-bold ${s.valueColor}`}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* ── Tabs ──────────────────────────────────────────────────────────── */}
      <div className="border-b border-gray-200">
        <div className="flex">
          {tabs.map((tab, i) => (
            <button key={tab} onClick={() => setActiveTab(i)} className={`px-4 py-2.5 text-sm border-b-2 transition-colors ${activeTab === i ? 'text-blue-600 font-medium border-blue-600' : 'text-gray-500 border-transparent hover:text-gray-700'}`}>{tab}</button>
          ))}
        </div>
      </div>

      {/* ── Tab 0: Bank Accounts ──────────────────────────────────────────── */}
      {activeTab === 0 && (
        <div className="bg-gray-900 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead><tr className="bg-gray-800 border-b border-gray-700">{['Bank', 'Account No.', 'Type', 'Balance', 'Status', 'Action'].map(h => <th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-800">
              {accounts.map(a => (
                <tr key={a.account} className="hover:bg-gray-800/60 transition-colors">
                  <td className="px-4 py-3.5 text-white text-sm font-medium">{a.bank}</td>
                  <td className="px-4 py-3.5 text-blue-400 text-sm font-mono">{a.account}</td>
                  <td className="px-4 py-3.5 text-gray-300 text-sm">{a.type}</td>
                  <td className={`px-4 py-3.5 text-sm font-semibold ${a.balance.startsWith('-') ? 'text-rose-400' : 'text-emerald-400'}`}>{a.balance}</td>
                  <td className="px-4 py-3.5"><span className={`px-2 py-0.5 rounded text-xs font-medium ${a.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : a.status === 'Overdrawn' ? 'bg-rose-500/20 text-rose-400' : 'bg-gray-500/20 text-gray-400'}`}>{a.status}</span></td>
                  <td className="px-4 py-3.5"><button onClick={() => openManage(a)} className="flex items-center gap-1.5 px-3 py-1 bg-gray-700 text-gray-300 rounded text-xs hover:bg-gray-600"><Pencil className="w-3 h-3" /> Manage</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Tab 1: Cash Flow ──────────────────────────────────────────────── */}
      {activeTab === 1 && (
        <div className="bg-gray-900 rounded-xl p-5">
          <h2 className="text-white font-semibold mb-5">Cash Flow — Last 3 Months</h2>
          <div className="space-y-6">
            {cashFlowData.map(d => {
              const max = 250000;
              return (
                <div key={d.month}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300 text-sm font-medium">{d.month} 2026</span>
                    <span className="text-emerald-400 text-xs">Net: +${(d.inflow - d.outflow).toLocaleString()}</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-500 text-xs w-14">Inflow</span>
                      <div className="flex-1 h-5 bg-gray-800 rounded overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded flex items-center pl-2" style={{ width: `${(d.inflow / max) * 100}%` }}>
                          <span className="text-white text-[10px] font-medium">${(d.inflow / 1000).toFixed(0)}k</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-500 text-xs w-14">Outflow</span>
                      <div className="flex-1 h-5 bg-gray-800 rounded overflow-hidden">
                        <div className="h-full bg-rose-500 rounded flex items-center pl-2" style={{ width: `${(d.outflow / max) * 100}%` }}>
                          <span className="text-white text-[10px] font-medium">${(d.outflow / 1000).toFixed(0)}k</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Tab 2: Bank Reconciliation ────────────────────────────────────── */}
      {activeTab === 2 && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Matched Transactions', value: String(matchedCount), color: 'text-emerald-400' },
              { label: 'Unmatched', value: String(unmatchedCount), color: unmatchedCount > 0 ? 'text-rose-400' : 'text-emerald-400' },
              { label: 'Last Reconciled', value: 'Mar 11', color: 'text-white' },
            ].map(s => (
              <div key={s.label} className="bg-gray-900 rounded-xl p-4">
                <div className="text-gray-400 text-sm mb-1">{s.label}</div>
                <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
              </div>
            ))}
          </div>
          <div className="flex items-start gap-3 bg-blue-500/10 border border-blue-500/20 rounded-xl px-4 py-3">
          
            
          </div>
          <div className="bg-gray-900 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
              <h2 className="text-white font-semibold text-sm">Bank Statement vs Books</h2>
              <button onClick={handleRunReconciliation} disabled={reconciling} className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium transition-all ${reconciling ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                <RefreshCw className={`w-3 h-3 ${reconciling ? 'animate-spin' : ''}`} />
                {reconciling ? 'Running...' : 'Run Reconciliation'}
              </button>
            </div>
            <table className="w-full">
              <thead><tr className="bg-gray-800 border-b border-gray-700">{['Date', 'Reference', 'Description', 'Bank Amount', 'Book Amount', 'Status', 'Action'].map(h => <th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3">{h}</th>)}</tr></thead>
              <tbody className="divide-y divide-gray-800">
                {reconciliation.map((r, i) => (
                  <tr key={i} className="hover:bg-gray-800/60 transition-colors">
                    <td className="px-4 py-3.5 text-gray-400 text-sm">{r.date}</td>
                    <td className="px-4 py-3.5 text-blue-400 text-sm font-mono">{r.ref}</td>
                    <td className="px-4 py-3.5 text-white text-sm">{r.desc}</td>
                    <td className="px-4 py-3.5 text-emerald-400 text-sm">{r.bankAmt}</td>
                    <td className="px-4 py-3.5 text-gray-300 text-sm">{r.bookAmt}</td>
                    <td className="px-4 py-3.5">
                      <span className={`flex items-center gap-1 w-fit px-2 py-0.5 rounded text-xs font-medium ${r.status === 'Matched' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                        {r.status === 'Matched' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                        {r.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      {r.status === 'Unmatched' ? (
                        <button onClick={() => openResolve(r)} className="px-3 py-1 bg-amber-500 text-white rounded text-xs hover:bg-amber-600 font-medium">Resolve</button>
                      ) : (
                        <span className="text-gray-600 text-xs">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Tab 3: Treasury ───────────────────────────────────────────────── */}
      {activeTab === 3 && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Total Invested', value: `$${totalInvested.toLocaleString()}`, color: 'text-white' },
              { label: 'Current Value', value: `$${totalValue.toLocaleString()}`, color: 'text-emerald-400' },
              { label: 'Unrealised Gain', value: `+$${totalGain.toLocaleString()}`, color: 'text-emerald-400' },
            ].map(s => (
              <div key={s.label} className="bg-gray-900 rounded-xl p-4">
                <div className="text-gray-400 text-sm mb-1">{s.label}</div>
                <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
              </div>
            ))}
          </div>
          <div className="bg-gray-900 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
              <h2 className="text-white font-semibold text-sm">Treasury Portfolio</h2>
              <button onClick={() => setShowAddInvestment(true)} className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 flex items-center gap-1">
                <Plus className="w-3 h-3" /> Add Investment
              </button>
            </div>
            <table className="w-full">
              <thead><tr className="bg-gray-800 border-b border-gray-700">{['Instrument', 'Principal', 'Rate', 'Maturity', 'Current Value', 'Action'].map(h => <th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3">{h}</th>)}</tr></thead>
              <tbody className="divide-y divide-gray-800">
                {treasury.map((t, i) => (
                  <tr key={i} className="hover:bg-gray-800/60 transition-colors">
                    <td className="px-4 py-3.5 text-white text-sm font-medium">{t.instrument}</td>
                    <td className="px-4 py-3.5 text-amber-400 text-sm">{t.principal}</td>
                    <td className="px-4 py-3.5 text-blue-400 text-sm font-mono">{t.rate}</td>
                    <td className="px-4 py-3.5 text-gray-300 text-sm">{t.maturity}</td>
                    <td className="px-4 py-3.5 text-emerald-400 text-sm font-semibold">{t.value}</td>
                    <td className="px-4 py-3.5">
                      <button onClick={() => setViewInvestment(t)} className="flex items-center gap-1.5 px-3 py-1 bg-gray-700 text-gray-300 rounded text-xs hover:bg-gray-600">
                        <Eye className="w-3 h-3" /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Tab 4: Foreign Exchange ────────────────────────────────────────── */}
      {activeTab === 4 && (
        <div className="bg-gray-900 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
            <h2 className="text-white font-semibold text-sm">Live FX Rates (vs INR)</h2>
            <button className="flex items-center gap-1 text-blue-400 text-xs hover:text-blue-300"><RefreshCw className="w-3 h-3" /> Refresh</button>
          </div>
          <table className="w-full">
            <thead><tr className="bg-gray-800 border-b border-gray-700">{['Currency Pair', 'Rate', '24h Change', 'Trend', 'Action'].map(h => <th key={h} className="text-left text-gray-400 text-xs font-medium px-4 py-3">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-800">
              {fxRates.map(r => (
                <tr key={r.pair} className="hover:bg-gray-800/60 transition-colors">
                  <td className="px-4 py-3.5 text-white text-sm font-medium">{r.pair}</td>
                  <td className="px-4 py-3.5 text-amber-400 text-sm font-mono font-bold">{r.rate}</td>
                  <td className={`px-4 py-3.5 text-sm font-medium ${r.trending ? 'text-emerald-400' : 'text-rose-400'}`}>{r.change}</td>
                  <td className="px-4 py-3.5"><span className={`px-2 py-0.5 rounded text-xs ${r.trending ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>{r.trending ? '↑ Up' : '↓ Down'}</span></td>
                  <td className="px-4 py-3.5">
                    <button onClick={() => openConvert(r.pair, r.rate)} className="flex items-center gap-1.5 px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">
                      <ArrowLeftRight className="w-3 h-3" /> Convert
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}