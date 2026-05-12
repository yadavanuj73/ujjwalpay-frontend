import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Wallet, Building2, ArrowRightLeft, Zap, FileText, 
    Fingerprint, Plane, CreditCard, UserCircle, Receipt,
    Phone, Landmark, ShieldCheck, CircleDollarSign,
    FileBarChart, ScrollText, Calculator, BadgeIndianRupee,
    ChevronRight
} from 'lucide-react';
import RetailerHeader from '../components/RetailerHeader';

// Dashboard content only - layout provides sidebar/header
const RetailerDashboard = () => {
    const navigate = useNavigate();

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

    return (
        <div className="space-y-4">
            {/* Dogma-style Header with User Info, Wallet, Social Media */}
            <RetailerHeader />

            {/* Services Grid */}
            <div className="bg-white rounded-lg shadow-sm p-6">
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
    );
};

export default RetailerDashboard;
