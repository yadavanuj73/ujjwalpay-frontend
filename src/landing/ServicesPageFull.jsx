import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight,
  Zap, Star, CheckCircle2, PhoneCall
} from 'lucide-react';

const SERVICES = [
    {
        label: 'AEPS',
        subtitle: 'Aadhaar Enabled Payment System',
        desc: 'Perform banking transactions using your Aadhaar number and biometric authentication securely.',
        features: ['Cash Withdrawal', 'Cash Deposit', 'Balance Enquiry', 'Mini Statement', 'Aadhaar Pay'],
        grad: 'linear-gradient(135deg, #065f46 0%, #10b981 100%)',
        glow: 'rgba(16, 185, 129, 0.5)',
        tag: 'RBI Certified',
        img: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/Aadhaar_Logo.svg/1200px-Aadhaar_Logo.svg.png",
        id: "aeps"
    },
    {
        emoji: '🏦', 
        label: 'Banking Services',
        subtitle: 'Comprehensive Banking Solutions',
        desc: 'Provide account opening, cash deposits, and withdrawals as an authorized Banking Point.',
        features: ['Account Opening', 'Cash Deposits', 'Micro ATM', 'Fixed Deposits', 'Direct Benefits'],
        grad: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
        glow: 'rgba(59, 130, 246, 0.5)',
        tag: 'Pan India',
        id: "banking"
    },
    {
        emoji: '🤝', 
        label: 'Micro Loans',
        subtitle: '₹5,000 – ₹50,000 Quick Loans',
        desc: "Facilitate small ticket loans for your community with minimal documentation and fast approval.",
        features: ['Small Loans', 'Quick Approval', 'Low Interest', 'No Collateral', 'Flexible EMIs'],
        grad: 'linear-gradient(135deg, #164e63 0%, #0891b2 100%)',
        glow: 'rgba(8, 145, 178, 0.5)',
        tag: 'Instant Trust',
        id: "loans"
    },
    {
        emoji: '💳', 
        label: 'Neo Banking',
        subtitle: 'Modern Digital Banking',
        desc: 'Offer virtual debit cards and high-yield savings accounts through a sleek digital-first platform.',
        features: ['Virtual Cards', 'Instant Rewards', 'Goal Savings', 'Real-time Alerts', 'Global Access'],
        grad: 'linear-gradient(135deg, #1f2937 0%, #4b5563 100%)',
        glow: 'rgba(75, 85, 99, 0.5)',
        tag: 'Exclusive',
        id: "neobank"
    },
    {
        emoji: '🏠', 
        label: 'CSP Point',
        subtitle: 'Customer Service Point',
        desc: 'Turn your outlet into a mini-bank branch and provide essential govt. and banking help.',
        features: ['Agent Registration', 'Multiple Banking', 'Lead Generation', 'Local Support'],
        grad: 'linear-gradient(135deg, #713f12 0%, #ca8a04 100%)',
        glow: 'rgba(202, 138, 4, 0.5)',
        tag: 'Opportunity',
        id: "csp"
    },
    {
        emoji: '💼', 
        label: 'BC Agent',
        subtitle: 'Business Correspondent',
        desc: 'Act as a secure bridge between leading banks and underserved rural populations.',
        features: ['Authorized BC', 'Cash Management', 'Enrollment', 'Literacy Center'],
        grad: 'linear-gradient(135deg, #581c87 0%, #8b5cf6 100%)',
        glow: 'rgba(139, 92, 246, 0.5)',
        tag: 'Authorized',
        id: "bc"
    },
    {
        emoji: '💸', 
        label: 'Money Transfer',
        subtitle: 'Instant DMT / IMPS / UPI',
        desc: 'Enable your customers to send money to any bank account in India instantly and safely.',
        features: ['Instant IMPS', 'Lowest Fees', 'Secure OTP', '24/7 Transfers', 'Success Rate 99%'],
        grad: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
        glow: 'rgba(37, 99, 235, 0.5)',
        tag: 'Fastest',
        id: "dmt"
    },
    {
        emoji: '🧾', 
        label: 'Bill Payment',
        subtitle: 'BBPS National Network',
        desc: 'One-stop shop for Electricity, Water, Gas, Mobile and Broadband bill collections.',
        features: ['All Utility Bills', 'Instant Confirmation', 'BBPS Certified', 'Commission Based'],
        grad: 'linear-gradient(135deg, #7c2d12 0%, #ea580c 100%)',
        glow: 'rgba(234, 88, 12, 0.5)',
        tag: 'BBPS Ready',
        id: "bills"
    },
    {
        emoji: '📱', 
        label: 'Recharge',
        subtitle: 'All Mobile & DTH',
        desc: 'Support instant prepaid and postpaid recharges for all major telecom operators.',
        features: ['Mobile Recharge', 'DTH Plans', 'Data Packs', 'Best Commissions', 'Instant Credit'],
        grad: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)',
        glow: 'rgba(124, 58, 237, 0.5)',
        tag: 'Instant',
        id: "recharge"
    },
    {
        emoji: '✈️', 
        label: 'Travel',
        subtitle: 'Flights • Trains • Buses',
        desc: 'Expand your business into travel agency services with flight and train ticket bookings.',
        features: ['IRCTC Booking', 'Cheap Flights', 'Bus Tickets', 'Hotel Stays', 'Holiday Plans'],
        grad: 'linear-gradient(135deg, #0c4a6e 0%, #0ea5e9 100%)',
        glow: 'rgba(14, 165, 233, 0.5)',
        tag: 'IRCTC Agent',
        id: "travel"
    },
    {
        emoji: '💻', 
        label: 'Payment Gateway',
        subtitle: 'Secure Business Payments',
        desc: 'Accept payments legally and securely with our instant-settlement payment gateway.',
        features: ['UPI & Cards', 'Payment Links', 'Instant Settlement', 'Zero Setup Fee', 'Secure Processing'],
        grad: 'linear-gradient(135deg, #4c1d95 0%, #9333ea 100%)',
        glow: 'rgba(147, 51, 234, 0.5)',
        tag: 'Fast Checkout',
        id: "gateway"
    },
    {
        emoji: '📋', 
        label: 'Utility',
        subtitle: 'Govt Documents & PAN',
        desc: 'Assist in PAN card applications, Aadhaar updates, and other government legal services.',
        features: ['PAN Application', 'Voter ID Help', 'Legal Docs', 'Digital Certificate', 'Aadhaar Link'],
        grad: 'linear-gradient(135deg, #451a03 0%, #b45309 100%)',
        glow: 'rgba(180, 83, 9, 0.5)',
        tag: 'Govt Assist',
        id: "utility"
    }
];

