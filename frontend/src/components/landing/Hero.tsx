'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Terminal, Shield, Zap, Lock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface HeroProps {
    onAnalyze: (text: string) => void;
    isLoading: boolean;
}

export default function Hero({ onAnalyze, isLoading }: HeroProps) {
    const [input, setInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) onAnalyze(input);
    };

    return (
        <div className="relative pt-32 pb-20 px-6 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute inset-0 neural-grid opacity-[0.15] pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="text-center space-y-6 mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-4 inline-block">
                            Cognitive AI Defense v2.0
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-[0.9] mb-6">
                            Real-Time Cognitive AI Defense <br />
                            <span className="text-zinc-600">Against Digital Scams</span>
                        </h1>
                        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-medium tracking-tight">
                            Detect phishing, payment fraud, fake URLs, and scam messages instantly using advanced AI reasoning.
                        </p>
                    </motion.div>
                </div>

                {/* Hero Scanner Input */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="max-w-2xl mx-auto"
                >
                    <div className="glass rounded-2xl p-1 shadow-2xl glow-blue transition-standard hover:border-primary/30">
                        <form onSubmit={handleSubmit} className="relative">
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Paste suspicious message, payment link, email, or URL..."
                                className="w-full bg-transparent border-none outline-none text-white text-base p-6 min-h-[140px] placeholder:text-zinc-600 resize-none font-medium leading-relaxed"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSubmit(e);
                                }}
                            />

                            <div className="flex items-center justify-between px-4 pb-4">
                                <div className="flex items-center gap-4 text-zinc-600 px-2">
                                    <div className="flex items-center gap-1.5">
                                        <Shield className="w-3.5 h-3.5" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">SSL Secure</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Zap className="w-3.5 h-3.5" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">Low Latency</span>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className="h-11 px-6 gap-2 rounded-xl text-xs font-bold uppercase tracking-widest group"
                                >
                                    {isLoading ? 'Analyzing...' : 'Analyze Threat'}
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                </Button>
                            </div>
                        </form>
                    </div>

                    <div className="mt-6 flex justify-center gap-8 opacity-40">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-safe rounded-full" />
                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">URL Phishing</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-warning rounded-full" />
                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Payment Scams</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-scam rounded-full" />
                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Social Engineering</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
