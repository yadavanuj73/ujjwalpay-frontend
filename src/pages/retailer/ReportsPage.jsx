import RetailerLayout from '../../components/RetailerLayout';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { Download, PieChart, Activity, TrendingUp } from 'lucide-react';

const reportData = [
  { name: 'Mon', revenue: 4000, profit: 2400 }, { name: 'Tue', revenue: 3000, profit: 1398 },
  { name: 'Wed', revenue: 2000, profit: 9800 }, { name: 'Thu', revenue: 2780, profit: 3908 },
  { name: 'Fri', revenue: 1890, profit: 4800 }, { name: 'Sat', revenue: 2390, profit: 3800 },
];

const ReportsPage = () => {
    return (
        <RetailerLayout>
            <div className="flex flex-col gap-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Analytics & Reports</h1>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Business growth and performance insights</p>
                    </div>
                    <button className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-[1.6rem] text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all">
                        <Download size={16} /> Export Detailed Report
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[{ label: 'Total Revenue', value: '₹4.58L', icon: TrendingUp }, { label: 'Active Services', value: '24', icon: Activity }, { label: 'Net Profit', value: '₹58,240', icon: PieChart }].map((stat, i) => (
                        <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-50 flex flex-col gap-4">
                            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600"><stat.icon size={22} /></div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
                                <span className="text-3xl font-black tracking-tight text-slate-900 mt-1">{stat.value}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-50 h-[400px]">
                    <h3 className="text-xl font-black text-slate-800 tracking-tight mb-8">Revenue Growth (Weekly)</h3>
                    <ResponsiveContainer width="100%" height="80%">
                        <AreaChart data={reportData}>
                            <defs>
                                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#2563eb" stopOpacity={0.8}/><stop offset="95%" stopColor="#2563eb" stopOpacity={0}/></linearGradient>
                            </defs>
                            <Area type="monotone" dataKey="revenue" stroke="#2563eb" fillOpacity={1} fill="url(#colorRev)" strokeWidth={4} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </RetailerLayout>
    );
};

export default ReportsPage;
