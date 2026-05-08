import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import aepsImg from '../assets/AEPS.png';
import rechargeImg from '../assets/mobile recharge.png';
import mposImg from '../assets/mpos.png';
import ecommerceImg from '../assets/e-commerce.png';
import microLoanImg from '../assets/micro - loan.png';
import travelImg from '../assets/TRAVEL.png';
import taxationImg from '../assets/taxation.png';
import insuranceImg from '../assets/incurence.png';
import creditCardImg from '../assets/credid card.png';
import panCardImg from '../assets/pan card.png';
import bankingImg from '../assets/banking.png';

const SERVICES = {
    'mobile-recharge': {
        title: 'Mobile Recharge',
        subtitle: 'Fast & Instant Recharge for All Networks',
        image: rechargeImg,
        color: '#9333ea',
        bg: 'linear-gradient(135deg, #fdf4ff 0%, #e9d5ff 100%)',
        tagline: 'Recharge anytime, anywhere — Prepaid, Postpaid & DTH',
        features: [
            { icon: '📱', title: 'All Networks Supported', desc: 'Jio, Airtel, Vi, BSNL, MTNL — recharge any number in seconds.' },
            { icon: '📺', title: 'DTH Recharge', desc: 'Tata Sky, Dish TV, Airtel DTH, Videocon — all supported.' },
            { icon: '💳', title: 'Postpaid Bill Payment', desc: 'Pay your postpaid mobile bills instantly without any hassle.' },
            { icon: '⚡', title: 'Instant Processing', desc: 'Recharge is processed within seconds with instant confirmation.' },
            { icon: '🎁', title: 'Cashback & Offers', desc: 'Earn cashback and exciting offers on every recharge.' },
            { icon: '🔒', title: '100% Secure', desc: 'Bank-grade encryption for all your transactions.' },
        ],
        howItWorks: [
            'Enter the mobile number or DTH customer ID',
            'Select the operator and recharge plan',
            'Make payment via UPI, wallet or bank transfer',
            'Receive instant confirmation on your number',
        ],
        stats: [{ label: 'Networks', value: '10+' }, { label: 'Daily Recharges', value: '50,000+' }, { label: 'Success Rate', value: '99.9%' }],
    },
    'aeps': {
        title: 'AEPS',
        subtitle: 'Aadhaar Enabled Payment System',
        image: aepsImg,
        color: '#16a34a',
        bg: 'linear-gradient(135deg, #f0fdf4 0%, #bbf7d0 100%)',
        tagline: 'Banking at your fingertips — Secure | Simple | Instant',
        features: [
            { icon: '👆', title: 'Biometric Authentication', desc: 'Secure Aadhaar-based fingerprint verification for every transaction.' },
            { icon: '💵', title: 'Cash Withdrawal', desc: 'Instant cash withdrawal from any bank account using Aadhaar number.' },
            { icon: '💰', title: 'Cash Deposit', desc: 'Deposit cash to any bank account seamlessly.' },
            { icon: '🏦', title: 'Balance Enquiry', desc: 'Check account balance instantly without visiting a bank branch.' },
            { icon: '📄', title: 'Mini Statement', desc: 'Get last 5 transactions instantly on demand.' },
            { icon: '🔄', title: 'Interoperable', desc: 'Works across all banks — truly bank-agnostic service.' },
        ],
        howItWorks: [
            'Customer provides Aadhaar number and bank name',
            'Agent selects transaction type (withdrawal/deposit/balance)',
            'Customer authenticates using biometric fingerprint',
            'Transaction is processed and cash is disbursed instantly',
        ],
        stats: [{ label: 'Banks Supported', value: '50+' }, { label: 'Transactions/Day', value: '1 Lakh+' }, { label: 'RBI Certified', value: '✓' }],
    },
    'money-transfer': {
        title: 'Money Transfer',
        subtitle: 'Instant Domestic Money Transfer',
        image: bankingImg,
        color: '#1d4ed8',
        bg: 'linear-gradient(135deg, #eff6ff 0%, #bfdbfe 100%)',
        tagline: 'Send money to any bank account across India instantly',
        features: [
            { icon: '⚡', title: 'Instant Transfer', desc: 'Money reaches the recipient within seconds via IMPS/NEFT/RTGS.' },
            { icon: '🏦', title: 'All Banks Supported', desc: 'Transfer to any bank in India — over 500+ banks supported.' },
            { icon: '📱', title: 'UPI Transfer', desc: 'Send money using UPI ID or mobile number instantly.' },
            { icon: '📋', title: 'Transaction History', desc: 'Full transaction history with receipts for every transfer.' },
            { icon: '🔒', title: 'Secure & Safe', desc: '256-bit SSL encryption ensures your money is always safe.' },
            { icon: '💼', title: 'Bulk Transfer', desc: 'Transfer to multiple beneficiaries at once for business needs.' },
        ],
        howItWorks: [
            'Enter beneficiary account number and IFSC code',
            'Verify details and enter transfer amount',
            'Authenticate with OTP or biometric',
            'Money is transferred instantly with confirmation receipt',
        ],
        stats: [{ label: 'Banks Covered', value: '500+' }, { label: 'Daily Volume', value: '₹10 Cr+' }, { label: 'Success Rate', value: '99.8%' }],
    },
    'credit-card-bill': {
        title: 'Credit Card Bill',
        subtitle: 'Pay Credit Card Bills Instantly',
        image: creditCardImg,
        color: '#dc2626',
        bg: 'linear-gradient(135deg, #fff1f2 0%, #fecdd3 100%)',
        tagline: 'Never miss a credit card due date — Pay in seconds',
        features: [
            { icon: '💳', title: 'All Major Cards', desc: 'Pay bills for Visa, Mastercard, Amex, RuPay — all supported.' },
            { icon: '⚡', title: 'Instant Payment', desc: 'Bill payment reflects in your account within minutes.' },
            { icon: '📅', title: 'Auto Reminder', desc: 'Set reminders for due dates to avoid late fees.' },
            { icon: '🏦', title: '50+ Banks', desc: 'SBI, HDFC, ICICI, Axis, Kotak, and 50+ bank cards supported.' },
            { icon: '📄', title: 'Payment Receipt', desc: 'Instant receipt generation for every payment made.' },
            { icon: '🔒', title: 'Secure Gateway', desc: 'PCI-DSS compliant payment gateway for safe transactions.' },
        ],
        howItWorks: [
            'Select your bank and enter credit card number',
            'Fetch outstanding bill amount automatically',
            'Enter payment amount (minimum/full/custom)',
            'Pay instantly and receive confirmation receipt',
        ],
        stats: [{ label: 'Banks Supported', value: '50+' }, { label: 'Cards Processed', value: '10,000+/day' }, { label: 'Processing Time', value: '<2 min' }],
    },
    'pan-center': {
        title: 'PAN Center',
        subtitle: 'PAN Card Application & Correction Services',
        image: panCardImg,
        color: '#b45309',
        bg: 'linear-gradient(135deg, #fffbeb 0%, #fde68a 100%)',
        tagline: 'Apply for new PAN card or corrections — quick & hassle-free',
        features: [
            { icon: '🆔', title: 'New PAN Application', desc: 'Apply for a new PAN card with minimal documentation online.' },
            { icon: '✏️', title: 'PAN Correction', desc: 'Correct name, date of birth, address errors in existing PAN.' },
            { icon: '🔄', title: 'Duplicate PAN', desc: 'Apply for duplicate PAN card if lost or damaged.' },
            { icon: '📋', title: 'Document Assistance', desc: 'Complete guidance on required documents and form filling.' },
            { icon: '📦', title: 'Doorstep Delivery', desc: 'PAN card delivered to your registered address within 15 days.' },
            { icon: '📊', title: 'Status Tracking', desc: 'Real-time tracking of your PAN application status.' },
        ],
        howItWorks: [
            'Fill PAN application form with personal details',
            'Upload required identity and address proof documents',
            'Make payment for processing fees',
            'Receive application acknowledgement and track status',
        ],
        stats: [{ label: 'Processing Time', value: '15 Days' }, { label: 'Documents Needed', value: '2-3' }, { label: 'Success Rate', value: '99%' }],
    },
    'taxation': {
        title: 'Taxation',
        subtitle: 'Income Tax Filing & GST Services',
        image: taxationImg,
        color: '#0369a1',
        bg: 'linear-gradient(135deg, #f0f9ff 0%, #bae6fd 100%)',
        tagline: 'File your taxes accurately and on time — hassle-free',
        features: [
            { icon: '📑', title: 'ITR Filing', desc: 'Income Tax Return filing for individuals, businesses and professionals.' },
            { icon: '🏢', title: 'GST Registration', desc: 'GST registration and monthly/quarterly filing services.' },
            { icon: '📊', title: 'GST Returns', desc: 'GSTR-1, GSTR-3B, and annual return filing.' },
            { icon: '💼', title: 'Business Tax', desc: 'Corporate tax filing, TDS, and advance tax computation.' },
            { icon: '🧾', title: 'Tax Planning', desc: 'Expert tax planning to minimize your liability legally.' },
            { icon: '📞', title: 'Expert Support', desc: 'CA-assisted filing with round-the-clock expert support.' },
        ],
        howItWorks: [
            'Share your income details and documents',
            'Our tax experts prepare your returns accurately',
            'Review and approve your return',
            'E-file with government portal and get acknowledgement',
        ],
        stats: [{ label: 'Returns Filed', value: '1 Lakh+' }, { label: 'Tax Experts', value: '50+' }, { label: 'Savings Achieved', value: '₹5 Cr+' }],
    },
    'mpos': {
        title: 'mPOS',
        subtitle: 'Mobile Point of Sale Terminal',
        image: mposImg,
        color: '#7c3aed',
        bg: 'linear-gradient(135deg, #faf5ff 0%, #e9d5ff 100%)',
        tagline: 'Turn your smartphone into a payment acceptance machine',
        features: [
            { icon: '💳', title: 'Card Acceptance', desc: 'Accept Visa, Mastercard, Amex, RuPay debit and credit cards.' },
            { icon: '📱', title: 'Mobile Payments', desc: 'Accept UPI, Google Pay, PhonePe, Paytm and all UPI apps.' },
            { icon: '🖨️', title: 'Digital Receipts', desc: 'Send SMS and email receipts to customers instantly.' },
            { icon: '📊', title: 'Sales Reports', desc: 'Real-time sales dashboard and detailed transaction reports.' },
            { icon: '🔒', title: 'PCI Compliant', desc: 'Bank-grade security with full PCI-DSS compliance.' },
            { icon: '⚡', title: 'Instant Settlement', desc: 'T+1 settlement directly to your bank account.' },
        ],
        howItWorks: [
            'Register and get your mPOS device or app',
            'Connect to any Android smartphone via Bluetooth',
            'Enter amount and let customer tap/swipe/insert card',
            'Payment processed and receipt sent instantly',
        ],
        stats: [{ label: 'Payment Modes', value: '15+' }, { label: 'Settlement', value: 'T+1' }, { label: 'Uptime', value: '99.9%' }],
    },
    'travel': {
        title: 'Travel',
        subtitle: 'Complete Travel Booking Solutions',
        image: travelImg,
        color: '#0369a1',
        bg: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)',
        tagline: 'Book flights, trains, buses & hotels — one platform for all travel needs',
        features: [
            { icon: '✈️', title: 'Flight Booking', desc: 'Book domestic and international flights at best prices.' },
            { icon: '🚂', title: 'Train Booking', desc: 'IRCTC certified agent — book any train ticket instantly.' },
            { icon: '🚌', title: 'Bus Booking', desc: '2000+ bus operators across India — best routes and prices.' },
            { icon: '🏨', title: 'Hotel Booking', desc: '10,000+ hotels across India with instant confirmation.' },
            { icon: '🎫', title: 'Holiday Packages', desc: 'Curated domestic and international holiday packages.' },
            { icon: '📋', title: 'Easy Cancellation', desc: 'Hassle-free cancellation and refund processing.' },
        ],
        howItWorks: [
            'Select travel type: flight, train, bus, or hotel',
            'Enter travel dates, origin and destination',
            'Choose from available options and make payment',
            'Receive e-ticket/voucher on mobile and email',
        ],
        stats: [{ label: 'Routes Available', value: '10,000+' }, { label: 'Hotels Listed', value: '10,000+' }, { label: 'IRCTC Certified', value: '✓' }],
    },
    'insurance': {
        title: 'Insurance',
        subtitle: 'Life, Health & General Insurance',
        image: insuranceImg,
        color: '#0f766e',
        bg: 'linear-gradient(135deg, #f0fdfa 0%, #99f6e4 100%)',
        tagline: 'Protect what matters most — simple, affordable insurance for everyone',
        features: [
            { icon: '❤️', title: 'Life Insurance', desc: 'Term plans, endowment, ULIP — protect your family\'s future.' },
            { icon: '🏥', title: 'Health Insurance', desc: 'Individual and family health plans with cashless hospitalization.' },
            { icon: '🚗', title: 'Vehicle Insurance', desc: 'Two-wheeler and four-wheeler insurance — instant policy.' },
            { icon: '🏠', title: 'Home Insurance', desc: 'Protect your home and valuables with comprehensive cover.' },
            { icon: '✈️', title: 'Travel Insurance', desc: 'International travel insurance with medical emergency cover.' },
            { icon: '🏪', title: 'Shop Insurance', desc: 'Protect your business premises and inventory.' },
        ],
        howItWorks: [
            'Choose the insurance type you need',
            'Fill in basic details and get instant premium quotes',
            'Compare plans and select the best one for you',
            'Pay premium and receive policy document instantly',
        ],
        stats: [{ label: 'Insurance Partners', value: '20+' }, { label: 'Claims Settled', value: '95%' }, { label: 'Policies Issued', value: '50,000+' }],
    },
    'micro-loans': {
        title: 'Micro Loans',
        subtitle: '₹5,000 – ₹50,000 Quick Loans',
        image: microLoanImg,
        color: '#0891b2',
        bg: 'linear-gradient(135deg, #ecfeff 0%, #a5f3fc 100%)',
        tagline: 'Quick loans for everyone — minimal docs, fast approval',
        features: [
            { icon: '⚡', title: 'Fast Approval', desc: 'Loan approved within minutes with minimal documentation.' },
            { icon: '📄', title: 'Minimal Documents', desc: 'Only Aadhaar and PAN required — no salary slip needed.' },
            { icon: '🔓', title: 'No Collateral', desc: 'Unsecured loans — no property or asset required as security.' },
            { icon: '💸', title: 'Instant Disbursal', desc: 'Loan amount credited directly to your bank account instantly.' },
            { icon: '🔄', title: 'Flexible Repayment', desc: 'Choose repayment tenure from 3 months to 24 months.' },
            { icon: '📊', title: 'Build Credit Score', desc: 'Timely repayment helps build your CIBIL credit score.' },
        ],
        howItWorks: [
            'Apply online with Aadhaar and PAN details',
            'Get instant credit score check and loan eligibility',
            'Choose loan amount and repayment tenure',
            'Loan disbursed to your bank account within hours',
        ],
        stats: [{ label: 'Loan Range', value: '₹5K–₹50K' }, { label: 'Approval Time', value: '<30 Min' }, { label: 'Customers Served', value: '25,000+' }],
    },
    'e-commerce': {
        title: 'E-Commerce',
        subtitle: 'Online Store & Digital Marketplace',
        image: ecommerceImg,
        color: '#ea580c',
        bg: 'linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%)',
        tagline: 'Take your business online — sell more, earn more',
        features: [
            { icon: '🛒', title: 'Online Store', desc: 'Create your own branded online store with product catalog.' },
            { icon: '💳', title: 'Payment Gateway', desc: 'Accept all payment modes — UPI, cards, net banking, wallets.' },
            { icon: '📦', title: 'Inventory Management', desc: 'Track stock levels, get low-stock alerts automatically.' },
            { icon: '🚚', title: 'Delivery Integration', desc: 'Connect with 20+ courier partners for pan-India delivery.' },
            { icon: '📊', title: 'Sales Analytics', desc: 'Detailed analytics on orders, revenue, and customer behavior.' },
            { icon: '📱', title: 'Mobile Commerce', desc: 'Mobile-optimized store for seamless shopping experience.' },
        ],
        howItWorks: [
            'Register and set up your online store profile',
            'Add products with images, descriptions and prices',
            'Share your store link with customers',
            'Receive orders, process payments and ship products',
        ],
        stats: [{ label: 'Active Sellers', value: '5,000+' }, { label: 'Orders/Day', value: '10,000+' }, { label: 'Delivery Partners', value: '20+' }],
    },
};

