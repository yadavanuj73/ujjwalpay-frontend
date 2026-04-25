import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

import logoImg from '../../assets/images/logo.png';

const HorizontalLogo = () => (
  <img
    src={logoImg}
    alt="Ujjwal Pay"
    className="h-[90px] w-auto drop-shadow-sm"
    style={{ objectFit: 'contain', maxWidth: '300px' }}
  />
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <HorizontalLogo />
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-[#0a2357] hover:text-blue-600 font-semibold text-base md:text-lg tracking-wide transition-colors">Home</Link>
            <Link to="/services" className="text-[#0a2357] hover:text-blue-600 font-semibold text-base md:text-lg tracking-wide transition-colors">Services</Link>
            <Link to="/about" className="text-[#0a2357] hover:text-blue-600 font-semibold text-base md:text-lg tracking-wide transition-colors">About</Link>
            <Link to="/contact" className="text-[#0a2357] hover:text-blue-600 font-semibold text-base md:text-lg tracking-wide transition-colors">Contact</Link>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <Link to="/portal" className="bg-[#fffbeb] hover:bg-[#fef3c7] text-[#0a2357] border border-[#fde68a] font-bold text-sm px-6 py-2 rounded-lg transition-all shadow-sm">
              Login
            </Link>
            <Link to="/portal" className="bg-[#1d4ed8] hover:bg-[#1e40af] text-white px-6 py-2 rounded-lg text-sm font-bold shadow-md shadow-blue-500/30 transition-all transform hover:-translate-y-0.5">
              Get Started
            </Link>
          </div>

          <div className="flex items-center md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 shadow-lg absolute w-full left-0">
          <div className="flex flex-col space-y-4">
             <Link to="/" className="text-[#0a2357] font-semibold text-base" onClick={() => setIsOpen(false)}>Home</Link>
             <Link to="/services" className="text-[#0a2357] font-semibold text-base" onClick={() => setIsOpen(false)}>Services</Link>
             <Link to="/about" className="text-[#0a2357] font-semibold text-base" onClick={() => setIsOpen(false)}>About</Link>
             <Link to="/contact" className="text-[#0a2357] font-semibold text-base" onClick={() => setIsOpen(false)}>Contact</Link>
             <Link to="/portal" className="text-[#0a2357] font-semibold text-base bg-[#fffbeb] px-4 py-2 rounded-lg text-center" onClick={() => setIsOpen(false)}>Login</Link>
             <Link to="/portal" className="bg-[#1d4ed8] text-white font-bold text-base px-4 py-2 rounded-lg w-full text-center" onClick={() => setIsOpen(false)}>Get Started</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
