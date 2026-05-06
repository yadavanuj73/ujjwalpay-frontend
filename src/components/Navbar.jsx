import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import brandLogo from '../assets/UjjwalPay_brand_logo.png';

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [menu, setMenu] = useState(false);

    const go = (path) => {
        navigate(path);
        setMenu(false);
    };

    const handleLogoClick = () => {
        if (location.pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            navigate('/');
        }
        setMenu(false);
    };

    const linkCls = (path) =>
        `dogma-nav__link ${location.pathname === path ? 'active' : ''}`;

    const isAbout = location.pathname === '/about';
    const isHome = location.pathname === '/';

    return (
        <nav className="dogma-nav">
            <style>{NAV_CSS}</style>
            
            {/* Top Header Section */}
            <div className="dogma-header">
                <div className="dogma-header__inner">
                    {/* Logo */}
                    <div className="dogma-header__logo" onClick={handleLogoClick}>
                        <img
                            src="/ujjwalpay logo.png"
                            alt="UjjwalPay"
                            className="dogma-header__logo-img"
                            width={100}
                            height={80}
                            decoding="async"
                        />
                    </div>
                    
                    {/* Brand Text */}
                    <div className="dogma-header__brand">
                        <h1 className="dogma-header__brand-title">UjjwalPay</h1>
                        <p className="dogma-header__brand-tagline">ग्राहक नहीं दोस्त बनाते हैं हम</p>
                        <p className="dogma-header__brand-subtitle">Digital Banking & Fintech Solutions</p>
                    </div>
                    
                    {/* Contact */}
                    <div className="dogma-header__contact">
                        <div className="dogma-header__contact-icon">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="#c41e3a">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                            </svg>
                        </div>
                        <div className="dogma-header__contact-info">
                            <span className="dogma-header__contact-label">Call Us</span>
                            <span className="dogma-header__contact-number">+91 88628 08140</span>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Navigation Strip */}
            <div className="dogma-strip">
                <div className="dogma-strip__inner">
                    <div className="dogma-strip__nav">
                        <button type="button" className={linkCls('/')} onClick={() => navigate('/')}>
                            Home
                        </button>
                        <button type="button" className={linkCls('/services')} onClick={() => navigate('/services')}>
                            Services
                        </button>
                        <button type="button" className={linkCls('/about')} onClick={() => navigate('/about')}>
                            About
                        </button>
                        <button type="button" className={linkCls('/leadership')} onClick={() => navigate('/leadership')}>
                            Leadership
                        </button>
                        <button type="button" className={linkCls('/contact')} onClick={() => navigate('/contact')}>
                            Contact
                        </button>
                    </div>
                    
                    <div className="dogma-strip__actions">
                        <button
                            type="button"
                            className={`dogma-btn dogma-btn--login ${isAbout ? 'dogma-btn--login-about' : ''} ${isHome ? 'dogma-btn--login-home' : ''}`}
                            onClick={() => navigate('/portal')}
                        >
                            Login
                        </button>
                        <button type="button" className="dogma-btn dogma-btn--primary" onClick={() => navigate('/portal')}>
                            Get Started
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button
                type="button"
                className={`dogma-burger ${menu ? 'dogma-burger--active' : ''}`}
                onClick={() => setMenu((m) => !m)}
                aria-label="Toggle menu"
            >
                <span />
                <span />
                <span />
            </button>

            {/* Mobile Menu */}
            <div className={`dogma-mobile ${menu ? 'dogma-mobile--open' : ''}`}>
                <div className="dogma-mobile__inner">
                    <button type="button" className="dogma-mobile__link" onClick={() => go('/')}>
                        Home
                    </button>
                    <button type="button" className="dogma-mobile__link" onClick={() => go('/services')}>
                        Services
                    </button>
                    <button type="button" className="dogma-mobile__link" onClick={() => go('/about')}>
                        About
                    </button>
                    <button type="button" className="dogma-mobile__link" onClick={() => go('/leadership')}>
                        Leadership
                    </button>
                    <button type="button" className="dogma-mobile__link" onClick={() => go('/contact')}>
                        Contact
                    </button>
                    <div className="dogma-mobile__contact">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="#c41e3a">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                        </svg>
                        <span>+91 88628 08140</span>
                    </div>
                    <div className="dogma-mobile__actions">
                        <button
                            type="button"
                            className={`dogma-btn dogma-btn--login dogma-btn--block ${isHome ? 'dogma-btn--login-home' : ''}`}
                            onClick={() => go('/portal')}
                        >
                            Login
                        </button>
                        <button type="button" className="dogma-btn dogma-btn--primary dogma-btn--block" onClick={() => go('/portal')}>
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

