import { useState } from 'react';
import { 
  ChevronDown, 
  Search, 
  Plus, 
  BookOpen, 
  HelpCircle
} from 'lucide-react';

const usersData = [
  { id: 1, name: 'Raj', mobile: 'XXXX9925', balance: '₹ 2,500', avatar: '18' },
  { id: 2, name: 'Morhan', mobile: 'XXXX8998', balance: '₹ 2,000', avatar: '44' },
  { id: 3, name: 'Sameer', mobile: 'XXXX3302', balance: '₹ 300', avatar: '11' },
  { id: 4, name: 'Rohit', mobile: 'XXXX2001', balance: '₹ 2,000', avatar: '59' },
];

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6 w-full font-sans animate-in fade-in duration-500">
      
      {/* Header with Title and Help Icons */}
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-[28px] font-bold text-[#142663] tracking-tight">Manage Users</h1>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-slate-500 cursor-pointer hover:text-[#142663] transition-colors group">
            <HelpCircle size={18} className="group-hover:scale-110 transition-transform" />
            <span className="text-[14px] font-medium">Help</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500 cursor-pointer hover:text-[#142663] transition-colors group">
            <BookOpen size={18} className="group-hover:scale-110 transition-transform" />
            <span className="text-[14px] font-medium">Guide</span>
          </div>
        </div>
      </div>

      {/* Final Polished Filter Bar */}
      <div className="bg-white rounded-[12px] shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 p-4 flex flex-col xl:flex-row gap-4 items-center w-full">
        
        {/* Joined Search Box and Category Dropdown */}
        <div className="flex items-stretch w-full xl:w-auto">
          <div className="relative flex-1 xl:w-[280px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full pl-10 pr-4 py-[10px] border border-gray-200 border-r-0 rounded-l-lg text-[14px] font-medium focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 text-gray-800 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative flex items-center px-3 border border-gray-200 rounded-r-lg bg-slate-50/50 cursor-pointer hover:bg-slate-100 transition-colors">
            <ChevronDown size={16} className="text-slate-500" />
          </div>
        </div>

        {/* Action Buttons Group */}
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto xl:ml-auto">
          
          {/* Save Button */}
          <button className="flex items-center gap-2 px-4 py-[10px] border border-gray-200 text-[#334155] bg-white hover:bg-slate-50 rounded-lg text-[14px] font-semibold transition-all shadow-sm">
            Save <ChevronDown size={14} className="text-slate-400" />
          </button>

          {/* Roles Dropdown */}
          <div className="relative">
            <select className="appearance-none border border-gray-200 text-[#334155] font-semibold rounded-lg pl-4 pr-10 py-[10px] text-[14px] focus:outline-none focus:border-blue-400 bg-white cursor-pointer shadow-sm min-w-[130px]">
              <option>All Roles</option>
              <option>Retailer</option>
              <option>Distributor</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
          </div>

          {/* Plus Add Button - The Final Signature Piece */}
          <button className="flex items-center gap-2 px-6 py-[10px] bg-[#0c3182] text-white hover:bg-[#0a2769] rounded-lg text-[14px] font-bold transition-all shadow-lg hover:shadow-blue-900/20 group active:scale-95">
            <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" /> Add New
          </button>

        </div>
      </div>

      {/* Table Section with Refined Spacing */}
      <div className="bg-white rounded-[14px] shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-gray-100 overflow-hidden w-full pb-3 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[750px]">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="px-10 py-6 font-bold text-[#142663] text-[15px] w-[30%]">Name</th>
                <th className="px-6 py-6 font-bold text-[#142663] text-[15px] w-[25%]">Mobile</th>
                <th className="px-6 py-6 font-bold text-[#142663] text-[15px] w-[25%]">Balance</th>
                <th className="px-6 py-6 font-bold text-[#142663] text-[15px] w-[20%] text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50/80">
              {usersData.map((user, idx) => (
                <tr 
                  key={user.id} 
                  className="hover:bg-slate-50/70 transition-all group duration-300 cursor-default"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <td className="px-10 py-5">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img 
                          src={`https://i.pravatar.cc/150?img=${user.avatar}`} 
                          alt={user.name} 
                          className="w-[42px] h-[42px] rounded-full object-cover shadow-sm ring-2 ring-transparent group-hover:ring-blue-100 transition-all"
                        />
                        <div className="absolute -right-0.5 bottom-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
                      </div>
                      <span className="font-bold text-[#334155] text-[15px] group-hover:text-blue-700 transition-colors">{user.name}</span>
                    </div>
                  </td>
                  
                  <td className="px-6 py-5">
                    <span className="font-semibold text-[#64748b] text-[15px] tracking-tight">{user.mobile}</span>
                  </td>
                  
                  <td className="px-6 py-5">
                    <span className="font-extrabold text-[#142663] text-[15px]">{user.balance}</span>
                  </td>
                  
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-center gap-[8px]">
                       <button className="bg-[#1fc47c] hover:bg-[#19b06d] text-white font-bold text-[13px] px-[20px] py-[9px] rounded-lg transition-all shadow-sm hover:shadow-emerald-900/10 active:scale-95">
                         DMT
                       </button>
                       <button className="bg-[#f05050] hover:bg-[#d94848] text-white w-[38px] h-[38px] flex items-center justify-center rounded-lg transition-all shadow-sm hover:shadow-red-900/10 active:scale-95">
                         <ChevronDown size={18} strokeWidth={3} />
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

export default UserManagement;
