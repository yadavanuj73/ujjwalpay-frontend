import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const samarendraImg = '/CO-FOUNDER SAMERNDER.jpeg';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
const AjayImg = '/pravin-nagar.jpeg';


const Leadership = () => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        const h = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', h);
        return () => window.removeEventListener('scroll', h);
    }, []);

    const leaders = [
        {
            name: "Samarendra Kumar",
            role: "Co-Founder",
            image: samarendraImg,
            bio: "Co-founder of UjjwalPay Fintech Pvt Ltd, is a seasoned fintech professional with over 17 years of rich experience. He has worked across almost all major services in the fintech industry and holds an MBA in Sales and Marketing, giving him deep knowledge of strong business strategy and customer management. He has efficiently led large teams across North India, exceeding business targets time and again. Results-oriented, innovative, and confident, he is committed to leveraging his experience and knowledge to take the organization to new heights.",
            linkedin: "#"
        },
        {
            name: "Parvin Nagar",
            role: "Co-Founder",
            image: AjayImg,
            bio: "Co-Founder of UjjwalPay Fintech Pvt Ltd, is a seasoned technocrat and entrepreneur with deep experience in BPO, Telecom, Insurance, Mobile and Electronics industries. They have been active in the fintech industry since 2016, where they have collaborated with many companies to provide high level services. His technical proficiency and business experience have enabled him to build his own retail network and better serve his customers.",
            linkedin: "#"
        },
    ];


    return (
        <div className="leadership-root">
            <style>{LEADERSHIP_CSS}</style>

            <Navbar />

            <div style={{ paddingTop: '140px' }}></div>
            {/* Hero Section */}
            <header className="leadership-hero">
                <div className="leadership-hero-container">
                    <h1 className="leadership-h1">Meet Our Directors</h1>
                    <p className="leadership-sub">
                        Led by industry veterans with decades of combined experience in fintech and digital payments
                    </p>
                </div>
            </header>

            {/* Leadership Grid */}
            <section className="leadership-grid-section">
                <div className="leadership-container">
                    <div className="leaders-grid">
                        {leaders.map((leader, idx) => (
                            <div key={idx} className="leader-card">
                                <div className="leader-image-wrapper">
                                    <img src={leader.image} alt={leader.name} className="leader-image" />
                                    <div className="leader-overlay">
                                        <h3 className="leader-name">{leader.name}</h3>
                                        <p className="leader-role">{leader.role}</p>
                                    </div>
                                </div>
                                <div className="leader-info">
                                    <p className="leader-bio">{leader.bio}</p>
                                    <a href={leader.linkedin || '#'} className="leader-linkedin">
                                        <span className="linkedin-icon">in</span> Connect on LinkedIn
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

const LEADERSHIP_CSS = `
.leadership-root { background: #fff; font-family: 'Inter', sans-serif; color: #0f172a; overflow-x: hidden; }

.rp-btn { border: none; border-radius: 12px; font-weight: 800; cursor: pointer; padding: 10px 24px; font-size: 0.85rem; transition: all 0.2s ease; }
.rp-btn--primary { background: #2563eb; color: #fff; }

.leadership-container { max-width: 1200px; margin: 0 auto; padding: 0 5%; }

/* Hero */
.leadership-hero { padding: 120px 5% 40px; text-align: center; }
.leadership-h1 { font-size: clamp(2.5rem, 5vw, 3.5rem); font-weight: 900; line-height: 1.1; letter-spacing: -1px; margin-bottom: 16px; color: #0f172a; }
.leadership-sub { font-size: 1.15rem; color: #64748b; max-width: 700px; margin: 0 auto; line-height: 1.6; font-weight: 500;}

/* Grid */
.leadership-grid-section { padding: 40px 0 100px; background: #f8fafc;}
.leaders-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(480px, 1fr)); gap: 28px; }

.leader-card { background: #fff; border-radius: 20px; overflow: hidden; box-shadow: 0 2px 16px rgba(0,0,0,0.07); display: flex; flex-direction: row; align-items: stretch; transition: transform 0.3s ease, box-shadow 0.3s ease; border: 1px solid #f1f5f9; }
.leader-card:hover { transform: translateY(-4px); box-shadow: 0 12px 36px rgba(0,0,0,0.11); }

.leader-image-wrapper { position: relative; width: 200px; min-width: 200px; overflow: hidden; flex-shrink: 0; }
.leader-image { width: 100%; height: 100%; object-fit: cover; object-position: center 10%; }

.leader-overlay { position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%); padding: 14px 16px; }
.leader-name { font-size: 1.05rem; font-weight: 800; color: #fff; margin-bottom: 2px; text-shadow: 0 1px 3px rgba(0,0,0,0.4); }
.leader-role { font-size: 0.78rem; font-weight: 700; color: #4ade80; margin: 0; letter-spacing: 0.5px; text-transform: uppercase; }

.leader-info { padding: 24px 22px; flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
.leader-bio { font-size: 0.84rem; color: #64748b; line-height: 1.75; margin-bottom: 18px; }

.leader-linkedin { display: inline-flex; align-items: center; gap: 7px; font-weight: 700; color: #2563eb; font-size: 0.85rem; text-decoration: none; transition: color 0.2s; }
.leader-linkedin:hover { color: #1d4ed8; }
.linkedin-icon { display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; background: #2563eb; color: #fff; border-radius: 4px; font-size: 11px; font-weight: 900; }
.leader-linkedin:hover .linkedin-icon { background: #1d4ed8; }

@media(max-width: 600px) {
  .leaders-grid { grid-template-columns: 1fr; }
  .leader-card { flex-direction: column; }
  .leader-image-wrapper { width: 100%; min-width: unset; height: 220px; }
}

@media(max-width: 900px) {
    .leadership-h1 { font-size: 2.2rem; }
}

.core-team-section { padding: 80px 0; background: #fff; }
.section-center-head { text-align: center; margin-bottom: 50px; }
.leadership-h1.small { font-size: 2.5rem; }

.core-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 30px; }
.core-card { text-align: center; background: #fcfcfc; padding: 30px; border-radius: 20px; border: 1px solid #f1f5f9; transition: all 0.3s; }
.core-card:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.05); border-color: #10b981; }

.core-image-wrapper { width: 120px; height: 120px; margin: 0 auto 20px; border-radius: 50%; overflow: hidden; border: 3px solid #fff; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
.core-image { width: 100%; height: 100%; object-fit: cover; object-position: center 15%; }

.core-name { font-size: 1.2rem; font-weight: 800; color: #0f172a; margin-bottom: 4px; }
.core-role { font-size: 0.85rem; font-weight: 700; color: #10b981; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 15px; }

.core-linkedin { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; background: #0f172a; color: #fff; border-radius: 4px; text-decoration: none; font-weight: 900; font-size: 12px; transition: all 0.2s; }
.core-linkedin:hover { background: #10b981; transform: scale(1.1); }

`;

export default Leadership;
