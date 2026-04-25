import SuperDistributorLayout from '../../components/SuperDistributorLayout';
import { Building2, Users, TrendingUp, Zap, ArrowUpRight, ArrowDownRight, Globe } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';

const dashData = [
  { name: 'Jan', dist: 4000, ret: 2400 }, { name: 'Feb', dist: 3000, ret: 1398 },
  { name: 'Mar', dist: 2000, ret: 9800 }, { name: 'Apr', dist: 3780, ret: 3908 },
  { name: 'May', dist: 2890, ret: 4800 }, { name: 'Jun', dist: 3390, ret: 3800 },
];

const StatCard = ({ label, value, icon: Icon, growth, color, desc }) => (
    <div className="bg-white p-10 rounded-[3.5rem] shadow-sm border border-slate-100 flex flex-col gap-6 group hover:shadow-2xl hover:scale-[1.02] transition-all duration-500">
        <div className="flex justify-between items-start">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg ${color} group-hover:rotate-12 transition-transform`}>
                <Icon size={24} />
            </div>
            <div className={`flex items-center text-[10px] font-black px-3 py-1.5 rounded-full ${
                growth.startsWith('+') ? 'text-emerald-500 bg-emerald-50' : 'text-red-500 bg-red-50'
            }`}>
                {growth} {growth.startsWith('+') ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            </div>
        </div>
        <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{label}</span>
            <span className="text-3xl font-black text-slate-900 tracking-tighter">{value}</span>
            <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mt-1">{desc}</p>
        </div>
    </div>
);

const SuperDistributorDashboard = () => {
    return (
        <SuperDistributorLayout>
            <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">Master Console 👋</h1>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mt-2 italic">Global Control • Hierarchy Tier 1 • Strategic Expansion</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <StatCard label="Total Distributors" value="24" icon={Building2} growth="+12%" color="bg-[#0f172a]" desc="Distributor Growth Status" />
                    <StatCard label="Total Retailers" value="1,842" icon={Users} growth="+24%" color="bg-[#10b981]" desc="Network-wide fleet" />
                    <StatCard label="Master Earnings" value="₹2.8L" icon={TrendingUp} growth="+15%" color="bg-blue-600" desc="Tier-1 Commission" />
                    <StatCard label="Global Volume" value="₹85.4L" icon={Zap} growth="+8.5%" color="bg-rose-500" desc="Volume Analytics" />
                </div>

                <div className="flex flex-col xl:flex-row gap-10">
                    <div className="flex-1 bg-[#0f172a] p-12 rounded-[3.5rem] shadow-2xl h-[450px] text-white relative overflow-hidden">
                        <div className="relative z-10 flex flex-col gap-2 mb-10">
                            <h3 className="text-2xl font-black tracking-tight">Ecosystem Velocity</h3>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Growth Comparison between Distributors & Merchants</p>
                        </div>
                        <ResponsiveContainer width="100%" height="65%">
                            <AreaChart data={dashData}>
                                <Area type="monotone" dataKey="dist" stroke="#10b981" fill="#10b981" fillOpacity={0.1} strokeWidth={4} />
                                <Area type="monotone" dataKey="ret" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.05} strokeWidth={4} />
                            </AreaChart>
                        </ResponsiveContainer>
                        <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-emerald-500 rounded-full blur-[120px] opacity-10"></div>
                    </div>

                    <div className="w-full xl:w-[400px] flex flex-col gap-8">
                        <div className="bg-[#10b981] p-10 rounded-[3.5rem] text-white shadow-2xl flex flex-col gap-6 relative overflow-hidden group">
                           <div className="relative z-10">
                                <h3 className="text-2xl font-black tracking-tighter italic">Strategic Onboarding.</h3>
                                <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest mt-4 leading-relaxed">Expand your Tier-2 command center by appointing new district distributors.</p>
                                <button className="mt-8 px-8 py-5 bg-white text-emerald-600 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all">Enroll Distributor</button>
                           </div>
                           <Globe size={120} className="absolute -right-10 -bottom-10 text-white/10" fill="white" />
                        </div>
                    </div>
                </div>
            </div>
        </SuperDistributorLayout>
    );
};

export default SuperDistributorDashboard;
