import { Users, Wallet, ShieldCheck, Building2, MoreHorizontal } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, BarChart, Bar } from 'recharts';

const dailyData = [
  { time: '09:00', revenue: 280, profit: 180 },
  { time: '10:00', revenue: 320, profit: 130 },
  { time: '11:00', revenue: 510, profit: 320 },
  { time: '12:00', revenue: 330, profit: 190 },
  { time: '13:00', revenue: 300, profit: 130 },
  { time: '14:00', revenue: 420, profit: 280 },
  { time: '15:00', revenue: 280, profit: 140 },
  { time: '16:00', revenue: 390, profit: 260 },
  { time: '17:00', revenue: 310, profit: 150 },
  { time: '18:00', revenue: 400, profit: 250 },
  { time: '19:00', revenue: 350, profit: 200 },
  { time: '20:00', revenue: 480, profit: 320 },
  { time: '21:00', revenue: 580, profit: 420 },
  { time: '22:00', revenue: 490, profit: 290 },
];

const GlobalStats = [
  { label: 'Super Distributors', val: '12', color: 'bg-[#01865c]', icon: ShieldCheck },
  { label: 'Distributors', val: '148', color: 'bg-[#0c3182]', icon: Building2 },
  { label: 'Retailers', val: '12,540', color: 'bg-[#f07000]', icon: Users },
  { label: 'Network Balance', val: '₹85.4L', color: 'bg-slate-900', icon: Wallet },
];

// Precisely crafted data to match the exact curve shapes in the user's image
const miniLineData = [
  { val: 20 }, { val: 45 }, { val: 30 }, { val: 65 }, { val: 50 }, { val: 85 }, { val: 75 }
];

const miniBarData = [
  { val: 40 }, { val: 25 }, { val: 55 }, { val: 45 }, { val: 70 }, { val: 25 }, { val: 95 }, { val: 45 }, { val: 70 }, { val: 30 }
];

