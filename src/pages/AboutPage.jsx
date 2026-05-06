import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Zap, ShieldCheck, Users, Target, Eye, ArrowLeft } from 'lucide-react';
const ujjwalPayLogo = '/ujjwalpay-logo-2.png';
import IndiaMapData from '@svg-maps/india';

function IndiaMapSVG() {
    return (
        <div style={{ position: 'relative', width: '100%', maxWidth: '480px', filter: 'drop-shadow(0 20px 50px rgba(37,99,235,0.15))' }}>
            <svg
                viewBox={IndiaMapData.viewBox}
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: '100%', height: 'auto' }}
            >
                <defs>
                    <linearGradient id="mapGradB" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#dde6f5" />
                        <stop offset="100%" stopColor="#c8d5ee" />
                    </linearGradient>
                    <filter id="delhiGlowB" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="rgba(220,38,38,0.8)" />
                    </filter>
                </defs>
                {IndiaMapData.locations.map((loc) => (
                    loc.id === 'dl' ? (
                        <path
                            key={loc.id}
                            d={loc.path}
                            fill="#dc2626"
                            stroke="#fff"
                            strokeWidth="1"
                            filter="url(#delhiGlowB)"
                        >
                            <animate attributeName="opacity" values="1;0.7;1" dur="1.8s" repeatCount="indefinite" />
                        </path>
                    ) : (
                        <path
                            key={loc.id}
                            d={loc.path}
                            fill="url(#mapGradB)"
                            stroke="#9baed0"
                            strokeWidth="0.5"
                        />
                    )
                ))}
                <circle cx="198" cy="196" r="10" fill="none" stroke="#dc2626" strokeWidth="2">
                    <animate attributeName="r" values="8;20;8" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite" />
                </circle>
                <text x="210" y="192" fontSize="12" fontWeight="900" fill="#dc2626" fontFamily="Inter, sans-serif">Delhi</text>
            </svg>
        </div>
    );
}

