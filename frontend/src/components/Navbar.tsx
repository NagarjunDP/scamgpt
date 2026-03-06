"use client";

import Link from "next/link";
import { Shield, LayoutDashboard, Brain, Search, AlertTriangle, Info } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NavItem = ({ href, icon: Icon, label, active }: { href: string; icon: any; label: string; active: boolean }) => (
    <Link
        href={href}
        className={cn(
            "flex items-center gap-2 px-4 py-2 transition-all duration-300 rounded-lg group",
            active
                ? "text-[#00d4ff] bg-[#00d4ff]/10"
                : "text-gray-400 hover:text-white hover:bg-white/5"
        )}
    >
        <Icon className={cn("w-4 h-4", active ? "text-[#00d4ff]" : "group-hover:text-white")} />
        <span className="text-sm font-medium">{label}</span>
    </Link>
);

export const Navbar = () => {
    const pathname = usePathname();

    const navLinks = [
        { href: "/", icon: Shield, label: "Home" },
        { href: "/chat", icon: Brain, label: "ScamGPT AI" },
        { href: "/analyzer", icon: Search, label: "Threat Analyzer" },
        { href: "/live-threats", icon: LayoutDashboard, label: "Live Threats" },
        { href: "/report", icon: AlertTriangle, label: "Report Scam" },
        { href: "/about", icon: Info, label: "About" },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f1c]/80 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#00d4ff] rounded flex items-center justify-center">
                        <Shield className="w-5 h-5 text-[#0a0f1c]" />
                    </div>
                    <span className="text-xl font-display font-bold text-white tracking-tight">
                        Scam<span className="text-[#00d4ff]">GPT</span>
                    </span>
                </div>

                <div className="hidden md:flex items-center gap-2">
                    {navLinks.map((link) => (
                        <NavItem
                            key={link.href}
                            {...link}
                            active={pathname === link.href}
                        />
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full">
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                        AI SECURE: ACTIVE
                    </div>
                    <button className="md:hidden text-white">
                        <LayoutDashboard className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </nav>
    );
};
