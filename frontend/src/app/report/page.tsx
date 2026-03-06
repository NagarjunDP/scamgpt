'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Send,
    ShieldAlert,
    FileText,
    Link as LinkIcon,
    AtSign,
    CheckCircle2,
    ArrowRight
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function ReportScam() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        setTimeout(() => setStatus('success'), 1500);
    };

    if (status === 'success') {
        return (
            <div className="p-8 md:p-20 flex items-center justify-center animate-fade-in text-center h-[calc(100vh-140px)]">
                <div className="max-w-md">
                    <div className="w-16 h-16 bg-emerald-500/5 border border-emerald-500/10 rounded-xl flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h2 className="text-2xl font-semibold text-white mb-3">Submission Complete</h2>
                    <p className="text-zinc-500 mb-10 text-sm leading-relaxed">
                        Incident data has been successfully transmitted. Signature distribution is active across the edge network.
                    </p>
                    <Button onClick={() => setStatus('idle')} variant="secondary" className="w-full h-11">
                        Report New Incident
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 md:p-12 animate-fade-in max-w-4xl mx-auto py-16">
            <div className="mb-12">
                <Badge variant="neutral" className="mb-4 bg-zinc-800/50">Community Intel</Badge>
                <h1 className="text-3xl font-semibold text-white tracking-tight">Report Incident</h1>
                <p className="text-zinc-500 text-sm mt-2 max-w-xl font-medium">Contribute to the global immune system by submitting verified threat vectors.</p>
            </div>

            <Card className="border-zinc-800/60 bg-zinc-900/10 shadow-none">
                <CardContent className="p-10">
                    <form onSubmit={handleSubmit} className="space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2.5">
                                <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest pl-1">Vector URL</label>
                                <div className="relative">
                                    <LinkIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                                    <input
                                        type="url"
                                        placeholder="https://..."
                                        className="w-full bg-black/20 border border-zinc-800 rounded-lg h-11 pl-11 pr-4 text-sm text-white focus:border-zinc-600 focus:bg-black/40 outline-none transition-standard placeholder:text-zinc-700"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2.5">
                                <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest pl-1">Target Identity</label>
                                <div className="relative">
                                    <AtSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                                    <input
                                        type="text"
                                        placeholder="Identifier"
                                        className="w-full bg-black/20 border border-zinc-800 rounded-lg h-11 pl-11 pr-4 text-sm text-white focus:border-zinc-600 focus:bg-black/40 outline-none transition-standard placeholder:text-zinc-700"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2.5">
                            <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest pl-1">Signature Content</label>
                            <div className="relative">
                                <FileText className="absolute left-3.5 top-4 w-4 h-4 text-zinc-600" />
                                <textarea
                                    placeholder="Paste communication payload or transaction details..."
                                    className="w-full bg-black/20 border border-zinc-800 rounded-lg py-4 pl-11 pr-4 text-sm text-white focus:border-zinc-600 focus:bg-black/40 outline-none transition-standard min-h-[160px] resize-none placeholder:text-zinc-700"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-8 border-t border-zinc-800/50">
                            <p className="text-[10px] text-zinc-600 font-medium max-w-[200px]">Submissions are processed through cognitive validation nodes.</p>
                            <Button type="submit" className="gap-2 px-8 h-11 min-w-[180px]" disabled={status === 'submitting'}>
                                {status === 'submitting' ? 'Processing...' : 'Submit Intel'} <Send className="w-3.5 h-3.5" />
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
