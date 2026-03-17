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

                {/* Leadership Team Data */}
                <div className="mt-24 text-center">
                    <h2 className="text-3xl font-bold mb-12">Leadership Team</h2>
                    <div className="grid md:grid-cols-3 gap-10">
                        {[
                            { name: "Rahul Sharma", role: "CEO & Founder", image: "https://i.pravatar.cc/150?img=11" },
                            { name: "Priya Patel", role: "Head of Operations", image: "https://i.pravatar.cc/150?img=44" },
                            { name: "Vikram Singh", role: "Chief Technology Officer", image: "https://i.pravatar.cc/150?img=33" }
                        ].map((member, i) => (
                            <div key={i} className="bg-gradient-to-br from-[#1f2f22] to-[#2a3f2e] p-8 rounded-3xl border border-white/10 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-2">
                                <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-6 border-2 border-green-500 object-cover" />
                                <h4 className="text-xl font-bold text-white mb-2">{member.name}</h4>
                                <p className="text-green-400">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <PublicFooter />
        </div>
    );
}
