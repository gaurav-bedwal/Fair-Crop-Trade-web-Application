import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function MyListings() {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In a real app, this would be filtered by the logged-in user's ID.
        // For now, we fetch ALL active market listings as requested.
        axios.get("http://localhost:5000/api/crops")
            .then(res => {
                const formattedCrops = res.data.map(crop => ({
                    id: crop._id,
                    name: crop.cropName,
                    description: crop.description || "No description",
                    status: "Active",
                    quantity: `${crop.quantity} Quintals`,
                    price: crop.price,
                    image: crop.image ? `http://localhost:5000${crop.image}` : `https://source.unsplash.com/random/100x100/?${crop.cropName.split(' ')[0]},farm`,
                    type: crop.category || "General",
                    isRemoving: false
                }));
                setListings(formattedCrops);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching listings:", err);
                setLoading(false);
            });
    }, []);

    const initiateRemove = (id) => {
        setListings(listings.map(item =>
            item.id === id ? { ...item, isRemoving: true } : item
        ));
    };

    const undoRemove = (id) => {
        setListings(listings.map(item =>
            item.id === id ? { ...item, isRemoving: false } : item
        ));
    };

    const confirmRemove = (id) => {
        setListings(listings.filter(item => item.id !== id));
    };

    return (
        <div className="min-h-screen bg-[#111a13] font-sans text-white">
            {/* Navbar */}
            <nav className="flex items-center justify-between px-8 py-4 bg-[#111a13] border-b border-white/5">
                <div className="flex items-center gap-8">
                    <Link to="/" className="flex items-center gap-2 text-xl font-bold">
                        <div className="w-8 h-8 text-green-500">
                            {/* Simple Logo Icon */}
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
                            </svg>
                        </div>
                        Fair Trade Portal
                    </Link>

                    <div className="relative">
                        <span className="absolute left-3 top-2.5 text-gray-500">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Search listing ID, crop name..."
                            className="bg-[#1f2f22] rounded-full pl-10 pr-4 py-2 text-sm text-gray-300 w-80 focus:outline-none focus:ring-1 focus:ring-green-500/50"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-6 text-sm font-medium text-gray-400">
                    <Link to="/dashboard" className="hover:text-white transition">Dashboard</Link>
                    <Link to="/dashboard" className="hover:text-white transition">Marketplace</Link>
                    <Link to="/my-listings" className="text-white">My Listings</Link>
                    <Link to="#" className="hover:text-white transition">Orders</Link>
                    <div className="w-8 h-8 rounded-full bg-green-900 border border-green-500/30 overflow-hidden">
                        <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-8 py-8">
                {/* Breadcrumb */}
                <div className="text-sm text-gray-500 mb-6 flex gap-2">
                    <Link to="/" className="hover:text-gray-300">Home</Link>
                    <span>&gt;</span>
                    <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
                    <span>&gt;</span>
                    <span className="text-white">My Listings</span>
                </div>

                {/* Header */}
                <div className="flex justify-between items-end mb-8 block">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Active Crop Listings</h1>
                        <p className="text-gray-400 text-sm max-w-xl">
                            Manage your current inventory visibility. Removed listings cannot be recovered once confirmed.
                        </p>
                    </div>
                    <Link to="/add-crop" className="bg-green-500 text-black px-6 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-green-400 transition shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                        Add New Crop
                    </Link>
                </div>

                {/* Controls */}
                <div className="bg-[#18241b] rounded-2xl p-4 flex justify-between items-center mb-6 border border-white/5">
                    <div className="flex gap-4">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-xs text-gray-300 hover:bg-white/5 transition">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                            Filter by Type
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-xs text-gray-300 hover:bg-white/5 transition">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"></path></svg>
                            Sort by Date
                        </button>
                    </div>

                    <div className="flex items-center gap-6 text-sm">
                        <span className="text-gray-400">{listings.filter(l => !l.isRemoving).length} Active Listings</span>
                        <button className="flex items-center gap-2 text-gray-400 hover:text-white transition">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            Batch Remove
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-[#18241b] rounded-3xl border border-white/5 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-xs text-gray-400 uppercase border-b border-white/5 bg-[#1f2f22]/50">
                                <th className="py-5 pl-8 pr-4 w-12 text-center">
                                    <div className="w-4 h-4 rounded-full border border-white/20 mx-auto"></div>
                                </th>
                                <th className="py-5 px-4">Crop Details</th>
                                <th className="py-5 px-4 w-32">Status</th>
                                <th className="py-5 px-4 w-32 text-right">Quantity</th>
                                <th className="py-5 px-4 w-32 text-right">Price / Unit</th>
                                <th className="py-5 px-4 w-24 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listings.map((item) => (
                                <tr key={item.id} className={`border-b border-white/5 last:border-none group transition ${item.isRemoving ? 'bg-[#2a1a1a]/40' : 'hover:bg-[#1f2f22]/50'}`}>
                                    <td className="py-4 pl-8 pr-4 text-center">
                                        <div className={`w-4 h-4 rounded-full border mx-auto cursor-pointer ${item.isRemoving ? 'border-red-500/30' : 'border-white/20 group-hover:border-green-500/50'}`}></div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-800 shrink-0">
                                                <img src={item.image} alt={item.name} className={`w-full h-full object-cover ${item.isRemoving ? 'opacity-50 grayscale' : ''}`} />
                                            </div>
                                            <div>
                                                <div className={`font-bold ${item.isRemoving ? 'text-gray-400' : 'text-white'}`}>{item.name}</div>
                                                <div className="text-xs mt-0.5">
                                                    {item.isRemoving ? (
                                                        <span className="text-red-400 font-medium animate-pulse">Pending Removal...</span>
                                                    ) : (
                                                        <span className="text-gray-500 text-[10px] tracking-wide">ID: {item.id} • {item.description}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        {!item.isRemoving && (
                                            <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold border ${item.status === 'Active'
                                                ? 'bg-green-500/10 text-green-500 border-green-500/20'
                                                : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                                                }`}>
                                                {item.status}
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-4 px-4 text-right text-sm text-gray-300">
                                        {item.quantity}
                                    </td>
                                    <td className="py-4 px-4 text-right text-sm text-white font-medium">
                                        ₹{item.price.toFixed(2)}
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                        {item.isRemoving ? (
                                            <div className="flex flex-col gap-1 items-end justify-center pr-2">
                                                <button
                                                    onClick={() => undoRemove(item.id)}
                                                    className="text-[10px] font-bold text-gray-400 hover:text-white uppercase tracking-wider transition"
                                                >
                                                    Undo
                                                </button>
                                                <button
                                                    onClick={() => confirmRemove(item.id)}
                                                    className="text-[10px] font-bold text-red-500 hover:text-red-400 uppercase tracking-wider transition"
                                                >
                                                    Confirm
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => initiateRemove(item.id)}
                                                className="p-2 rounded-lg text-gray-500 hover:bg-red-500/10 hover:text-red-500 transition"
                                                title="Remove listing"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-500">
                        <div>
                            Showing <span className="font-bold text-white">1</span> to <span className="font-bold text-white">{listings.length}</span> of <span className="font-bold text-white">{listings.length}</span> results
                        </div>
                        <div className="flex rounded-lg overflow-hidden border border-white/10">
                            <button className="px-3 py-2 hover:bg-white/5 border-r border-white/10 text-gray-500 hover:text-white transition">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                            </button>
                            <button className="px-3 py-2 bg-green-500 text-black font-bold">1</button>
                            <button className="px-3 py-2 hover:bg-white/5 border-l border-white/10 transition">2</button>
                            <button className="px-3 py-2 hover:bg-white/5 border-l border-white/10 transition">3</button>
                            <button className="px-3 py-2 hover:bg-white/5 border-l border-white/10 text-gray-500 hover:text-white transition">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}
