import DistributorLayout from '../../components/DistributorLayout';
import { Users, Wallet, TrendingUp, Zap, ArrowUpRight, ArrowDownRight, MoreHorizontal } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, Cell } from 'recharts';

const data = [
    { day: 'Mon', count: 12 }, { day: 'Tue', count: 18 }, { day: 'Wed', count: 32 },
    { day: 'Thu', count: 24 }, { day: 'Fri', count: 48 }, { day: 'Sat', count: 52 }, { day: 'Sun', count: 42 },
];

const StatCard = ({ label, value, icon: Icon, growth, color }) => (
    <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-50 flex flex-col gap-6 group hover:shadow-xl transition-all duration-500">
        <div className="flex justify-between items-start">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg ${color} group-hover:scale-110 transition-transform`}>
                <Icon size={24} />
            </div>
            <MoreHorizontal size={20} className="text-slate-200" />
        </div>
        <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{label}</span>
            <div className="flex items-center gap-4">
                <span className="text-3xl font-black text-slate-900 tracking-tighter">{value}</span>
                <span className={`flex items-center text-[10px] font-black px-2 py-1 rounded-full ${
                    growth.startsWith('+') ? 'text-green-500 bg-green-50' : 'text-red-500 bg-red-50'
                }`}>
                    {growth} {growth.startsWith('+') ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                </span>
            </div>
        </div>
    </div>
);

const DistributorDashboard = () => {
    return (
        <DistributorLayout>
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-1">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none leading-none">Distributor Hub 👋</h1>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-[0.25em] mt-2">Managing 482 Registered Retailers • Platinum Status</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <StatCard label="Total Retailers" value="482" icon={Users} growth="+12%" color="bg-[#ffb400]" />
                    <StatCard label="Wallet Bal" value="₹12.5L" icon={Wallet} growth="+24%" color="bg-[#111e35]" />
                    <StatCard label="Comm Earnings" value="₹52,480" icon={TrendingUp} growth="+7.7%" color="bg-blue-600" />
                    <StatCard label="Active Status" value="94%" icon={Zap} growth="+2.1%" color="bg-emerald-500" />
                </div>

                <div className="flex flex-col xl:flex-row gap-8">
                    {/* Performance Chart */}
                    <div className="flex-1 bg-white p-10 rounded-[3rem] shadow-sm border border-slate-50 flex flex-col gap-10">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-black text-slate-800 tracking-tight">Onboarding Velocity</h3>
                            <button className="text-[10px] font-black text-[#ffb400] uppercase tracking-widest hover:underline">Download Stats</button>
                        </div>
                        <div className="h-[280px] w-full mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data}>
                                    <Tooltip cursor={{fill: '#f8fafc', radius: 12}} />
                                    <Bar dataKey="count" radius={[12, 12, 12, 12]} barSize={40}>
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={index === 4 ? '#ffb400' : '#eff6ff'} />
                                        ))}
                                    </Bar>
                                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 800}} dy={15} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Quick Tools */}
                    <div className="w-full xl:w-[400px] flex flex-col gap-8">
                        <div className="bg-[#111e35] p-10 rounded-[3rem] text-white flex flex-col gap-6 shadow-2xl relative overflow-hidden">
                            <div className="relative z-10 flex flex-col gap-4">
                                <h3 className="text-2xl font-black tracking-tighter">Expand Your Fleet.</h3>
                                <p className="text-xs font-bold text-slate-400 leading-relaxed uppercase tracking-widest">Enroll new retailers and start earning commission on every transaction they process.</p>
                                <button className="mt-4 w-full py-5 bg-[#ffb400] text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-yellow-500/20 hover:scale-105 active:scale-95 transition-all">Add New Retailer</button>
                            </div>
                            <Zap size={100} className="absolute -right-10 -top-10 text-white/5" fill="currentColor" />
                        </div>
                    </div>
                </div>
            </div>
        </DistributorLayout>
    );
};

export default DistributorDashboard;
