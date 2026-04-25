import { motion } from 'framer-motion';
import { Terminal, Cpu, Database, Link2, Book, Play, ShieldCheck, Zap } from 'lucide-react';

const API_MODULES = [
  {
    title: 'AEPS Gateway',
    endpoint: 'POST /v1/aeps/withdraw',
    icon: <Cpu size={28} />,
    code: '{"aadhaar": "XXXXXXXXXXXX", "amount": 1000}',
    desc: 'Seamlessly integrate Aadhaar-based withdrawals into your custom application or POS software.'
  },
  {
    title: 'Payout API',
    endpoint: 'POST /v1/payout/transfer',
    icon: <Database size={28} />,
    code: '{"account": "0123456789", "ifsc": "SBIN0001"}',
    desc: 'Real-time IMPS/NEFT payouts for vendor payments, salaries, and customer refunds.'
  },
  {
    title: 'BBPS Connector',
    endpoint: 'GET /v1/bbps/billers',
    icon: <Link2 size={28} />,
    code: 'fetch("/v1/bbps/billers?category=ELECTRIC")',
    desc: 'Access over 10,000+ national and regional billers through a single, unified interface.'
  },
  {
    title: 'Identity Verify',
    endpoint: 'POST /v1/verify/kyc',
    icon: <ShieldCheck size={28} />,
    code: '{"pan": "ABCDE1234F", "dob": "1990-01-01"}',
    desc: 'Instant Aadhaar and PAN verification services for user onboarding and risk mitigation.'
  }
];

const APIDocsPage = () => {
  return (
    <div className="bg-slate-50 pt-32 pb-20 font-sans min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
           <div className="flex-1 space-y-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block px-5 py-2 rounded-full bg-[#0a2357] text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl"
              >
                Developer Hub
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-8xl font-black text-[#0a2357] leading-none tracking-tighter"
              >
                Built for <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Integrators.</span>
              </motion.h1>
              <p className="text-lg text-gray-500 font-bold leading-relaxed max-w-xl italic">
                Our robust APIs are designed for speed, security, and developer happiness. Get started in minutes with our clean documentation and SDKs.
              </p>
              <div className="flex gap-6">
                 <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-500/30 hover:bg-blue-700 transition-all flex items-center gap-4">
                    Get API Keys <Zap size={14} />
                 </button>
                 <button className="text-[#0a2357] font-black text-xs uppercase tracking-widest hover:translate-x-3 transition-transform flex items-center gap-4">
                    Full Docs <Book size={14} />
                 </button>
              </div>
           </div>

           {/* 3D Code Preview Block */}
           <motion.div 
             initial={{ opacity: 0, rotate: 5, scale: 0.9 }}
             animate={{ opacity: 1, rotate: 0, scale: 1 }}
             transition={{ delay: 0.3 }}
             className="flex-1 w-full max-w-xl"
           >
              <div className="bg-[#0a2357] rounded-[3rem] p-8 md:p-12 shadow-[0_50px_100px_-30px_rgba(10,35,87,0.4)] border border-white/5 relative overflow-hidden group">
                 <div className="flex gap-2 mb-8">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                 </div>
                 <div className="space-y-4 font-mono text-sm leading-relaxed overflow-x-auto text-blue-200">
                    <p className="opacity-40 italic">// Step 1: Initialize SDK</p>
                    <p><span className="text-pink-400">const</span> ujjwal = <span className="text-yellow-400">new</span> <span className="text-indigo-300">UjjwalPay</span>(<span className="text-green-300">"API_KEY_772"</span>);</p>
                    <p>&nbsp;</p>
                    <p className="opacity-40 italic">// Step 2: Trigger AEPS</p>
                    <p><span className="text-pink-400">const</span> response = <span className="text-pink-400">await</span> ujjwal.aeps.<span className="text-yellow-400">withdraw</span>(&#123;</p>
                    <p className="pl-6">uid: <span className="text-green-300">"XXXXXXXXXXXX"</span>,</p>
                    <p className="pl-6">amount: <span className="text-blue-400">500</span></p>
                    <p>&#125;);</p>
                 </div>
                 <div className="absolute bottom-8 right-8 w-20 h-20 bg-white/5 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10 group-hover:scale-125 transition-transform">
                    <Terminal className="text-white opacity-40" />
                 </div>
              </div>
           </motion.div>
        </div>

        {/* API Module Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {API_MODULES.map((item, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               whileHover={{ y: -10 }}
               className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-xl relative overflow-hidden group transition-all"
             >
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-8 shadow-lg group-hover:bg-blue-600 group-hover:text-white transition-all">
                   {item.icon}
                </div>
                <h3 className="text-xl font-black text-[#0a2357] mb-3">{item.title}</h3>
                <p className="text-[10px] font-mono text-indigo-400 font-bold mb-4">{item.endpoint}</p>
                <p className="text-gray-400 text-sm font-semibold leading-relaxed mb-8">{item.desc}</p>
                <div className="bg-slate-50 p-4 rounded-xl text-[10px] font-mono text-blue-500 border border-slate-100 mb-8 opacity-80 group-hover:bg-[#0a2357] group-hover:text-blue-200 transition-colors truncate">
                   {item.code}
                </div>
                <button className="text-[10px] font-black uppercase text-blue-600 tracking-widest flex items-center gap-4 hover:gap-6 transition-all">
                   View Detail <span>›</span>
                </button>
             </motion.div>
           ))}
        </div>

        {/* Support Section */}
        <div className="mt-40 text-center">
           <div className="relative inline-block px-12 py-12 rounded-[4rem] border-2 border-dashed border-gray-200 group cursor-default">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-50 px-6 py-2">
                 <div className="flex gap-2">
                    {[1,2,3,4,5].map(x => <div key={x} className="w-1.5 h-1.5 bg-blue-600 rounded-full" />)}
                 </div>
              </div>
              <h2 className="text-2xl font-black text-[#0a2357] mb-4">Integrate without friction.</h2>
              <p className="text-gray-400 font-bold mb-10 max-w-lg mx-auto italic">Join 200+ companies that have successfully integrated our APIs. Sandbox credentials available on request.</p>
              <button className="bg-[#0a2357] text-white px-10 py-5 rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-4 mx-auto">
                 Launch Sandbox <Play size={14} />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default APIDocsPage;
