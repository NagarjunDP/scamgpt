'use client';

import React from 'react';
import { Search, Bell, User, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Header() {
    return (
        <header className="h-14 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-40">
            {/* Search Bar */}
            <div className="flex-1 max-w-lg">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500 group-focus-within:text-[var(--primary)] transition-colors" />
                    <input
                        type="text"
                        placeholder="Search Intelligence..."
                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-md py-1.5 pl-9 pr-4 text-xs text-white placeholder:text-zinc-600 outline-none focus:border-zinc-700 transition-standard"
                    />
                </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-6">
                {/* System Status */}
                <div className="hidden md:flex items-center gap-2 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-md">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    <span className="text-[11px] font-medium text-emerald-500 whitespace-nowrap">Node Operational</span>
                </div>

                {/* Notifications */}
                <button className="relative text-zinc-500 hover:text-white transition-standard">
                    <Bell className="w-4.5 h-4.5" />
                </button>

                {/* Profile */}
                <div className="flex items-center gap-3 pl-6 border-l border-zinc-800">
                    <div className="flex flex-col items-end">
                        <span className="text-xs font-semibold text-white">Nagarjun DP</span>
                        <span className="text-[10px] text-zinc-500 font-medium tracking-tight">Enterprise Client</span>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                        <User className="w-3.5 h-3.5 text-zinc-500" />
                    </div>
                </div>
            </div>
        </header>
    );
}
