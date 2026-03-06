"use client";

import ChatInterface from "@/components/ChatInterface";
import { Brain, ShieldCheck } from "lucide-react";

export default function ChatPage() {
    return (
        <div className="h-screen flex flex-col p-6 overflow-hidden">
            <div className="flex items-center justify-between mb-6 shrink-0">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                        <Brain className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-display font-bold text-white leading-tight">
                            AI Security Assistant
                        </h1>
                        <div className="flex items-center gap-2 mt-0.5">
                            <div className="status-dot bg-success" />
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Cognitive Engine Online</p>
                        </div>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-6">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Security Protocol</span>
                        <span className="text-xs font-bold text-white uppercase">End-to-End Encrypted</span>
                    </div>
                    <div className="w-px h-8 bg-white/5" />
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                        <ShieldCheck className="w-4 h-4 text-success" />
                        <span className="text-xs font-bold text-white uppercase">Safe Mode</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 min-h-0 bg-[#0B0F19]/20 rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
                <ChatInterface />
            </div>
        </div>
    );
}
