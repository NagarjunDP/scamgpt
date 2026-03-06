'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    ShieldAlert,
    ShieldCheck,
    ShieldQuestion,
    Target,
    Zap,
    ArrowRight,
    Eye,
    Activity,
    Lock,
    AlertCircle,
    Flag,
    Terminal
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

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

    const riskColor = isHighRisk ? 'text-rose-500' : isMediumRisk ? 'text-amber-500' : 'text-emerald-500';
    const riskVariant = isHighRisk ? 'danger' : isMediumRisk ? 'warning' : 'success';

    return (
        <div className="space-y-10 animate-fade-in py-10 max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-800/50">
                <div>
                    <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-3">
                        <Activity className="w-3 h-3 text-blue-500" /> Audit #SR-{Math.random().toString(36).substr(2, 6).toUpperCase()}
                    </div>
                    <h2 className="text-3xl font-semibold text-white tracking-tight">Security Intelligence</h2>
                </div>
                <Button variant="secondary" onClick={onReset} className="gap-2 h-10 px-5 text-xs bg-zinc-800/50 border-zinc-700 hover:bg-zinc-700/50 transition-standard">
                    New Scan <ArrowRight className="w-3.5 h-3.5" />
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Score Column */}
                <div className="lg:col-span-4 space-y-8">
                    <Card className="bg-zinc-900/10 border-zinc-800/60 shadow-none overflow-hidden group">
                        <CardContent className="p-10 text-center">
                            <div className={cn("w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 border transition-standard",
                                isHighRisk ? "bg-rose-500/5 border-rose-500/20 text-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.1)]" :
                                    isMediumRisk ? "bg-amber-500/5 border-amber-500/20 text-amber-500" :
                                        "bg-emerald-500/5 border-emerald-500/20 text-emerald-500"
                            )}>
                                {isHighRisk ? <ShieldAlert className="w-10 h-10" /> : isMediumRisk ? <ShieldQuestion className="w-10 h-10" /> : <ShieldCheck className="w-10 h-10" />}
                            </div>
                            <h3 className="text-6xl font-semibold text-white mb-2 tabular-nums">{(data.risk_score * 100).toFixed(0)}%</h3>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 mb-8">Aggregate Risk Index</p>
                            <Badge variant={riskVariant as any} className="w-full justify-center py-2 text-[10px] h-auto uppercase tracking-wider font-bold">
                                {data.threat_level} Severity Vector
                            </Badge>
                        </CardContent>
                    </Card>

                    <Card className="bg-zinc-900/10 border-zinc-800/50 shadow-none">
                        <CardContent className="p-8">
                            <h4 className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <Activity className="w-3.5 h-3.5" /> Meta Parameters
                            </h4>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-3 border-b border-zinc-800/50 last:border-0">
                                    <span className="text-[11px] font-semibold text-zinc-500">Vector Type</span>
                                    <Badge variant="neutral" className="bg-zinc-800 text-zinc-400 border-none">{data.attack_type}</Badge>
                                </div>
                                <div className="flex justify-between items-center py-3 border-b border-zinc-800/50 last:border-0">
                                    <span className="text-[11px] font-semibold text-zinc-500">Pattern Status</span>
                                    <span className="text-[11px] font-bold text-zinc-300">{data.pattern_memory.status}</span>
                                </div>
                                <div className="flex justify-between items-center py-3 border-b border-zinc-800/50 last:border-0">
                                    <span className="text-[11px] font-semibold text-zinc-500">Memory Sync</span>
                                    <span className="text-[11px] font-bold text-blue-500">Global Match</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Reasoning Column */}
                <div className="lg:col-span-8 space-y-8">
                    <Card className="bg-zinc-900/10 border-zinc-800/60 shadow-none">
                        <CardContent className="p-10">
                            <h4 className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-8 flex items-center gap-2">
                                <Terminal className="w-3.5 h-3.5 text-blue-500" /> Operational Assessment
                            </h4>

                            <div className="mb-12">
                                <p className="text-xl text-zinc-300 font-medium leading-[1.8] tracking-tight">
                                    {data.reasoning}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-zinc-800/50">
                                <div>
                                    <h5 className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-5 flex items-center gap-2">
                                        <Target className="w-3.5 h-3.5 text-rose-500" /> Structural Markers
                                    </h5>
                                    <div className="space-y-2.5">
                                        {data.attack_graph?.map((node: any, i: number) => (
                                            <div key={i} className="flex items-center gap-3 px-4 py-2 bg-black/20 border border-zinc-800/80 rounded-lg">
                                                <div className="w-1 h-1 rounded-full bg-rose-500/50 shadow-[0_0_8px_rgba(244,63,94,0.4)]" />
                                                <span className="text-[11px] font-semibold text-zinc-400">{node.label} Trace</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h5 className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-5 flex items-center gap-2">
                                        <Lock className="w-3.5 h-3.5 text-emerald-500" /> Directive
                                    </h5>
                                    <div className={cn("p-5 rounded-lg border-l-2",
                                        isHighRisk ? "bg-rose-500/5 border-rose-500" :
                                            isMediumRisk ? "bg-amber-500/5 border-amber-500" :
                                                "bg-emerald-500/5 border-emerald-500"
                                    )}>
                                        <p className="text-[11px] font-bold text-white uppercase mb-1.5">
                                            {isHighRisk ? "Immediate Block" : isMediumRisk ? "Verification Required" : "Secure"}
                                        </p>
                                        <p className="text-[10px] text-zinc-500 leading-relaxed font-medium font-inter">
                                            {isHighRisk
                                                ? "Critical markers identified in linguistic vector and infrastructure. Propagate block across edge nodes immediately."
                                                : isMediumRisk
                                                    ? "Anomalous patterns detected. Perform secondary verification before interaction."
                                                    : "No verified threat markers observed. Source maintains structural integrity."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Operational Toolbar */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button className="py-5 h-auto text-xs font-semibold gap-3 bg-zinc-100 text-black hover:bg-white rounded-xl">
                            <Flag className="w-4 h-4" /> Report to Global Intelligence
                        </Button>
                        <Button variant="secondary" className="py-5 h-auto text-xs font-semibold gap-3 bg-zinc-800/50 border-zinc-700 hover:bg-zinc-700/50 rounded-xl">
                            <Eye className="w-4 h-4" /> Export Verification Chain
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
