"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Globe, Activity, Zap, AlertTriangle, ShieldCheck, TrendingUp, BarChart3, Map as MapIcon, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface Report {
    id: number;
    type: string;
    target: string;
    description: string;
    risk_score: number;
    location: string;
    timestamp: string;
}

export default function LiveThreatsPage() {
    const [reports, setReports] = useState<Report[]>([]);
    const [stats, setStats] = useState<Record<string, number>>({});
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:8000/dashboard");
            const data = await response.json();
            setReports(data.recent_reports || []);
            setStats(data.stats || {});
        } catch (error) {
            console.error("Dashboard error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 10000);
        return () => clearInterval(interval);
    }, []);

    const totalThreats = Object.values(stats).reduce((a, b) => a + b, 0);

    return (
        <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-[#0B0F19]">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-display font-bold tracking-tight">Threat Intelligence Dashboard</h1>
                    <p className="text-gray-500 mt-1">Real-time global scam monitoring and cognitive threat analysis.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Global Watch Active</span>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Total Blocked", value: totalThreats + 1240, icon: ShieldCheck, color: "text-primary" },
                    { label: "Active Threats", value: reports.length, icon: Activity, color: "text-warning" },
                    { label: "Global Match", value: "94.2%", icon: Zap, color: "text-blue-400" },
                    { label: "Uptime", value: "99.99%", icon: TrendingUp, color: "text-emerald-400" },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-6 flex items-center justify-between border-white/5"
                    >
                        <div>
                            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">{stat.label}</div>
                            <div className={cn("text-2xl font-display font-bold", stat.color)}>{stat.value}</div>
                        </div>
                        <div className={cn("p-3 rounded-xl bg-white/5", stat.color)}>
                            <stat.icon size={20} />
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Heatmap Visualization (Simulation) */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                            <MapIcon size={14} /> Global Scam Heatmap
                        </h2>
                        <button className="text-[10px] font-bold text-primary hover:underline uppercase">Enlarge Map</button>
                    </div>
                    <div className="aspect-video glass-card overflow-hidden relative border-white/5 bg-black/40">
                        <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-no-repeat bg-center bg-contain filter invert" />

                        {/* Simulated Pulse Points */}
                        <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-red-500 rounded-full animate-ping" />
                        <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-warning rounded-full animate-ping" />
                        <div className="absolute top-1/4 left-2/3 w-2 h-2 bg-red-500 rounded-full animate-ping" />
                        <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-primary rounded-full animate-ping" />

                        <div className="absolute bottom-4 left-4 p-4 glass-card bg-black/60 border-white/10 space-y-2">
                            <div className="text-[10px] font-bold text-white uppercase tracking-widest">Active Vectors</div>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                    <span className="text-[10px] text-gray-400">Critical Phishing</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-warning" />
                                    <span className="text-[10px] text-gray-400">Mass SMS</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Live Feed */}
                <div className="space-y-4">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                        <Activity size={14} /> Live Threat Feed
                    </h2>
                    <div className="glass-card overflow-hidden flex flex-col h-[400px] border-white/5 bg-black/20">
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
                            {reports.map((report, i) => (
                                <motion.div
                                    key={report.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="px-2 py-0.5 rounded-md bg-white/5 text-[9px] font-bold text-gray-400 uppercase border border-white/5">
                                            {report.type}
                                        </div>
                                        <div className="text-[9px] font-mono text-gray-600">
                                            {new Date(report.timestamp).toLocaleTimeString()}
                                        </div>
                                    </div>
                                    <div className="text-xs font-bold text-gray-200 truncate group-hover:text-primary transition-colors">{report.target}</div>
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="text-[10px] text-gray-500">{report.location}</div>
                                        <div className={cn(
                                            "text-[10px] font-bold",
                                            report.risk_score > 0.8 ? "text-danger" : "text-warning"
                                        )}>
                                            {Math.round(report.risk_score * 100)}% RISK
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <div className="p-4 bg-black/40 border-t border-white/5">
                            <button onClick={fetchData} className="w-full btn-primary py-2 text-xs">
                                <RefreshCw size={12} className="mr-2" /> Refresh Feed
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
