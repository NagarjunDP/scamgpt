'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    ShieldCheck, ShieldAlert, ShieldX, Info, ListCheck,
    Activity, Search, Shield, Fingerprint, Lock, CheckCircle2, XCircle, AlertCircle,
    CreditCard
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Signal {
    label: string;
    pass: boolean;
    detail: string;
}

interface EmailSignals {
    sender_domain: string;
    sender_username: string;
    signals: Signal[];
    verdict: 'SCAM' | 'LEGITIMATE';
}

interface UpiSignals {
    upi_id: string;
    signals: Signal[];
    verdict: 'SCAM' | 'LEGITIMATE';
}

interface AnalysisResultProps {
    data: {
        threat_level: string;
        attack_type: string;
        reasoning: string;
        risk_score: number;
        email_signals?: EmailSignals | null;
        upi_signals?: UpiSignals | null;
        pattern_memory: {
            similarity: number;
            match_count: number;
            status: string;
        };
    };
    onReset: () => void;
}

function EmailForensicsPanel({ signals }: { signals: EmailSignals }) {
    const isScam = signals.verdict === 'SCAM';

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="border-t border-border/50 bg-zinc-950/30"
        >
            <div className="p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <Fingerprint className="w-4 h-4 text-primary" />
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Email Forensics</span>
                    </div>
                    <div className={cn(
                        "flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                        isScam
                            ? "bg-red-500/10 text-red-400 border-red-500/20"
                            : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    )}>
                        {isScam ? <XCircle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                        {isScam ? 'Scam Email Detected' : 'Verified Legitimate'}
                    </div>
                </div>

                {/* Sender info */}
                <div className="mb-6 p-4 rounded-2xl bg-zinc-900/40 border border-border/40 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center">
                        <span className="text-lg font-bold text-zinc-300">
                            {signals.sender_username[0]?.toUpperCase() || '?'}
                        </span>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-0.5">Analysed Sender</p>
                        <p className="text-white font-mono text-sm font-semibold">
                            {signals.sender_username}
                            <span className="text-zinc-500">@</span>
                            <span className="text-primary">{signals.sender_domain}</span>
                        </p>
                    </div>
                </div>

                {/* Signal grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {signals.signals.map((signal, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * i + 0.4 }}
                            className={cn(
                                "p-4 rounded-2xl border flex gap-3 items-start",
                                signal.pass
                                    ? "bg-emerald-500/5 border-emerald-500/15"
                                    : "bg-red-500/5 border-red-500/15"
                            )}
                        >
                            <div className={cn(
                                "mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0",
                                signal.pass ? "bg-emerald-500/20" : "bg-red-500/20"
                            )}>
                                {signal.pass
                                    ? <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                    : <XCircle className="w-3 h-3 text-red-400" />
                                }
                            </div>
                            <div>
                                <p className={cn(
                                    "text-[10px] font-bold uppercase tracking-widest mb-1",
                                    signal.pass ? "text-emerald-400" : "text-red-400"
                                )}>
                                    {signal.label} — {signal.pass ? 'PASS' : 'FAIL'}
                                </p>
                                <p className="text-zinc-400 text-[11px] leading-relaxed font-medium">
                                    {signal.detail}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* How we validate note */}
                <div className="mt-5 p-4 rounded-2xl bg-zinc-900/20 border border-zinc-800/40 flex gap-3 items-start">
                    <AlertCircle className="w-4 h-4 text-zinc-500 mt-0.5 shrink-0" />
                    <p className="text-zinc-500 text-[11px] leading-relaxed">
                        <span className="font-bold text-zinc-400">How we validate:</span>{' '}
                        We analyse the sender username for impersonation keywords, check if official-sounding names
                        use free email providers (red flag), inspect domain complexity for subdomain tricks,
                        and match against known phishing campaign signatures.
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

function UPIForensicsPanel({ signals }: { signals: UpiSignals }) {
    const isScam = signals.verdict === 'SCAM';

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="border-t border-border/50 bg-zinc-950/30"
        >
            <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-primary" />
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">UPI Payment Forensics</span>
                    </div>
                    <div className={cn(
                        "flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                        isScam ? "bg-red-500/10 text-red-400 border-red-500/20" : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    )}>
                        {isScam ? <XCircle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                        {isScam ? 'Scam Payment Detected' : 'Appears Legitimate'}
                    </div>
                </div>

                <div className="mb-6 p-4 rounded-2xl bg-zinc-900/40 border border-border/40 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-zinc-300" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-0.5">Analysed UPI / Payment Input</p>
                        <p className="text-white font-mono text-sm font-semibold">{signals.upi_id}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {signals.signals.map((signal, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * i + 0.4 }}
                            className={cn(
                                "p-4 rounded-2xl border flex gap-3 items-start",
                                signal.pass ? "bg-emerald-500/5 border-emerald-500/15" : "bg-red-500/5 border-red-500/15"
                            )}
                        >
                            <div className={cn(
                                "mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0",
                                signal.pass ? "bg-emerald-500/20" : "bg-red-500/20"
                            )}>
                                {signal.pass ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <XCircle className="w-3 h-3 text-red-400" />}
                            </div>
                            <div>
                                <p className={cn(
                                    "text-[10px] font-bold uppercase tracking-widest mb-1",
                                    signal.pass ? "text-emerald-400" : "text-red-400"
                                )}>
                                    {signal.label} — {signal.pass ? 'PASS' : 'FAIL'}
                                </p>
                                <p className="text-zinc-400 text-[11px] leading-relaxed font-medium">{signal.detail}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-5 p-4 rounded-2xl bg-zinc-900/20 border border-zinc-800/40 flex gap-3 items-start">
                    <AlertCircle className="w-4 h-4 text-zinc-500 mt-0.5 shrink-0" />
                    <p className="text-zinc-500 text-[11px] leading-relaxed">
                        <span className="font-bold text-zinc-400">How we validate:</span>{' '}
                        We verify the UPI PSP handle (e.g. @ybl, @oksbi) against the official RBI-registered list, check the username for
                        charity/relief bait keywords used in fake donation scams, detect pre-filled payment link amounts,
                        and flag urgency phrases like 'send OTP' or 'cashback refund' that are classic collect-scam triggers.
                    </p>
                </div>
            </div>
        </motion.div>
    );
}


export default function AnalysisResult({ data, onReset }: AnalysisResultProps) {
    const isHighRisk = data.risk_score > 0.6;
    const isMediumRisk = data.risk_score > 0.3 && data.risk_score <= 0.6;

    const statusColor = isHighRisk ? 'text-scam' : isMediumRisk ? 'text-warning' : 'text-safe';
    const statusBg = isHighRisk ? 'bg-scam/10' : isMediumRisk ? 'bg-warning/10' : 'bg-safe/10';
    const statusBorder = isHighRisk ? 'border-scam/20' : isMediumRisk ? 'border-warning/20' : 'border-safe/20';
    const StatusIcon = isHighRisk ? ShieldX : isMediumRisk ? ShieldAlert : ShieldCheck;

    // Clean up reasoning text — strip markdown ### headers
    const cleanReasoning = data.reasoning
        .replace(/###\s.+/g, '')
        .replace(/\*\(Note:.+\)\*/g, '')
        .trim();

    const isEmail = data.attack_type.toLowerCase() === 'email';
    const isUpi = data.attack_type.toLowerCase() === 'transaction';

    return (
        <div className="max-w-4xl mx-auto px-6 py-20 relative z-20">
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-3xl overflow-hidden shadow-2xl border-white/5"
            >
                <div className="flex flex-col md:flex-row border-b border-border/50">
                    {/* Main Risk Score Panel */}
                    <div className="p-10 flex flex-col items-center justify-center border-r border-border/50 md:w-72 bg-zinc-900/20">
                        <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-8">Threat Probability</h3>
                        <div className="relative w-36 h-36 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="68" cy="68" r="60" fill="none" stroke="currentColor" strokeWidth="8" className="text-zinc-800" />
                                <motion.circle
                                    cx="68" cy="68" r="60"
                                    fill="none" stroke="currentColor" strokeWidth="8"
                                    strokeDasharray={377}
                                    initial={{ strokeDashoffset: 377 }}
                                    animate={{ strokeDashoffset: 377 - (377 * data.risk_score) }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    className={statusColor}
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-bold text-white tracking-tighter">{(data.risk_score * 100).toFixed(0)}%</span>
                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Risk Score</span>
                            </div>
                        </div>

                        <div className={cn("mt-8 px-4 py-2 rounded-full border flex items-center gap-2", statusBg, statusBorder)}>
                            <StatusIcon className={cn("w-4 h-4", statusColor)} />
                            <span className={cn("text-xs font-bold uppercase tracking-widest", statusColor)}>
                                {isHighRisk ? 'Scam Detected' : isMediumRisk ? 'Suspicious' : 'Verified Legitimate'}
                            </span>
                        </div>
                    </div>

                    {/* Analysis Details */}
                    <div className="flex-1 p-10 space-y-8">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-2xl font-bold text-white tracking-tight mb-2">
                                    {isEmail ? 'Email Intelligence Report' : 'Analysis Intelligence Report'}
                                </h2>
                                <p className="text-zinc-500 text-sm">Automated scan results generated by Neural Core 2.0</p>
                            </div>
                            <button
                                onClick={onReset}
                                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-standard"
                            >
                                New Scan
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-2xl bg-zinc-900/40 border border-border/50">
                                <div className="flex items-center gap-2 mb-2">
                                    <Fingerprint className="w-3.5 h-3.5 text-primary" />
                                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Attack Vector</span>
                                </div>
                                <span className="text-white font-bold">
                                    {isEmail ? 'Email Impersonation' : isUpi ? 'UPI Payment Fraud' : `${data.attack_type} Manipulation`}
                                </span>
                            </div>
                            <div className="p-4 rounded-2xl bg-zinc-900/40 border border-border/50">
                                <div className="flex items-center gap-2 mb-2">
                                    <Activity className="w-3.5 h-3.5 text-primary" />
                                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Campaign Match</span>
                                </div>
                                <span className="text-white font-bold">{(data.pattern_memory.similarity * 100).toFixed(1)}% Sync</span>
                            </div>
                        </div>

                        {/* Only show full AI explanation for non-emails, or if no signals */}
                        {(!isEmail || !data.email_signals) && (
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <Info className="w-3.5 h-3.5 text-primary" />
                                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">AI Intelligence Explanation</span>
                                </div>
                                <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 text-zinc-300 text-sm leading-relaxed font-medium">
                                    {cleanReasoning}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Email Forensics Panel */}
                {isEmail && data.email_signals && (
                    <EmailForensicsPanel signals={data.email_signals} />
                )}

                {/* UPI Forensics Panel */}
                {isUpi && data.upi_signals && (
                    <UPIForensicsPanel signals={data.upi_signals} />
                )}

                {/* Cognitive Processing Chain — for URL/message only */}
                {!isEmail && !isUpi && (
                    <div className="p-8 bg-zinc-950/50">
                        <div className="flex items-center gap-2 mb-8">
                            <ListCheck className="w-4 h-4 text-zinc-500" />
                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Cognitive Processing Chain</span>
                        </div>
                        <div className="grid md:grid-cols-4 gap-6">
                            {[
                                { step: 1, label: 'URL Intelligence', desc: 'Analyzing domain reputation and pattern matches', icon: Search },
                                { step: 2, label: 'Email Intelligence', desc: 'Validating sender authenticity and SMTP records', icon: Fingerprint },
                                { step: 3, label: 'Domain Reputation', desc: 'Checking registrar age and global blacklists', icon: Shield },
                                { step: 4, label: 'Final Verdict', desc: 'Final classification based on verified signals', icon: Lock },
                            ].map((node, i) => (
                                <div key={i} className="relative group">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-border/50 flex items-center justify-center text-xs font-bold text-zinc-500 group-hover:text-primary transition-standard">
                                            <node.icon className="w-3.5 h-3.5" />
                                        </div>
                                        <span className="text-xs font-bold text-white">Step {node.step}</span>
                                    </div>
                                    <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">{node.label}</h4>
                                    <p className="text-[11px] text-zinc-600 font-medium leading-[1.4]">{node.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
