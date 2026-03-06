'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="py-20 px-6 border-t border-border/50 bg-zinc-950/50 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
                <div className="max-w-xs space-y-6">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20">
                            <Shield className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-lg font-bold text-white tracking-tighter">
                            Scam<span className="text-primary italic">GPT</span>
                        </span>
                    </Link>
                    <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                        Next-generation cognitive AI defense platform protecting users from the evolving landscape of digital scams and social engineering.
                    </p>
                    <div className="flex gap-4">
                        <Link href="#" className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 transition-standard">
                            <Github className="w-4 h-4 text-zinc-400" />
                        </Link>
                        <Link href="#" className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 transition-standard">
                            <Twitter className="w-4 h-4 text-zinc-400" />
                        </Link>
                        <Link href="#" className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 transition-standard">
                            <Linkedin className="w-4 h-4 text-zinc-400" />
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 md:gap-24">
                    <div className="space-y-4">
                        <h5 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Platform</h5>
                        <ul className="space-y-3">
                            <li><Link href="/analyzer" className="text-zinc-500 hover:text-white text-xs font-semibold transition-standard">Threat Analyzer</Link></li>
                            <li><Link href="/dashboard" className="text-zinc-500 hover:text-white text-xs font-semibold transition-standard">Global Monitoring</Link></li>
                            <li><Link href="/api" className="text-zinc-500 hover:text-white text-xs font-semibold transition-standard">API Interface</Link></li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h5 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Resources</h5>
                        <ul className="space-y-3">
                            <li><Link href="/security" className="text-zinc-500 hover:text-white text-xs font-semibold transition-standard">Security Audit</Link></li>
                            <li><Link href="/docs" className="text-zinc-500 hover:text-white text-xs font-semibold transition-standard">AI Whitepapers</Link></li>
                            <li><Link href="/blog" className="text-zinc-500 hover:text-white text-xs font-semibold transition-standard">Scam Trends</Link></li>
                        </ul>
                    </div>
                    <div className="hidden sm:block space-y-4">
                        <h5 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Company</h5>
                        <ul className="space-y-3">
                            <li><Link href="/about" className="text-zinc-500 hover:text-white text-xs font-semibold transition-standard">Our Mission</Link></li>
                            <li><Link href="/careers" className="text-zinc-500 hover:text-white text-xs font-semibold transition-standard">Join the Lab</Link></li>
                            <li><Link href="/legal" className="text-zinc-500 hover:text-white text-xs font-semibold transition-standard">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-border/30 flex flex-col sm:row justify-between gap-6">
                <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-[0.2em]">© 2026 ScamGPT Research Labs. All rights reserved.</span>
                <div className="flex gap-6">
                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Zero-Trust Verified</span>
                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">SOC-2 Compliant</span>
                </div>
            </div>
        </footer>
    );
}
