"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Search, Terminal, Cpu, ArrowRight, Zap, Database } from "lucide-react";
import Link from "next/link";

const FeatureCard = ({ icon: Icon, title, description, color }: { icon: any; title: string; description: string; color: string }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="glass-card p-6 border-white/5 hover:border-[#00d4ff]/30 transition-all duration-300"
  >
    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-${color}/10`}>
      <Icon className={`w-6 h-6 text-${color}`} />
    </div>
    <h3 className="text-xl font-display font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
  </motion.div>
);

export default function Home() {
  return (
    <main className="relative flex flex-col items-center overflow-x-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none">
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00d4ff]/10 blur-[120px] rounded-full" />
      </div>

      {/* Hero Section */}
      <section className="w-full max-w-7xl px-6 pt-20 pb-32 text-center flex flex-col items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8"
        >
          <Zap className="w-4 h-4 text-[#00d4ff]" />
          <span className="text-xs font-mono font-bold text-[#00d4ff] uppercase tracking-widest">AI trained on real cyber attack datasets</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight max-w-4xl"
        >
          Cognitive AI Defense Against <span className="text-[#00d4ff]">Digital Scams</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-400 max-w-2xl mb-12 leading-relaxed"
        >
          Detect phishing links, scam messages, and fraudulent transactions using advanced
          AI models trained on real-world cybersecurity intelligence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/chat" className="btn-primary group flex items-center justify-center gap-2">
            Start AI Analysis
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/analyzer" className="px-8 py-3 rounded-lg border border-white/10 hover:bg-white/5 text-white font-bold transition-all h-fit flex items-center justify-center gap-2">
            Explore Modules
          </Link>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="w-full max-w-7xl px-6 py-20 bg-black/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={Search}
            color="[#00d4ff]"
            title="URL Scanner"
            description="Real-time analysis of suspicious links using domain heuristics and phishing pattern recognition."
          />
          <FeatureCard
            icon={Terminal}
            color="[#10b981]"
            title="Message Analysis"
            description="Deep NLP scanning for scam SMS, emails, and social engineering scripts to identify harmful intent."
          />
          <FeatureCard
            icon={Cpu}
            color="[#ff3b3b]"
            title="Transaction Risk"
            description="Anomaly detection for UPI and card transactions based on behavior, merchant risk, and fraud history."
          />
        </div>
      </section>

      {/* Info Sections */}
      <section className="w-full max-w-7xl px-6 py-32 flex flex-col md:flex-row items-center gap-20">
        <div className="flex-1">
          <h2 className="text-4xl font-display font-bold text-white mb-6">Cognitive Cyber Intelligence</h2>
          <p className="text-gray-400 leading-relaxed mb-8 text-lg">
            ScamGPT doesn&apos;t just block links; it thinks like a security researcher. Using RAG (Retrieval-Augmented Generation),
            it cross-references threats against our cybercrime database to provide human-like explanations.
          </p>
          <ul className="space-y-4">
            {[
              "Hybrid ML/Heuristic Detection",
              "Real-time RAG Explanations",
              "Automated Scam Reporting",
              "UPI Fraud Prevention Logic"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-white">
                <div className="w-5 h-5 rounded-full bg-[#00d4ff]/20 flex items-center justify-center">
                  <Lock className="w-3 h-3 text-[#00d4ff]" />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 w-full max-w-md aspect-square relative glass-card p-1 border-[#00d4ff]/20">
          <div className="absolute inset-x-0 top-0 h-1 bg-[#00d4ff]/50 shadow-[0_0_15px_rgba(0,212,255,0.5)]" />
          <div className="h-full w-full bg-[#0a0f1c] rounded-[15px] p-8 font-mono text-xs overflow-hidden">
            <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
              <span className="text-gray-500 uppercase tracking-widest font-bold">Live Threat Terminal</span>
              <span className="text-emerald-400">ENCRYPTED</span>
            </div>
            <div className="space-y-3 text-gray-300">
              <p className="animate-pulse">{"$ analyze --target 'https://secure-hdfc-kyc.net'"}</p>
              <p className="text-[#ff3b3b] font-bold">[DETECTED] Brand Impersonation: HDFC Bank</p>
              <p className="text-[#ff3b3b] font-bold">[DETECTED] Domain Age: 2 Days</p>
              <p className="text-[#ff3b3b] font-bold">[DETECTED] Suspicious Redirect Loop</p>
              <p className="bg-[#ff3b3b]/10 p-2 border-l-2 border-[#ff3b3b] mt-4">
                THREAT LEVEL: CRITICAL<br />
                CONSEQUENCE: ACCOUNT TAKEOVER
              </p>
              <p className="mt-4 text-emerald-400">REPORTING TO CYBERCRIME DB... DONE</p>
              <div className="h-24 w-full bg-[#00d4ff]/5 mt-4 rounded border border-[#00d4ff]/10 flex flex-col items-center justify-center">
                <Database className="w-6 h-6 text-[#00d4ff] mb-2" />
                <span className="text-[10px] text-gray-500">DATABASE SYNC ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm">
            © 2026 ScamGPT. Built for the Cognitive AI Hackathon.
          </p>
        </div>
      </footer>
    </main>
  );
}
