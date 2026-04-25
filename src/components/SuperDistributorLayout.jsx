import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  Users, Wallet, 
  Search, Bell, Settings, LogOut, Layout, PieChart, Repeat, ShieldCheck, ChevronRight, 
  Building2
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active, hasDropdown, to }) => (
    <Link to={to || '#'} className={`flex items-center justify-between px-6 py-4 rounded-xl cursor-pointer transition-all group no-underline mb-1 ${
        active 
        ? 'bg-[#10b981] text-white shadow-lg shadow-emerald-500/20' 
        : 'text-slate-400 hover:bg-white/5 hover:text-white'
    }`}>
        <div className="flex items-center gap-4">
            <Icon size={22} className={active ? 'text-white' : 'text-slate-400 group-hover:text-white'} />
            <span className={`text-sm tracking-widest uppercase font-black`}>{label}</span>
        </div>
        {hasDropdown && <ChevronRight size={16} className={active ? 'text-white' : 'text-slate-500 opacity-50'} />}
    </Link>
);

const SuperDistributorLayout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');

    const handleLogout = () => {
        if (window.confirm('Confirm logout from Super Distributor Control?')) {
            navigate('/portal');
        }
    };

    const isActive = (path) => location.pathname === path;

    return (
        <div className="flex h-screen bg-[#f1f5f9] font-sans text-slate-900 overflow-hidden relative">
            
            {/* --- SUPER DISTRIBUTOR SIDEBAR (DEEP NAVY / EMERALD) --- */}
            <aside className="w-72 h-full bg-[#0f172a] flex flex-col shrink-0 z-50 shadow-2xl overflow-y-auto scrollbar-none">
                <div className="p-10 flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#10b981] rounded-2xl flex items-center justify-center shadow-xl">
                        <ShieldCheck className="text-white" size={26} fill="white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-white font-black text-xl tracking-tighter leading-none">UJJWAL</span>
                        <span className="text-[#10b981] font-black text-[10px] tracking-widest uppercase">Super Partner</span>
                    </div>
                </div>

                <nav className="flex-1 px-4 flex flex-col gap-1">
                    <SidebarItem icon={Layout} label="Global View" active={isActive('/super-distributor-dashboard')} to="/super-distributor-dashboard" />
                    <SidebarItem icon={Building2} label="Distributors" active={isActive('/super-distributor-dashboard/distributors')} to="/super-distributor-dashboard/distributors" hasDropdown />
                    <SidebarItem icon={Users} label="Retailers" active={isActive('/super-distributor-dashboard/retailers')} to="/super-distributor-dashboard/retailers" hasDropdown />
                    <SidebarItem icon={Repeat} label="Master Log" active={isActive('/super-distributor-dashboard/master-log')} to="/super-distributor-dashboard/master-log" hasDropdown />
                    <SidebarItem icon={PieChart} label="KPI Reports" active={isActive('/super-distributor-dashboard/kpi')} to="/super-distributor-dashboard/kpi" hasDropdown />
                    <SidebarItem icon={Wallet} label="Revenue Hub" active={isActive('/super-distributor-dashboard/revenue')} to="/super-distributor-dashboard/revenue" hasDropdown />
                    <SidebarItem icon={ShieldCheck} label="KYC Desk" active={isActive('/super-distributor-dashboard/kyc')} to="/super-distributor-dashboard/kyc" />
                    <SidebarItem icon={Settings} label="System Config" active={isActive('/super-distributor-dashboard/config')} to="/super-distributor-dashboard/config" />
                </nav>

                <div className="p-8 mt-auto border-t border-white/5">
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-6 py-4 text-slate-500 hover:text-white hover:bg-white/5 rounded-xl transition-all font-black text-[10px] uppercase tracking-widest">
                        <LogOut size={18} />
                        Terminate Session
                    </button>
                </div>
            </aside>

            {/* --- MAIN CONTENT AREA --- */}
            <div className="flex-1 flex flex-col overflow-hidden">
                
                {/* --- HEADER --- */}
                <header className="flex justify-between items-center py-6 px-12 border-b border-slate-200/50 bg-[#f1f5f9]">
                    <div className="flex-1 max-w-2xl">
                        <div className="relative group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 transition-colors group-focus-within:text-[#10b981]" size={20} />
                            <input 
                                type="text" 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Global Partner Search..." 
                                className="w-full pl-16 pr-8 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm outline-none focus:ring-4 focus:ring-emerald-400/10 transition-all text-sm font-black text-slate-600 placeholder:text-slate-300 uppercase tracking-widest"
                            />
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-8 pl-10">
                        <button className="relative p-3 text-slate-400 hover:text-[#10b981] transition-all">
                            <Bell size={24} />
                            <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-4 border-white"></span>
                        </button>
                        <div className="h-10 w-px bg-slate-200"></div>
                        <div className="flex items-center gap-4 cursor-pointer group">
                            <div className="text-right flex flex-col items-end">
                                <span className="text-sm font-black text-slate-800 uppercase tracking-tighter uppercase font-black">MASTER ADMIN</span>
                                <span className="text-[9px] font-black text-emerald-600 uppercase tracking-[0.2em]">Super Distributor</span>
                            </div>
                            <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-white shadow-xl group-hover:scale-110 transition-all">
                                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100&auto=format&fit=crop" alt="Profile" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto px-12 py-10 scrollbar-thin scrollbar-thumb-slate-300">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default SuperDistributorLayout;