export default function ServiceDetail() {
    const { serviceSlug } = useParams();
    const navigate = useNavigate();
    const service = SERVICES[serviceSlug];

    if (!service) {
        return (
            <div>
                <Navbar />
                <div style={{ paddingTop: '140px', textAlign: 'center', padding: '200px 20px' }}>
                    <h2 style={{ fontSize: '2rem', color: '#334155' }}>Service not found</h2>
                    <button onClick={() => navigate('/services')} style={{ marginTop: '20px', padding: '12px 28px', background: '#c41e3a', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '700' }}>
                        Back to Services
                    </button>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div style={{ paddingTop: '140px' }}>

                {/* Hero Section */}
                <section style={{ background: service.bg, padding: '60px 5% 80px', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '60px', flexWrap: 'wrap' }}>
                        <div style={{ flex: '1 1 400px', minWidth: '300px' }}>
                            <button
                                onClick={() => navigate('/services')}
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '99px', padding: '8px 18px', fontSize: '0.85rem', fontWeight: '700', color: '#475569', cursor: 'pointer', marginBottom: '24px', backdropFilter: 'blur(8px)' }}
                            >
                                ← Back to Services
                            </button>
                            <div style={{ display: 'inline-block', background: service.color, color: '#fff', borderRadius: '99px', padding: '6px 16px', fontSize: '0.8rem', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>
                                UjjwalPay Service
                            </div>
                            <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: '950', color: '#0f172a', lineHeight: '1.1', marginBottom: '16px' }}>
                                {service.title}
                            </h1>
                            <p style={{ fontSize: '1.2rem', fontWeight: '700', color: service.color, marginBottom: '12px' }}>{service.subtitle}</p>
                            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: '1.7', marginBottom: '32px' }}>{service.tagline}</p>
                            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                                {service.stats.map((s, i) => (
                                    <div key={i} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.8)', borderRadius: '16px', padding: '16px 24px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
                                        <div style={{ fontSize: '1.8rem', fontWeight: '900', color: service.color }}>{s.value}</div>
                                        <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div style={{ flex: '1 1 380px', minWidth: '280px', display: 'flex', justifyContent: 'center' }}>
                            <img
                                src={service.image}
                                alt={service.title}
                                style={{ width: '100%', maxWidth: '480px', height: 'auto', borderRadius: '24px', boxShadow: '0 30px 60px rgba(0,0,0,0.15)', objectFit: 'contain' }}
                            />
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section style={{ padding: '80px 5%', background: '#fff' }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
                            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: '900', color: '#0f172a', marginBottom: '12px' }}>
                                Key Features
                            </h2>
                            <p style={{ color: '#64748b', fontSize: '1.05rem' }}>Everything you need in one powerful service</p>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                            {service.features.map((f, i) => (
                                <div key={i} style={{ background: '#f8fafc', borderRadius: '20px', padding: '28px', border: '1px solid #e2e8f0', transition: 'transform 0.2s, box-shadow 0.2s' }}
                                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.08)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                                >
                                    <div style={{ fontSize: '2.4rem', marginBottom: '12px' }}>{f.icon}</div>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>{f.title}</h3>
                                    <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6' }}>{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section style={{ padding: '80px 5%', background: service.bg }}>
                    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
                            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: '900', color: '#0f172a', marginBottom: '12px' }}>
                                How It Works
                            </h2>
                            <p style={{ color: '#64748b', fontSize: '1.05rem' }}>Simple steps to get started</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {service.howItWorks.map((step, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '20px', background: 'rgba(255,255,255,0.85)', borderRadius: '16px', padding: '20px 28px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
                                    <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: service.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '1.1rem', flexShrink: 0 }}>
                                        {i + 1}
                                    </div>
                                    <p style={{ color: '#334155', fontSize: '1rem', fontWeight: '600', lineHeight: '1.5', margin: 0 }}>{step}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section style={{ padding: '80px 5%', background: '#0f172a', textAlign: 'center' }}>
                    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: '900', color: '#fff', marginBottom: '16px' }}>
                            Ready to get started with {service.title}?
                        </h2>
                        <p style={{ color: '#94a3b8', fontSize: '1.05rem', marginBottom: '36px' }}>
                            Join thousands of retailers already using UjjwalPay to serve their customers.
                        </p>
                        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button
                                onClick={() => navigate('/portal')}
                                style={{ padding: '16px 36px', background: service.color, color: '#fff', border: 'none', borderRadius: '50px', fontWeight: '800', fontSize: '1rem', cursor: 'pointer', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}
                            >
                                Get Started Now
                            </button>
                            <button
                                onClick={() => navigate('/contact')}
                                style={{ padding: '16px 36px', background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,0.3)', borderRadius: '50px', fontWeight: '800', fontSize: '1rem', cursor: 'pointer' }}
                            >
                                Contact Us
                            </button>
                        </div>
                    </div>
                </section>

            </div>
            <Footer />
        </div>
    );
}
