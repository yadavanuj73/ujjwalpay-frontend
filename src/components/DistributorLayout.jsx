import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  Users, Wallet, TrendingUp, 
  Search, Bell, LogOut, Layout, PieChart, Repeat, Zap, Globe, ChevronRight, FileText, LifeBuoy, History
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active, hasDropdown, to }) => (
    <Link to={to || '#'} className={`flex items-center justify-between px-6 py-4 rounded-xl cursor-pointer transition-all group no-underline mb-1 ${
        active 
        ? 'bg-[#ffb400] text-white shadow-lg shadow-yellow-500/20' 
        : 'text-slate-400 hover:bg-white/5 hover:text-white'
    }`}>
        <div className="flex items-center gap-4">
            <Icon size={22} className={active ? 'text-white' : 'text-slate-400 group-hover:text-white'} />
            <span className={`text-sm tracking-widest uppercase font-black`}>{label}</span>
        </div>
        {hasDropdown && <ChevronRight size={16} className={active ? 'text-white' : 'text-slate-500 opacity-50'} />}
    </Link>
);

const DistributorLayout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            navigate('/portal');
        }
    };

    const isActive = (path) => location.pathname === path;

    return (
        <div className="flex h-screen bg-[#f3f7fb] font-sans text-slate-900 overflow-hidden relative">
            
            {/* --- DISTRIBUTOR SIDEBAR (DARK BLUE) --- */}
            <aside className="w-72 h-full bg-[#111e35] flex flex-col shrink-0 z-50 shadow-2xl overflow-y-auto scrollbar-none">
                <div className="p-10 flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#ffb400] rounded-2xl flex items-center justify-center shadow-xl">
                        <Zap className="text-white" size={26} fill="white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-white font-black text-xl tracking-tighter leading-none">UJJWAL</span>
                        <span className="text-[#ffb400] font-black text-xs tracking-widest uppercase">Distributor</span>
                    </div>
                </div>

                <nav className="flex-1 px-4 flex flex-col gap-1">
                    <SidebarItem icon={Layout} label="Dashboard" active={isActive('/distributor-dashboard')} to="/distributor-dashboard" />
                    <SidebarItem icon={Users} label="Retailers" active={isActive('/distributor-dashboard/retailers')} to="/distributor-dashboard/retailers" hasDropdown />
                    <SidebarItem icon={Repeat} label="Transactions" active={isActive('/distributor-dashboard/transactions')} to="/distributor-dashboard/transactions" hasDropdown />
                    <SidebarItem icon={PieChart} label="Reports" active={isActive('/distributor-dashboard/reports')} to="/distributor-dashboard/reports" hasDropdown />
                    <SidebarItem icon={MapPin} label="Plan & Rates" active={isActive('/distributor-dashboard/plans')} to="/distributor-dashboard/plans" />
                    <SidebarItem icon={FileText} label="Invoice" active={isActive('/distributor-dashboard/invoices')} to="/distributor-dashboard/invoices" />
                    <SidebarItem icon={Wallet} label="Accounts" active={isActive('/distributor-dashboard/accounts')} to="/distributor-dashboard/accounts" hasDropdown />
                    <SidebarItem icon={Percent} label="Promotions" active={isActive('/distributor-dashboard/promotions')} to="/distributor-dashboard/promotions" hasDropdown />
                    <SidebarItem icon={LifeBuoy} label="Support" active={isActive('/distributor-dashboard/support')} to="/distributor-dashboard/support" hasDropdown />
                    <SidebarItem icon={History} label="Old FY Reports" active={isActive('/distributor-dashboard/old-reports')} to="/distributor-dashboard/old-reports" />
                </nav>

                <div className="p-8 mt-auto border-t border-white/5">
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-6 py-4 text-slate-500 hover:text-white hover:bg-white/5 rounded-xl transition-all font-black text-[10px] uppercase tracking-widest">
                        <LogOut size={18} />
                        Exit System
                    </button>
                </div>
            </aside>

            {/* --- MAIN CONTENT AREA --- */}
            <div className="flex-1 flex flex-col overflow-hidden">
                
                {/* --- HEADER --- */}
                <header className="flex justify-between items-center py-6 px-12 border-b border-slate-100/50 bg-[#f3f7fb]">
                    <div className="flex-1 max-w-2xl">
                        <div className="relative group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 transition-colors group-focus-within:text-[#ffb400]" size={20} />
                            <input 
                                type="text" 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search Distributor Database..." 
                                className="w-full pl-16 pr-8 py-4 bg-white border border-slate-50 rounded-2xl shadow-sm outline-none focus:ring-4 focus:ring-yellow-400/10 transition-all text-sm font-black text-slate-600 placeholder:text-slate-300 uppercase tracking-widest"
                            />
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-8 pl-10">
                        <button className="relative p-3 text-slate-400 hover:text-[#ffb400] transition-all">
                            <Bell size={24} />
                            <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-4 border-white"></span>
                        </button>

                        <div className="h-10 w-px bg-slate-200"></div>

                        <div className="flex items-center gap-4 cursor-pointer group">
                            <div className="text-right flex flex-col items-end">
                                <span className="text-sm font-black text-slate-800 uppercase tracking-tighter">Rohan singh</span>
                                <span className="text-[9px] font-black text-blue-600 uppercase tracking-[0.2em]">Platinum Distributor</span>
                            </div>
                            <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-white shadow-xl group-hover:scale-110 transition-all">
                                <img 
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop" 
                                    alt="Profile" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto px-12 py-10 scrollbar-thin scrollbar-thumb-slate-200">
                    {children}
                </main>
            </div>
        </div>
    );
};

// Mock icon fallback since 'Percent' and 'MapPin' might be missing from scope
const MapPin = ({ ...props }) => <Globe {...props} />;
const Percent = ({ ...props }) => <TrendingUp {...props} />;

export default DistributorLayout;
