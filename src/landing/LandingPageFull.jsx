import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import aepsAsset from '../assets/AEPS.png';
import bankingAsset from '../assets/banking.png';
import correspondentAsset from '../assets/Correspondent.avif';
import loansAsset from '../assets/LOANS.avif';
import cspAsset from '../assets/csp.png';
import travelAsset from '../assets/TRAVEL.png';
import rechargeAsset from '../assets/mobile recharge.png';
import ruralUrbanAsset from '../assets/rular and urban.png';
import insuranceAsset from '../assets/incurence.png';
import taxationAsset from '../assets/taxation.png';
import walletAsset from '../assets/wallet.png';
import aadhaar3dAsset from '../assets/aadhaar_3d_logo.png';
import utilityAsset from '../assets/utility_logo.png';
import moneyTransferAsset from '../assets/images/money_transfer.png';
import bbpsAsset from '../assets/bbps_logo.png';
/* Reference images (assets from ujjwal pr may be absent in repo) */
const retailerImg =
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1400';
const distributorImg =
    'https://images.unsplash.com/photo-1486406146926-c627a92ad4ab?auto=format&fit=crop&q=80&w=1400';
const superDistributorImg =
    'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=1400';
const individualImg =
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1400';
import ElectricCards from '../components/ElectricCards';
import IndiaMap from '../components/IndiaMap';

/* ─────────────────────────────────────────────
   Tiny hook: trigger in-view class once element
   crosses the viewport
───────────────────────────────────────────── */
function useInView(threshold = 0.15) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
            { threshold }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [threshold]);
    return [ref, visible];
}

/* ─────────────── Stagger grid wrapper ─────────────── */
function StaggerGrid({ children, className = '', itemClassName = '', baseDelay = 0, step = 120 }) {
    const wrapRef = useRef(null);
    const [triggered, setTriggered] = useState(false);

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTriggered(true);
                    obs.disconnect();
                }
            },
            { threshold: 0.12 }
        );
        if (wrapRef.current) obs.observe(wrapRef.current);
        return () => obs.disconnect();
    }, []);

    return (
        <div ref={wrapRef} className={className}>
            {React.Children.map(children, (child, i) => (
                <div
                    className={`stagger-item ${triggered ? 'stagger-item--visible' : ''} ${itemClassName}`}
                    style={{ animationDelay: `${baseDelay + i * step}ms` }}
                >
                    {child}
                </div>
            ))}
        </div>
    );
}

