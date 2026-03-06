"use client";

import Link from "next/link";
import { Shield, LayoutDashboard, Brain, Search, AlertTriangle, Info } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const NavItem = ({ href, icon: Icon, label, active }: { href: string; icon: any; label: string; active: boolean }) => (
    <Link
        href={href}
        className={cn(
            "flex items-center gap-2 px-3 py-1.5 transition-standard rounded-md group",
            active
                ? "text-white bg-zinc-800/50"
                : "text-zinc-500 hover:text-white hover:bg-zinc-800/30"
        )}
    >
        <Icon className={cn("w-3.5 h-3.5", active ? "text-primary" : "group-hover:text-primary")} />
        <span className="text-[13px] font-semibold tracking-tight">{label}</span>
    </Link>
);

export const Navbar = () => {
    const pathname = usePathname();

    const navLinks = [
        { href: "/", icon: Shield, label: "Intelligence" },
        { href: "/analyzer", icon: Search, label: "Analyzer" },
        { href: "/live-threats", icon: LayoutDashboard, label: "Global View" },
        { href: "/chat", icon: Brain, label: "AI Agent" },
        { href: "/report", icon: AlertTriangle, label: "Report" },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-[100] bg-background/80 backdrop-blur-xl border-b border-border/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-standard">
                            <Shield className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-lg font-bold text-white tracking-tighter">
                            Scam<span className="text-primary italic">GPT</span>
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <NavItem
                                key={link.href}
                                {...link}
                                active={pathname === link.href}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="hidden sm:flex items-center gap-2 text-[10px] font-bold text-safe bg-safe/10 border border-safe/20 px-2.5 py-1 rounded-full uppercase tracking-widest">
                        <div className="w-1.5 h-1.5 bg-safe rounded-full animate-pulse" />
                        System Secure
                    </div>
                    <Button variant="secondary" size="sm" className="h-8 text-[11px] font-bold uppercase tracking-widest border-zinc-800 hover:bg-zinc-800">
                        Enterprise
                    </Button>
                </div>
            </div>
        </nav>
    );
};
