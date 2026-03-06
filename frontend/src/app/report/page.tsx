"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Send, CheckCircle2, ShieldAlert, Upload, MapPin, Info } from "lucide-react";
import { cn } from "@/lib/utils";

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
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="flex-1 flex items-center justify-center p-8">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="glass-card p-12 max-w-lg w-full text-center border-emerald-500/20"
                >
                    <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
                        <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                    </div>
                    <h1 className="text-2xl font-display font-bold text-white mb-4">Threat Logged Successfully</h1>
                    <p className="text-gray-400 mb-8 text-sm leading-relaxed">
                        Your report has been analyzed and synchronized with our global threat intelligence network.
                        Your contribution helps our cognitive AI protect thousands of users in real-time.
                    </p>
                    <button
                        onClick={() => setIsSubmitted(false)}
                        className="btn-primary w-full py-4 text-base"
                    >
                        File Another Report
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto p-8 lg:p-12 bg-[#0B0F19]">
            <div className="max-w-5xl mx-auto">
                <div className="mb-12">
                    <h1 className="text-3xl font-display font-bold text-white tracking-tight">Report Viral Scam Threats</h1>
                    <p className="text-gray-500 mt-2">Submit suspicious indicators to help the Cognitive AI Shield community.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Info Panel */}
                    <div className="space-y-6">
                        <div className="glass-card p-6 border-l-4 border-l-danger bg-danger/5">
                            <h3 className="text-danger font-bold text-sm mb-2 flex items-center gap-2">
                                <ShieldAlert size={16} /> Community Impact
                            </h3>
                            <p className="text-xs text-danger/80 leading-relaxed font-medium">
                                Reporting a scam instantly updates our linguistic and database analysis engines,
                                blocking the threat for all other Shield AI users.
                            </p>
                        </div>

                        <div className="glass-card p-6 space-y-4">
                            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                <Info size={12} /> Submission Standards
                            </h3>
                            <ul className="space-y-4">
                                {[
                                    { label: "URL Phishing", desc: "Always include the full http/https protocol if available." },
                                    { label: "Payment Fraud", desc: "Provide UPI IDs or wallet addresses for financial tracking." },
                                    { label: "Institutional Lures", desc: "Mention if the scam claims to be a bank, IRS, or HR." }
                                ].map(item => (
                                    <li key={item.label} className="space-y-1">
                                        <div className="text-[11px] font-bold text-white">{item.label}</div>
                                        <div className="text-[10px] text-gray-500 leading-relaxed">{item.desc}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Form Panel */}
                    <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
                        <div className="glass-card p-8 space-y-8 border-white/5">
                            <div className="space-y-3">
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
                                                    ? "bg-primary/10 border-primary/30 text-primary"
                                                    : "border-white/5 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                                            )}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Target Identifier</label>
                                    <input
                                        required
                                        value={target}
                                        onChange={(e) => setTarget(e.target.value)}
                                        placeholder="URL, UPI ID, or Phone..."
                                        className="glass-input h-14"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Origin Location</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                                        <input
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            placeholder="e.g. Remote, Mumbai..."
                                            className="glass-input h-14 pl-12"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Threat Context / Analysis</label>
                                <textarea
                                    required
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Describe the scam methodology and lures used..."
                                    className="glass-input h-40 py-4 resize-none"
                                />
                            </div>

                            <div className="pt-2">
                                <button
                                    disabled={isSubmitting}
                                    className="btn-primary w-full h-14 text-base shadow-primary/30"
                                >
                                    {isSubmitting ? "Compiling Intelligence..." : "Log Threat to Shield AI"}
                                    {!isSubmitting && <Send size={20} />}
                                </button>
                            </div>
                        </div>

                        <p className="text-[10px] text-gray-600 text-center font-medium italic">
                            All submissions are vetted by our cognitive models before public distribution.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
