import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { dataService } from '../../services/dataService';
import { motion } from 'framer-motion';
import {
    Wallet, Building2, ArrowRightLeft, Zap, FileText, 
    Fingerprint, Plane, CreditCard, UserCircle, Receipt,
    Phone, Landmark, ShieldCheck, CircleDollarSign,
    FileBarChart, ScrollText, Calculator, BadgeIndianRupee,
    ChevronRight, LogOut, Home, ShoppingBag, Train, 
    FileSpreadsheet, BadgePercent, Award, FileCheck, HelpCircle,
    LayoutGrid, Users, Landmark as BankIcon
} from 'lucide-react';

// Dogma Soft Inspired Layout - Consistent across all retailer pages
const DogmaLayout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
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
        // Small delay to ensure DOM is ready
        setTimeout(() => {
            // Scroll main content area to top
            const mainContent = document.querySelector('.main-content-area');
            if (mainContent) {
                mainContent.scrollTop = 0;
            }
            // Also scroll window to top
            window.scrollTo(0, 0);
            // Try to find any scrollable container
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }, 50);
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

    const quickLinks = [
        { label: 'Fund Request (Update Payment)', path: '/add-money' },
        { label: 'Move to Bank', path: '/payout-hub' },
        { label: 'Wallet to Wallet Transfer', path: '/all-services' },
        { label: 'Update KYC', path: '/kyc-verification' },
        { label: 'Request New Service / Pay for Service', path: '/all-services' },
        { label: 'Update GST Info', path: '/profile' },
        { label: 'E-vyapar - Buy Now', path: '/all-services' },
        { label: 'Used Vehicle Loans', path: '/loans' },
        { label: 'Courier Service', path: '/all-services' },
    ];

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
                    {/* Logo Area */}
                    <div className="p-4 border-b border-gray-700">
                        <div className="flex items-center gap-2">
                            <img 
                                src="/ujjwawal pay logo.jpeg" 
                                alt="UjjwalPay" 
                                className="w-10 h-10 object-contain rounded"
                            />
                            <div>
                                <h1 className="text-lg font-bold text-white">UjjwalPay</h1>
                                <p className="text-xs text-gray-400">FinTech Pvt Ltd</p>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">हर ट्रांजैक्शन में विश्वास</p>
                    </div>

                    {/* User Info */}
                    <div className="p-4 border-b border-gray-700">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                                {currentUser?.businessName?.[0] || currentUser?.name?.[0] || 'U'}
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-white">
                                    {currentUser?.businessName || currentUser?.name || 'User'}
                                </p>
                                <ChevronRight className="w-4 h-4 text-gray-400 inline" />
                            </div>
                        </div>
                    </div>

                    {/* Main Navigation - Single List, No Duplicates */}
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

                {/* Main Content Area */}
                <div className="main-content-area flex-1 p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 40px)' }}>
                    {children}
                </div>

                {/* Right Sidebar - Quick Links */}
                <div className="w-72 bg-white p-4 shadow-sm overflow-y-auto" style={{ maxHeight: 'calc(100vh - 40px)' }}>
                    {/* Wallet Info */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">Wallet Balance :</span>
                            <span className="text-green-600 font-bold">₹{balance}</span>
                        </div>
                        <div className="text-xs text-gray-500 mb-1">
                            {currentUser?.name || 'User'} ({currentUser?.mobile || ''})
                        </div>
                        <div className="text-xs text-gray-500 space-y-0.5">
                            <div>Fin Year : 2021-2022</div>
                            <div>Commission : Rs 51.80 | TDS : Rs 2.59</div>
                        </div>
                        <button 
                            onClick={() => navigate('/add-money')}
                            className="mt-3 bg-red-600 text-white text-xs px-4 py-2 rounded hover:bg-red-700 w-full"
                        >
                            Claim Now
                        </button>
                    </div>

                    {/* Quick Links */}
                    <div className="mb-4">
                        <div className="bg-red-600 text-white text-center py-2 font-bold text-sm mb-2">
                            Quick Links
                        </div>
                        <ul className="space-y-1">
                            {quickLinks.map((link, idx) => (
                                <li key={idx}>
                                    <button
                                        onClick={() => navigate(link.path)}
                                        className="w-full text-left text-xs text-gray-600 hover:bg-gray-100 px-2 py-2 rounded transition-colors"
                                    >
                                        {link.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DogmaLayout;
