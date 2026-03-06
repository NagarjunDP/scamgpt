"use client";

import ChatInterface from "@/components/ChatInterface";
import { motion } from "framer-motion";
import { Brain, Info } from "lucide-react";

export default function ChatPage() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-8 h-[calc(100vh-80px)] flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white flex items-center gap-3">
                        <Brain className="w-8 h-8 text-[#00d4ff]" />
                        ScamGPT <span className="text-[#00d4ff]">Intelligence Chat</span>
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">Direct access to cognitive cybersecurity reasoning.</p>
                </div>

                <div className="hidden lg:flex items-center gap-4 p-4 glass-card border-emerald-500/20 bg-emerald-500/5">
                    <Info className="w-5 h-5 text-emerald-400" />
                    <div className="text-xs">
                        <p className="text-white font-bold">Safe Mode Active</p>
                        <p className="text-gray-400">All data is anonymized before processing.</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 min-h-0">
                <ChatInterface />
            </div>
        </div>
    );
}
