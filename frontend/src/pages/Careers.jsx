import React from "react";
import PublicNavbar from "../components/PublicNavbar";
import PublicFooter from "../components/PublicFooter";

export default function Careers() {
    const positions = [
        { title: "Senior Full Stack Engineer", dept: "Engineering", loc: "Remote", type: "Full-time" },
        { title: "Product Manager, Logistics", dept: "Product", loc: "San Francisco, CA", type: "Full-time" },
        { title: "Agricultural Specialist", dept: "Operations", loc: "Sao Paulo, Brazil", type: "Contract" },
        { title: "Customer Success Manager", dept: "Sales", loc: "London, UK", type: "Full-time" },
    ];

    return (
        <div className="min-h-screen bg-[#111a13] text-white font-['Inter'] selection:bg-green-500 selection:text-white">
            <PublicNavbar />

            <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Team</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Help us rewrite the future of global agriculture. We are looking for passionate individuals to solve complex problems.
                    </p>
                </div>

                <div className="grid gap-6">
                    {positions.map((job, index) => (
                        <div key={index} className="group bg-[#1f2f22] p-8 rounded-2xl border border-white/5 hover:border-green-500/50 transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-green-400 transition">{job.title}</h3>
                                <div className="flex gap-4 text-sm text-gray-400">
                                    <span className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                                        {job.dept}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                        {job.loc}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        {job.type}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <span className="px-6 py-3 rounded-full border border-white/20 text-sm font-bold group-hover:bg-green-500 group-hover:text-[#111a13] group-hover:border-transparent transition">
                                    Apply Now
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <PublicFooter />
        </div>
    );
}
