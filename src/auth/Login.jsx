import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Building2, Shield, ArrowRight, Users, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import RetailerLogin from '../retailer/components/RetailerLogin';
import DistributorLogin from '../distributor/components/DistributorLogin';
import SuperAdminLogin from '../superadmin/components/SuperAdminLogin';
import poster1 from '../assets/indvidual.png';
import poster2 from '../assets/retailor.png';
import poster3 from '../assets/rular and urban.png';

const brandLogo = '/ujjwawal pay logo.jpeg';

/** Full brand lockup — same asset as marketing nav / portal header. */
function PortalBrandMark() {
    return (
        <div className="relative z-10 flex flex-col items-center justify-center px-2 text-center gap-4">
            <img
                src={brandLogo}
                alt="Ujjwal Pay"
                className="w-[220px] h-auto object-contain drop-shadow-2xl"
                decoding="async"
            />
        </div>
    );
}

const POSTERS = [
    {
        image: poster1,
        title: 'Supercharge your Retail Business',
        desc: 'Activate AEPS, BBPS and Recharge services easily.',
    },
    {
        image: poster2,
        title: 'Connecting Bharat',
        desc: 'Deliver essential banking services remotely.',
    },
    {
        image: poster3,
        title: 'Grow as a Distributor',
        desc: 'Build your reliable network with 0 setup cost.',
    },
];

const PORTAL_META = {
    retailer: {
        title: 'Retailer Login',
        color: '#2563eb',
        grad: 'linear-gradient(135deg, #1e40af, #1e3a8a, #0f172a)',
    },
    distributor: {
        title: 'Distributor Login',
        color: '#0f172a',
        grad: 'linear-gradient(135deg, #0f172a, #1e293b, #334155)',
    },
    superadmin: {
        title: 'Super Distributor Login',
        color: '#eab308',
        grad: 'linear-gradient(135deg, #fbbf24, #d97706, #78350f)',
    },
};

