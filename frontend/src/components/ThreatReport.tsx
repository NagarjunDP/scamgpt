'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    ShieldAlert,
    ShieldCheck,
    ShieldQuestion,
    AlertTriangle,
    ArrowRight,
    Target,
    FileSearch,
    Zap,
    ChevronRight,
    Database,
    Activity
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ThreatReportProps {
    data: {
        threat_level: "High" | "Medium" | "Low";
        attack_type: string;
        reasoning: string;
        risk_score: number;
        prediction: number;
        pattern_memory: {
            similarity: number;
            match_count: number;
            status: string;
        };
        attack_graph: any[];
    };
    onReset: () => void;
}

export default function ThreatReport({ data, onReset }: ThreatReportProps) {
    const isHighRisk = data.risk_score > 0.6;
    const isMediumRisk = data.risk_score > 0.3 && data.risk_score <= 0.6;

    const riskColor = isHighRisk ? 'text-danger' : isMediumRisk ? 'text-warning' : 'text-success';
    const riskBg = isHighRisk ? 'bg-danger/10 border-danger/20' : isMediumRisk ? 'bg-warning/10 border-warning/20' : 'bg-success/10 border-success/20';
    const riskGlow = isHighRisk ? 'shadow-danger/20' : isMediumRisk ? 'shadow-warning/20' : 'shadow-success/20';

    return (
        <div className="w-full max-w-6xl mx-auto space-y-8 pb-32">
            {/* Top Analysis Banner */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn("p-8 rounded-[2rem] border relative overflow-hidden flex flex-col md:flex-row items-center gap-8 shadow-2xl", riskBg, riskGlow)}
            >
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                    <ShieldAlert className="w-40 h-40" />
                </div>

                <div className={cn("w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl shrink-0", isHighRisk ? "bg-danger shadow-danger/40" : isMediumRisk ? "bg-warning shadow-warning/40" : "bg-success shadow-success/40")}>
                    {isHighRisk ? <ShieldAlert className="w-12 h-12 text-white" /> : isMediumRisk ? <ShieldQuestion className="w-12 h-12 text-white" /> : <ShieldCheck className="w-12 h-12 text-white" />}
                </div>

                <div className="flex-1 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] font-black text-white uppercase tracking-[0.2em] mb-4">
                        <Activity className="w-3 h-3" /> Report ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
                    </div>
                    <h2 className="text-4xl font-display font-black text-white mb-2 tracking-tight">
                        {isHighRisk ? 'CRITICAL THREAT DETECTED' : isMediumRisk ? 'SUSPICIOUS SIGNAL IDENTIFIED' : 'SCAN VERIFIED: CLEAN'}
                    </h2>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                        <div className="flex items-center gap-2">
                            <div className={cn("status-dot", isHighRisk ? "bg-danger" : isMediumRisk ? "bg-warning" : "bg-success")} />
                            <span className={cn("text-xs font-black uppercase tracking-widest", riskColor)}>{data.threat_level} Priority Analysis</span>
                        </div>
                        <span className="text-white/20 hidden md:block">|</span>
                        <div className="flex items-center gap-2 text-white/60 text-xs font-bold uppercase tracking-widest">
                            <Target className="w-4 h-4" /> Vector: {data.attack_type}
                        </div>
                    </div>
                </div>

                <button
                    onClick={onReset}
                    className="btn-cyber px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white shadow-none shrink-0"
                >
                    Initialize New Scan
                </button>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Metrics */}
                <div className="lg:col-span-4 space-y-8">
                    {/* High Fidelity Risk Meter */}
                    <div className="glass-panel p-8 flex flex-col items-center">
                        <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-8">Risk Probability</h3>
                        <div className="relative w-48 h-48 flex items-center justify-center">
                            <svg className="w-full h-full -rotate-90">
                                <circle cx="96" cy="96" r="88" fill="transparent" stroke="rgba(255,255,255,0.03)" strokeWidth="12" />
                                <motion.circle
                                    cx="96" cy="96" r="88" fill="transparent" stroke="currentColor" strokeWidth="12"
                                    strokeDasharray={552.9}
                                    initial={{ strokeDashoffset: 552.9 }}
                                    animate={{ strokeDashoffset: 552.9 - (552.9 * data.risk_score) }}
                                    transition={{ duration: 2, ease: "easeOut" }}
                                    className={riskColor}
                                />
                            </svg>
                            <div className="absolute flex flex-col items-center justify-center text-center">
                                <span className="text-5xl font-display font-black text-white tracking-tighter">{Math.round(data.risk_score * 100)}%</span>
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-1">Threat Score</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 w-full mt-10">
                            <div className="bg-white/[0.02] p-4 rounded-2xl border border-white/5 text-center">
                                <span className="block text-[8px] font-black text-gray-600 uppercase tracking-widest mb-1">Status</span>
                                <span className={cn("text-xs font-black uppercase", riskColor)}>{isHighRisk ? 'Lethal' : 'Stable'}</span>
                            </div>
                            <div className="bg-white/[0.02] p-4 rounded-2xl border border-white/5 text-center">
                                <span className="block text-[8px] font-black text-gray-600 uppercase tracking-widest mb-1">Confidence</span>
                                <span className="text-xs font-black text-white uppercase">98.4%</span>
                            </div>
                        </div>
                    </div>

                    {/* Source Intelligence */}
                    <div className="glass-panel p-8 space-y-6">
                        <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] flex items-center gap-2">
                            <Database className="w-4 h-4 text-primary" /> Intelligence Match
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <p className="text-lg font-display font-bold text-white uppercase leading-tight">{data.pattern_memory.status}</p>
                                <p className="text-2xl font-display font-bold text-primary">{Math.round(data.pattern_memory.similarity * 100)}%</p>
                            </div>
                            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${data.pattern_memory.similarity * 100}%` }}
                                    transition={{ duration: 1.5 }}
                                    className="h-full bg-primary shadow-[0_0_10px_rgba(79,140,255,0.5)]"
                                />
                            </div>
                            <p className="text-[10px] text-gray-600 font-bold leading-relaxed">
                                Identified {data.pattern_memory.match_count} distinct structural similarities in our real-time scam repository.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Reasoning & Actions */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Cognitive Reasoning Module */}
                    <div className="glass-panel p-10 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-40 group-hover:opacity-100 transition-opacity" />
                        <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
                            <Zap className="w-4 h-4 text-primary" /> Cognitive Reasoning Engine
                        </h3>
                        <div className="prose prose-invert max-w-none">
                            <p className="text-2xl font-medium text-gray-200 leading-[1.6] tracking-tight">
                                {data.reasoning}
                            </p>
                        </div>
                        <div className="mt-12 pt-8 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="text-[9px] font-black text-danger uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                    <Target className="w-3 h-3" /> Identified Objectives
                                </h4>
                                <div className="space-y-3">
                                    {data.attack_graph?.map((node, i) => (
                                        <div key={i} className="flex items-center gap-3 px-4 py-2 bg-danger/5 border border-danger/10 rounded-xl">
                                            <div className="w-1 h-1 rounded-full bg-danger shadow-[0_0_8px_rgba(255,77,79,0.8)]" />
                                            <span className="text-[11px] font-black text-white uppercase tracking-wider">{node.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className="text-[9px] font-black text-success uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                    <ShieldCheck className="w-3 h-3" /> Recommended Counters
                                </h4>
                                <div className="space-y-4">
                                    <div className={cn("p-4 rounded-xl border-l-4", isHighRisk ? "bg-danger/10 border-danger" : "bg-success/10 border-success")}>
                                        <p className="text-xs font-black text-white uppercase mb-1">Defensive Protocol</p>
                                        <p className="text-[11px] text-gray-400 font-medium leading-relaxed">
                                            {isHighRisk
                                                ? "Execute Emergency Lock: Do not interact with the source. Report to National Cyber Crime portal immediately."
                                                : "Standard Watch: Maintain digital hygiene and monitor for subsequent related attempts."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Operational Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <button className="btn-cyber w-full py-6 flex items-center justify-center gap-3 active:scale-[0.98]">
                            <ShieldAlert className="w-5 h-5" /> Flag as Critical Threat
                        </button>
                        <button className="w-full py-6 rounded-[1.25rem] bg-white/5 border border-white/10 text-white font-black text-[11px] uppercase tracking-[0.2em] hover:bg-white/10 transition-all flex items-center justify-center gap-3 active:scale-[0.98]">
                            <Target className="w-5 h-5" /> Trace Source Origin
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
