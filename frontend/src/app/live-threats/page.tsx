'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Activity,
    MapPin,
    Clock,
    ShieldAlert,
    ExternalLink,
    Zap,
    Cpu,
    Globe
} from 'lucide-react';

const INITIAL_THREATS = [
    { id: 1, type: 'Phishing', target: 'secure-amazon-refund.xyz', location: 'Mumbai, IN', time: 'Just now', severity: 'High' },
    { id: 2, type: 'UPI Fraud', target: 'pay-merchant-442@okicici', location: 'Delhi, IN', time: '2 mins ago', severity: 'Critical' },
    { id: 3, type: 'SMS Scam', target: 'HDFC KYV Expired', location: 'Bangalore, IN', time: '5 mins ago', severity: 'Medium' },
    { id: 4, type: 'Brand Impersonation', target: 'login-fedex-tracking.net', location: 'Hyderabad, IN', time: '12 mins ago', severity: 'High' },
    { id: 5, type: 'Credential Theft', target: 'microsoft-office-v3.com', location: 'Chennai, IN', time: '18 mins ago', severity: 'Critical' },
];

const THREAT_TYPES = ['Phishing', 'UPI Fraud', 'SMS Scam', 'Brand Impersonation', 'Credential Theft'];
const LOCATIONS = ['Mumbai, IN', 'Delhi, IN', 'Bangalore, IN', 'Chennai, IN', 'Kolkata, IN', 'Pune, IN', 'Ahmedabad, IN'];

