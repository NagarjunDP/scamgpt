'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    ShieldCheck,
    ShieldAlert,
    Activity,
    Users,
    Database,
    Lock,
    ArrowUpRight,
    Zap,
    LayoutDashboard,
    Cpu
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const STATS = [
    { label: 'Threats Analyzed Today', value: '1,242', change: '+12%', icon: Activity, color: 'text-primary' },
    { label: 'Active Scam Campaigns', value: '42', change: '-5%', icon: ShieldAlert, color: 'text-warning' },
    { label: 'Detection Accuracy', value: '99.4%', change: '+0.2%', icon: ShieldCheck, color: 'text-success' },
    { label: 'Scams Prevented', value: '892', change: '+18%', icon: Lock, color: 'text-primary' },
];

export default function Dashboard() {
    return (
        <div className="p-10 max-w-7xl mx-auto space-y-12 pb-32">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 overflow-hidden relative"
            >
                <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                <div className="relative">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4">
                        <Activity className="w-3 h-3" /> System Analytics v2.4.0
                    </div>
                    <h1 className="text-5xl font-display font-black text-white tracking-tighter leading-none mb-3">
                        Security <span className="text-primary text-glow">Intelligence</span>
                    </h1>
                    <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em]">Comprehensive protection metrics & heuristic monitoring</p>
                </div>

                <div className="flex gap-4 relative">
                    <div className="glass-card px-6 py-4 border-primary/20 bg-primary/[0.02] flex items-center gap-4 group">
                        <div className="relative">
                            <div className="status-dot bg-success" />
                            <div className="absolute inset-0 bg-success blur-sm animate-pulse" />
                        </div>
                        <div>
                            <span className="block text-[8px] font-black text-gray-600 uppercase tracking-widest leading-none mb-1">Grid Status</span>
                            <span className="text-xs font-black text-white uppercase">Operational</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {STATS.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass-panel p-8 relative overflow-hidden group hover:border-primary/30 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
                    >
                        <div className="absolute -right-6 -bottom-6 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">
                            <stat.icon className="w-32 h-32" />
                        </div>

                        <div className="relative z-10 space-y-6">
                            <div className="flex justify-between items-center">
                                <div className={cn("p-4 rounded-2xl bg-white/[0.03] border border-white/5", stat.color)}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <div className={cn("px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-1",
                                    stat.change.startsWith('+') ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger')}>
                                    {stat.change}
                                    <ArrowUpRight className="w-3 h-3" />
                                </div>
                            </div>

                            <div>
                                <h3 className="text-4xl font-display font-black text-white tracking-tighter mb-1">{stat.value}</h3>
                                <p className="text-[10px] text-gray-500 uppercase font-black tracking-[0.2em]">{stat.label}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Activity Chart Area */}
                <div className="lg:col-span-8 glass-panel p-10 flex flex-col min-h-[500px] relative overflow-hidden">
                    <div className="absolute inset-0 radar-grid opacity-5 pointer-events-none" />

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 relative z-10">
                        <div>
                            <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
                                <Activity className="w-4 h-4 text-primary" /> Multi-Vector Threat Analysis
                            </h3>
                            <p className="text-xs text-white/40 font-bold uppercase">Heuristic pattern detection across 24h cycle</p>
                        </div>
                        <div className="flex bg-white/[0.03] p-1 rounded-xl border border-white/10">
                            <button className="px-4 py-2 bg-primary text-white text-[10px] font-black rounded-lg uppercase tracking-widest shadow-lg shadow-primary/20">Real-time</button>
                            <button className="px-4 py-2 text-gray-500 text-[10px] font-black rounded-lg uppercase tracking-widest hover:text-white transition-colors">Historical</button>
                        </div>
                    </div>

                    <div className="flex-1 flex items-end gap-3 pb-8 relative z-10">
                        {Array.from({ length: 24 }).map((_, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center group">
                                <div className="w-full relative">
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${30 + Math.random() * 70}%` }}
                                        transition={{ duration: 1.5, delay: i * 0.05, ease: "easeOut" }}
                                        className="w-full bg-primary/10 group-hover:bg-primary/30 rounded-t-lg transition-all border-t border-primary/40 relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-primary/5 to-primary/20" />
                                        <div className="scanline h-full opacity-20 [animation-duration:4s]" />
                                    </motion.div>
                                </div>
                                <span className={`mt-4 text-[8px] font-black transition-colors ${i % 4 === 0 ? 'text-gray-500' : 'text-gray-800'}`}>
                                    {i.toString().padStart(2, '0')}:00
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Intelligence Side Block */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="glass-panel p-10 flex flex-col h-full relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-5">
                            <Lock className="w-32 h-32" />
                        </div>

                        <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-10 flex items-center gap-2">
                            <Database className="w-4 h-4 text-primary" /> Active Knowledge Base
                        </h3>

                        <div className="flex-1 space-y-8 relative z-10">
                            {[
                                { label: 'Cross-Domain Heuristics', count: '1.24M', stats: '99.9% Latency' },
                                { label: 'Scam Signature Matrix', count: '450.2K', stats: 'Syncing...' },
                                { label: 'Social Graph Analysis', count: '89.4K', stats: 'Live Feed' },
                                { label: 'Payment Gateway Vault', count: '12,042', stats: 'Encrypted' },
                            ].map((source, idx) => (
                                <div key={idx} className="flex gap-4 group">
                                    <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-primary group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-300">
                                        <Zap className="w-5 h-5" />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-black text-white uppercase tracking-tight">{source.label}</span>
                                            <span className="text-[9px] font-black text-primary/60 font-mono tracking-tighter">{source.count}</span>
                                        </div>
                                        <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">{source.stats}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="mt-12 btn-cyber w-full py-5 flex items-center justify-center gap-3 shadow-primary/10">
                            <Cpu className="w-4 h-4" /> Recalibrate Neural Adapters
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
