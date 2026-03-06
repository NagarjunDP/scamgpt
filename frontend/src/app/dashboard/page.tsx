'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
    ShieldCheck,
    ShieldAlert,
    Activity,
    Lock,
    ArrowUpRight,
    Zap,
    Cpu,
    Target,
    Database,
    AlertCircle
} from 'lucide-react';
import axios from 'axios';
import { cn } from '@/lib/utils';
import CyberMap from '@/components/CyberMap';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

const STATS = [
    { label: 'Analyses (24h)', value: '1,242', change: '+12.4%', icon: Activity, color: 'text-[#4F8CFF]' },
    { label: 'Active Threats', value: '42', change: '-5.2%', icon: ShieldAlert, color: 'text-[#FFB020]' },
    { label: 'Detection Rate', value: '99.4%', change: '+0.2%', icon: ShieldCheck, color: 'text-[#2ECC71]' },
    { label: 'Blocked Attacks', value: '892', change: '+18.1%', icon: Lock, color: 'text-[#4F8CFF]' },
];

export default function Dashboard() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/dashboard');
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch dashboard data:', error);
            }
        };
        fetchData();
        const interval = setInterval(fetchData, 10000);
        return () => clearInterval(interval);
    }, []);

    const stats = useMemo(() => {
        if (!data) return STATS;
        const totalAnalyses = data.stats ? Object.values(data.stats).reduce((a: any, b: any) => a + (b as number), 0) as number : 0;
        const recentThreatsCount = data.recent_threats?.length || 0;
        const activeNodes = data.active_nodes || 1242;

        return [
            { label: 'Total Analyses', value: totalAnalyses.toLocaleString(), change: '+12.4%', icon: Activity, color: 'text-blue-500' },
            { label: 'Active Threats', value: recentThreatsCount.toString(), change: '-5.2%', icon: ShieldAlert, color: 'text-amber-500' },
            { label: 'Detection Accuracy', value: '99.4%', change: '+0.2%', icon: ShieldCheck, color: 'text-emerald-500' },
            { label: 'Network Nodes', value: activeNodes.toLocaleString(), change: '+18.1%', icon: Lock, color: 'text-blue-500' },
        ];
    }, [data]);

    return (
        <div className="p-8 md:p-10 space-y-10 animate-fade-in max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-zinc-800/50">
                <div>
                    <h1 className="text-2xl font-semibold text-white tracking-tight">Security Overview</h1>
                    <p className="text-zinc-500 text-xs mt-1.5 font-medium uppercase tracking-wider">Live Intel Feed & Heuristic Analysis</p>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900/50 border border-zinc-800 rounded-md">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    <span className="text-[10px] font-semibold text-zinc-300 uppercase tracking-widest leading-none">Scanning Network Active</span>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <Card key={idx} className="bg-zinc-900/20 border-zinc-800/60 shadow-none group">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className={cn("p-2 rounded-md bg-zinc-800/50 border border-zinc-700/30 transition-standard group-hover:border-zinc-600/50", stat.color)}>
                                    <stat.icon className="w-4 h-4" />
                                </div>
                                <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded",
                                    stat.change.startsWith('+') ? 'text-emerald-500' : 'text-rose-500')}>
                                    {stat.change}
                                </span>
                            </div>
                            <div>
                                <h3 className="text-2xl font-semibold text-white tracking-tight">{stat.value}</h3>
                                <p className="text-[11px] text-zinc-500 font-medium mt-1">{stat.label}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Global Map Control */}
                <div className="lg:col-span-8 flex flex-col min-h-[500px]">
                    <Card className="h-full flex flex-col border-zinc-800/60">
                        <CardHeader className="py-3 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Global Threat Intelligence</h3>
                                <Badge variant="neutral" className="text-[9px] bg-zinc-800/50 border-zinc-700/50">v4.2.1 Stable</Badge>
                            </div>
                            <span className="text-[10px] text-zinc-500 font-medium uppercase tracking-widest">Regional Priority: High</span>
                        </CardHeader>
                        <CardContent className="flex-1 p-0 overflow-hidden relative">
                            <CyberMap threats={data?.recent_threats || []} />
                        </CardContent>
                    </Card>
                </div>

                {/* Security Posture */}
                <div className="lg:col-span-4 space-y-6">
                    <Card className="h-full border-zinc-800/60">
                        <CardHeader className="py-3">
                            <div className="flex justify-between items-center">
                                <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                                    <Database className="w-3.5 h-3.5" /> Intelligence Distribution
                                </h3>
                                <div className="w-1.5 h-1.5 bg-zinc-800 rounded-full" />
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 pt-2 space-y-6">
                            {data && Object.entries(data.stats).map(([type, count]: any, i) => (
                                <div key={i} className="space-y-2 group">
                                    <div className="flex justify-between items-end">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-semibold text-zinc-100">{type}</span>
                                            <span className="text-[10px] text-zinc-500 font-medium">Network Vector Detection</span>
                                        </div>
                                        <span className="text-xs font-mono text-blue-400 font-semibold">{count}</span>
                                    </div>
                                    <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.min(100, (count / 10) * 100)}%` }}
                                            className="h-full bg-blue-500/40"
                                        />
                                    </div>
                                </div>
                            ))}
                            {!data && <p className="text-zinc-600 text-[11px] font-medium text-center py-10">Initializing intelligence vectors...</p>}

                            <div className="pt-4 mt-6 border-t border-zinc-800/50">
                                <Button variant="secondary" className="w-full text-xs h-9 justify-between">
                                    View Full History <ArrowUpRight className="w-3 h-3" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
