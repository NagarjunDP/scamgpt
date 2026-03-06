'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Search,
    Database,
    Shield,
    CheckCircle2,
    Loader2,
    Network,
    Lock,
    Eye,
    Fingerprint
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

const STEPS = [
    { label: 'Parsing Semantic Content', icon: Search },
    { label: 'Cross-referencing Global Threat DB', icon: Database },
    { label: 'Analyzing Linguistic Patterns', icon: Network },
    { label: 'Fingerprinting Scam Signature', icon: Fingerprint },
    { label: 'Generating Security Intelligence Report', icon: Lock },
];

export default function AnalysisLoader() {
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (step < STEPS.length - 1) {
            const timer = setTimeout(() => setStep(s => s + 1), 600);
            return () => clearTimeout(timer);
        }
    }, [step]);

    return (
        <div className="w-full max-w-md mx-auto p-12 bg-zinc-900/10 border border-zinc-800/80 rounded-2xl shadow-none relative overflow-hidden">
            <div className="relative z-10 space-y-12">
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-14 h-14 rounded-xl bg-zinc-800/50 flex items-center justify-center relative border border-zinc-700/30">
                        <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-white tracking-tight">Expert Audit</h2>
                        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-1">Deep Cognitive Analysis Active</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {STEPS.map((s, i) => {
                        const isDone = i < step;
                        const isCurrent = i === step;
                        return (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "w-7 h-7 rounded-md flex items-center justify-center transition-all border",
                                        isDone ? "bg-emerald-500/5 border-emerald-500/10 text-emerald-500" :
                                            isCurrent ? "bg-blue-500/5 border-blue-500/10 text-blue-500" :
                                                "bg-zinc-800/30 border-zinc-800/50 text-zinc-700"
                                    )}>
                                        {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : <s.icon className="w-3.5 h-3.5" />}
                                    </div>
                                    <span className={cn("text-[11px] font-semibold", isDone ? "text-emerald-600" : isCurrent ? "text-white" : "text-zinc-600")}>
                                        {s.label}
                                    </span>
                                </div>
                                {isCurrent && <Badge variant="primary" className="text-[9px] py-0 px-1.5 h-4">Active</Badge>}
                            </div>
                        );
                    })}
                </div>

                <div className="pt-8 border-t border-zinc-800/50">
                    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-zinc-600 mb-2">
                        <span>Confidence Buffer</span>
                        <span className="text-blue-500">98.4%</span>
                    </div>
                    <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
                            className="h-full bg-blue-500/50 shadow-[0_0_8px_rgba(59,130,246,0.3)]"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
