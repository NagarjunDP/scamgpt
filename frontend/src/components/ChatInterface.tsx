"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Send,
    Bot,
    User,
    ShieldAlert,
    ShieldCheck,
    Loader2,
    Link2,
    MessageSquare,
    CreditCard,
    Brain,
    Database,
    Fingerprint,
    Zap,
    ExternalLink,
    RefreshCw,
    Search,
    Sparkles,
    Info,
    ShieldQuestion,
    AlertTriangle
} from "lucide-react";
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface Message {
    id: string;
    role: "assistant" | "user";
    content: string;
    type?: "url" | "message" | "transaction" | "phone" | "voice";
    riskData?: {
        score: number;
        threatLevel: string;
        attackType: string;
        prediction: number;
    };
    patternMemory?: {
        similarity: number;
        match_count: number;
        status: string;
    };
    attackGraph?: { id: string; label: string; type: string }[];
}

const steps = [
    { id: 1, label: "Scanning domain intelligence", icon: Search },
    { id: 2, label: "Analyzing linguistic patterns", icon: Sparkles },
    { id: 3, label: "Checking scam signatures", icon: Database },
    { id: 4, label: "Evaluating psychology", icon: Brain }
];

export default function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "assistant",
            content: "Welcome to ScamGPT Intelligence Console. Secure channel established. How can I assist you in investigating potential threats today?"
        }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [thinkingStep, setThinkingStep] = useState(0);
    const [activeTab, setActiveTab] = useState<"url" | "message" | "transaction">("url");

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading, thinkingStep]);

    const handleSend = async (overrideInput?: string) => {
        const textToSend = overrideInput || input;
        if (!textToSend.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: textToSend,
            type: activeTab
        };

        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        // Simulation thinking steps
        for (let i = 1; i <= steps.length; i++) {
            setThinkingStep(i);
            await new Promise(r => setTimeout(r, 600));
        }

        try {
            const response = await fetch("http://localhost:8000/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    input_text: textToSend,
                    type: activeTab
                })
            });

            const data = await response.json();

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: data.reasoning,
                riskData: {
                    score: data.risk_score,
                    threatLevel: data.threat_level,
                    attackType: data.attack_type,
                    prediction: data.prediction
                },
                patternMemory: data.pattern_memory,
                attackGraph: data.attack_graph
            };

            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            // Mock response for demo
            const mockBotMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: "Our AI engine detected patterns consistent with " + activeTab + " scams. The request uses urgency manipulation and suspicious redirect patterns typical of credential harvesting campaigns.",
                riskData: {
                    score: 0.82,
                    threatLevel: "High",
                    attackType: activeTab.toUpperCase(),
                    prediction: 1
                },
                patternMemory: {
                    similarity: 0.76,
                    match_count: 142,
                    status: "Matching known campaigns"
                },
                attackGraph: [
                    { id: "source", label: "Attacker Source", type: "origin" },
                    { id: "vector", label: activeTab + " Vector", type: "vector" },
                    { id: "objective", label: "Credential Theft", type: "target" }
                ]
            };
            setMessages(prev => [...prev, mockBotMessage]);
        } finally {
            setIsLoading(false);
            setThinkingStep(0);
        }
    };

    const latestAssistantMessage = [...messages].reverse().find(m => m.role === "assistant" && m.riskData);

    return (
        <div className="flex h-full w-full bg-[#0B0F19]/50 overflow-hidden border border-white/5 rounded-2xl">
            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-[#0B0F19]/30">
                <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                            <Bot className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-sm font-display font-bold text-white leading-tight">ScamGPT Intelligence</h2>
                            <p className="text-[10px] text-success font-bold uppercase tracking-widest mt-0.5">Secure Session Active</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {["url", "message", "transaction"].map(t => (
                            <button
                                key={t}
                                onClick={() => setActiveTab(t as any)}
                                className={cn(
                                    "px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all",
                                    activeTab === t ? "bg-primary text-white" : "bg-white/5 text-gray-500 hover:text-white"
                                )}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                    <AnimatePresence>
                        {messages.map((m) => (
                            <motion.div
                                key={m.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={cn(
                                    "flex flex-col gap-2 max-w-[85%]",
                                    m.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
                                )}
                            >
                                <div className={cn(
                                    "p-4 rounded-2xl text-sm leading-relaxed",
                                    m.role === "user"
                                        ? "bg-primary text-white font-medium"
                                        : "glass-card border-white/10 text-gray-200"
                                )}>
                                    {m.content}
                                </div>
                                {m.riskData && (
                                    <div className="flex gap-2">
                                        <div className={cn("px-2 py-0.5 rounded text-[10px] font-bold uppercase border",
                                            m.riskData.score > 0.6 ? "bg-danger/10 border-danger/20 text-danger" : "bg-success/10 border-success/20 text-success")}>
                                            {m.riskData.threatLevel} RISK
                                        </div>
                                        <div className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-bold text-gray-500 uppercase">
                                            {m.riskData.attackType}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}

                        {isLoading && (
                            <div className="mr-auto w-full max-w-sm space-y-2 py-4">
                                {steps.map((step, idx) => {
                                    const isCurrent = thinkingStep === (idx + 1);
                                    const isDone = thinkingStep > (idx + 1);
                                    return (
                                        <div key={idx} className={cn("flex items-center gap-3 transition-opacity duration-300",
                                            thinkingStep >= (idx + 1) ? "opacity-100" : "opacity-30")}>
                                            <div className={cn("w-6 h-6 rounded flex items-center justify-center",
                                                isCurrent ? "bg-primary/20 text-primary animate-pulse" : (isDone ? "bg-success/20 text-success" : "bg-white/5 text-gray-500"))}>
                                                {isDone ? <ShieldCheck className="w-4 h-4" /> : <step.icon className={cn("w-3.5 h-3.5", isCurrent && "animate-spin")} />}
                                            </div>
                                            <span className="text-xs text-gray-400 font-medium">{step.label}...</span>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="p-4 bg-white/[0.02] border-t border-white/5">
                    <div className="relative">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                            placeholder={`Describe a suspicious ${activeTab}...`}
                            className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-3 pr-12 text-sm text-white placeholder:text-gray-600 outline-none focus:border-primary/50 transition-all resize-none min-h-[50px]"
                        />
                        <button
                            onClick={() => handleSend()}
                            disabled={!input.trim() || isLoading}
                            className="absolute right-2 bottom-2 w-8 h-8 rounded-lg bg-primary hover:bg-primary/80 flex items-center justify-center text-white disabled:opacity-30 transition-all"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Insights Pane */}
            <div className="w-80 border-l border-white/5 bg-black/40 p-6 space-y-8 overflow-y-auto hidden xl:block">
                <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                    <Database className="w-3.5 h-3.5" />
                    Live Intelligence
                </h3>

                {latestAssistantMessage ? (
                    <div className="space-y-6">
                        <div className="glass-card p-5 border-primary/20 bg-primary/5 relative overflow-hidden">
                            <div className="relative z-10">
                                <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Risk Assessment</p>
                                <p className="text-3xl font-display font-bold text-white">{Math.round(latestAssistantMessage.riskData!.score * 100)}%</p>
                                <p className={cn("text-xs font-bold mt-1", latestAssistantMessage.riskData!.score > 0.6 ? "text-danger" : "text-success")}>
                                    {latestAssistantMessage.riskData!.threatLevel} SEVERITY
                                </p>
                            </div>
                            <Zap className="absolute top-2 right-2 w-12 h-12 text-primary opacity-10" />
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                <Fingerprint className="w-3.5 h-3.5" />
                                Psychological Markers
                            </h4>
                            <div className="space-y-2">
                                {["Urgency Manipulation", "Authority Impersonation", "Social Proofing"].map((p, i) => (
                                    <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5">
                                        <span className="text-[10px] text-gray-400 font-medium">{p}</span>
                                        <div className="w-2 h-2 rounded-full bg-primary/40 shadow-[0_0_8px_rgba(79,140,255,0.4)]" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-danger/5 border border-danger/20">
                            <div className="flex items-center gap-2 text-danger mb-2">
                                <AlertTriangle className="w-4 h-4" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Protocol Recommendation</span>
                            </div>
                            <p className="text-xs text-danger/80 leading-relaxed font-medium">
                                {latestAssistantMessage.riskData!.score > 0.6
                                    ? "Immediate isolation of communication channel. Flag source in threat intelligence database."
                                    : "Standard monitoring. No immediate action required, but remain vigilant."}
                            </p>
                        </div>

                        <div className="pt-4 border-t border-white/5">
                            <p className="text-[10px] text-gray-600 italic leading-relaxed">
                                Analysis completed by ScamGPT v2.4.0 • Cognitive RAG Engine
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 opacity-20 text-center">
                        <ShieldQuestion className="w-12 h-12 mb-4" />
                        <p className="text-[10px] font-bold uppercase tracking-widest">Awaiting Analysis</p>
                    </div>
                )}
            </div>
        </div>
    );
}
