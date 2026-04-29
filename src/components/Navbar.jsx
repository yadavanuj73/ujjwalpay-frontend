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
        `rp-nav__link ${location.pathname === path ? 'active' : ''}`;

    const isAbout = location.pathname === '/about';
    const isHome = location.pathname === '/';

    return (
        <nav className="rp-nav">
            <style>{NAV_CSS}</style>
            <div className="rp-nav__inner">
                <div className="rp-nav__brand" onClick={handleLogoClick}>
                    <img
                        src={brandLogo}
                        alt=""
                        className="rp-nav__brand-img"
                        width={120}
                        height={40}
                        decoding="async"
                    />
                    <div className="rp-nav__brand-text">
                        <span className="rp-nav__brand-title">UjjwalPay</span>
                        <span className="rp-nav__brand-sub">Fintech Pvt Ltd</span>
                        <span className="rp-nav__brand-tagline-hi">Har Transaction Mein Vishwas</span>
                    </div>
                </div>

                <div className="rp-nav__center">
                    <button type="button" className={linkCls('/')} onClick={() => navigate('/')}>
                        Home
                    </button>
                    <button type="button" className={linkCls('/services')} onClick={() => navigate('/services')}>
                        Services
                    </button>
                    <button type="button" className={linkCls('/about')} onClick={() => navigate('/about')}>
                        About
                    </button>
                    <button type="button" className={linkCls('/contact')} onClick={() => navigate('/contact')}>
                        Contact
                    </button>
                    <button type="button" className={linkCls('/leadership')} onClick={() => navigate('/leadership')}>
                        Leadership
                    </button>
                </div>

                <div className="rp-nav__actions">
                    <button
                        type="button"
                        className={`rp-btn rp-btn--sm rp-btn--login ${isAbout ? 'rp-btn--login-about' : ''} ${isHome ? 'rp-btn--login-home' : ''}`}
                        onClick={() => navigate('/portal')}
                    >
                        Login
                    </button>
                    <button type="button" className="rp-btn rp-btn--sm rp-btn--primary" onClick={() => navigate('/portal')}>
                        Get Started
                    </button>
                </div>

                <button
                    type="button"
                    className={`rp-nav__burger ${menu ? 'rp-nav__burger--active' : ''}`}
                    onClick={() => setMenu((m) => !m)}
                    aria-label="Toggle menu"
                >
                    <span />
                    <span />
                    <span />
                </button>
            </div>

            <div className={`rp-nav__mobile ${menu ? 'rp-nav__mobile--open' : ''}`}>
                <div className="rp-nav__mobile-inner">
                    <button type="button" className="rp-nav__mobile-link" onClick={() => go('/')}>
                        Home
                    </button>
                    <button type="button" className="rp-nav__mobile-link" onClick={() => go('/services')}>
                        Services
                    </button>
                    <button type="button" className="rp-nav__mobile-link" onClick={() => go('/about')}>
                        About
                    </button>
                    <button type="button" className="rp-nav__mobile-link" onClick={() => go('/contact')}>
                        Contact
                    </button>
                    <button type="button" className="rp-nav__mobile-link" onClick={() => go('/leadership')}>
                        Leadership
                    </button>
                    <div className="rp-nav__mobile-actions">
                        <button
                            type="button"
                            className={`rp-btn rp-btn--login rp-btn--block ${isHome ? 'rp-btn--login-home' : ''}`}
                            onClick={() => go('/portal')}
                        >
                            Login
                        </button>
                        <button type="button" className="rp-btn rp-btn--primary rp-btn--block" onClick={() => go('/portal')}>
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

const NAV_CSS = `
.rp-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 200; padding: 10px 0; background: #ffffff; box-shadow: 0 4px 30px rgba(0,0,0,0.05); border-bottom: 1px solid #e2e8f0; }

.rp-nav__inner { 
    max-width: 1400px; 
    margin: 0 auto; 
    padding: 0 28px; 
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
    align-items: center;
    gap: 16px;
    position: relative; 
    z-index: 10; 
}

.rp-nav__brand {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  justify-self: start;
  position: relative;
  z-index: 20;
  isolation: isolate;
}
.rp-nav__brand-img {
  display: block;
  height: 40px;
  width: auto;
  max-width: 96px;
  object-fit: contain;
  object-position: left center;
  flex-shrink: 0;
  transition: transform 0.3s;
}
.rp-nav__brand:hover .rp-nav__brand-img { transform: scale(1.02); }
.rp-nav__brand-text {
  display: none;
  flex-direction: column;
  gap: 0;
  line-height: 1.15;
  text-align: left;
  min-width: 0;
}
@media (min-width: 480px) {
  .rp-nav__brand-text { display: flex; }
}
.rp-nav__brand-title { font-size: 1.05rem; font-weight: 900; color: #2563eb; letter-spacing: -0.02em; }
.rp-nav__brand-sub { font-size: 0.72rem; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.04em; }
.rp-nav__brand-tagline-hi { font-size: 0.65rem; font-weight: 700; color: #334155; margin-top: 2px; line-height: 1.2; }

.rp-nav__center { display: flex; align-items: center; justify-content: center; gap: 4px; justify-self: center; }
.rp-nav__link { background: none; border: none; font-family: inherit; font-size: 0.88rem; font-weight: 700; color: #334155; cursor: pointer; padding: 8px 10px; border-radius: 10px; transition: all 0.2s; letter-spacing: -0.2px; white-space: nowrap; }
.rp-nav__link:hover { color: #2563eb; background: transparent; }
.rp-nav__link.active { color: #2563eb; background: transparent; font-weight: 800; }

.rp-nav__actions { display: flex; align-items: center; gap: 10px; justify-self: end; }

.rp-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; border-radius: 999px; font-weight: 800; cursor: pointer; border: none; transition: all 0.25s; font-family: inherit; }
.rp-btn--primary { background: linear-gradient(135deg, #2563eb, #1d4ed8); color: #fff; box-shadow: 0 4px 20px rgba(37,99,235,0.3); }
.rp-btn--primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(37,99,235,0.4); }
.rp-btn--sm { padding: 10px 20px; font-size: 0.85rem; }
.rp-btn--login { background: #fff; color: #0f172a; border: 1px solid #cbd5e1; box-shadow: none; }
.rp-btn--login:hover { background: #f8fafc; border-color: #94a3b8; }
.rp-btn--login-home { border-color: #2563eb; color: #2563eb; background: #fff; }
.rp-btn--login-home:hover { background: #eff6ff; border-color: #1d4ed8; color: #1d4ed8; }
.rp-btn--login-about { border-color: #eab308; color: #a16207; background: #fffef7; }
.rp-btn--login-about:hover { background: #fef9c3; border-color: #ca8a04; }
.rp-btn--block { width: 100%; padding: 14px 22px; }

.rp-nav__burger { display: none; flex-direction: column; justify-content: center; align-items: center; width: 44px; height: 44px; background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; cursor: pointer; transition: all 0.3s; position: relative; z-index: 1000; justify-self: end; grid-column: 3; }
.rp-nav__burger span { width: 22px; height: 2px; background: #0f172a; border-radius: 2px; transition: all 0.3s cubic-bezier(0.68, -0.6, 0.32, 1.6); position: absolute; }
.rp-nav__burger span:nth-child(1) { transform: translateY(-7px); }
.rp-nav__burger span:nth-child(3) { transform: translateY(7px); }
.rp-nav__burger--active span:nth-child(1) { transform: rotate(45deg); }
.rp-nav__burger--active span:nth-child(2) { opacity: 0; transform: translateX(-10px); }
.rp-nav__burger--active span:nth-child(3) { transform: rotate(-45deg); }

.rp-nav__mobile { position: fixed; inset: 0; background: #fff; z-index: 150; clip-path: circle(0% at 90% 5%); transition: clip-path 0.6s cubic-bezier(0.77, 0, 0.175, 1); visibility: hidden; overflow-y: auto; }
.rp-nav__mobile--open { clip-path: circle(150% at 90% 5%); visibility: visible; }
.rp-nav__mobile-inner { min-height: 100%; display: flex; flex-direction: column; justify-content: center; padding: 100px 10% 60px; gap: 5px; }
.rp-nav__mobile-link { background: none; border: none; text-align: left; font-size: clamp(1.4rem, 6vw, 2.2rem); font-weight: 800; color: #0f172a; padding: 12px 0; border-bottom: 1px solid #f1f5f9; cursor: pointer; transition: all 0.2s; }
.rp-nav__mobile-link:active { color: #2563eb; padding-left: 10px; }
.rp-nav__mobile-actions { display: flex; flex-direction: column; gap: 12px; padding: 28px 0 20px; }

@media(max-width: 1100px){
  .rp-nav__inner { grid-template-columns: 1fr auto; padding: 0 18px; }
  .rp-nav__center { display: none; }
  .rp-nav__actions { display: none; }
  .rp-nav__burger { display: flex; }
  .rp-nav__brand-img { height: 36px; max-width: 80px; }
}

@media(max-width: 479px) {
  .rp-nav__brand-img { height: 32px; max-width: 72px; }
}

@media(max-height: 600px) {
  .rp-nav__mobile-inner { justify-content: flex-start; }
  .rp-nav__mobile-link { font-size: 1.2rem; padding: 8px 0; }
}
`;
