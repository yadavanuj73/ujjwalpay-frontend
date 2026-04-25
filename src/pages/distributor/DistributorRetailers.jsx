import { useState } from 'react';
import DistributorLayout from '../../components/DistributorLayout';
import { Plus, CheckCircle2, Clock, XCircle, MoreHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_RETAILERS = [
    { id: 'RT001', name: 'Rahul Electronics', city: 'Mumbai', phone: '+91 98XXX XXX01', status: 'approved', joined: '2024-03-20', balance: 12500 },
    { id: 'RT002', name: 'Aman Telecom', city: 'Delhi', phone: '+91 98XXX XXX02', status: 'approved', joined: '2024-03-18', balance: 5240 },
    { id: 'RT003', name: 'Priya Recharge', city: 'Pune', phone: '+91 98XXX XXX03', status: 'pending', joined: '2024-03-25', balance: 0 },
    { id: 'RT004', name: 'Ravi Digital Shop', city: 'Surat', phone: '+91 98XXX XXX04', status: 'approved', joined: '2024-03-10', balance: 8900 },
    { id: 'RT005', name: 'Kunal Mobile Point', city: 'Jaipur', phone: '+91 98XXX XXX05', status: 'failed', joined: '2024-03-05', balance: 1200 },
];

const StatusBadge = ({ status }) => {
    const styles = { approved: 'bg-green-50 text-green-600', pending: 'bg-amber-50 text-amber-600', failed: 'bg-red-50 text-red-600' };
    const Icons = { approved: CheckCircle2, pending: Clock, failed: XCircle };
    const Icon = Icons[status];
    return (
        <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest w-fit ${styles[status]}`}>
            <Icon size={12} strokeWidth={3} /> {status}
        </span>
    );
};

const DistributorRetailers = () => {
    const [retailers, setRetailers] = useState(INITIAL_RETAILERS);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newRetailer, setNewRetailer] = useState({ name: '', city: '', phone: '', email: '' });

    const handleAddRetailer = (e) => {
        e.preventDefault();
        const retailer = {
            ...newRetailer,
            id: `RT${Math.floor(100 + Math.random() * 900)}`,
            status: 'pending',
            joined: new Date().toISOString().split('T')[0],
            balance: 0
        };
        setRetailers([retailer, ...retailers]);
        setIsAddModalOpen(false);
        setNewRetailer({ name: '', city: '', phone: '', email: '' });
        alert('Retailer application submitted for approval!');
    };

    return (
        <DistributorLayout>
            <AnimatePresence>
                {isAddModalOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#111e35]/40 backdrop-blur-sm p-4"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-[3rem] p-12 w-full max-w-2xl shadow-2xl relative overflow-hidden"
                        >
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Onboard New Retailer</h2>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-10">Expand your business network across India</p>
                            
                            <form onSubmit={handleAddRetailer} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { label: 'Shop Name', name: 'name', type: 'text', placeholder: 'e.g. Rahul Telecom' },
                                    { label: 'Owner Email', name: 'email', type: 'email', placeholder: 'rahul@gmail.com' },
                                    { label: 'Mobile Number', name: 'phone', type: 'tel', placeholder: '+91 99999 00000' },
                                    { label: 'City/Location', name: 'city', type: 'text', placeholder: 'Mumbai' },
                                ].map((field, i) => (
                                    <div key={i} className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{field.label}</label>
                                        <input 
                                            required
                                            type={field.type} 
                                            placeholder={field.placeholder}
                                            value={newRetailer[field.name]}
                                            onChange={(e) => setNewRetailer({...newRetailer, [field.name]: e.target.value})}
                                            className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-yellow-400/10 transition-all font-black text-sm"
                                        />
                                    </div>
                                ))}
                                <div className="md:col-span-2 flex gap-4 mt-6">
                                    <button type="button" onClick={() => setIsAddModalOpen(false)} className="flex-1 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-all">Discard</button>
                                    <button type="submit" className="flex-1 py-5 bg-[#ffb400] text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-yellow-500/20 hover:scale-[1.03] transition-all">Submit Application</button>
                                </div>
                            </form>
                            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-yellow-50 rounded-full blur-2xl opacity-50"></div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex flex-col gap-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none leading-none leading-none">Your Retailer Network</h1>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-[0.25em] mt-2">Managing 482 active partners across PAN India</p>
                    </div>
                    <button 
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center gap-3 px-8 py-5 bg-[#ffb400] text-white rounded-[1.6rem] text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-yellow-500/20 hover:scale-[1.03] transition-all"
                    >
                        <Plus size={18} strokeWidth={4} /> Enroll Retailer
                    </button>
                </div>

                <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-50">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] text-left">
                                    <th className="py-6">Store Detail</th>
                                    <th className="py-6">Location</th>
                                    <th className="py-6">Mobile</th>
                                    <th className="py-6">Wallet Balance</th>
                                    <th className="py-6">Onboard Date</th>
                                    <th className="py-6">Status/Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {retailers.map(rt => (
                                    <tr key={rt.id} className="group hover:bg-slate-50/50 transition-all">
                                        <td className="py-6 flex flex-col gap-1">
                                            <span className="text-sm font-black text-slate-800 tracking-tight">{rt.name}</span>
                                            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{rt.id}</span>
                                        </td>
                                        <td className="py-6 text-xs font-black text-slate-500 uppercase tracking-widest">{rt.city}</td>
                                        <td className="py-6 text-xs font-bold text-slate-400 font-mono tracking-tighter">{rt.phone}</td>
                                        <td className="py-6 text-sm font-black text-slate-800 tracking-tight">₹{rt.balance.toLocaleString()}</td>
                                        <td className="py-6 text-xs font-bold text-slate-400">{rt.joined}</td>
                                        <td className="py-6 flex items-center justify-between gap-4">
                                            <StatusBadge status={rt.status} />
                                            <div className="p-2 text-slate-200 hover:text-[#ffb400] cursor-pointer transition-all"><MoreHorizontal size={20} /></div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex justify-center mt-4">
                    <div className="flex gap-2">
                        {[1, 2, 3].map(p => (
                            <button key={p} className={`w-10 h-10 rounded-xl flex items-center justify-center text-[11px] font-black transition-all ${p === 1 ? 'bg-[#ffb400] text-white shadow-lg' : 'bg-white text-slate-400 hover:text-white hover:bg-[#111e35]'}`}>{p}</button>
                        ))}
                    </div>
                </div>
            </div>
        </DistributorLayout>
    );
};

export default DistributorRetailers;
