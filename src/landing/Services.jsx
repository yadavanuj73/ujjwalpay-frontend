import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ServicesPageFull from './ServicesPageFull';

/** Full Services page from `ujjwal pr` (hero, 3D carousel, flip cards, CTA). */
export default function Services() {
    return (
        <div className="min-h-screen bg-[#fdfdfd] font-sans">
            <Navbar />
            <ServicesPageFull />
            <Footer />
        </div>
    );
}
