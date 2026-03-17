import React from 'react';
import { Link } from 'react-router-dom';

export default function Logistics() {
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
                    <Link to="/logistics" className="text-white transition">Logistics</Link>
                </div>
                <div className="w-10 h-10 rounded-full bg-green-900 border border-green-500 overflow-hidden">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="w-full h-full object-cover" />
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row items-center justify-between mb-12">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Logistics Solutions</h1>
                        <p className="text-gray-400 max-w-lg">Reliable transport and storage solutions for your harvest. Track shipments and manage supply chains effectively.</p>
                    </div>
                    <button className="mt-4 md:mt-0 bg-green-500 text-[#111a13] px-6 py-3 rounded-full font-bold hover:bg-green-400 transition">
                        Request Quote
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-[#1f2f22] p-8 rounded-3xl border border-white/5">
                        <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 mb-6">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Freight Transport</h3>
                        <p className="text-gray-400 text-sm mb-4">Connect with verified haulers for local and international shipping.</p>
                        <button className="text-green-400 font-bold text-sm">Find Transporters →</button>
                    </div>

                    <div className="bg-[#1f2f22] p-8 rounded-3xl border border-white/5">
                        <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-400 mb-6">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Warehousing</h3>
                        <p className="text-gray-400 text-sm mb-4">Secure storage facilities with climate control options near you.</p>
                        <button className="text-green-400 font-bold text-sm">Locate Warehouses →</button>
                    </div>

                    <div className="bg-[#1f2f22] p-8 rounded-3xl border border-white/5">
                        <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 mb-6">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 011.414.586l5.414 5.414a1 1 0 01.586 1.414V19a2 2 0 01-2 2z" /></svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Customs & Compliance</h3>
                        <p className="text-gray-400 text-sm mb-4">Expert assistance with export documentation and regulations.</p>
                        <button className="text-green-400 font-bold text-sm">Get Support →</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
