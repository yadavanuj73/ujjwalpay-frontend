import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MessageSquare, Globe, ChevronRight, ChevronLeft,
    Building2, Users, ArrowRight, Shield
} from 'lucide-react';
import retailerImg from '../assets/indvidual.png';
import connectingBharatImg from '../assets/retailor.png';
import distributorImg from '../assets/rular and urban.png';
const logo = '/ujjwawal pay logo.jpeg';
const TRANSLATIONS = {
    en: {
        login: "LOGIN",
        register: "REGISTER NOW",
        username: "Mobile / Username",
        password: "Password",
        forgot: "Forgot?",
        dist_id: "Distributor ID",
        req_id: "Request ID",
        pass_reset: "Password Reset",
        first_name: "First Name",
        last_name: "Last Name",
        email: "Email Address",
        mobile: "Mobile Number",
        create_acc: "CREATE ACCOUNT",
        portal_access: "Access Portal",
        select_acc: "Select your account type",
        retailer: "Retailer",
        distributor: "Distributor",
        superadmin: "Super Distributor",
        master_id: "Master Identity",
        key: "Key",
        auth: "AUTHORIZE MASTER",
        dont_have: "Don't have an account?",
        already_reg: "Already registered?",
        create_here: "Create Account",
        login_now: "Login Now",
        sec_notice: "Security Notice",
        sec_desc: "Please ensure you are on ujjwalpay.com. Never share your OTP with anyone.",
        auth_portal: "Authorized Portal",
        support: "Support",
        website: "Website",
        digital_banking: "Digital Banking Hub",
        partner_network: "Partner Network",
        sys_controller: "System Controller"
    },
    hi: {
        login: "लॉगिन करें",
        register: "अभी रजिस्टर करें",
        username: "मोबाइल / उपयोगकर्ता नाम",
        password: "पासवर्ड",
        forgot: "भूल गए?",
        dist_id: "वितरक आईडी",
        req_id: "आईडी का अनुरोध करें",
        pass_reset: "पासवर्ड रीसेट",
        first_name: "प्रथम नाम",
        last_name: "अंतिम नाम",
        email: "ईमेल पता",
        mobile: "मोबाइल नंबर",
        create_acc: "खाता बनाएं",
        portal_access: "पोर्टल तक पहुंचें",
        select_acc: "अपना खाता प्रकार चुनें",
        retailer: "रिटेलर",
        distributor: "वितरक",
        superadmin: "सुपर वितरक",
        master_id: "मास्टर पहचान",
        key: "कुंजी",
        auth: "मास्टर अधिकृत करें",
        dont_have: "क्या आपके पास खाता नहीं है?",
        already_reg: "पहले से पंजीकृत हैं?",
        create_here: "खाता बनाएं",
        login_now: "अभी लॉगिन करें",
        sec_notice: "सुरक्षा सूचना",
        sec_desc: "कृपया सुनिश्चित करें कि आप ujjwalpay.com पर हैं। कभी भी अपना OTP किसी के साथ साझा न करें।",
        auth_portal: "अधिकृत पोर्टल",
        support: "सहायता",
        website: "वेबसाइट",
        digital_banking: "डिजिटल बैंकिंग हब",
        partner_network: "पार्टनर नेटवर्क",
        sys_controller: "सिस्टम नियंत्रक"
    },
    gu: {
        login: "લૉગિન કરો",
        register: "હમણાં નોંધણી કરો",
        username: "મોબાઇલ / વપરાશકર્તા નામ",
        password: "પાસવર્ડ",
        forgot: "ભૂલી ગયા છો?",
        dist_id: "વિતરક ID",
        req_id: "ID ની વિનંતી કરો",
        pass_reset: "પાસવર્ડ રીસેટ",
        first_name: "પ્રથમ નામ",
        last_name: "છેલ્લું નામ",
        email: "ઇમેઇલ સરનામું",
        mobile: "મોબાઇલ નંબર",
        create_acc: "એકાઉન્ટ બનાવો",
        portal_access: "પોર્ટલ ઍક્સેસ કરો",
        select_acc: "તમારો એકાઉન્ટ પ્રકાર પસંદ કરો",
        retailer: "રિટેલર",
        distributor: "વિતરક",
        superadmin: "સુપર વિતરક",
        master_id: "માસ્ટર ઓળખ",
        key: "કી",
        auth: "માસ્ટર અધિકૃત કરો",
        dont_have: "શું તમારી પાસે એકાઉન્ટ નથી?",
        already_reg: "પહેલેથી જ નોંધાયેલ છે?",
        create_here: "એકાઉન્ટ બનાવો",
        login_now: "હવે લોગિન કરો",
        sec_notice: "સુરક્ષા સૂચના",
        sec_desc: "કૃપા કરીને ખાતરી કરો કે તમે ujjwalpay.com પર છો. તમારો OTP કોઈની સાથે શેર કરશો નહીં.",
        auth_portal: "અધિકૃત પોર્ટલ",
        support: "આધાર",
        website: "વેબસાઇટ",
        digital_banking: "ડિજિટલ બેંકિંગ હબ",
        partner_network: "પાર્ટનર નેટવર્ક",
        sys_controller: "સિસ્ટમ કંટ્રોલર"
    }
};

