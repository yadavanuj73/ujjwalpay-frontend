import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import logoImg from '../../assets/images/logo.png';

const AdminLogoFixed = () => (
  <img src={logoImg} alt="Ujjwal Pay" className="h-44 w-auto drop-shadow-md mb-4" />
);

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/admin-panel/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#114bbf] flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Background elegant crossing swooshes matching the image exactly */}
      <div className="absolute bottom-0 left-0 w-full h-[60%] pointer-events-none opacity-40 mix-blend-screen">
         <svg viewBox="0 0 1440 400" className="absolute bottom-[-15%] w-[130%] h-auto transform origin-bottom-left rotate-[-5deg]">
          <path fill="#4ea5f5" fillOpacity="0.8" d="M0,288L60,282.7C120,277,240,267,360,277.3C480,288,600,320,720,336C840,352,960,352,1080,336C1200,320,1320,288,1380,272L1440,256L1440,400L1380,400C1320,400,1200,400,1080,400C960,400,840,400,720,400C600,400,480,400,360,400C240,400,120,400,60,400L0,400Z"></path>
         </svg>
         <svg viewBox="0 0 1440 400" className="absolute bottom-[-5%] right-[-10%] w-[120%] h-auto transform origin-bottom-right rotate-[5deg] scale-x-[-1]">
          <path fill="#378de5" fillOpacity="0.7" d="M0,288L60,266.7C120,245,240,203,360,208C480,213,600,267,720,288C840,309,960,299,1080,261.3C1200,224,1320,160,1380,128L1440,96L1440,400L1380,400C1320,400,1200,400,1080,400C960,400,840,400,720,400C600,400,480,400,360,400C240,400,120,400,60,400L0,400Z"></path>
         </svg>
      </div>

      <div className="w-full max-w-[380px] relative z-10 flex flex-col items-center">
        
        {/* Exact Logo implementation perfectly matching Image 1 without white box! */}
        <div className="mb-6 flex justify-center">
          <AdminLogoFixed />
        </div>

        {/* Admin Login Divider line */}
        <div className="flex items-center w-full mb-6">
          <div className="flex-1 border-t border-blue-400/40 opacity-70"></div>
          <span className="px-5 text-white text-[1.45rem] font-semibold tracking-wide" style={{ letterSpacing: '0.02em' }}>Admin Login</span>
          <div className="flex-1 border-t border-blue-400/40 opacity-70"></div>
        </div>

        {/* Form Inputs exactly matching the proportions */}
        <form onSubmit={handleLogin} className="w-full flex flex-col gap-[14px]">
           <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-[13px] bg-[#f2f4fb] rounded-[3px] text-slate-700 placeholder-[#7584ae] focus:outline-none focus:ring-2 focus:ring-[#fca311]"
              placeholder="Email"
              style={{ fontSize: '15px' }}
            />
            
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-[13px] bg-[#f2f4fb] rounded-[3px] text-slate-700 placeholder-[#7584ae] focus:outline-none focus:ring-2 focus:ring-[#fca311]"
              placeholder="Password"
              style={{ fontSize: '15px' }}
            />

            <button
              type="submit"
              className="w-full py-[12px] bg-gradient-to-b from-[#ffbe1a] to-[#f49c00] hover:from-[#ffc300] hover:to-[#ff9e00] text-white font-bold text-lg rounded-[4px] shadow-[0_4px_6px_rgba(0,0,0,0.15)] transition-all mt-1 tracking-wide"
            >
              Login
            </button>
        </form>

        {/* Security Checkboxes perfectly stacked and colored */}
        <div className="mt-8 flex flex-col gap-3 w-full pl-6 md:pl-8 items-start">
           {[
             '2FA Verification Enabled',
             'Role-based Login',
             'Admin / Sub-Admin Access'
           ].map((text, i) => (
             <div key={i} className="flex items-center gap-2.5">
               <div className="w-[17px] h-[17px] bg-white rounded-[3px] flex items-center justify-center shrink-0 shadow-sm border border-blue-200">
                 {/* Vivid blue custom V checkmark */}
                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>
               </div>
               <span className="text-blue-50 text-[14px] font-medium tracking-wide opacity-90 leading-none mt-[2px]">{text}</span>
             </div>
           ))}
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;
