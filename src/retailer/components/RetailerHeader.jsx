import { useState, useEffect } from 'react';
import { dataService } from '../../services/dataService';
import { 
    Youtube, Instagram, Facebook, Phone, 
    User, Wallet, ArrowRightLeft, Landmark
} from 'lucide-react';

// Dogma Soft Inspired Header with user info and wallet
const RetailerHeader = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [balance, setBalance] = useState("0.00");

    useEffect(() => {
        const user = dataService.getCurrentUser();
        setCurrentUser(user);
        
        const fetchData = async () => {
            if (user) {
                const bal = await dataService.getWalletBalance(user.id);
                setBalance(bal || "0.00");
            }
        };
        fetchData();
    }, []);

    const userInfo = {
        name: currentUser?.businessName || currentUser?.name || 'User',
        partyCode: currentUser?.mobile?.slice(-6) || 'SH826599',
        rmName: 'Pravin Kumar',
        rmPhone: '9587898138',
        supportPhone: '7410874107'
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            {/* Top Section - Logo, Brand (Center), Social Media */}
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                {/* Left - Full Logo */}
                <div className="shrink-0">
                    <img src="/ujjwawal pay logo.jpeg" alt="UjjwalPay" className="object-contain" style={{ height: '110px', width: 'auto' }}/>
                </div>

                {/* Center - Brand Name & Tagline */}
                <div className="flex-1 text-center">
                    <h1 className="text-3xl font-black" style={{ letterSpacing: '0.15em' }}>
                        <span className="text-blue-600">Ujjwal</span><span className="text-orange-500">Pay</span>
                    </h1>
                    <p className="text-sm text-gray-600 font-semibold mt-4">FinTech Pvt Ltd</p>
                    <p className="text-base font-bold text-orange-600 mt-4">हर ट्रांजैक्शन में विश्वास</p>
                </div>

                {/* Right - Social Media - flex-wrap to prevent squeezing */}
                <div className="flex flex-wrap items-center gap-2 shrink-0" style={{ width: '120px', justifyContent: 'flex-end' }}>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700">
                        <Youtube className="w-5 h-5"/>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-500 rounded-full flex items-center justify-center text-white">
                        <Instagram className="w-5 h-5"/>
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700">
                        <Facebook className="w-5 h-5"/>
                    </a>
                    <a href="https://wa.me/7410874107" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.003-.001zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                    </a>
                </div>
            </div>

            {/* User Info & Wallet Section */}
            <div className="flex gap-4">
                <div className="flex-1 grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                        <div className="flex items-start gap-3 mb-3">
                            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                {userInfo.name[0]?.toUpperCase() || 'U'}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-900">{userInfo.name}</h3>
                                <p className="text-sm text-gray-600">ID: {userInfo.partyCode}</p>
                            </div>
                        </div>
                        <div className="pt-2 border-t border-blue-200">
                            <div className="flex items-center gap-2 text-sm">
                                <Phone className="w-4 h-4 text-green-600"/>
                                <span className="text-gray-700">Support: {userInfo.supportPhone}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                        <h4 className="text-xs text-gray-500 uppercase font-semibold mb-3">Relationship Manager</h4>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white">
                                <User className="w-5 h-5"/>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">{userInfo.rmName}</p>
                                <div className="flex items-center gap-1 text-sm text-gray-600">
                                    <Phone className="w-3 h-3"/>
                                    <span>{userInfo.rmPhone}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-72 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-4 text-white">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-blue-100">EXPRESS BALANCE</span>
                        <Wallet className="w-5 h-5 text-blue-200"/>
                    </div>
                    <div className="text-3xl font-bold mb-4">₹{balance}</div>
                    <div className="flex gap-2">
                        <button className="flex-1 bg-white text-blue-600 py-2 px-3 rounded-lg text-sm font-semibold hover:bg-blue-50 flex items-center justify-center gap-1">
                            <ArrowRightLeft className="w-4 h-4"/>
                            Add Money
                        </button>
                        <button className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-lg text-sm font-semibold hover:bg-blue-400 flex items-center justify-center gap-1">
                            <Landmark className="w-4 h-4"/>
                            Virtual Account
                        </button>
                    </div>
                </div>

                <div className="w-80 rounded-xl overflow-hidden bg-gray-100" style={{minHeight: '140px'}}>
                    <img src="/src/assets/rular and urban.png" alt="Rural and Urban" className="w-full h-full object-cover" style={{minHeight: '140px'}}
                        onError={(e) => {e.target.style.display='none'; e.target.parentElement.innerHTML='<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-green-100 p-4 text-center"><p class="text-sm font-medium text-gray-700">Empowering Rural and Urban India</p></div>';}}/>
                </div>
            </div>
        </div>
    );
};

export default RetailerHeader;