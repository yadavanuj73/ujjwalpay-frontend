import RetailerLayout from '../../components/RetailerLayout';
import { Smartphone, Monitor, Zap, Droplets, CreditCard, ShieldCheck, Globe, Plus, ArrowRight } from 'lucide-react';

const SERVICES_LIST = [
    { id: 'mobile', label: 'Mobile Recharge', icon: Smartphone, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 'dth', label: 'DTH Utility', icon: Monitor, color: 'text-amber-500', bg: 'bg-amber-50' },
    { id: 'electricity', label: 'Electricity Bill', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    { id: 'water', label: 'Water Utility', icon: Droplets, color: 'text-blue-400', bg: 'bg-blue-50' },
    { id: 'credit', label: 'Credit Card Pay', icon: CreditCard, color: 'text-rose-500', bg: 'bg-rose-50' },
    { id: 'insurance', label: 'Insurance Premium', icon: ShieldCheck, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { id: 'pan', label: 'PAN Card Service', icon: Globe, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { id: 'payout', label: 'Bank Payout', icon: Smartphone, color: 'text-slate-600', bg: 'bg-slate-50' },
];

const RetailerServicesPage = () => {
    return (
        <RetailerLayout>
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Business Services</h1>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Select a service to start processing transactions</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {SERVICES_LIST.map((service, i) => (
                        <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-50 flex flex-col gap-6 group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer relative overflow-hidden">
                            <div className={`w-14 h-14 ${service.bg} rounded-2xl flex items-center justify-center ${service.color} transition-all group-hover:bg-[#004dc0] group-hover:text-white`}>
                                <service.icon size={28} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-sm font-black text-slate-800 tracking-tight">{service.label}</span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">Commission up to 2.5%</span>
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t border-slate-50 relative z-10">
                                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest group-hover:text-[#004dc0]">Launch Service</span>
                                <ArrowRight size={14} className="text-slate-300 group-hover:text-[#004dc0] group-hover:translate-x-2 transition-all" />
                            </div>
                            <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-[#004dc0] rounded-full opacity-0 group-hover:opacity-5 transition-all"></div>
                        </div>
                    ))}
                    
                    <div className="bg-[#f3f7fb] border-4 border-dashed border-slate-200 p-8 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 text-slate-300 hover:border-blue-200 hover:text-blue-500 transition-all cursor-pointer">
                        <Plus size={40} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Request More</span>
                    </div>
                </div>
            </div>
        </RetailerLayout>
    );
};

export default RetailerServicesPage;