const Dashboard = () => {
  return (
    <div className="space-y-6 px-1 font-sans pb-10">
      
      {/* Top Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[26px] font-bold text-[#0c3182] tracking-tight decoration-emerald-500 underline decoration-4 underline-offset-8">Master Control Center</h1>
        <div className="flex items-center gap-3">
            <span className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold border border-emerald-100 uppercase tracking-widest">System Online</span>
            <div className="text-gray-400 text-sm flex gap-2">
            <span className="cursor-pointer hover:text-gray-600">Admin</span> / <span className="text-gray-500">Global Overview</span>
            </div>
        </div>
      </div>

      {/* 4 Stat Cards for Super DIST / DIST / RET / BAL */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {GlobalStats.map((stat, i) => (
            <div key={i} className={`${stat.color} rounded-[15px] p-6 shadow-sm text-white relative overflow-hidden group transition-all hover:scale-[1.03]`}>
                <p className="text-[14px] font-black uppercase tracking-widest opacity-80 mb-1">{stat.label}</p>
                <h3 className="text-[32px] font-black tracking-tighter leading-none mt-2">{stat.val}</h3>
                <div className="absolute right-5 bottom-4 opacity-10 group-hover:opacity-30 transition-opacity">
                    <stat.icon size={64} strokeWidth={1} />
                </div>
            </div>
        ))}
      </div>

      {/* Main Area Chart: Daily Transactions */}
      <div className="bg-white p-6 rounded-[10px] shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col h-[420px]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-[#1e293b] text-[17px]">Daily Transactions</h2>
          <div className="flex gap-5 text-[13px] font-semibold text-slate-500">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#0c3182] rounded-[2px]"></span>
              Revenue
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#f07000] rounded-[2px]"></span>
              Net Profit
            </span>
          </div>
        </div>
        
        <div className="flex-1 w-full min-h-0 pl-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dailyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorOrange" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 500}} dy={15} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 500}} dx={-10} />
              <Tooltip 
                contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
              />
              <Area type="linear" dataKey="revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorGreen)" activeDot={{r: 6, strokeWidth: 0}} />
              <Area type="linear" dataKey="profit" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorOrange)" activeDot={{r: 6, strokeWidth: 0}} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom 3 premium mini charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 h-[260px]">
        {/* Revenue Overview (Blue Line Chart) */}
        <div className="bg-white p-6 rounded-[10px] shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
          <h2 className="font-bold text-[#0f172a] text-[15px] mb-6 tracking-wide">Revenue Overview</h2>
          <div className="flex-1 w-full relative">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={miniLineData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                 <Line 
                   type="monotone" 
                   dataKey="val" 
                   stroke="#3b82f6" 
                   strokeWidth={3.5} 
                   dot={{r: 5, strokeWidth: 2, fill: 'white', stroke: '#3b82f6'}} 
                   activeDot={{ r: 7, strokeWidth: 0, fill: '#3b82f6' }} 
                 />
                 <Tooltip cursor={false} content={<></>} />
               </LineChart>
             </ResponsiveContainer>
          </div>
        </div>

        {/* Center Bar Chart block (No Title in the reference) */}
        <div className="bg-white p-6 rounded-[10px] shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col justify-end hover:shadow-md transition-shadow">
           <div className="flex-1 w-full relative pt-[30px]">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={miniBarData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                 <Bar dataKey="val" fill="#0ea5e9" radius={[2, 2, 0, 0]} maxBarSize={14} />
                 <Tooltip cursor={{fill: '#f1f5f9'}} content={<></>} />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* User Growth (Orange Line Chart) */}
        <div className="bg-white p-6 rounded-[10px] shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
          <h2 className="font-bold text-[#0f172a] text-[15px] mb-6 tracking-wide">User Growth</h2>
          <div className="flex-1 w-full relative">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={miniLineData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                 <Line 
                   type="monotone" 
                   dataKey="val" 
                   stroke="#f97316" 
                   strokeWidth={3.5} 
                   dot={{r: 5, strokeWidth: 2, fill: 'white', stroke: '#f97316'}} 
                   activeDot={{ r: 7, strokeWidth: 0, fill: '#f97316' }} 
                 />
                 <Tooltip cursor={false} content={<></>} />
               </LineChart>
             </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Global Management Table */}
      <div className="bg-white p-8 rounded-[15px] shadow-sm border border-gray-100 flex flex-col gap-6">
        <div className="flex justify-between items-center">
            <h2 className="font-black text-[#0c3182] text-[18px] uppercase tracking-widest">Global Hierarchy Management</h2>
            <button className="px-5 py-2 bg-[#0c3182] text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all">Download Master Log</button>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="text-left text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                        <th className="py-4">Entity ID</th>
                        <th className="py-4">Role</th>
                        <th className="py-4">Managing Partner</th>
                        <th className="py-4">Status</th>
                        <th className="py-4">Liquidity</th>
                        <th className="py-4 text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {[
                        { id: 'SM-1029', role: 'Super Distributor', parent: 'UJJWAL HQ', status: 'Approved', bal: '₹42,50,000', color: 'text-emerald-600' },
                        { id: 'DS-4822', role: 'Distributor', parent: 'SM-1029', status: 'Approved', bal: '₹12,45,000', color: 'text-blue-600' },
                        { id: 'RE-9902', role: 'Retailer', parent: 'DS-4822', status: 'Pending', bal: '₹4,500', color: 'text-orange-600' },
                    ].map((row, i) => (
                        <tr key={i} className="hover:bg-gray-50/50 transition-all group">
                            <td className="py-5 text-sm font-black text-slate-800">{row.id}</td>
                            <td className="py-5"><span className={`text-[10px] font-black uppercase tracking-widest ${row.color}`}>{row.role}</span></td>
                            <td className="py-5 text-xs font-bold text-slate-400">{row.parent}</td>
                            <td className="py-5"><span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${row.status === 'Approved' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>{row.status}</span></td>
                            <td className="py-5 text-sm font-black text-slate-800">{row.bal}</td>
                            <td className="py-5 text-right"><MoreHorizontal className="text-slate-300 ml-auto cursor-pointer group-hover:text-black" size={20} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
