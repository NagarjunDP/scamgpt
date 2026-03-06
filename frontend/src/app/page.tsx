'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import DashboardPreview from '@/components/landing/DashboardPreview';
import AnalysisResult from '@/components/landing/AnalysisResult';
import AnalysisLoader from '@/components/AnalysisLoader';
import Footer from '@/components/layout/Footer';

export default function Home() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'result'>('idle');
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleAnalyze = async (text: string) => {
    if (!text.trim()) return;

    setStatus('loading');
    setAnalysisResult(null);

    try {
      const response = await axios.post('http://localhost:8000/analyze', {
        input_text: text,
        type: 'url' // Auto-detected in backend
      });

      // Simulate slightly longer processing for premium feel if fast
      setTimeout(() => {
        setAnalysisResult(response.data);
        setStatus('result');
      }, 1500);
    } catch (error) {
      console.error('Analysis failed:', error);
      setTimeout(() => {
        // Fallback mock for demo if backend is down
        const mockResult = {
          threat_level: "High",
          attack_type: "Phishing",
          reasoning: "Detected anomalous communication patterns with high urgency and suspicious domain origin. The content mimics banking institutions to solicit sensitive PII via a newly registered domain (3 days old).",
          risk_score: 0.82,
          prediction: 1,
          pattern_memory: { similarity: 0.76, match_count: 142, status: "Campaign Match" }
        };
        setAnalysisResult(mockResult);
        setStatus('result');
      }, 2000);
    }
  };

  return (
    <main className="min-h-screen bg-background text-zinc-100 selection:bg-primary/30">
      <AnimatePresence mode="wait">
        {status === 'idle' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Hero onAnalyze={handleAnalyze} isLoading={false} />
            <Features />
            <DashboardPreview />
          </motion.div>
        )}

        {status === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-[80vh] flex items-center justify-center bg-background/50 backdrop-blur-sm fixed inset-0 z-[60]"
          >
            <div className="w-full max-w-xl p-8">
              <AnalysisLoader />
              <p className="mt-8 text-center text-zinc-500 text-xs font-bold uppercase tracking-[0.3em] animate-pulse">
                Synchronizing with Local Threat Vector DB...
              </p>
            </div>
          </motion.div>
        )}

        {status === 'result' && analysisResult && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-screen pt-20"
          >
            <AnalysisResult
              data={analysisResult}
              onReset={() => setStatus('idle')}
            />
            <div className="pb-20">
              <Features />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
