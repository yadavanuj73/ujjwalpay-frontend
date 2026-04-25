import { 
  PieChart as PieIcon, 
  FileText, 
  Users, 
  ChevronRight, 
  Wallet,
  CreditCard,
  Zap
} from 'lucide-react';

const Reports = () => {
  return (
    <div className="space-y-6 w-full font-sans animate-in fade-in duration-500">
      
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-[28px] font-bold text-[#142663] tracking-tight">Reports & Analytics</h1>
      </div>

      {/* Target Three Button row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <button className="bg-[#f58220] hover:bg-[#e0761b] text-white flex items-center justify-center gap-4 py-[14px] rounded-lg shadow-sm transition-all group">
          <PieIcon size={20} className="group-hover:rotate-12 transition-transform" />
          <span className="text-[17px] font-bold">Daily Report</span>
        </button>

        <button className="bg-[#144ec2] hover:bg-[#103d9c] text-white flex items-center justify-center gap-4 py-[14px] rounded-lg shadow-sm transition-all group">
          <FileText size={20} className="group-hover:scale-110 transition-transform" />
          <span className="text-[17px] font-bold">Master Report</span>
        </button>

        <button className="bg-[#0c3182] hover:bg-[#0a2769] text-white flex items-center justify-center gap-4 py-[14px] rounded-lg shadow-sm transition-all group text-center">
          <Users size={20} className="group-hover:scale-110 transition-transform" />
          <span className="text-[17px] font-bold">Retailer</span>
        </button>
      </div>

      {/* Target Horizontal Summary Capsule */}
      <div className="bg-white rounded-[12px] shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-gray-100 p-6 w-full grid grid-cols-2 lg:grid-cols-4 gap-6 divide-x-0 lg:divide-x divide-gray-100">
        <div className="flex flex-col items-center">
           <span className="text-[13px] font-bold text-slate-500 mb-1">10 Nov 2023</span>
           <span className="text-[22px] font-extrabold text-[#1fc47c]">₹ 6,300</span>
        </div>
        <div className="flex flex-col items-center">
           <span className="text-[13px] font-bold text-slate-500 mb-1">Total Margin</span>
           <span className="text-[22px] font-extrabold text-[#f58220]">₹ 7,000</span>
        </div>
        <div className="flex flex-col items-center">
           <span className="text-[13px] font-bold text-slate-500 mb-1">Total Commission</span>
           <span className="text-[22px] font-extrabold text-[#144ec2]">₹ 60,200</span>
        </div>
        <div className="flex flex-col items-center">
           <span className="text-[13px] font-bold text-slate-500 mb-1">Net Profit</span>
           <span className="text-[22px] font-extrabold text-[#0e9488]">₹ 6,000</span>
        </div>
      </div>

      {/* Target Detailed Analytics List Card */}
      <div className="bg-white rounded-[14px] shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-gray-100 w-full overflow-hidden max-w-4xl">
        
        {/* Header Row */}
        <div className="flex items-center justify-between p-6 border-b border-gray-50 bg-slate-50/30">
           <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <FileText size={20} className="text-slate-600" />
              </div>
              <span className="font-bold text-[#142663] text-[16px]">Total Transactions</span>
           </div>
           <div className="flex items-center gap-6">
              <span className="font-extrabold text-[#334155] text-[16px]">33,600</span>
              <div className="flex items-center gap-1 text-[#1fc47c] font-bold text-[14px]">
                 Active
              </div>
           </div>
        </div>

        {/* List Items */}
        <div className="divide-y divide-gray-50">
          
          <div className="flex items-center justify-between p-6 hover:bg-slate-50/50 transition-colors group cursor-default">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-50 text-blue-600 group-hover:scale-110 transition-transform shadow-sm">
                 <Wallet size={18} />
               </div>
               <span className="font-bold text-[#475569] text-[15px]">Money Balance / Salary</span>
            </div>
            <span className="font-black text-[#1fc47c] text-[18px]">₹ 16,000</span>
          </div>

          <div className="flex items-center justify-between p-6 hover:bg-slate-50/50 transition-colors group cursor-default">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-full flex items-center justify-center bg-emerald-50 text-emerald-600 group-hover:scale-110 transition-transform shadow-sm">
                 <Zap size={18} />
               </div>
               <span className="font-bold text-[#475569] text-[15px]">Bill Payment</span>
            </div>
            <span className="font-black text-[#1fc47c] text-[18px]">₹ 100,000</span>
          </div>

          <div className="flex items-center justify-between p-6 hover:bg-slate-50/50 transition-colors group cursor-default">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-full flex items-center justify-center bg-indigo-50 text-indigo-600 group-hover:scale-110 transition-transform shadow-sm">
                 <CreditCard size={18} />
               </div>
               <span className="font-bold text-[#475569] text-[15px]">Credit Card</span>
            </div>
            <span className="font-black text-[#1fc47c] text-[18px]">₹ 190,000</span>
          </div>

        </div>

      </div>

      {/* Target Transaction History Table (Appears on scroll) */}
      <div className="bg-white rounded-[14px] shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-gray-100 w-full overflow-hidden mt-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-slate-50/20">
                <th className="px-10 py-5 font-bold text-[#334155] text-[15px] w-[40%]">Data Transactions</th>
                <th className="px-8 py-5 font-bold text-[#334155] text-[15px] w-[40%] text-center">Total Revenue</th>
                <th className="px-8 py-5 font-bold text-[#334155] text-[15px] w-[20%] text-center">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                { date: '25 Apr 2024', reveal: '₹ 63,000' },
                { date: '29 Apr 2024', reveal: '₹ 60,200' },
                { date: '29 Apr 2024', reveal: '₹ 62,900' },
                { date: '29 Apr 2024', reveal: '₹ 25,200' },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-10 py-6">
                    <span className="font-bold text-[#334155] text-[15px]">{row.date}</span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className="font-extrabold text-[#111827] text-[18px]">{row.reveal}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-center">
                       <button className="bg-[#10b981] hover:bg-[#0da06f] text-white w-10 h-10 flex items-center justify-center rounded-lg shadow-sm transition-all group-hover:scale-110 active:scale-95">
                         <ChevronRight size={20} className="rotate-[-45deg]" strokeWidth={3} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Reports;
