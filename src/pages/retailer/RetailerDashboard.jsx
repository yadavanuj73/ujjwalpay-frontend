import { useState, useEffect } from 'react';
import { 
  Facebook, Twitter, Youtube, MessageCircle, Eye,
  ChevronLeft, ChevronRight, CheckCircle2, Navigation
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import RetailerLayout from '../../components/RetailerLayout';
import logo from '../../assets/images/logo.png';
import promoImg1 from '../../assets/images/retailer.jpg';
import promoImg2 from '../../assets/images/connecting-bharat.jpg';
import promoImg3 from '../../assets/images/distributor.jpg';

// Reusable Table Row component to handle the specific legacy table style
const InfoRow = ({ label, value, isInteractive, onAction }) => (
    <div className="flex border-b border-slate-200 min-h-[48px]">
        <div className="w-[35%] border-r border-slate-200 p-3 bg-white flex items-center">
            <span className="text-[13px] font-bold text-slate-700">{label}</span>
        </div>
        <div className="w-[65%] p-3 bg-white flex items-center justify-between">
            <span className="text-[13px] font-bold text-slate-800">{value}</span>
            {isInteractive && onAction && (
                <button onClick={onAction} className="text-blue-600 hover:text-blue-800 transition-colors">
                    <Eye size={16} />
                </button>
            )}
        </div>
    </div>
);

// Reusable Square Service Card
const ServiceCard = ({ iconPath, title }) => (
    <div className="w-[140px] h-[130px] rounded-[1.2rem] bg-white border border-slate-200 shadow-[0_4px_15px_-3px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center gap-3 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all">
        <div className="relative">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                {/* Specific exact icons depending on path, or standard lucide replacements */}
                <Navigation size={24} className="text-blue-500" />
            </div>
            {/* The little orange checkmark badge over some cards */}
            <div className="absolute -top-1 -right-1 bg-white rounded-full">
                <CheckCircle2 size={16} className="text-orange-500 fill-orange-100" />
            </div>
        </div>
        <span className="text-[11px] font-black text-slate-800 uppercase tracking-wide text-center px-2">{title}</span>
    </div>
);

const RetailerDashboard = () => {
    const defaultData = {
        name: 'PARVIN KUMAR',
        id: 'SH826599',
        expressBalance: 'Rs.720.79',
        evyaparBalance: 'Rs.589.73',
        support: '7410874107',
        rmName: 'Yashwant Chauhan',
        rmPhone: '9587898138'
    };

    const promos = [promoImg1, promoImg2, promoImg3];
    const [currentPromo, setCurrentPromo] = useState(0);
    const [showExpress, setShowExpress] = useState(true);
    const [showEvyapar, setShowEvyapar] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentPromo(prev => (prev + 1) % promos.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [promos.length]);

    const prevPromo = () => setCurrentPromo(prev => (prev - 1 + promos.length) % promos.length);
    const nextPromo = () => setCurrentPromo(prev => (prev + 1) % promos.length);

    return (
        <RetailerLayout>
            <div className="w-full flex flex-col pt-2 px-2 max-w-[1200px]">
                
                {/* --- HEADER BANNER --- */}
                <div className="w-full flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <img src={logo} alt="UJJWAL PAY" className="h-16 object-contain" />
                        <div className="flex flex-col">
                            <h1 className="text-3xl font-extrabold text-red-600 tracking-tight" style={{ fontFamily: 'Times New Roman, serif' }}>Ujjwal Pay Limited</h1>
                            <h2 className="text-[13px] font-black text-slate-800 tracking-wide">हर ट्रांसक्शन में विश्वास™</h2>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:bg-opacity-90 transition-all"><Facebook size={20} fill="currentColor" className="text-white" /></button>
                        <button className="w-10 h-10 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center hover:bg-opacity-90 transition-all"><Twitter size={20} fill="currentColor" /></button>
                        <button className="w-10 h-10 rounded-full bg-[#FF0000] text-white flex items-center justify-center hover:bg-opacity-90 transition-all"><Youtube size={20} fill="currentColor" /></button>
                        <button className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:bg-opacity-90 transition-all"><MessageCircle size={20} fill="currentColor" /></button>
                    </div>
                </div>

                {/* --- INFO TABLE & SLIDER GRID --- */}
                <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-6 mb-8 items-stretch">
                    
                    {/* Information Table Content */}
                    <div className="flex flex-col border-t border-l border-right border-slate-200 border-x">
                        <InfoRow label="Name" value={defaultData.name} />
                        <InfoRow label="Ujjwal Pay ID" value={defaultData.id} />
                        <InfoRow 
                            label="Express Balance" 
                            value={showExpress ? defaultData.expressBalance : 'Rs. ***'} 
                            isInteractive={true} 
                            onAction={() => setShowExpress(!showExpress)} 
                        />
                        <InfoRow 
                            label="Evyapar Balance" 
                            value={showEvyapar ? defaultData.evyaparBalance : 'Rs. ***'} 
                            isInteractive={true} 
                            onAction={() => setShowEvyapar(!showEvyapar)} 
                        />
                        
                        {/* Action Row */}
                        <div className="flex border-b border-slate-200 min-h-[48px]">
                            <div className="w-[50%] p-3 bg-white flex items-center justify-center border-r border-slate-200">
                                <button className="text-blue-600 font-bold text-[13px] hover:underline">+ Load Wallet (VA)</button>
                            </div>
                            <div className="w-[50%] p-3 bg-white flex items-center justify-center">
                                <button className="text-blue-600 font-bold text-[13px] hover:underline">+ Add Money</button>
                            </div>
                        </div>

                        <InfoRow label="Support Center" value={defaultData.support} />
                        <InfoRow label={`RM ${defaultData.rmName}`} value={defaultData.rmPhone} />
                    </div>

                    {/* Promo Slider */}
                    <div className="w-full min-h-[300px] border border-slate-200 relative overflow-hidden group">
                        <AnimatePresence initial={false}>
                            <motion.img
                                key={currentPromo}
                                src={promos[currentPromo]}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </AnimatePresence>
                        
                        {/* Arrows */}
                        <button onClick={prevPromo} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/50 hover:bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <ChevronLeft size={20} className="text-slate-800" />
                        </button>
                        <button onClick={nextPromo} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/50 hover:bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <ChevronRight size={20} className="text-slate-800" />
                        </button>
                    </div>
                </div>

                {/* --- Aeps & Move To Bank SECTION --- */}
                <div className="w-full flex flex-col">
                    <div className="w-full bg-[#3b3b3b] px-4 py-2 text-white font-bold text-[13px] tracking-wide mb-6">
                        Aeps & Move To Bank
                    </div>
                    <div className="flex flex-wrap gap-6 px-2">
                        <ServiceCard title="AEPS CUB" />
                        <ServiceCard title="AEPS MOVE TO BANK" />
                    </div>
                </div>

            </div>
        </RetailerLayout>
    );
};

export default RetailerDashboard;
