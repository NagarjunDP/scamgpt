'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Shield, Lock, CreditCard, Cpu, Brain, Zap, Globe, AlertCircle, Fingerprint } from 'lucide-react';

const FEATURES = [
    {
        title: 'URL Intelligence',
        description: 'Real-time analysis of domain reputation and homograph linguistic patterns.',
        icon: Globe,
        color: 'text-primary',
    },
    {
        title: 'Email Intelligence',
        description: 'Validated sender authenticity and SMTP records to detect phishing and spoofing.',
        icon: Fingerprint,
        color: 'text-emerald-500',
    },
    {
        title: 'System Distribution',
        description: 'Access specialized clusters optimized for regional and sector-specific threat signatures.',
        icon: Shield,
        color: 'text-blue-400',
    },
    {
        title: 'Payment Scam Analysis',
        description: 'Detect fraudulent UPI links, fake payment gateways, and banking solicitation scams.',
        icon: CreditCard,
        color: 'text-warning',
    },
    {
        title: 'Deepfake Awareness',
        description: 'Identifies AI-generated content patterns often used in sophisticated identity theft.',
        icon: Cpu,
        color: 'text-zinc-400',
    },
    {
        title: 'Enterprise-Grade Security',
        description: 'Zero-trust architecture designed for both individual users and security operations centers.',
        icon: Lock,
        color: 'text-purple-500',
    },
];

export default function Features() {
    return (
        <section className="py-32 px-6 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] mb-4">System Capabilities</h2>
                    <h3 className="text-4xl font-bold text-white tracking-tighter leading-none mb-6">Built for Modern Cyber-Defense</h3>
                    <p className="text-zinc-500 text-lg max-w-2xl mx-auto font-medium tracking-tight">
                        ScamGPT uses multi-layered neural analysis to neutralize threats before they can compromise your digital assets.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {FEATURES.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group p-8 rounded-3xl glass hover:bg-zinc-900/40 transition-standard hover:border-border/80 border-transparent"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-border/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <feature.icon className={cn("w-6 h-6", feature.color)} />
                            </div>
                            <h4 className="text-lg font-bold text-white mb-3 tracking-tight">{feature.title}</h4>
                            <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Just a helper since cn might not be available in a raw file like this but it is in the project
function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ');
}
