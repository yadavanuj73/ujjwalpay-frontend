import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LandingPageFull from './LandingPageFull';

/**
 * Home matches `ujjwal pr` LandingPage: hero slider, stats, advantage, map, partners, banks.
 * Post-login routes are unchanged.
 */
export default function Home() {
    return (
        <div className="flex min-h-screen flex-col bg-gray-50 font-sans">
            <Navbar />
            <main className="flex-1" style={{ paddingTop: '140px' }}>
                <LandingPageFull />
            </main>
            <Footer />
        </div>
    );
}