function FlipCard({ card }) {
    const [flipped, setFlipped] = useState(false);

    return (
        <div
            style={{
                perspective: "1000px",
                width: "280px",
                height: "360px",
                cursor: "pointer",
                flexShrink: 0,
            }}
            onMouseEnter={() => setFlipped(true)}
            onMouseLeave={() => setFlipped(false)}
        >
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    transformStyle: "preserve-3d",
                    transition: "transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
                    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
            >
                {/* FRONT */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        background: card.previewBg,
                        borderRadius: "20px",
                        padding: "36px 28px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
                        border: "1px solid rgba(0,0,0,0.06)",
                    }}
                >
                    <div
                        style={{
                            width: "68px",
                            height: "68px",
                            borderRadius: "50%",
                            background: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "28px",
                            marginBottom: "24px",
                            boxShadow: `0 4px 16px ${card.accentColor}30`,
                        }}
                    >
                        {card.icon}
                    </div>
                    <h2
                        style={{
                            fontSize: "22px",
                            fontWeight: "800",
                            color: "#1a1f36",
                            margin: "0 0 14px 0",
                            fontFamily: "'Inter', sans-serif",
                            letterSpacing: "-0.3px",
                        }}
                    >
                        {card.title}
                    </h2>
                    <p
                        style={{
                            fontSize: "14px",
                            lineHeight: "1.7",
                            color: "#6b7280",
                            margin: 0,
                        }}
                    >
                        {card.description}
                    </p>
                </div>

                {/* BACK */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        background: "#fdf6ee",
                        borderRadius: "20px",
                        overflow: "hidden",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                        border: "1px solid rgba(0,0,0,0.06)",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <div
                        style={{
                            background: card.backBg,
                            padding: "22px 24px",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                        }}
                    >
                        <span style={{ fontSize: "20px" }}>{card.icon}</span>
                        <span
                            style={{
                                color: "white",
                                fontWeight: "800",
                                fontSize: "17px",
                                fontFamily: "'Inter', sans-serif",
                                letterSpacing: "0.3px",
                            }}
                        >
                            {card.logo}
                        </span>
                    </div>

                    <div style={{ padding: "24px 24px 28px", flex: 1, display: "flex", flexDirection: "column" }}>
                        <h3
                            style={{
                                fontSize: "20px",
                                fontWeight: "800",
                                color: "#1a1f36",
                                margin: "0 0 10px 0",
                                fontFamily: "'Inter', sans-serif",
                            }}
                        >
                            {card.title}
                        </h3>
                        <p
                            style={{
                                fontSize: "13.5px",
                                lineHeight: "1.7",
                                color: "#555",
                                margin: "0 0 auto 0",
                            }}
                        >
                            {card.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

const benefits = [
    {
        id: 1,
        icon: "📱",
        title: "Set-up your digital business from phone or laptop",
        description: "Operate from anywhere -- your home or shop. No inventory, no warehouse, no manpower required.",
        frontGradient: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
        backGradient: "linear-gradient(145deg, #f8fafc 0%, #e2e8f0 100%)",
        accent: "#3b82f6",
        tag: "Easy Start",
        number: "01",
    },
    {
        id: 2,
        icon: "🏦",
        title: "Multi-service distribution from one platform",
        description: "Offer Banking, Payments, Travel, Insurance, Bill Payments & Recharge services from one platform.",
        frontGradient: "linear-gradient(145deg, #ffffff 0%, #f0fdf4 100%)",
        backGradient: "linear-gradient(145deg, #f0fdf4 0%, #dcfce7 100%)",
        accent: "#10b981",
        tag: "All-in-One",
        number: "02",
    },
    {
        id: 3,
        icon: "💰",
        title: "Earn ₹40,000 to ₹60,000 per month",
        description: "With just 5-7 retailers in your network you can easily add an extra ₹40000 to ₹60000 income per month.",
        frontGradient: "linear-gradient(145deg, #ffffff 0%, #fdf4ff 100%)",
        backGradient: "linear-gradient(145deg, #fdf4ff 0%, #fae8ff 100%)",
        accent: "#d946ef",
        tag: "High Income",
        number: "03",
    },
    {
        id: 4,
        icon: "⚡",
        title: "One time onboarding",
        description: "Simple and easy on-boarding process for your network. Retailers once on-boarded can use any service.",
        frontGradient: "linear-gradient(145deg, #ffffff 0%, #fffbeb 100%)",
        backGradient: "linear-gradient(145deg, #fffbeb 0%, #fef3c7 100%)",
        accent: "#f59e0b",
        tag: "Simple Process",
        number: "04",
    },
    {
        id: 5,
        icon: "♾️",
        title: "Lifetime Income",
        description: "Earn best in industry commission on every transaction your retailer makes.",
        frontGradient: "linear-gradient(145deg, #ffffff 0%, #f0f9ff 100%)",
        backGradient: "linear-gradient(145deg, #f0f9ff 0%, #e0f2fe 100%)",
        accent: "#0ea5e9",
        tag: "Forever Earnings",
        number: "05",
    },
];

function BenefitFlipCard({ card, index }) {
    const [flipped, setFlipped] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), index * 150);
        return () => clearTimeout(t);
    }, [index]);

    return (
        <div
            style={{
                perspective: "1200px",
                width: "100%",
                height: "360px",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0) scale(1)" : "translateY(60px) scale(0.92)",
                transition: `opacity 0.7s ease ${index * 0.1}s, transform 0.7s cubic-bezier(0.34,1.2,0.64,1) ${index * 0.1}s`,
            }}
            onMouseEnter={() => setFlipped(true)}
            onMouseLeave={() => setFlipped(false)}
        >
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    transformStyle: "preserve-3d",
                    transition: "transform 0.75s cubic-bezier(0.4, 0, 0.2, 1)",
                    transform: flipped ? "rotateX(180deg)" : "rotateX(0deg)",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        borderRadius: "22px",
                        background: card.frontGradient,
                        border: `1px solid ${card.accent}33`,
                        padding: "30px 24px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        overflow: "hidden",
                    }}
                >
                    <div style={{
                        position: "absolute",
                        bottom: "-10px",
                        right: "16px",
                        fontSize: "100px",
                        fontWeight: "900",
                        color: "rgba(0,0,0,0.03)",
                        fontFamily: "sans-serif",
                        lineHeight: 1,
                        userSelect: "none",
                    }}>{card.number}</div>

                    <div style={{
                        position: "absolute",
                        top: "-40px", right: "-40px",
                        width: "150px", height: "150px",
                        borderRadius: "50%",
                        background: card.accent,
                        opacity: 0.12,
                        filter: "blur(50px)",
                        pointerEvents: "none",
                    }} />

                    <div>
                        <div style={{
                            display: "inline-block",
                            background: card.accent + "22",
                            border: `1px solid ${card.accent}55`,
                            borderRadius: "20px",
                            padding: "4px 14px",
                            fontSize: "10px",
                            fontWeight: "800",
                            letterSpacing: "1.5px",
                            textTransform: "uppercase",
                            color: card.accent,
                            marginBottom: "18px",
                            fontFamily: "sans-serif",
                        }}>{card.tag}</div>

                        <div style={{
                            width: "50px", height: "50px",
                            borderRadius: "16px",
                            background: card.accent + "22",
                            border: `1px solid ${card.accent}44`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "22px",
                            marginBottom: "18px",
                        }}>{card.icon}</div>

                        <h3 style={{
                            fontSize: "18px",
                            fontWeight: "800",
                            color: "#0f172a",
                            margin: "0 0 10px",
                            fontFamily: "'Inter', sans-serif",
                            lineHeight: "1.3",
                        }}>{card.title}</h3>

                        <p style={{
                            fontSize: "13px",
                            color: "#475569",
                            lineHeight: "1.6",
                            margin: 0,
                            fontFamily: "sans-serif",
                        }}>{card.description.slice(0, 95)}...</p>
                    </div>

                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        color: card.accent,
                        fontSize: "12px",
                        fontWeight: "700",
                        fontFamily: "sans-serif",
                    }}>
                        <span>Hover to flip</span>
                        <span style={{ fontSize: "16px" }}>↕</span>
                    </div>
                </div>

                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateX(180deg)",
                        borderRadius: "22px",
                        background: card.backGradient,
                        border: `1px solid ${card.accent}55`,
                        padding: "30px 24px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        overflow: "hidden",
                        boxShadow: `0 0 40px ${card.accent}44, inset 0 1px 0 rgba(255,255,255,0.1)`,
                    }}
                >
                    <div style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 60%)",
                        borderRadius: "22px",
                        pointerEvents: "none",
                    }} />

                    <div style={{
                        position: "absolute",
                        bottom: "-40px", left: "-40px",
                        width: "200px", height: "200px",
                        borderRadius: "50%",
                        background: card.accent,
                        opacity: 0.2,
                        filter: "blur(60px)",
                        pointerEvents: "none",
                    }} />

                    <div style={{
                        width: "44px", height: "44px",
                        borderRadius: "14px",
                        background: "rgba(255,255,255,0.15)",
                        border: "1px solid rgba(255,255,255,0.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "20px",
                        marginBottom: "16px",
                    }}>{card.icon}</div>

                    <div style={{ flex: 1 }}>
                        <h3 style={{
                            fontSize: "17px",
                            fontWeight: "900",
                            color: "#0f172a",
                            margin: "0 0 10px",
                            fontFamily: "'Inter', sans-serif",
                        }}>{card.title}</h3>

                        <p style={{
                            fontSize: "13px",
                            color: "#475569",
                            lineHeight: "1.7",
                            margin: 0,
                            fontFamily: "sans-serif",
                        }}>{card.description}</p>
                    </div>

                    <div style={{
                        display: "flex",
                        gap: "10px",
                        marginTop: "16px"
                    }}>
                        <button style={{
                            flex: 1,
                            padding: "10px 0",
                            background: card.accent,
                            border: "none",
                            borderRadius: "10px",
                            color: "white",
                            fontWeight: "700",
                            fontSize: "12px",
                            cursor: "pointer",
                            fontFamily: "sans-serif",
                        }}>Start Now →</button>
                        <button style={{
                            flex: 1,
                            padding: "10px 0",
                            background: "transparent",
                            border: `1px solid rgba(0,0,0,0.1)`,
                            borderRadius: "10px",
                            color: "#0f172a",
                            fontWeight: "800",
                            fontSize: "12px",
                            cursor: "pointer",
                            fontFamily: "sans-serif",
                        }}>Learn More</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function PartnershipBenefitsSection() {
    const [mouse, setMouse] = useState({ x: -999, y: -999 });
    const [mounted, setMounted] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => setMounted(true), []);

    const handleMouseMove = (e) => {
        setMouse({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => {
        setMouse({ x: -999, y: -999 });
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                background: "#05060f",
                padding: "100px 24px 100px",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <style>{`
                @keyframes badgePulse {
                    0%,100% { box-shadow: 0 0 0 0 rgba(255,255,255,0.15); }
                    50% { box-shadow: 0 0 0 8px rgba(255,255,255,0); }
                }
                @keyframes titleShine {
                    0% { background-position: 0% 50%; }
                    100% { background-position: 200% 50%; }
                }
            `}</style>

            <div
                style={{
                    position: "fixed",
                    left: mouse.x,
                    top: mouse.y,
                    width: "500px",
                    height: "500px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0)",
                    transform: "translate(-50%, -50%)",
                    pointerEvents: "none",
                    zIndex: 0,
                    transition: "left 0.1s, top 0.1s",
                }}
            />

            <div style={{ position: "relative", zIndex: 1, maxWidth: "1250px", margin: "0 auto" }}>
                <div
                    style={{
                        textAlign: "center",
                        marginBottom: "70px",
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? "translateY(0)" : "translateY(-24px)",
                        transition: "all 0.9s ease",
                    }}
                >
                    <div
                        style={{
                            display: "inline-block",
                            border: "1px solid rgba(255,255,255,0.2)",
                            borderRadius: "30px",
                            padding: "6px 22px",
                            color: "rgba(255,255,255,0.7)",
                            fontSize: "11px",
                            fontWeight: "800",
                            letterSpacing: "3px",
                            textTransform: "uppercase",
                            fontFamily: "Inter, sans-serif",
                            marginBottom: "24px",
                            animation: "badgePulse 2.5s ease-in-out infinite",
                        }}
                    >
                        ✦ Opportunities
                    </div>

                    <h2
                        style={{
                            fontSize: "clamp(36px, 5vw, 56px)",
                            fontWeight: "900",
                            margin: "0 0 20px",
                            fontFamily: "'Inter', sans-serif",
                            color: "white",
                            lineHeight: "1.15",
                            letterSpacing: "-1px"
                        }}
                    >
                        Partnership{" "}
                        <span
                            style={{
                                background: "linear-gradient(90deg, #e94560, #f72585, #7b2d8b, #533483, #00b4d8, #52b788, #fcbf49, #e94560)",
                                backgroundSize: "300% 100%",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                                animation: "titleShine 6s linear infinite",
                            }}
                        >
                            Benefits
                        </span>
                    </h2>

                    <p
                        style={{
                            color: "rgba(255,255,255,0.5)",
                            fontSize: "17px",
                            maxWidth: "540px",
                            margin: "0 auto",
                            lineHeight: "1.75",
                            fontFamily: "Inter, sans-serif",
                        }}
                    >
                        Join our growing network and unlock financial services — all from a single platform.
                    </p>

                    <div
                        style={{
                            width: mounted ? "80px" : "0",
                            height: "4px",
                            borderRadius: "4px",
                            background: "linear-gradient(90deg, #e94560, #00b4d8)",
                            margin: "32px auto 0",
                            transition: "width 1s ease 0.6s",
                        }}
                    />
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                        gap: "24px",
                    }}
                >
                    {benefits.map((card, i) => (
                        <BenefitFlipCard key={card.id} card={card} index={i} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function ThreeDImageCarousel({ slides, autoplay = true, delay = 4, className = "" }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!autoplay) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, delay * 1000);
        return () => clearInterval(interval);
    }, [autoplay, delay, slides.length]);

    return (
        <div className={`three-d-carousel ${className}`}>
            <div className="three-d-track">
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
                                onClick={() => setCurrentIndex(i)}
                                style={{ cursor: 'pointer' }}
                                initial={false}
                                animate={{
                                    x: offset * 150, 
                                    scale: 1 - Math.abs(offset) * 0.15,
                                    opacity: 1 - Math.abs(offset) * 0.4,
                                    zIndex: 10 - Math.abs(offset)
                                }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <div className="carousel-service-card" style={{ background: slide.bg }}>
                                    <div className="card-icon-container">
                                        {slide.isImage ? (
                                            <img src={slide.logo} alt={slide.title} className="card-logo-img" />
                                        ) : (
                                            <span style={{ color: slide.color }}>{slide.logo}</span>
                                        )}
                                    </div>
                                    <h3 style={{ color: slide.color }}>{slide.title}</h3>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
}

const MV_CARDS = [
    {
        id: 'mission',
        title: 'Our Mission',
        icon: Target,
        bg: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
        text: 'Our mission is to bridge the gap between financial services and underserved communities by providing secure, innovative, and easy-to-use digital payment solutions. We aim to create employment opportunities for youth and support individuals without income by enabling them to start and grow their own digital business through our platform.',
    },
    {
        id: 'vision',
        title: 'Our Vision',
        icon: Eye,
        bg: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)',
        text: 'To build a financially inclusive digital ecosystem by delivering reliable and accessible fintech services across rural and urban India, empowering individuals and enabling sustainable livelihood opportunities for every aspiring entrepreneur.',
    },
];

function MissionVisionSlider() {
    const [idx, setIdx] = useState(0);
    const [dir, setDir] = useState(1);
    const card = MV_CARDS[idx];
    const Icon = card.icon;

    const go = (next) => {
        setDir(next > idx ? 1 : -1);
        setIdx(next);
    };

    return (
        <section id="mission-vision" style={{ padding: '80px 20px', background: '#f8fafc' }}>
            <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '32px' }}>
                    {MV_CARDS.map((c, i) => (
                        <button key={c.id} onClick={() => go(i)} style={{
                            width: i === idx ? '32px' : '10px', height: '10px',
                            borderRadius: '6px', border: 'none', cursor: 'pointer',
                            background: i === idx ? '#2563eb' : '#cbd5e1',
                            transition: 'all 0.3s'
                        }} />
                    ))}
                </div>

                <AnimatePresence mode="wait" custom={dir}>
                    <motion.div
                        key={card.id}
                        custom={dir}
                        initial={{ opacity: 0, x: dir * 80 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: dir * -80 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        style={{
                            background: card.bg,
                            borderRadius: '24px',
                            padding: '48px 40px',
                            color: '#fff',
                            boxShadow: '0 20px 60px rgba(30,64,175,0.25)',
                            minHeight: '220px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '20px',
                        }}
                    >
                        <div style={{
                            width: '64px', height: '64px', borderRadius: '16px',
                            background: 'rgba(255,255,255,0.15)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                        }}>
                            <Icon size={32} strokeWidth={2} color="#fff" />
                        </div>
                        <h3 style={{ fontSize: '1.75rem', fontWeight: '900', margin: 0, letterSpacing: '-0.5px' }}>{card.title}</h3>
                        <p style={{ fontSize: '1.05rem', lineHeight: '1.75', margin: 0, maxWidth: '580px', opacity: 0.92 }}>{card.text}</p>
                    </motion.div>
                </AnimatePresence>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '28px' }}>
                    <button onClick={() => go((idx - 1 + MV_CARDS.length) % MV_CARDS.length)} style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        padding: '10px 24px', borderRadius: '50px',
                        border: '2px solid #2563eb', background: '#fff',
                        color: '#2563eb', fontWeight: '800', fontSize: '0.85rem',
                        cursor: 'pointer', letterSpacing: '0.5px', transition: 'all 0.2s'
                    }}>← Prev</button>
                    <button onClick={() => go((idx + 1) % MV_CARDS.length)} style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        padding: '10px 24px', borderRadius: '50px',
                        border: '2px solid #2563eb', background: '#2563eb',
                        color: '#fff', fontWeight: '800', fontSize: '0.85rem',
                        cursor: 'pointer', letterSpacing: '0.5px', transition: 'all 0.2s'
                    }}>Next →</button>
                </div>
            </div>
        </section>
    );
}

