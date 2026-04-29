import logoImg from '../../assets/images/logo.png';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-white px-6 py-4 rounded-3xl shadow-lg border border-gray-100/10">
                <img src={logoImg} alt="Ujjwal Pay" className="h-20 md:h-24 w-auto object-contain" />
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-6">
              Har Transaction Mein Vishwas. All-in-One Fintech Platform for India.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.facebook.com/share/1EjqgY9gY9/?mibextid=wwXIfr" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all shadow-lg hover:-translate-y-1">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-gray-400 hover:bg-sky-500 hover:text-white transition-all shadow-lg hover:-translate-y-1">
                <Twitter size={18} />
              </a>
              <a href="https://www.instagram.com/ujjwalpay?igsh=bjJpankwcGd1MWI2&utm_source=qr" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-gray-400 hover:bg-pink-600 hover:text-white transition-all shadow-lg hover:-translate-y-1">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-gray-400 hover:bg-blue-700 hover:text-white transition-all shadow-lg hover:-translate-y-1">
                <Linkedin size={18} />
              </a>
              <a href="https://www.youtube.com/@UjjwalPay" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all shadow-lg hover:-translate-y-1">
                <Youtube size={18} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services" className="hover:text-blue-400">Mobile Recharge</Link></li>
              <li><Link to="/services" className="hover:text-blue-400">AEPS</Link></li>
              <li><Link to="/services" className="hover:text-blue-400">Money Transfer</Link></li>
              <li><Link to="/services" className="hover:text-blue-400">Credit Card Bill</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-blue-400">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400">Contact</Link></li>
              <li><Link to="/about" className="hover:text-blue-400">Terms & Conditions</Link></li>
              <li><Link to="/about" className="hover:text-blue-400">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>Email: support@ujjwalpay.com</li>
              <li>Phone: +91 9958835146</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center text-gray-400">
          © {new Date().getFullYear()} Ujjwal Pay FinTech Pvt Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
