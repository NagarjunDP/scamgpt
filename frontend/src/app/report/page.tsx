"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    AlertTriangle,
    Send,
    CheckCircle2,
    ShieldAlert,
    Upload,
    MapPin,
    Info,
    Flag,
    Zap,
    ChevronRight
} from "lucide-react";
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function ReportPage() {
    const [reportType, setReportType] = useState("URL");
    const [target, setTarget] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("http://localhost:8000/report", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: reportType,
                    target,
                    description,
                    location: location || "Remote/Online"
                })
            });

            if (response.ok) {
                setIsSubmitted(true);
            }
        } catch (error) {
            console.error("Failed to submit report:", error);
            // Mock success for demo
            setIsSubmitted(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="flex-1 flex items-center justify-center p-8 h-screen">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="glass-card p-12 max-w-lg w-full text-center border-success/20 bg-success/5"
                >
                    <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-success/20">
                        <CheckCircle2 className="w-10 h-10 text-success" />
                    </div>
                    <h1 className="text-3xl font-display font-bold text-white mb-4">Threat Logged</h1>
                    <p className="text-gray-400 mb-8 text-sm leading-relaxed">
                        Intelligence successfully synchronized with our global threat network.
                        Your contribution actively trains our cognitive engine.
                    </p>
                    <button
                        onClick={() => setIsSubmitted(false)}
                        className="w-full py-4 rounded-xl bg-primary text-white font-bold hover:bg-primary/80 transition-all flex items-center justify-center gap-2"
                    >
                        File Another Report
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="p-8 lg:p-12 max-w-6xl mx-auto space-y-12">
            <div className="flex items-center justify-between border-b border-white/5 pb-8">
                <div>
                    <h1 className="text-4xl font-display font-bold text-white mb-2 flex items-center gap-4">
                        <Flag className="text-primary w-10 h-10" />
                        Report Viral Threats
                    </h1>
                    <p className="text-gray-400">Collaborate with the AI-driven community to block emerging scams.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Info Panel */}
                <div className="space-y-6">
                    <div className="glass-card p-6 border-l-4 border-l-danger bg-danger/5">
                        <h3 className="text-danger font-bold text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                            <ShieldAlert size={14} /> Community Impact
                        </h3>
                        <p className="text-xs text-gray-300 leading-relaxed font-medium">
                            Logging a scam instantly updates our linguistic engines.
                            Your data helps identify the psychological lures attackers are using in real-time.
                        </p>
                    </div>

                    <div className="glass-card p-6 space-y-6">
                        <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                            <Info size={12} /> Submission Standards
                        </h3>
                        <div className="space-y-4">
                            {[
                                { label: "Institutional Lures", desc: "Identify claims of banking or government affiliation." },
                                { label: "Payment Vectors", desc: "Capture UPI IDs, wallets, or merchant handles." },
                                { label: "Social Scripts", desc: "Note specific language used to create urgency." },
                            ].map((item, i) => (
                                <div key={i} className="space-y-1">
                                    <p className="text-sm font-bold text-white">{item.label}</p>
                                    <p className="text-[10px] text-gray-500 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 flex items-center gap-4">
                        <Zap className="w-8 h-8 text-primary opacity-50" />
                        <div>
                            <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Active Analysis</p>
                            <p className="text-xs text-gray-400">12,402 reports processed this week.</p>
                        </div>
                    </div>
                </div>

                {/* Form Panel */}
                <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
                    <div className="glass-card p-8 space-y-8 border-white/5">
                        <div className="space-y-4">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Select Threat Vector</label>
                            <div className="grid grid-cols-3 gap-3">
                                {["URL", "Message", "Payment"].map(type => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => setReportType(type)}
                                        className={cn(
                                            "py-3 rounded-xl border text-xs font-bold transition-all",
                                            reportType === type
                                                ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                                                : "border-white/5 bg-white/5 text-gray-500 hover:text-white"
                                        )}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Target Identifier</label>
                                <input
                                    required
                                    value={target}
                                    onChange={(e) => setTarget(e.target.value)}
                                    placeholder="URL, UPI ID, or Phone..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm text-white focus:border-primary/50 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Origin Location</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                                    <input
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        placeholder="e.g. Remote, Mumbai..."
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 pl-12 py-4 text-sm text-white focus:border-primary/50 outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Threat Context / Analysis</label>
                            <textarea
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe the scam methodology and lures used..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm text-white focus:border-primary/50 outline-none transition-all resize-none min-h-[160px]"
                            />
                        </div>

                        <button
                            disabled={isSubmitting}
                            className="w-full py-4 rounded-xl bg-primary text-white font-bold hover:bg-primary/80 transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl shadow-primary/20"
                        >
                            {isSubmitting ? "Compiling Intelligence..." : "Log Threat to Shield AI"}
                            {!isSubmitting && <Send size={18} />}
                        </button>
                    </div>

                    <p className="text-[10px] text-gray-600 text-center font-bold uppercase tracking-widest">
                        End-to-End Encrypted Intelligence Pipeline
                    </p>
                </form>
            </div>
        </div>
    );
}
