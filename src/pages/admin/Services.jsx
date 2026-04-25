import { useState } from 'react';
import { Settings2, Smartphone, Lightbulb, Send, CreditCard, Shield, Plane, BookOpen, Fingerprint } from 'lucide-react';

const initialServices = [
  { id: 'recharge', name: 'Mobile Recharge', icon: Smartphone, active: true, desc: 'Prepaid and Postpaid mobile recharges across all operators.' },
  { id: 'aeps', name: 'AEPS Services', icon: Fingerprint, active: true, desc: 'Aadhaar Enabled Payment System for cash withdrawal.' },
  { id: 'money_transfer', name: 'Money Transfer (DMT)', icon: Send, active: true, desc: 'Domestic money transfer to any bank account.' },
  { id: 'bbps', name: 'Bill Payment (BBPS)', icon: Lightbulb, active: true, desc: 'Electricity, Water, Gas, DTH bill payments.' },
  { id: 'credit_card', name: 'Credit Card Bill', icon: CreditCard, active: true, desc: 'Pay credit card bills for multiple banks.' },
  { id: 'insurance', name: 'Insurance Premium', icon: Shield, active: false, desc: 'Pay insurance premiums for LIC, Bajaj, etc.' },
  { id: 'travel', name: 'Travel Tickets', icon: Plane, active: false, desc: 'Flight, Train, and Bus ticket booking.' },
  { id: 'education', name: 'Education Fees', icon: BookOpen, active: false, desc: 'School, College, and Institute fee payments.' },
];

const Services = () => {
  const [services, setServices] = useState(initialServices);

  const toggleService = (id) => {
    setServices(services.map(s => 
      s.id === id ? { ...s, active: !s.active } : s
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-[#0a2357]">Services Control</h1>
          <p className="text-sm text-gray-500">Enable or disable services across the Ujjwal Pay platform globally.</p>
        </div>
        <div className="w-10 h-10 bg-blue-50 text-primary rounded-lg flex items-center justify-center border border-blue-100">
          <Settings2 size={20} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <div key={service.id} className={`bg-white rounded-xl shadow-sm border ${service.active ? 'border-primary/20 ring-1 ring-primary/10' : 'border-gray-200'} p-6 transition-all`}>
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${service.active ? 'bg-blue-50 text-primary' : 'bg-gray-100 text-gray-400'}`}>
                  <Icon size={24} />
                </div>
                
                {/* Custom Toggle Switch */}
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    value="" 
                    className="sr-only peer" 
                    checked={service.active}
                    onChange={() => toggleService(service.id)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              
              <h3 className={`text-lg font-bold mb-1 ${service.active ? 'text-gray-900' : 'text-gray-500'}`}>
                {service.name}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-2">
                {service.desc}
              </p>
              
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-xs font-semibold">
                <span className={service.active ? 'text-emerald-600' : 'text-red-500'}>
                  {service.active ? 'Global: ACTIVE' : 'Global: INACTIVE'}
                </span>
                <button className="text-primary hover:underline">Configuration</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Services;
