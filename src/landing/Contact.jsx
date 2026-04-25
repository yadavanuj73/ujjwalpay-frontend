import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SUBJECT_OPTIONS = ['Give Feedback', 'Support & Help', 'Partnership', 'Partnership Inquiry', 'Technical Support', 'Other'];

/** Contact page aligned with `ujjwal pr/src/pages/ContactPage.jsx` (hero, form, FAQ, map). */
export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: SUBJECT_OPTIONS[0],
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: SUBJECT_OPTIONS[0],
                message: '',
            });
            setTimeout(() => setSubmitted(false), 5000);
        }, 1200);
    };

    return (
        <div className="min-h-screen overflow-hidden bg-slate-50 font-sans">
            <Navbar />

            <div className="relative flex flex-col items-center justify-center overflow-hidden bg-[#050b14] px-4 pb-64 pt-32 text-center">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-[#050b14] to-[#050b14]" />

                <div className="relative z-10 mx-auto max-w-4xl space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400"
                    >
                        Support Center
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl font-black leading-tight tracking-tight text-white md:text-7xl"
                    >
                        Let&apos;s build the future <br className="hidden md:block" />
                        <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                            of Bharat, together.
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mx-auto max-w-2xl text-lg font-medium text-slate-400 md:text-xl"
                    >
                        Have a question or looking to partner? Our dedicated support team is just a message away.
                    </motion.p>
                </div>
            </div>

            <div className="relative z-20 mx-auto -mt-40 mb-20 max-w-4xl px-4">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-[2.5rem] border border-white bg-white/90 p-8 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] backdrop-blur-3xl md:p-14"
                >
                    <h2 className="mb-8 text-center text-3xl font-black text-slate-900">Send Feedback or Suggestion</h2>

                    <AnimatePresence mode="wait">
                        {submitted ? (
                            <motion.div
                                key="ok"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="rounded-2xl border border-emerald-200 bg-emerald-50/90 py-12 text-center"
                            >
                                <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-500" strokeWidth={2} />
                                <p className="mt-4 text-lg font-black text-emerald-800">Message sent</p>
                                <p className="mt-2 text-sm font-medium text-emerald-900/80">
                                    Thank you. Our team will review your message shortly.
                                </p>
                            </motion.div>
                        ) : (
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-black uppercase tracking-widest text-slate-500">
                                            Full Name*
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full rounded-2xl border border-slate-200/60 bg-slate-50 p-4 text-sm font-bold text-slate-800 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-black uppercase tracking-widest text-slate-500">
                                            Email Address*
                                        </label>
                                        <input
                                            required
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full rounded-2xl border border-slate-200/60 bg-slate-50 p-4 text-sm font-bold text-slate-800 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                            placeholder="Enter email address"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-black uppercase tracking-widest text-slate-500">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full rounded-2xl border border-slate-200/60 bg-slate-50 p-4 text-sm font-bold text-slate-800 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                            placeholder="Enter phone number"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-black uppercase tracking-widest text-slate-500">
                                            Subject*
                                        </label>
                                        <select
                                            required
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full cursor-pointer appearance-none rounded-2xl border border-slate-200/60 bg-slate-50 p-4 text-sm font-bold text-slate-800 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                        >
                                            {SUBJECT_OPTIONS.map((opt) => (
                                                <option key={opt} value={opt}>
                                                    {opt}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black uppercase tracking-widest text-slate-500">Message*</label>
                                    <textarea
                                        required
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full resize-none rounded-2xl border border-slate-200/60 bg-slate-50 p-4 text-sm font-bold text-slate-800 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                        placeholder="Write your message here..."
                                    />
                                </div>
                                <div className="flex justify-center pt-4">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="rounded-full bg-[#0f172a] px-10 py-4 text-xs font-black uppercase tracking-widest text-white shadow-xl transition-all hover:-translate-y-1 hover:bg-black hover:shadow-2xl disabled:opacity-60"
                                    >
                                        {isSubmitting ? 'Sending…' : 'Send Message'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>

            <div className="relative bg-[#111827] px-4 py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 text-4xl font-black tracking-tight text-white">Common Questions</h2>
                        <p className="font-medium text-slate-400">Everything you need to know about our digital ecosystem.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div className="rounded-3xl border border-white/5 bg-[#1f2937]/50 p-8 transition-all hover:bg-[#1f2937]">
                            <h3 className="mb-4 text-center text-xl font-bold text-white">How do I become a partner?</h3>
                            <p className="text-center text-sm leading-relaxed text-slate-400">
                                Simply register via our portal or contact our sales team. We&apos;ll guide you through the
                                digital onboarding process in minutes.
                            </p>
                        </div>
                        <div className="rounded-3xl border border-white/5 bg-[#1f2937]/50 p-8 transition-all hover:bg-[#1f2937]">
                            <h3 className="mb-4 text-center text-xl font-bold text-white">What are the tech requirements?</h3>
                            <p className="text-center text-sm leading-relaxed text-slate-400">
                                A basic smartphone or PC with an internet connection is all you need to start providing
                                services to your local community.
                            </p>
                        </div>
                        <div className="rounded-3xl border border-white/5 bg-[#1f2937]/50 p-8 transition-all hover:bg-[#1f2937]">
                            <h3 className="mb-4 text-center text-xl font-bold text-white">Is the platform secure?</h3>
                            <p className="text-center text-sm leading-relaxed text-slate-400">
                                We use bank-grade 256-bit SSL encryption and are fully RBI compliant, ensuring every
                                transaction is 100% protected.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative h-[600px] w-full overflow-hidden bg-slate-200">
                <iframe
                    title="Ujjwal Pay Location"
                    src="https://maps.google.com/maps?q=RZA-108,%20SHOP%20NO%2001%20NIHAL%20VIHAR%20NANGLOI%20NEW%20DELHI%20110041&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(0.8) contrast(1.1) opacity(0.9)' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />

                <div className="absolute left-1/2 top-1/2 w-[90%] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-slate-100 bg-white/95 p-8 shadow-2xl backdrop-blur-md md:left-auto md:right-20 md:top-auto md:bottom-20 md:translate-x-0 md:translate-y-0">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                        <MapPin size={24} />
                    </div>
                    <h3 className="mb-2 text-2xl font-black text-slate-900">Our Office</h3>
                    <p className="text-sm font-bold uppercase leading-relaxed tracking-wide text-slate-600">
                        Ujjwal Pay Pvt Ltd
                        <br />
                        RZA-108, Shop No 01
                        <br />
                        Nihal Vihar, Nangloi
                        <br />
                        New Delhi 110041
                    </p>
                    <div className="my-6 h-px w-full bg-slate-200" />
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm font-bold text-slate-800">
                            <Phone size={16} className="text-blue-500" />
                            +91 88000 00000
                        </div>
                        <div className="flex items-center gap-3 text-sm font-bold text-slate-800">
                            <Mail size={16} className="text-blue-500" />
                            support@ujjwalpay.com
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