const RetailerLogin = ({ t, setView }) => {
    return (
        <div className="flex flex-col gap-5">
            <input type="text" placeholder={t.username} className="w-full p-5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-black text-base placeholder-slate-400 shadow-inner" />
            <input type="password" placeholder={t.password} className="w-full p-5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-black text-base placeholder-slate-400 shadow-inner" />
            <button 
                onClick={() => window.location.href = '/retailer-dashboard'} 
                className="w-full py-5 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200 uppercase tracking-widest text-sm"
            >
                {t.login}
            </button>
            <div className="flex justify-between text-[11px] font-black text-slate-400 uppercase tracking-widest mt-1 px-1">
                <span className="cursor-pointer hover:text-blue-600" onClick={() => setView('register')}>{t.register}</span>
                <span className="cursor-pointer hover:text-blue-600">{t.forgot}</span>
            </div>
        </div>
    );
};

const DistributorLogin = ({ t, setView }) => {
    return (
        <div className="flex flex-col gap-5">
            <input type="text" placeholder={t.dist_id} className="w-full p-5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-500 outline-none font-black text-base placeholder-slate-400 shadow-inner" />
            <input type="password" placeholder={t.password} className="w-full p-5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-500 outline-none font-black text-base placeholder-slate-400 shadow-inner" />
            <button 
                onClick={() => window.location.href = '/distributor-dashboard'}
                className="w-full py-5 bg-slate-800 text-white font-black rounded-xl hover:bg-slate-900 transition-all shadow-lg hover:shadow-slate-200 uppercase tracking-widest text-sm"
            >
                {t.login}
            </button>
            <div className="flex justify-between text-[11px] font-black text-slate-400 uppercase tracking-widest mt-1 px-1">
                <span className="cursor-pointer hover:text-slate-600" onClick={() => setView('register')}>{t.req_id}</span>
                <span className="cursor-pointer hover:text-slate-600">{t.pass_reset}</span>
            </div>
        </div>
    );
};

const SuperAdminLogin = ({ t }) => {
    return (
        <div className="flex flex-col gap-5">
            <input type="text" placeholder={t.master_id} className="w-full p-5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none font-black text-base placeholder-slate-400 shadow-inner" />
            <input type="password" placeholder={t.key} className="w-full p-5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none font-black text-base placeholder-slate-400 shadow-inner" />
            <button 
                onClick={() => window.location.href = '/super-distributor-dashboard'}
                className="w-full py-5 bg-[#10b981] text-white font-black rounded-xl hover:bg-[#059669] transition-all shadow-lg hover:shadow-emerald-200 uppercase tracking-widest text-sm"
            >
                {t.auth}
            </button>
        </div>
    );
};

