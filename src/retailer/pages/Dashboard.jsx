import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dataService } from '../../services/dataService';
import { motion } from 'framer-motion';
import {
    Wallet, Building2, ArrowRightLeft, Zap, FileText, 
    Fingerprint, Plane, CreditCard, UserCircle, Receipt,
    Phone, Landmark, ShieldCheck, CircleDollarSign,
    FileBarChart, ScrollText, Calculator, BadgeIndianRupee,
    ChevronRight, LogOut
} from 'lucide-react';

// Dogma Soft Inspired Dashboard - UjjwalPay Retailer Panel
const RetailerDashboard = () => {
    const navigate = useNavigate();
    const [balance, setBalance] = useState("132.45");
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const user = dataService.getCurrentUser();
        setCurrentUser(user);
        if (!user) {
            navigate('/portal');
            return;
        }
        
        const fetchData = async () => {
            if (user) {
                const bal = await dataService.getWalletBalance(user.id);
                setBalance(bal || "132.45");
            }
        };
        fetchData();
    }, [navigate]);

    // Service grid items - matching Dogma Soft layout
    const mainServices = [
        { id: 'wallet', label: 'Wallet Load', icon: Wallet, path: '/add-money', color: '#dc2626' },
        { id: 'aeps', label: 'AePS', icon: Building2, path: '/aeps', color: '#2563eb' },
        { id: 'airtel', label: 'Airtel AePS', icon: Phone, path: '/aeps', color: '#dc2626' },
        { id: 'bank', label: 'Move to Bank', icon: ArrowRightLeft, path: '/payout-hub', color: '#0891b2' },
        { id: 'electricity', label: 'Electricity Bills', icon: Zap, path: '/utility', color: '#ea580c' },
        { id: 'transfer', label: 'Quick Transfer', icon: Landmark, path: '/all-services', color: '#7c3aed' },
    ];

    const secondaryServices = [
        { id: 'aadhar', label: 'Aadhar Pay', icon: Fingerprint, path: '/aeps', color: '#059669' },
        { id: 'matm', label: 'MATM', icon: CreditCard, path: '/matm', color: '#db2777' },
        { id: 'pan', label: 'PAN Card', icon: FileText, path: '/all-services', color: '#7c2d12' },
        { id: 'complaint', label: 'Compliant', icon: ShieldCheck, path: '/profile', color: '#be123c' },
        { id: 'recharge', label: 'Recharge', icon: Phone, path: '/utility', color: '#0369a1' },
        { id: 'dth', label: 'DTH', icon: Zap, path: '/utility', color: '#4338ca' },
    ];

    const utilityServices = [
        { id: 'fastag', label: 'Fastag', icon: CircleDollarSign, path: '/utility', color: '#b45309' },
        { id: 'insurance', label: 'Insurance', icon: ShieldCheck, path: '/all-services', color: '#0d9488' },
        { id: 'jaipur', label: 'Jaipur Darshan', icon: Landmark, path: '/travel', color: '#c2410c' },
        { id: 'exclusive', label: 'Exclusive Services', icon: BadgeIndianRupee, path: '/all-services', color: '#1e40af' },
        { id: 'agent', label: 'New Agent', icon: UserCircle, path: '/profile', color: '#047857' },
        { id: 'itr', label: 'ITR Returns', icon: FileBarChart, path: '/all-services', color: '#991b1b' },
    ];

    const additionalServices = [
        { id: 'nsdl', label: 'NSDL PAN', icon: ScrollText, path: '/all-services', color: '#1e3a8a' },
        { id: 'bbps', label: 'BBPS', icon: Receipt, path: '/utility', color: '#065f46' },
        { id: 'courier', label: 'Courier', icon: Plane, path: '/all-services', color: '#9a3412' },
        { id: 'evyapar', label: 'E-Vyapar', icon: Calculator, path: '/all-services', color: '#581c87' },
        { id: 'vehicle', label: 'Vehicle Loan', icon: CreditCard, path: '/loans', color: '#1d4ed8' },
        { id: 'others', label: 'Other Services', icon: ChevronRight, path: '/all-services', color: '#374151' },
    ];

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

    const handleLogout = () => {
        dataService.logoutUser();
        navigate('/portal');
    };

    return (
        <div className="min-h-screen bg-[#f5f5f5] font-sans">
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');`}</style>
            
            {/* Top Header Bar */}
            <div className="bg-[#1a1a2e] text-white px-4 py-2 flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                    <span className="font-semibold">MY BALANCE (₹) {balance}</span>
                    <button className="hover:text-gray-300">
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
                <div className="w-64 bg-[#1e293b] min-h-screen text-white flex flex-col">
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

                    {/* Navigation */}
                    <nav className="flex-1 py-4">
                        <div className="px-4 mb-2 text-xs text-gray-500 uppercase font-semibold">Access Portal</div>
                        
                        <button 
                            onClick={() => navigate('/dashboard')}
                            className="w-full flex items-center gap-3 px-4 py-3 bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                        >
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            <span className="font-medium">Home</span>
                        </button>

                        <button 
                            onClick={() => navigate('/utility')}
                            className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                        >
                            <Zap className="w-5 h-5" />
                            <span>Recharge</span>
                        </button>

                        <button 
                            onClick={() => navigate('/utility')}
                            className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                        >
                            <FileText className="w-5 h-5" />
                            <span>BBPS</span>
                            <ChevronRight className="w-4 h-4 ml-auto" />
                        </button>

                        <button 
                            onClick={() => navigate('/aeps')}
                            className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                        >
                            <Fingerprint className="w-5 h-5" />
                            <span>NSDL AePS</span>
                            <ChevronRight className="w-4 h-4 ml-auto" />
                        </button>

                        <button 
                            onClick={() => navigate('/aeps')}
                            className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                        >
                            <Building2 className="w-5 h-5" />
                            <span>Fino Bank</span>
                            <ChevronRight className="w-4 h-4 ml-auto" />
                        </button>

                        <button 
                            onClick={() => navigate('/all-services')}
                            className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                        >
                            <Receipt className="w-5 h-5" />
                            <span>AEPS Coupon</span>
                            <ChevronRight className="w-4 h-4 ml-auto" />
                        </button>

                        <button 
                            onClick={() => navigate('/all-services')}
                            className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                        >
                            <ArrowRightLeft className="w-5 h-5" />
                            <span>Money Transfer</span>
                            <ChevronRight className="w-4 h-4 ml-auto" />
                        </button>

                        <button 
                            onClick={() => navigate('/all-services')}
                            className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                        >
                            <FileText className="w-5 h-5" />
                            <span>TAXATION</span>
                        </button>

                        <button 
                            onClick={() => navigate('/all-services')}
                            className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                        >
                            <ShieldCheck className="w-5 h-5" />
                            <span>Insurance</span>
                        </button>

                        <button 
                            onClick={() => navigate('/all-services')}
                            className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                        >
                            <Wallet className="w-5 h-5" />
                            <span>Wallet</span>
                        </button>

                        <button 
                            onClick={() => navigate('/all-services')}
                            className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                        >
                            <UserCircle className="w-5 h-5" />
                            <span>Members</span>
                        </button>

                        <button 
                            onClick={() => navigate('/profile')}
                            className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                        >
                            <UserCircle className="w-5 h-5" />
                            <span>My Account</span>
                        </button>
                    </nav>

                    {/* Security Notice */}
                    <div className="p-4 bg-gray-900 text-xs text-gray-500">
                        <p className="font-semibold text-gray-400 mb-1">SECURITY NOTICE</p>
                        <p>Please ensure you are on ujjwalpay.com. Never share your OTP with anyone.</p>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 p-6">
                    {/* Banner */}
                    <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg p-4 mb-6 text-center">
                        <h2 className="text-lg font-bold">Login To New SSO Portal (Express + E Vyapar)</h2>
                    </div>

                    {/* Services Grid */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        {/* Row 1 */}
                        <div className="grid grid-cols-6 gap-4 mb-6">
                            {mainServices.map((service) => (
                                <motion.button
                                    key={service.id}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate(service.path)}
                                    className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <div 
                                        className="w-16 h-16 rounded-full flex items-center justify-center text-white"
                                        style={{ backgroundColor: service.color }}
                                    >
                                        <service.icon className="w-8 h-8" />
                                    </div>
                                    <span className="text-xs font-medium text-gray-700 text-center">{service.label}</span>
                                </motion.button>
                            ))}
                        </div>

                        {/* Row 2 */}
                        <div className="grid grid-cols-6 gap-4 mb-6">
                            {secondaryServices.map((service) => (
                                <motion.button
                                    key={service.id}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate(service.path)}
                                    className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <div 
                                        className="w-16 h-16 rounded-full flex items-center justify-center text-white"
                                        style={{ backgroundColor: service.color }}
                                    >
                                        <service.icon className="w-8 h-8" />
                                    </div>
                                    <span className="text-xs font-medium text-gray-700 text-center">{service.label}</span>
                                </motion.button>
                            ))}
                        </div>

                        {/* Row 3 */}
                        <div className="grid grid-cols-6 gap-4 mb-6">
                            {utilityServices.map((service) => (
                                <motion.button
                                    key={service.id}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate(service.path)}
                                    className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <div 
                                        className="w-16 h-16 rounded-full flex items-center justify-center text-white"
                                        style={{ backgroundColor: service.color }}
                                    >
                                        <service.icon className="w-8 h-8" />
                                    </div>
                                    <span className="text-xs font-medium text-gray-700 text-center">{service.label}</span>
                                </motion.button>
                            ))}
                        </div>

                        {/* Row 4 */}
                        <div className="grid grid-cols-6 gap-4">
                            {additionalServices.map((service) => (
                                <motion.button
                                    key={service.id}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate(service.path)}
                                    className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <div 
                                        className="w-16 h-16 rounded-full flex items-center justify-center text-white"
                                        style={{ backgroundColor: service.color }}
                                    >
                                        <service.icon className="w-8 h-8" />
                                    </div>
                                    <span className="text-xs font-medium text-gray-700 text-center">{service.label}</span>
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar - Quick Links */}
                <div className="w-72 bg-white p-4 shadow-sm">
                    {/* Wallet Info */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">Wallet Balance :</span>
                            <span className="text-green-600 font-bold">₹{balance}</span>
                        </div>
                        <div className="text-xs text-gray-500 mb-1">
                            {currentUser?.name || 'User'} ({currentUser?.mobile || ''})
                        </div>
                        <div className="text-xs text-gray-500">
                            <div>Fin Year : 2021-2022</div>
                            <div>Commission : Rs 51.80 | TDS : Rs 2.59</div>
                        </div>
                        <button className="mt-2 bg-red-600 text-white text-xs px-3 py-1 rounded hover:bg-red-700">
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
                                        className="w-full text-left text-xs text-gray-600 hover:bg-gray-100 px-2 py-1.5 rounded transition-colors"
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

export default RetailerDashboard;
