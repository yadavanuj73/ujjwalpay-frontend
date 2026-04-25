import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Building2, Shield, ArrowRight, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import RetailerLogin from '../retailer/components/RetailerLogin';
import DistributorLogin from '../distributor/components/DistributorLogin';
import SuperAdminLogin from '../superadmin/components/SuperAdminLogin';
import brandLogo from '../assets/UjjwalPay_brand_logo.png';

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
        image:
            'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1400',
        title: 'Supercharge your Retail Business',
        desc: 'Activate AEPS, BBPS and Recharge services easily.',
    },
    {
        image:
            'https://images.unsplash.com/photo-1590650153855-d9e808231d41?auto=format&fit=crop&q=80&w=1400',
        title: 'Connecting Bharat',
        desc: 'Deliver essential banking services remotely.',
    },
    {
        image:
            'https://images.unsplash.com/photo-1486406146926-c627a92ad4ab?auto=format&fit=crop&q=80&w=1400',
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
        color: '#1e293b',
        grad: 'linear-gradient(135deg, #ffffff, #f1f5f9, #cbd5e1)',
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
        <div className="relative z-10 mb-6 h-[160px] w-full max-w-[850px] flex-shrink-0 overflow-hidden rounded-[2rem] border-[4px] border-white/50 shadow-[0_15px_40px_-5px_rgba(0,0,0,0.1)] md:h-[200px]">
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

export default function Login() {
    const navigate = useNavigate();
    const { language, setLanguage } = useLanguage();
    const [portal, setPortal] = useState('retailer');
    const [langOpen, setLangOpen] = useState(false);

    const meta = PORTAL_META[portal];

    return (
        <div className="flex min-h-screen flex-col overflow-hidden bg-[#f8fafc] font-[Inter,system-ui,sans-serif]">
            <header className="z-50 flex items-center justify-between border-b border-slate-100 bg-white px-4 py-3 md:px-8">
                <button
                    type="button"
                    onClick={() => navigate('/')}
                    className="flex min-w-0 cursor-pointer items-center gap-3 text-left"
                >
                    <div className="h-11 w-[72px] shrink-0 overflow-hidden rounded-xl md:h-12 md:w-[84px]">
                        <img
                            src={brandLogo}
                            alt=""
                            className="h-11 w-[220px] max-w-none object-cover object-left md:h-12 md:w-[260px]"
                            width={260}
                            height={48}
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
                    <div className="relative hidden sm:block">
                        <button
                            type="button"
                            onClick={() => setLangOpen((v) => !v)}
                            className="relative inline-flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 py-1.5 pl-7 pr-3 text-[10px] font-black uppercase tracking-widest text-slate-600 shadow-sm hover:border-slate-300"
                        >
                            <Globe className="pointer-events-none absolute left-2.5 top-1/2 w-3.5 -translate-y-1/2 text-slate-400" />
                            {language === 'hi' ? 'Hindi' : 'English'}
                        </button>
                        {langOpen && (
                            <>
                                <button
                                    type="button"
                                    aria-label="Close"
                                    className="fixed inset-0 z-10 cursor-default bg-transparent"
                                    onClick={() => setLangOpen(false)}
                                />
                                <div className="absolute right-0 top-full z-20 mt-2 w-36 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
                                    <button
                                        type="button"
                                        className="w-full px-3 py-2 text-left text-xs font-bold hover:bg-slate-50"
                                        onClick={() => {
                                            setLanguage('en');
                                            setLangOpen(false);
                                        }}
                                    >
                                        English
                                    </button>
                                    <button
                                        type="button"
                                        className="w-full px-3 py-2 text-left text-xs font-bold hover:bg-slate-50"
                                        onClick={() => {
                                            setLanguage('hi');
                                            setLangOpen(false);
                                        }}
                                    >
                                        Hindi
                                    </button>
                                </div>
                            </>
                        )}
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

            <main className="flex min-h-0 flex-1 overflow-hidden">
                <div className="flex h-full w-full min-w-0 flex-col overflow-y-auto border-slate-100 bg-white md:w-[320px] md:flex-none md:border-r lg:w-[400px]">
                    <div className="p-6 md:p-8">
                        <h2 className="text-xl font-black uppercase tracking-tight text-slate-800">Access Portal</h2>
                        <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            Select your account type
                        </p>
                    </div>

                    <div className="space-y-4 px-4 pb-6 md:px-6">
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
                                    whileHover={{ x: 5 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`relative w-full cursor-pointer rounded-[2rem] border p-6 text-left transition-all duration-300 ${
                                        on
                                            ? 'border-slate-200 bg-white shadow-[0_15px_40px_-5px_rgba(0,0,0,0.08)]'
                                            : 'border-transparent bg-slate-50 hover:border-slate-100 hover:bg-white'
                                    }`}
                                >
                                    {on && (
                                        <motion.div
                                            layoutId="portal-indicator"
                                            className="absolute left-[-12px] top-1/2 hidden h-12 w-2 -translate-y-1/2 rounded-r-full bg-blue-600 md:left-[-24px] md:block"
                                        />
                                    )}
                                    <div className="relative z-10 flex items-center gap-5">
                                        <div
                                            className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-500 ${
                                                on ? 'scale-110 shadow-lg' : 'opacity-40 group-hover:opacity-100'
                                            }`}
                                            style={{ backgroundColor: on ? PORTAL_META[p.id].color : 'transparent' }}
                                        >
                                            <PIcon size={28} className={on ? 'text-white' : 'text-slate-400'} />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h3
                                                className={`text-base font-black transition-colors ${
                                                    on ? 'text-slate-900' : 'text-slate-400'
                                                }`}
                                            >
                                                {p.label}
                                            </h3>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                                {p.desc}
                                            </p>
                                        </div>
                                        {on && (
                                            <motion.div layoutId="portal-arrow" className="text-blue-600">
                                                <ArrowRight size={20} />
                                            </motion.div>
                                        )}
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>

                    <div className="mt-auto p-6 pt-2 md:p-8">
                        <div className="rounded-[2rem] border border-slate-100 bg-slate-50 p-6">
                            <h4 className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                Security Notice
                            </h4>
                            <p className="text-[10px] font-bold uppercase leading-relaxed tracking-wider text-slate-500">
                                Please ensure you are on ujjwalpay.com. Never share your OTP with anyone.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right content: slider + login card */}
                <div className="relative flex min-h-0 flex-1 flex-col items-center overflow-y-auto bg-slate-50 p-4 md:p-8">
                    {/* Background glow */}
                    <motion.div
                        key={portal}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="pointer-events-none absolute inset-0"
                    >
                        <div className="absolute left-1/4 top-1/4 h-[400px] w-[400px] rounded-full opacity-10 blur-[100px]" style={{ backgroundColor: meta.color }} />
                        <div className="absolute bottom-1/4 right-1/4 h-[300px] w-[300px] rounded-full opacity-5 blur-[80px]" style={{ backgroundColor: meta.color }} />
                    </motion.div>

                    <div className="relative z-10 flex w-full max-w-[850px] flex-col items-center">
                        {/* Poster Slider */}
                        <PortalPosterSlider />

                        {/* Login card */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={portal}
                                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                                transition={{ type: 'spring', damping: 26, stiffness: 200 }}
                                className="flex w-full min-h-[400px] overflow-hidden rounded-[2rem] border border-white bg-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.12)] lg:flex-row"
                            >
                                {/* Logo side */}
                                <motion.div
                                    className="relative hidden w-[45%] flex-col items-center justify-center overflow-hidden p-8 lg:flex"
                                    style={{ background: meta.grad }}
                                >
                                    <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 100% 0%, #fff, transparent)' }} />
                                    <div className="relative z-10 flex flex-col items-center gap-5">
                                        <img
                                            src={brandLogo}
                                            alt="Ujjwal Pay"
                                            style={{
                                                width: '300px',
                                                height: 'auto',
                                                objectFit: 'contain',
                                                filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.25))'
                                            }}
                                        />
                                        <p className="text-[11px] font-black uppercase tracking-[4px] text-white/60">Authorized Partner Portal</p>
                                    </div>
                                </motion.div>

                                {/* Form side */}
                                <div className="flex flex-1 flex-col justify-center bg-white p-6 md:p-10 lg:p-14">
                                    <div className="mx-auto w-full max-w-[420px] space-y-6">
                                        <div className="space-y-1">
                                            <h3 className="text-2xl font-black tracking-tight text-slate-900">{meta.title}</h3>
                                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Authorized Portal</p>
                                        </div>
                                        <div className="rounded-[1.8rem] border border-slate-100 bg-slate-50 p-0.5 shadow-inner">
                                            <div className="min-h-[200px] rounded-[1.6rem] border border-slate-50 bg-white p-6 shadow-sm">
                                                {portal === 'retailer' && <RetailerLogin />}
                                                {portal === 'distributor' && <DistributorLogin />}
                                                {portal === 'superadmin' && <SuperAdminLogin />}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </main>
        </div>
    );
}