export default function LiveThreatFeed() {
    const [threats, setThreats] = useState(INITIAL_THREATS);

    useEffect(() => {
        const interval = setInterval(() => {
            const newThreat = {
                id: Date.now(),
                type: THREAT_TYPES[Math.floor(Math.random() * THREAT_TYPES.length)],
                target: `threat-vector-${Math.floor(Math.random() * 999)}.net`,
                location: LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)],
                time: 'Just now',
                severity: Math.random() > 0.7 ? 'Critical' : (Math.random() > 0.4 ? 'High' : 'Medium')
            };

            setThreats(prev => [newThreat, ...prev.slice(0, 14)]);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="p-10 max-w-7xl mx-auto space-y-12 pb-32">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/5 pb-12 relative"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                <div className="relative">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4">
                        <Activity className="w-3 h-3 animate-pulse" /> Live Monitoring Active
                    </div>
                    <h1 className="text-5xl font-display font-black text-white tracking-tighter leading-none mb-3">
                        Global <span className="text-primary text-glow">Intelligence</span> Feed
                    </h1>
                    <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em] max-w-xl">Real-time heuristic tracking of multi-vector cyber threats across global networks.</p>
                </div>

                <div className="flex gap-4 relative">
                    <div className="glass-card px-6 py-4 border-success/20 bg-success/[0.02] flex items-center gap-4">
                        <div className="relative">
                            <div className="status-dot bg-success" />
                            <div className="absolute inset-0 bg-success blur-sm animate-pulse" />
                        </div>
                        <span className="text-xs font-black text-white uppercase">Nodes Synced</span>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Stats Sidebar */}
                <div className="lg:col-span-3 space-y-8">
                    <div className="glass-panel p-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                            <Zap className="w-20 h-20" />
                        </div>
                        <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-8">Activity Metrics</h3>
                        <div className="space-y-8">
                            <div>
                                <p className="text-4xl font-display font-black text-white tracking-tighter mb-1">1,242</p>
                                <p className="text-[9px] text-primary font-black uppercase tracking-widest">Threats Neutralized</p>
                            </div>
                            <div>
                                <p className="text-4xl font-display font-black text-white tracking-tighter mb-1">42</p>
                                <p className="text-[9px] text-warning font-black uppercase tracking-widest">Active Operations</p>
                            </div>
                        </div>
                        <div className="mt-10 pt-8 border-t border-white/5">
                            <button className="w-full py-4 btn-cyber text-[10px] shadow-primary/10">Download Intelligence Report</button>
                        </div>
                    </div>

                    <div className="glass-panel p-8 space-y-6">
                        <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] flex items-center gap-2">
                            <Globe className="w-4 h-4 text-primary" /> Region Status
                        </h3>
                        <div className="space-y-3">
                            {[
                                { label: 'Asia-South', status: 'Optimal', load: '12%' },
                                { label: 'Europe-West', status: 'Peak Load', load: '84%', warning: true },
                                { label: 'US-East', status: 'Optimal', load: '45%' },
                            ].map((region, idx) => (
                                <div key={idx} className="bg-white/[0.02] p-4 rounded-xl border border-white/5 group hover:border-white/10 transition-colors">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-[10px] font-black text-white uppercase">{region.label}</span>
                                        <span className={cn("text-[8px] font-black uppercase", region.warning ? "text-warning" : "text-success")}>{region.status}</span>
                                    </div>
                                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                        <div className={cn("h-full", region.warning ? "bg-warning" : "bg-success")} style={{ width: region.load }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Live List */}
                <div className="lg:col-span-9 space-y-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-[11px] font-black text-gray-500 uppercase tracking-[0.4em]">Inbound Threat Vectors</h2>
                        <div className="text-[9px] font-black text-primary/50 uppercase tracking-widest animate-pulse">Scanning Global Ports...</div>
                    </div>

                    <div className="space-y-4">
                        <AnimatePresence mode="popLayout">
                            {threats.map((threat) => (
                                <motion.div
                                    key={threat.id}
                                    layout
                                    initial={{ opacity: 0, x: -20, scale: 0.98 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="glass-panel p-6 hover:border-primary/30 transition-all duration-300 flex flex-col md:flex-row items-center gap-8 relative group overflow-hidden"
                                >
                                    <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />

                                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg",
                                        threat.severity === 'Critical' ? 'bg-danger/20 text-danger shadow-danger/10' :
                                            threat.severity === 'High' ? 'bg-warning/20 text-warning shadow-warning/10' : 'bg-primary/20 text-primary shadow-primary/10'
                                    )}>
                                        <ShieldAlert className="w-7 h-7" />
                                    </div>

                                    <div className="flex-1 text-center md:text-left space-y-1">
                                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                                            <span className={cn("text-[10px] font-black uppercase tracking-[0.2em]",
                                                threat.severity === 'Critical' ? 'text-danger' :
                                                    threat.severity === 'High' ? 'text-warning' : 'text-primary'
                                            )}>{threat.type}</span>
                                            <span className="text-[10px] text-white/20 hidden md:block">|</span>
                                            <span className="text-[10px] text-gray-600 font-black uppercase tracking-widest flex items-center gap-1.5">
                                                <Clock className="w-3.5 h-3.5" />
                                                {threat.time}
                                            </span>
                                        </div>
                                        <p className="text-xl font-display font-bold text-white group-hover:text-primary transition-colors tracking-tight">{threat.target}</p>
                                    </div>

                                    <div className="flex flex-col md:items-end gap-2 shrink-0 md:text-right">
                                        <div className="flex items-center gap-2 text-gray-500 font-bold uppercase text-[9px] tracking-widest">
                                            <MapPin className="w-3.5 h-3.5" />
                                            {threat.location}
                                        </div>
                                        <div className={cn("px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg",
                                            threat.severity === 'Critical' ? 'bg-danger text-white shadow-danger/20' :
                                                threat.severity === 'High' ? 'bg-warning text-black shadow-warning/20' : 'bg-primary text-white shadow-primary/20'
                                        )}>
                                            {threat.severity} Priority
                                        </div>
                                    </div>

                                    <button className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 text-gray-600 hover:text-white hover:border-primary/40 transition-all">
                                        <ExternalLink className="w-5 h-5" />
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
