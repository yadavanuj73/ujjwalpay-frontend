import { useState, useEffect, useRef } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { sharedDataService } from '../../services/sharedDataService';
import { menuItems } from '../data/menuItems';
import { ChevronDown, ChevronRight, LogOut, Home, ArrowLeft, Users, LayoutDashboard, Wallet, ArrowRightLeft, Landmark } from 'lucide-react';

const DistributorLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const mainContentRef = useRef(null);
    const [dist, setDist] = useState(null);
    const [balance, setBalance] = useState('0.00');
    const [openMenus, setOpenMenus] = useState({});

    useEffect(() => {
        const session = sharedDataService.getCurrentDistributor();
        if (!session) { navigate('/', { replace: true }); return; }
        const fresh = sharedDataService.getDistributorById(session.id) || session;
        if (fresh) sharedDataService.setCurrentDistributor(fresh);
        setDist(fresh);
        setBalance(fresh?.wallet?.balance || '0.00');
    }, [navigate]);

    useEffect(() => {
        if (mainContentRef.current) mainContentRef.current.scrollTop = 0;
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const handleLogout = () => {
        sharedDataService.logout();
        navigate('/');
    };

    const toggleMenu = (title) => setOpenMenus(prev => ({ ...prev, [title]: !prev[title] }));

    const isPathActive = (path) =>
        location.pathname === path || location.pathname.startsWith(path + '/');

    const distName = dist?.name || 'Distributor';

    return (
        <div className="min-h-screen bg-[#f5f5f5] font-sans">
            {/* Top Header Bar */}
            <div className="bg-[#1a1a2e] text-white px-4 py-2 flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                    <span className="font-semibold">Welcome, {distName}</span>
                    <button className="hover:text-gray-300" onClick={() => window.location.reload()}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    </button>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={handleLogout} className="flex items-center gap-1 hover:text-gray-300">
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>
            </div>

            <div className="flex">
                {/* Left Sidebar - Dark Theme */}
                <div className="w-64 bg-[#1e293b] min-h-[calc(100vh-40px)] text-white flex flex-col shrink-0">
                    <nav className="flex-1 py-2 overflow-y-auto">
                        <div className="px-4 mb-2 text-xs text-gray-500 uppercase font-semibold">Menu</div>

                        {/* Dashboard */}
                        <button
                            onClick={() => navigate('/distributor')}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                                location.pathname === '/distributor'
                                    ? 'bg-gray-800 text-white border-l-2 border-blue-500'
                                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                            }`}
                        >
                            <LayoutDashboard className="w-5 h-5 shrink-0" />
                            <span className="text-sm">Dashboard</span>
                        </button>

                        {/* Dynamic menu items */}
                        {menuItems.map((item) => {
                            const active = isPathActive(item.path);
                            const isOpen = openMenus[item.title];
                            return (
                                <div key={item.title}>
                                    {item.submenu ? (
                                        <>
                                            <button
                                                onClick={() => toggleMenu(item.title)}
                                                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                                                    active ? 'bg-gray-800 text-white border-l-2 border-blue-500' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                                }`}
                                            >
                                                <item.icon className="w-5 h-5 shrink-0" />
                                                <span className="text-sm flex-1">{item.title}</span>
                                                {isOpen ? <ChevronDown className="w-4 h-4 shrink-0" /> : <ChevronRight className="w-4 h-4 shrink-0" />}
                                            </button>
                                            {isOpen && (
                                                <div className="ml-8 border-l border-gray-700 pl-2 py-1 space-y-0.5">
                                                    {item.submenu.map(sub => (
                                                        <button
                                                            key={sub.path}
                                                            onClick={() => navigate(sub.path)}
                                                            className={`w-full flex items-center gap-2 px-3 py-2 text-left text-xs transition-colors rounded-md ${
                                                                location.pathname === sub.path
                                                                    ? 'bg-blue-600 text-white'
                                                                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                                            }`}
                                                        >
                                                            <sub.icon className="w-3.5 h-3.5 shrink-0" />
                                                            <span>{sub.title}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => navigate(item.path)}
                                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                                                active ? 'bg-gray-800 text-white border-l-2 border-blue-500' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                            }`}
                                        >
                                            <item.icon className="w-5 h-5 shrink-0" />
                                            <span className="text-sm">{item.title}</span>
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </nav>

                    {/* Back to Retailer + Security Notice */}
                    <div>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="w-full flex items-center gap-2 px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white text-xs transition-colors border-t border-gray-700"
                        >
                            <ArrowLeft className="w-4 h-4 shrink-0" />
                            Back to Retailer Panel
                        </button>
                        <div className="p-4 bg-gray-900 text-xs text-gray-500 border-t border-gray-700">
                            <p className="font-semibold text-gray-400 mb-1">SECURITY NOTICE</p>
                            <p>Please ensure you are on ujjwalpay.com. Never share your OTP with anyone.</p>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div ref={mainContentRef} className="flex-1 p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 40px)' }}>
                    {/* Compact Header with wallet card */}
                    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                        <div className="flex items-center justify-between">
                            <div className="shrink-0">
                                <img src="/ujjwawal pay logo.jpeg" alt="UjjwalPay" className="object-contain" style={{ height: '80px', width: 'auto' }}
                                    onError={e => { e.target.style.display = 'none'; }}/>
                            </div>
                            <div className="flex-1 text-center">
                                <h1 className="text-3xl font-black" style={{ letterSpacing: '0.15em' }}>
                                    <span className="text-blue-600">Ujjwal</span><span className="text-orange-500">Pay</span>
                                </h1>
                                <p className="text-sm text-gray-600 font-semibold mt-1" style={{ letterSpacing: '0.12em' }}>FinTech Pvt Ltd</p>
                                <p className="text-base font-bold text-orange-600 mt-1" style={{ letterSpacing: '0.1em' }}>हर ट्रांजैक्शन में विश्वास</p>
                            </div>
                            <div className="shrink-0 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-3 text-white" style={{ width: '220px', minWidth: '220px' }}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs text-blue-100 font-semibold uppercase tracking-wider">Express Balance</span>
                                    <Wallet className="w-4 h-4 text-blue-200"/>
                                </div>
                                <div className="text-xl font-bold mb-2">₹{balance}</div>
                                <div className="flex gap-1.5">
                                    <button
                                        onClick={() => navigate('/distributor/transactions/add-money')}
                                        className="flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all"
                                        style={{ backgroundColor: '#ffffff', color: '#1d4ed8' }}
                                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#dbeafe'; }}
                                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#ffffff'; }}
                                    >
                                        <ArrowRightLeft className="w-3 h-3"/>
                                        Add Money
                                    </button>
                                    <button
                                        onClick={() => navigate('/distributor/transactions/add-money')}
                                        className="flex-1 bg-blue-500 text-white py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-400 flex items-center justify-center gap-1"
                                    >
                                        <Landmark className="w-3 h-3"/>
                                        Virtual A/C
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DistributorLayout;
