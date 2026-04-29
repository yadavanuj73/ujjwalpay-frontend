import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import brandLogo from '../assets/UjjwalPay_brand_logo.png';

export default function Footer() {
    return (
        <footer className="bg-[#0f172a] py-12 text-gray-300">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="md:col-span-1">
                        <div className="mb-6 flex items-center gap-2">
                            <div className="rounded-3xl border border-gray-100/10 bg-white px-6 py-4 shadow-lg">
                                <img
                                    src={brandLogo}
                                    alt="Ujjwal Pay"
                                    className="h-14 w-auto max-w-[min(100%,260px)] object-contain object-left md:h-16"
                                    width={260}
                                    height={64}
                                    decoding="async"
                                />
                            </div>
                        </div>
                        <p className="mb-6 text-sm text-gray-400">
                            Har Transaction Mein Vishwas. All-in-One Fintech Platform for India.
                        </p>
                        <div className="flex items-center gap-4">
                            <a
                                href="https://www.facebook.com/share/1EjqgY9gY9/?mibextid=wwXIfr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-gray-400 shadow-lg transition-all hover:-translate-y-1 hover:bg-blue-600 hover:text-white"
                            >
                                <Facebook size={18} />
                            </a>
                            <a
                                href="#!"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-gray-400 shadow-lg transition-all hover:-translate-y-1 hover:bg-sky-500 hover:text-white"
                            >
                                <Twitter size={18} />
                            </a>
                            <a
                                href="https://www.instagram.com/ujjwalpay?igsh=bjJpankwcGd1MWI2&utm_source=qr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-gray-400 shadow-lg transition-all hover:-translate-y-1 hover:bg-pink-600 hover:text-white"
                            >
                                <Instagram size={18} />
                            </a>
                            <a
                                href="#!"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-gray-400 shadow-lg transition-all hover:-translate-y-1 hover:bg-blue-700 hover:text-white"
                            >
                                <Linkedin size={18} />
                            </a>
                            <a
                                href="https://www.youtube.com/@UjjwalPay"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-gray-400 shadow-lg transition-all hover:-translate-y-1 hover:bg-red-600 hover:text-white"
                            >
                                <Youtube size={18} />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="mb-4 font-medium text-white">Services</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/services" className="hover:text-blue-400">
                                    Mobile Recharge
                                </Link>
                            </li>
                            <li>
                                <Link to="/services" className="hover:text-blue-400">
                                    AEPS
                                </Link>
                            </li>
                            <li>
                                <Link to="/services" className="hover:text-blue-400">
                                    Money Transfer
                                </Link>
                            </li>
                            <li>
                                <Link to="/services" className="hover:text-blue-400">
                                    Credit Card Bill
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4 font-medium text-white">Company</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/about" className="hover:text-blue-400">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:text-blue-400">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:text-blue-400">
                                    Terms &amp; Conditions
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:text-blue-400">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4 font-medium text-white">Contact</h4>
                        <ul className="space-y-2 text-sm">
                            <li>Email: support@ujjwalpay.com</li>
                            <li>Phone: +91 9958835146</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
                    © {new Date().getFullYear()} Ujjwal Pay FinTech Pvt Ltd. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
