import SuperDistributorLayout from '../../components/SuperDistributorLayout';
import { Wallet, ShieldCheck, Settings, Download, Activity, TrendingUp } from 'lucide-react';

export const SuperDistributorMasterLog = () => (
    <SuperDistributorLayout>
        <div className="flex flex-col gap-8">
            <div className="flex justify-between items-end">
                <div className="flex flex-col gap-1">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none leading-none">Hierarchical Master Log</h1>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-[0.25em] mt-2 italic">Real-time audit of every movement within the network</p>
                </div>
                <button className="flex items-center gap-3 px-8 py-5 bg-[#0f172a] text-white rounded-[1.6rem] text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-all outline-none">
                    <Download size={18} /> Export Global Audit
                </button>
            </div>

            <div className="bg-white p-10 rounded-[3.5rem] shadow-sm border border-slate-100">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] text-left">
                            <th className="py-6">Timestamp</th>
                            <th className="py-6">EntityType</th>
                            <th className="py-6">Entity ID</th>
                            <th className="py-6">Activity Type</th>
                            <th className="py-6">Quantum</th>
                            <th className="py-6">Velocity Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {[
                            { time: '14:52:10', type: 'Distributor', id: 'D-9921', action: 'Liquidity Injection', amt: '₹5,00,000', status: 'Success' },
                            { time: '14:48:05', type: 'Retailer', id: 'R-1022', action: 'AEPS Payout', amt: '₹12,450', status: 'Success' },
                            { time: '14:45:30', type: 'Distributor', id: 'D-4822', action: 'Retailer Onboarding', amt: '-', status: 'Success' },
                        ].map((log, i) => (
                            <tr key={i} className="group hover:bg-slate-50/50 transition-all cursor-pointer">
                                <td className="py-6 text-[11px] font-black text-slate-400">{log.time}</td>
                                <td className="py-6"><span className="text-[10px] font-black uppercase tracking-widest text-[#10b981] bg-emerald-50 px-3 py-1 rounded-full">{log.type}</span></td>
                                <td className="py-6 text-sm font-black text-slate-800">{log.id}</td>
                                <td className="py-6 text-xs font-bold text-slate-500 uppercase tracking-widest">{log.action}</td>
                                <td className="py-6 text-sm font-black text-slate-900">{log.amt}</td>
                                <td className="py-6"><span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">{log.status}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </SuperDistributorLayout>
);

export const SuperDistributorKPI = () => (
    <SuperDistributorLayout>
        <div className="flex flex-col gap-8">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none leading-none">Strategic KPI Analytics</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm flex flex-col gap-6">
                    <Activity className="text-emerald-500" size={32} />
                    <h3 className="text-xl font-black tracking-tight">Network Velocity</h3>
                    <p className="text-sm font-medium text-slate-400 leading-relaxed">Percentage of active retailers processing more than 10 daily transactions.</p>
                    <div className="text-4xl font-black text-slate-900 mt-2">84.2%</div>
                </div>
                <div className="bg-[#0f172a] p-10 rounded-[3.5rem] shadow-2xl flex flex-col gap-6 text-white">
                    <TrendingUp className="text-[#10b981]" size={32} />
                    <h3 className="text-xl font-black tracking-tight">Volume Growth</h3>
                    <p className="text-sm font-medium text-slate-400 leading-relaxed">Month-over-month increase in aggregate gross settlement value.</p>
                    <div className="text-4xl font-black text-white mt-2">+24.8%</div>
                </div>
            </div>
        </div>
    </SuperDistributorLayout>
);

export const SuperDistributorRevenue = () => (
    <SuperDistributorLayout>
        <div className="flex flex-col gap-8">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none leading-none">Master Revenue Hub</h1>
            <div className="bg-emerald-500 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                    <span className="text-xs font-black uppercase tracking-[0.3em] opacity-80">Aggregate Commission Holdings</span>
                    <h2 className="text-6xl font-black tracking-tighter mt-4 leading-none">₹8.42,00,000</h2>
                    <div className="flex gap-4 mt-12">
                        <button className="px-10 py-5 bg-white text-emerald-600 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-all">Settle to Main Wallet</button>
                    </div>
                </div>
                <Wallet size={200} className="absolute -right-20 -bottom-20 opacity-10" fill="white" />
            </div>
        </div>
    </SuperDistributorLayout>
);

export const SuperDistributorKYC = () => (
    <SuperDistributorLayout>
         <div className="flex flex-col gap-8">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none leading-none">Compliance & KYC Desk</h1>
            <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm">
                <div className="flex gap-10 items-center mb-10 pb-10 border-b border-slate-50">
                    <div className="flex flex-col gap-1">
                        <span className="text-3xl font-black text-amber-500 leading-none">42</span>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Pending Verifications</span>
                    </div>
                </div>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[11px] h-40 flex items-center justify-center italic">No urgent compliance tickets remaining for this session.</p>
            </div>
        </div>
    </SuperDistributorLayout>
);

export const SuperDistributorConfig = () => (
    <SuperDistributorLayout>
        <div className="flex flex-col gap-8">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none leading-none">System Architecture Config</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col gap-4 group cursor-pointer hover:border-emerald-300 transition-colors">
                    <Settings className="text-slate-300 group-hover:text-emerald-500 transition-colors" size={24} />
                    <h3 className="text-lg font-black tracking-tight">Global Commission Slab</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Modify revenue sharing architecture across hierarchy tiers.</p>
                </div>
                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col gap-4 group cursor-pointer hover:border-emerald-300 transition-colors">
                    <ShieldCheck className="text-slate-300 group-hover:text-emerald-500 transition-colors" size={24} />
                    <h3 className="text-lg font-black tracking-tight">Security & Auth Protocols</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Configure 2FA, biometric, and IP-white-listing global rules.</p>
                </div>
            </div>
        </div>
    </SuperDistributorLayout>
);
