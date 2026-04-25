import RetailerLayout from '../../components/RetailerLayout';
import { User, Mail, Phone, MapPin, Shield, CheckCircle2 } from 'lucide-react';

const UserPage = () => {
    return (
        <RetailerLayout>
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Account Profile</h1>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Manage your retailer profile and security</p>
                </div>

                <div className="flex flex-col xl:flex-row gap-8">
                    {/* Profile Card */}
                    <div className="flex-1 bg-white p-10 rounded-[3rem] shadow-sm border border-slate-50 flex flex-col gap-10">
                        <div className="flex items-center gap-8">
                            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-50 shadow-xl">
                                <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop" alt="Profile" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h2 className="text-2xl font-black text-slate-900">Retailer Preferred User</h2>
                                <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-600 rounded-full text-[9px] font-black uppercase tracking-widest w-fit border border-green-100">
                                    <CheckCircle2 size={12} strokeWidth={3} /> Verified Merchant
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                { icon: User, label: 'Full Name', value: 'Ujjwal Retailer' },
                                { icon: Mail, label: 'Email Address', value: 'retailer@ujjwalpay.com' },
                                { icon: Phone, label: 'Mobile Number', value: '+91 98765 43210' },
                                { icon: MapPin, label: 'Registered City', value: 'New Delhi, India' },
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col gap-2">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{item.label}</span>
                                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm transition-all hover:border-blue-200">
                                        <item.icon size={18} className="text-blue-500" />
                                        <span className="text-sm font-black text-slate-700">{item.value}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="w-full py-5 bg-blue-600 text-white rounded-[1.6rem] text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-100 transition-all hover:bg-blue-700 hover:translate-y-[-2px]">Save Changes</button>
                    </div>

                    {/* Side Info */}
                    <div className="w-full xl:w-[400px] flex flex-col gap-8">
                        <div className="bg-[#004dc0] p-10 rounded-[3rem] text-white flex flex-col gap-6 shadow-2xl relative overflow-hidden">
                            <Shield size={40} className="text-blue-200/20 absolute -right-4 -top-4" />
                            <h3 className="text-xl font-black tracking-tight relative z-10">Security Center</h3>
                            <p className="text-xs font-bold text-blue-100/70 leading-relaxed relative z-10">Your account is secured with 256-bit encryption and multi-factor authentication.</p>
                            <button className="py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all relative z-10">Change Password</button>
                            <button className="py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all relative z-10">Manage 2FA</button>
                        </div>
                    </div>
                </div>
            </div>
        </RetailerLayout>
    );
};

export default UserPage;
