import { 
  Calendar, 
  ChevronDown, 
  List, 
  Layers
} from 'lucide-react';

const txnData = [
  { id: '1234567', user: 'AEPS', type: 'AEPS', amount: '₹ 3,000', status: 'Success' },
  { id: '7635821', user: 'Recharge', type: 'Recharge', amount: '₹ 1,000', status: 'Success' },
  { id: '3907099', user: 'Money Trans..', type: 'Money Trans..', amount: '₹ 2,500', status: 'Pending' },
  { id: '3200396', user: 'Bill Payment', type: 'Bill Payment', amount: '₹ 950', status: 'Success' },
  { id: '9926343', user: 'Credit Card', type: 'Recharge', amount: '₹ 1,000', status: 'Success' },
];

const Transactions = () => {
  return (
    <div className="space-y-6 w-full font-sans animate-in fade-in duration-500">
      
      {/* Target Title & Top Right Dropdown */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[28px] font-bold text-[#142663] tracking-tight">Transactions</h1>
        
        <div className="bg-white border border-gray-200 rounded-md px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-all shadow-sm">
           <span className="font-bold text-[#142663] text-[15px]">₹</span>
           <span className="text-[#334155] font-semibold text-[14px]">Saet Dani</span>
           <ChevronDown size={18} className="text-gray-400" />
        </div>
      </div>

      {/* Target Filter Buttons Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Date Filter */}
        <button className="bg-[#144ec2] hover:bg-[#103d9c] text-white flex items-center justify-center gap-4 py-[14px] rounded-lg shadow-sm transition-all group">
          <Calendar size={20} className="group-hover:scale-110 transition-transform" />
          <span className="text-[17px] font-bold">Date</span>
        </button>

        {/* Service Type Filter */}
        <button className="bg-[#10b981] hover:bg-[#0da06f] text-white flex items-center justify-center gap-4 py-[14px] rounded-lg shadow-sm transition-all group">
          <Layers size={20} className="group-hover:scale-110 transition-transform" />
          <span className="text-[17px] font-bold">Service Type</span>
        </button>

        {/* Status Filter */}
        <button className="bg-[#0e9488] hover:bg-[#0c7d73] text-white flex items-center justify-center gap-4 py-[14px] rounded-lg shadow-sm transition-all group">
          <List size={20} className="group-hover:scale-110 transition-transform" />
          <span className="text-[17px] font-bold">Status</span>
          <ChevronDown size={20} className="ml-2" />
        </button>
      </div>

      {/* Target Table Block */}
      <div className="bg-white rounded-[12px] shadow-[0_4px_25px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden w-full pb-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-100 bg-white">
                <th className="px-10 py-6 font-bold text-[#142663] text-[15px] w-[20%]">Txn ID</th>
                <th className="px-8 py-6 font-bold text-[#142663] text-[15px] w-[20%]">User</th>
                <th className="px-8 py-6 font-bold text-[#142663] text-[15px] w-[20%]">Type</th>
                <th className="px-8 py-6 font-bold text-[#142663] text-[15px] w-[20%]">Amount</th>
                <th className="px-8 py-6 font-bold text-[#142663] text-[15px] w-[20%] text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50/80">
              {txnData.map((txn, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors group">
                  <td className="px-10 py-5">
                    <span className="font-bold text-[#334155] text-[15px]">{txn.id}</span>
                  </td>
                  
                  <td className="px-8 py-5">
                    <span className="font-bold text-[#475569] text-[15px]">{txn.user}</span>
                  </td>
                  
                  <td className="px-8 py-5">
                    <span className="font-bold text-[#475569] text-[15px]">{txn.type}</span>
                  </td>
                  
                  <td className="px-8 py-5">
                    <span className="font-extrabold text-[#142663] text-[15px]">{txn.amount}</span>
                  </td>
                  
                  <td className="px-8 py-5">
                    <div className="flex justify-center">
                       <button className={`w-[110px] py-[9px] rounded-lg font-bold text-[12px] text-white shadow-sm transition-all active:scale-95 tracking-wider uppercase ${
                         txn.status === 'Success' ? 'bg-[#10b981] hover:bg-[#0da06f]' : 'bg-[#f07000] hover:bg-[#d46200]'
                       }`}>
                         {txn.status === 'Success' ? 'Success' : 'Pending'}
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

export default Transactions;
