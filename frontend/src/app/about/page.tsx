'use client';

import React from 'react';
import { Shield, Target, Cpu, Database, Users, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function About() {
    return (
        <div className="p-8 md:p-12 animate-fade-in max-w-5xl mx-auto py-16 selection:bg-blue-500/20">
            {/* Mission Section */}
            <div className="mb-24">
                <Badge variant="neutral" className="mb-6 bg-zinc-800/50">Project Architecture</Badge>
                <h1 className="text-4xl font-semibold text-white tracking-tight mb-8 leading-tight">
                    Cognitive Layer <br />
                    <span className="text-zinc-500 font-medium tracking-normal text-3xl italic">Against Digital Frauds.</span>
                </h1>
                <p className="text-lg text-zinc-500 max-w-2xl leading-relaxed font-medium">
                    ScamGPT leverages hybrid machine learning and LLM-based cognitive reasoning to identify, attribute, and neutralize multi-vector cyber scams in real-time.
                </p>
            </div>

            {/* Core Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
                {[
                    { title: 'Hybrid Intelligence', desc: 'Combines heuristic scoring with linguistic cognitive models for pinpoint accuracy.', icon: Brain },
                    { title: 'Signature Sync', desc: 'Real-time synchronization across global security nodes for immediate propagation.', icon: Network },
                    { title: 'Attack Graphing', desc: 'Deconstruction of scam workflows to identify root infrastructure and objectives.', icon: Target },
                ].map((pillar, i) => (
                    <Card key={i} className="bg-zinc-900/10 border-zinc-800/50 hover:border-zinc-700/80 transition-standard group shadow-none">
                        <CardContent className="p-8">
                            <div className="w-10 h-10 rounded-lg bg-zinc-800/50 border border-zinc-700/30 flex items-center justify-center text-zinc-400 mb-6 group-hover:text-white transition-colors">
                                <pillar.icon size={20} />
                            </div>
                            <h3 className="text-base font-semibold text-white mb-2">{pillar.title}</h3>
                            <p className="text-xs text-zinc-500 leading-relaxed font-medium">{pillar.desc}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Technical Specs */}
            <Card className="border-zinc-800/50 bg-zinc-900/10 shadow-none overflow-hidden">
                <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                        <div className="p-12 border-r border-zinc-800/50">
                            <h2 className="text-xl font-semibold text-white mb-8">Operational Performance</h2>
                            <div className="space-y-6">
                                {[
                                    { label: 'Inference Latency', value: '< 20ms' },
                                    { label: 'Memory Pool', value: '1.2M+ Signatures' },
                                    { label: 'Verification Rate', value: '99.4%' },
                                ].map((spec, i) => (
                                    <div key={i} className="flex items-center justify-between py-3 border-b border-zinc-800/50 last:border-0">
                                        <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{spec.label}</span>
                                        <span className="text-sm font-semibold text-zinc-300">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="p-12 flex items-center justify-center bg-black/20">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full" />
                                <Shield className="w-32 h-32 text-zinc-800 relative z-10 transition-standard group-hover:text-zinc-700" />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="mt-24 text-center border-t border-zinc-800/50 pt-20">
                <p className="text-zinc-600 text-sm mb-10 font-medium italic">"Building the global immune system for the digital age."</p>
                <div className="flex justify-center">
                    <Button variant="secondary" className="gap-2 px-8 py-2.5 bg-zinc-800/50 border-zinc-700 hover:bg-zinc-700/50 hover:text-white transition-standard">
                        Network Statistics <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

function Brain(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.54Z" />
            <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.54Z" />
        </svg>
    )
}

function Network(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect x="16" y="16" width="6" height="6" rx="1" />
            <rect x="2" y="16" width="6" height="6" rx="1" />
            <rect x="9" y="2" width="6" height="6" rx="1" />
            <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
            <path d="M12 12V8" />
        </svg>
    )
}