const FlipCard = ({ item, i }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();
  
  return (
    <div 
      className="relative w-full h-[380px] cursor-pointer group"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      style={{ perspective: '1200px' }}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.7, type: 'spring', stiffness: 80, damping: 15 }}
        className="w-full h-full relative"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div 
          className="absolute inset-0 backface-hidden bg-white rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center shadow-2xl border border-gray-50 overflow-hidden"
        >
           <div 
             className="absolute -top-10 -right-10 w-40 h-40 blur-[50px] opacity-20 rounded-full"
             style={{ background: item.glow }}
           />
           
           <div className="relative mb-6">
             {item.img ? (
               <img src={item.img} alt={item.label} className="w-24 h-24 object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-110" />
             ) : (
               <div className="text-7xl drop-shadow-xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                 {item.emoji}
               </div>
             )}
             <div className="absolute -bottom-2 -right-2 bg-white px-3 py-1 rounded-full shadow-lg border border-gray-100 flex items-center gap-1">
               <Star size={12} className="text-yellow-500 fill-yellow-500" />
               <span className="text-[10px] font-black">{item.tag}</span>
             </div>
           </div>

           <h3 className="text-2xl font-black text-[#0a2357] mb-2">{item.label}</h3>
           <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0a2357]/50 mb-4">{item.subtitle}</p>
           
           <div className="h-1 w-12 bg-[#0a2357]/10 rounded-full mb-6" />
           
           <p className="text-sm text-gray-500 font-medium px-4 line-clamp-3">
             {item.desc}
           </p>

           <div className="absolute bottom-8 w-full flex justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
              <span className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-4 py-2 rounded-full">Explore Features <ArrowRight size={14} /></span>
           </div>
        </div>
        
        {/* Back */}
        <div 
          className="absolute inset-0 backface-hidden rounded-[2.5rem] p-8 flex flex-col rotate-y-180 overflow-hidden"
          style={{ background: item.grad }}
        >
           <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
           
           <div className="relative z-10 h-full flex flex-col">
             <div className="flex justify-between items-start mb-6 border-b border-white/20 pb-4">
                <h3 className="text-xl font-black text-white">{item.label}</h3>
                <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">{item.tag}</span>
             </div>

             <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 mb-6">
                <ul className="space-y-3">
                  {item.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-white text-sm font-semibold group/item">
                       <CheckCircle2 size={18} className="text-blue-300 group-hover/item:scale-110 transition-transform" />
                       <span className="opacity-90">{f}</span>
                    </li>
                  ))}
                </ul>
             </div>

             <button 
                onClick={() => navigate('/portal')}
                className="w-full bg-white text-[#0a2357] py-4 rounded-2xl font-black text-xs shadow-xl uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all"
             >
                Become a Partner
             </button>
           </div>
        </div>
      </motion.div>
    </div>
  );
};

