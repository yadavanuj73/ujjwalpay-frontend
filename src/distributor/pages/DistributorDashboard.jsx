import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bell, ChevronRight, Plus,
    Wallet, TrendingUp, Users, Activity,
    CreditCard, Target, MapPin
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { sharedDataService } from '../../services/sharedDataService';
import { dataService } from '../../services/dataService';
import { getDistributorPlan, getRemainingRetailerSlots } from '../config/planConfig';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, Cell
} from 'recharts';

/* ─── Static demo data ──────────────────────────────────────── */
const financeData = [
    { date: '1 Feb', credit: 220, debit: 580 },
    { date: '2 Feb', credit: 450, debit: 340 },
    { date: '3 Feb', credit: 280, debit: 620 },
    { date: '4 Feb', credit: 780, debit: 178 },
    { date: '5 Feb', credit: 390, debit: 450 },
    { date: '6 Feb', credit: 860, debit: 300 },
    { date: '7 Feb', credit: 540, debit: 680 },
    { date: '8 Feb', credit: 920, debit: 240 },
];

const goals = [
    { label: 'Monthly Target', sub: '₹5,00,000 goal', pct: 68, color: '#6366f1' },
    { label: 'Active Retailers', sub: '20 retailer goal', pct: 45, color: '#10b981' },
    { label: 'Commission Goal', sub: '₹20,000 goal', pct: 82, color: '#f59e0b' },
];

/* ─── Custom chart tooltip ─────────────────────────────────── */
const ChartTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-[#1e293b] text-white rounded-xl px-4 py-3 shadow-2xl text-[10px] space-y-1 border border-white/10">
            <p className="font-black text-white/60 uppercase tracking-widest">{label}</p>
            {payload.map((p, i) => (
                <p key={i} className="font-black flex items-center gap-1.5" style={{ color: p.color }}>
                    <span className="w-2 h-2 rounded-full inline-block" style={{ background: p.color }} />
                    {p.name === 'credit' ? 'Credit' : 'Debit'}: ₹{p.value.toLocaleString('en-IN')}
                </p>
            ))}
        </div>
    );
};

/* ─── Animated number ─────────────────────────────────────── */
const AnimNum = ({ n, prefix = '' }) => {
    const [v, setV] = useState(0);
    useEffect(() => {
        const target = typeof n === 'number' ? n : 0;
        const step = Math.max(1, Math.floor(target / 35));
        let cur = 0;
        const t = setInterval(() => {
            cur = Math.min(cur + step, target);
            setV(cur);
            if (cur >= target) clearInterval(t);
        }, 28);
        return () => clearInterval(t);
    }, [n]);
    return <>{prefix}{v.toLocaleString('en-IN')}</>;
};