const NAV_CSS = `
/* Main Navigation Container */
.dogma-nav { 
    position: fixed; 
    top: 0; 
    left: 0; 
    right: 0; 
    z-index: 200; 
    background: #ffffff; 
    box-shadow: 0 2px 20px rgba(0,0,0,0.1);
}

/* Top Header Section */
.dogma-header {
    border-bottom: 1px solid #e5e7eb;
    padding: 8px 0;
}

.dogma-header__inner {
    max-width: 100%;
    margin: 0 auto;
    padding: 8px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
}

/* Logo */
.dogma-header__logo {
    cursor: pointer;
    flex-shrink: 0;
}

.dogma-header__logo-img {
    height: 80px;
    width: auto;
    object-fit: contain;
}

/* Brand Text */
.dogma-header__brand {
    text-align: center;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.dogma-header__brand-title {
    font-size: 2rem;
    font-weight: 700;
    color: #c41e3a;
    margin: 0;
    letter-spacing: 1px;
    font-family: 'Georgia', serif;
}

.dogma-header__brand-tagline {
    font-size: 1rem;
    font-weight: 600;
    color: #374151;
    margin: 4px 0 2px 0;
    font-family: 'Georgia', serif;
}

.dogma-header__brand-subtitle {
    font-size: 0.75rem;
    font-weight: 500;
    color: #6b7280;
    margin: 0;
    letter-spacing: 0.5px;
}

/* Contact Section */
.dogma-header__contact {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
}

.dogma-header__contact-icon {
    color: #c41e3a;
}

.dogma-header__contact-info {
    display: flex;
    flex-direction: column;
    text-align: left;
}

.dogma-header__contact-label {
    font-size: 0.7rem;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.dogma-header__contact-number {
    font-size: 1rem;
    font-weight: 700;
    color: #c41e3a;
}

/* Navigation Strip */
.dogma-strip {
    background: #6b7280;
    padding: 0;
}

.dogma-strip__inner {
    max-width: 100%;
    margin: 0 auto;
    padding: 0 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 44px;
}

.dogma-strip__nav {
    display: flex;
    align-items: center;
    gap: 0;
    flex: 1;
    justify-content: center;
}

.dogma-nav__link {
    background: none;
    border: none;
    font-family: inherit;
    font-size: 0.85rem;
    font-weight: 600;
    color: #ffffff;
    cursor: pointer;
    padding: 12px 20px;
    transition: all 0.2s;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-right: 1px solid rgba(255,255,255,0.1);
}

.dogma-nav__link:first-child {
    border-left: 1px solid rgba(255,255,255,0.1);
}

.dogma-nav__link:hover {
    background: rgba(255,255,255,0.1);
}

.dogma-nav__link.active {
    background: #c41e3a;
    color: #ffffff;
}

.dogma-strip__actions {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    margin-left: 20px;
}

/* Buttons */
.dogma-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: all 0.2s;
    font-family: inherit;
    font-size: 0.8rem;
    padding: 8px 16px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.dogma-btn--primary {
    background: #c41e3a;
    color: #ffffff;
}

.dogma-btn--primary:hover {
    background: #a01830;
}

.dogma-btn--login {
    background: #ffffff;
    color: #374151;
    border: 1px solid #d1d5db;
}

.dogma-btn--login:hover {
    background: #f3f4f6;
}

.dogma-btn--login-home {
    background: #c41e3a;
    color: #ffffff;
    border-color: #c41e3a;
}

.dogma-btn--login-home:hover {
    background: #a01830;
}

.dogma-btn--login-about {
    background: #fbbf24;
    color: #92400e;
    border-color: #fbbf24;
}

.dogma-btn--login-about:hover {
    background: #f59e0b;
}

.dogma-btn--block {
    width: 100%;
}

/* Mobile Burger */
.dogma-burger {
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 44px;
    height: 44px;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    z-index: 1000;
}

.dogma-burger span {
    width: 22px;
    height: 2px;
    background: #374151;
    border-radius: 2px;
    transition: all 0.3s;
    position: absolute;
}

.dogma-burger span:nth-child(1) { transform: translateY(-7px); }
.dogma-burger span:nth-child(3) { transform: translateY(7px); }

.dogma-burger--active span:nth-child(1) { transform: rotate(45deg); }
.dogma-burger--active span:nth-child(2) { opacity: 0; }
.dogma-burger--active span:nth-child(3) { transform: rotate(-45deg); }

/* Mobile Menu */
.dogma-mobile {
    position: fixed;
    inset: 0;
    background: #ffffff;
    z-index: 150;
    clip-path: circle(0% at 90% 5%);
    transition: clip-path 0.6s cubic-bezier(0.77, 0, 0.175, 1);
    visibility: hidden;
    overflow-y: auto;
    padding-top: 80px;
}

.dogma-mobile--open {
    clip-path: circle(150% at 90% 5%);
    visibility: visible;
}

.dogma-mobile__inner {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    padding: 40px 24px;
    gap: 8px;
}

.dogma-mobile__link {
    background: none;
    border: none;
    text-align: left;
    font-size: 1.1rem;
    font-weight: 600;
    color: #374151;
    padding: 14px 0;
    border-bottom: 1px solid #e5e7eb;
    cursor: pointer;
    transition: all 0.2s;
    text-transform: uppercase;
}

.dogma-mobile__link:active {
    color: #c41e3a;
}

.dogma-mobile__contact {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 20px 0;
    color: #c41e3a;
    font-weight: 600;
}

.dogma-mobile__actions {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-top: 20px;
}

/* Responsive */
@media (max-width: 1024px) {
    .dogma-header__brand-title {
        font-size: 1.5rem;
    }
    .dogma-header__brand-tagline {
        font-size: 0.85rem;
    }
    .dogma-header__contact {
        display: none;
    }
    .dogma-strip__inner {
        padding: 0 18px;
    }
    .dogma-nav__link {
        padding: 12px 14px;
        font-size: 0.8rem;
    }
}

@media (max-width: 900px) {
    .dogma-strip__nav {
        display: none;
    }
    .dogma-strip__actions {
        display: none;
    }
    .dogma-burger {
        display: flex;
    }
    .dogma-header__inner {
        padding: 0 18px;
        position: relative;
    }
    .dogma-header__logo-img {
        height: 50px;
    }
    .dogma-strip__inner {
        justify-content: flex-end;
    }
}

@media (max-width: 480px) {
    .dogma-header__brand-title {
        font-size: 1.2rem;
    }
    .dogma-header__brand-tagline {
        font-size: 0.7rem;
    }
    .dogma-header__logo-img {
        height: 40px;
    }
}
`;
