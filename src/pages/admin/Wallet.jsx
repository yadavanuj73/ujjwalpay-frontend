import { PlusCircle, MinusCircle, Wallet as WalletIcon, RefreshCw, History } from 'lucide-react';

const Wallet = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-[#0a2357]">Wallet Management</h1>
          <p className="text-sm text-gray-500">Manage master wallet funds and ledger.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-white opacity-5 rounded-full"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500 opacity-20 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <WalletIcon size={20} className="text-blue-200" />
                  <span className="font-semibold tracking-wide">Master Wallet</span>
                </div>
                <span className="text-xs font-semibold px-2 py-1 bg-emerald-500/20 text-emerald-300 rounded-md border border-emerald-500/20">Active</span>
              </div>
              <div className="space-y-1 mb-8">
                <p className="text-sm text-blue-200">Available Balance</p>
                <h2 className="text-4xl font-bold tracking-tight">₹ 45,20,000.00</h2>
              </div>
              <div className="flex items-center justify-between text-sm text-blue-200 pt-4 border-t border-white/10">
                <div className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors">
                  <RefreshCw size={14} /> Refresh
                </div>
                <span>Last updated: just now</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-medium transition-all shadow-md shadow-emerald-500/20 transform hover:-translate-y-0.5">
                <PlusCircle size={18} /> Add Money
              </button>
              <button className="w-full flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-lg font-medium transition-all shadow-md shadow-rose-500/20 transform hover:-translate-y-0.5">
                <MinusCircle size={18} /> Deduct Money
              </button>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <History size={18} className="text-gray-400" /> Recent Ledger Entries
            </h3>
            <button className="text-sm text-primary font-medium hover:underline">View All</button>
          </div>
          
          <div className="p-0 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-medium">Date & Time</th>
                  <th className="px-6 py-4 font-medium">Description</th>
                  <th className="px-6 py-4 font-medium text-right">Amount</th>
                  <th className="px-6 py-4 font-medium text-right">Closing Bal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { date: 'Oct 24, 10:30 AM', desc: 'Fund Load - Bank Transfer', amt: '+₹ 5,00,000', type: 'cr', bal: '₹ 45,20,000' },
                  { date: 'Oct 24, 09:15 AM', desc: 'Auto Settlement #4509', amt: '-₹ 1,20,000', type: 'dr', bal: '₹ 40,20,000' },
                  { date: 'Oct 23, 04:45 PM', desc: 'Wallet to Wallet Load (User ID: 12)', amt: '-₹ 50,000', type: 'dr', bal: '₹ 41,40,000' },
                  { date: 'Oct 23, 11:20 AM', desc: 'Fund Load - UPI', amt: '+₹ 2,00,000', type: 'cr', bal: '₹ 41,90,000' },
                  { date: 'Oct 22, 02:30 PM', desc: 'Commission Credit', amt: '+₹ 15,400', type: 'cr', bal: '₹ 39,90,000' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4 text-sm text-gray-500">{row.date}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.desc}</td>
                    <td className={`px-6 py-4 text-sm font-bold text-right ${row.type === 'cr' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {row.amt}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">{row.bal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
