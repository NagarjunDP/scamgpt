'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ShieldAlert, Activity, Lock, ArrowUpRight } from 'lucide-react';

const METRICS = [
    { label: 'Scams Detected Today', value: '1,242', trend: '+12%', icon: ShieldAlert, color: 'text-scam' },
    { label: 'Phishing Links Blocked', value: '472', trend: '+8%', icon: Lock, color: 'text-primary' },
    { label: 'Fraud Messages Flagged', value: '891', trend: '+15%', icon: ShieldCheck, color: 'text-safe' },
    { label: 'AI Threat Accuracy', value: '99.4%', trend: '+0.2%', icon: Activity, color: 'text-emerald-400' },
];

export default function DashboardPreview() {
    return (
        <section className="py-32 px-6 bg-zinc-950/30 border-y border-border/50 relative">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                    <div className="max-w-xl">
                        <h2 className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] mb-4">Intelligence Monitoring</h2>
                        <h3 className="text-4xl font-bold text-white tracking-tighter leading-none mb-6">Real-Time Security Dashboard</h3>
                        <p className="text-zinc-500 text-lg font-medium tracking-tight">
                            Monitor global threat activity and system performance from our unified cognitive defense center.
                        </p>
                    </div>
                    <button className="px-6 py-3 bg-primary text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-standard shadow-lg shadow-primary/20">
                        Enter Dashboard
                    </button>
                </div>

                <div className="grid md:grid-cols-4 gap-6">
                    {METRICS.map((metric, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-3xl glass border-white/5 glowing shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <metric.icon className="w-20 h-20" />
                            </div>

                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-zinc-950/50 border border-border/50 flex items-center justify-center">
                                    <metric.icon className={cn("w-5 h-5", metric.color)} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none mb-1">Live Feed</span>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 bg-safe rounded-full animate-pulse" />
                                        <span className="text-[8px] font-bold text-safe uppercase tracking-widest">Active</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{metric.label}</h4>
                                <div className="flex items-end gap-3">
                                    <span className="text-4xl font-bold text-white tracking-tighter">{metric.value}</span>
                                    <span className="text-xs font-bold text-safe pb-1.5 flex items-center">{metric.trend} <ArrowUpRight className="w-3 h-3" /></span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Abstract Grid HUD Graphic */}
                <div className="mt-20 h-40 w-full rounded-2xl bg-zinc-900/20 border border-border/30 overflow-hidden relative">
                    <div className="absolute inset-0 neural-grid opacity-[0.2]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-1/2 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-pulse" />
                    </div>
                </div>
            </div>
        </section>
    );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ');
}
