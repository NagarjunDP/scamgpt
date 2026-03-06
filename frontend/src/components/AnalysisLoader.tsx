'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Search, Database, Cpu, CheckCircle2, Loader2, Sparkles, Scan } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const stages = [
    { id: 1, label: 'Enabling Neural Engine Subsystem...', icon: Cpu },
    { id: 2, label: 'Cross-referencing Global Threat DB...', icon: Database },
    { id: 3, label: 'Deconstructing Language Syntax...', icon: Sparkles },
    { id: 4, label: 'Fingerprinting Scam Signatures...', icon: Shield },
    { id: 5, label: 'Generating Risk Probability...', icon: Scan },
];

export default function AnalysisLoader() {
    const [currentStage, setCurrentStage] = useState(0);
    const [terminalLines, setTerminalLines] = useState<string[]>([]);

    useEffect(() => {
        if (currentStage < stages.length) {
            const timer = setTimeout(() => {
                setTerminalLines(prev => [...prev.slice(-3), `> ${stages[currentStage].label}`]);
                setCurrentStage(prev => prev + 1);
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [currentStage]);

    return (
        <div className="flex flex-col items-center justify-center p-12 space-y-12 min-h-[500px] w-full max-w-2xl mx-auto glass-panel border-primary/10 relative overflow-hidden">
            {/* Background Grid Accent */}
            <div className="absolute inset-0 radar-grid opacity-10 pointer-events-none" />

            <div className="relative">
                {/* Multi-layered Rotating Rings */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="w-48 h-48 rounded-full border border-dashed border-primary/30 relative"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-4 rounded-full border border-primary/10 shadow-[0_0_50px_rgba(79,140,255,0.05)]"
                />
                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-10 rounded-full bg-primary/5 flex items-center justify-center border border-primary/20 shadow-2xl shadow-primary/20"
                >
                    <div className="relative">
                        <Shield className="w-16 h-16 text-primary animate-pulse" />
                        <motion.div
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <Scan className="w-20 h-20 text-primary opacity-20 scale-125" />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Scanning Beam */}
                <div className="scanline w-48 -translate-y-24 opacity-40" />
            </div>

            <div className="w-full space-y-10 z-10">
                <div className="text-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[9px] font-black text-primary uppercase tracking-[0.3em]"
                    >
                        <Loader2 className="w-3 h-3 animate-spin" />
                        Initiating Deep Search
                    </motion.div>
                    <h2 className="text-3xl font-display font-black text-white tracking-tight">AI Cognitive <span className="text-primary text-glow">Deconstruction</span></h2>
                </div>

                {/* Progress Indicators */}
                <div className="grid grid-cols-5 gap-3">
                    {stages.map((stage, index) => {
                        const isCompleted = index < currentStage;
                        const isCurrent = index === currentStage;
                        return (
                            <div key={stage.id} className="flex flex-col items-center gap-3">
                                <div className={`
                                    w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500
                                    ${isCompleted ? 'bg-success/10 text-success border border-success/30 shadow-[0_0_15px_rgba(46,204,113,0.1)]'
                                        : isCurrent ? 'bg-primary/20 text-primary border border-primary/50 shadow-[0_0_20px_rgba(79,140,255,0.2)]'
                                            : 'bg-white/5 text-gray-700 border border-white/5'}
                                `}>
                                    {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <stage.icon className={cn("w-5 h-5", isCurrent && "animate-pulse")} />}
                                </div>
                                <div className={`h-1 w-full rounded-full bg-white/5 overflow-hidden`}>
                                    {(isCompleted || isCurrent) && (
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: isCompleted ? '100%' : '60%' }}
                                            transition={{ duration: 0.8 }}
                                            className={`h-full ${isCompleted ? 'bg-success' : 'bg-primary animate-pulse'}`}
                                        />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Terminal View */}
                <div className="bg-black/40 rounded-2xl border border-white/5 p-4 font-mono text-[11px] h-28 overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-2 opacity-5">
                        <Database className="w-12 h-12" />
                    </div>
                    {terminalLines.map((line, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-primary leading-relaxed"
                        >
                            <span className="opacity-40">{new Date().toLocaleTimeString()}</span> {line}
                        </motion.div>
                    ))}
                    {currentStage < stages.length && (
                        <div className="text-white mt-1 flex items-center gap-1">
                            <span className="opacity-40">{new Date().toLocaleTimeString()}</span>
                            <span className="animate-pulse">_</span>
                        </div>
                    )}
                </div>
            </div>

            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] text-center">
                Processing through 1,024-bit encryption shield
            </p>
        </div>
    );
}
