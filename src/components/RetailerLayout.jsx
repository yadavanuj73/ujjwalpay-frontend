import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  Home, Users, UserCircle, Briefcase, Landmark, RefreshCw, 
  Smartphone, FileText, Building, Search, LogOut, 
  Menu, ChevronDown, ChevronRight
} from 'lucide-react';
import logo from '../assets/images/logo.png';

const SidebarItem = ({ icon: Icon, label, active, hasDropdown, to }) => (
    <Link to={to || '#'} className={`flex items-center justify-between px-6 py-4 cursor-pointer transition-all group no-underline border-b border-slate-100 ${
        active 
        ? 'bg-[#333333] text-white' 
        : 'text-slate-600 hover:bg-slate-50'
    }`}>
        <div className="flex items-center gap-4">
            <Icon size={18} strokeWidth={2} className={active ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'} />
            <span className={`text-[13px] ${active ? 'font-bold' : 'font-medium'}`}>{label}</span>
        </div>
        {hasDropdown && <ChevronRight size={14} className={active ? 'text-white' : 'text-slate-400'} />}
    </Link>
);

const HeaderButton = ({ label, active }) => (
    <button className={`px-4 py-2 text-[11px] font-bold uppercase transition-all flex items-center gap-1 ${
        active 
        ? 'bg-white text-slate-800 rounded-t-lg' 
        : 'bg-white text-slate-800 rounded-md hover:bg-slate-100'
    }`}>
        {label}
    </button>
);

const RetailerLayout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            navigate('/portal');
        }
    };

    const isActive = (path) => location.pathname === path;

    return (
        <div className="flex flex-col h-screen bg-[#f8f9fa] font-sans text-slate-900 overflow-hidden relative">
            
            {/* --- TOP HEADER NAVIGATION --- */}
            <header className="w-full bg-[#333333] flex items-end justify-between px-6 shrink-0 h-14 z-50">
                <div className="flex items-center h-full gap-4 pt-1 mb-2 w-64 shrink-0">
                    <span className="text-white font-black text-[13px] tracking-wide uppercase">Retailer Name</span>
                    <button className="text-white hover:text-slate-300">
                        <Menu size={20} />
                    </button>
                </div>

                <div className="flex-1 flex items-end h-full gap-2 px-4">
                    <div className="flex items-center text-slate-300 hover:text-white cursor-pointer mr-2 mb-3">
                        <Search size={16} />
                    </div>
                    {/* Action Buttons - They sit on the bottom edge matching the image */}
                    <HeaderButton label="+ My Txn Status" />
                    <HeaderButton label="+ Pay Services" />
                    <HeaderButton label="+ Download Certificate" active={true} />
                    <HeaderButton label="+ Events" />
                    <HeaderButton label="+ W2W Transfer" />
                    <HeaderButton label="+ Add Money" />
                </div>
                
                <div className="flex items-center gap-4 h-full mb-3">
                    <span className="text-white/80 hover:text-white cursor-pointer text-xs font-bold flex items-center gap-1">
                        Help <LogOut size={14} className="ml-1 opacity-70 cursor-pointer" onClick={handleLogout}/>
                    </span>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* --- LEFT SIDEBAR --- */}
                <aside className="w-[280px] h-full bg-white flex flex-col shrink-0 border-r border-slate-200 z-40 overflow-y-auto scrollbar-none shadow-sm">
                    {/* Profile & Branding Area */}
                    <div className="p-8 flex flex-col items-center border-b border-slate-200 pt-6">
                        <img src={logo} alt="UJJWAL PAY" className="h-16 object-contain mb-6" />
                        <div className="flex items-center gap-2 cursor-pointer group">
                            <span className="text-sm font-black text-slate-700 tracking-wide uppercase">Retailer Name</span>
                            <ChevronDown size={14} className="text-slate-400 group-hover:text-slate-700" />
                        </div>
                    </div>

                    <nav className="flex-1 flex flex-col pb-6">
                        <SidebarItem icon={Home} label="Home" active={isActive('/retailer-dashboard')} to="/retailer-dashboard" />
                        <SidebarItem icon={Users} label="Member" active={isActive('/retailer-dashboard/member')} to="/retailer-dashboard/member" hasDropdown />
                        <SidebarItem icon={UserCircle} label="My Account" active={isActive('/retailer-dashboard/account')} to="/retailer-dashboard/account" hasDropdown />
                        <SidebarItem icon={Briefcase} label="Apply Services" active={isActive('/retailer-dashboard/apply')} to="/retailer-dashboard/apply" hasDropdown />
                        <SidebarItem icon={Landmark} label="Aeps / Move To Bank" active={isActive('/retailer-dashboard/aeps')} to="/retailer-dashboard/aeps" hasDropdown />
                        <SidebarItem icon={RefreshCw} label="Money Transfer" active={isActive('/retailer-dashboard/money-transfer')} to="/retailer-dashboard/money-transfer" hasDropdown />
                        <SidebarItem icon={Smartphone} label="Recharge/Bill Payment" active={isActive('/retailer-dashboard/recharge')} to="/retailer-dashboard/recharge" hasDropdown />
                        <SidebarItem icon={FileText} label="Reports" active={isActive('/retailer-dashboard/reports')} to="/retailer-dashboard/reports" hasDropdown />
                        <SidebarItem icon={Building} label="Taxation Cum Banking" active={isActive('/retailer-dashboard/taxation')} to="/retailer-dashboard/taxation" hasDropdown />
                    </nav>
                </aside>

                {/* --- MAIN CONTENT AREA --- */}
                <div className="flex-1 flex flex-col overflow-hidden bg-white">
                    <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 relative">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default RetailerLayout;
