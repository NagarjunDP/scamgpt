"use client";

import { useState } from "react";
import {
    LayoutDashboard,
    ShieldAlert,
    Link2,
    MessageSquare,
    Mic2,
    Map as MapIcon,
    FileText,
    Settings,
    Menu,
    ChevronLeft
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const sidebarItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard", href: "/live-threats" },
    { id: "detection", icon: ShieldAlert, label: "Live Detection", href: "/chat" },
    { id: "url", icon: Link2, label: "URL Scanner", href: "/analyzer?tab=url" },
    { id: "message", icon: MessageSquare, label: "Message Analyzer", href: "/analyzer?tab=message" },
    { id: "voice", icon: Mic2, label: "Voice/Deepfake", href: "#", disabled: true },
    { id: "map", icon: MapIcon, label: "Threat Map", href: "#", disabled: true },
    { id: "reports", icon: FileText, label: "Scam Reports", href: "/report" },
    { id: "settings", icon: Settings, label: "Settings", href: "#" },
];

export function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();

    return (
        <motion.aside
            initial={false}
            animate={{ width: isCollapsed ? 80 : 280 }}
            className="h-screen sticky top-0 bg-[#0B0F19]/80 border-r border-white/5 backdrop-blur-2xl flex flex-col z-40 transition-all duration-300"
        >
            {/* Logo Area */}
            <div className="p-6 flex items-center justify-between">
                {!isCollapsed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2"
                    >
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                            <ShieldAlert className="text-white" size={18} />
                        </div>
                        <span className="font-display font-bold text-lg tracking-tight">Shield AI</span>
                    </motion.div>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-2 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white transition-colors"
                >
                    {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-2 mt-4">
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.id}
                            href={item.disabled ? "#" : item.href}
                            className={cn(
                                "sidebar-item relative group",
                                isActive && "sidebar-item-active",
                                item.disabled && "opacity-40 cursor-not-allowed hover:bg-transparent hover:text-gray-400"
                            )}
                        >
                            <item.icon size={20} className={cn(isActive ? "text-primary" : "text-gray-400 group-hover:text-white")} />
                            {!isCollapsed && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-sm font-medium"
                                >
                                    {item.label}
                                </motion.span>
                            )}
                            {item.disabled && !isCollapsed && (
                                <span className="ml-auto text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-gray-500">Coming</span>
                            )}
                            {isActive && (
                                <motion.div
                                    layoutId="active-indicator"
                                    className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
                                />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Profile/Status */}
            <div className="p-4 border-t border-white/5 bg-black/20">
                <div className={cn(
                    "flex items-center gap-3 p-3 rounded-xl transition-all",
                    !isCollapsed && "hover:bg-white/5"
                )}>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-blue-600 flex items-center justify-center font-bold text-sm ring-2 ring-primary/20 shadow-lg shadow-primary/10">
                        JD
                    </div>
                    {!isCollapsed && (
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-white leading-tight">Judge Demo</span>
                            <span className="text-[10px] text-emerald-500 flex items-center gap-1.5 mt-0.5">
                                <div className="status-indicator status-online animate-pulse" />
                                <span className="uppercase tracking-widest font-bold opacity-80">System Online</span>
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </motion.aside>
    );
}