function PortalPosterSlider() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((p) => (p + 1) % POSTERS.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative z-10 mb-6 h-[200px] w-full flex-shrink-0 overflow-hidden rounded-[2rem] border-[3px] border-white/60 shadow-[0_15px_40px_-5px_rgba(0,0,0,0.13)] md:h-[240px]">
            <AnimatePresence initial={false}>
                <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    className="absolute inset-0"
                >
                    <img src={POSTERS[current].image} alt="" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
                        <h4 className="text-xl font-black tracking-tight text-white drop-shadow-md md:text-2xl">
                            {POSTERS[current].title}
                        </h4>
                        <p className="mt-1 text-xs font-bold text-slate-200 drop-shadow-md md:text-sm">
                            {POSTERS[current].desc}
                        </p>
                    </div>
                </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-4 right-5 z-10 flex gap-2">
                {POSTERS.map((_, idx) => (
                    <button
                        key={idx}
                        type="button"
                        aria-label={`Slide ${idx + 1}`}
                        onClick={() => setCurrent(idx)}
                        className={`h-2 rounded-full shadow-sm transition-all duration-300 ${
                            current === idx ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}

function PortalPosterSliderFull() {
    const [current, setCurrent] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setCurrent(p => (p + 1) % POSTERS.length), 5000);
        return () => clearInterval(t);
    }, []);
    return (
        <div className="relative h-full w-full overflow-hidden">
            <AnimatePresence initial={false}>
                <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.7, ease: 'easeInOut' }}
                    className="absolute inset-0"
                >
                    <img src={POSTERS[current].image} alt="" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/30 to-slate-900/10" />
                </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-0 left-0 w-full p-8 z-10">
                <h4 className="text-2xl font-black tracking-tight text-white drop-shadow-lg leading-tight">
                    {POSTERS[current].title}
                </h4>
                <p className="mt-2 text-sm font-semibold text-slate-200 drop-shadow">
                    {POSTERS[current].desc}
                </p>
                <div className="mt-5 flex gap-2">
                    {POSTERS.map((_, idx) => (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => setCurrent(idx)}
                            className={`h-2 rounded-full transition-all duration-300 ${current === idx ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function Login() {
    const navigate = useNavigate();
    const { language, setLanguage } = useLanguage();
    const [portal, setPortal] = useState('retailer');


    const meta = PORTAL_META[portal];

    return (
        <div className="flex min-h-screen flex-col overflow-hidden bg-white font-[Inter,system-ui,sans-serif]">
            <header className="z-50 flex items-center justify-between border-b border-slate-100 bg-white px-4 py-3 md:px-8">
                <button
                    type="button"
                    onClick={() => navigate('/')}
                    className="flex min-w-0 cursor-pointer items-center gap-3 text-left"
                >
                    <div className="shrink-0 flex items-center">
                        <img
                            src={brandLogo}
                            alt=""
                            style={{ height: '48px', width: 'auto', maxWidth: '120px', objectFit: 'contain' }}
                            decoding="async"
                        />
                    </div>
                    <span className="hidden min-w-0 flex-col sm:flex">
                        <span className="text-sm font-black leading-tight text-slate-800">Ujjwal Pay</span>
                        <span className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                            Fintech Pvt Ltd
                        </span>
                        <span className="mt-0.5 text-[9px] font-semibold leading-snug text-slate-600">
                            Har Transaction Mein Vishwas
                        </span>
                    </span>
                </button>
                <div className="flex items-center gap-4 md:gap-6">
                    <div className="relative hidden sm:flex items-center">
                        <Globe size={13} className="absolute left-2 text-slate-400 pointer-events-none z-10" />
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="appearance-none bg-slate-50 pl-6 pr-7 py-1.5 rounded-md border border-slate-200 text-[10px] font-black text-slate-600 uppercase tracking-widest hover:border-slate-300 transition-colors cursor-pointer outline-none shadow-sm focus:ring-2 focus:ring-blue-100"
                        >
                            <option value="en">English</option>
                            <option value="hi">हिंदी (Hindi)</option>
                            <option value="gu">ગુજરાતી (Gujarati)</option>
                        </select>
                        <ChevronDown size={11} className="absolute right-2 text-slate-400 pointer-events-none" />
                    </div>
                    <div className="flex gap-3 md:gap-4">
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="text-[10px] font-black uppercase tracking-widest text-slate-400 transition-colors hover:text-slate-800"
                        >
                            Website
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/contact')}
                            className="text-[10px] font-black uppercase tracking-widest text-blue-600"
                        >
                            Support
                        </button>
                    </div>
                </div>
            </header>

            {/* 3-column layout: sidebar | poster+form card */}
            <main className="flex min-h-0 flex-1 overflow-hidden bg-slate-50">

                {/* COL 1 — Portal selector sidebar */}
                <div className="flex h-full w-[240px] flex-none flex-col overflow-y-auto border-r border-slate-200 bg-white lg:w-[270px]">
                    <div className="p-6">
                        <h2 className="text-lg font-black uppercase tracking-tight text-slate-800">Access Portal</h2>
                        <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">Select your account type</p>
                    </div>

                    <div className="space-y-3 px-4 pb-4">
                        {[
                            { id: 'retailer', label: 'Retailer', desc: 'Digital Banking Hub', Icon: Users },
                            { id: 'distributor', label: 'Distributor', desc: 'Partner Network', Icon: Building2 },
                            { id: 'superadmin', label: 'Super Distributor', desc: 'System Controller', Icon: Shield },
                        ].map((p) => {
                            const on = portal === p.id;
                            const PIcon = p.Icon;
                            return (
                                <motion.button
                                    key={p.id}
                                    type="button"
                                    onClick={() => setPortal(p.id)}
                                    whileHover={{ x: 4 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`relative w-full cursor-pointer rounded-2xl border p-5 text-left transition-all duration-300 ${
                                        on
                                            ? 'border-slate-200 bg-white shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)]'
                                            : 'border-transparent bg-slate-50 hover:bg-white hover:border-slate-100'
                                    }`}
                                >
                                    {on && (
                                        <motion.div
                                            layoutId="portal-indicator"
                                            className="absolute left-[-16px] top-1/2 h-10 w-1.5 -translate-y-1/2 rounded-r-full bg-blue-600"
                                        />
                                    )}
                                    <div className="flex items-center gap-4">
                                        <div
                                            className={`flex h-12 w-12 flex-none items-center justify-center rounded-xl transition-all duration-300 ${on ? 'shadow-lg' : 'opacity-35'}`}
                                            style={{ backgroundColor: on ? PORTAL_META[p.id].color : '#f1f5f9' }}
                                        >
                                            <PIcon size={22} className={on ? 'text-white' : 'text-slate-400'} />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h3 className={`text-sm font-black transition-colors ${on ? 'text-slate-900' : 'text-slate-400'}`}>{p.label}</h3>
                                            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">{p.desc}</p>
                                        </div>
                                        {on && (
                                            <motion.div layoutId="portal-arrow" className="text-blue-600 flex-none">
                                                <ArrowRight size={18} />
                                            </motion.div>
                                        )}
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>

                    <div className="mt-auto p-4">
                        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                            <h4 className="mb-2 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Security Notice</h4>
                            <p className="text-[9px] font-bold uppercase leading-relaxed tracking-wide text-slate-500">
                                Please ensure you are on ujjwalpay.com. Never share your OTP with anyone.
                            </p>
                        </div>
                    </div>
                </div>

                {/* COL 2+3 — padded area with rounded card */}
                <div className="relative flex min-h-0 flex-1 items-center justify-center bg-slate-50 p-4">
                    <motion.div key={portal} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pointer-events-none absolute inset-0">
                        <div className="absolute inset-0 opacity-10 blur-[100px]" style={{ background: `radial-gradient(circle at 50% 50%, ${meta.color}, transparent 70%)` }} />
                    </motion.div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={portal}
                            initial={{ opacity: 0, y: 16, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.98 }}
                            transition={{ type: 'spring', damping: 28, stiffness: 210 }}
                            className="relative z-10 flex w-full overflow-hidden rounded-2xl border border-slate-200 shadow-[0_8px_40px_-8px_rgba(0,0,0,0.14)]"
                            style={{ maxWidth: '860px', height: 'calc(100vh - 130px)', minHeight: '480px' }}
                        >
                            {/* LEFT — Poster slider full height inside card */}
                            <div className="relative hidden w-[42%] flex-none overflow-hidden lg:block">
                                <PortalPosterSliderFull />
                            </div>

                            {/* RIGHT — Form */}
                            <div className="flex flex-1 flex-col justify-start overflow-y-auto bg-white p-6 pt-8 md:p-8 md:pt-10 lg:p-10 lg:pt-12">
                                <div className="mx-auto w-full max-w-[380px] space-y-4">
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-black tracking-tight text-slate-900">{meta.title}</h3>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Authorized Portal</p>
                                    </div>
                                    <div>
                                        {portal === 'retailer' && <RetailerLogin />}
                                        {portal === 'distributor' && <DistributorLogin />}
                                        {portal === 'superadmin' && <SuperAdminLogin />}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

            </main>
        </div>
    );
}
