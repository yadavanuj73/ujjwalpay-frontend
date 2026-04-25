import DistributorLayout from '../../components/DistributorLayout';
import { Zap, Check } from 'lucide-react';

const PLANS = [
    { title: 'Lite Partner', cost: '₹2,500', benefits: ['Up to 50 Retailers', 'Standard 1% Commission', 'Basic Support', 'Manual Settlements'] },
    { title: 'Pro Distributor', cost: '₹7,500', benefits: ['Up to 250 Retailers', 'Premium 1.5% Commission', 'Priority Support', 'Automated Settlements', 'Custom Invoicing'], featured: true },
    { title: 'Platinum Hub', cost: '₹15,000', benefits: ['Unlimited Retailers', 'Elite 2.2% Commission', '24/7 Dedicated Manager', 'Instant Real-time Payouts', 'White-labeling Options'] },
];

const DistributorPlans = () => {
    return (
        <DistributorLayout>
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-1">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none leading-none">Business Plans & Rates</h1>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-[0.25em] mt-2">Scale your business with higher commission tiers</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                    {PLANS.map((plan, i) => (
                        <div key={i} className={`p-10 rounded-[3rem] shadow-sm flex flex-col gap-10 border transition-all duration-500 relative overflow-hidden group ${
                            plan.featured ? 'bg-[#111e35] text-white border-[#ffb400] shadow-2xl scale-105 z-10' : 'bg-white text-slate-800 border-slate-50'
                        }`}>
                            {plan.featured && (
                                <div className="absolute top-8 right-[-35px] bg-[#ffb400] text-white px-10 py-1 rotate-45 text-[8px] font-black uppercase tracking-widest shadow-lg">Most Popular</div>
                            )}
                            <div className="flex flex-col gap-2">
                                <h3 className="text-xl font-black tracking-tight">{plan.title}</h3>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-black tracking-tighter">{plan.cost}</span>
                                    <span className={`text-[10px] font-bold uppercase tracking-widest ${plan.featured ? 'text-slate-400' : 'text-slate-300'}`}>/ one time</span>
                                </div>
                            </div>
                            <div className="flex-1 flex flex-col gap-6">
                                {plan.benefits.map((benefit, j) => (
                                    <div key={j} className="flex items-center gap-4">
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${plan.featured ? 'bg-[#ffb400]/20 text-[#ffb400]' : 'bg-emerald-50 text-emerald-500'}`}><Check size={14} strokeWidth={4} /></div>
                                        <span className={`text-xs font-bold leading-none ${plan.featured ? 'text-slate-300' : 'text-slate-500'}`}>{benefit}</span>
                                    </div>
                                ))}
                            </div>
                            <button className={`w-full py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:scale-[1.03] active:scale-95 ${
                                plan.featured ? 'bg-[#ffb400] text-white shadow-xl shadow-yellow-500/20' : 'bg-slate-900 text-white'
                            }`}>Upgrade to {plan.title}</button>
                            {plan.featured && <Zap size={80} className="absolute -right-8 -bottom-8 text-white/5" fill="currentColor" />}
                        </div>
                    ))}
                </div>
            </div>
        </DistributorLayout>
    );
};

export default DistributorPlans;
