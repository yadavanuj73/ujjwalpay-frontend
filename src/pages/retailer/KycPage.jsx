import RetailerLayout from '../../components/RetailerLayout';
import { Upload, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

const KycPage = () => {
    return (
        <RetailerLayout>
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Merchant KYC</h1>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Verify your identity to unlock all business features</p>
                </div>

                <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-50 flex flex-col gap-8">
                    <div className="flex items-center gap-4 px-6 py-4 bg-blue-50/50 text-blue-600 rounded-3xl border border-blue-100 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <ShieldCheck size={28} />
                            <div className="flex flex-col">
                                <span className="text-sm font-black tracking-tight">Current Status: PENDING VERIFICATION</span>
                                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest leading-relaxed">Submit your documents to increase your wallet limits.</span>
                            </div>
                        </div>
                        <CheckCircle2 className="text-blue-200" size={24} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            { label: 'Aadhaar Card (Front/Back)', desc: 'Upload clear scans of both sides.' },
                            { label: 'PAN Card', desc: 'Required for all tax purposes.' },
                            { label: 'Shop/Business Proof', desc: 'Utility bill or Rent agreement.' },
                            { label: 'Merchant Photo', desc: 'Recent passport size photograph.' },
                        ].map((doc, i) => (
                            <div key={i} className="flex flex-col gap-4 p-8 border border-slate-50 bg-slate-50/50 rounded-[2.5rem] hover:bg-white hover:border-blue-100 transition-all group cursor-pointer">
                                <div className="flex justify-between items-start">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-300 group-hover:text-blue-500 shadow-sm transition-all"><FileText size={22} /></div>
                                    <Upload size={18} className="text-slate-200 group-hover:text-blue-500" />
                                </div>
                                <div className="flex flex-col gap-1 mt-2">
                                    <span className="text-sm font-black text-slate-800 tracking-tight">{doc.label}</span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">{doc.desc}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button className="w-full py-5 bg-blue-600 text-white rounded-[1.6rem] text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-100 transition-all hover:bg-blue-700 hover:translate-y-[-2px]">Submit All Documents</button>
            </div>
        </RetailerLayout>
    );
};

export default KycPage;
