'use client';

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";

interface Threat {
    id?: string;
    x: number;
    y: number;
    location: string;
    risk?: "low" | "medium" | "high";
    risk_score?: number;
    type?: string;
}

interface CyberMapProps {
    threats?: Threat[];
}

export default function CyberMap({ threats = [] }: CyberMapProps) {
    return (
        <div className="relative w-full h-[500px] bg-zinc-950 border border-zinc-800/50 rounded-xl overflow-hidden group">
            {/* Grid Pattern */}
            <div className="absolute inset-0 neural-grid opacity-[0.05] pointer-events-none" />

            {/* Header */}
            <div className="absolute top-4 left-4 z-20">
                <div className="flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 px-3 py-1.5 rounded-md backdrop-blur-md">
                    <Globe className="w-3.5 h-3.5 text-blue-500" />
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">India Threat Vector Grid</span>
                        <span className="text-[8px] text-zinc-500 font-medium uppercase tracking-[0.2em]">Regional Scan: Active</span>
                    </div>
                </div>
            </div>

            {/* High-Fidelity India Map Grid */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-16">
                <svg
                    viewBox="0 0 200 240"
                    className="w-full h-full text-zinc-800 opacity-40 group-hover:opacity-50 transition-standard"
                    fill="currentColor"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="0.4"
                >
                    {/* Detailed India Path Set */}
                    <path d="M100,20 L110,15 L120,20 L125,30 L120,45 L110,50 L100,45 L95,35 Z" name="Ladakh/J&K" />
                    <path d="M95,35 L100,45 L115,55 L110,65 L100,70 L85,65 L80,55 L85,45 Z" name="North India" />
                    <path d="M115,55 L140,60 L150,70 L145,85 L130,90 L115,80 L110,65 Z" name="East India" />
                    <path d="M80,55 L85,65 L100,70 L115,80 L110,100 L90,110 L70,100 L65,75 Z" name="Central India" />
                    <path d="M65,75 L70,100 L75,120 L60,130 L45,115 L50,90 L55,80 Z" name="West India" />
                    <path d="M90,110 L110,100 L125,120 L115,150 L100,180 L80,170 L75,130 Z" name="South India" />
                    <path d="M100,180 L115,150 L125,180 L120,200 L110,210 L100,205 Z" name="South Tip" />
                    <path d="M150,70 L175,75 L185,90 L180,110 L165,115 L155,100 Z" name="North East" />

                    {/* HUD Accents */}
                    <motion.rect
                        initial={{ y: 0 }}
                        animate={{ y: 240 }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                        width="200"
                        height="0.5"
                        fill="rgba(59, 130, 246, 0.2)"
                    />
                </svg>
            </div>

            {/* Threat Points */}
            <div className="absolute inset-0 z-30">
                {threats.map((threat, i) => {
                    // Normalize risk levels for color coding
                    const isHigh = threat.risk === "high" || (threat.risk_score && threat.risk_score > 0.8);
                    const isMedium = threat.risk === "medium" || (threat.risk_score && threat.risk_score > 0.4);

                    return (
                        <div
                            key={threat.id || i}
                            className="absolute"
                            style={{ left: `${threat.x}%`, top: `${threat.y}%` }}
                        >
                            <div className="relative group/dot flex items-center justify-center">
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0.8] }}
                                    transition={{ duration: 0.5, delay: i * 0.05 }}
                                    className={cn(
                                        "w-2.5 h-2.5 rounded-full shadow-lg border border-white/10",
                                        isHigh ? "bg-rose-500 shadow-rose-500/30" :
                                            isMedium ? "bg-amber-400 shadow-amber-400/30" : "bg-blue-400 shadow-blue-400/30"
                                    )}
                                />

                                {/* Visual Alert Pulse */}
                                <motion.div
                                    animate={{ scale: [1, 2.5], opacity: [0.3, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className={cn(
                                        "absolute w-2.5 h-2.5 rounded-full",
                                        isHigh ? "bg-rose-500" : isMedium ? "bg-amber-400" : "bg-blue-400"
                                    )}
                                />

                                {/* Detailed Tooltip */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover/dot:opacity-100 transition-standard delay-100 bg-zinc-900/95 border border-zinc-800 px-2.5 py-1.5 rounded-md shadow-2xl pointer-events-none z-50 min-w-max backdrop-blur-md">
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-[10px] font-bold text-white uppercase tracking-tight">
                                            {threat.location}
                                        </span>
                                        <div className="flex items-center gap-1.5">
                                            <span className={cn("text-[8px] font-bold uppercase", isHigh ? "text-rose-500" : isMedium ? "text-amber-400" : "text-blue-400")}>
                                                {isHigh ? "Critical Block" : isMedium ? "Active Intercept" : "Tracked Trace"}
                                            </span>
                                            <span className="text-[8px] text-zinc-500">•</span>
                                            <span className="text-[8px] text-zinc-500 font-mono">ID: {String(threat.id || '').slice(0, 4) || 'VX-0' + i}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Digital HUD Elements */}
            <div className="absolute bottom-4 left-4 z-20">
                <div className="flex gap-4 bg-zinc-900/40 border border-zinc-800/50 px-3 py-1.5 rounded-md backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.4)]" />
                        <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">High</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-amber-400 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.4)]" />
                        <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Medium</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.4)]" />
                        <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Low</span>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-4 right-4 z-20">
                <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-[0.3em]">Neural Interface v2.0.4</span>
            </div>
        </div>
    );
}