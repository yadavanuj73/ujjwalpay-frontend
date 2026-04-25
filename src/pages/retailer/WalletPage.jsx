import RetailerLayout from '../../components/RetailerLayout';
import { Plus, CreditCard, Clock, History, MoreHorizontal } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
    { day: 'Mon', balance: 50000 }, { day: 'Tue', balance: 45000 }, { day: 'Wed', balance: 60000 },
    { day: 'Thu', balance: 55000 }, { day: 'Fri', balance: 80000 }, { day: 'Sat', balance: 75240 }, { day: 'Sun', balance: 85000 },
];

const WalletPage = () => {
    return (
        <RetailerLayout>
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Smart Wallet</h1>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Manage funds, payouts, and settlements</p>
                </div>

                <div className="flex flex-col xl:flex-row gap-8">
                    {/* Balance Card & Chart */}
                    <div className="flex-1 flex flex-col gap-8">
                        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 p-10 rounded-[3rem] text-white shadow-2xl flex flex-col md:flex-row justify-between items-center gap-10">
                            <div className="flex flex-col gap-4">
                                <span className="text-[10px] font-black text-blue-200/50 uppercase tracking-[0.2em]">Available Balance</span>
                                <h2 className="text-5xl font-black tracking-tighter">₹85,240<span className="text-xl text-blue-300/50">.00</span></h2>
                                <div className="flex gap-4 mt-6">
                                    <button className="px-8 py-4 bg-blue-600 hover:bg-white hover:text-blue-600 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">Quick Topup</button>
                                    <button className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">Bank Transfer</button>
                                </div>
                            </div>
                            <div className="h-[200px] w-full md:w-[300px] relative z-20">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={data}>
                                        <defs>
                                            <linearGradient id="colorBal" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8}/>
                                                <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <Area type="monotone" dataKey="balance" stroke="#3b82f6" fillOpacity={1} fill="url(#colorBal)" strokeWidth={4} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Recent Wallet History */}
                        <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-50 flex flex-col gap-8">
                            <h3 className="text-xl font-black text-slate-800 tracking-tight">Wallet Statement</h3>
                            <div className="space-y-4">
                                {[1, 2, 3].map((_, i) => (
                                    <div key={i} className="flex justify-between items-center p-6 bg-slate-50 rounded-2xl group hover:bg-blue-50 transition-all">
                                        <div className="flex gap-6 items-center">
                                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-md group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                <Plus size={20} strokeWidth={3} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-black text-slate-700">Funds Added via UPI</span>
                                                <span className="text-[10px] font-bold text-slate-400">28 Mar, 10:45 AM • Ref: #UP103847</span>
                                            </div>
                                        </div>
                                        <span className="text-lg font-black text-green-500 tracking-tight">+₹1,000.00</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Stats & Tools */}
                    <div className="w-full xl:w-[400px] flex flex-col gap-8">
                        <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-50 flex flex-col gap-6">
                            <h3 className="text-xl font-black text-slate-800 tracking-tight">Quick Actions</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: 'Settlement', icon: CreditCard, color: 'text-blue-500', bg: 'bg-blue-50' },
                                    { label: 'History', icon: History, color: 'text-amber-500', bg: 'bg-amber-50' },
                                    { label: 'Scheduled', icon: Clock, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                                    { label: 'More', icon: MoreHorizontal, color: 'text-slate-400', bg: 'bg-slate-50' },
                                ].map((tool, i) => (
                                    <div key={i} className={`p-6 ${tool.bg} rounded-[2rem] flex flex-col items-center gap-3 cursor-pointer transition-all hover:scale-105 active:scale-95 group shadow-sm hover:shadow-lg`}>
                                        <tool.icon size={24} className={tool.color} />
                                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-600">{tool.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </RetailerLayout>
    );
};

export default WalletPage;
