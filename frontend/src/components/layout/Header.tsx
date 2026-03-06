'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, User, CheckCircle2, AlertTriangle, ShieldAlert, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNotifications } from '@/lib/NotificationContext';

export default function Header() {
    const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsNotifOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

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
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsNotifOpen(!isNotifOpen)}
                        className="relative text-zinc-400 hover:text-white transition-standard p-1"
                    >
                        <Bell className="w-5 h-5" />
                        {unreadCount > 0 && (
                            <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-[#ff0033] rounded-full shadow-[0_0_5px_#ff0033]" />
                        )}
                    </button>

                    {/* Notification Dropdown */}
                    {isNotifOpen && (
                        <div className="absolute right-0 mt-3 w-80 bg-[#111111] border border-zinc-800 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden z-50">
                            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/50 bg-[#151515]">
                                <span className="text-xs font-bold text-white uppercase tracking-wider">Intel Alerts</span>
                                {unreadCount > 0 && (
                                    <button
                                        onClick={markAllAsRead}
                                        className="text-[10px] text-zinc-500 hover:text-white transition-colors"
                                    >
                                        Mark all read
                                    </button>
                                )}
                            </div>
                            <div className="max-h-80 overflow-y-auto scrollbar-thin">
                                {notifications.length > 0 ? (
                                    notifications.map(notif => (
                                        <div
                                            key={notif.id}
                                            onClick={() => !notif.read && markAsRead(notif.id)}
                                            className={`p-4 border-b border-zinc-900 last:border-0 cursor-pointer transition-colors ${notif.read ? 'opacity-60 hover:bg-zinc-900/40' : 'bg-[#ff0033]/5 hover:bg-[#ff0033]/10'}`}
                                        >
                                            <div className="flex gap-3">
                                                <div className="mt-0.5">
                                                    {notif.type === 'success' ? (
                                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                                    ) : notif.type === 'alert' ? (
                                                        <ShieldAlert className="w-4 h-4 text-[#ff0033]" />
                                                    ) : (
                                                        <AlertTriangle className="w-4 h-4 text-amber-500" />
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start mb-1">
                                                        <h4 className="text-xs font-semibold text-white">{notif.title}</h4>
                                                        <span className="text-[9px] text-zinc-500 ml-2">
                                                            {new Date(notif.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </span>
                                                    </div>
                                                    <p className="text-[11px] text-zinc-400 leading-snug">{notif.message}</p>
                                                </div>
                                                {!notif.read && (
                                                    <div className="w-1.5 h-1.5 bg-[#ff0033] rounded-full mt-1.5 shrink-0" />
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-8 text-center text-zinc-500 text-xs">No alerts generated.</div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

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
