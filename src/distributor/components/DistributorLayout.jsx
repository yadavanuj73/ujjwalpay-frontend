import { useState, useEffect, useRef } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { sharedDataService } from '../../services/sharedDataService';
import { dataService } from '../../services/dataService';
import { menuItems } from '../data/menuItems';
import { ChevronDown, ChevronRight, LogOut, LayoutDashboard, Wallet, ArrowRightLeft, Landmark, Phone, User, Youtube, Instagram, Facebook } from 'lucide-react';
import ruralUrbanImg from '../../assets/rular and urban.png';

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
        dataService.getWalletBalance(session.id).then(bal => {
            setBalance(bal || fresh?.wallet?.balance || fresh?.balance || '0.00');
        });
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

                    {/* Security Notice */}
                    <div>
                        <div className="p-4 bg-gray-900 text-xs text-gray-500 border-t border-gray-700">
                            <p className="font-semibold text-gray-400 mb-1">SECURITY NOTICE</p>
                            <p>Please ensure you are on ujjwalpay.com. Never share your OTP with anyone.</p>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div ref={mainContentRef} className="flex-1 p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 40px)' }}>
                    {/* Header - full on dashboard, compact on other pages */}
                    {(() => {
                        const isDashboard = location.pathname === '/distributor';
                        const distName = dist?.name || 'Distributor';
                        const distId = dist?.id || '';
                        const distPhone = dist?.mobile || dist?.phone || '7410874107';
                        const rmName = dist?.rm_name || 'Support Team';
                        const rmPhone = dist?.rm_phone || '9958835146';
                        return (
                            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                                {/* Top strip */}
                                <div className={`flex items-center justify-between ${isDashboard ? 'mb-4 pb-4 border-b border-gray-200' : ''}`}>
                                    <div className="shrink-0">
                                        <img src="/ujjwawal pay logo.jpeg" alt="UjjwalPay" className="object-contain"
                                            style={{ height: isDashboard ? '110px' : '80px', width: 'auto' }}
                                            onError={e => { e.target.style.display = 'none'; }}/>
                                    </div>
                                    <div className="flex-1 text-center">
                                        <h1 className="text-3xl font-black" style={{ letterSpacing: '0.15em' }}>
                                            <span className="text-blue-600">Ujjwal</span><span className="text-orange-500">Pay</span>
                                        </h1>
                                        <p className="text-sm text-gray-600 font-semibold mt-1" style={{ letterSpacing: '0.12em' }}>FinTech Pvt Ltd</p>
                                        <p className="text-base font-bold text-orange-600 mt-1" style={{ letterSpacing: '0.1em' }}>हर ट्रांजैक्शन में विश्वास</p>
                                    </div>
                                    {/* Right: wallet card (compact) or social icons (full) */}
                                    {!isDashboard ? (
                                        <div className="shrink-0 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-3 text-white" style={{ width: '220px', minWidth: '220px' }}>
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-xs text-blue-100 font-semibold uppercase tracking-wider">Express Balance</span>
                                                <Wallet className="w-4 h-4 text-blue-200"/>
                                            </div>
                                            <div className="text-xl font-bold mb-2">₹{balance}</div>
                                            <div className="flex gap-1.5">
                                                <button onClick={() => navigate('/distributor/transactions/add-money')}
                                                    className="flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all"
                                                    style={{ backgroundColor: '#ffffff', color: '#1d4ed8' }}
                                                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#dbeafe'; }}
                                                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#ffffff'; }}>
                                                    <ArrowRightLeft className="w-3 h-3"/> Add Money
                                                </button>
                                                <button onClick={() => navigate('/distributor/transactions/add-money')}
                                                    className="flex-1 bg-blue-500 text-white py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-400 flex items-center justify-center gap-1">
                                                    <Landmark className="w-3 h-3"/> Virtual A/C
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-wrap items-center gap-2 shrink-0" style={{ width: '120px', justifyContent: 'flex-end' }}>
                                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700"><Youtube className="w-5 h-5"/></a>
                                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-500 rounded-full flex items-center justify-center text-white"><Instagram className="w-5 h-5"/></a>
                                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700"><Facebook className="w-5 h-5"/></a>
                                            <a href={`https://wa.me/${distPhone}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.003-.001zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                                            </a>
                                        </div>
                                    )}
                                </div>

                                {/* Full info section - dashboard only */}
                                {isDashboard && (
                                    <div className="flex gap-4">
                                        <div className="flex-1 grid grid-cols-2 gap-4">
                                            {/* Distributor Info */}
                                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                                                <div className="flex items-start gap-3 mb-3">
                                                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                                        {distName[0]?.toUpperCase() || 'D'}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="font-bold text-gray-900">{distName}</h3>
                                                        <p className="text-sm text-gray-600">ID: {distId}</p>
                                                    </div>
                                                </div>
                                                <div className="pt-2 border-t border-blue-200">
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <Phone className="w-4 h-4 text-green-600"/>
                                                        <span className="text-gray-700">Support: {distPhone}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* RM Info */}
                                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                                                <h4 className="text-xs text-gray-500 uppercase font-semibold mb-3">Relationship Manager</h4>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white">
                                                        <User className="w-5 h-5"/>
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900">{rmName}</p>
                                                        <div className="flex items-center gap-1 text-sm text-gray-600">
                                                            <Phone className="w-3 h-3"/>
                                                            <span>{rmPhone}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Wallet Card */}
                                        <div className="w-72 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-4 text-white">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm text-blue-100">EXPRESS BALANCE</span>
                                                <Wallet className="w-5 h-5 text-blue-200"/>
                                            </div>
                                            <div className="text-3xl font-bold mb-4">₹{balance}</div>
                                            <div className="flex gap-2">
                                                <button onClick={() => navigate('/distributor/transactions/add-money')}
                                                    className="flex-1 py-2 px-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-1 transition-all"
                                                    style={{ backgroundColor: '#ffffff', color: '#1d4ed8', border: '2px solid #bfdbfe' }}
                                                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#dbeafe'; e.currentTarget.style.color = '#1e40af'; }}
                                                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#ffffff'; e.currentTarget.style.color = '#1d4ed8'; }}>
                                                    <ArrowRightLeft className="w-4 h-4"/> Add Money
                                                </button>
                                                <button onClick={() => navigate('/distributor/transactions/add-money')}
                                                    className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-lg text-sm font-semibold hover:bg-blue-400 flex items-center justify-center gap-1">
                                                    <Landmark className="w-4 h-4"/> Virtual Account
                                                </button>
                                            </div>
                                        </div>
                                        {/* Rural Urban Image */}
                                        <div className="w-80 rounded-xl overflow-hidden bg-gray-100" style={{minHeight: '140px'}}>
                                            <img src={ruralUrbanImg} alt="Rural and Urban" className="w-full h-full object-cover" style={{minHeight: '140px'}}/>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })()}

                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DistributorLayout;
