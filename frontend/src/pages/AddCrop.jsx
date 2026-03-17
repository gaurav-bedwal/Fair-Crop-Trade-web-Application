import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddCrop() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: "",
    cropName: "",
    variety: "",
    quantity: "",
    unit: "Quintals",
    price: "",
    harvestDate: "",
    description: "",
    logistics: "buyer-pickup",
    location: "Green Valley Farms, KS", // Default or empty
    mobileNumber: "",
    farmerName: ""
  });

  const [activeLogistics, setActiveLogistics] = useState("buyer-pickup");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogisticsSelect = (type) => {
    setActiveLogistics(type);
    setFormData({ ...formData, logistics: type });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      // Construct payload to match backend expectation + extra fields
      // Backend expects: farmer, cropName, quantity, price, location
      // We will send everything; Mongoose will ignore extras unless schema is updated,
      // but at least cropName, quantity, price will be saved.
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });
      // Use logged-in user name from localStorage, or form input as fallback
      const loggedInUserName = localStorage.getItem("userName");
      data.set("farmer", loggedInUserName || formData.farmerName || "Unknown Farmer");
      data.set("quantity", Number(formData.quantity));
      data.set("price", Number(formData.price));

      if (imageFile) {
        data.append("image", imageFile);
      }

      await axios.post("http://localhost:5000/api/crops/add", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Crop listed successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error adding crop:", error);
      alert("Failed to add crop. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111a13] font-['Inter'] text-white pb-24">
      {/* Navbar Placeholder */}
      <nav className="border-b border-white/5 bg-[#0d140f] py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center rotate-3">
            <svg className="w-5 h-5 text-[#111a13]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight">FairHarvest</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-gray-400 font-medium">
          <Link to="/dashboard" className="hover:text-green-400">Dashboard</Link>
          <Link to="/marketplace" className="hover:text-green-400">Marketplace</Link>
          <Link to="/my-listings" className="hover:text-green-400">My Listings</Link>
          <Link to="/messages" className="hover:text-green-400">Messages</Link>
          <div className="w-8 h-8 rounded-full bg-green-900 border border-green-500 overflow-hidden">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="w-full h-full object-cover" />
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">Add New Crop Listing</h1>
            <p className="text-gray-400">Fill in the details below to post your harvest to the marketplace.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/dashboard" className="px-6 py-2.5 rounded-full border border-white/10 text-sm font-semibold hover:bg-white/5 transition">
              Cancel
            </Link>
            <button className="px-6 py-2.5 rounded-full border border-green-500 text-green-400 text-sm font-semibold hover:bg-green-500/10 transition">
              Save Draft
            </button>
          </div>
        </div>

        {/* Form Sections */}
        <div className="space-y-6">

          {/* Section 1: Crop Details */}
          <div className="bg-[#1f2f22] p-8 rounded-3xl border border-white/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-[#111a13]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              </div>
              <h3 className="font-bold text-lg">Crop Details</h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm text-gray-300 font-medium mb-2">Select Crop Category</label>
                <div className="relative">
                  <select
                    name="category"
                    value={formData.category} // Bind value
                    onChange={handleChange}
                    className="w-full bg-[#162218] border border-white/10 rounded-xl px-4 py-3 appearance-none text-white focus:outline-none focus:border-green-500"
                  >
                    <option value="">Select a category...</option>
                    <option value="grains">Grains (Wheat, Corn, Rice)</option>
                    <option value="vegetables">Vegetables</option>
                    <option value="fruits">Fruits</option>
                    <option value="coffee">Coffee</option>
                  </select>
                  <div className="absolute right-4 top-3.5 pointer-events-none text-gray-500">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-300 font-medium mb-2">Specific Crop Name</label>
                  <input
                    type="text"
                    name="cropName"
                    value={formData.cropName} // Bind value
                    onChange={handleChange}
                    placeholder="e.g. Wheat"
                    className="w-full bg-[#162218] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 placeholder-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 font-medium mb-2">Variety (Optional)</label>
                  <input
                    type="text"
                    name="variety"
                    value={formData.variety} // Bind value
                    onChange={handleChange}
                    placeholder="e.g. Red Winter"
                    className="w-full bg-[#162218] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 placeholder-gray-600"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Inventory */}
          <div className="bg-[#1f2f22] p-8 rounded-3xl border border-white/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-[#111a13]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
              </div>
              <h3 className="font-bold text-lg">Inventory & Pricing</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm text-gray-300 font-medium mb-2">Total Quantity</label>
                <div className="flex">
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full bg-[#162218] border border-white/10 rounded-l-xl px-4 py-3 focus:outline-none focus:border-green-500 placeholder-gray-600"
                  />
                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    className="bg-[#162218] border-y border-r border-white/10 rounded-r-xl px-3 text-sm text-gray-400 focus:outline-none hover:bg-white/5"
                  >
                    <option value="Quintals">Quintals</option>
                    <option value="Kg">Kg</option>
                    <option value="Tonnes">Tonnes</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-300 font-medium mb-2">Price Per Unit</label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-gray-500">₹</span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="w-full bg-[#162218] border border-white/10 rounded-xl px-4 pl-8 py-3 focus:outline-none focus:border-green-500 placeholder-gray-600"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-300 font-medium mb-2">Harvest Date</label>
                <input
                  type="date"
                  name="harvestDate"
                  value={formData.harvestDate}
                  onChange={handleChange}
                  className="w-full bg-[#162218] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 text-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Media */}
          <div className="bg-[#1f2f22] p-8 rounded-3xl border border-white/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-[#111a13]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <h3 className="font-bold text-lg">Media & Description</h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm text-gray-300 font-medium mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Describe quality, farming method (e.g. Organic, Conventional), and any other relevant details."
                  className="w-full bg-[#162218] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 placeholder-gray-600 resize-none"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm text-gray-300 font-medium mb-2">Crop Images</label>
                <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center bg-[#162218]/50 hover:bg-[#162218] hover:border-green-500/50 transition cursor-pointer relative">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept="image/*"
                  />
                  <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                  </div>
                  <p className="text-gray-300 font-medium">{imageFile ? imageFile.name : "Click to upload or drag and drop"}</p>
                  <p className="text-gray-600 text-xs mt-1">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Logistics */}
          <div className="bg-[#1f2f22] p-8 rounded-3xl border border-white/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-[#111a13]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
              </div>
              <h3 className="font-bold text-lg">Logistics</h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm text-gray-300 font-medium mb-4">Delivery Preference</label>
                <div className="grid md:grid-cols-3 gap-4">
                  <LogisticsOption
                    icon="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" // Filter like icon for pickup
                    title="Buyer Pickup"
                    desc="Buyer arranges transport from your farm."
                    active={activeLogistics === 'buyer-pickup'}
                    onClick={() => handleLogisticsSelect('buyer-pickup')}
                  />
                  <LogisticsOption
                    icon="M13 10V3L4 14h7v7l9-11h-7z" // Lightning bolt placeholder
                    svgIcon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} /></svg>} // Swap to correct icon if needed
                    title="Farmer Delivery"
                    desc="You deliver to the buyer's location."
                    active={activeLogistics === 'farmer-delivery'}
                    onClick={() => handleLogisticsSelect('farmer-delivery')}
                    customIcon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>}
                  />
                  <LogisticsOption
                    title="Third-party Logistics"
                    desc="Use platform logistics partners."
                    active={activeLogistics === 'third-party'}
                    onClick={() => handleLogisticsSelect('third-party')}
                    customIcon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-300 font-medium mb-4">Contact & Location</label>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm text-gray-400 font-medium mb-2">Farmer Name</label>
                    <input
                      type="text"
                      name="farmerName"
                      value={formData.farmerName}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className="w-full bg-[#162218] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 placeholder-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 font-medium mb-2">Farm Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. Green Valley Farms, KS"
                      className="w-full bg-[#162218] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 placeholder-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 font-medium mb-2">Mobile Number</label>
                    <input
                      type="tel"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#162218] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 placeholder-gray-600"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="mt-10 border-t border-white/5 pt-8 flex items-center justify-between">
          <div className="text-sm text-gray-500">Draft saved 2 mins ago</div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-green-500 text-[#111a13] font-bold px-8 py-3 rounded-full hover:bg-green-400 transition shadow-[0_0_20px_rgba(74,222,128,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Publishing..." : "Publish Listing"}
          </button>
        </div>

      </div>
    </div>
  );
}

function LogisticsOption({ title, desc, active, onClick, customIcon }) {
  return (
    <div
      onClick={onClick}
      className={`p-5 rounded-2xl border cursor-pointer transition-all ${active ? 'bg-green-500/10 border-green-500' : 'bg-[#162218] border-white/10 hover:border-white/20'}`}
    >
      <div className="flex justify-between items-start mb-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${active ? 'bg-green-500 text-[#111a13]' : 'bg-white/5 text-gray-400'}`}>
          {customIcon ? customIcon : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg> // default archive icon
          )}
        </div>
        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${active ? 'border-green-500' : 'border-gray-600'}`}>
          {active && <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>}
        </div>
      </div>
      <h4 className={`font-bold text-sm mb-1 ${active ? 'text-white' : 'text-gray-300'}`}>{title}</h4>
      <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
    </div>
  )
}
