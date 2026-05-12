import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { dataService } from '../../services/dataService';
import { motion } from 'framer-motion';
import {
    Wallet, Building2, ArrowRightLeft, Zap, FileText, 
    Fingerprint, Plane, CreditCard, UserCircle, Receipt,
    Phone, Landmark, ShieldCheck, CircleDollarSign,
    FileBarChart, ScrollText, Calculator, BadgeIndianRupee,
    LogOut, Home, Train, 
    FileSpreadsheet, BadgePercent, Award, FileCheck, HelpCircle,
    LayoutGrid, Users, Landmark as BankIcon
} from 'lucide-react';

// Dogma Soft Inspired Layout - Consistent across all retailer pages
const DogmaLayout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const mainContentRef = useRef(null);
    const [balance, setBalance] = useState("0.00");
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const user = dataService.getCurrentUser();
        setCurrentUser(user);
        
        const fetchData = async () => {
            if (user) {
                const bal = await dataService.getWalletBalance(user.id);
                setBalance(bal || "0.00");
            }
        };
        fetchData();
    }, []);

    // Scroll to top when route changes
    useEffect(() => {
        // Use ref for more reliable scrolling
        if (mainContentRef.current) {
            mainContentRef.current.scrollTop = 0;
        }
        // Also scroll window
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }, [location.pathname]);

    const handleLogout = () => {
        dataService.logoutUser();
        navigate('/portal');
    };

    // Single consolidated navigation list - NO DUPLICATES
    // Each item has a unique path - no two items share the same path
    const navItems = [
        { id: 'dashboard', label: 'Home', icon: Home, path: '/dashboard' },
        { id: 'all_services', label: 'All Services', icon: LayoutGrid, path: '/all-services' },
        { id: 'utility_hub', label: 'Utility Hub', icon: Zap, path: '/utility' },
        { id: 'aeps', label: 'NSDL AePS', icon: Fingerprint, path: '/aeps' },
        { id: 'travel_hub', label: 'Travel Hub', icon: Train, path: '/travel' },
        { id: 'payout_hub', label: 'Payout Hub', icon: BankIcon, path: '/payout-hub' },
        { id: 'loan_hub', label: 'Loan Hub', icon: CreditCard, path: '/loans' },
        { id: 'matm', label: 'MATM', icon: CreditCard, path: '/matm' },
        { id: 'reports', label: 'Reports & Ledger', icon: FileSpreadsheet, path: '/reports' },
        { id: 'gst_einvoice', label: 'GST E-Invoice Report', icon: FileCheck, path: '/gst-invoice-report' },
        { id: 'commission', label: 'Commission Plans', icon: BadgePercent, path: '/plans' },
        { id: 'wallet', label: 'Wallet', icon: Wallet, path: '/add-money' },
        { id: 'members', label: 'Members', icon: Users, path: '/profile' },
        { id: 'kyc', label: 'Update KYC', icon: FileCheck, path: '/kyc-verification' },
        { id: 'support', label: 'Help & Support', icon: HelpCircle, path: '/support' },
    ];

    // Active state - exact match or starts with for nested routes
    const isActive = (item) => {
        const currentPath = location.pathname;
        const itemPath = item.path;
        
        // Exact match
        if (currentPath === itemPath) return true;
        
        // For /dashboard, only match exact
        if (itemPath === '/dashboard') return currentPath === '/dashboard';
        
        // For other routes, match if current path starts with item path (for sub-routes)
        // But prevent /all-services from matching /aeps
        if (currentPath.startsWith(itemPath + '/')) return true;
        
        return false;
    };

    return (
        <div className="min-h-screen bg-[#f5f5f5] font-sans">
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');`}</style>
            
            {/* Top Header Bar */}
            <div className="bg-[#1a1a2e] text-white px-4 py-2 flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                    <span className="font-semibold">MY BALANCE (₹) {balance}</span>
                    <button className="hover:text-gray-300" onClick={() => window.location.reload()}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    </button>
                </div>
                <div className="flex items-center gap-4">
                    <button className="hover:text-gray-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                    <button className="hover:text-gray-300">⚙️</button>
                    <button onClick={handleLogout} className="flex items-center gap-1 hover:text-gray-300">
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>
            </div>

            <div className="flex">
                {/* Left Sidebar - Dark Theme */}
                <div className="w-64 bg-[#1e293b] min-h-[calc(100vh-40px)] text-white flex flex-col">
                    {/* Main Navigation */}
                    <nav className="flex-1 py-2 overflow-y-auto">
                        <div className="px-4 mb-2 text-xs text-gray-500 uppercase font-semibold">Menu</div>
                        
                        {navItems.map((item) => (
                            <button 
                                key={item.id}
                                onClick={() => navigate(item.path)}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                                    isActive(item) 
                                        ? 'bg-gray-800 text-white border-l-2 border-blue-500' 
                                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                }`}
                            >
                                <item.icon className="w-5 h-5 shrink-0" />
                                <span className="text-sm">{item.label}</span>
                            </button>
                        ))}
                    </nav>

                    {/* Security Notice */}
                    <div className="p-4 bg-gray-900 text-xs text-gray-500 border-t border-gray-700">
                        <p className="font-semibold text-gray-400 mb-1">SECURITY NOTICE</p>
                        <p>Please ensure you are on ujjwalpay.com. Never share your OTP with anyone.</p>
                    </div>
                </div>

                {/* Main Content Area - Full Width */}
                <div ref={mainContentRef} className="main-content-area flex-1 p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 40px)' }}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DogmaLayout;