/* ─────────────── Reusable animated card (kept for non-grid use) ─────────────── */
function AnimCard({ children, delay = 0, className = '' }) {
    const [ref, visible] = useInView();
    return (
        <div
            ref={ref}
            className={`stagger-item ${visible ? 'stagger-item--visible' : ''} ${className}`}
            style={{ animationDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}

/* ─────────────── Section heading ─────────────── */
function SectionHead({ tag, title, sub, center = true }) {
    const [ref, visible] = useInView();
    return (
        <div ref={ref} className={`section-head ${visible ? 'section-head--visible' : ''} ${center ? 'text-center' : ''}`}>
            <span className="section-tag">{tag}</span>
            <h2 className="section-title" dangerouslySetInnerHTML={{ __html: title }} />
            {sub && <p className="section-sub">{sub}</p>}
        </div>
    );
}

/* ══════════════════════════════════════════════
   DATA
══════════════════════════════════════════════ */
const SERVICES = [
    {
        label: 'AEPS',
        subtitle: 'Aadhaar Enabled Payment System',
        desc: 'Aadhaar Enabled Payment System allows customers to perform banking transactions using their Aadhaar number and biometric authentication.',
        features: ['Cash withdrawals using Aadhaar authentication', 'Cash deposits to any bank account', 'Balance enquiry', 'Mini statements', 'Aadhaar Pay for merchant payments', 'Interoperable across all banks'],
        grad: 'linear-gradient(160deg,#14532d 0%,#15803d 60%,#16a34a 100%)',
        glow: 'rgba(22,163,74,0.6)', tag: 'RBI Certified',
        img: aadhaar3dAsset,
    },
    {
        label: 'Banking Services',
        img: bankingAsset,
        subtitle: 'Comprehensive Banking Solutions',
        desc: 'Extend banking services to your customers as a Business Correspondent. Provide account opening, cash deposits, withdrawals, and more.',
        features: ['Account opening for multiple banks', 'Cash deposits and withdrawals', 'Balance enquiry and mini statements', 'Fixed and recurring deposit creation', 'Micro-ATM services'],
        grad: 'linear-gradient(160deg,#1e3a8a 0%,#1d4ed8 60%,#2563eb 100%)',
        glow: 'rgba(37,99,235,0.6)', tag: 'Pan India',
    },
    {
        label: 'Micro Loans',
        img: loansAsset,
        subtitle: '₹5,000 – ₹50,000 Quick Loans',
        desc: "Facilitate small loans for your customers' immediate needs. Our platform connects borrowers with lenders for quick and hassle-free loan disbursals.",
        features: ['Small ticket loans from ₹5,000 to ₹50,000', 'Quick approval process', 'Minimal documentation', 'Flexible repayment options', 'No collateral required'],
        grad: 'linear-gradient(160deg,#164e63 0%,#0891b2 60%,#06b6d4 100%)',
        glow: 'rgba(8,145,178,0.6)', tag: 'Fast Approval',
    },
    {
        label: 'CSP',
        img: cspAsset,
        subtitle: 'Customer Service Point',
        desc: 'Transform your shop into a Customer Service Point. Provide essential banking and government services to your local community.',
        features: ['Dedicated banking outlet', 'Agent registration', 'Multiple bank connectivity', 'Local area service provider'],
        grad: 'linear-gradient(160deg,#713f12 0%,#a16207 60%,#ca8a04 100%)',
        glow: 'rgba(202,138,4,0.6)', tag: 'Business Opportunity',
    },
    {
        label: 'Business Correspondent',
        img: correspondentAsset,
        subtitle: 'Business Correspondent',
        desc: 'Act as a Business Correspondent for leading banks. Facilitate secure transactions and financial inclusion in underserved areas.',
        features: ['Bank-authorized agent', 'Secure cash management', 'Customer enrollment', 'Financial literacy support'],
        grad: 'linear-gradient(160deg,#581c87 0%,#7c3aed 60%,#8b5cf6 100%)',
        glow: 'rgba(124,58,237,0.6)', tag: 'Certified Agent',
    },
    {
        label: 'Money Transfer',
        img: moneyTransferAsset,
        subtitle: 'DMT / IMPS / NEFT / RTGS',
        desc: 'Secure and instant domestic money transfers to any bank account in India.',
        features: ['Instant transfers through IMPS/UPI', 'Scheduled transfers through NEFT', 'Real-time transaction status updates', 'Transaction history', 'Secure authentication', 'Competitive fees'],
        grad: 'linear-gradient(160deg,#1e3a8a 0%,#1d4ed8 60%,#2563eb 100%)',
        glow: 'rgba(37,99,235,0.6)', tag: 'Most Popular',
    },
    {
        label: 'Bill Payment',
        img: bbpsAsset,
        subtitle: 'BBPS Powered • 100+ Billers',
        desc: 'Comprehensive bill payment services for utilities, subscriptions, and more.',
        features: ['Electricity, water, and gas bills', 'Mobile, broadband, and DTH recharges', 'Credit card bill payments', 'Insurance premium payments', 'Educational fee payments', 'Automatic reminders'],
        grad: 'linear-gradient(160deg,#713f12 0%,#a16207 60%,#ca8a04 100%)',
        glow: 'rgba(202,138,4,0.6)', tag: 'BBPS Certified',
    },
    {
        label: 'Tours & Travel',
        img: travelAsset,
        subtitle: 'IRCTC Certified Agent',
        desc: 'Complete travel booking solutions including flights, hotels, buses, etc.',
        features: ['Domestic & international flights', 'Hotel reservations', 'Bus and train bookings', 'Holiday packages', 'Travel insurance', '24/7 support'],
        grad: 'linear-gradient(160deg,#0c4a6e 0%,#0369a1 60%,#0ea5e9 100%)',
        glow: 'rgba(14,165,233,0.6)', tag: 'IRCTC Partner',
    },
    {
        label: 'Insurance',
        img: walletAsset,
        subtitle: 'Life & General Insurance',
        desc: 'Offer a range of insurance products for financial security.',
        features: ['Life insurance', 'Health insurance', 'Vehicle insurance', 'Travel insurance', 'Shop insurance', 'Digital documents'],
        grad: 'linear-gradient(160deg,#14532d 0%,#166534 60%,#15803d 100%)',
        glow: 'rgba(21,128,61,0.6)', tag: 'IRDAI Approved',
    },
    {
        label: 'Utility Services',
        img: utilityAsset,
        subtitle: 'PAN • Aadhaar • Documents',
        desc: 'Provide essential document services like PAN card, Voter ID, etc.',
        features: ['PAN card applications', 'Voter ID corrections', 'Aadhaar updates', 'Passport assistance', 'Certificate attestations', 'Govt schemes'],
        grad: 'linear-gradient(160deg,#422006 0%,#b45309 60%,#d97706 100%)',
        glow: 'rgba(180,83,9,0.6)', tag: 'Govt. Approved',
    },
];

const STATS = [
    { num: '100', label: 'Merchants', suffix: '+' },
    { num: '10', label: 'Monthly Transactions', prefix: '₹', suffix: 'Cr+' },
    { num: '50', label: 'Cities Covered', suffix: '+' },
    { num: '15', label: 'Banking Partners', suffix: '+' },
];

/* ─────────────────────────────────────────────
   Service Bio Modal
───────────────────────────────────────────── */
export const ServiceModalContext = React.createContext();

function ServiceBioModal({ service, onClose }) {
    if (!service) return null;
    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(8px)' }}
        >
            <motion.div
                className="bg-white"
                initial={{ scale: 0.9, y: 30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 30, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                onClick={e => e.stopPropagation()}
                style={{ background: '#fff', borderRadius: '32px', padding: '40px', maxWidth: '500px', width: '100%', position: 'relative', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.2)' }}
            >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '8px', background: service.grad || '#2563eb' }}></div>
                <button
                    onClick={onClose}
                    style={{ position: 'absolute', top: '20px', right: '20px', background: '#f1f5f9', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#64748b', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.2s' }}
                >×</button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
                    <div style={{ fontSize: '48px', minWidth: '80px', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', borderRadius: '24px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}>
                        {service.img ? (
                            <img src={service.img} alt={service.label} style={{ width: '60%' }} />
                        ) : (
                            null
                        )}
                    </div>
                    <div>
                        <span style={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1px', color: '#2563eb', background: '#eff6ff', padding: '4px 12px', borderRadius: '100px' }}>{service.tag || 'Service'}</span>
                        <h3 style={{ fontSize: '24px', fontWeight: '900', color: '#0f172a', margin: '8px 0 0', lineHeight: 1.1 }}>{service.label}</h3>
                        <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '13px', fontWeight: '700' }}>{service.subtitle}</p>
                    </div>
                </div>

                <p style={{ color: '#334155', fontSize: '15px', lineHeight: '1.6', marginBottom: '24px', fontWeight: '500' }}>
                    {service.desc}
                </p>

                <div>
                    <h4 style={{ fontSize: '12px', fontWeight: '900', textTransform: 'uppercase', color: '#0f172a', marginBottom: '16px', letterSpacing: '1px' }}>Key Highlights</h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '12px' }}>
                        {(service.features || []).map((feat, idx) => (
                            <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: '#475569', fontWeight: '600' }}>
                                <span style={{ color: '#10b981', fontWeight: '900' }}>✓</span> {feat}
                            </li>
                        ))}
                    </ul>
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
                    <button
                        onClick={() => window.location.href = '/portal'}
                        style={{ flex: 1, background: '#0f172a', color: '#fff', padding: '16px', borderRadius: '16px', fontWeight: '800', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer', border: 'none', transition: '0.3s' }}
                    >
                        Activate Now
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}

/* ─────────────────────────────────────────────
   Animated Counter
───────────────────────────────────────────── */
function Counter({ end, duration = 4000, prefix = "", suffix = "" }) {
    const [count, setCount] = useState(0);
    const [ref, visible] = useInView(0.1);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (visible && !hasAnimated.current) {
            hasAnimated.current = true;
            let startTime;
            const endVal = parseFloat(end);

            const animate = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);
                const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                setCount(easedProgress * endVal);
                if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
        }
    }, [visible, end, duration]);

    return (
        <b ref={ref} className="rp-stat-num">
            {prefix}{count.toLocaleString(undefined, {
                minimumFractionDigits: end.toString().includes('.') ? 1 : 0,
                maximumFractionDigits: end.toString().includes('.') ? 1 : 0,
            })}{suffix}
        </b>
    );
}

const HERO_SLIDES = [
    {
        title: "Digital Banking\nSolutions",
        sub: "Comprehensive Banking Services",
        image: bankingAsset,
        services: ["Account Opening", "Cash Deposit", "Mini Statement"],
        bg: "radial-gradient(50% 50% at 50% 50%, #eff6ff 0%, #bfdbfe 100%)",
        color: "#1d4ed8",
        shortLabel: "Banking"
    },
    {
        title: "Business\nCorrespondent",
        sub: "Secure Cash Management",
        image: correspondentAsset,
        services: ["Authorized Agent", "Customer Enrollment", "Financial Literacy"],
        bg: "radial-gradient(50% 50% at 50% 50%, #faf5ff 0%, #e9d5ff 100%)",
        color: "#7e22ce",
        shortLabel: "Correspondent"
    },
    {
        title: "Micro Loans\nFast Approval",
        sub: "₹5,000 – ₹50,000 Quick Loans",
        image: loansAsset,
        services: ["Minimal Docs", "Flexible Repayment", "No Collateral"],
        bg: "radial-gradient(50% 50% at 50% 50%, #ecfeff 0%, #a5f3fc 100%)",
        color: "#0e7490",
        shortLabel: "Loans"
    },
    {
        title: "Aadhaar Enabled\nPayments",
        sub: "Secure Transactions with Biometrics",
        image: aepsAsset,
        services: ["Cash Withdrawal", "Balance Enquiry", "Aadhaar Pay"],
        bg: "radial-gradient(50% 50% at 50% 50%, #f0fdf4 0%, #bbf7d0 100%)",
        color: "#15803d",
        shortLabel: "AEPS"
    },
    {
        title: "Customer Service\nPoint",
        sub: "Essential Services for Community",
        image: cspAsset,
        services: ["Dedicated Outlet", "Bank Connectivity", "Local Provider"],
        bg: "radial-gradient(50% 50% at 50% 50%, #fffbeb 0%, #fde68a 100%)",
        color: "#b45309",
        shortLabel: "CSP"
    },
    {
        title: "Smart Digital\nWallet Services",
        sub: "Fast, Secure & Seamless Payments",
        image: walletAsset,
        services: ["Add Money", "Send Money", "Recharge"],
        bg: "radial-gradient(50% 50% at 50% 50%, #fff1f2 0%, #fecdd3 100%)",
        color: "#e11d48",
        shortLabel: "Wallet"
    },
    {
        title: "Tours & Travel\nBooking",
        sub: "IRCTC Certified Agent",
        image: travelAsset,
        services: ["Flight & Hotel", "Bus & Train", "Holiday Packages"],
        bg: "radial-gradient(50% 50% at 50% 50%, #e0f2fe 0%, #bae6fd 100%)",
        color: "#0369a1",
        shortLabel: "Travel"
    },
    {
        title: "Mobile\nRecharge",
        sub: "Fast & Easy Mobile Recharge",
        image: rechargeAsset,
        services: ["Prepaid Recharge", "Postpaid Bill", "DTH Recharge"],
        bg: "radial-gradient(50% 50% at 50% 50%, #fdf4ff 0%, #e9d5ff 100%)",
        color: "#9333ea",
        shortLabel: "Recharge"
    },
    {
        title: "Insurance\nProtection",
        sub: "Life, Health & General Insurance",
        image: insuranceAsset,
        services: ["Life Insurance", "Health Insurance", "Vehicle Insurance"],
        bg: "radial-gradient(50% 50% at 50% 50%, #f0fdfa 0%, #99f6e4 100%)",
        color: "#0f766e",
        shortLabel: "Insurance"
    },
    {
        title: "Taxation\nServices",
        sub: "ITR Filing & GST Services",
        image: taxationAsset,
        services: ["ITR Filing", "GST Returns", "Tax Planning"],
        bg: "radial-gradient(50% 50% at 50% 50%, #f0f9ff 0%, #bae6fd 100%)",
        color: "#0369a1",
        shortLabel: "Taxation"
    }
];



const Services = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);

    const slide = HERO_SLIDES[currentIndex];

    return (
        <section className="rp-hero" id="services">
            <div id="hero-backgrounds">
                {HERO_SLIDES.map((s, i) => (
                    <div
                        key={i}
                        className={`hero-bg ${i === currentIndex ? 'active' : ''}`}
                        style={{ background: s.bg }}
                    ></div>
                ))}
            </div>

            <div className="hero-stars"></div>

            <div className="rp-hero__content-inner">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 30 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="hero-pills-container">
                            {slide.services.map((svc, i) => (
                                <span key={i}><span className="pill-check" style={{ color: slide.color }}>✓</span> {svc}</span>
                            ))}
                        </div>

                        <h1 className="hero-h1">
                            {slide.title}
                        </h1>

                        <p className="hero-sub" style={{ color: slide.color }}>{slide.sub}</p>

                        <div className="hero-actions">
                            <button className="btn-download" onClick={() => window.open('https://play.google.com/store', '_blank')}>
                                <svg viewBox="0 0 24 24" width="24" height="24">
                                    <path fill="#ea4335" d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5Z" />
                                    <path fill="#fbbc04" d="M16.81,15.12L18.81,16.27C19.46,16.61 19.81,17.21 19.81,17.81C19.81,18.41 19.46,19.01 18.81,19.35L5.75,26.85C5.25,27.14 4.65,27.14 4.15,26.85L14.89,16.11L16.81,15.12Z" />
                                    <path fill="#4285f4" d="M14.89,7.89L4.15,17.15L5.75,18.15L18.81,10.65C19.46,10.31 19.81,9.71 19.81,9.11C19.81,8.51 19.46,7.91 18.81,7.57L16.81,8.88L14.89,7.89Z" />
                                    <path fill="#34a853" d="M14.89,7.89L3.84,2.15C3.34,1.91 3,2.41 3,3V12L13.69,12L14.89,7.89Z" />
                                </svg>
                                Download App
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>

                <div className="hero-tabs" style={{ display: 'flex', gap: '10px', marginTop: '40px', flexWrap: 'wrap' }}>
                    {HERO_SLIDES.map((s, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            style={{
                                padding: '10px 18px',
                                borderRadius: '14px',
                                border: `1px solid ${i === currentIndex ? s.color : 'rgba(203, 213, 225, 0.6)'}`,
                                background: i === currentIndex ? s.color : 'rgba(255,255,255,0.7)',
                                color: i === currentIndex ? '#fff' : '#475569',
                                cursor: 'pointer',
                                fontWeight: '700',
                                fontSize: '0.95rem',
                                transition: 'all 0.3s',
                                backdropFilter: 'blur(10px)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                                {s.image ? <img src={s.image} alt={s.shortLabel} style={{ width: '18px', height: '18px', objectFit: 'cover', borderRadius: '3px' }} /> : s.shortLabel[0]}
                            </span>
                            {s.shortLabel}
                        </button>
                    ))}
                </div>
            </div>

            <div className="rp-hero__visuals-inner">
                <div className="hero-visual-slider">
                    {HERO_SLIDES.map((s, i) => {
                        let status = 'inactive';
                        if (i === currentIndex) status = 'active';
                        else if (i === (currentIndex + 1) % HERO_SLIDES.length) status = 'next';
                        else if (i === (currentIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length) status = 'previous';

                        return (
                            <div key={i} className={`hero-logo-slide ${status}`}>
                                {s.image && <img src={s.image} alt={s.title} className="hero-img-logo" />}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

function Stats() {
    return (
        <section className="rp-stats">
            <div className="rp-stats__inner">
                {STATS.map((s, i) => (
                    <div key={i} className="rp-stat-card">
                        <Counter end={s.num} prefix={s.prefix} suffix={s.suffix} />
                        <p className="rp-stat-label">{s.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

function Advantage() {
    const { setSelectedService } = React.useContext(ServiceModalContext);

    return (
        <section id="advantage" className="advantage-section modern">
            <div className="bg-glow-1"></div><div className="bg-glow-2"></div>
            <div className="bg-glow-3"></div>

            <div className="container relative z-10">
                <div className="adv-grid">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="adv-cards-left"
                    >
                        <ElectricCards />
                        <div style={{ marginTop: '32px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 12px 40px rgba(0,0,0,0.10)', border: '1px solid #e2e8f0' }}>
                            <img
                                src={ruralUrbanAsset}
                                alt="Rural & Urban Banking"
                                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="adv-retailer-right"
                    >
                        <h2 className="adv-title">
                            Become a <br />
                            <span className="text-gradient-gold">Ujjwal Pay Retailer</span>
                        </h2>
                        <p className="adv-subtitle">Unlock unlimited earning potential with zero upfront investment. Empower your business.</p>

                        <div className="adv-features">
                            {[
                                { img: aepsAsset, text: 'AEPS & Micro ATM', sub: 'High commission on cash withdrawals', svcId: 0 },
                                { img: moneyTransferAsset, text: 'Money Transfer', sub: 'Instant domestic money transfers', svcId: 5 },
                                { img: utilityAsset, text: 'Utility Services', sub: 'Electricity, Water, Gas, and more', svcId: 9 },
                                { img: walletAsset, text: 'Wallet Services', sub: 'Secure & instant digital payments', svcId: 8 },
                                { img: travelAsset, text: 'Travel Booking', sub: 'Best margin on flight & train bookings', svcId: 7 },
                                { img: loansAsset, text: 'Micro Loans', sub: 'Quick loans from ₹5,000 to ₹50,000', svcId: 2 }
                            ].map((f, i) => (
                                <motion.div
                                    className="adv-feature-card"
                                    key={i}
                                    onClick={() => setSelectedService(SERVICES[f.svcId])}
                                    whileHover={{ scale: 1.03, backgroundColor: '#f8fafc', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <div className="adv-feat-icon">{f.img ? <img src={f.img} alt={f.text} style={{ width: '28px', height: '28px', objectFit: 'cover', borderRadius: '6px' }} /> : null}</div>
                                    <div className="adv-feat-text">
                                        <h4>{f.text}</h4>
                                        <p>{f.sub}</p>
                                    </div>
                                    <div className="adv-feat-arrow">→</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function Partners() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('retailer');
    const data = {
        retailer: { color: '#2563eb', title: 'Retailer', desc: 'Join over 15,00,000 active retailers and earn more than ₹25,000/month.', image: retailerImg },
        distributor: { color: '#10b981', title: 'Distributor', desc: 'Join over 1,00,000 distributors and earn more than 18%/month.', image: distributorImg },
        superDistributor: { color: '#7c3aed', title: 'Super Distributor', desc: 'Lead a network of distributors across your region. Earn unlimited commission with highest payout slabs.', image: superDistributorImg },
        individual: { color: '#f59e0b', title: 'Individual', desc: 'Run business from home as Digital Pradhan. Earn ₹15,000+/month.', image: individualImg }
    };
    return (
        <section id="partners" className="partners-section">
            <div className="container">
                <div className="header">
                    <span className="tag">Partnership</span>
                    <h2 className="glow-title">Grow with Ujjwal Pay</h2>
                </div>
                <div className="tabs">
                    {Object.keys(data).map(k => (
                        <button key={k} className={activeTab === k ? 'active' : ''} style={{ '--color': data[k].color }} onClick={() => setActiveTab(k)}>{data[k].title}</button>
                    ))}
                </div>
                <div className="partner-card">
                    <div className="image-side" style={{ '--color': data[activeTab].color }}><img src={data[activeTab].image} alt="" /></div>
                    <div className="info-side">
                        <h3 style={{ color: data[activeTab].color }}>{data[activeTab].title}</h3>
                        <p>{data[activeTab].desc}</p>
                        <button style={{ background: data[activeTab].color }} onClick={() => navigate('/portal')}>Join Now</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

function PartnerBanks() {
    const banks = [
        "/airtel-bank.svg",
        "/fino-bank.svg",
        "/nsdl-bank.svg",
    ];

    const allBanks = [...banks, ...banks, ...banks];

    return (
        <section className="partner-banks-wrapper" style={{ padding: '60px 0', background: '#fff', borderTop: '1px solid #f1f5f9' }}>
            <div className="container" style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px' }}>Trusted By Top Banking Partners</h3>
            </div>
            <div className="marquee-container" style={{ overflow: 'hidden', whiteSpace: 'nowrap', position: 'relative', width: '100%', padding: '10px 0' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(to right, #fff, transparent)', zIndex: 2 }}></div>
                <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(to left, #fff, transparent)', zIndex: 2 }}></div>
                <div className="marquee-content" style={{ display: 'inline-flex', alignItems: 'center', gap: '100px', animation: 'scrollMarquee 25s linear infinite', paddingLeft: '40px' }}>
                    {allBanks.map((logo, index) => (
                        <img
                            key={index}
                            src={logo}
                            alt="Bank Logo"
                            style={{ height: '65px', width: '300px', objectFit: 'contain', flexShrink: 0, transition: 'transform 0.3s ease' }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                        />
                    ))}
                </div>
            </div>
            <style>{`
                @keyframes scrollMarquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-100% / 3)); }
                }
            `}</style>
        </section>
    );
}

function ServedLocations() {
    const activeStates = ['up', 'dl', 'gj', 'mp', 'br', 'mh', 'hr', 'rj'];
    return (
        <section className="py-24 bg-white relative overflow-hidden border-t border-slate-100">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-400/5 rounded-full blur-[100px] pointer-events-none z-0"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-400/5 rounded-full blur-[80px] pointer-events-none z-0"></div>
            
            <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                <div className="flex-1 text-center md:text-left">
                    <div className="mx-auto md:mx-0 w-max px-4 py-2 bg-blue-50 text-blue-700 text-sm font-extrabold tracking-wider uppercase rounded-full mb-6">
                        Pan India Reach
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                        Locations We Serve
                    </h2>
                    <p className="text-lg text-slate-600 mb-10 max-w-xl mx-auto md:mx-0 leading-relaxed font-medium">
                        Ujjwal Pay is rapidly expanding its footprint across India. We are proud to empower merchants and rural citizens in major states with seamless digital financial services.
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                        {['Uttar Pradesh', 'Delhi', 'Gujarat', 'Madhya Pradesh', 'Bihar', 'Maharashtra', 'Haryana', 'Rajasthan'].map(state => (
                            <span key={state} className="px-5 py-2.5 bg-slate-50 border border-slate-200 text-slate-700 font-bold rounded-2xl shadow-sm text-sm hover:-translate-y-1 hover:shadow-md transition-all hover:bg-white hover:text-blue-600 cursor-default">
                                {state}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="flex-1 w-full max-w-[600px] drop-shadow-2xl relative z-10">
                    <IndiaMap activeStates={activeStates} />
                </div>
            </div>
        </section>
    );
}

export default function Home() {
    const [selectedService, setSelectedService] = useState(null);

    return (
        <ServiceModalContext.Provider value={{ setSelectedService }}>
            <style>{CSS}</style>
            <div className="rp-root">
                <Services />
                <Stats />
                <Advantage />
                <ServedLocations />
                <Partners />
                <PartnerBanks />
            </div>
            <AnimatePresence>
                {selectedService && <ServiceBioModal service={selectedService} onClose={() => setSelectedService(null)} />}
            </AnimatePresence>
        </ServiceModalContext.Provider>
    );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Outfit:wght@400;700;900&display=swap');
.rp-root { font-family: 'Outfit', sans-serif; overflow-x: hidden; display: flex; flex-direction: column; }

/* Hero Slider */
.rp-hero { position: relative; overflow: hidden; display: flex; flex-wrap: wrap; padding: 120px 5% 80px; min-height: 85vh; align-items: center; background: #f8fafc; }
#hero-backgrounds { position: absolute; inset: 0; z-index: 0; }
.hero-bg { position: absolute; inset: 0; opacity: 0; transition: opacity 2s ease-in-out; }
.hero-bg.active { opacity: 1; }
.hero-stars { position: absolute; inset: 0; background: radial-gradient(circle, #cbd5e1 1px, transparent 1px); background-size: 80px 80px; opacity: 0.3; z-index: 1; pointer-events: none; }

.rp-hero__content-inner { position: relative; z-index: 10; flex: 1 1 45%; min-width: 320px; margin-top: -40px; }
.hero-pills-container { display: flex; gap: 12px; margin-bottom: 24px; }
.hero-pills-container span { background: rgba(255,255,255,0.6); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.8); padding: 8px 16px; border-radius: 99px; color: #0f172a; font-size: 13px; font-weight: 700; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
.pill-check { margin-right: 4px; font-weight: 900; }
.hero-h1 { font-size: clamp(2.5rem, 5vw, 4.2rem); font-weight: 950; color: #0f172a; line-height: 1.1; margin-bottom: 20px; text-shadow: 0 5px 15px rgba(255,255,255,0.8); }
.hero-sub { font-size: 1.4rem; font-weight: 800; margin-bottom: 40px; text-transform: uppercase; letter-spacing: 1px; color: #334155; }
.hero-actions { display: flex; gap: 16px; flex-wrap: wrap; }
.btn-download { background: #fff; color: #0f172a; border: 1px solid #e2e8f0; padding: 18px 40px; border-radius: 50px; font-weight: 900; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: transform 0.3s, box-shadow 0.3s; box-shadow: 0 5px 15px rgba(0,0,0,0.05); }
.btn-download:hover { transform: scale(1.05); box-shadow: 0 10px 25px rgba(0,0,0,0.1); }

/* Visual Slider (3D Logos Only) */
.rp-hero__visuals-inner { position: relative; z-index: 5; flex: 1 1 50%; min-width: 320px; height: 500px; margin-top: -40px; }
.hero-visual-slider { position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }

.hero-logo-slide { 
  position: absolute; 
  left: 100%; 
  top: 50%; 
  transform: translate(-50%, -50%) scale(0.3); 
  opacity: 0; 
  transition: 0.8s cubic-bezier(0.25, 1, 0.5, 1);
  width: 450px; 
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-logo-slide.active { left: 50%; opacity: 1; transform: translate(-50%, -50%) scale(1); }
.hero-logo-slide.next { left: 85%; top: 20%; opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
.hero-logo-slide.previous { left: 85%; top: 80%; opacity: 0; transform: translate(-50%, -50%) scale(0.5); }

.hero-emoji-logo { 
  font-size: 20rem;
  line-height: 1;
  animation: floatLogo 3s infinite ease-in-out; 
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  -webkit-text-stroke: 0px transparent;
  text-shadow: none;
  color: inherit;
}

.hero-img-logo {
  width: 420px;
  height: auto;
  max-height: 420px;
  object-fit: contain;
  border-radius: 20px;
  filter: drop-shadow(0 20px 40px rgba(0,0,0,0.18));
  animation: floatLogo 3s infinite ease-in-out;
}

@keyframes floatLogo {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-30px); }
}

@media (max-width: 900px) {
    .rp-hero { flex-direction: column; padding-top: 150px; text-align: center; }
    .rp-hero__content-inner { margin-top: 0; }
    .rp-hero__visuals-inner { margin-top: 0; height: 400px; }
    .hero-visual-slider { height: 400px; transform: scale(0.8); }
    .hero-actions { justify-content: center; }
    .hero-h1 { font-size: 2.8rem; }
    .hero-logo-slide { width: 300px; }
    .hero-logo-slide.active { left: 50%; top: 50%; }
}
.phone-bottom-caps { display: flex; gap: 8px; padding: 0 20px; margin-top: 5px; }
.cap-gold { flex:1; background: #fef3c7; color: #d97706; padding: 8px; border-radius: 20px; font-size: 10px; font-weight: 800; text-align: center; }
.cap-blue { flex:1; background: #eff6ff; color: #1d4ed8; padding: 8px; border-radius: 20px; font-size: 10px; font-weight: 800; text-align: center; }
.phone-cityscape { position: absolute; bottom: 0; width: 100%; height: 70px; display: flex; align-items: flex-end; padding: 8px 12px; gap: 4px; }

/* Golden Wallet New */
.golden-wallet-new { position: relative; width: 250px; height: 170px; transform: rotate(6deg) translateY(30px); margin-left: -20px; }
.wallet-body { position: absolute; bottom: 0; left: 0; width: 100%; height: 160px; background: linear-gradient(135deg, #fce7cf, #e2a66e); border-radius: 16px; box-shadow: 0 25px 45px rgba(0,0,0,0.4), inset 0 3px 6px rgba(255,255,255,0.7); z-index: 5; display: flex; align-items: center; justify-content: center; border: 2px solid #b77949; }
.wallet-stitch-new { position: absolute; inset: 6px; border: 2px dashed rgba(160, 95, 45, 0.4); border-radius: 12px; pointer-events: none; }
.wallet-logo-container { position: relative; z-index: 10; width: 150px; }
.wallet-logo-container img { width: 100%; object-fit: contain; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15)); max-height: 80px; }
.wallet-clasp-new { position: absolute; right: -12px; top: 50%; transform: translateY(-50%); width: 30px; height: 70px; background: linear-gradient(135deg, #e7be94, #c98858); border-radius: 8px; border: 1px solid #b77949; box-shadow: -2px 0 5px rgba(0,0,0,0.1), 4px 5px 15px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; }
.clasp-rivet { width: 16px; height: 16px; background: linear-gradient(135deg, #f1f5f9, #94a3b8); border-radius: 50%; box-shadow: inset 0 2px 4px #fff, 0 2px 4px rgba(0,0,0,0.4); }

.red-card { position: absolute; top: -50px; left: 30px; width: 180px; height: 110px; background: #ef4444; border-radius: 10px; transform: rotate(-12deg); z-index: 2; box-shadow: 0 10px 20px rgba(0,0,0,0.2); overflow: hidden; border: 1px solid #dc2626; border-top: 2px solid #fca5a5; }
.card-strip-white { position: absolute; top: 25px; left: -20px; width: 220px; height: 20px; background: rgba(255,255,255,0.9); transform: rotate(15deg); }
.card-chip-circles { position: absolute; bottom: 15px; right: 20px; display: flex; }
.circle-gray { width: 26px; height: 26px; border-radius: 50%; background: #4b5563; z-index: 1; opacity: 0.9; }
.circle-gold { width: 26px; height: 26px; border-radius: 50%; background: #fde047; margin-left: -12px; z-index: 2; box-shadow: -2px 0 5px rgba(0,0,0,0.2); }

.gold-coin { position: absolute; top: -30px; left: -30px; width: 100px; height: 100px; background: radial-gradient(ellipse at 30% 30%, #fef08a, #ca8a04); border-radius: 50%; z-index: 6; box-shadow: 0 15px 25px rgba(0,0,0,0.4), inset 0 0 10px #fef08a, inset -5px -5px 15px #854d0e; border: 3px solid #fde047; display: flex; align-items: center; justify-content: center; transform: rotate(-10deg); }
.gold-coin span { font-size: 60px; font-weight: 900; color: #fde047; text-shadow: 1px 1px 0 #fff, -1px -1px 0 #d97706, 2px 2px 5px rgba(133, 77, 14, 0.8); font-family: serif; line-height: 1; margin-top: 5px; }

/* Stats */
.rp-stats { background: linear-gradient(135deg, #1e3a8a, #10b981); padding: 50px 5%; }
.rp-stats__inner { max-width: 1000px; margin: 0 auto; display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.rp-stat-card { text-align: center; color: #fff; }
.rp-stat-num { font-size: 2.5rem; font-weight: 950; display: block; }
.rp-stat-label { font-size: 0.9rem; opacity: 0.8; font-weight: 600; }

/* Services */
.services-section { padding: 80px 5%; background: #f8fafc; }
.services-section .container { max-width: 1200px; margin: 0 auto; }
.services-section .header { text-align: center; margin-bottom: 50px; }
.services-section .header h2 { font-size: 2.5rem; font-weight: 900; color: #0a2357; }
.services-section .header p { font-size: 1.2rem; color: #64748b; }
.services-section .header p span { color: #0a2357; font-weight: 800; }
.services-layout { display: flex; flex-wrap: wrap; gap: 24px; }
.services-grid-wrapper { flex: 1 1 60%; display: flex; flex-direction: column; gap: 16px; min-width: 320px; }
.grid-row-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.grid-row-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.service-card-quick { background: #fff; padding: 25px 20px; border-radius: 20px; display: flex; align-items: center; gap: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.05); }
.service-card-quick span { font-size: 2rem; }
.service-card-long { background: #fff; padding: 25px 20px; border-radius: 20px; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 5px 15px rgba(0,0,0,0.05); }
.service-card-long div { display: flex; align-items: center; gap: 12px; }

/* 3D Carousel CSS */
.services-layout-full { width: 100%; display: block; overflow: visible; }
.three-d-carousel { position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; perspective: 1000px; padding: 40px 0; }
.three-d-track { position: relative; width: 380px; height: 350px; }
.three-d-slide { position: absolute; inset: 0; display: flex; justify-content: center; align-items: center; will-change: transform, opacity; }

.carousel-service-card { width: 100%; height: 100%; border-radius: 24px; box-shadow: 0 15px 35px rgba(0,0,0,0.1); border: 4px solid #fff; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; text-align: center; gap: 20px; transition: transform 0.3s; }
.card-icon-container { font-size: 6rem; line-height: 1; filter: drop-shadow(0 10px 15px rgba(0,0,0,0.1)); display: flex; align-items: center; justify-content: center; height: 120px; }
.card-logo-img { width: 180px; height: auto; object-fit: contain; }
.carousel-service-card h3 { font-size: 1.8rem; font-weight: 800; margin: 0; }

@media (max-width: 900px) {
    .three-d-track { width: 280px; height: 250px; }
    .card-icon-container { font-size: 4rem; height: 80px; }
    .card-logo-img { width: 120px; }
    .carousel-service-card h3 { font-size: 1.4rem; }
}
.service-card-long span { font-size: 2rem; }
.service-card-long i { font-size: 1.5rem; color: #ccc; }
.graphic-side { flex: 1 1 35%; min-width: 300px; }
.graphic-side img { width: 100%; height: 100%; object-fit: cover; border-radius: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }

/* Premium Advantage Section */
.advantage-section.modern { padding: 120px 5%; background: #ffffff; position: relative; overflow: hidden; color: #0f172a; }
.bg-glow-1 { position: absolute; top:-20%; left:-10%; width: 50%; height: 50%; background: radial-gradient(circle, rgba(59,130,246,0.15), transparent 60%); filter: blur(60px); z-index: 0; }
.bg-glow-2 { position: absolute; bottom:-20%; right:-10%; width: 50%; height: 50%; background: radial-gradient(circle, rgba(245,158,11,0.1), transparent 60%); filter: blur(60px); z-index: 0; }
.bg-glow-3 { position: absolute; top:50%; left:50%; transform: translate(-50%, -50%); width: 40%; height: 40%; background: radial-gradient(circle, rgba(139,92,246,0.1), transparent 60%); filter: blur(80px); z-index: 0;}

.relative.z-10 { position: relative; z-index: 10; }
.adv-grid { display: flex; flex-wrap: wrap; gap: 40px; align-items: center; max-width: 1400px; margin: 0 auto; justify-content: center; }
.adv-cards-left { flex: 1 1 55%; min-width: 350px; }
.adv-retailer-right { flex: 1 1 40%; min-width: 320px; text-align: left; }
.adv-retailer-right .adv-subtitle { margin-left: 0; }
.adv-retailer-right .adv-features { justify-content: flex-start; }

.adv-title { font-size: clamp(2.8rem, 5vw, 4rem); font-weight: 950; line-height: 1.15; margin-bottom: 24px; letter-spacing: -1px; color: #0f172a; }
.text-gradient-gold { background: linear-gradient(135deg, #f59e0b, #ea580c); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.adv-subtitle { font-size: 1.2rem; color: #475569; margin-bottom: 45px; max-width: 100%; line-height: 1.6; font-weight: 500; }
.adv-features { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; width: 100%; }
.adv-feature-card { width: 100%; }
.adv-feature-card { background: #ffffff; border: 1px solid #e2e8f0; padding: 20px 24px; border-radius: 20px; display: flex; align-items: center; gap: 20px; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.03); }
.adv-feat-icon { font-size: 2.2rem; background: #eff6ff; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 16px; color: #3b82f6; }
.adv-feat-text h4 { font-size: 1.2rem; font-weight: 800; color: #0f172a; margin-bottom: 4px; }
.adv-feat-text p { font-size: 0.95rem; color: #64748b; margin: 0; }
.adv-feat-arrow { margin-left: auto; color: #3b82f6; font-weight: 900; font-size: 1.5rem; transition: transform 0.2s; }
.adv-feature-card:hover .adv-feat-arrow { transform: translateX(5px); color: #ea580c; }

/* Premium Glass Panel */
.glass-panel-premium { background: rgba(255, 255, 255, 0.6); backdrop-filter: blur(40px); border: 1px solid rgba(255,255,255,0.8); border-radius: 36px; padding: 50px 40px; display: flex; flex-wrap: wrap; gap: 40px; box-shadow: 0 30px 60px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(255,255,255,0.5); position: relative; overflow: hidden; }
.glass-panel-premium::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 100%); pointer-events: none; }

.panel-content { flex: 1 1 45%; z-index: 2; display: flex; flex-direction: column; justify-content: center; min-width: 280px; }
.tag-new { background: #eff6ff; color: #2563eb; border: 1px solid #bfdbfe; padding: 6px 16px; border-radius: 99px; font-size: 0.8rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; display: inline-block; margin-bottom: 24px; width: max-content; }
.panel-content h3 { font-size: 2.2rem; font-weight: 900; color: #0f172a; margin-bottom: 24px; line-height: 1.25; letter-spacing: -0.5px; }
.text-highlight { color: #f59e0b; }
.checklist-premium { list-style: none; margin-bottom: 40px; padding: 0; }
.checklist-premium li { font-size: 1.05rem; color: #475569; font-weight: 600; margin-bottom: 16px; display: flex; align-items: center; gap: 12px; }
.checklist-premium .check { background: linear-gradient(135deg, #10b981, #059669); color: #fff; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-size: 0.8rem; font-weight: 900; box-shadow: 0 2px 8px rgba(16, 185, 129, 0.4); flex-shrink: 0; }
.btn-glow-gold { background: linear-gradient(135deg, #f59e0b, #ea580c); color: #fff; border: none; padding: 18px 36px; border-radius: 18px; font-size: 1.1rem; font-weight: 800; cursor: pointer; transition: all 0.3s; box-shadow: 0 10px 25px rgba(234, 88, 12, 0.4), inset 0 2px 0 rgba(255,255,255,0.2); width: max-content; }
.btn-glow-gold:hover { transform: translateY(-3px); box-shadow: 0 15px 35px rgba(234, 88, 12, 0.6), inset 0 2px 0 rgba(255,255,255,0.2); }

.panel-visual { flex: 1 1 45%; position: relative; min-height: 400px; z-index: 2; display: flex; align-items: center; justify-content: center; perspective: 1200px; min-width: 280px; }
.floating-elements { position: relative; width: 100%; height: 100%; transform-style: preserve-3d; display: flex; align-items: center; justify-content: center;}

.mock-phone-premium { position: absolute; right: 10px; top: 5%; width: 200px; height: 380px; background: #0f172a; border: 6px solid #334155; border-radius: 36px; box-shadow: 30px 40px 60px rgba(0,0,0,0.6), inset 0 0 0 2px #000; overflow: hidden; z-index: 1; transform: rotateY(-18deg) rotateX(10deg); }
.phone-notch { position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 70px; height: 22px; background: #334155; border-bottom-left-radius: 16px; border-bottom-right-radius: 16px; z-index: 10; }
.phone-screen-inner { background: linear-gradient(180deg, #1e293b, #020617); width: 100%; height: 100%; padding: 45px 20px 20px; position: relative; }
.screen-header { font-size: 0.85rem; color: #94a3b8; font-weight: 800; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center; }
.screen-header span { background: #3b82f6; color: #fff; padding: 2px 6px; border-radius: 6px; font-size: 0.65rem; box-shadow: 0 2px 4px rgba(59,130,246,0.3); }
.balance-box { background: rgba(255,255,255,0.05); padding: 18px 16px; border-radius: 20px; margin-bottom: 24px; border: 1px solid rgba(255,255,255,0.08); backdrop-filter: blur(10px); }
.balance-box span { font-size: 0.75rem; color: #94a3b8; display: block; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px;}
.balance-box h2 { font-size: 1.8rem; color: #fff; font-weight: 900; margin: 0; }
.txn-bars-wrap { display: flex; flex-direction: column; gap: 12px; }
.txn-bars { height: 45px; background: rgba(255,255,255,0.03); border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); }
.txn-bars.short { height: 60px; background: rgba(59,130,246,0.05); border-color: rgba(59,130,246,0.1); }
.txn-bars.mid { height: 50px; background: rgba(16,185,129,0.05); border-color: rgba(16,185,129,0.1); }

.float-card { position: absolute; width: 220px; height: 140px; border-radius: 20px; box-shadow: -15px 25px 45px rgba(0,0,0,0.5); padding: 24px; display: flex; flex-direction: column; justify-content: space-between; border: 1px solid rgba(255,255,255,0.2); backdrop-filter: blur(4px); }
.metallic-blue { top: 20%; left: -30px; background: linear-gradient(135deg, rgba(37,99,235,0.85), rgba(30,58,138,0.95)); z-index: 3; }
.metallic-gold { bottom: 15%; right: 40px; background: linear-gradient(135deg, rgba(245,158,11,0.9), rgba(180,83,9,0.95)); z-index: 4; }
.card-chip { width: 40px; height: 30px; background: linear-gradient(135deg, #e2e8f0, #cbd5e1); border-radius: 6px; opacity: 0.9; position: relative; overflow: hidden; }
.card-chip::after { content:''; position: absolute; top:50%; box-shadow: 0 0 0 1px rgba(0,0,0,0.1); width: 100%; height: 1px;}
.card-num { color: #f8fafc; font-family: 'Courier New', monospace; font-size: 1.1rem; font-weight: bold; letter-spacing: 2px; text-shadow: 0 2px 4px rgba(0,0,0,0.3); }
.card-logo { align-self: flex-end; font-size: 0.9rem; font-weight: 800; font-style: italic; opacity: 0.8; }

.float-coin { position: absolute; bottom: 35%; left: 0px; width: 70px; height: 70px; background: radial-gradient(circle at 30% 30%, #fef08a, #ca8a04); border-radius: 50%; box-shadow: 0 15px 30px rgba(0,0,0,0.4), inset 0 -4px 10px rgba(0,0,0,0.3), inset 0 4px 10px rgba(255,255,255,0.6); display: flex; align-items: center; justify-content: center; font-size: 2.2rem; font-weight: 950; color: #fff; text-shadow: 0 2px 4px rgba(0,0,0,0.3); z-index: 5; border: 2px solid #fde047; }

/* Partners */
.partners-section { padding: 80px 5%; background: #fff; }
.partners-section .container { max-width: 1000px; margin: 0 auto; text-align: center; }
.glow-title { font-size: 3rem; font-weight: 950; background: linear-gradient(135deg, #0f172a, #1e3a8a, #3b82f6, #0f172a); background-size: 300% 300%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: flow 8s infinite linear; }
@keyframes flow { 0% { background-position: 0% 50%; } 100% { background-position: 100% 50%; } }
.tabs { display: flex; justify-content: center; gap: 12px; margin: 40px 0; flex-wrap: wrap; }
.tabs button {
  padding: 12px 25px;
  border-radius: 12px;
  border: 1px solid #cbd5e1;
  background: #fff;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s;
  color: #0f172a;
  -webkit-text-fill-color: #0f172a;
}
.tabs button:hover:not(.active) {
  border-color: var(--color, #94a3b8);
  color: var(--color, #0f172a);
  -webkit-text-fill-color: var(--color, #0f172a);
  background: #f8fafc;
}
.tabs button.active {
  background: var(--color);
  color: #fff;
  -webkit-text-fill-color: #fff;
  border-color: var(--color);
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}
.partner-card { display: flex; flex-wrap: wrap; background: #fff; border: 1px solid #eee; border-radius: 30px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.05); }
.image-side { flex: 1 1 40%; height: 350px; position: relative; }
.image-side::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to top, var(--color), transparent); opacity: 0.3; }
.image-side img { width: 100%; height: 100%; object-fit: cover; }
.info-side { flex: 1 1 60%; padding: 40px; text-align: left; display: flex; flex-direction: column; justify-content: center; }
.info-side h3 { font-size: 2.2rem; font-weight: 900; margin-bottom: 20px; }
.info-side p { font-size: 1.1rem; color: #64748b; margin-bottom: 30px; line-height: 1.6; }
.info-side button { border: none; padding: 15px 35px; border-radius: 12px; color: #fff; font-weight: 800; font-size: 1rem; cursor: pointer; width: fit-content; transition: 0.2s; }
.info-side button:hover { transform: translateY(-2px); opacity: 0.9; }

@media (max-width: 900px) {
    .rp-hero { flex-direction: column; text-align: center; padding-top: 150px; }
    .hero-actions { justify-content: center; }
    .rp-hero__visuals-inner { height: 350px; margin-top: 40px; }
    .visuals-wrapper-flex { transform: scale(0.6); gap: 20px; margin-top: 0; }
    .grid-row-3, .grid-row-2 { grid-template-columns: 1fr; }
    .info-side { text-align: center; align-items: center; }
}
`;
