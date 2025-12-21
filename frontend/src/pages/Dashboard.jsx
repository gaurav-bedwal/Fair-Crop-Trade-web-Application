import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NotificationCenter from "../components/NotificationCenter";
import FarmerNotifications from "../components/FarmerNotifications";

export default function Dashboard() {
  const [crops, setCrops] = useState([]);
  // Get logged-in user name from localStorage
  const currentFarmerName = localStorage.getItem("userName") || "";

  useEffect(() => {
    // Fetch real data from backend
    axios.get("http://localhost:5000/api/crops")
      .then(res => setCrops(res.data))
      .catch(err => console.error("Error fetching crops:", err));
  }, []);

  return (
    <div className="min-h-screen bg-[#111a13] font-['Inter'] text-white">
      {/* Navbar */}
      <nav className="border-b border-white/5 bg-[#0d140f] py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center rotate-3">
            <svg className="w-5 h-5 text-[#111a13]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <Link to="/" className="text-xl font-bold tracking-tight">FairHarvest</Link>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400 mr-4">
            <Link to="/dashboard" className="text-white">Marketplace</Link>
            <Link to="/my-listings" className="hover:text-white transition">My Listings</Link>
            <Link to="/orders" className="hover:text-white transition">Orders</Link>
          </div>
          <Link to="/add-crop" className="hidden md:flex items-center gap-2 bg-green-500 text-[#111a13] px-5 py-2 rounded-full text-sm font-bold hover:bg-green-400 transition shadow-[0_0_15px_rgba(74,222,128,0.3)]">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
            </svg>
            Sell Crop
          </Link>
          <FarmerNotifications farmerName={currentFarmerName} />
          <NotificationCenter />
          <div className="w-10 h-10 rounded-full bg-green-900 border border-green-500 overflow-hidden cursor-pointer">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="w-full h-full object-cover" />
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-end md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Marketplace</h1>
            <p className="text-gray-400">Discover fresh produce directly from farmers.</p>
          </div>

          {/* Mobile-only floating button if needed, but for now sticking to the one in nav or header */}
          <div className="flex gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search crops..."
                className="bg-[#1f2f22] border border-white/10 rounded-full px-5 py-2.5 pl-10 text-sm focus:outline-none focus:border-green-500 w-64"
              />
              <svg className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <Link to="/add-crop" className="md:hidden flex items-center justify-center w-10 h-10 bg-green-500 text-[#111a13] rounded-full shadow-lg">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {crops.map(crop => (
            <div key={crop._id} className="bg-[#1f2f22] rounded-3xl border border-white/5 overflow-hidden group hover:border-green-500/30 transition-all hover:transform hover:-translate-y-1">
              <div className="h-48 bg-[#162218] relative">
                <img
                  src={`https://source.unsplash.com/random/400x300/?${crop.cropName.split(' ')[0]},farm`}
                  alt={crop.cropName}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' }}
                />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10">
                  {crop.quantity} Quintals
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-green-400 transition-colors">{crop.cropName}</h3>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      {crop.location}
                    </div>
                    {crop.mobileNumber && (
                      <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {crop.mobileNumber}
                      </div>
                    )}
                  </div>
                  <div className="bg-green-500/10 text-green-400 font-bold px-3 py-1 rounded-lg">
                    ₹{crop.price}<span className="text-[10px] text-green-500/70 font-normal">/quintal</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-600 overflow-hidden">
                      <img src={`https://randomuser.me/api/portraits/men/${crop._id + 10}.jpg`} alt="Farmer" />
                    </div>
                    <span className="text-sm text-gray-400">{crop.farmer}</span>
                  </div>
                  <Link to={`/crop/${crop._id}`} className="text-sm font-semibold text-white hover:text-green-400 transition">View Details →</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
