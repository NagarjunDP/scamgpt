"use client";

import { motion } from "framer-motion";
import { Search, Terminal, Cpu, ArrowRight, ShieldCheck, Globe, MessageSquare, Database, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const AnalyzerCard = ({ icon: Icon, title, description, badge, color, delay, href }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="glass-card group hover:border-primary/30 transition-all duration-500 overflow-hidden relative border-white/5"
    >
        <div className={cn("absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors bg-white/5")} />
        <div className="p-8 h-full flex flex-col relative z-10">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-white/5 border border-white/10 group-hover:border-primary/20 group-hover:bg-primary/5 transition-all">
                <Icon className="w-7 h-7 text-gray-400 group-hover:text-primary transition-colors" />
            </div>
            <div className="flex items-center gap-3 mb-4">
                <h3 className="text-xl font-display font-bold text-white">{title}</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded border border-white/10 bg-white/5 text-gray-500 uppercase tracking-widest group-hover:text-primary group-hover:border-primary/20 transition-all">
                    {badge}
                </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-1">
                {description}
            </p>
            <Link
                href={href}
                className="flex items-center gap-2 text-xs font-bold text-gray-500 group-hover:text-white transition-colors"
            >
                Start Analysis
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>
    </motion.div>
);

export default function AnalyzerPage() {
    return (
        <div className="flex-1 overflow-y-auto p-8 lg:p-12 bg-[#0B0F19]">
            <div className="max-w-6xl mx-auto">
                <div className="mb-16">
                    <h1 className="text-3xl font-display font-bold text-white tracking-tight">Specialized Cognitive Analysis Cluster</h1>
                    <p className="text-gray-500 mt-2 max-w-2xl leading-relaxed">
                        Access our distributed neural nodes trained specifically for various threat vectors.
                        Each analyzer utilizes specialized heuristics and cognitive reasoning.
                    </p>
                </div>

                <div className="analyzer-grid mb-20">
                    <AnalyzerCard
                        icon={Globe}
                        title="URL Phishing Node"
                        badge="Real-time"
                        description="Analyzes domain reputation, homograph threats, and redirection loops using cognitive linguistic patterns."
                        delay={0.1}
                        href="/chat?tab=url"
                    />
                    <AnalyzerCard
                        icon={MessageSquare}
                        title="NLP Logic Engine"
                        badge="Advanced"
                        description="Evaluates scam psychology, urgency lures, and institutional impersonation in SMS and emails."
                        delay={0.2}
                        href="/chat?tab=message"
                    />
                    <AnalyzerCard
                        icon={Cpu}
                        title="Behavioral Fraud"
                        badge="Sandbox"
                        description="Identifies transaction anomalies, payment context risks, and behavioral indicators of financial scams."
                        delay={0.3}
                        href="/chat?tab=transaction"
                    />
                </div>

                {/* Technical Overview Section */}
                <div className="glass-card p-10 relative overflow-hidden border-white/5 bg-black/20">
                    <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-primary/5 blur-[100px] rounded-full" />
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-display font-bold text-white mb-2">Analysis Methodology</h2>
                                <p className="text-gray-500 text-sm leading-relaxed">Our protocol ensures a 99.4% detection rate through a multi-layer verification stack.</p>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                {[
                                    { icon: Database, title: "Pattern Memory", desc: "Cross-referencing 10k+ historical scam campaigns." },
                                    { icon: ShieldAlert, title: "Heuristic Defense", desc: "Evaluating 54+ known red-flag cyberattack signatures." },
                                    { icon: Terminal, title: "Cognitive AI", desc: "LLM-driven analysis of attack psychology and reasoning." }
                                ].map((step, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                            <step.icon size={18} className="text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-white tracking-tight">{step.title}</h4>
                                            <p className="text-gray-500 text-[11px] leading-relaxed">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-8 bg-black/40 rounded-3xl border border-white/5 space-y-4">
                            <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                <span className="text-[10px] font-bold text-emerald-500 tracking-widest uppercase">System Validation Status</span>
                                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                            </div>
                            <div className="space-y-4 font-mono text-[10px]">
                                {[
                                    { k: "ML_CONFIDENCE", v: "0.9842" },
                                    { k: "LINGUISTIC_TRAP", v: "DETECTED" },
                                    { k: "MEMORY_MATCH", v: "PHISHING_V4" },
                                    { k: "RESPONSE_TIME", v: "420ms" }
                                ].map(item => (
                                    <div key={item.k} className="flex justify-between">
                                        <span className="text-gray-600 uppercase">{item.k}:</span>
                                        <span className="text-white font-bold tracking-widest">{item.v}</span>
                                    </div>
                                ))}
                                <div className="h-1.5 w-full bg-white/5 rounded-full mt-4 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "95%" }}
                                        className="h-full bg-primary shadow-lg shadow-primary/20"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
