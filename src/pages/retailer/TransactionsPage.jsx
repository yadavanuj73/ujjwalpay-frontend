import { useState } from 'react';
import RetailerLayout from '../../components/RetailerLayout';
import { Filter, ArrowUpRight, ArrowDownRight, MoreHorizontal, CheckCircle2, XCircle, Clock, Calendar } from 'lucide-react';

const TRANSACTIONS = [
    { id: 'TXN1001', type: 'Mobile Recharge', amount: 249, status: 'success', date: '28 Mar, 10:45 AM', bank: 'SBI' },
    { id: 'TXN1002', type: 'DTH Payment', amount: 500, status: 'success', date: '28 Mar, 09:30 AM', bank: 'HDFC' },
    { id: 'TXN1003', type: 'Wallet Add', amount: 2000, status: 'pending', date: '28 Mar, 08:15 AM', bank: 'UPI' },
    { id: 'TXN1004', type: 'Electricity Bill', amount: 1240, status: 'failed', date: '27 Mar, 06:20 PM', bank: 'Paytm' },
    { id: 'TXN1005', type: 'Payout to Bank', amount: 5000, status: 'success', date: '27 Mar, 04:10 PM', bank: 'ICICI' },
    { id: 'TXN1006', type: 'Cash Withdrawal', amount: 2500, status: 'success', date: '27 Mar, 02:20 PM', bank: 'SBI' },
];

const StatusBadge = ({ status }) => {
    const styles = { success: 'bg-green-50 text-green-600', pending: 'bg-amber-50 text-amber-600', failed: 'bg-red-50 text-red-600' };
    const Icons = { success: CheckCircle2, pending: Clock, failed: XCircle };
    const Icon = Icons[status];
    return (
        <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest w-fit ${styles[status]}`}>
            <Icon size={12} strokeWidth={3} /> {status}
        </span>
    );
};

const TransactionsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <RetailerLayout>
            <div className="flex flex-col gap-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Transaction History</h1>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Full record of all your business activities</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-50 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm hover:shadow-lg transition-all"><Calendar size={14} /> Date Range</button>
                        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all"><Filter size={14} /> Filter</button>
                    </div>
                </div>

                <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-50">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">
                                    <th className="py-6">Transaction ID</th>
                                    <th className="py-6">Description</th>
                                    <th className="py-6">Amount</th>
                                    <th className="py-6">Bank/Mode</th>
                                    <th className="py-6">Status</th>
                                    <th className="py-6">Date & Time</th>
                                    <th className="py-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {TRANSACTIONS.map(txn => (
                                    <tr key={txn.id} className="group hover:bg-slate-50/50 transition-all">
                                        <td className="py-6 text-xs font-black text-slate-900">{txn.id}</td>
                                        <td className="py-6 text-xs font-bold text-slate-600">{txn.type}</td>
                                        <td className="py-6 text-sm font-black text-slate-900 flex items-center gap-2">
                                            {txn.type.includes('Wallet Add') ? <ArrowDownRight size={14} className="text-green-500" /> : <ArrowUpRight size={14} className="text-red-500" />}
                                            ₹{txn.amount.toLocaleString()}
                                        </td>
                                        <td className="py-6 text-xs font-black text-blue-600 uppercase tracking-widest">{txn.bank}</td>
                                        <td className="py-6"><StatusBadge status={txn.status} /></td>
                                        <td className="py-6 text-xs font-bold text-slate-400">{txn.date}</td>
                                        <td className="py-6 text-right"><MoreHorizontal className="text-slate-300 ml-auto cursor-pointer" size={20} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex justify-center mt-4">
                    <div className="flex gap-2">
                        {[1, 2, 3, 4].map(page => (
                            <button key={page} className={`w-10 h-10 rounded-xl flex items-center justify-center text-[11px] font-black transition-all ${page === 1 ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-slate-400 hover:text-blue-600 hover:bg-blue-50'}`}>{page}</button>
                        ))}
                    </div>
                </div>
            </div>
        </RetailerLayout>
    );
};

export default TransactionsPage;