/* ─── Individual Service Analytics Cards ─────────────────── */
const ServiceAnalyticsCards = ({ transactions }) => {
    const serviceStats = useMemo(() => {
        if (!transactions || transactions.length === 0) return {};
        
        const stats = {
            aeps: { count: 0, amount: 0, title: 'AEPS Services', icon: '🏛️', color: '#6366f1', bg: 'from-indigo-500 to-blue-600' },
            travel: { count: 0, amount: 0, title: 'Travel Services', icon: '✈️', color: '#10b981', bg: 'from-emerald-500 to-cyan-500' },
            mobile: { count: 0, amount: 0, title: 'Mobile Recharge', icon: '📱', color: '#f59e0b', bg: 'from-orange-500 to-amber-500' },
            dth: { count: 0, amount: 0, title: 'DTH Recharge', icon: '📺', color: '#ec4899', bg: 'from-pink-500 to-rose-500' },
            utility: { count: 0, amount: 0, title: 'Bill Payments', icon: '⚡', color: '#8b5cf6', bg: 'from-violet-500 to-fuchsia-500' },
            money: { count: 0, amount: 0, title: 'Money Transfer', icon: '💸', color: '#06b6d4', bg: 'from-cyan-500 to-blue-500' },
            pos: { count: 0, amount: 0, title: 'mPOS / MATM', icon: '💳', color: '#f43f5e', bg: 'from-rose-500 to-red-500' },
            cms: { count: 0, amount: 0, title: 'CMS Banking', icon: '🏦', color: '#84cc16', bg: 'from-lime-500 to-green-500' },
        };
        
        transactions.forEach(t => {
            const service = (t.service_type || '').toLowerCase();
            const amount = parseFloat(t.amount || 0);
            
            if (service.includes('aeps') || service.includes('cash') || service.includes('withdrawal')) {
                stats.aeps.count++; stats.aeps.amount += amount;
            } else if (service.includes('travel') || service.includes('rail') || service.includes('hotel') || service.includes('bus') || service.includes('air')) {
                stats.travel.count++; stats.travel.amount += amount;
            } else if (service.includes('mobile') || service.includes('recharge')) {
                stats.mobile.count++; stats.mobile.amount += amount;
            } else if (service.includes('dth')) {
                stats.dth.count++; stats.dth.amount += amount;
            } else if (service.includes('bill') || service.includes('electricity') || service.includes('water') || service.includes('gas') || service.includes('bbps') || service.includes('utility')) {
                stats.utility.count++; stats.utility.amount += amount;
            } else if (service.includes('money') || service.includes('transfer') || service.includes('neft') || service.includes('imps') || service.includes('rtgs')) {
                stats.money.count++; stats.money.amount += amount;
            } else if (service.includes('pos') || service.includes('matm') || service.includes('mpos') || service.includes('card')) {
                stats.pos.count++; stats.pos.amount += amount;
            } else if (service.includes('cms') || service.includes('banking') || service.includes('deposit')) {
                stats.cms.count++; stats.cms.amount += amount;
            }
        });
        
        return stats;
    }, [transactions]);

    const hasData = Object.values(serviceStats).some(s => s.count > 0);
    if (!hasData) return null;

    return (
        <div className="space-y-4">
            <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
                className="flex items-center justify-between"
            >
                <h2 className="text-base font-black text-slate-900">Service Analytics</h2>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Data</span>
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(serviceStats)
                    .filter(([_, data]) => data.count > 0)
                    .map(([key, data], i) => (
                    <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.05 }}
                        whileHover={{ y: -3, scale: 1.02 }}
                        className={`bg-gradient-to-br ${data.bg} rounded-2xl p-4 text-white shadow-lg relative overflow-hidden cursor-pointer`}
                    >
                        {/* Background decoration */}
                        <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/10 rounded-full" />
                        <div className="absolute right-2 top-6 w-10 h-10 bg-white/5 rounded-full" />
                        
                        <div className="relative z-10">
                            <div className="flex items-start justify-between mb-3">
                                <span className="text-2xl">{data.icon}</span>
                                <span className="text-[10px] font-black bg-white/20 px-2 py-0.5 rounded-full">
                                    {data.count} txn
                                </span>
                            </div>
                            
                            <p className="text-[10px] font-bold text-white/80 uppercase tracking-wider mb-1">{data.title}</p>
                            <p className="text-lg font-black">₹{data.amount.toLocaleString('en-IN')}</p>
                            
                            {/* Mini progress bar */}
                            <div className="mt-3 bg-white/20 rounded-full h-1.5 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min(100, (data.count / 20) * 100)}%` }}
                                    transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                                    className="h-full bg-white/80 rounded-full"
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
            
            {/* Service Performance Chart */}
            <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100"
                style={{ backgroundColor: `rgba(var(--brand-color-rgb), 0.03)` }}
            >
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-black text-slate-900">Service Performance</h3>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Last 7 Days</span>
                </div>
                <ResponsiveContainer width="100%" height={180}>
                    <BarChart 
                        data={Object.entries(serviceStats)
                            .filter(([_, d]) => d.count > 0)
                            .map(([k, d]) => ({ name: d.title.split(' ')[0], count: d.count, amount: d.amount }))}
                        margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
                        barSize={24}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                        <XAxis 
                            dataKey="name" 
                            tick={{ fontSize: 9, fontWeight: 700, fill: '#64748b' }} 
                            axisLine={false} 
                            tickLine={false}
                        />
                        <YAxis 
                            tick={{ fontSize: 9, fontWeight: 700, fill: '#94a3b8' }} 
                            axisLine={false} 
                            tickLine={false}
                        />
                        <Tooltip 
                            contentStyle={{ 
                                background: '#1e293b', 
                                border: 'none', 
                                borderRadius: '12px', 
                                fontSize: '10px',
                                color: '#fff'
                            }}
                            itemStyle={{ color: '#fff', fontWeight: 700 }}
                        />
                        <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                            {Object.entries(serviceStats)
                                .filter(([_, d]) => d.count > 0)
                                .map(([k, d], i) => (
                                    <Cell key={k} fill={d.color} />
                                ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </motion.div>
        </div>
    );
};

/* ═══════════════════════ MAIN ═══════════════════════════════ */
const DistributorDashboard = () => {
    const navigate = useNavigate();
    const [dist, setDist] = useState(null);
    const [retailers, setRetailers] = useState([]);
    const [cardIdx, setCardIdx] = useState(0);

    const [transactions, setTransactions] = useState([]);

    const load = async () => {
        const s = sharedDataService.getCurrentDistributor();
        if (!s) return;

        // Fetch real balance
        const userBal = await dataService.getWalletBalance(s.id);
        const fresh = { ...s, wallet: { balance: userBal } };
        setDist(fresh);

        // Fetch all users to find assigned retailers
        const allUsers = await dataService.getAllUsers();
        const myRetailers = allUsers.filter(r =>
            (fresh.assignedRetailers || []).includes(r.username) || r.ownerId === fresh.id
        );
        setRetailers(myRetailers);

        // Fetch transactions for this distributor's network if needed
        // For now, let's just use user transactions for the personal wallet
        const personalTxns = await dataService.getUserTransactions(s.id);
        setTransactions(personalTxns);
    };

    useEffect(() => {
        load();
        window.addEventListener('distributorDataUpdated', load);
        return () => window.removeEventListener('distributorDataUpdated', load);
    }, []);

    const walletBal = dist?.wallet?.balance || '0.00';
    const distName = dist?.name || 'DISTRIBUTOR';
    const distId = dist?.id || 'DIST-0001';
    const planCfg = getDistributorPlan(dist);
    const maxR = planCfg.maxRetailers;
    const remainingSlots = getRemainingRetailerSlots(dist, retailers.length);
    const usagePct = maxR === Infinity ? 100 : Math.min(100, Math.round((retailers.length / maxR) * 100));

    const stats = [
        { label: 'Wallet Balance', val: walletBal, prefix: '₹', icon: Wallet, iconColor: 'var(--brand-color)', bg: 'var(--brand-color)' },
        { label: 'Commission', val: '0', prefix: '₹', icon: TrendingUp, iconColor: 'var(--brand-color)', bg: 'var(--brand-color)' },
        { label: 'Transactions', val: String(transactions.length), prefix: '', icon: Activity, iconColor: 'var(--brand-color)', bg: 'var(--brand-color)' },
        {
            label: maxR === Infinity ? 'Total Retailers' : `Retailers (${retailers.length}/${maxR})`,
            val: String(retailers.length || 0),
            prefix: '', icon: Users, iconColor: 'var(--brand-color)', bg: 'var(--brand-color)'
        },
    ];

    /* wallet cards (demo) */
    const cards = [
        {
            num: '5995  7474  1103  7513  0014',
            exp: '11/27',
            holder: distName,
            bg: 'from-slate-700 to-slate-900',
        },
        {
            num: '4231  8821  4455  9900  0023',
            exp: '08/26',
            holder: distName,
            bg: 'from-indigo-600 to-purple-800',
        },
    ];

    return (
        /* outer wrapper — light gray page bg */
        <div className="h-full overflow-y-auto bg-[#f8f9fb] font-['Inter',sans-serif]">
            <div className="max-w-[1400px] mx-auto p-6 md:p-8">

                {/* ── Page header ───────────────────────────────── */}
                <div className="flex items-center justify-between mb-7">
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Dashboard</h1>
                        <span
                            className="inline-flex items-center gap-1.5 mt-1 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full text-white"
                            style={{ background: 'var(--brand-color)', color: 'black' }}
                        >
                            {planCfg.label}
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="relative p-2 text-slate-500 hover:text-slate-800 transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                        </button>
                        <button className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-[11px] font-black shadow-md shadow-amber-400/30">
                            {distName.charAt(0)}
                        </button>
                    </div>
                </div>

                {/* ── Two‑column grid ───────────────────────────── */}
                <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">

                    {/* ════════════ LEFT COLUMN ════════════ */}
                    <div className="space-y-6 min-w-0">

                        {/* Stat row */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {stats.map((s, i) => (
                                <motion.div key={i}
                                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.07 }}
                                    whileHover={{ y: -2 }}
                                    className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 cursor-default hover:border-[var(--brand-color)] transition-all"
                                    style={{ backgroundColor: `rgba(var(--brand-color-rgb), 0.05)` }}
                                >
                                    <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: `${s.bg}15`, opacity: 0.8 }}>
                                        <s.icon size={17} style={{ color: 'black' }} />
                                    </div>
                                    <p className="text-xl font-black text-slate-900 leading-none">
                                        {s.prefix}{i === 0 ? walletBal : <AnimNum n={parseInt(s.val.replace(/,/g, ''))} />}
                                    </p>
                                    <p className="text-[10px] font-bold text-slate-400 mt-1.5 uppercase tracking-widest">{s.label}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Finances chart */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25 }}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:border-[var(--brand-color)] transition-all"
                            style={{ backgroundColor: `rgba(var(--brand-color-rgb), 0.05)` }}
                        >
                            <div className="flex items-center justify-between mb-5">
                                <h2 className="text-base font-black text-slate-900">Finances</h2>
                                <div className="flex items-center gap-4 text-[10px] font-black">
                                    <span className="flex items-center gap-1.5 text-slate-500">
                                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block" />
                                        Credit
                                    </span>
                                    <span className="flex items-center gap-1.5 text-slate-500">
                                        <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" />
                                        Debit
                                    </span>
                                </div>
                            </div>
                            <ResponsiveContainer width="100%" height={240}>
                                <BarChart data={financeData} margin={{ top: 5, right: 10, left: -15, bottom: 0 }} barCategoryGap="25%" barGap={4}>
                                    <defs>
                                        <linearGradient id="creditGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
                                            <stop offset="100%" stopColor="#818cf8" stopOpacity={0.7} />
                                        </linearGradient>
                                        <linearGradient id="debitGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#f43f5e" stopOpacity={1} />
                                            <stop offset="100%" stopColor="#fb7185" stopOpacity={0.7} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                                    <XAxis
                                        dataKey="date"
                                        tick={{ fontSize: 9, fontWeight: 700, fill: '#94a3b8' }}
                                        axisLine={false} tickLine={false}
                                    />
                                    <YAxis
                                        tick={{ fontSize: 9, fontWeight: 700, fill: '#94a3b8' }}
                                        axisLine={false} tickLine={false}
                                        tickFormatter={v => `₹${v}`}
                                    />
                                    <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(99,102,241,0.05)', radius: 6 }} />
                                    <Bar dataKey="credit" fill="url(#creditGrad)" radius={[6, 6, 0, 0]} maxBarSize={22} />
                                    <Bar dataKey="debit" fill="url(#debitGrad)" radius={[6, 6, 0, 0]} maxBarSize={22} />
                                </BarChart>
                            </ResponsiveContainer>
                        </motion.div>

                        {/* Service-wise Analytics */}
                        <ServiceAnalyticsCards transactions={transactions} />

                        {/* Transaction History */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:border-[var(--brand-color)] transition-all"
                            style={{ backgroundColor: `rgba(var(--brand-color-rgb), 0.03)` }}
                        >
                            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-50">
                                <h2 className="text-base font-black text-slate-900">Transaction History</h2>
                                <button
                                    onClick={() => navigate('/distributor/transactions/distributor-receipt')}
                                    className="text-[10px] font-black text-indigo-500 hover:text-indigo-700 uppercase tracking-widest flex items-center gap-1"
                                >
                                    View All <ChevronRight size={12} />
                                </button>
                            </div>

                            {/* Table header */}
                            <div className="grid grid-cols-[2fr_1fr_1.2fr_auto] gap-4 px-6 py-2.5 bg-slate-50 border-b border-slate-100">
                                {['Name', 'Type', 'Date', 'Amount'].map(h => (
                                    <p key={h} className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{h}</p>
                                ))}
                            </div>

                            {transactions.length > 0 ? transactions.slice(0, 8).map((t, i) => (
                                <motion.div key={i}
                                    whileHover={{ backgroundColor: '#f8faff' }}
                                    className="grid grid-cols-[2fr_1fr_1.2fr_auto] gap-4 items-center px-6 py-3.5 border-b border-slate-50 last:border-0 transition-colors cursor-pointer"
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[9px] font-black shrink-0 shadow-sm bg-indigo-500">
                                            {t.service_type?.charAt(0) || 'T'}
                                        </div>
                                        <p className="text-xs font-black text-slate-800 truncate">{t.service_type}</p>
                                    </div>
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{t.status}</p>
                                    <p className="text-[10px] font-bold text-slate-400">{new Date(t.created_at).toLocaleDateString()}</p>
                                    <p className={`text-xs font-black text-right ${t.status === 'SUCCESS' ? 'text-emerald-600' : 'text-red-500'}`}>
                                        ₹{t.amount}
                                    </p>
                                </motion.div>
                            )) : (
                                <div className="py-10 text-center text-slate-300 text-[10px] font-black uppercase tracking-[0.25em]">No recent activity</div>
                            )}
                        </motion.div>
                    </div>

                    {/* ════════════ RIGHT COLUMN ════════════ */}
                    <div className="space-y-5">

                        {/* Managed Retailers */}
                        <motion.div
                            initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
                        >
                            <div className="flex items-center justify-between mb-5">
                                <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                                    <Activity size={18} className="text-emerald-500" />
                                    Live Retailers
                                </h2>
                                <button
                                    onClick={() => navigate('/distributor/retailers/details')}
                                    className="text-[10px] font-black text-indigo-500 hover:text-indigo-700 uppercase tracking-widest flex items-center gap-1"
                                >
                                    ALL <ChevronRight size={12} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                {retailers.length > 0 ? (
                                    retailers.slice(0, 4).map((r, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group">
                                            <div className="flex items-center gap-3">
                                                <div className="relative">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-100 to-indigo-50 border border-slate-100 flex items-center justify-center text-indigo-600 text-xs font-black shadow-sm">
                                                        {r.name?.charAt(0) || 'R'}
                                                    </div>
                                                    <span className="absolute -right-0.5 -bottom-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white shadow-sm" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black text-slate-800">{r.name || r.username}</p>
                                                    <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase tracking-tight pt-0.5">
                                                        <MapPin size={10} className="text-slate-300" /> {r.city || 'Location N/A'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="flex flex-col items-end gap-1">
                                                    <span className="text-[8px] font-black px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100 uppercase tracking-tighter italic">
                                                        Active Today
                                                    </span>
                                                    <p className="text-[8px] font-bold text-slate-300">Logged in 2m ago</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-10 text-center space-y-3">
                                        <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto border border-slate-100">
                                            <Users size={20} className="text-slate-300" />
                                        </div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">No retailers found under your ID</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        {/* Plan Status Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.18 }}
                            className="rounded-2xl p-5 shadow-lg text-black relative overflow-hidden"
                            style={{ background: 'var(--brand-color)' }}
                        >
                            <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/5 rounded-full" />
                            <div className="absolute -right-2 bottom-2 w-16 h-16 bg-white/5 rounded-full" />
                            <div className="relative z-10">
                                <p className="text-[9px] font-black uppercase tracking-widest text-white/50 mb-1">Active Plan</p>
                                <h3 className="text-lg font-black text-white uppercase tracking-tight">{planCfg.label}</h3>

                                {/* Retailer usage bar */}
                                <div className="mt-4">
                                    <div className="flex justify-between items-center mb-1.5">
                                        <p className="text-[9px] font-black text-white/60 uppercase tracking-wider">Retailer IDs Used</p>
                                        <p className="text-[10px] font-black text-white">
                                            {retailers.length} / {maxR === Infinity ? '∞' : maxR}
                                        </p>
                                    </div>
                                    <div className="bg-white/10 rounded-full h-1.5 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: maxR === Infinity ? '30%' : `${usagePct}%` }}
                                            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
                                            className="h-1.5 rounded-full bg-white/80"
                                        />
                                    </div>
                                    {maxR !== Infinity && remainingSlots <= 2 && remainingSlots > 0 && (
                                        <p className="text-[9px] font-black text-yellow-300 mt-1.5">⚠ Only {remainingSlots} slot{remainingSlots > 1 ? 's' : ''} left!</p>
                                    )}
                                    {maxR !== Infinity && remainingSlots === 0 && (
                                        <p className="text-[9px] font-black text-red-300 mt-1.5">✕ Retailer limit reached — Upgrade plan</p>
                                    )}
                                </div>

                                {/* Sub-distributor */}
                                {planCfg.features.subDistributors && (
                                    <div className="mt-3">
                                        <div className="flex justify-between items-center">
                                            <p className="text-[9px] font-black text-white/60 uppercase tracking-wider">Sub-Distributor IDs</p>
                                            <p className="text-[10px] font-black text-white">
                                                0 / {planCfg.maxSubDistributors === Infinity ? '∞' : planCfg.maxSubDistributors}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {planCfg.id !== 'premium' && (
                                    <button
                                        onClick={() => navigate('/distributor-plans')}
                                        className="mt-4 w-full bg-white/15 hover:bg-white/25 text-white text-[9px] font-black uppercase tracking-widest py-2 rounded-xl border border-white/20 transition-all"
                                    >
                                        ↑ Upgrade Plan
                                    </button>
                                )}
                            </div>
                        </motion.div>

                        {/* My Goals */}
                        <motion.div
                            initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-base font-black text-slate-900">My Goals</h2>
                                <button onClick={() => navigate('/distributor/plans')}
                                    className="bg-slate-900 hover:bg-slate-700 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5">
                                    <Plus size={11} /> Add
                                </button>
                            </div>

                            <div className="space-y-4">
                                {goals.map((g, i) => (
                                    <motion.div key={i}
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 + i * 0.08 }}
                                        className="flex items-center gap-3"
                                    >
                                        {/* Icon */}
                                        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${g.color}18` }}>
                                            <Target size={15} style={{ color: g.color }} />
                                        </div>

                                        {/* Progress */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-center mb-1.5">
                                                <p className="text-[11px] font-black text-slate-800 truncate">{g.label}</p>
                                                <p className="text-[10px] font-black ml-2 shrink-0" style={{ color: g.color }}>{g.pct}%</p>
                                            </div>
                                            <div className="bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${g.pct}%` }}
                                                    transition={{ delay: 0.4 + i * 0.1, duration: 0.9, ease: 'easeOut' }}
                                                    className="h-1.5 rounded-full"
                                                    style={{ background: g.color }}
                                                />
                                            </div>
                                            <p className="text-[9px] font-bold text-slate-400 mt-1">{g.sub}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Mini action buttons */}
                        <motion.div
                            initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="grid grid-cols-3 gap-3"
                        >
                            {[
                                { label: 'Add Money', icon: Plus, path: '/distributor/transactions/add-money', color: '#6366f1' },
                                { label: 'Reports', icon: TrendingUp, path: '/distributor/reports/commission', color: '#10b981' },
                                { label: 'Retailers', icon: Users, path: '/distributor/retailers/details', color: '#f59e0b' },
                            ].map((a, i) => (
                                <motion.button key={i} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate(a.path)}
                                    className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col items-center gap-2.5 hover:shadow-md transition-all group">
                                    <div className="w-9 h-9 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform" style={{ background: 'var(--brand-color)', opacity: 0.2 }}>
                                        <a.icon size={16} className="text-black" />
                                    </div>
                                    <span className="text-[9px] font-black text-slate-600 uppercase tracking-tight text-center">{a.label}</span>
                                </motion.button>
                            ))}
                        </motion.div>

                    </div>
                    {/* ════════════ END RIGHT COLUMN ════════════ */}
                </div>
            </div>
        </div>
    );
};

export default DistributorDashboard;
