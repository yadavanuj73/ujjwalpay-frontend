import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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
        `dogma-link ${location.pathname === path ? 'dogma-link--active' : ''}`;

    const isHome = location.pathname === '/';

    return (
        <nav className="dogma-navbar">
            <style>{NAV_CSS}</style>
            
            {/* Top Header with Logo, Brand, Contact */}
            <div className="dogma-topbar">
                <div className="dogma-topbar__container">
                    {/* Logo */}
                    <div className="dogma-logo" onClick={handleLogoClick}>
                        <img 
                            src="/ujjwawal pay logo.jpeg" 
                            alt="UjjwalPay Logo" 
                            className="dogma-logo__img"
                            onError={(e) => {e.target.style.display='none'}}
                        />
                    </div>
                    
                    {/* Brand Name & Taglines */}
                    <div className="dogma-brand">
                        <h1 className="dogma-brand__title"><span className="dogma-brand__ujjwal">Ujjwal</span><span className="dogma-brand__pay">Pay</span></h1>
                        <p className="dogma-brand__subtitle">FinTech Pvt Ltd</p>
                        <p className="dogma-brand__tagline">हर ट्रांजैक्शन में विश्वास<span className="dogma-brand__reg">®</span></p>
                    </div>
                    
                    {/* Contact with Phone Icon */}
                    <div className="dogma-contact">
                        <div className="dogma-contact__number-large">+91 9958835146</div>
                        <div className="dogma-contact__icon-wrapper">
                            <svg className="dogma-contact__icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Navigation Menu Bar */}
            <div className="dogma-menubar">
                <div className="dogma-menubar__container">
                    <div className="dogma-menubar__nav">
                        <button className={linkCls('/')} onClick={() => navigate('/')}>
                            Home
                        </button>
                        <button className={linkCls('/services')} onClick={() => navigate('/services')}>
                            Services
                        </button>
                        <button className={linkCls('/about')} onClick={() => navigate('/about')}>
                            About
                        </button>
                        <button className={linkCls('/leadership')} onClick={() => navigate('/leadership')}>
                            Leadership
                        </button>
                        <button className={linkCls('/contact')} onClick={() => navigate('/contact')}>
                            Contact
                        </button>
                    </div>
                    
                    <div className="dogma-menubar__actions">
                        <button 
                            className={`dogma-btn dogma-btn--outline ${isHome ? 'dogma-btn--red' : ''}`}
                            onClick={() => navigate('/portal')}
                        >
                            Login
                        </button>
                        <button 
                            className="dogma-btn dogma-btn--red"
                            onClick={() => navigate('/portal')}
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Button */}
            <button
                type="button"
                className={`dogma-burger ${menu ? 'dogma-burger--active' : ''}`}
                onClick={() => setMenu((m) => !m)}
                aria-label="Toggle menu"
            >
                <span /><span /><span />
            </button>

            {/* Mobile Menu */}
            <div className={`dogma-mobile ${menu ? 'dogma-mobile--open' : ''}`}>
                <div className="dogma-mobile__content">
                    <button className="dogma-mobile__link" onClick={() => go('/')}>Home</button>
                    <button className="dogma-mobile__link" onClick={() => go('/services')}>Services</button>
                    <button className="dogma-mobile__link" onClick={() => go('/about')}>About</button>
                    <button className="dogma-mobile__link" onClick={() => go('/leadership')}>Leadership</button>
                    <button className="dogma-mobile__link" onClick={() => go('/contact')}>Contact</button>
                    
                    <div className="dogma-mobile__contact">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="#c41e3a">
                            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                        </svg>
                        <span>+91 9958835146</span>
                    </div>
                    
                    <div className="dogma-mobile__actions">
                        <button className="dogma-btn dogma-btn--outline dogma-btn--block" onClick={() => go('/portal')}>
                            Login
                        </button>
                        <button className="dogma-btn dogma-btn--red dogma-btn--block" onClick={() => go('/portal')}>
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

