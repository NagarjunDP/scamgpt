'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Search,
    ShieldAlert,
    Activity,
    MessageSquare,
    History,
    Users,
    Info,
    ChevronLeft,
    Shield,
    Menu,
    LogOut,
    Settings,
    MoreHorizontal
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'AI Scanner', href: '/', icon: Search },
    { name: 'Threat Intel', href: '/analyzer', icon: Activity },
    { name: 'Live Feed', href: '/live-threats', icon: ShieldAlert },
    { name: 'Report Scam', href: '/report', icon: MessageSquare },
    { name: 'History', href: '/history', icon: History },
    { name: 'Community', href: '/community', icon: Users },
    { name: 'About', href: '/about', icon: Info },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <motion.aside
            animate={{ width: isCollapsed ? 72 : 240 }}
            className="h-screen bg-[var(--background)] border-r border-[var(--border)] flex flex-col relative z-50 transition-all duration-300 ease-in-out shrink-0"
        >
            {/* Logo Section */}
            <div className="p-5">
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-zinc-100 rounded flex items-center justify-center">
                        <Shield className="w-5 h-5 text-zinc-950" />
                    </div>
                    {!isCollapsed && (
                        <span className="text-base font-semibold text-white tracking-tight">ScamGPT</span>
                    )}
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-2 py-4 space-y-0.5">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-standard group",
                                isActive
                                    ? "bg-zinc-800/50 text-white"
                                    : "text-zinc-500 hover:text-white hover:bg-zinc-800/30"
                            )}
                        >
                            <item.icon className={cn("w-4.5 h-4.5 shrink-0 transition-colors", isActive ? "text-[var(--primary)]" : "text-zinc-500 group-hover:text-zinc-300")} />
                            {!isCollapsed && <span className="truncate">{item.name}</span>}
                        </Link>
                    );
                })}
            </nav>

            {/* User Section / Footer */}
            <div className="p-3 border-t border-[var(--border)] space-y-1">
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-zinc-500 hover:text-white hover:bg-zinc-800/30 transition-standard"
                >
                    {isCollapsed ? <Menu className="w-4.5 h-4.5" /> : <ChevronLeft className="w-4.5 h-4.5" />}
                    {!isCollapsed && <span>Collapse</span>}
                </button>

                {!isCollapsed && (
                    <div className="mt-2 p-3 bg-zinc-900/50 rounded-lg flex items-center gap-3 border border-zinc-800/50">
                        <div className="w-7 h-7 rounded bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-400">NP</div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-white truncate">Expert Analyst</p>
                            <p className="text-[10px] text-zinc-500 truncate">Pro Node Active</p>
                        </div>
                        <Settings className="w-3.5 h-3.5 text-zinc-600 hover:text-zinc-400 cursor-pointer" />
                    </div>
                )}
            </div>
        </motion.aside>
    );
}
