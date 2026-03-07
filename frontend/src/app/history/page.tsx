'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Shield, MapPin, Clock, History as HistoryIcon, Globe } from 'lucide-react';

interface UserReport {
    id: string;
    type: string;
    target: string;
    location: string;
    timestamp: string;
}

export default function HistoryPage() {
    const [myHistory, setMyHistory] = useState<UserReport[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem('scamgpt_user_history');
        if (saved) {
            try {
                setMyHistory(JSON.parse(saved));
            } catch(e) {}
        }
    }, []);

    return (
        <div className="min-h-full p-8 selection:bg-[#ff0033]/30 selection:text-white">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center">
                        <HistoryIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">Your Reporting History</h1>
                        <p className="text-zinc-500 text-sm">Review your contributions to the Scam Intelligence Network</p>
                    </div>
                </div>

                {/* Gamified Impact Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <div className="bg-[#111111]/80 backdrop-blur-md border border-emerald-500/20 rounded-2xl p-8 relative overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.05)]">
                        {/* Decorative background glow */}
                        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                        
                        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                            <div className="w-24 h-24 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                                <Award className="w-12 h-12 text-emerald-400" />
                            </div>
                            <div className="text-center md:text-left">
                                <h3 className="text-2xl font-bold text-white mb-2">Your Intelligence Impact</h3>
                                <p className="text-lg text-emerald-400 mb-4 font-medium">
                                    Total Threats Reported: <span className="text-3xl font-black ml-2">{myHistory.length}</span>
                                </p>
                                <p className="text-zinc-400 leading-relaxed max-w-2xl">
                                    By reporting these threats, you are taking one absolute step closer to a more secure and safe era. Your proactive contributions stand unique across the globe in protecting vulnerable users and building collective cognitive resilience.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* History List */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-6 text-zinc-400">
                        <Globe className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-widest">Global Defense Records</span>
                    </div>

                    {myHistory.length === 0 ? (
                        <div className="text-center py-16 bg-[#111111]/50 border border-dashed border-zinc-800 rounded-2xl">
                            <Shield className="w-12 h-12 text-zinc-800 mx-auto mb-4" />
                            <p className="text-zinc-500 text-sm">No reports found in your history log.</p>
                        </div>
                    ) : (
                        myHistory.map((report, idx) => (
                            <motion.div 
                                key={report.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="group relative bg-[#111111]/60 border border-zinc-900 rounded-xl p-5 hover:border-emerald-500/30 hover:bg-emerald-500/[0.02] transition-standard flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 transition-standard">
                                        <Shield className="w-5 h-5 text-zinc-500 group-hover:text-emerald-500" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-bold rounded uppercase">
                                                {report.type}
                                            </span>
                                            <span className="text-xs font-mono text-zinc-500 truncate max-w-xs">{report.target}</span>
                                        </div>
                                        <p className="text-xs text-zinc-600 flex items-center gap-1.5 uppercase tracking-tighter">
                                            Record ID: <span className="text-zinc-400">{report.id}</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 text-right shrink-0">
                                    <div className="flex flex-col items-end">
                                        <p className="text-xs text-zinc-400 flex items-center gap-1.5 mb-1">
                                            <MapPin className="w-3.5 h-3.5" />
                                            {report.location}
                                        </p>
                                        <p className="text-[10px] text-zinc-600 flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {new Date(report.timestamp).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
