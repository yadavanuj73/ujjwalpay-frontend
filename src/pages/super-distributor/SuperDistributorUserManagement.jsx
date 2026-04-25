import { useState } from 'react';
import SuperDistributorLayout from '../../components/SuperDistributorLayout';
import { Users, Plus, CheckCircle2, Clock, XCircle, MoreHorizontal } from 'lucide-react';

const MOCK_DATA = {
    distributors: [
        { id: 'DIST001', name: 'Metro Distribution', owner: 'Rahul Varma', city: 'Mumbai', status: 'approved', balance: 450000, network: 120 },
        { id: 'DIST002', name: 'Delhi Partners', owner: 'Sanjay Gupta', city: 'Delhi', status: 'approved', balance: 125000, network: 85 },
        { id: 'DIST003', name: 'Pune Regional', owner: 'Priya Shinde', city: 'Pune', status: 'pending', balance: 0, network: 14 },
    ],
    retailers: [
        { id: 'RE091', name: 'Aman Telecom', city: 'Meerut', status: 'approved', balance: 12500, parent: 'Metro Distribution' },
        { id: 'RE092', name: 'Suraj Digital', city: 'Ambala', status: 'pending', balance: 0, parent: 'Delhi Partners' },
        { id: 'RE093', name: 'Pooja Shop', city: 'Noida', status: 'approved', balance: 5200, parent: 'Delhi Partners' },
    ]
};

const StatusBadge = ({ status }) => {
    const styles = { approved: 'bg-green-50 text-green-600', pending: 'bg-amber-50 text-amber-600', failed: 'bg-red-50 text-red-600' };
    const Icons = { approved: CheckCircle2, pending: Clock, failed: XCircle };
    const Icon = Icons[status];
    return (
        <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest w-fit ${styles[status]}`}>
            <Icon size={12} strokeWidth={3} /> {status}
        </span>
    );
};

const SuperDistributorUserManagement = () => {
    const [view, setView] = useState('distributors'); // 'distributors' or 'retailers'
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    return (
        <SuperDistributorLayout>
            <div className="flex flex-col gap-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none leading-none">Global Partner Directory</h1>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-[0.25em] mt-2">Central Control for Hierarchical Fleet</p>
                    </div>
                    <button 
                        onClick={() => setIsAddModalOpen(true)}
                        className={`flex items-center gap-3 px-8 py-5 text-white rounded-[1.6rem] text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:scale-[1.03] transition-all ${view === 'distributors' ? 'bg-[#0f172a]' : 'bg-[#10b981]'}`}
                    >
                        <Plus size={18} strokeWidth={4} /> Enroll {view === 'distributors' ? 'Distributor' : 'Retailer'}
                    </button>
                </div>

                {/* Tab Switcher */}
                <div className="flex gap-4 p-2 bg-slate-200/50 rounded-3xl w-fit">
                    <button onClick={() => setView('distributors')} className={`px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${view === 'distributors' ? 'bg-[#0f172a] text-white shadow-lg' : 'text-slate-500 hover:text-slate-800'}`}>Distributors</button>
                    <button onClick={() => setView('retailers')} className={`px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${view === 'retailers' ? 'bg-[#10b981] text-white shadow-lg' : 'text-slate-500 hover:text-slate-800'}`}>Retailers</button>
                </div>

                <div className="bg-white p-10 rounded-[3.5rem] shadow-sm border border-slate-100 overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] text-left">
                                <th className="py-6">{view === 'distributors' ? 'Agency Name' : 'Merchant Name'}</th>
                                <th className="py-6">Location</th>
                                {view === 'distributors' ? <th className="py-6">Network Size</th> : <th className="py-6">Parent Partner</th>}
                                <th className="py-6">Current Balance</th>
                                <th className="py-6">Lifecycle Status</th>
                                <th className="py-6 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {MOCK_DATA[view].map(u => (
                                <tr key={u.id} className="group hover:bg-slate-50/50 transition-all">
                                    <td className="py-6 flex flex-col gap-1">
                                        <span className={`text-sm font-black tracking-tight ${view === 'distributors' ? 'text-[#0f172a]' : 'text-[#10b981]'}`}>{u.name}</span>
                                        <span className="text-[10px] font-bold text-slate-400">{view === 'distributors' ? u.owner : u.id}</span>
                                    </td>
                                    <td className="py-6 text-xs font-black text-slate-500 uppercase tracking-widest">{u.city}</td>
                                    <td className="py-6">
                                        {view === 'distributors' ? (
                                            <div className="flex items-center gap-2">
                                                <Users size={14} className="text-slate-400" />
                                                <span className="text-sm font-black text-slate-800">{u.network} Partners</span>
                                            </div>
                                        ) : (
                                            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest">{u.parent}</span>
                                        )}
                                    </td>
                                    <td className="py-6 text-sm font-black text-slate-800">₹{u.balance.toLocaleString()}</td>
                                    <td className="py-6"><StatusBadge status={u.status} /></td>
                                    <td className="py-6 text-right"><MoreHorizontal className="text-slate-200 ml-auto cursor-pointer group-hover:text-emerald-500" /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </SuperDistributorLayout>
    );
};

export default SuperDistributorUserManagement;
