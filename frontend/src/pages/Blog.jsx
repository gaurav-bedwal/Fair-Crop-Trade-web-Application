import React from "react";
import PublicNavbar from "../components/PublicNavbar";
import PublicFooter from "../components/PublicFooter";

export default function Blog() {
    const posts = [
        {
            title: "The Future of Sustainable Farming in 2025",
            excerpt: "How technology is reshaping the agricultural landscape and what it means for smallholder farmers.",
            date: "Dec 15, 2024",
            author: "Elena Rodriguez",
            category: "Sustainability"
        },
        {
            title: "Global Wheat Market Trends: Q4 Report",
            excerpt: "An in-depth analysis of supply chain disruptions and price volatility in the grain market.",
            date: "Dec 10, 2024",
            author: "Michael Chang",
            category: "Market Analysis"
        },
        {
            title: "From Farm to Fork: A Traceability Guide",
            excerpt: "Why consumers are demanding more transparency and how AgriTrade helps you provide it.",
            date: "Nov 28, 2024",
            author: "Sarah Johnson",
            category: "Technology"
        }
    ];

    return (
        <div className="min-h-screen bg-[#111a13] text-white font-['Inter'] selection:bg-green-500 selection:text-white">
            <PublicNavbar />

            <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">AgriTrade Blog</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Insights, updates, and stories from the world of modern agriculture.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <div key={index} className="bg-[#1f2f22] rounded-3xl overflow-hidden border border-white/5 hover:border-green-500/30 transition-all hover:transform hover:-translate-y-1 group cursor-pointer">
                            <div className="h-48 bg-gray-800 relative">
                                {/* Placeholder for blog image */}
                                <div className="absolute inset-0 bg-green-900/20 group-hover:bg-green-900/10 transition"></div>
                                <div className="absolute top-4 left-4 bg-green-500 text-[#111a13] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    {post.category}
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                                    <span>{post.date}</span>
                                    <span>•</span>
                                    <span>{post.author}</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3 group-hover:text-green-400 transition">{post.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                    {post.excerpt}
                                </p>
                                <div className="text-green-400 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                                    Read Article
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <PublicFooter />
        </div>
    );
}
