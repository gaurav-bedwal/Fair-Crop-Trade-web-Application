import React from "react";
import PublicNavbar from "../components/PublicNavbar";
import PublicFooter from "../components/PublicFooter";

export default function AboutUs() {
    return (
        <div className="min-h-screen bg-[#111a13] text-white font-['Inter'] selection:bg-green-500 selection:text-white">
            <PublicNavbar />

            <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">About AgriTrade</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Building the future of fair, transparent, and direct agricultural trading for the world.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                    <div>
                        <h2 className="text-3xl font-bold mb-6 text-green-400">Our Mission</h2>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            At AgriTrade, we believe that farmers deserve fair prices for their hard work and that buyers deserve high-quality, traceable produce. We are dismantling the opaque supply chains of the past and replacing them with a direct, technology-driven marketplace.
                        </p>
                        <p className="text-gray-300 leading-relaxed">
                            Our platform empowers producers to reach global markets without intermediaries, ensuring that more value stays where it belongs: with the people who grow our food.
                        </p>
                    </div>
                    <div className="bg-[#1f2f22] p-8 rounded-3xl border border-white/5 h-80 flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-6xl mb-4">🌍</div>
                            <div className="text-xl font-bold">Connecting 50+ Countries</div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-24">
                    {[
                        { title: "Transparency", desc: "Real-time pricing and direct communication." },
                        { title: "Trust", desc: "Verified participants and secure transactions." },
                        { title: "Sustainability", desc: "Reducing food waste through efficient logistics." }
                    ].map((item, i) => (
                        <div key={i} className="bg-[#1f2f22] p-8 rounded-2xl border border-white/5">
                            <h3 className="text-xl font-bold mb-3 text-green-400">{item.title}</h3>
                            <p className="text-gray-400">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-8">Join the Revolution</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                        Whether you are a smallholder farmer or a large distributor, there is a place for you in our ecosystem.
                    </p>
                    {/* Reusing Home styles for button */}
                    <a href="/signup" className="inline-block bg-green-500 text-[#111a13] px-8 py-4 rounded-full font-bold hover:bg-green-400 transition shadow-lg">
                        Get Started Today
                    </a>
                </div>

                {/* Created By Section */}
                <div className="mt-24 text-center">
                    <div className="bg-gradient-to-br from-[#1f2f22] to-[#2a3f2e] p-10 rounded-3xl border border-white/10 inline-block">
                        <h3 className="text-xl font-semibold text-gray-400 mb-6">Created by</h3>
                        <div className="flex flex-wrap justify-center gap-6">
                            {[
                                { name: "Arun", regNo: "12303946" },
                                { name: "Ankur", regNo: "12324824" },
                                { name: "Vaibhav", regNo: "12312316" }
                            ].map((creator, i) => (
                                <div key={i} className="bg-[#111a13] px-6 py-4 rounded-2xl border border-green-500/30 hover:border-green-400 transition-all duration-300 hover:scale-105">
                                    <span className="text-green-400 font-bold text-lg block">{creator.name}</span>
                                    <span className="text-gray-500 text-sm">{creator.regNo}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <PublicFooter />
        </div>
    );
}