const RegisterForm = ({ t }) => (
    <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder={t.first_name} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-sm" />
            <input type="text" placeholder={t.last_name} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-sm" />
        </div>
        <input type="text" placeholder={t.email} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-sm" />
        <input type="text" placeholder={t.mobile} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-sm" />
        <button className="w-full py-4 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 uppercase tracking-widest text-xs mt-2">{t.create_acc}</button>
    </div>
);

const PortalPosterSlider = () => {
    const posters = [
        { id: 1, image: retailerImg, title: "Supercharge your Retail Business", desc: "Activate AEPS, BBPS and Recharge services easily." },
        { id: 2, image: connectingBharatImg, title: "Connecting Bharat", desc: "Deliver essential banking services remotely." },
        { id: 3, image: distributorImg, title: "Grow as a Distributor", desc: "Build your reliable network with 0 setup cost." }
    ];
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % posters.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [posters.length]);

    const next = () => setCurrent((prev) => (prev + 1) % posters.length);
    const prev = () => setCurrent((prev) => (prev - 1 + posters.length) % posters.length);

    return (
        <div className="w-full h-full min-h-[220px] rounded-[2rem] relative overflow-hidden group shadow-[0_20px_50px_-10px_rgba(0,0,0,0.25)] z-10 border-[3px] border-white/30">
            {/* Carousel Images */}
            <AnimatePresence initial={false}>
                <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    <img 
                        src={posters[current].image} 
                        alt={posters[current].title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                        <h4 className="text-white font-black text-xl md:text-2xl drop-shadow-md tracking-tight">{posters[current].title}</h4>
                        <p className="text-slate-200 text-xs md:text-sm font-bold drop-shadow-md mt-1">{posters[current].desc}</p>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Controls Navigation */}
            <div className="absolute inset-x-0 inset-y-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button onClick={prev} className="p-2 bg-white/10 backdrop-blur-md hover:bg-white rounded-full text-white hover:text-slate-800 transition-all shadow-xl border border-white/20 hover:scale-110">
                    <ChevronLeft size={24} />
                </button>
                <button onClick={next} className="p-2 bg-white/10 backdrop-blur-md hover:bg-white rounded-full text-white hover:text-slate-800 transition-all shadow-xl border border-white/20 hover:scale-110">
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* Dots */}
            <div className="absolute bottom-4 right-5 flex gap-2 z-10">
                {posters.map((_, idx) => (
                    <div 
                        key={idx} 
                        onClick={() => setCurrent(idx)}
                        className={`cursor-pointer transition-all duration-300 rounded-full h-2 shadow-sm ${current === idx ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'}`}
                    />
                ))}
            </div>
        </div>
    );
};

