"use client";

import { motion } from "framer-motion";
import {
    Search,
    Terminal,
    Cpu,
    ArrowRight,
    ShieldCheck,
    Globe,
    MessageSquare,
    Database,
    ShieldAlert,
    Zap,
    Network,
    Fingerprint
} from "lucide-react";
import Link from "next/link";
import { cn } from "../../lib/utils";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const AnalyzerCard = ({ icon: Icon, title, description, badge, href, delay }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
    >
        <Card className="h-full border-zinc-800/60 bg-zinc-900/10 hover:border-zinc-700/80 transition-standard group">
            <CardContent className="p-7 flex flex-col h-full">
                <div className="w-11 h-11 rounded-lg bg-zinc-800/50 border border-zinc-700/30 flex items-center justify-center mb-6 transition-standard group-hover:border-zinc-600">
                    <Icon className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                </div>
                <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-semibold text-white tracking-tight">{title}</h3>
                    <Badge variant="neutral" className="text-[9px] bg-zinc-800/50 border-zinc-700/50">{badge}</Badge>
                </div>
                <p className="text-zinc-500 text-xs leading-relaxed mb-8 flex-1">
                    {description}
                </p>
                <div className="pt-4 border-t border-zinc-800/50">
                    <Link
                        href={href}
                        className="flex items-center gap-2 text-[11px] font-semibold text-zinc-500 hover:text-white transition-colors"
                    >
                        Initialize Intelligence
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </div>
            </CardContent>
        </Card>
    </motion.div>
);

export default function AnalyzerPage() {
    return (
        <div className="p-8 lg:p-12 animate-fade-in max-w-[1200px] mx-auto">
            <div className="mb-16">
                <Badge variant="neutral" className="mb-4 bg-zinc-800/50">System Distribution</Badge>
                <h1 className="text-3xl font-semibold text-white tracking-tight">Intelligence Nodes</h1>
                <p className="text-zinc-500 mt-3 max-w-2xl text-base leading-relaxed font-medium">
                    Access specialized clusters optimized for regional and sector-specific threat signatures.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                <AnalyzerCard
                    icon={Globe}
                    title="URL Intelligence"
                    badge="Active"
                    description="Real-time analysis of domain reputation and homograph linguistic patterns."
                    href="/?tab=url"
                    delay={0.1}
                />
                <AnalyzerCard
                    icon={MessageSquare}
                    title="Linguistic Logic"
                    badge="Cognitive"
                    description="Evaluation of scam psychology and urgency cues in communication streams."
                    href="/?tab=message"
                    delay={0.2}
                />
                <AnalyzerCard
                    icon={Cpu}
                    title="Behavioral Fraud"
                    badge="Sandbox"
                    description="Detection of transaction anomalies and behavioral risk indicators."
                    href="/?tab=transaction"
                    delay={0.3}
                />
            </div>

            {/* Technical Context Section */}
            <Card className="border-zinc-800/60 bg-zinc-900/10">
                <CardContent className="p-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-10">
                            <div>
                                <h2 className="text-xl font-semibold text-white mb-2 tracking-tight">Operational Protocol</h2>
                                <p className="text-zinc-500 text-xs leading-relaxed font-medium">Multi-layer verification stack ensuring deterministic accuracy across all nodes.</p>
                            </div>

                            <div className="space-y-6">
                                {[
                                    { icon: Database, title: "Pattern Memory", desc: "Cross-referencing 10k+ validated scam signatures." },
                                    { icon: ShieldAlert, title: "Heuristic Core", desc: "Real-time evaluation of 54+ red-flag vectors." },
                                    { icon: Fingerprint, title: "Identity Validation", desc: "Deep analysis of impersonation and authority lures." }
                                ].map((step, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-9 h-9 rounded-md bg-zinc-800/50 border border-zinc-700/30 flex items-center justify-center shrink-0">
                                            <step.icon size={16} className="text-zinc-400" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold text-zinc-200">{step.title}</h4>
                                            <p className="text-zinc-500 text-[11px] leading-relaxed mt-0.5">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-8 bg-black/20 rounded-xl border border-zinc-800/50 space-y-6">
                            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
                                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Protocol Active</span>
                                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                            </div>
                            <div className="space-y-4 font-mono text-[10px]">
                                {[
                                    { k: "ML_ENGINE", v: "0.9942" },
                                    { k: "THREAT_LAYER", v: "L4_DETECT" },
                                    { k: "LATENCY", v: "42ms" },
                                    { k: "NODES", v: "1,242" }
                                ].map(item => (
                                    <div key={item.k} className="flex justify-between">
                                        <span className="text-zinc-700 font-medium">{item.k}</span>
                                        <span className="text-zinc-300 font-bold">{item.v}</span>
                                    </div>
                                ))}
                                <div className="h-1 w-full bg-zinc-800 rounded-full mt-6 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "94%" }}
                                        className="h-full bg-blue-500/40"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
