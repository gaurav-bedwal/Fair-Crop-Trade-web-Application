import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import NotificationCenter from '../components/NotificationCenter';
import FarmerNotifications from '../components/FarmerNotifications';

export default function CropDetails() {
    const { id } = useParams();
    const [bidAmount, setBidAmount] = useState(0);
    const [bidderName, setBidderName] = useState("");
    const [bidderMobile, setBidderMobile] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [cropData, setCropData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cropBids, setCropBids] = useState([]);
    const [highestBid, setHighestBid] = useState(0);

    useEffect(() => {
        const fetchCrop = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/crops/${id}`);
                setCropData(response.data);
                setBidAmount((response.data.price + 0.10).toFixed(2));

                // Fetch bids for this crop
                const bidsRes = await axios.get(`http://localhost:5000/api/bids/crop/${id}`);
                setCropBids(bidsRes.data);

                // Fetch highest bid
                const highestRes = await axios.get(`http://localhost:5000/api/bids/crop/${id}/highest`);
                if (highestRes.data && highestRes.data.amount) {
                    setHighestBid(highestRes.data.amount);
                }
            } catch (error) {
                console.error("Error fetching crop details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCrop();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#111a13] flex items-center justify-center text-white">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    Loading crop details...
                </div>
            </div>
        );
    }

    if (!cropData) {
        return (
            <div className="min-h-screen bg-[#111a13] flex items-center justify-center text-white">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Crop Not Found</h2>
                    <Link to="/dashboard" className="text-green-500 hover:underline">Return to Marketplace</Link>
                </div>
            </div>
        );
    }

    // Map backend data to UI structure
    const crop = {
        title: cropData.cropName || "Unknown Crop",
        lotId: `#${cropData._id.slice(-4)}`, // Use last 4 chars of ID
        farmer: cropData.farmer || "FairTrade Farmer",
        location: cropData.location || "Global Farm",
        currentBid: cropData.price || 0,
        timeRemaining: "04:23:12", // Mock for now
        minBid: cropData.price || 0,
        totalWeight: cropData.quantity || 0,
        platformFeePercent: 1.5,
        description: cropData.description || "No description provided for this crop.",
        variety: cropData.variety || "Standard",
        harvestDate: cropData.harvestDate ? new Date(cropData.harvestDate).toLocaleDateString() : "Recent",
        type: cropData.category || "General",
        mobileNumber: cropData.mobileNumber || "Contact Hidden",
        image: cropData.image ? `http://localhost:5000${cropData.image}` : null,
        logistics: cropData.logistics || "buyer-pickup"
    };

    const fees = (bidAmount * crop.totalWeight * (crop.platformFeePercent / 100));
    const total = (bidAmount * crop.totalWeight) + fees;

    const handlePlaceBid = async () => {
        if (!bidderName.trim()) {
            alert("Please enter your name before placing a bid.");
            return;
        }
        if (!bidderMobile.trim()) {
            alert("Please enter your mobile number before placing a bid.");
            return;
        }
        try {
            // Submit bid to backend
            const response = await axios.post("http://localhost:5000/api/bids", {
                cropId: id,
                bidder: bidderName,
                bidderMobile: bidderMobile,
                amount: parseFloat(bidAmount)
            });

            // Add the new bid to the list
            setCropBids([response.data, ...cropBids]);

            // Update highest bid if this is higher
            if (parseFloat(bidAmount) > highestBid) {
                setHighestBid(parseFloat(bidAmount));
            }

            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);
        } catch (error) {
            console.error("Error placing bid:", error);
            alert("Failed to place bid. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-[#111a13] font-sans text-white pb-20 relative">
            {/* Navbar - Keeping consistent with other pages */}
            <nav className="border-b border-white/5 bg-[#0d140f] py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-[60]">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center rotate-3">
                        <svg className="w-5 h-5 text-[#111a13]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </div>
                    <Link to="/" className="text-xl font-bold tracking-tight">FairHarvest</Link>
                </div>
                <div className="flex items-center gap-8 text-sm font-medium text-gray-400">
                    <Link to="/dashboard" className="hover:text-green-400 transition">Marketplace</Link>
                    <Link to="/farmers" className="hover:text-green-400 transition">Farmers</Link>
                    <Link to="/auctions" className="hover:text-green-400 transition">Auctions</Link>
                    <Link to="/logistics" className="hover:text-green-400 transition">Logistics</Link>
                </div>
                <div className="flex items-center gap-4">
                    <FarmerNotifications farmerName={localStorage.getItem("userName") || ""} />
                    <NotificationCenter />
                    <div className="w-10 h-10 rounded-full bg-green-900 border border-green-500 overflow-hidden">
                        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="w-full h-full object-cover" />
                    </div>
                </div>
            </nav>

            {/* Success Popup */}
            {showPopup && (
                <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-[70]">
                    <div className="animate-fade-in-up bg-green-500 text-[#111a13] px-6 py-3 rounded-full font-bold shadow-[0_0_20px_rgba(74,222,128,0.5)] flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        Bid placed successfully!
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-6 py-8">

                {/* Breadcrumbs & Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                        <Link to="/dashboard" className="hover:text-white transition">Marketplace</Link>
                        <span>/</span>
                        <span className="hover:text-white cursor-pointer">{crop.type}</span>
                        <span>/</span>
                        <span className="text-white">Lot {crop.lotId}</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-2">{crop.title}</h1>
                            <div className="flex items-center gap-2 text-gray-400">
                                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                <span>Lot {crop.lotId} • Cultivated by <span className="text-white font-medium">{crop.farmer}</span></span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <span className="px-3 py-1 rounded-full border border-green-500/30 text-green-400 text-xs font-bold bg-green-500/10 uppercase tracking-wide">Organic Certified</span>
                            <span className="px-3 py-1 rounded-full border border-blue-500/30 text-blue-400 text-xs font-bold bg-blue-500/10 uppercase tracking-wide">Fair Trade</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column (Images, Info) */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Main Crop Image */}
                        <div className="h-96 rounded-3xl overflow-hidden relative group border border-white/5 shadow-2xl">
                            <img src={crop.image || `https://source.unsplash.com/random/800x600/?${crop.title.split(' ')[0]},farm`}
                                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1637&auto=format&fit=crop' }}
                                alt={crop.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#111a13]/80 via-transparent to-transparent opacity-80"></div>
                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="inline-block bg-green-500 text-[#111a13] text-xs font-bold px-3 py-1 rounded-full mb-2 shadow-lg">
                                    Trusted Quality
                                </div>
                                <p className="text-white/80 text-sm max-w-lg">
                                    Verified photo from the source.
                                </p>
                            </div>
                        </div>

                        {/* About Farmer */}
                        <div className="bg-[#1f2f22]/30 border border-white/5 rounded-3xl p-8">
                            <div className="flex items-start gap-6">
                                <div className="w-20 h-20 rounded-full p-1 border-2 border-green-500/30">
                                    <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80" alt="Farmer" className="w-full h-full object-cover rounded-full" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1">About the Farmer</h3>
                                    <p className="text-green-500 text-sm mb-4">{crop.farmer}, {crop.location}</p>
                                    <p className="text-gray-300 text-sm mb-2 flex items-center gap-2">
                                        <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        {crop.mobileNumber}
                                    </p>
                                    <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
                                        {crop.description}
                                    </p>
                                    <Link to="#" className="inline-flex items-center gap-2 text-green-400 text-sm font-bold mt-4 hover:text-green-300">
                                        View Farmer Profile
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Specs and Logistics */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                            <div>
                                <h4 className="font-bold text-white mb-4">Crop Specifications</h4>
                                <div className="space-y-4 text-sm">
                                    <div className="flex justify-between py-3 border-b border-white/5">
                                        <span className="text-gray-500">Variety</span>
                                        <span className="text-white font-medium">{crop.variety}</span>
                                    </div>
                                    <div className="flex justify-between py-3 border-b border-white/5">
                                        <span className="text-gray-500">Process</span>
                                        <span className="text-white font-medium">Standard</span>
                                    </div>
                                    <div className="flex justify-between py-3 border-b border-white/5">
                                        <span className="text-gray-500">Harvest Date</span>
                                        <span className="text-white font-medium">{crop.harvestDate}</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-bold text-white mb-4">Logistics Info</h4>
                                <div className="space-y-4 text-sm">
                                    <div className="flex justify-between py-3 border-b border-white/5">
                                        <span className="text-gray-500">Total Weight</span>
                                        <span className="text-white font-medium">{crop.totalWeight} Quintals</span>
                                    </div>
                                    <div className="flex justify-between py-3 border-b border-white/5">
                                        <span className="text-gray-500">Packaging</span>
                                        <span className="text-white font-medium">Bulk / Standard</span>
                                    </div>
                                    <div className="flex justify-between py-3 border-b border-white/5">
                                        <span className="text-gray-500">Delivery Option</span>
                                        <span className="text-green-400 font-bold uppercase text-xs tracking-wider border border-green-500/30 bg-green-500/10 px-2 py-1 rounded">
                                            {crop.logistics.replace('-', ' ')}
                                        </span>
                                    </div>
                                    <div className="flex justify-between py-3 border-b border-white/5">
                                        <span className="text-gray-500">Location</span>
                                        <span className="text-white font-medium">{crop.location}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column (Bidding Card) */}
                    <div>
                        <div className="bg-[#1f2f22] border border-white/10 rounded-3xl p-6 sticky top-24 shadow-2xl">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <div className="text-sm text-gray-400 mb-1">Current Highest Bid</div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-bold text-white">₹{Number(crop.currentBid).toFixed(2)}</span>
                                        <span className="text-gray-500">/ quintal</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Time Remaining</div>
                                    <div className="flex items-center gap-2 bg-[#2a1a1a] text-red-400 px-3 py-1.5 rounded-lg border border-red-500/20">
                                        <svg className="w-4 h-4 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        <span className="font-mono font-bold text-sm">04:23:12</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="text-xs text-gray-400 mb-2">Your Name</div>
                                <input
                                    type="text"
                                    value={bidderName}
                                    onChange={(e) => setBidderName(e.target.value)}
                                    placeholder="Enter your name..."
                                    className="w-full bg-[#162218] border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:border-green-500 transition shadow-inner placeholder-gray-600"
                                />
                            </div>

                            <div className="mb-4">
                                <div className="text-xs text-gray-400 mb-2">Your Mobile Number</div>
                                <input
                                    type="tel"
                                    value={bidderMobile}
                                    onChange={(e) => setBidderMobile(e.target.value)}
                                    placeholder="+91 98765 43210"
                                    className="w-full bg-[#162218] border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:border-green-500 transition shadow-inner placeholder-gray-600"
                                />
                            </div>

                            <div className="mb-6">
                                <div className="flex justify-between text-xs text-gray-400 mb-2">
                                    <span>Your Bid Amount</span>
                                    <span>Min. bid: ₹{Number(crop.minBid).toFixed(2)}</span>
                                </div>
                                <div className="relative">
                                    <span className="absolute left-4 top-4 text-gray-500 text-lg">₹</span>
                                    <input
                                        type="number"
                                        value={bidAmount}
                                        onChange={(e) => setBidAmount(e.target.value)}
                                        className="w-full bg-[#162218] border border-white/10 rounded-2xl py-4 pl-8 pr-4 text-xl font-bold text-white focus:outline-none focus:border-green-500 transition shadow-inner"
                                    />
                                </div>
                                <div className="flex gap-2 mt-3">
                                    <button onClick={() => setBidAmount((parseFloat(bidAmount || 0) + 100).toFixed(2))} className="flex-1 bg-white/5 hover:bg-white/10 text-xs font-bold py-2 rounded-xl transition border border-white/5">+ ₹100</button>
                                    <button onClick={() => setBidAmount((parseFloat(bidAmount || 0) + 500).toFixed(2))} className="flex-1 bg-white/5 hover:bg-white/10 text-xs font-bold py-2 rounded-xl transition border border-white/5">+ ₹500</button>
                                    <button onClick={() => setBidAmount((parseFloat(bidAmount || 0) + 1000).toFixed(2))} className="flex-1 bg-white/5 hover:bg-white/10 text-xs font-bold py-2 rounded-xl transition border border-white/5">+ ₹1000</button>
                                </div>
                            </div>

                            {/* Bid History Section */}
                            {cropBids.length > 0 && (
                                <div className="bg-[#162218] rounded-2xl p-4 mb-6 border border-yellow-500/20">
                                    <div className="flex items-center gap-2 mb-3">
                                        <svg className="w-4 h-4 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-yellow-400 text-xs font-bold uppercase tracking-wider">Other Bids on This Crop</span>
                                    </div>
                                    <div className="space-y-2 max-h-32 overflow-y-auto">
                                        {cropBids.slice(0, 5).map((bid, index) => (
                                            <div key={bid._id || index} className="flex items-center justify-between text-xs bg-[#1f2f22]/50 px-3 py-2 rounded-lg">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-[10px] font-bold text-white">
                                                        {bid.bidder?.charAt(0) || 'A'}
                                                    </div>
                                                    <span className="text-gray-300">{bid.bidder || 'Anonymous'}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-green-400 font-bold">₹{Number(bid.amount).toFixed(2)}</span>
                                                    <span className="text-gray-500 text-[10px]">
                                                        {new Date(bid.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {highestBid > 0 && (
                                        <div className="mt-3 pt-3 border-t border-white/10 flex justify-between items-center">
                                            <span className="text-gray-400 text-xs">Highest Bid:</span>
                                            <span className="text-green-500 font-bold">₹{Number(highestBid).toFixed(2)} / quintal</span>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="bg-[#162218] rounded-2xl p-4 space-y-3 mb-6 border border-white/5">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Subtotal ({crop.totalWeight} quintals)</span>
                                    <span className="text-white font-medium">₹{(Number(bidAmount || 0) * crop.totalWeight).toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Platform Fee (1.5%)</span>
                                    <span className="text-white font-medium">₹{fees.toFixed(2)}</span>
                                </div>
                                <div className="border-t border-white/5 pt-3 flex justify-between text-sm">
                                    <span className="text-green-400 font-bold">Estimated Total</span>
                                    <span className="text-green-400 font-bold">₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                </div>
                            </div>

                            <button
                                onClick={handlePlaceBid}
                                className="w-full bg-green-500 hover:bg-green-400 text-[#111a13] font-bold py-4 rounded-full text-lg shadow-[0_4px_14px_rgba(74,222,128,0.4)] transition hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                            >
                                Place Bid Now
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            </button>

                            <p className="text-[10px] text-gray-500 text-center mt-4">
                                By placing a bid, you agree to the <a href="#" className="underline hover:text-gray-400">Terms of Service</a>.
                            </p>
                        </div>

                        <div className="mt-6 bg-[#1f2f22]/30 border border-white/5 rounded-3xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                                    <svg className="w-3 h-3 text-[#111a13]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                </div>
                                <h4 className="font-bold text-white text-sm">Buyer Protection</h4>
                            </div>
                            <ul className="text-xs text-gray-400 space-y-3 leading-relaxed">
                                <li className="flex gap-2">
                                    <span className="w-1 h-1 bg-gray-500 rounded-full mt-1.5 shrink-0"></span>
                                    <span><strong className="text-gray-300">Quality Guarantee:</strong> Funds are held in escrow until independent quality verification upon delivery.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="w-1 h-1 bg-gray-500 rounded-full mt-1.5 shrink-0"></span>
                                    <span><strong className="text-gray-300">Logistics Support:</strong> We handle insurance and freight documentation automatically.</span>
                                </li>
                            </ul>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}
