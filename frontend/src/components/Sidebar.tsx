'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    ShieldAlert,
    Search,
    Activity,
    Flag,
    ShieldCheck,
    Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'AI Scanner', href: '/', icon: Search },
    { name: 'Live Threat Feed', href: '/live-threats', icon: Activity },
    { name: 'AI Security Chat', href: '/chat', icon: ShieldAlert },
    { name: 'Report Scam', href: '/report', icon: Flag },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 glass-panel border-r border-white/5 z-50 flex flex-col h-screen sticky top-0 overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-0 w-full h-32 bg-primary/5 blur-3xl rounded-full -translate-y-16 -translate-x-16 pointer-events-none" />

            <div className="p-8 flex items-center gap-4 relative">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/20 relative group cursor-pointer">
                    <ShieldCheck className="text-white w-7 h-7 group-hover:scale-110 transition-transform" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-[#060910] shadow-sm" />
                </div>
                <div>
                    <h1 className="text-2xl font-display font-black tracking-tighter text-white leading-none">SCAM<span className="text-primary">GPT</span></h1>
                    <p className="text-[9px] text-primary font-black tracking-[0.3em] uppercase mt-1.5 opacity-80">Cognitive Shield</p>
                </div>
            </div>

            <nav className="flex-1 px-4 py-8 space-y-3 relative">
                <div className="absolute left-0 top-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 group relative overflow-hidden",
                                isActive
                                    ? "bg-primary/10 text-primary border border-primary/20 shadow-lg shadow-primary/5"
                                    : "text-gray-500 hover:text-white hover:bg-white/5 border border-transparent"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="sidebar-active"
                                    className="absolute left-0 top-0 w-1 h-full bg-primary shadow-[0_0_15px_rgba(79,140,255,0.8)]"
                                />
                            )}

                            <item.icon className={cn(
                                "w-5 h-5 transition-all duration-300",
                                isActive ? "text-primary scale-110" : "group-hover:scale-110 group-hover:rotate-3"
                            )} />
                            <span className="font-bold text-[13px] tracking-wide">{item.name}</span>

                            {isActive && (
                                <Zap className="ml-auto w-3.5 h-3.5 text-primary/40 animate-pulse" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-6 mt-auto relative">
                <div className="absolute left-0 top-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <div className="glass-card p-5 border-primary/10 bg-primary/[0.02] relative overflow-hidden group hover:border-primary/30 transition-all duration-500">
                    <div className="absolute -top-4 -right-4 p-2 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                        <Zap className="w-20 h-20 text-primary" />
                    </div>

                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Live Status</h3>
                        <div className="status-dot bg-success" />
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] text-gray-500 font-bold uppercase">Shield Rate</span>
                            <span className="text-[10px] text-white font-black">99.9%</span>
                        </div>
                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '99.9%' }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="h-full bg-primary shadow-[0_0_10px_rgba(79,140,255,0.5)]"
                            />
                        </div>
                    </div>

                    <p className="text-[9px] text-gray-600 font-bold mt-4 tracking-wider uppercase">v2.4.0 • Secure Node</p>
                </div>
            </div>
        </aside>
    );
}
