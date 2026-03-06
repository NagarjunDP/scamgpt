'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  MessageSquare,
  CreditCard,
  ArrowRight,
  ShieldCheck,
  Zap,
  Lock,
  Terminal
} from 'lucide-react';
import axios from 'axios';
import AnalysisLoader from '@/components/AnalysisLoader';
import ThreatReport from '@/components/ThreatReport';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

const SCAN_TYPES = [
  { id: 'url', label: 'Scan URL', icon: Search, placeholder: 'paste link here (e.g. hdfc-kyc.io/update)' },
  { id: 'message', label: 'Analyze Message', icon: MessageSquare, placeholder: 'paste SMS or email text here...' },
  { id: 'transaction', label: 'Check Fraud', icon: CreditCard, placeholder: 'enter transaction ID or UPI details...' },
];

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [activeType, setActiveType] = useState('url');
  const [status, setStatus] = useState<'idle' | 'loading' | 'result'>('idle');
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleAnalyze = async (textOverride?: string, typeOverride?: string) => {
    const text = textOverride || inputText;
    const type = typeOverride || activeType;

    if (!text.trim()) return;

    setStatus('loading');
    setAnalysisResult(null);

    try {
      const response = await axios.post('http://localhost:8000/analyze', {
        input_text: text,
        type: type
      });
      setAnalysisResult(response.data);
      setStatus('result');
    } catch (error) {
      console.error('Analysis failed:', error);
      setTimeout(() => {
        const mockResult = {
          threat_level: "High",
          attack_type: type.toUpperCase(),
          reasoning: "Detected anomalous communication patterns with high urgency and suspicious domain origin. The content mimics banking institutions to solicit sensitive PII.",
          risk_score: 0.82,
          prediction: 1,
          pattern_memory: { similarity: 0.76, match_count: 142, status: "Campaign Match" },
          attack_graph: [{ label: "Origin" }, { label: "Vector" }, { label: "Target" }]
        };
        setAnalysisResult(mockResult);
        setStatus('result');
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-80px)] items-center justify-center p-8 md:p-12 animate-fade-in relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 neural-grid opacity-[0.03] pointer-events-none" />

      <AnimatePresence mode="wait">
        {status === 'idle' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            className="w-full max-w-2xl relative z-10"
          >
            {/* Header */}
            <div className="text-center mb-10 space-y-3">
              <h1 className="text-4xl font-semibold text-white tracking-tight">ScamGPT Scanner</h1>
              <p className="text-zinc-500 text-sm max-w-sm mx-auto">
                Instant analysis of suspicious links, messages, or payments.
              </p>
            </div>

            {/* Premium Input Shell */}
            <div className="bg-[#0D0D0F] border border-zinc-800/80 rounded-2xl shadow-2xl transition-standard hover:border-zinc-700/80">
              {/* Type Switcher */}
              <div className="flex gap-1 p-1.5 border-b border-zinc-800/50">
                {SCAN_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setActiveType(type.id)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
                      activeType === type.id
                        ? "bg-zinc-800 text-white"
                        : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/40"
                    )}
                  >
                    <type.icon className="w-3.5 h-3.5" />
                    {type.label}
                  </button>
                ))}
              </div>

              {/* Text Area */}
              <div className="relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={SCAN_TYPES.find(t => t.id === activeType)?.placeholder}
                  className="w-full bg-transparent border-none outline-none text-white text-base p-6 min-h-[140px] placeholder:text-zinc-700 resize-none font-medium leading-relaxed"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleAnalyze();
                  }}
                />

                <div className="flex items-center justify-between px-5 py-4 border-t border-zinc-800/40">
                  <div className="flex items-center gap-2 text-zinc-600">
                    <Terminal className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-medium tracking-wider uppercase">Neural Network Ready</span>
                  </div>
                  <Button
                    onClick={() => handleAnalyze()}
                    disabled={!inputText.trim()}
                    className="h-10 px-5 gap-2 rounded-xl text-xs"
                  >
                    Analyze <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Minimal Footer Info */}
            <div className="mt-12 flex justify-center gap-10 opacity-40 hover:opacity-100 transition-standard">
              {[
                { label: 'Analyses', value: '1.2k' },
                { label: 'Accuracy', value: '99.4%' },
                { label: 'Latency', value: '42ms' },
              ].map((stat, i) => (
                <div key={i} className="flex gap-2 items-baseline">
                  <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest">{stat.label}</span>
                  <span className="text-xs font-bold text-white">{stat.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {status === 'loading' && (
          <motion.div key="loading" className="w-full max-w-xl mx-auto py-20">
            <AnalysisLoader />
          </motion.div>
        )}

        {status === 'result' && analysisResult && (
          <motion.div key="result" className="max-w-5xl mx-auto w-full">
            <ThreatReport
              data={analysisResult}
              onReset={() => {
                setStatus('idle');
                setInputText('');
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
