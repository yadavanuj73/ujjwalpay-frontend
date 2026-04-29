import './ElectricCards.css';
import aepsLogo from '../assets/images/aeps_logo.png';
import moneyTransferLogo from '../assets/images/money_transfer.png';
import utilityServicesLogo from '../assets/images/utility_services.png';
import correspondentImg from '../assets/Correspondent.avif';

const ElectricCards = () => {
    return (
        <div className="electric-cards-section">
            <svg className="svg-container">
                <defs>
                    <filter id="turbulent-1" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
                        <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="1" />
                        <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
                            <animate attributeName="dy" values="700; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
                        </feOffset>
                        <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="1" />
                        <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
                            <animate attributeName="dy" values="0; -700" dur="6s" repeatCount="indefinite" calcMode="linear" />
                        </feOffset>
                        <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise3" seed="2" />
                        <feOffset in="noise3" dx="0" dy="0" result="offsetNoise3">
                            <animate attributeName="dx" values="490; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
                        </feOffset>
                        <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise4" seed="2" />
                        <feOffset in="noise4" dx="0" dy="0" result="offsetNoise4">
                            <animate attributeName="dx" values="0; -490" dur="6s" repeatCount="indefinite" calcMode="linear" />
                        </feOffset>
                        <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
                        <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
                        <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />
                        <feDisplacementMap in="SourceGraphic" in2="combinedNoise" scale="30" xChannelSelector="R" yChannelSelector="B" />
                    </filter>

                    <filter id="turbulent-2" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
                        <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="3" />
                        <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
                            <animate attributeName="dy" values="500; 0" dur="8s" repeatCount="indefinite" calcMode="linear" />
                        </feOffset>
                        <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="3" />
                        <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
                            <animate attributeName="dy" values="0; -500" dur="8s" repeatCount="indefinite" calcMode="linear" />
                        </feOffset>
                        <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise3" seed="4" />
                        <feOffset in="noise3" dx="0" dy="0" result="offsetNoise3">
                            <animate attributeName="dx" values="350; 0" dur="8s" repeatCount="indefinite" calcMode="linear" />
                        </feOffset>
                        <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise4" seed="4" />
                        <feOffset in="noise4" dx="0" dy="0" result="offsetNoise4">
                            <animate attributeName="dx" values="0; -350" dur="8s" repeatCount="indefinite" calcMode="linear" />
                        </feOffset>
                        <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
                        <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
                        <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />
                        <feDisplacementMap in="SourceGraphic" in2="combinedNoise" scale="30" xChannelSelector="R" yChannelSelector="B" />
                    </filter>

                    <filter id="turbulent-3" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
                        <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="5" />
                        <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
                            <animate attributeName="dy" values="600; 0" dur="7s" repeatCount="indefinite" calcMode="linear" />
                        </feOffset>
                        <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="5" />
                        <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
                            <animate attributeName="dy" values="0; -600" dur="7s" repeatCount="indefinite" calcMode="linear" />
                        </feOffset>
                        <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise3" seed="6" />
                        <feOffset in="noise3" dx="0" dy="0" result="offsetNoise3">
                            <animate attributeName="dx" values="420; 0" dur="7s" repeatCount="indefinite" calcMode="linear" />
                        </feOffset>
                        <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise4" seed="6" />
                        <feOffset in="noise4" dx="0" dy="0" result="offsetNoise4">
                            <animate attributeName="dx" values="0; -420" dur="7s" repeatCount="indefinite" calcMode="linear" />
                        </feOffset>
                        <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
                        <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
                        <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />
                        <feDisplacementMap in="SourceGraphic" in2="combinedNoise" scale="30" xChannelSelector="R" yChannelSelector="B" />
                    </filter>
                </defs>
            </svg>

            <div class="gallery-container">
                <div class="card-wrapper-1">
                    <div class="inner-wrapper-1">
                        <div class="border-layer-1">
                            <div class="card-main-1"></div>
                        </div>
                        <div class="glow-1-layer-1"></div>
                        <div class="glow-1-layer-2"></div>
                    </div>
                    <div class="overlay-1-1"></div>
                    <div class="background-glow-1"></div>
                    <div class="card-content">
                        <div class="content-header">
                            <div class="glass-badge">Instant</div>
                            <div class="card-logo-container">
                                <img src={aepsLogo} alt="AEPS Logo" className="card-logo-img" />
                            </div>
                            <p class="card-title">Liquidity</p>
                        </div>
                        <hr class="card-divider" />
                        <div class="content-footer">
                            <p class="card-description">AEPS, Micro ATM & Credit Card to Wallet Instantly 🚀</p>
                        </div>
                    </div>
                </div>

                <div class="card-wrapper-2">
                    <div class="inner-wrapper-2">
                        <div class="border-layer-2">
                            <div class="card-main-2"></div>
                        </div>
                        <div class="glow-2-layer-1"></div>
                        <div class="glow-2-layer-2"></div>
                    </div>
                    <div class="overlay-2-1"></div>
                    <div class="background-glow-2"></div>
                    <div class="card-content">
                        <div class="content-header">
                            <div class="glass-badge">Secure</div>
                            <div class="card-logo-container">
                                <img src={moneyTransferLogo} alt="Money Transfer Logo" className="card-logo-img" />
                            </div>
                            <p class="card-title">Transactions</p>
                        </div>
                        <hr class="card-divider" />
                        <div class="content-footer">
                            <p class="card-description">Instant Money Transfer & Secure UPI Payments 💸</p>
                        </div>
                    </div>
                </div>

                <div class="card-wrapper-3">
                    <div class="inner-wrapper-3">
                        <div class="border-layer-3">
                            <div class="card-main-3"></div>
                        </div>
                        <div class="glow-3-layer-1"></div>
                        <div class="glow-3-layer-2"></div>
                    </div>
                    <div class="overlay-3-1"></div>
                    <div class="background-glow-3"></div>
                    <div class="card-content">
                        <div class="content-header">
                            <div class="glass-badge">Lowest</div>
                            <div class="card-logo-container">
                                <img src={utilityServicesLogo} alt="Utility Services Logo" className="card-logo-img" />
                            </div>
                            <p class="card-title">Charges</p>
                        </div>
                        <hr class="card-divider" />
                        <div class="content-footer">
                            <p class="card-description">Lowest Charges on Utility Services & Bill Payments 📋</p>
                        </div>
                    </div>
                </div>

                <div className="card-wrapper-5">
                    <div className="inner-wrapper-5">
                        <div className="border-layer-5">
                            <div className="card-main-5"></div>
                        </div>
                        <div className="glow-5-layer-1"></div>
                        <div className="glow-5-layer-2"></div>
                    </div>
                    <div className="overlay-5-1"></div>
                    <div className="background-glow-5"></div>
                    <div className="card-content">
                        <div className="content-header">
                            <div className="glass-badge">Best</div>
                            <div className="card-logo-container">
                                <img src={correspondentImg} alt="Margins" className="card-logo-img" style={{objectFit: 'cover', borderRadius: '12px'}} />
                            </div>
                            <p className="card-title">Margins</p>
                        </div>
                        <hr className="card-divider" />
                        <div className="content-footer">
                            <p className="card-description">Highest Margins on Flight & Train Bookings 🌍</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ElectricCards;
