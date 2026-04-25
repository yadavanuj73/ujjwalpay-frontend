import DistributorLayout from '../../components/DistributorLayout';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { Download, TrendingUp, Activity, Globe } from 'lucide-react';

const dashData = [
  { name: 'Jan', value: 4000, growth: 2400 }, { name: 'Feb', value: 3000, growth: 1398 },
  { name: 'Mar', value: 2000, growth: 9800 }, { name: 'Apr', value: 2780, growth: 3908 },
  { name: 'May', value: 1890, growth: 4800 }, { name: 'Jun', value: 2390, growth: 3800 },
];

const DistributorReports = () => {
    return (
        <DistributorLayout>
            <div className="flex flex-col gap-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">Intelligence Reports</h1>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-[0.25em] mt-2">Deep analytics of your distributor network</p>
                    </div>
                    <button className="flex items-center gap-3 px-8 py-4 bg-[#ffb400] text-white rounded-[1.6rem] text-[10px] font-black uppercase tracking-widest shadow-xl shadow-yellow-500/20 hover:scale-[1.03] transition-all">
                        <Download size={16} /> Generate BI Report
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[{ label: 'Net Commission', value: '₹1.25L', icon: TrendingUp }, { label: 'Top Performing City', value: 'Mumbai', icon: Globe }, { label: 'Average Retailer Bal', value: '₹8,450', icon: Activity }].map((stat, i) => (
                        <div key={i} className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-50 flex flex-col gap-6 group hover:shadow-xl transition-all duration-300">
                            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-[#111e35] group-hover:bg-[#111e35] group-hover:text-white transition-all shadow-sm"><stat.icon size={26} /></div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</span>
                                <span className="text-3xl font-black tracking-tight text-[#111e35] mt-1">{stat.value}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1 bg-[#111e35] p-10 rounded-[3rem] shadow-2xl h-[400px] text-white overflow-hidden relative">
                        <h3 className="text-xl font-black tracking-tight relative z-10">Revenue Projections</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-10 relative z-10">Earnings vs Forecasted growth</p>
                        <ResponsiveContainer width="100%" height="70%">
                            <AreaChart data={dashData}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#ffb400" stopOpacity={0.8}/><stop offset="95%" stopColor="#ffb400" stopOpacity={0}/></linearGradient>
                                </defs>
                                <Area type="monotone" dataKey="value" stroke="#ffb400" fillOpacity={1} fill="url(#colorValue)" strokeWidth={4} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </DistributorLayout>
    );
};

export default DistributorReports;
