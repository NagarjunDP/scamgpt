'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Activity,
    MapPin,
    Clock,
    ShieldAlert,
    ExternalLink,
    Zap,
    Globe,
    AlertCircle,
    ArrowUpRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

const INITIAL_THREATS = [
    { id: 1, type: 'Phishing', target: 'secure-amazon-refund.xyz', location: 'Mumbai, IN', time: 'Just now', severity: 'High' },
    { id: 2, type: 'UPI Fraud', target: 'pay-merchant-442@okicici', location: 'Delhi, IN', time: '2 mins ago', severity: 'Critical' },
    { id: 3, type: 'SMS Scam', target: 'HDFC KYV Expired', location: 'Bangalore, IN', time: '5 mins ago', severity: 'Medium' },
    { id: 4, type: 'Brand Impersonation', target: 'login-fedex-tracking.net', location: 'Hyderabad, IN', time: '12 mins ago', severity: 'High' },
    { id: 5, type: 'Credential Theft', target: 'microsoft-office-v3.com', location: 'Chennai, IN', time: '18 mins ago', severity: 'Critical' },
];

const THREAT_TYPES = ['Phishing', 'UPI Fraud', 'SMS Scam', 'Brand Impersonation', 'Credential Theft'];
const LOCATIONS = ['Mumbai, IN', 'Delhi, IN', 'Bangalore, IN', 'Chennai, IN', 'Kolkata, IN', 'Pune, IN', 'Ahmedabad, IN'];

import axios from 'axios';

export default function LiveThreatFeed() {
    const [threats, setThreats] = useState<any[]>([]);
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/dashboard');
                setThreats(response.data.recent_threats || []);
                setStats(response.data.stats || {});
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch live threats:', error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 8000);
        return () => clearInterval(interval);
    }, []);

    const activeNodes = stats ? (1242 + Object.values(stats as object).reduce((a: any, b: any) => a + (b as number), 0)) : 1242;

    return (
        <div className="p-8 md:p-10 space-y-10 animate-fade-in max-w-[1400px] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-zinc-800/50">
                <div>
                    <h1 className="text-2xl font-semibold text-white tracking-tight">Intelligence Stream</h1>
                    <p className="text-zinc-500 text-xs mt-1.5 font-medium uppercase tracking-wider">Active Monitoring & Vector Analysis</p>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900/50 border border-zinc-800 rounded-md">
                    <span className="text-[10px] font-semibold text-zinc-400">Nodes Active:</span>
                    <span className="text-[10px] font-bold text-white">{activeNodes.toLocaleString()}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Side Stats */}
                <div className="lg:col-span-3 space-y-6">
                    <Card className="bg-zinc-900/20 border-zinc-800/60 shadow-none">
                        <CardContent className="p-6">
                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Inbound Volume</p>
                            <div className="flex items-end gap-2 mb-2">
                                <span className="text-4xl font-semibold text-white leading-none">{threats?.length || 0}</span>
                                <span className="text-[11px] font-bold text-emerald-500 pb-1">+12%</span>
                            </div>
                            <p className="text-[10px] text-zinc-600 font-medium uppercase tracking-widest">Active detections (2h)</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-zinc-900/20 border-zinc-800/60 shadow-none">
                        <CardContent className="p-6">
                            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <Globe className="w-3.5 h-3.5" /> Regional Status
                            </h3>
                            <div className="space-y-5">
                                {['Asia-South', 'EU-West', 'US-East'].map((region, idx) => (
                                    <div key={idx} className="space-y-1.5">
                                        <div className="flex justify-between items-center text-[11px]">
                                            <span className="font-medium text-zinc-400">{region}</span>
                                            <span className="font-semibold text-emerald-500">Live</span>
                                        </div>
                                        <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-500/30" style={{ width: idx === 0 ? '85%' : '45%' }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Live List */}
                <div className="lg:col-span-9">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Neural Vector Activity</h2>
                        <div className="flex items-center gap-2 text-[10px] font-semibold text-blue-400 bg-blue-500/5 px-2 py-1 rounded">
                            <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" /> Stream Synced
                        </div>
                    </div>

                    <div className="space-y-1">
                        <AnimatePresence mode="popLayout">
                            {threats.map((threat) => (
                                <motion.div
                                    key={threat.id}
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.99 }}
                                >
                                    <div className="group flex items-center gap-6 p-4 bg-zinc-900/10 border border-zinc-800/40 rounded-lg hover:border-zinc-700 hover:bg-zinc-800/20 transition-standard cursor-default">
                                        <div className={cn("w-10 h-10 rounded-md flex items-center justify-center shrink-0 border border-zinc-800/60",
                                            threat.risk_score > 0.8 ? 'bg-rose-500/5 text-rose-500 border-rose-500/10' :
                                                threat.risk_score > 0.5 ? 'bg-amber-500/5 text-amber-500 border-amber-500/10' :
                                                    'bg-blue-500/5 text-blue-500 border-blue-500/10'
                                        )}>
                                            <AlertCircle className="w-5 h-5" />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-1">
                                                <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{threat.type}</span>
                                                <span className="text-[10px] text-zinc-700 font-medium flex items-center gap-1.5">
                                                    <Clock className="w-3 h-3" /> {new Date(threat.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                            <p className="text-sm font-semibold text-white truncate group-hover:text-blue-400 transition-colors uppercase tracking-tight">{threat.target}</p>
                                        </div>

                                        <div className="hidden md:flex flex-col items-end gap-1.5 shrink-0 px-6 border-l border-zinc-800/50">
                                            <div className="flex items-center gap-1.5 text-zinc-500 font-semibold text-[10px] uppercase tracking-widest">
                                                <MapPin className="w-3 h-3" /> {threat.location}
                                            </div>
                                            <Badge variant={threat.risk_score > 0.8 ? 'danger' : threat.risk_score > 0.5 ? 'warning' : 'neutral'} className="text-[9px] py-0 px-1.5">
                                                {(threat.risk_score * 100).toFixed(0)}% Match
                                            </Badge>
                                        </div>

                                        <div className="h-9 w-9 rounded-md bg-zinc-800/50 border border-zinc-700/50 text-zinc-500 hover:text-white hover:bg-zinc-700/50 transition-standard flex items-center justify-center opacity-0 group-hover:opacity-100">
                                            <ArrowUpRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            {threats.length === 0 && !loading && (
                                <div className="py-24 text-center space-y-4">
                                    <Activity className="w-10 h-10 text-zinc-800 mx-auto" />
                                    <p className="text-zinc-600 font-semibold text-[10px] uppercase tracking-widest">Waiting for inbound data...</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