const AboutPage = () => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [view, setView] = useState('hero');

    const mvContainerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: mvContainerRef,
        offset: ["start end", "end start"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 80,
        damping: 20,
        restDelta: 0.001
    });

    const missionScale = useTransform(smoothProgress, [0.15, 0.45], [1, 0.85]);
    const missionY = useTransform(smoothProgress, [0.15, 0.45], [0, -100]);
    const missionOpacity = useTransform(smoothProgress, [0.15, 0.45], [1, 0]);
    const missionBlur = "blur(0px)";

    const visionScale = useTransform(smoothProgress, [0.15, 0.5], [0.85, 1]);
    const visionY = useTransform(smoothProgress, [0.15, 0.5], [80, 0]);
    const visionOpacity = useTransform(smoothProgress, [0.15, 0.45], [0, 1]);
    const visionBlur = "blur(0px)";

    useEffect(() => {
        window.scrollTo(0, 0);
        const h = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', h);
        return () => window.removeEventListener('scroll', h);
    }, []);

    return (
        <div className="about-root modern">
            <style>{ABOUT_CSS}</style>
            
            <div className="bg-glow-1"></div><div className="bg-glow-2"></div>
            <div className="bg-glow-3"></div>

            <header className="about-hero-premium">
                <div className="about-hero-container">
                    <div className="hero-full-content">
                        <AnimatePresence mode="wait">
                            {view === 'hero' ? (
                                <motion.div
                                    key="hero-content"
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 50 }}
                                    transition={{ duration: 0.6 }}
                                    style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: '20px',
                                        width: '100%',
                                        flexWrap: 'wrap'
                                    }}
                                >
                                    <div className="hero-3d-side" style={{ 
                                        flex: '1.2', 
                                        height: '600px', 
                                        minWidth: '350px',
                                        position: 'relative',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.8, ease: 'easeOut' }}
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '32px',
                                                background: 'linear-gradient(135deg, #f0f6ff 0%, #e8f0fe 50%, #f5f0ff 100%)',
                                                borderRadius: '36px',
                                                padding: '60px 50px',
                                                boxShadow: '0 30px 80px rgba(37,99,235,0.12), 0 0 0 1px rgba(37,99,235,0.08)',
                                                width: '100%',
                                                maxWidth: '460px'
                                            }}
                                        >
                                            <img
                                                src={ujjwalPayLogo}
                                                alt="Ujjwal Pay"
                                                style={{
                                                    width: '300px',
                                                    height: 'auto',
                                                    objectFit: 'contain',
                                                    filter: 'drop-shadow(0 12px 32px rgba(37,99,235,0.18))'
                                                }}
                                            />
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                                <span style={{ fontSize: '1rem', fontWeight: '800', color: '#1e3a8a', letterSpacing: '3px', textTransform: 'uppercase' }}>FINTECH PVT LTD</span>
                                                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#64748b', letterSpacing: '1px' }}>Har Transaction Mein Vishwas</span>
                                            </div>
                                        </motion.div>
                                    </div>

                                    <div className="hero-text-side" style={{ 
                                        flex: '1', 
                                        minWidth: '350px', 
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'flex-start'
                                    }}>
                                        <span className="about-tag">Founded 2026</span>
                                        <h1 className="about-h1 partners-title-glow" style={{ textAlign: 'left', fontSize: 'clamp(3rem, 5vw, 4.5rem)', margin: '20px 0' }}>
                                            Bharat's Leading<br />
                                            <span className="text-shimmer">Fintech Revolution</span>
                                        </h1>
                                        <p className="about-sub" style={{ textAlign: 'left', margin: '0 0 40px', fontSize: '1.25rem' }}>
                                            Ujjwal Pay is committed to bringing banking and digital financial services to the doorstep of every rural and semi-urban citizen.
                                        </p>
                                        <div className="hero-actions" style={{ display: 'flex', gap: '20px' }}>
                                            <button className="rp-btn rp-btn--primary rp-btn--lg rp-btn--pulse" onClick={() => setView('genesis')}>
                                                Our Evolution <span className="btn-arrow-bounce">↓</span>
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="genesis-content"
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                    style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: '60px',
                                        width: '100%',
                                        flexWrap: 'wrap'
                                    }}
                                >
                                    <div className="genesis-image-side" style={{ flex: '1', minWidth: '320px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <IndiaMapSVG />
                                    </div>

                                    <div className="genesis-text-side" style={{ flex: '1', minWidth: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <span className="section-label">The Journey</span>
                                        <h2 className="section-title-dissolve" style={{ textAlign: 'left', margin: '15px 0 25px' }}>Expanding Root to <span style={{ color: '#2563eb' }}>National Scale</span></h2>
                                        <p className="about-sub-plain" style={{ textAlign: 'left', margin: '0 0 20px', fontSize: '1.15rem', fontWeight: '500' }}>
                                            Founded in 2026, Operating from our main office in <strong>Delhi</strong>, we are working tirelessly to connect every community.
                                        </p>
                                        <p className="about-sub-plain" style={{ textAlign: 'left', margin: '0 0 20px', fontSize: '1.15rem' }}>
                                            Our approach is deeply grassroots — moving <strong>village to village</strong> and city to city. We are gradually moving forward with a vision to bring our digital revolution to <strong>every corner of India</strong>.
                                        </p>
                                        <div className="story-features-mini" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', margin: '30px 0' }}>
                                            <div className="s-feat" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '800', color: '#1a1f36' }}><Zap size={20} color="#2563eb" /> Innovation Driven</div>
                                            <div className="s-feat" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '800', color: '#1a1f36' }}><ShieldCheck size={20} color="#10b981" /> Secure Infrastructure</div>
                                            <div className="s-feat" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '800', color: '#1a1f36' }}><Users size={20} color="#f59e0b" /> Citizen Centric</div>
                                        </div>
                                        <div className="genesis-actions" style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
                                            <button className="back-btn-minimal" style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontWeight: '700', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px', transition: 'color 0.3s' }} onClick={() => setView('hero')}>
                                                <ArrowLeft size={18} strokeWidth={3} /> Back to Overview
                                            </button>
                                            <button className="rp-btn rp-btn--primary" style={{ padding: '12px 30px' }} onClick={() => document.getElementById('mission-vision')?.scrollIntoView({ behavior: 'smooth' })}>
                                                Explore Our Future
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </header>

            <MissionVisionSlider />

            <section className="values-section">
                <div className="about-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
                    <div className="section-header-center" style={{ marginBottom: '60px', textAlign: 'center' }}>
                        <span className="section-label" style={{ color: '#4f6ef7', letterSpacing: '4px', textTransform: 'uppercase', fontWeight: '800', background: 'rgba(79, 110, 247, 0.1)', padding: '8px 16px', borderRadius: '30px', display: 'inline-flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>✨ Our Values</span>
                        <h2 className="section-title-dissolve" style={{ fontSize: '3.2rem', fontWeight: '900', color: '#1a1f36', marginTop: '20px', fontFamily: "'Inter', sans-serif", letterSpacing: '-1.5px' }}>
                            Principles That <span style={{ color: '#4f6ef7' }}>Guide Us</span>
                        </h2>
                        <p className="about-sub-plain" style={{ margin: '20px auto 0', textAlign: 'center', fontSize: '1.2rem', color: '#6b7280', maxWidth: '650px', lineHeight: '1.8' }}>
                            At <strong>Ujjwal Pay</strong>, our core values shape everything we do – from product development to customer service.
                        </p>
                    </div>
                </div>

                <div className="values-slider-wrapper">
                    <div className="values-slider">
                        {[...Array(4)].map((_, setIdx) => (
                            <React.Fragment key={setIdx}>
                                <FlipCard card={{
                                    icon: "❤️",
                                    title: "Customer First",
                                    description: "We place our customers at the center of everything we do.",
                                    previewBg: "#f0f4ff",
                                    accentColor: "#4f6ef7",
                                    backBg: "#1a1f36",
                                    logo: "Ujjwal Pay"
                                }} />
                                <FlipCard card={{
                                    icon: "💡",
                                    title: "Innovation",
                                    description: "We constantly explore new technologies and approaches.",
                                    previewBg: "#fff4f0",
                                    accentColor: "#f76f4f",
                                    backBg: "#1a2a36",
                                    logo: "Ujjwal Pay"
                                }} />
                                <FlipCard card={{
                                    icon: "🤝",
                                    title: "Integrity",
                                    description: "We operate with transparency, honesty, and ethical conduct.",
                                    previewBg: "#f0fff4",
                                    accentColor: "#4fb87f",
                                    backBg: "#1a3628",
                                    logo: "Ujjwal Pay"
                                }} />
                                <FlipCard card={{
                                    icon: "🏆",
                                    title: "Excellence",
                                    description: "We pursue the highest standards of quality.",
                                    previewBg: "#f4f0ff",
                                    accentColor: "#8b4ff7",
                                    backBg: "#2a1a36",
                                    logo: "Ujjwal Pay"
                                }} />
                                <FlipCard card={{
                                    icon: "🌍",
                                    title: "Inclusivity",
                                    description: "We are committed to creating products for all.",
                                    previewBg: "#fff0f8",
                                    accentColor: "#f74fa1",
                                    backBg: "#361a29",
                                    logo: "Ujjwal Pay"
                                }} />
                                <FlipCard card={{
                                    icon: "👥",
                                    title: "Collaboration",
                                    description: "We believe in the power of partnerships.",
                                    previewBg: "#f0fdf4",
                                    accentColor: "#4fa8f7",
                                    backBg: "#1a2a36",
                                    logo: "Ujjwal Pay"
                                }} />
                            </React.Fragment>
                        ))}
                    </div>

                    <div className="slider-hint" style={{ textAlign: 'center', marginTop: '20px' }}>
                        <span className="drag-indicator" style={{ opacity: 0.6, fontSize: '0.9rem', letterSpacing: '2px' }}>← Swipe or drag to explore →</span>
                    </div>
                </div>
            </section>

            <section style={{ padding: '80px 0', background: '#f8fafc' }}>
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0a2357' }}>Our Digital Solutions</h2>
                    <p style={{ color: '#64748b' }}>Experience the 3D Services Layout</p>
                </div>
                <div className="services-layout-full">
                    <ThreeDImageCarousel 
                        slides={[
                            { id: 1, logo: "📱", title: "Mobile Recharge", bg: "#eff6ff", color: "#1d4ed8" },
                            { id: 2, logo: "🏠", title: "Bill Payment", bg: "#fefce8", color: "#ca8a04" },
                            { id: 3, logo: "💸", title: "Money Transfer", bg: "#ecfeff", color: "#0e7490" },
                            { id: 4, logo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/Aadhaar_Logo.svg/1200px-Aadhaar_Logo.svg.png", title: "AEPS + Withdraw", bg: "#f0fdf4", color: "#15803d", isImage: true },
                            { id: 5, logo: "🛡️", title: "Insurance", bg: "#faf5ff", color: "#7e22ce" },
                            { id: 6, logo: "🏛️", title: "Mini ATM", bg: "#fff1f2", color: "#e11d48" }
                        ]}
                        autoplay={true}
                        delay={3}
                        className="w-full h-full"
                    />
                </div>
            </section>

            <PartnershipBenefitsSection />
        </div >
    );
};

const ABOUT_CSS = `
:root {
    --accent: #2563eb;
    --dark: #0f172a;
    --grey: #64748b;
    --bg-light: #f8fafc;
    --white: #ffffff;
}

.about-root.modern {
    background: #ffffff;
    color: #0f172a;
    font-family: 'Inter', sans-serif;
    overflow-x: hidden;
}

/* Base Styles */
.rp-btn { display: inline-flex; align-items: center; gap: 12px; border-radius: 99px; font-weight: 800; cursor: pointer; border: none; transition: all 0.3s; font-family: inherit; }
.rp-btn--primary { background: var(--accent); color: #fff; box-shadow: 0 10px 20px rgba(37,99,235,0.2); }
.rp-btn--primary:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(37,99,235,0.4); }
.rp-btn--lg { padding: 18px 45px; font-size: 1.1rem; }
.rp-btn--sm { padding: 10px 24px; font-size: 0.85rem; }

/* Animation Utils */
.rp-btn--pulse { position: relative; overflow: hidden; }
.rp-btn--pulse::after {
    content: ''; position: absolute; top: 50%; left: 50%; width: 100%; height: 100%;
    background: rgba(255, 255, 255, 0.4); border-radius: 99px; transform: translate(-50%, -50%) scale(0);
    opacity: 0; animation: btnPulse 3s ease-out infinite;
}
@keyframes btnPulse { 0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; } 100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; } }
.btn-arrow-bounce { display: inline-block; animation: arrowBounce 1.5s ease-in-out infinite; font-size: 1.2rem; }
@keyframes arrowBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(6px); } }

/* Premium Background Glows */
.bg-glow-1 { position: absolute; top:-5%; left:-5%; width: 45%; height: 45%; background: radial-gradient(circle, rgba(59,130,246,0.1), transparent 70%); filter: blur(60px); z-index: 0; }
.bg-glow-2 { position: absolute; bottom:-10%; right:-5%; width: 50%; height: 50%; background: radial-gradient(circle, rgba(139,92,246,0.08), transparent 70%); filter: blur(60px); z-index: 0; }
.bg-glow-3 { position: absolute; top:40%; right:10%; width: 35%; height: 35%; background: radial-gradient(circle, rgba(245,158,11,0.05), transparent 70%); filter: blur(60px); z-index: 0; }

/* Hero Refined */
.about-hero-premium { min-height: 90vh; display: flex; align-items: center; position: relative; background: #fff; padding-top: 40px; }
.hero-full-content { display: flex; align-items: center; gap: 60px; max-width: 1300px; margin: 0 auto; width: 100%; flex-wrap: wrap; text-align: left; }
.about-h1 { font-size: clamp(2.8rem, 6vw, 4.8rem); font-weight: 950; line-height: 1.05; letter-spacing: -2.5px; margin-bottom: 24px; color: #0f172a; }
.about-sub { font-size: 1.25rem; color: #475569; max-width: 600px; line-height: 1.6; margin-bottom: 45px; font-weight: 500; }
.about-tag { font-size: 0.85rem; font-weight: 800; color: #2563eb; text-transform: uppercase; letter-spacing: 2px; background: #eff6ff; padding: 10px 24px; border-radius: 99px; display: inline-block; margin-bottom: 28px; box-shadow: 0 4px 12px rgba(37,99,235,0.08); }

.about-tag { font-size: 0.85rem; font-weight: 800; color: var(--accent); text-transform: uppercase; letter-spacing: 2px; background: #eff6ff; padding: 8px 24px; border-radius: 99px; display: inline-block; margin-bottom: 24px; }

.text-shimmer {
    background: linear-gradient(90deg, #1d4ed8, #7c3aed, #1d4ed8);
    background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    animation: shimmerText 5s linear infinite;
}
@keyframes shimmerText { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }

.about-section { padding: 100px 0; }
.mv-section-tight { padding: 150px 0 20px; }
.light-bg { background: var(--bg-light); }
.section-label { color: var(--accent); font-weight: 800; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 20px; display: flex; align-items: center; gap: 8px; }
.section-title-dissolve { font-size: clamp(2.2rem, 5vw, 3.2rem); font-weight: 950; line-height: 1.15; margin-bottom: 24px; letter-spacing: -1.5px; }
.about-sub-plain { font-size: 1.1rem; color: #475569; max-width: 650px; line-height: 1.7; margin-bottom: 20px; }

.mv-scroll-stack { display: flex; flex-direction: column; align-items: center; width: 100%; max-width: 800px; margin: 0 auto; position: relative; height: 320px; }
.mv-sticky-wrapper { position: sticky; top: 250px; width: 100%; display: flex; justify-content: center; align-items: flex-start; }
.mv-card-premium { width: 100%; max-width: 700px; height: 280px; background: #ffffff; padding: 45px; border-radius: 40px; display: flex; align-items: center; gap: 35px; box-shadow: 0 25px 60px -15px rgba(0,0,0,0.06), inset 0 0 0 1px rgba(0,0,0,0.03); border: none; }
.mv-card-premium.vision { background: linear-gradient(135deg, #0f172a, #1e3a8a); color: #fff; z-index: 10; box-shadow: 0 40px 80px -20px rgba(15,23,42,0.3); }
.mv-icon-box { flex-shrink: 0; width: 100px; height: 100px; background: #eff6ff; border-radius: 32px; display: flex; align-items: center; justify-content: center; color: #2563eb; }
.vision .mv-icon-box { background: rgba(255,255,255,0.08); color: #fff; border: 1px solid rgba(255,255,255,0.1); }
.mv-content-box h3 { font-size: 2.2rem; font-weight: 950; margin-bottom: 14px; color: #0f172a; letter-spacing: -0.5px; }
.vision .mv-content-box h3 { color: #fff; }
.mv-content-box p { font-size: 1.15rem; line-height: 1.7; color: #64748b; font-weight: 500; }
.vision .mv-content-box p { color: rgba(255,255,255,0.85); }

.values-section { padding: 100px 0; background: linear-gradient(135deg, #f8f9ff 0%, #fff8f2 100%); overflow-x: hidden; }
.values-slider-wrapper { width: 100%; position: relative; overflow: hidden; padding: 20px 0 60px; }
.values-slider { display: flex; gap: 30px; width: max-content; animation: infiniteScrollMarquee 35s linear infinite; }
.values-slider:hover { animation-play-state: paused; }
@keyframes infiniteScrollMarquee { 0% { transform: translateX(0); } 100% { transform: translateX(-2100px); } }

.partners-title-glow {
  background: linear-gradient(135deg, #0f172a, #1e3a8a, #3b82f6, #0f172a);
  background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  animation: partnersGlowShine 6s linear infinite;
}
@keyframes partnersGlowShine { 0% { background-position: 0% center; } 100% { background-position: 200% center; } }

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
`;

export default AboutPage;
