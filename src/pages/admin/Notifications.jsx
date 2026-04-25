import { useState } from 'react';
import { Send, Bell, Users, LayoutList } from 'lucide-react';

const Notifications = () => {
  const [target, setTarget] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-[#0a2357]">Push Notifications</h1>
          <p className="text-sm text-gray-500">Send announcements and alerts to platform users.</p>
        </div>
        <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center border border-orange-100">
          <Bell size={20} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Compose Message</h2>
          
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notification Title</label>
              <input 
                type="text" 
                placeholder="e.g. System Maintenance Update" 
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message Body</label>
              <textarea 
                placeholder="Type your notification message here..." 
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all min-h-[120px] resize-y"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Target Audience</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <label className={`flex flex-col items-center justify-center border rounded-xl p-4 cursor-pointer transition-all ${target === 'all' ? 'border-primary bg-blue-50 text-primary ring-1 ring-primary/20' : 'border-gray-200 hover:border-gray-300 text-gray-600'}`}>
                  <input type="radio" name="target" value="all" className="sr-only" checked={target === 'all'} onChange={(e) => setTarget(e.target.value)} />
                  <Users size={24} className="mb-2" />
                  <span className="font-semibold text-sm">All Users</span>
                </label>
                <label className={`flex flex-col items-center justify-center border rounded-xl p-4 cursor-pointer transition-all ${target === 'retailers' ? 'border-primary bg-blue-50 text-primary ring-1 ring-primary/20' : 'border-gray-200 hover:border-gray-300 text-gray-600'}`}>
                  <input type="radio" name="target" value="retailers" className="sr-only" checked={target === 'retailers'} onChange={(e) => setTarget(e.target.value)} />
                  <LayoutList size={24} className="mb-2" />
                  <span className="font-semibold text-sm">Only Retailers</span>
                </label>
                <label className={`flex flex-col items-center justify-center border rounded-xl p-4 cursor-pointer transition-all ${target === 'distributors' ? 'border-primary bg-blue-50 text-primary ring-1 ring-primary/20' : 'border-gray-200 hover:border-gray-300 text-gray-600'}`}>
                  <input type="radio" name="target" value="distributors" className="sr-only" checked={target === 'distributors'} onChange={(e) => setTarget(e.target.value)} />
                  <Users size={24} className="mb-2" />
                  <span className="font-semibold text-sm">Only Distributors</span>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button 
                type="button" 
                className="flex items-center gap-2 px-6 py-3 bg-[#0a2357] hover:bg-blue-900 text-white rounded-lg font-medium shadow-md transition-all transform hover:-translate-y-0.5"
              >
                <Send size={18} /> Send Notification Now
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
           <div className="p-6 border-b border-gray-100">
             <h2 className="font-bold text-gray-900">Recent History</h2>
           </div>
           <div className="flex-1 overflow-y-auto">
             <div className="divide-y divide-gray-100">
               {[
                 { title: 'Server Maintenance Notice', target: 'All Users', time: '2 hours ago', status: 'Delivered' },
                 { title: 'New Commission Structure', target: 'Retailers Only', time: 'Yesterday', status: 'Delivered' },
                 { title: 'BBPS Service Downtime', target: 'All Users', time: 'Oct 20, 2024', status: 'Delivered' },
                 { title: 'Festive Bonus Offer', target: 'Distributors', time: 'Oct 15, 2024', status: 'Delivered' },
               ].map((item, i) => (
                 <div key={i} className="p-4 hover:bg-gray-50 transition-colors">
                   <div className="font-semibold text-gray-900 text-sm mb-1 line-clamp-1">{item.title}</div>
                   <div className="flex justify-between items-center mt-2 text-[10px] text-gray-500 font-medium uppercase tracking-wide">
                     <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600">{item.target}</span>
                     <span>{item.time}</span>
                   </div>
                 </div>
               ))}
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