const NAV_CSS = `
.dogma-navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: #ffffff;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

/* Top Bar */
.dogma-topbar {
    background: #ffffff;
    border-bottom: 1px solid #e5e7eb;
}

.dogma-topbar__container {
    max-width: 100%;
    margin: 0 auto;
    padding: 3px 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 60px;
}

/* Logo */
.dogma-logo {
    cursor: pointer;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 120px;
}

.dogma-logo__img {
    height: 65px;
    width: auto;
    max-width: 150px;
    object-fit: contain;
}

/* Brand Section - Wider to stretch */
.dogma-brand {
    text-align: center;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 550px;
    max-width: 700px;
}

.dogma-brand__title {
    font-size: 2.2rem;
    font-weight: 700;
    margin: 0;
    letter-spacing: 8px;
    font-family: Georgia, 'Times New Roman', serif;
    width: 100%;
    text-align: center;
}
.dogma-brand__ujjwal { color: #1e40af; }
.dogma-brand__pay { color: #f97316; }

.dogma-brand__tagline {
    font-size: 1.1rem;
    font-weight: 600;
    color: #374151;
    margin: 2px 0 1px 0;
    font-family: Georgia, 'Times New Roman', serif;
    width: 100%;
    text-align: center;
    letter-spacing: 4px;
}

.dogma-brand__reg {
    font-size: 0.7rem;
    vertical-align: super;
}

.dogma-brand__subtitle {
    font-size: 0.78rem;
    font-weight: 600;
    color: #374151;
    margin: 0;
    letter-spacing: 5px;
    width: 100%;
    text-align: center;
}

/* Contact Section */
.dogma-contact {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    min-width: 220px;
    justify-content: flex-end;
}

.dogma-contact__icon-wrapper {
    width: 42px;
    height: 42px;
    background: #c41e3a;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.dogma-contact__icon {
    width: 22px;
    height: 22px;
    color: #ffffff;
}

.dogma-contact__number-large {
    font-size: 1.5rem;
    font-weight: 700;
    color: #c41e3a;
    letter-spacing: 1px;
}

/* Menu Bar */
.dogma-menubar {
    background: #6b7280;
}

.dogma-menubar__container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
}

.dogma-menubar__nav {
    display: flex;
    align-items: center;
    gap: 0;
}

.dogma-link {
    background: none;
    border: none;
    font-family: inherit;
    font-size: 0.85rem;
    font-weight: 600;
    color: #ffffff;
    cursor: pointer;
    padding: 14px 24px;
    transition: all 0.2s;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-right: 1px solid rgba(255,255,255,0.15);
}

.dogma-link:first-child {
    border-left: 1px solid rgba(255,255,255,0.15);
}

.dogma-link:hover {
    background: rgba(255,255,255,0.1);
}

.dogma-link--active {
    background: #c41e3a !important;
    color: #ffffff;
}

.dogma-menubar__actions {
    display: flex;
    align-items: center;
    gap: 12px;
    position: absolute;
    right: 30px;
}

/* Buttons */
.dogma-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    font-size: 0.8rem;
    font-weight: 600;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.dogma-btn--outline {
    background: transparent;
    border: 2px solid #ffffff;
    color: #ffffff;
}

.dogma-btn--outline:hover {
    background: #ffffff;
    color: #374151;
}

.dogma-btn--red {
    background: #c41e3a;
    color: #ffffff;
}

.dogma-btn--red:hover {
    background: #a01830;
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
    position: fixed;
    top: 35px;
    right: 20px;
    z-index: 1100;
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
    z-index: 1050;
    clip-path: circle(0% at calc(100% - 40px) 50px);
    transition: clip-path 0.5s cubic-bezier(0.77, 0, 0.175, 1);
    visibility: hidden;
    overflow-y: auto;
    padding-top: 100px;
}

.dogma-mobile--open {
    clip-path: circle(150% at calc(100% - 40px) 50px);
    visibility: visible;
}

.dogma-mobile__content {
    padding: 20px 24px;
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.dogma-mobile__link {
    background: none;
    border: none;
    text-align: left;
    font-size: 1rem;
    font-weight: 600;
    color: #374151;
    padding: 12px 0;
    border-bottom: 1px solid #e5e7eb;
    cursor: pointer;
    text-transform: uppercase;
}

.dogma-mobile__contact {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 20px 0;
    color: #c41e3a;
    font-weight: 700;
    font-size: 1.1rem;
}

.dogma-mobile__actions {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-top: 20px;
}

/* Responsive */
@media (max-width: 1100px) {
    .dogma-topbar__container {
        padding: 10px 20px;
    }
    
    .dogma-brand__title {
        font-size: 2rem;
    }
    
    .dogma-brand__tagline {
        font-size: 0.9rem;
    }
    
    .dogma-contact {
        display: none;
    }
    
    .dogma-menubar__container {
        padding: 0 20px;
    }
    
    .dogma-menubar__actions {
        position: static;
        margin-left: auto;
    }
}

@media (max-width: 900px) {
    .dogma-logo__img {
        height: 50px;
    }
    
    .dogma-brand__title {
        font-size: 1.5rem;
    }
    
    .dogma-brand__tagline {
        font-size: 0.75rem;
    }
    
    .dogma-menubar__nav {
        display: none;
    }
    
    .dogma-menubar__actions {
        display: none;
    }
    
    .dogma-burger {
        display: flex;
    }
}

@media (max-width: 600px) {
    .dogma-topbar__container {
        gap: 8px;
        padding: 6px 12px;
    }

    .dogma-brand {
        min-width: 0;
        max-width: unset;
        flex: 1;
        overflow: hidden;
    }

    .dogma-brand__title {
        font-size: 1.2rem;
        letter-spacing: 4px;
        white-space: nowrap;
    }

    .dogma-brand__subtitle {
        font-size: 0.6rem;
        letter-spacing: 2px;
        white-space: nowrap;
    }

    .dogma-brand__tagline {
        font-size: 0.6rem;
        letter-spacing: 1px;
        white-space: nowrap;
    }

    .dogma-logo {
        min-width: unset;
    }

    .dogma-logo__img {
        height: 38px;
    }
}
`;
