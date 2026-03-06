"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, ShieldAlert, ShieldCheck, Loader2, Link2, MessageSquare, CreditCard, Brain, Database, Fingerprint, Zap, ExternalLink, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import RiskMeter from "./RiskMeter";

interface Message {
    id: string;
    role: "assistant" | "user";
    content: string;
    type?: "url" | "message" | "transaction" | "phone" | "voice";
    isThinking?: boolean;
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

export default function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "assistant",
            content: "Welcome to Cognitive AI Shield Console. System initialized. Secure channel established. Paste any suspicious link, message, or transaction for real-time analysis."
        }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [thinkingStep, setThinkingStep] = useState(0);
    const [activeTab, setActiveTab] = useState<"url" | "message" | "transaction" | "phone" | "voice">("url");

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading, thinkingStep]);

    const steps = [
        { id: 1, label: "Analyzing linguistic patterns", icon: Brain },
        { id: 2, label: "Checking threat databases", icon: Database },
        { id: 3, label: "Evaluating scam psychology", icon: Fingerprint }
    ];

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
        setThinkingStep(1);

        // Simulation thinking delay
        for (let i = 1; i <= 3; i++) {
            setThinkingStep(i);
            await new Promise(r => setTimeout(r, 800));
        }

        try {
            const response = await fetch("http://localhost:8000/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    input_text: textToSend,
                    type: activeTab,
                    transaction_details: activeTab === "transaction" ? { amount: parseFloat(textToSend) || 0 } : null
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
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: "System connection failure. Analysis engine offline."
            }]);
        } finally {
            setIsLoading(false);
            setThinkingStep(0);
        }
    };

    const latestAssistantMessage = [...messages].reverse().find(m => m.role === "assistant" && m.riskData);

    return (
        <div className="flex h-full w-full bg-background overflow-hidden border-t border-white/5">
            {/* Center Panel (ChatGPT style) */}
            <div className="flex-1 flex flex-col min-w-0 bg-[#0B0F19]">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-display font-bold tracking-tight">Cognitive AI Shield Console</h1>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Session ID: {Date.now().toString().slice(-8)}</p>
                    </div>
                    <div className="flex gap-2">
                        {["url", "message", "transaction"].map(t => (
                            <button
                                key={t}
                                onClick={() => setActiveTab(t as any)}
                                className={cn(
                                    "px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-all",
                                    activeTab === t ? "bg-primary/20 border-primary/40 text-primary" : "bg-white/5 border-white/10 text-gray-500 hover:text-white"
                                )}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth relative z-10">
                    <AnimatePresence>
                        {messages.length === 0 ? (
                            <motion.div
                                key="empty-state"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex flex-col items-center justify-center h-full text-center space-y-4 pt-20"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center animate-pulse-soft">
                                    <ShieldCheck className="w-8 h-8 text-primary" />
                                </div>
                                <div className="space-y-1">
                                    <h2 className="text-xl font-display font-bold text-white tracking-tight">Cognitive AI Shield Console</h2>
                                    <p className="text-sm text-gray-500 max-w-sm">Secure channel established. Paste any suspicious link, message, or transaction for real-time analysis.</p>
                                </div>
                            </motion.div>
                        ) : (
                            messages.map((m, i) => (
                                <motion.div
                                    key={m.id || i}
                                    initial={{ opacity: 0, x: m.role === "user" ? 10 : -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={cn(
                                        "flex flex-col gap-2 max-w-[85%]",
                                        m.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
                                    )}
                                >
                                    <div className={cn(
                                        "p-4 rounded-2xl text-sm leading-relaxed",
                                        m.role === "user"
                                            ? "bg-primary text-white font-medium shadow-lg shadow-primary/20"
                                            : "glass-card border-white/10"
                                    )}>
                                        <div className="whitespace-pre-wrap">{m.content}</div>
                                    </div>
                                </motion.div>
                            ))
                        )}

                        {isLoading && (
                            <motion.div
                                key="thinking"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col gap-4 py-8 items-center justify-center"
                            >
                                {steps.map((step, idx) => {
                                    const stepNum = idx + 1;
                                    const isActive = thinkingStep === stepNum;
                                    const isDone = thinkingStep > stepNum;

                                    return (
                                        <motion.div
                                            key={step.id}
                                            animate={{
                                                opacity: stepNum <= thinkingStep ? 1 : 0.3,
                                                scale: isActive ? 1 : 0.95,
                                                x: isActive ? 0 : -4
                                            }}
                                            className={cn(
                                                "flex items-center gap-4 px-6 py-3 rounded-xl border transition-all duration-500 w-full max-w-md",
                                                isActive
                                                    ? "bg-primary/10 border-primary/30 shadow-lg shadow-primary/5 ring-1 ring-primary/20"
                                                    : "bg-white/5 border-white/5"
                                            )}
                                        >
                                            <div className={cn(
                                                "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                                                isActive ? "bg-primary text-white animate-pulse" : (isDone ? "bg-emerald-500/20 text-emerald-500" : "bg-white/5 text-gray-500")
                                            )}>
                                                <step.icon size={16} />
                                            </div>
                                            <div className="flex-1">
                                                <span className={cn(
                                                    "text-sm font-bold tracking-tight",
                                                    isActive ? "text-white" : "text-gray-500"
                                                )}>{step.label}</span>
                                            </div>
                                            {isActive && (
                                                <div className="flex gap-1">
                                                    <div className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                                                    <div className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                                                    <div className="w-1 h-1 bg-primary rounded-full animate-bounce" />
                                                </div>
                                            )}
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <div className="p-6 bg-black/40 border-t border-white/5">
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
                            placeholder={`Input suspicious ${activeTab} data for cognitive analysis...`}
                            className="w-full glass-input min-h-[56px] pr-24 py-4 resize-none"
                        />
                        <div className="absolute right-2 bottom-2 flex gap-2">
                            <button
                                onClick={() => handleSend("IRS Notice: Confirm your tax details at http://irs-refund-verify.xyz")}
                                className="px-3 py-1.5 rounded-lg bg-white/5 text-gray-500 text-[10px] font-bold uppercase hover:bg-white/10 hover:text-white transition-all border border-white/10"
                            >
                                Simulate Scam
                            </button>
                            <button
                                onClick={() => handleSend()}
                                disabled={!input.trim() || isLoading}
                                className="w-10 h-10 rounded-xl bg-primary hover:bg-primary/90 flex items-center justify-center text-white disabled:opacity-50 transition-all shadow-lg shadow-primary/20"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Insights Panel */}
            <div className="w-80 border-l border-white/5 bg-black/20 overflow-y-auto p-6 space-y-8 hidden xl:block">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-white/5 pb-2">Real-Time Insights</h3>

                {latestAssistantMessage ? (
                    <div className="space-y-8">
                        <div>
                            <RiskMeter score={latestAssistantMessage.riskData!.score} />
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                                <div className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Attack Vector</div>
                                <div className="text-sm font-bold text-white">{latestAssistantMessage.riskData!.attackType}</div>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                                <div className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Status</div>
                                <div className={cn(
                                    "text-sm font-bold",
                                    latestAssistantMessage.riskData!.score > 0.6 ? "text-danger" : latestAssistantMessage.riskData!.score > 0.3 ? "text-warning" : "text-success"
                                )}>
                                    {latestAssistantMessage.riskData!.score > 0.6 ? "CRITICAL THREAT" : latestAssistantMessage.riskData!.score > 0.3 ? "WARNING" : "SAFE"}
                                </div>
                            </div>
                        </div>

                        {latestAssistantMessage.patternMemory && (
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-primary">
                                    <Zap size={14} />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Cognitive Memory</span>
                                </div>
                                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 space-y-2">
                                    <div className="flex justify-between text-[10px]">
                                        <span className="text-blue-400">Match Accuracy</span>
                                        <span className="text-white font-bold">{Math.round(latestAssistantMessage.patternMemory.similarity * 100)}%</span>
                                    </div>
                                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary" style={{ width: `${latestAssistantMessage.patternMemory.similarity * 100}%` }} />
                                    </div>
                                    <p className="text-[10px] text-gray-500 italic">Matched {latestAssistantMessage.patternMemory.match_count} historical campaigns.</p>
                                </div>
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Recommended Action</span>
                                <ExternalLink size={12} className="text-gray-600" />
                            </div>
                            <div className="p-4 rounded-xl border border-dashed border-white/10 text-xs text-justify text-gray-400 leading-relaxed">
                                {latestAssistantMessage.riskData!.score > 0.6
                                    ? "Immediate isolation required. Report to cybercrime cell and block the source. Do not click or provide any data."
                                    : "Standard monitoring. Proceed with caution and verify the source independently if possible."}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center opacity-20 space-y-4">
                        <ShieldAlert size={48} />
                        <span className="text-[10px] uppercase tracking-widest font-bold">Waiting for input</span>
                    </div>
                )}
            </div>
        </div>
    );
}
