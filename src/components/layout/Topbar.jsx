import { Search, Bell, Mail, ShoppingBag } from 'lucide-react';

import logoImg from '../../assets/images/logo.png';

const TopbarLogo = () => (
  <img src={logoImg} alt="Ujjwal Pay" className="h-[85px] w-auto drop-shadow-sm -ml-6" style={{ objectFit: 'contain' }} />
);

const Topbar = () => {
  return (
    <header className="h-[75px] bg-[#0c3182] border-b border-[#082464] flex items-center justify-between px-6 shadow-md relative z-20 shrink-0">
      
      {/* Brand area aligns with Sidebar width closely */}
      <div className="flex items-center w-[230px] shrink-0">
        <TopbarLogo />
      </div>

      {/* Center Search Input */}
      <div className="flex-1 flex px-10 max-w-3xl">
        <div className="flex items-center bg-white rounded-md flex-1 px-4 py-[9px] shadow-inner border border-transparent focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-200 transition-all">
          <Search size={18} className="text-slate-400 mr-2 shrink-0" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-transparent border-none outline-none text-sm w-full text-slate-800 placeholder-slate-400"
          />
        </div>
      </div>

      {/* Right Side Icons & Avatar */}
      <div className="flex items-center gap-7 shrink-0 mr-2">
         <button className="text-white/80 hover:text-white transition-colors">
            <Mail size={22} strokeWidth={1.5} />
         </button>
         <button className="text-white/80 hover:text-white transition-colors relative">
           <Bell size={22} strokeWidth={1.5} />
           <span className="absolute -top-1.5 -right-1 w-[16px] h-[16px] bg-[#ff9800] text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm">1</span>
         </button>
         <button className="text-white/80 hover:text-white transition-colors">
            <ShoppingBag size={22} strokeWidth={1.5} />
         </button>
         
         <div className="flex items-center ml-2 cursor-pointer transition-transform hover:scale-105 active:scale-95">
           <img src="https://i.pravatar.cc/100?img=11" alt="User Avatar" className="w-[36px] h-[36px] rounded-full border-[1.5px] border-white/60 object-cover shadow-sm bg-white" />
         </div>
      </div>
    </header>
  );
};

export default Topbar;
