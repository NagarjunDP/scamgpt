'use client';

<<<<<<< HEAD
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Send,
    ShieldAlert,
    FileText,
    Link as LinkIcon,
    AtSign,
    CheckCircle2,
    ArrowRight
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function ReportScam() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        setTimeout(() => setStatus('success'), 1500);
=======
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Upload, Send, MapPin, AlertTriangle, FileText, ChevronDown, CheckCircle, Clock, Globe, Award, Shield } from 'lucide-react';
import { useNotifications } from '@/lib/NotificationContext';

interface Threat {
    id: number;
    type: string;
    target: string;
    description: string;
    location: string;
    timestamp: string;
    risk_score: number | null;
}

interface UserReport {
    id: string;
    type: string;
    target: string;
    location: string;
    timestamp: string;
}

export default function ReportScam() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [scamType, setScamType] = useState('Phishing Link');
    const [suspiciousData, setSuspiciousData] = useState('');
    const [scamLocation, setScamLocation] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [errorMsg, setErrorMsg] = useState('');
    const [recentThreats, setRecentThreats] = useState<Threat[]>([]);
    const [expandedThreatId, setExpandedThreatId] = useState<number | null>(null);
    const { addNotification } = useNotifications();
    
    // We still update local history for the history page to consume
    const updateLocalHistory = (newReport: UserReport) => {
        const saved = localStorage.getItem('scamgpt_user_history');
        let history: UserReport[] = [];
        if (saved) {
            try {
                history = JSON.parse(saved);
            } catch(e) {}
        }
        const updatedHistory = [newReport, ...history];
        localStorage.setItem('scamgpt_user_history', JSON.stringify(updatedHistory));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const missingFields: string[] = [];
        if (!suspiciousData.trim()) missingFields.push("Suspicious Data");
        if (!scamLocation.trim()) missingFields.push("Location");
        if (!description.trim()) missingFields.push("Description");
        if (!file) missingFields.push("Screenshot");

        if (missingFields.length > 0) {
            setErrorMsg(`Please fill in required fields: ${missingFields.join(', ')}`);
            // Automatically clear the popup after 4 seconds
            setTimeout(() => setErrorMsg(''), 4000);
            return;
        }

        setStatus('submitting');
        
        try {
            const payload = {
                type: scamType,
                target: suspiciousData,
                description: description,
                location: scamLocation,
                risk_score: 0.9
            };

            const response = await fetch('http://localhost:8000/report', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error('Failed to submit report');

            // Fetch recent threats to display
            try {
                const dashRes = await fetch('http://localhost:8000/dashboard');
                if (dashRes.ok) {
                    const data = await dashRes.json();
                    
                    // Filter out the exact one we just submitted if possible, 
                    // or just take the top 3 most recent ones
                    setRecentThreats(data.recent_threats.slice(0, 3));
                }
            } catch (e) {
                console.error("Could not fetch recent threats", e);
            }

            // Trigger global notification
            addNotification({
                title: 'Report Under Review',
                message: `Your ${scamType} report is being analyzed by ScamGPT. If verified, action will be taken.`,
                type: 'success'
            });

            // Save to local history for the history page
            const newReport: UserReport = {
                id: Math.random().toString(36).substr(2, 9),
                type: scamType,
                target: suspiciousData,
                location: scamLocation,
                timestamp: new Date().toISOString()
            };
            updateLocalHistory(newReport);

            setStatus('success');
        } catch (error) {
            console.error(error);
            setErrorMsg('Failed to connect to the Scam Intelligence Network.');
            setStatus('error');
        }
>>>>>>> origin/min
    };

    if (status === 'success') {
        return (
<<<<<<< HEAD
            <div className="p-8 md:p-20 flex items-center justify-center animate-fade-in text-center h-[calc(100vh-140px)]">
                <div className="max-w-md">
                    <div className="w-16 h-16 bg-emerald-500/5 border border-emerald-500/10 rounded-xl flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h2 className="text-2xl font-semibold text-white mb-3">Submission Complete</h2>
                    <p className="text-zinc-500 mb-10 text-sm leading-relaxed">
                        Incident data has been successfully transmitted. Signature distribution is active across the edge network.
                    </p>
                    <Button onClick={() => setStatus('idle')} variant="secondary" className="w-full h-11">
                        Report New Incident
                    </Button>
                </div>
=======
            <div className="min-h-screen bg-black pt-24 pb-12 px-4 selection:bg-[#ff0033]/30 selection:text-white flex flex-col items-center">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full bg-[#111111]/80 backdrop-blur-md border border-[#ff0033]/30 rounded-2xl p-8 text-center shadow-[0_0_30px_rgba(255,0,51,0.15)] mb-8"
                >
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                        className="w-20 h-20 bg-[#ff0033]/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(255,0,51,0.3)]"
                    >
                        <CheckCircle className="w-10 h-10 text-[#ff0033]" />
                    </motion.div>
                    <h2 className="text-2xl font-bold text-white mb-4 tracking-wide">Report submitted successfully.</h2>
                    <p className="text-zinc-400 mb-2 leading-relaxed text-sm">
                        Your report has been added to the ScamGPT Scam Intelligence Network.
                    </p>
                    <p className="text-zinc-500 mb-8 leading-relaxed text-sm">
                        This information will help protect other users.
                    </p>
                    <button 
                        onClick={() => {
                            setStatus('idle');
                            setSuspiciousData('');
                            setDescription('');
                            setScamLocation('');
                            setFile(null);
                        }} 
                        className="w-full h-12 bg-transparent border border-[#ff0033]/50 text-[#ff0033] rounded-lg font-medium hover:bg-[#ff0033]/10 transition-all duration-300 shadow-[0_0_10px_rgba(255,0,51,0.2)] hover:shadow-[0_0_20px_rgba(255,0,51,0.4)]"
                    >
                        Report Another Scam
                    </button>
                </motion.div>

                {recentThreats.length > 0 && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="max-w-2xl w-full"
                    >
                        <div className="flex items-center gap-2 mb-4 px-2">
                            <Globe className="w-5 h-5 text-[#ff0033]" />
                            <h3 className="text-lg font-semibold text-white">Live Global Intel</h3>
                            <span className="text-xs text-zinc-500 ml-auto">Matching recent reports</span>
                        </div>
                        
                        <div className="space-y-3">
                            {recentThreats.map((threat, idx) => (
                                <motion.div 
                                    key={threat.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 + (idx * 0.1) }}
                                    onClick={() => setExpandedThreatId(expandedThreatId === threat.id ? null : threat.id)}
                                    className="bg-[#111111]/60 border border-zinc-800/80 rounded-xl p-4 hover:border-[#ff0033]/50 hover:bg-[#ff0033]/5 transition-all cursor-pointer relative overflow-hidden group"
                                >
                                    {/* Hover glow line */}
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ff0033] shadow-[0_0_10px_#ff0033] opacity-0 group-hover:opacity-100 transition-opacity" />
                                    
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="px-2 py-0.5 bg-[#ff0033]/10 text-[#ff0033] text-xs font-bold rounded-md border border-[#ff0033]/20 uppercase">
                                                {threat.type}
                                            </span>
                                            {threat.target && (
                                                <span className="text-zinc-500 text-xs truncate max-w-[150px] md:max-w-[200px]" title={threat.target}>
                                                    Target: {threat.target}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
                                            <Clock className="w-3.5 h-3.5" />
                                            {new Date(threat.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-4 text-xs font-medium text-zinc-500 mb-2">
                                        <div className="flex items-center gap-1.5">
                                            <MapPin className="w-3.5 h-3.5" />
                                            {threat.location}
                                        </div>
                                        {threat.risk_score && (
                                            <div className="flex items-center gap-1.5">
                                                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                                                Risk: {Math.round(threat.risk_score * 100)}%
                                            </div>
                                        )}
                                    </div>

                                    {/* Expandable Cognitive Summary */}
                                    <AnimatePresence>
                                        {expandedThreatId === threat.id ? (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                                animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                                                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pt-3 border-t border-zinc-800/60">
                                                    <span className="text-[10px] text-[#ff0033] uppercase font-bold tracking-wider mb-1 block">Cognitive Summary / Report Details</span>
                                                    <p className="text-sm text-zinc-300 leading-relaxed bg-black/40 p-3 rounded-lg border border-zinc-800">
                                                        {threat.description || "No detailed description provided by the reporter."}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <p className="text-sm text-zinc-400 truncate w-full mt-2">
                                                {threat.description || "Suspicious target reported."}
                                            </p>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
>>>>>>> origin/min
            </div>
        );
    }

    return (
<<<<<<< HEAD
        <div className="p-8 md:p-12 animate-fade-in max-w-4xl mx-auto py-16">
            <div className="mb-12">
                <Badge variant="neutral" className="mb-4 bg-zinc-800/50">Community Intel</Badge>
                <h1 className="text-3xl font-semibold text-white tracking-tight">Report Incident</h1>
                <p className="text-zinc-500 text-sm mt-2 max-w-xl font-medium">Contribute to the global immune system by submitting verified threat vectors.</p>
            </div>

            <Card className="border-zinc-800/60 bg-zinc-900/10 shadow-none">
                <CardContent className="p-10">
                    <form onSubmit={handleSubmit} className="space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2.5">
                                <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest pl-1">Vector URL</label>
                                <div className="relative">
                                    <LinkIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                                    <input
                                        type="url"
                                        placeholder="https://..."
                                        className="w-full bg-black/20 border border-zinc-800 rounded-lg h-11 pl-11 pr-4 text-sm text-white focus:border-zinc-600 focus:bg-black/40 outline-none transition-standard placeholder:text-zinc-700"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2.5">
                                <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest pl-1">Target Identity</label>
                                <div className="relative">
                                    <AtSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                                    <input
                                        type="text"
                                        placeholder="Identifier"
                                        className="w-full bg-black/20 border border-zinc-800 rounded-lg h-11 pl-11 pr-4 text-sm text-white focus:border-zinc-600 focus:bg-black/40 outline-none transition-standard placeholder:text-zinc-700"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2.5">
                            <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest pl-1">Signature Content</label>
                            <div className="relative">
                                <FileText className="absolute left-3.5 top-4 w-4 h-4 text-zinc-600" />
                                <textarea
                                    placeholder="Paste communication payload or transaction details..."
                                    className="w-full bg-black/20 border border-zinc-800 rounded-lg py-4 pl-11 pr-4 text-sm text-white focus:border-zinc-600 focus:bg-black/40 outline-none transition-standard min-h-[160px] resize-none placeholder:text-zinc-700"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-8 border-t border-zinc-800/50">
                            <p className="text-[10px] text-zinc-600 font-medium max-w-[200px]">Submissions are processed through cognitive validation nodes.</p>
                            <Button type="submit" className="gap-2 px-8 h-11 min-w-[180px]" disabled={status === 'submitting'}>
                                {status === 'submitting' ? 'Processing...' : 'Submit Intel'} <Send className="w-3.5 h-3.5" />
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
=======
        <div className="min-h-screen bg-black pt-24 pb-12 px-4 selection:bg-[#ff0033]/30 selection:text-white">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-3 mb-4"
                    >
                        <ShieldAlert className="w-8 h-8 text-[#ff0033] drop-shadow-[0_0_8px_rgba(255,0,51,0.8)]" />
                        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                            Report a Scam
                        </h1>
                    </motion.div>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-zinc-400 text-lg max-w-xl mx-auto"
                    >
                        "Help protect others by reporting suspicious activity."
                    </motion.p>
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative group block"
                >
                    {/* Ambient glow behind panel */}
                    <div className="absolute -inset-0.5 bg-gradient-to-b from-[#ff0033]/20 to-transparent rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
                    
                    <div className="relative bg-[#111111]/85 backdrop-blur-xl border border-zinc-800 hover:border-[#ff0033]/50 transition-colors duration-500 rounded-2xl p-6 md:p-10 shadow-[0_0_40px_rgba(0,0,0,0.8)] z-10">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            
                            {/* Scam Type */}
                            <div className="space-y-3">
                                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                                    <AlertTriangle className="w-3.5 h-3.5 text-[#ff0033]" />
                                    Scam Type
                                </label>
                                <div className="relative">
                                    <select
                                        value={scamType}
                                        onChange={(e) => setScamType(e.target.value)}
                                        className="w-full appearance-none bg-black/50 border border-zinc-700/50 hover:border-[#ff0033]/40 focus:border-[#ff0033] rounded-xl h-14 pl-4 pr-12 text-sm text-white outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(255,0,51,0.2)]"
                                    >
                                        <option value="Phishing Link">Phishing Link</option>
                                        <option value="Fake Message">Fake Message</option>
                                        <option value="QR Fraud">QR Fraud</option>
                                        <option value="UPI Payment Scam">UPI Payment Scam</option>
                                        <option value="Fake Job Offer">Fake Job Offer</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 pointer-events-none" />
                                </div>
                            </div>

                            {/* Suspicious Data */}
                            <div className="space-y-3">
                                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                                    <FileText className="w-3.5 h-3.5 text-[#ff0033]" />
                                    Suspicious Data
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={suspiciousData}
                                    onChange={(e) => setSuspiciousData(e.target.value)}
                                    placeholder="Paste suspicious link, message, or phone number."
                                    className="w-full bg-black/50 border border-zinc-700/50 hover:border-[#ff0033]/40 focus:border-[#ff0033] rounded-xl h-14 px-4 text-sm text-white placeholder:text-zinc-600 outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(255,0,51,0.2)]"
                                />
                            </div>

                            {/* Location */}
                            <div className="space-y-3">
                                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                                    <MapPin className="w-3.5 h-3.5 text-[#ff0033]" />
                                    Location
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={scamLocation}
                                    onChange={(e) => setScamLocation(e.target.value)}
                                    placeholder="City where scam occurred."
                                    className="w-full bg-black/50 border border-zinc-700/50 hover:border-[#ff0033]/40 focus:border-[#ff0033] rounded-xl h-14 px-4 text-sm text-white placeholder:text-zinc-600 outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(255,0,51,0.2)]"
                                />
                            </div>

                            {/* Description */}
                            <div className="space-y-3">
                                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                                    <FileText className="w-3.5 h-3.5 text-[#ff0033]" />
                                    Description
                                </label>
                                <textarea
                                    required
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Describe what happened."
                                    className="w-full bg-black/50 border border-zinc-700/50 hover:border-[#ff0033]/40 focus:border-[#ff0033] rounded-xl py-4 px-4 text-sm text-white placeholder:text-zinc-600 outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(255,0,51,0.2)] min-h-[120px] resize-none"
                                />
                            </div>

                            {/* Evidence Upload */}
                            <div className="space-y-3">
                                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                                    <Upload className="w-3.5 h-3.5 text-[#ff0033]" />
                                    Upload Screenshot (Required)
                                </label>
                                <div className="relative group/upload cursor-pointer">
                                    <input 
                                        type="file" 
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files.length > 0) {
                                                setFile(e.target.files[0]);
                                                setErrorMsg('');
                                            } else {
                                                setFile(null);
                                            }
                                        }}
                                        accept="image/*"
                                    />
                                    <div className={`w-full border-2 border-dashed ${file ? 'border-[#ff0033] bg-[#ff0033]/5' : 'border-zinc-700/50 bg-black/30 group-hover/upload:border-[#ff0033]/40 group-hover/upload:bg-[#ff0033]/5'} rounded-xl h-24 flex flex-col items-center justify-center transition-all duration-300`}>
                                        <Upload className={`w-6 h-6 mb-2 ${file ? 'text-[#ff0033]' : 'text-zinc-500 group-hover/upload:text-[#ff0033]/70'}`} />
                                        <span className={`text-sm ${file ? 'text-[#ff0033] font-medium' : 'text-zinc-500'}`}>
                                            {file ? file.name : "Drag & drop or click to upload"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {errorMsg && (
                                <div className="text-[#ff0033] text-sm text-center bg-[#ff0033]/10 py-3 rounded-lg border border-[#ff0033]/20">
                                    {errorMsg}
                                </div>
                            )}

                            {/* Submit Button */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={status === 'submitting'}
                                className="w-full h-14 bg-[#ff0033] text-white font-bold text-lg rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_0_15px_rgba(255,0,51,0.4)] hover:shadow-[0_0_30px_rgba(255,0,51,0.7)] hover:bg-[#ff0033]/90 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider relative overflow-hidden"
                            >
                                {status === 'submitting' ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        Submit Scam Report
                                        <Send className="w-5 h-5" />
                                    </>
                                )}
                            </motion.button>

                        </form>
                    </div>
                </motion.div>
            </div>
>>>>>>> origin/min
        </div>
    );
}
