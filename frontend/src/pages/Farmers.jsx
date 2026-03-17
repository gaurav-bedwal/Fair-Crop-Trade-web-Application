import React from 'react';
import { Link } from 'react-router-dom';

export default function Farmers() {
    const farmers = [
        { id: 1, name: "Maria Gonzalez", location: "Huila, Colombia", crop: "Arabica Coffee", rating: 4.9, image: "https://randomuser.me/api/portraits/women/44.jpg" },
        { id: 2, name: "John Doe", location: "Kansas, USA", crop: "Wheat", rating: 4.8, image: "https://randomuser.me/api/portraits/men/32.jpg" },
        { id: 3, name: "Amit Patel", location: "Gujarat, India", crop: "Cotton", rating: 4.7, image: "https://randomuser.me/api/portraits/men/45.jpg" },
        { id: 4, name: "Sarah Jenkins", location: "California, USA", crop: "Almonds", rating: 4.9, image: "https://randomuser.me/api/portraits/women/68.jpg" },
    ];

    return (
        <div className="min-h-screen bg-[#111a13] font-['Inter'] text-white">
            <nav className="border-b border-white/5 bg-[#0d140f] py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center rotate-3">
                        <svg className="w-5 h-5 text-[#111a13]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </div>
                    <Link to="/" className="text-xl font-bold tracking-tight">FairHarvest</Link>
                </div>
                <div className="flex items-center gap-6 text-sm font-medium text-gray-400">
                    <Link to="/dashboard" className="hover:text-green-400 transition">Marketplace</Link>
                    <Link to="/farmers" className="text-white transition">Farmers</Link>
                    <Link to="/logistics" className="hover:text-green-400 transition">Logistics</Link>
                </div>
                <div className="w-10 h-10 rounded-full bg-green-900 border border-green-500 overflow-hidden">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="w-full h-full object-cover" />
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <h1 className="text-3xl font-bold mb-8">Our Trusted Farmers</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {farmers.map(farmer => (
                        <div key={farmer.id} className="bg-[#1f2f22] p-6 rounded-3xl border border-white/5 hover:border-green-500/30 transition text-center">
                            <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-2 border-green-500/30">
                                <img src={farmer.image} alt={farmer.name} className="w-full h-full object-cover" />
                            </div>
                            <h3 className="text-xl font-bold text-white">{farmer.name}</h3>
                            <p className="text-gray-400 text-sm mb-1">{farmer.location}</p>
                            <p className="text-green-400 text-xs mb-3 font-mono flex items-center justify-center gap-1">
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                +1 (555) 000-00{farmer.id}0
                            </p>
                            <div className="flex justify-center items-center gap-1 text-yellow-400 text-sm font-bold mb-4">
                                <span>★</span> {farmer.rating}
                            </div>
                            <button className="bg-white/5 hover:bg-white/10 text-green-400 px-4 py-2 rounded-full text-sm font-bold w-full transition border border-white/5">
                                View Profile
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
