import RetailerLayout from '../../components/RetailerLayout';
import { Info, AlertTriangle, CheckCircle2, MoreHorizontal } from 'lucide-react';

const NOTIFICATIONS = [
  { type: 'info', title: 'New Service Launched!', text: 'DTH Payouts are now live on Ujjwal Pay.', time: '2 mins ago' },
  { type: 'alert', title: 'Wallet Balance Low', text: 'Consider recharging your wallet to avoid service disruptions.', time: '1 hour ago' },
  { type: 'success', title: 'KYC Document Approved', text: 'Aadhaar Card verification successful.', time: '4 hours ago' },
  { type: 'info', title: 'System Maintenance', text: 'Scheduled maintenance tonight at 12:00 AM IST.', time: 'Yesterday' },
];

const NotificationsPage = () => {
    return (
        <RetailerLayout>
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">System Notifications</h1>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Update logs and security alerts</p>
                </div>

                <div className="flex flex-col gap-4">
                    {NOTIFICATIONS.map((note, i) => (
                        <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-50 flex items-center justify-between group hover:shadow-xl transition-all cursor-pointer">
                            <div className="flex gap-8 items-center">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                                    note.type === 'info' ? 'bg-blue-50 text-blue-600' :
                                    note.type === 'alert' ? 'bg-amber-50 text-amber-600' :
                                    'bg-green-50 text-green-600'
                                }`}>
                                    {note.type === 'info' ? <Info size={24} /> : note.type === 'alert' ? <AlertTriangle size={24} /> : <CheckCircle2 size={24} />}
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-lg font-black text-slate-800 tracking-tight">{note.title}</span>
                                    <span className="text-xs font-bold text-slate-400 leading-relaxed max-w-md">{note.text}</span>
                                </div>
                            </div>
                            <div className="text-right flex flex-col items-end gap-2">
                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{note.time}</span>
                                <div className="p-2 text-slate-200 hover:text-blue-500 transition-all"><MoreHorizontal size={20} /></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </RetailerLayout>
    );
};

export default NotificationsPage;
