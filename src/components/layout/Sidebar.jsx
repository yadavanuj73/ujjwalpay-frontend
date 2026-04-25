import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Users, 
  Store, 
  Receipt, 
  Wallet, 
  Settings, 
  PieChart, 
  ShieldCheck, 
  Bell,
  ChevronDown
} from 'lucide-react';

const DashboardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="18" height="18" rx="2" fill="white" />
    <path d="M8 12l3 3 5-6" stroke="#0a2357" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const Sidebar = ({ className }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const isActive = (route) => path === route;

  const navItems = [
    { name: 'Dashboard', icon: DashboardIcon, route: '/admin-panel/dashboard', isCustomIcon: true },
    { name: 'Users', icon: Users, route: '/admin-panel/users', hasDropdown: true },
    { name: 'Bashibors', icon: Store, route: '/admin-panel/retailers' },
    { name: 'Transactions', icon: Receipt, route: '/admin-panel/transactions' },
    { name: 'Wallet', icon: Wallet, route: '/admin-panel/wallet' },
    { name: 'Services', icon: Settings, route: '/admin-panel/services' },
    { name: 'Reports', icon: PieChart, route: '/admin-panel/reports' },
    { name: 'KYC', icon: ShieldCheck, route: '/admin-panel/kyc', hasDropdown: true },
    { name: 'Notifications', icon: Bell, route: '/admin-panel/notifications' },
  ];

  return (
    <aside className={`bg-[#0c3182] text-white flex flex-col h-full shrink-0 relative z-10 transition-all duration-300 border-r border-[#082464] ${className || 'w-64'}`}>
      
      {/* Scrollable nav items list */}
      <div className="flex-1 py-4 flex flex-col">
        <ul className="flex flex-col">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.route);
            
            return (
              <li key={item.name}>
                <Link
                  to={item.route}
                  className={`flex items-center justify-between px-6 py-[14px] text-[15px] font-medium transition-all group ${
                    active 
                      ? 'bg-[#082464] text-white border-l-4 border-white' 
                      : 'text-white/90 hover:bg-[#09276d] hover:text-white border-l-4 border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {item.isCustomIcon ? (
                      <Icon />
                    ) : (
                      <Icon size={20} className="text-white/90 group-hover:text-white transition-colors" />
                    )}
                    <span className="tracking-wide">{item.name}</span>
                  </div>
                  
                  {/* Dropdown chevron if exists */}
                  {item.hasDropdown && (
                    <ChevronDown size={16} className={`${active || item.name === 'Users' ? 'text-yellow-400' : 'text-white/70'}`} />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      
      {/* Logout button at the very bottom (if desired) */}
      <div className="p-0 border-t border-[#082464]/50 mt-auto bg-[#0a2b72]">
         <button onClick={() => navigate('/admin')} className="flex items-center gap-4 px-6 py-4 text-sm font-medium text-white/80 hover:text-white hover:bg-[#082464] transition-colors w-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            Logout
         </button>
      </div>
    </aside>
  );
};

export default Sidebar;