const PortalPage = () => {
    const navigate = useNavigate();
    const [portal, setPortal] = useState('retailer');
    const [view, setView] = useState('login'); // 'login' or 'register'
    const [lang, setLang] = useState('en');
    
    const t = TRANSLATIONS[lang];

    const PORTALS = [
        { 
            id: 'retailer', 
            label: t.retailer, 
            icon: Users, 
            color: '#2563eb', 
            light: '#eff6ff',
            grad: 'linear-gradient(135deg, #1e40af, #1e3a8a, #0f172a)',
            comp: RetailerLogin,
            desc: t.digital_banking
        },
        { 
            id: 'distributor', 
            label: t.distributor, 
            icon: Building2, 
            color: '#1e293b', 
            light: '#ffffff',
            grad: 'linear-gradient(135deg, #ffffff, #f1f5f9, #cbd5e1)',
            comp: DistributorLogin,
            desc: t.partner_network
        },
        { 
            id: 'superadmin', 
            label: t.superadmin, 
            icon: Shield, 
            color: '#eab308', 
            light: '#fefce8',
            grad: 'linear-gradient(135deg, #fbbf24, #d97706, #78350f)',
            comp: SuperAdminLogin,
            desc: t.sys_controller
        }
    ];

    const active = PORTALS.find(p => p.id === portal);

    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans overflow-hidden">
            {/* Minimal Header */}
            <header className="bg-white px-8 py-3 flex items-center justify-between border-b border-slate-100 z-50">
                <div className="cursor-pointer flex items-center" onClick={() => navigate('/')}>
                    <img src={logo} alt="UJJWAL PAY" style={{ height: '65px', objectFit: 'contain' }} />
                </div>
                <div className="flex items-center gap-6">
                    <div className="relative group/lang flex items-center hidden sm:flex">
                        <select value={lang} onChange={(e) => setLang(e.target.value)} className="appearance-none bg-slate-50 flex items-center gap-2 pl-7 pr-3 py-1.5 rounded-md border border-slate-200 text-[10px] font-black text-slate-600 uppercase tracking-widest hover:border-slate-300 transition-colors cursor-pointer outline-none shadow-sm focus:ring-2 focus:ring-blue-100">
                            <option value="en">English</option>
                            <option value="hi">हिंदी (Hindi)</option>
                            <option value="gu">ગુજરાતી (Gujarati)</option>
                        </select>
                        <Globe size={13} className="absolute left-2.5 text-slate-400 pointer-events-none" />
                    </div>
                    <div className="flex gap-4">
                        <button onClick={() => navigate('/')} className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-800 transition-colors">{t.website}</button>
                        <button className="text-xs font-black uppercase tracking-widest text-blue-600">{t.support}</button>
                    </div>
                </div>
            </header>

            <main className="flex-1 flex overflow-hidden">
                {/* Left Side: Three Thin Boxes Selector */}
                <div className="w-[320px] lg:w-[400px] h-full bg-white border-r border-slate-100 p-8 flex flex-col gap-4 overflow-y-auto">
                    <div className="mb-6">
                        <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">{t.portal_access}</h2>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{t.select_acc}</p>
                    </div>

                    <div className="space-y-4">
                        {PORTALS.map((p) => (
                            <motion.div
                                key={p.id}
                                onClick={() => { setPortal(p.id); setView('login'); }}
                                whileHover={{ x: 5 }}
                                whileTap={{ scale: 0.98 }}
                                className={`relative group cursor-pointer p-6 rounded-[2rem] border transition-all duration-300 ${
                                    portal === p.id 
                                        ? 'bg-white shadow-[0_15px_40px_-5px_rgba(0,0,0,0.08)] border-slate-200' 
                                        : 'bg-slate-50 border-transparent hover:bg-white hover:border-slate-100'
                                }`}
                            >
                                <div className="flex items-center gap-5 relative z-10">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                                        portal === p.id ? 'scale-110 shadow-lg' : 'opacity-40 group-hover:opacity-100'
                                    }`} style={{ backgroundColor: portal === p.id ? p.color : 'transparent' }}>
                                        <p.icon size={28} className={portal === p.id ? 'text-white' : 'text-slate-400'} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`text-base font-black transition-colors ${portal === p.id ? 'text-slate-900' : 'text-slate-400'}`}>
                                            {p.label}
                                        </h3>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{p.desc}</p>
                                    </div>
                                    {portal === p.id && (
                                        <motion.div layoutId="arrow" className="text-blue-600">
                                            <ArrowRight size={20} />
                                        </motion.div>
                                    )}
                                </div>
                                {portal === p.id && (
                                    <motion.div 
                                        layoutId="indicator" 
                                        className="absolute left-[-32px] top-1/2 -translate-y-1/2 w-2 h-12 bg-blue-600 rounded-r-full"
                                    />
                                )}
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-auto pt-8">
                        <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">{t.sec_notice}</h4>
                            <p className="text-[10px] font-bold text-slate-500 leading-relaxed uppercase tracking-wider">{t.sec_desc}</p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Clean Split Layout */}
                <div className="flex-1 relative flex overflow-hidden">

                    {/* Visual Panel — logo + slider */}
                    <AnimatePresence>
                        <motion.div
                            key={portal + "_visual"}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6 }}
                            className="hidden lg:flex w-[48%] flex-col p-10 relative overflow-hidden h-full"
                            style={{ background: active.grad }}
                        >
                            {/* Decorative glow overlay */}
                            <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 80% 10%, #fff, transparent 60%)' }} />

                            <div className="relative z-10 flex flex-col h-full w-full items-center justify-between">
                                {/* Logo centered */}
                                <div className="flex-1 flex flex-col items-center justify-center gap-6">
                                    <motion.img
                                        key={portal + "_logo"}
                                        initial={{ opacity: 0, scale: 0.88, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        transition={{ duration: 0.6, ease: 'easeOut' }}
                                        src={logo}
                                        alt="Ujjwal Pay"
                                        className="w-[220px] h-auto drop-shadow-2xl"
                                    />
                                    <div className="text-center">
                                        <p className="text-white font-black text-xl tracking-wide drop-shadow">Ujjwal Pay</p>
                                        <p className="text-white/60 text-[11px] font-semibold tracking-[3px] uppercase mt-1">Har Transaction Mein Vishwas</p>
                                    </div>
                                </div>

                                {/* Trust badges at bottom */}
                                <div className="flex gap-2 flex-wrap justify-center pb-2">
                                    {['RBI Compliant', 'NPCI Partner', 'ISO Certified'].map(b => (
                                        <span key={b} className="px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest" style={{ background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.2)' }}>{b}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Form Panel */}
                    <div className="flex-1 bg-white flex items-center justify-center p-8 md:p-12 overflow-y-auto">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={portal + "_form"}
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -24 }}
                                transition={{ type: 'spring', damping: 28, stiffness: 200 }}
                                className="w-full max-w-[400px] space-y-7"
                            >
                                {/* Form Header */}
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow" style={{ backgroundColor: active.color }}>
                                            <active.icon size={20} className="text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-slate-900 tracking-tight leading-tight">
                                                {active.label} {view === 'login' ? 'Login' : 'Registration'}
                                            </h3>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{t.auth_portal}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Form Fields */}
                                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 shadow-inner">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={view}
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -12 }}
                                            transition={{ duration: 0.25 }}
                                        >
                                            {view === 'login' ? <active.comp t={t} setView={setView} /> : <RegisterForm t={t} />}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                {/* Toggle Login / Register */}
                                <div className="text-center">
                                    {view === 'login' ? (
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                            {t.dont_have}
                                            <span onClick={() => setView('register')} className="ml-2 text-blue-600 cursor-pointer hover:underline decoration-2 underline-offset-4 font-black">{t.create_here}</span>
                                        </p>
                                    ) : (
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                            {t.already_reg}
                                            <span onClick={() => setView('login')} className="ml-2 text-blue-600 cursor-pointer hover:underline decoration-2 underline-offset-4 font-black">{t.login_now}</span>
                                        </p>
                                    )}
                                </div>

                                {/* Footer links */}
                                <div className="flex items-center gap-4 pt-1">
                                    <div className="flex-1 h-px bg-slate-100" />
                                    <div className="flex gap-3">
                                        <div className="relative flex items-center sm:hidden">
                                            <select value={lang} onChange={(e) => setLang(e.target.value)} className="appearance-none bg-transparent pl-6 pr-3 py-1.5 rounded-full border border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer outline-none">
                                                <option value="en">EN</option>
                                                <option value="hi">HI</option>
                                                <option value="gu">GU</option>
                                            </select>
                                            <Globe size={11} className="absolute left-2 text-slate-400 pointer-events-none" />
                                        </div>
                                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-widest hover:border-slate-300 transition-colors cursor-pointer">
                                            <MessageSquare size={11} /> FAQ
                                        </div>
                                    </div>
                                    <div className="flex-1 h-px bg-slate-100" />
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PortalPage;
