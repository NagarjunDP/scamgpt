'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Search, Plus, Shield, MessageCircle, ArrowRight, Activity, Globe, MapPin, Clock } from 'lucide-react';

interface Community {
    id: string;
    name: string;
    description: string;
    members: number;
    threatsToday: number;
    joined: boolean;
    location?: string;
}

interface CommunityReport {
    id: string;
    communityId: string;
    userName: string;
    type: string;
    content: string;
    timestamp: string;
    replies: Reply[];
}

interface Reply {
    id: string;
    userName: string;
    content: string;
    timestamp: string;
    tagId?: string; // ID of the message being tagged/replied to
}

const mockCommunities: Community[] = [
    { id: '1', name: 'REVA University Sentinel', description: 'Student-led network monitoring phishing and fake internship offers at REVA.', members: 850, threatsToday: 3, joined: true, location: 'Yelahanka, Bangalore' },
    { id: '2', name: 'Kannada Taayi Makhalu', description: 'Regional group protecting the local community from vernacular banking scams.', members: 2100, threatsToday: 18, joined: false, location: 'Karnataka, India' },
    { id: '3', name: 'Yelahanka Colleges Vanguards', description: 'Safety hub for students across colleges in the Yelahanka educational belt.', members: 3200, threatsToday: 7, joined: false, location: 'North Bangalore' },
    { id: '4', name: 'Crypto Watchdog', description: 'Collective intelligence for crypto draining and exchange fraud.', members: 3500, threatsToday: 45, joined: true },
    { id: '5', name: 'Global Finance Vigil', description: 'International bank fraud and credit card theft alerts.', members: 15200, threatsToday: 128, joined: false }
];

const mockReports: CommunityReport[] = [
    {
        id: 'r1',
        communityId: '1',
        userName: 'Student_Vigilante',
        type: 'Phishing',
        content: 'Received a fake email about a mandatory REVA internship fee. The link leads to a malicious domain: reva-edu-fees.top. Do not click!',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        replies: [
            { id: 'rep1', userName: 'Admin_REVA', content: 'Verified. We are blocking this domain on the university network.', timestamp: new Date(Date.now() - 1800000).toISOString() }
        ]
    },
    {
        id: 'r2',
        communityId: '1',
        userName: 'Junior_Analyst',
        type: 'Fake Offer',
        content: 'Someone is circulating a WhatsApp message about "REVA Quick Jobs". It asks for a security deposit of ₹500. It is a scam.',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        replies: []
    }
];

