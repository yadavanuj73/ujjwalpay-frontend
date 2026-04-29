import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="font-sans min-h-screen bg-slate-50 overflow-hidden">
      {/* HERO SECTION */}
      <div className="relative bg-[#050b14] pt-32 pb-64 flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-[#050b14] to-[#050b14]"></div>
        
        <div className="relative z-10 space-y-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-5 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest"
          >
            Support Center
          </motion.div>
          <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-5xl md:text-7xl font-black text-white tracking-tight leading-tight"
          >
            Let's build the future <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">of Bharat, together.</span>
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="text-lg md:text-xl text-slate-400 font-medium max-w-2xl mx-auto"
          >
            Have a question or looking to partner? Our dedicated support team is just a message away.
          </motion.p>
        </div>
      </div>

      {/* FORM SECTION (Overlapping Hero) */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 -mt-40 mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/90 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-white p-8 md:p-14"
        >
          <h2 className="text-3xl font-black text-slate-900 mb-8 text-center">Send Feedback or Suggestion</h2>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Full Name*</label>
                <input type="text" className="w-full bg-slate-50 border border-slate-200/60 rounded-2xl p-4 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" placeholder="Enter your full name" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Email Address*</label>
                <input type="email" className="w-full bg-slate-50 border border-slate-200/60 rounded-2xl p-4 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" placeholder="Enter email address" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Phone Number</label>
                <input type="tel" className="w-full bg-slate-50 border border-slate-200/60 rounded-2xl p-4 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" placeholder="Enter phone number" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Subject*</label>
                <select className="w-full bg-slate-50 border border-slate-200/60 rounded-2xl p-4 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer">
                  <option>Give Feedback</option>
                  <option>Support & Help</option>
                  <option>Partnership</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Message*</label>
              <textarea rows="4" className="w-full bg-slate-50 border border-slate-200/60 rounded-2xl p-4 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none" placeholder="Write your message here..."></textarea>
            </div>
            <div className="pt-4 flex justify-center">
              <button className="bg-[#0f172a] hover:bg-black text-white px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
                Send Message
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* COMMON QUESTIONS */}
      <div className="bg-[#111827] py-24 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white tracking-tight mb-4">Common Questions</h2>
            <p className="text-slate-400 font-medium">Everything you need to know about our digital ecosystem.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#1f2937]/50 border border-white/5 rounded-3xl p-8 hover:bg-[#1f2937] transition-all">
              <h3 className="text-xl font-bold text-white mb-4 text-center">How do I become a partner?</h3>
              <p className="text-sm text-slate-400 text-center leading-relaxed">Simply register via our portal or contact our sales team. We'll guide you through the digital onboarding process in minutes.</p>
            </div>
            <div className="bg-[#1f2937]/50 border border-white/5 rounded-3xl p-8 hover:bg-[#1f2937] transition-all">
              <h3 className="text-xl font-bold text-white mb-4 text-center">What are the tech requirements?</h3>
              <p className="text-sm text-slate-400 text-center leading-relaxed">A basic smartphone or PC with an internet connection is all you need to start providing services to your local community.</p>
            </div>
            <div className="bg-[#1f2937]/50 border border-white/5 rounded-3xl p-8 hover:bg-[#1f2937] transition-all">
              <h3 className="text-xl font-bold text-white mb-4 text-center">Is the platform secure?</h3>
              <p className="text-sm text-slate-400 text-center leading-relaxed">We use bank-grade 256-bit SSL encryption and are fully RBI compliant, ensuring every transaction is 100% protected.</p>
            </div>
          </div>
        </div>
      </div>

      {/* MAP & ADDRESS SECTION */}
      <div className="relative w-full h-[600px] bg-slate-200 overflow-hidden">
        {/* Google Map Embedded iframe */}
        <iframe 
          src="https://maps.google.com/maps?q=RZA-108,%20SHOP%20NO%2001%20NIHAL%20VIHAR%20NANGLOI%20NEW%20DELHI%20110041&t=&z=14&ie=UTF8&iwloc=&output=embed" 
          width="100%" 
          height="100%" 
          style={{ border: 0, filter: 'grayscale(0.8) contrast(1.1) opacity(0.9)' }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Ujjwal Pay Location"
        ></iframe>

        {/* Address Overlay Card */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:translate-x-0 md:translate-y-0 md:top-auto md:left-auto md:bottom-20 md:right-20 md:max-w-sm w-[90%] bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-slate-100">
          <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mb-6">
            <MapPin size={24} />
          </div>
          <h3 className="text-2xl font-black text-slate-900 mb-2">Our Office</h3>
          <p className="text-sm font-bold text-slate-600 leading-relaxed uppercase tracking-wide">
            Ujjwal Pay Pvt Ltd<br/>
            RZA-108, Shop No 01<br/>
            Nihal Vihar, Nangloi<br/>
            New Delhi - 110041
          </p>
          <div className="w-full h-px bg-slate-200 my-6"></div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm font-bold text-slate-800">
              <Phone size={16} className="text-blue-500" />
              +91 9958835146
            </div>
            <div className="flex items-center gap-3 text-sm font-bold text-slate-800">
              <Mail size={16} className="text-blue-500" />
              support@ujjwalpay.com
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