const ThreeDImageCarousel = ({ slides, autoplay = true, delay = 4 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!autoplay) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, delay * 1000);
        return () => clearInterval(interval);
    }, [autoplay, delay, slides.length]);

    return (
        <div className="three-d-carousel py-12">
            <div className="three-d-track relative">
                <AnimatePresence>
                    {slides.map((slide, i) => {
                        let offset = i - currentIndex;
                        if (offset < -Math.floor(slides.length / 2)) offset += slides.length;
                        if (offset > Math.floor(slides.length / 2)) offset -= slides.length;

                        if (Math.abs(offset) > 2) return null;

                        return (
                            <motion.div
                                key={slide.id}
                                className="three-d-slide"
                                initial={false}
                                animate={{
                                    x: offset * 220, 
                                    scale: 1 - Math.abs(offset) * 0.2,
                                    opacity: 1 - Math.abs(offset) * 0.5,
                                    rotateY: offset * -25,
                                    zIndex: 10 - Math.abs(offset)
                                }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <div 
                                  className="w-[280px] h-[340px] rounded-[2.5rem] shadow-2xl border-4 border-white flex flex-col items-center justify-center p-6 text-center transform-gpu"
                                  style={{ background: slide.bg }}
                                >
                                    <div className="text-8xl mb-6 filter drop-shadow-2xl animate-bounce-subtle">
                                        {slide.isImage ? (
                                            <img src={slide.logo} alt={slide.title} className="w-24 h-24 object-contain" />
                                        ) : (
                                            <span style={{ color: slide.color }}>{slide.logo}</span>
                                        )}
                                    </div>
                                    <h3 style={{ color: slide.color }} className="text-2xl font-black">{slide.title}</h3>
                                    <div className="mt-4 px-4 py-1 rounded-full bg-white/50 text-[10px] font-black uppercase tracking-widest" style={{ color: slide.color }}>
                                      Live Now
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
};

const ServicesPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[#fdfdfd] pt-32 pb-32 font-sans min-h-screen overflow-hidden selection:bg-blue-100 selection:text-blue-600">
            <style>{`
                .backface-hidden {
                  backface-visibility: hidden;
                  -webkit-backface-visibility: hidden;
                }
                .rotate-y-180 {
                  transform: rotateY(180deg);
                }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.02); }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
                
                @keyframes bounce-subtle {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-bounce-subtle {
                    animation: bounce-subtle 4s ease-in-out infinite;
                }
                
                .three-d-carousel { position: relative; width: 100%; height: 450px; display: flex; align-items: center; justify-content: center; perspective: 1500px; }
                .three-d-track { position: relative; width: 300px; height: 350px; }
                .three-d-slide { position: absolute; inset: 0; display: flex; justify-content: center; align-items: center; will-change: transform, opacity; }

                .bg-dots {
                    background-image: radial-gradient(#cbd5e1 1px, transparent 1px);
                    background-size: 40px 40px;
                }
            `}</style>

            <div className="fixed inset-0 bg-dots opacity-20 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Hero Header */}
                <div className="text-center mb-24">
                   <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.3em] mb-8 border border-blue-100 shadow-sm"
                   >
                     <Zap size={14} className="fill-blue-600" /> Premium Services Suite
                   </motion.div>
                   
                   <motion.h1 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-5xl md:text-7xl font-black text-[#0a2357] mb-8 tracking-tighter leading-[1.05]"
                   >
                      Empowering Bharat With <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Digital Financial Freedom</span>
                   </motion.h1>
                   
                   <motion.p 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ delay: 0.2 }}
                     className="text-xl text-gray-500 max-w-3xl mx-auto font-medium leading-relaxed mb-12"
                   >
                      We provide a unified ecosystem of banking, payments, and utility services 
                      designed to transform your business into a digital hub for your community.
                   </motion.p>
                </div>

                {/* 3D Carousel Section */}
                <div className="mb-32">
                  <ThreeDImageCarousel 
                    slides={[
                        { id: 1, logo: "📱", title: "Smart Recharge", bg: "#f0f4ff", color: "#1d4ed8" },
                        { id: 2, logo: "🏠", title: "Bill Payments", bg: "#fefce8", color: "#ca8a04" },
                        { id: 3, logo: "💸", title: "Instant Transfer", bg: "#ecfeff", color: "#0e7490" },
                        { id: 4, logo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/Aadhaar_Logo.svg/1200px-Aadhaar_Logo.svg.png", title: "AEPS Banking", bg: "#f0fdf4", color: "#15803d", isImage: true },
                        { id: 5, logo: "🛡️", title: "Full Insurance", bg: "#faf5ff", color: "#7e22ce" },
                        { id: 6, logo: "🏛️", title: "Micro ATM", bg: "#fff1f2", color: "#e11d48" }
                    ]}
                  />
                </div>

                {/* Grid Header */}
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                  <div className="max-w-xl">
                    <h2 className="text-3xl font-black text-[#0a2357] mb-2 uppercase tracking-wide">Explore Our Services</h2>
                    <div className="h-1.5 w-24 bg-blue-600 rounded-full mb-6" />
                    <p className="text-gray-500 font-semibold">Our platform offers {SERVICES.length} mission-critical services that help more than 50K retailers earn more every single month.</p>
                  </div>
                  <div className="flex gap-4">
                     <div className="text-center px-6 py-4 bg-white border border-gray-100 rounded-3xl shadow-lg shadow-gray-100/50">
                        <div className="text-2xl font-black text-blue-600">99.9%</div>
                        <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Uptime SLA</div>
                     </div>
                     <div className="text-center px-6 py-4 bg-white border border-gray-100 rounded-3xl shadow-lg shadow-gray-100/50">
                        <div className="text-2xl font-black text-green-600">Instant</div>
                        <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Commission</div>
                     </div>
                  </div>
                </div>

                {/* Grid Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                   {SERVICES.map((item, i) => (
                     <motion.div
                       key={i}
                       initial={{ opacity: 0, y: 30 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       transition={{ delay: i * 0.05 }}
                       viewport={{ once: true }}
                     >
                        <FlipCard item={item} i={i} />
                     </motion.div>
                   ))}
                </div>

                {/* CTA Section */}
                <motion.div 
                   initial={{ opacity: 0, y: 60 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   className="mt-40 p-16 rounded-[4rem] text-white text-center shadow-3xl relative overflow-hidden group"
                   style={{
                     background: 'linear-gradient(135deg, #0a2357 0%, #1d4ed8 100%)'
                   }}
                >
                   <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                   <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/20 blur-[120px] rounded-full -mr-48 -mt-48 transition-transform duration-1000 group-hover:scale-110" />
                   
                   <div className="relative z-10">
                     <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Ready to boost your shop's income?</h2>
                     <p className="text-blue-100 text-xl mb-12 opacity-90 max-w-2xl mx-auto font-medium">
                       Join Ujjwal Pay today and start offering these services with India's most stable platform and best commission rates.
                     </p>
                     
                     <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <motion.button 
                           whileHover={{ scale: 1.05 }}
                           whileTap={{ scale: 0.95 }}
                           onClick={() => navigate('/portal')}
                           className="bg-white text-blue-700 px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl transition-all"
                        >
                           Get Started Now
                        </motion.button>
                        <motion.button 
                           whileHover={{ scale: 1.05 }}
                           whileTap={{ scale: 0.95 }}
                           onClick={() => navigate('/contact')}
                           className="bg-transparent border-2 border-white/30 text-white px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-3"
                        >
                           <PhoneCall size={18} /> Call Sales
                        </motion.button>
                     </div>
                   </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ServicesPage;
