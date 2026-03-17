import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Auctions() {
    const [auctions, setAuctions] = useState([
        {
            id: 1,
            name: "Organic Arabica Coffee",
            image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1637&auto=format&fit=crop",
            currentBid: 450,
            endsIn: "04:23:12",
            bids: 12,
            farmer: "Coorg Estates"
        },
        {
            id: 2,
            name: "Premium Saffron",
            image: "https://images.unsplash.com/photo-1596489347589-d65e8aef130f?auto=format&fit=crop&w=800&q=80",
            currentBid: 85000,
            endsIn: "01:15:00",
            bids: 28,
            farmer: "Kashmir Farms"
        },
        {
            id: 3,
            name: "Organic Tomatoes",
            image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
            currentBid: 2500,
            endsIn: "00:45:30",
            bids: 8,
            farmer: "Nashik Farms"
        },
        {
            id: 4,
            name: "Raw Cotton Bales",
            image: "https://images.unsplash.com/photo-1605330366620-3755498845e2?auto=format&fit=crop&w=800&q=80",
            currentBid: 6500,
            endsIn: "12:00:00",
            bids: 5,
            farmer: "Gujarat Cotton Co"
        }
    ]);

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
                    <Link to="/farmers" className="hover:text-green-400 transition">Farmers</Link>
                    <Link to="/auctions" className="text-white transition">Auctions</Link>
                    <Link to="/logistics" className="hover:text-green-400 transition">Logistics</Link>
                </div>
                <div className="w-10 h-10 rounded-full bg-green-900 border border-green-500 overflow-hidden">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="w-full h-full object-cover" />
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold">Live Auctions</h1>
                    <div className="flex gap-2">
                        <button className="bg-green-500 text-[#111a13] px-4 py-2 rounded-full text-sm font-bold">All Items</button>
                        <button className="bg-white/5 hover:bg-white/10 text-gray-400 px-4 py-2 rounded-full text-sm font-medium transition border border-white/5">Ending Soon</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {auctions.map(item => (
                        <div key={item.id} className="bg-[#1f2f22] rounded-3xl overflow-hidden border border-white/5 hover:border-green-500/30 transition group relative">
                            <div className="h-48 relative overflow-hidden">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 animate-pulse">
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    {item.endsIn}
                                </div>
                            </div>
                            <div className="p-5">
                                <div className="text-xs text-green-400 font-bold uppercase tracking-wider mb-1">Live Now</div>
                                <h3 className="text-lg font-bold text-white mb-1 truncate">{item.name}</h3>
                                <p className="text-gray-400 text-xs mb-4">by {item.farmer}</p>

                                <div className="flex justify-between items-end mb-4 bg-[#162218] p-3 rounded-xl border border-white/5">
                                    <div>
                                        <div className="text-[10px] text-gray-500 uppercase">Current Bid</div>
                                        <div className="text-xl font-bold text-white">₹{item.currentBid.toLocaleString('en-IN')}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[10px] text-gray-500 uppercase">{item.bids} Bids</div>
                                        <div className="text-xs text-green-500 font-medium">Top Bidder</div>
                                    </div>
                                </div>

                                <Link to={`/crop/${item.id}`} className="block w-full text-center bg-white/5 hover:bg-green-500 hover:text-[#111a13] text-green-400 font-bold py-3 rounded-xl transition border border-green-500/30 hover:border-green-500">
                                    Place Bid
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
