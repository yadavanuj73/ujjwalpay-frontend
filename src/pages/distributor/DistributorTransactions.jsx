import DistributorLayout from '../../components/DistributorLayout';
import { MoreHorizontal, CheckCircle2, XCircle, Clock, Calendar, Download } from 'lucide-react';

const DIST_TRANSACTIONS = [
    { id: 'DTX9901', retailer: 'Rahul Electronics', city: 'Mumbai', amount: 5000, type: 'Recharge Load', status: 'success', date: '28 Mar, 11:20 AM' },
    { id: 'DTX9902', retailer: 'Aman Telecom', city: 'Delhi', amount: 12000, type: 'AEPS Payout', status: 'success', date: '28 Mar, 10:45 AM' },
    { id: 'DTX9903', retailer: 'Priya Recharge', city: 'Pune', amount: 2000, type: 'Wallet Topup', status: 'pending', date: '28 Mar, 09:30 AM' },
    { id: 'DTX9904', retailer: 'Ravi Digital Shop', city: 'Surat', amount: 8500, type: 'Direct Payout', status: 'failed', date: '27 Mar, 06:15 PM' },
    { id: 'DTX9905', retailer: 'Kunal Mobile Point', city: 'Jaipur', amount: 3000, type: 'Wallet Topup', status: 'success', date: '27 Mar, 04:50 PM' },
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

const DistributorTransactions = () => {
    return (
        <DistributorLayout>
            <div className="flex flex-col gap-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none leading-none">Global Transactions</h1>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-[0.25em] mt-2">Network-wide settlement logs</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="flex items-center gap-3 px-8 py-4 bg-white border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:shadow-lg transition-all"><Calendar size={16} /> History</button>
                        <button className="flex items-center gap-3 px-8 py-4 bg-[#111e35] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-[#ffb400] transition-all"><Download size={16} /> Export CSV</button>
                    </div>
                </div>

                <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-50">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] text-left">
                                    <th className="py-6">TXN Details</th>
                                    <th className="py-6">Retailer Partner</th>
                                    <th className="py-6">Amount</th>
                                    <th className="py-6">Transaction Type</th>
                                    <th className="py-6">Status</th>
                                    <th className="py-6 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {DIST_TRANSACTIONS.map(txn => (
                                    <tr key={txn.id} className="group hover:bg-slate-50/50 transition-all">
                                        <td className="py-6 flex flex-col gap-1">
                                            <span className="text-sm font-black text-slate-800 tracking-tight">{txn.id}</span>
                                            <span className="text-[10px] font-bold text-slate-400">{txn.date}</span>
                                        </td>
                                        <td className="py-6 flex flex-col gap-1">
                                            <span className="text-sm font-black text-[#111e35] tracking-tight">{txn.retailer}</span>
                                            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{txn.city}</span>
                                        </td>
                                        <td className="py-6 text-sm font-black text-slate-900 tracking-tight">₹{txn.amount.toLocaleString()}</td>
                                        <td className="py-6 text-xs font-black text-slate-500 uppercase tracking-[0.1em]">{txn.type}</td>
                                        <td className="py-6"><StatusBadge status={txn.status} /></td>
                                        <td className="py-6 text-right"><MoreHorizontal className="text-slate-200 ml-auto cursor-pointer group-hover:text-[#ffb400]" /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DistributorLayout>
    );
};

export default DistributorTransactions;
