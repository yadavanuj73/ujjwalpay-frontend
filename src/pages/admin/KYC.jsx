import { ShieldCheck, Check, X, Search, FileText } from 'lucide-react';

const kycRequests = [
  { id: 'REQ-8721', user: 'Amit Kumar', business: 'Amit Communication', type: 'Retailer', date: 'Oct 24, 2024', status: 'Pending' },
  { id: 'REQ-8722', user: 'Sunita Sharma', business: 'Sharma Enterprises', type: 'Distributor', date: 'Oct 24, 2024', status: 'Pending' },
  { id: 'REQ-8719', user: 'Vikram Singh', business: 'Vikram Mobile Point', type: 'Retailer', date: 'Oct 23, 2024', status: 'Pending' },
];

const KYC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-[#0a2357]">KYC Verification</h1>
          <p className="text-sm text-gray-500">Review and approve new onboarding requests.</p>
        </div>
        <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center border border-emerald-100 shadow-sm relative">
          <ShieldCheck size={20} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
            3
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 border-r border-gray-100 bg-white rounded-xl shadow-sm border overflow-hidden flex flex-col h-[700px]">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4">Pending Requests</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="divide-y divide-gray-50">
              {kycRequests.map((req, i) => (
                <div key={req.id} className={`p-4 cursor-pointer hover:bg-blue-50/50 transition-colors ${i === 0 ? 'bg-blue-50/50 border-l-4 border-l-primary' : 'border-l-4 border-l-transparent'}`}>
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold text-gray-900 text-sm">{req.user}</span>
                    <span className="text-xs text-gray-500">{req.date}</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-2 truncate">{req.business}</p>
                  <div className="flex gap-2">
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] font-medium uppercase tracking-wider">{req.type}</span>
                    <span className="px-2 py-0.5 bg-orange-100 text-orange-600 rounded text-[10px] font-medium uppercase tracking-wider">{req.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* KYC Details Panel */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[700px]">
           <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-gray-50/50">
             <div>
               <div className="flex items-center gap-3 mb-1">
                 <h2 className="text-xl font-bold text-gray-900">Amit Kumar</h2>
                 <span className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-semibold">Retailer</span>
               </div>
               <p className="text-sm text-gray-500">Amit Communication • Request ID: REQ-8721</p>
             </div>
             <div className="flex gap-2 text-sm font-medium">
                <button className="flex items-center gap-1.5 px-4 py-2 bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors">
                  <X size={16} /> Reject
                </button>
                <button className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/20 rounded-lg transition-colors">
                  <Check size={16} /> Approve KYC
                </button>
             </div>
           </div>
           
           <div className="flex-1 overflow-y-auto p-6 space-y-8">
             <div>
               <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Business Details</h3>
               <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                 <div>
                   <p className="text-gray-500 mb-1">Business Name</p>
                   <p className="font-semibold text-gray-900">Amit Communication</p>
                 </div>
                 <div>
                   <p className="text-gray-500 mb-1">Business Type</p>
                   <p className="font-semibold text-gray-900">Sole Proprietorship</p>
                 </div>
                 <div className="col-span-2">
                   <p className="text-gray-500 mb-1">Registered Address</p>
                   <p className="font-semibold text-gray-900">123, Main Market Road, Near SBI Bank, Jaipur, Rajasthan - 302001</p>
                 </div>
               </div>
             </div>

             <div>
               <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Documents (Aadhaar & PAN)</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 
                 <div className="border border-gray-200 rounded-xl p-4 cursor-pointer hover:border-primary transition-colors group">
                   <div className="flex items-start justify-between mb-4">
                     <div>
                       <div className="font-semibold text-gray-900 text-sm">Aadhaar Card (Front)</div>
                       <div className="text-xs text-gray-500">**** **** 4589</div>
                     </div>
                     <FileText className="text-gray-400 group-hover:text-primary transition-colors" size={20} />
                   </div>
                   <div className="bg-gray-100 rounded-lg h-32 flex items-center justify-center text-gray-400 text-sm mb-2 border border-gray-200 border-dashed">
                     Aadhaar Front Image
                   </div>
                 </div>

                 <div className="border border-gray-200 rounded-xl p-4 cursor-pointer hover:border-primary transition-colors group">
                   <div className="flex items-start justify-between mb-4">
                     <div>
                       <div className="font-semibold text-gray-900 text-sm">PAN Card</div>
                       <div className="text-xs text-gray-500">ABCDE1234F</div>
                     </div>
                     <FileText className="text-gray-400 group-hover:text-primary transition-colors" size={20} />
                   </div>
                   <div className="bg-gray-100 rounded-lg h-32 flex items-center justify-center text-gray-400 text-sm mb-2 border border-gray-200 border-dashed">
                     PAN Card Image
                   </div>
                 </div>

               </div>
               
               <div className="mt-8">
                 <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Verification Actions</h3>
                 <textarea 
                   placeholder="Add internal notes about this KYC verification..." 
                   className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary h-24 resize-none mb-4"
                 ></textarea>
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default KYC;