export default function CommunityPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [communities, setCommunities] = useState<Community[]>(mockCommunities);
    const [selectedCommunityId, setSelectedCommunityId] = useState<string | null>(null);
    const [allReports, setAllReports] = useState<CommunityReport[]>(mockReports);
    const [replyText, setReplyText] = useState('');
    const [replyingTo, setReplyingTo] = useState<string | null>(null);

    const toggleJoin = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setCommunities(prev => prev.map(c => c.id === id ? { ...c, joined: !c.joined, members: c.joined ? c.members - 1 : c.members + 1 } : c));
    };

    const handleSendReply = (reportId: string) => {
        if (!replyText.trim()) return;

        const newReply: Reply = {
            id: Math.random().toString(36).substr(2, 9),
            userName: 'You',
            content: replyText,
            timestamp: new Date().toISOString(),
            tagId: reportId
        };

        setAllReports(prev => prev.map(report => 
            report.id === reportId 
            ? { ...report, replies: [...report.replies, newReply] } 
            : report
        ));
        setReplyText('');
        setReplyingTo(null);
    };

    const selectedCommunity = communities.find(c => c.id === selectedCommunityId);
    const communityReports = allReports.filter(r => r.communityId === selectedCommunityId);

    const filtered = communities.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.description.toLowerCase().includes(searchQuery.toLowerCase()));

    if (selectedCommunityId && selectedCommunity) {
        return (
            <div className="min-h-full p-8 selection:bg-[#ff0033]/30 selection:text-white">
                <div className="max-w-4xl mx-auto">
                    <button 
                        onClick={() => setSelectedCommunityId(null)}
                        className="flex items-center gap-2 text-zinc-500 hover:text-white mb-8 transition-colors group"
                    >
                        <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                        Back to Communities
                    </button>

                    <div className="bg-[#111111]/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 mb-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff0033]/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                        <div className="flex items-start justify-between relative z-10">
                            <div>
                                <h1 className="text-3xl font-bold text-white mb-2">{selectedCommunity.name}</h1>
                                <p className="text-zinc-400 max-w-2xl mb-6">{selectedCommunity.description}</p>
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <Users className="w-4 h-4 text-[#ff0033]" />
                                        <span className="text-sm font-bold text-zinc-300">{selectedCommunity.members.toLocaleString()} Members</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Activity className="w-4 h-4 text-[#ff0033]" />
                                        <span className="text-sm font-bold text-zinc-300">{selectedCommunity.threatsToday} New Threats</span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                                <Shield className="w-8 h-8 text-[#ff0033]" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-2 px-2">
                            <MessageCircle className="w-5 h-5 text-[#ff0033]" />
                            <h3 className="text-lg font-bold text-white uppercase tracking-widest text-xs">Community Intel Inbox</h3>
                        </div>

                        {communityReports.length === 0 ? (
                            <div className="text-center py-20 bg-black/20 border border-dashed border-zinc-800 rounded-2xl">
                                <p className="text-zinc-500 text-sm">No recent reports in this community. Be the first to alert others!</p>
                            </div>
                        ) : (
                            communityReports.map(report => (
                                <motion.div 
                                    key={report.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-[#111111]/60 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl"
                                >
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xs font-bold text-[#ff0033]">
                                                    {report.userName[0]}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-white mb-0.5">{report.userName}</p>
                                                    <p className="text-[10px] text-zinc-500 font-mono italic">@{report.id}</p>
                                                </div>
                                            </div>
                                            <span className="px-2 py-0.5 bg-[#ff0033]/10 border border-[#ff0033]/20 text-[#ff0033] text-[10px] font-bold rounded uppercase">
                                                {report.type}
                                            </span>
                                        </div>
                                        
                                        <p className="text-zinc-300 text-sm leading-relaxed mb-4 p-4 bg-black/40 rounded-xl border border-zinc-800/50">
                                            {report.content}
                                        </p>

                                        <div className="flex items-center justify-between text-[10px] text-zinc-500 mb-6 px-2">
                                            <div className="flex items-center gap-4">
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {new Date(report.timestamp).toLocaleString()}
                                                </span>
                                            </div>
                                            <button 
                                                onClick={() => setReplyingTo(replyingTo === report.id ? null : report.id)}
                                                className="text-[#ff0033] hover:underline font-bold uppercase tracking-wider"
                                            >
                                                Reply to Thread
                                            </button>
                                        </div>

                                        {/* Replies Section */}
                                        {report.replies.length > 0 && (
                                            <div className="mt-4 space-y-3 pl-4 border-l-2 border-zinc-800">
                                                {report.replies.map(reply => (
                                                    <div key={reply.id} className="p-3 bg-zinc-900/30 rounded-lg border border-zinc-800/30">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <span className="text-xs font-bold text-[#ff0033]">{reply.userName}</span>
                                                            <span className="text-[9px] text-zinc-600 font-mono italic">#{reply.id}</span>
                                                        </div>
                                                        <p className="text-xs text-zinc-400">{reply.content}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Reply Input */}
                                        <AnimatePresence>
                                            {replyingTo === report.id && (
                                                <motion.div 
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="mt-6 pt-6 border-t border-zinc-800 overflow-hidden"
                                                >
                                                    <div className="relative">
                                                        <textarea 
                                                            value={replyText}
                                                            onChange={(e) => setReplyText(e.target.value)}
                                                            placeholder={`Reply to ${report.userName}...`}
                                                            className="w-full bg-black/50 border border-zinc-700/50 rounded-xl p-4 text-sm text-white resize-none h-24 focus:border-[#ff0033]/50 outline-none transition-colors"
                                                        />
                                                        <button 
                                                            onClick={() => handleSendReply(report.id)}
                                                            className="absolute bottom-4 right-4 bg-[#ff0033] text-white p-2 rounded-lg hover:shadow-[0_0_15px_rgba(255,0,51,0.4)] transition-all"
                                                        >
                                                            <Plus className="w-4 h-4 rotate-45" />
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-full p-8 selection:bg-[#ff0033]/30 selection:text-white">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <Users className="w-8 h-8 text-[#ff0033]" />
                            <h1 className="text-3xl font-bold text-white tracking-tight">Community Hub</h1>
                        </div>
                        <p className="text-zinc-500 text-sm">Join collective defense groups to stay ahead of localized threats.</p>
                    </div>

                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input 
                            type="text"
                            placeholder="Search communities..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl py-2.5 pl-11 pr-4 text-sm text-white focus:border-[#ff0033]/50 outline-none transition-standard"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {filtered.map(community => (
                            <motion.div 
                                key={community.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                onClick={() => community.joined && setSelectedCommunityId(community.id)}
                                className={cn(
                                    "group bg-[#111111]/80 backdrop-blur-md border border-zinc-800 rounded-2xl overflow-hidden hover:border-[#ff0033]/30 transition-standard h-fit",
                                    community.joined ? "cursor-pointer" : "cursor-default"
                                )}
                            >
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:bg-[#ff0033]/10 group-hover:border-[#ff0033]/20 transition-standard">
                                            <Shield className="w-6 h-6 text-zinc-500 group-hover:text-[#ff0033]" />
                                        </div>
                                        <button 
                                            onClick={(e) => toggleJoin(e, community.id)}
                                            className={cn(
                                                "px-4 py-1.5 rounded-lg text-xs font-bold transition-standard uppercase tracking-wider",
                                                community.joined 
                                                ? "bg-zinc-800 text-zinc-400 border border-zinc-700 hover:bg-zinc-700 hover:text-white"
                                                : "bg-[#ff0033] text-white shadow-[0_0_15px_rgba(255,0,51,0.3)] hover:shadow-[0_0_25px_rgba(255,0,51,0.5)]"
                                            )}
                                        >
                                            {community.joined ? 'Joined' : 'Join'}
                                        </button>
                                    </div>
                                    
                                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#ff0033] transition-colors">{community.name}</h3>
                                    <p className="text-zinc-500 text-sm leading-relaxed mb-6 h-10 line-clamp-2">{community.description}</p>
                                    
                                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-zinc-900">
                                        <div>
                                            <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mb-1">Members</p>
                                            <p className="text-white font-bold">{community.members.toLocaleString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-[#ff0033] uppercase font-bold tracking-widest mb-1">Alerts Today</p>
                                            <p className="text-white font-bold">{community.threatsToday}</p>
                                        </div>
                                    </div>
                                </div>

                                {community.joined && (
                                    <div className="bg-[#ff0033]/5 px-6 py-3 flex items-center justify-between group-hover:bg-[#ff0033]/10 transition-colors cursor-pointer border-t border-[#ff0033]/10">
                                        <span className="text-[10px] text-[#ff0033] font-bold uppercase tracking-widest">Active Community Feed</span>
                                        <ArrowRight className="w-3 h-3 text-[#ff0033]" />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-zinc-500 text-sm">No communities matching "{searchQuery}" found.</p>
                        <button className="mt-4 text-[#ff0033] text-xs font-bold uppercase tracking-widest hover:underline flex items-center gap-2 mx-auto">
                            <Plus className="w-4 h-4" />
                            Suggest a new community
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

// Helper for conditional classes
function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
