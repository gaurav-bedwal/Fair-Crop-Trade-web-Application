import React from "react";
import PublicNavbar from "../components/PublicNavbar";
import PublicFooter from "../components/PublicFooter";

export default function Community() {
    const topics = [
        { title: "Sustainable Irrigation Techniques", posts: 342, lastActive: "2h ago", author: "GreenThumb22" },
        { title: "Organic Certification Process - Help Needed", posts: 128, lastActive: "5m ago", author: "FarmFresh" },
        { title: "Best crop rotation for corn?", posts: 89, lastActive: "1d ago", author: "MidwestGrower" },
        { title: "Logistics partners for perishables in SEA", posts: 56, lastActive: "4h ago", author: "GlobalTrader" },
        { title: "Equipment sharing in local communities", posts: 210, lastActive: "30m ago", author: "CoOpLeader" },
    ];

    return (
        <div className="min-h-screen bg-[#111a13] text-white font-['Inter'] selection:bg-green-500 selection:text-white">
            <PublicNavbar />

            <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Community Forum</h1>
                        <p className="text-gray-400 max-w-xl">
                            Connect with thousands of farmers, buyers, and experts. Share knowledge, ask questions, and grow together.
                        </p>
                    </div>
                    <button className="bg-green-500 text-[#111a13] px-6 py-3 rounded-full font-bold hover:bg-green-400 transition shadow-lg whitespace-nowrap">
                        Start New Discussion
                    </button>
                </div>

                <div className="grid md:grid-cols-4 gap-8">
                    {/* Sidebar Categories */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="bg-[#1f2f22] p-6 rounded-2xl border border-white/5">
                            <h3 className="font-bold mb-4 text-green-400">Categories</h3>
                            <ul className="space-y-3 text-gray-300">
                                <li className="flex justify-between items-center cursor-pointer hover:text-white transition"><span className="font-medium">General Discussion</span> <span className="bg-white/10 px-2 py-0.5 rounded text-xs text-gray-400">1.2k</span></li>
                                <li className="flex justify-between items-center cursor-pointer hover:text-white transition"><span>Farming Tips</span> <span className="bg-white/10 px-2 py-0.5 rounded text-xs text-gray-400">854</span></li>
                                <li className="flex justify-between items-center cursor-pointer hover:text-white transition"><span>Market Trends</span> <span className="bg-white/10 px-2 py-0.5 rounded text-xs text-gray-400">320</span></li>
                                <li className="flex justify-between items-center cursor-pointer hover:text-white transition"><span>Equipment</span> <span className="bg-white/10 px-2 py-0.5 rounded text-xs text-gray-400">450</span></li>
                                <li className="flex justify-between items-center cursor-pointer hover:text-white transition"><span>Policy & Regulations</span> <span className="bg-white/10 px-2 py-0.5 rounded text-xs text-gray-400">120</span></li>
                            </ul>
                        </div>

                        <div className="bg-[#1f2f22] p-6 rounded-2xl border border-white/5">
                            <h3 className="font-bold mb-4 text-green-400">Top Contributors</h3>
                            <div className="flex -space-x-2 overflow-hidden mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-[#1f2f22] bg-gray-600 flex items-center justify-center text-xs font-bold">
                                        {String.fromCharCode(65 + i)}
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-gray-400">Join the leaderboard by helping others!</p>
                        </div>
                    </div>

                    {/* Main Feed */}
                    <div className="md:col-span-3 space-y-4">
                        {topics.map((topic, index) => (
                            <div key={index} className="bg-[#1f2f22] p-6 rounded-2xl border border-white/5 hover:border-green-500/30 transition cursor-pointer group">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-bold group-hover:text-green-400 transition">{topic.title}</h3>
                                    <span className="bg-white/5 text-gray-400 text-xs px-2 py-1 rounded">{topic.lastActive}</span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                        {topic.author}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                                        {topic.posts} replies
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <PublicFooter />
        </div>
    );
}
