import { useState } from 'react';
import RetailerLayout from '../../components/RetailerLayout';
import { Fingerprint, Banknote, Search, 
  ArrowRightLeft, FileText, CheckCircle2, History 
} from 'lucide-react';

const AepsPage = () => {
    const [activeService, setActiveService] = useState('withdrawal');
    const [amount, setAmount] = useState('');
    const [mobile, setMobile] = useState('');
    const [aadhaar, setAadhaar] = useState('');
    const [bank, setBank] = useState('');

    const services = [
        { id: 'withdrawal', label: 'Cash Withdrawal', icon: Banknote },
        { id: 'balance', label: 'Balance Enquiry', icon: Search },
        { id: 'statement', label: 'Mini Statement', icon: FileText },
        { id: 'payout', label: 'Aeps Payout', icon: ArrowRightLeft },
    ];

    return (
        <RetailerLayout>
            <div className="flex flex-col gap-8">
                {/* Page Title */}
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                        AEPS Banking Services
                    </h1>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                        Aadhaar Enabled Payment System • Secure & Instant
                    </p>
                </div>

                {/* Service Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {services.map((service) => (
                        <button
                            key={service.id}
                            onClick={() => setActiveService(service.id)}
                            className={`p-6 rounded-[2rem] flex flex-col items-center gap-4 transition-all duration-300 ${
                                activeService === service.id
                                ? 'bg-blue-600 text-white shadow-xl shadow-blue-100 scale-[1.02]'
                                : 'bg-white text-slate-400 hover:text-blue-600 hover:shadow-lg border border-slate-50'
                            }`}
                        >
                            <div className={`p-4 rounded-2xl ${activeService === service.id ? 'bg-white/10' : 'bg-slate-50'}`}>
                                <service.icon size={24} />
                            </div>
                            <span className="text-[11px] font-black uppercase tracking-widest">{service.label}</span>
                        </button>
                    ))}
                </div>

                <div className="flex flex-col xl:flex-row gap-8">
                    {/* Transaction Form */}
                    <div className="flex-1 bg-white p-10 rounded-[3rem] shadow-sm border border-slate-50 h-fit">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-xl font-black text-slate-800 tracking-tight">
                                {services.find(s => s.id === activeService)?.label} 
                            </h3>
                            <div className="px-4 py-1.5 bg-green-50 text-green-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-green-100 flex items-center gap-2">
                                <CheckCircle2 size={12} strokeWidth={3} /> System Ready
                            </div>
                        </div>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Bank</label>
                                    <select 
                                        value={bank}
                                        onChange={(e) => setBank(e.target.value)}
                                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-sm text-slate-700 transition-all appearance-none"
                                    >
                                        <option value="">Choose Bank...</option>
                                        <option value="SBI">State Bank of India</option>
                                        <option value="HDFC">HDFC Bank</option>
                                        <option value="ICICI">ICICI Bank</option>
                                        <option value="PNB">Punjab National Bank</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mobile Number</label>
                                    <input 
                                        type="tel" 
                                        value={mobile}
                                        onChange={(e) => setMobile(e.target.value)}
                                        placeholder="Enter customer mobile" 
                                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-sm transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Aadhaar Card Number</label>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        value={aadhaar}
                                        onChange={(e) => setAadhaar(e.target.value)}
                                        placeholder="0000 0000 0000" 
                                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-sm transition-all tracking-widest"
                                    />
                                    <Fingerprint className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                                </div>
                            </div>

                            {activeService === 'withdrawal' && (
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Withdrawal Amount (₹)</label>
                                    <input 
                                        type="number" 
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="Min ₹100 - Max ₹10,000" 
                                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-sm transition-all"
                                    />
                                </div>
                            )}

                            <div className="pt-4">
                                <button
                                    type="button"
                                    className="w-full py-5 bg-blue-600 text-white rounded-[1.6rem] text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-100 transition-all hover:bg-blue-700 hover:translate-y-[-2px] active:translate-y-0 flex items-center justify-center gap-3"
                                >
                                    <Fingerprint size={18} strokeWidth={3} />
                                    Scan Fingerprint & Process
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Info & Recent Panel */}
                    <div className="w-full xl:w-[400px] flex flex-col gap-8">
                        <div className="bg-gradient-to-br from-[#004dc0] to-blue-800 p-8 rounded-[3rem] text-white shadow-2xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                                    <History size={20} />
                                </div>
                                <h3 className="text-xl font-black tracking-tight">Service Info</h3>
                            </div>
                            <ul className="space-y-4">
                                {[
                                    'Instant Commission Credit',
                                    'Secure Biometric Authentication',
                                    'Real-time Payout to Bank',
                                    'Detailed Mini Statement Support'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-xs font-bold text-blue-100">
                                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-50 flex flex-col gap-6">
                            <h3 className="text-xl font-black text-slate-800 tracking-tight">Last AEPS Log</h3>
                            <div className="space-y-4">
                                {[1, 2].map((_, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl group cursor-pointer hover:bg-blue-50 transition-all">
                                        <div className="flex gap-3 items-center">
                                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 font-black shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                ₹
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-black text-slate-700">Withdrawal</span>
                                                <span className="text-[10px] font-bold text-slate-400">SBI • 10:30 AM</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-sm font-black text-slate-900 block">₹2,500</span>
                                            <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">Success</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline mt-2">View Full History</button>
                        </div>
                    </div>
                </div>
            </div>
        </RetailerLayout>
    );
};

export default AepsPage;
