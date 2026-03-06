"use client";

import { motion } from "framer-motion";
import { Info, BookOpen, ShieldCheck, Heart, Users, Globe, Zap } from "lucide-react";

const InfoCard = ({ icon: Icon, title, description, delay }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="glass-card p-8 border-white/5 bg-white/2"
    >
        <div className="w-12 h-12 rounded-full bg-[#00d4ff]/10 flex items-center justify-center mb-6">
            <Icon className="w-6 h-6 text-[#00d4ff]" />
        </div>
        <h3 className="text-xl font-display font-bold text-white mb-4">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
);

export default function AboutPage() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <section className="text-center mb-20 px-4">
                <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
                    Our Mission: <span className="text-[#00d4ff]">Cognitive AI Defense</span>
                </h1>
                <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
                    ScamGPT was built to bridge the gap between complex cyber threats and everyday digital security.
                    By combining advanced AI reasoning with real-world threat datasets, we empower users to stay ahead of sophisticated scams.
                </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
                <InfoCard
                    icon={ShieldCheck}
                    title="Trained on Reality"
                    description="Built using datasets including thousands of phishing URLs, fraudulent UPI transactions, and social engineering scripts."
                    delay={0.1}
                />
                <InfoCard
                    icon={Brain}
                    title="Cognitive Reasoning"
                    description="It doesn&apos;t just flag threats; it explains the 'why', helping users build their own digital intuition over time."
                    delay={0.2}
                />
                <InfoCard
                    icon={Heart}
                    title="Social Impact"
                    description="Focused on protecting vulnerable groups from financial fraud, QR scams, and phishing attacks."
                    delay={0.3}
                />
            </div>

            <section className="mb-32">
                <div className="flex items-center gap-4 mb-12">
                    <BookOpen className="w-10 h-10 text-[#00d4ff]" />
                    <h2 className="text-4xl font-display font-bold text-white">Scam Knowledge Center</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        { title: "Phishing Scams", desc: "Digital impersonation where attackers trick users into sharing sensitive credentials via fake websites." },
                        { title: "UPI & QR Scams", desc: "Request-to-pay frauds where users accidentally authorize payments while expecting a refund." },
                        { title: "Loan & Job Fraud", desc: "Social engineering attacks promising easy money or employment to steal processing fees." },
                        { title: "Social Engineering", desc: "Psychological manipulation designed to create urgency or panic, leading to security lapses." }
                    ].map((topic, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ x: 10 }}
                            className="p-8 glass-card border-white/5 hover:border-[#00d4ff]/20 transition-all cursor-default"
                        >
                            <h4 className="text-[#00d4ff] font-display font-bold text-xl mb-2">{topic.title}</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">{topic.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="glass-card p-12 text-center bg-gradient-to-b from-[#00d4ff]/5 to-transparent border-[#00d4ff]/10">
                <h2 className="text-3xl font-display font-bold text-white mb-6">Designed for Change</h2>
                <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">
                    ScamGPT is more than just a tool; it&apos;s a collective defense network. Every report you submit
                    makes the digital world slightly safer for everyone else.
                </p>
                <div className="flex flex-wrap justify-center gap-12">
                    <div className="flex flex-col items-center">
                        <span className="text-4xl font-display font-bold text-white mb-1">10k+</span>
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Threats Analyzed</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-4xl font-display font-bold text-white mb-1">Real-time</span>
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Heuristic Engine</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-4xl font-display font-bold text-white mb-1">Free</span>
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Open Access</span>
                    </div>
                </div>
            </section>
        </div>
    );
}

function Brain({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24" height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M9.5 2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5z" />
            <path d="M14.5 2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5z" />
            <path d="M11 11H9.5a2.5 2.5 0 0 0 0 5h1" />
            <path d="M13 11h1.5a2.5 2.5 0 0 1 0 5h-1" />
            <path d="M12 11h.01" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="M12 11a4 4 0 0 1 0 8" />
            <path d="M8 8a5 5 0 0 1 8 0" />
        </svg>
    );
}
