import React from "react";
import { Link } from "react-router-dom";

export default function PublicNavbar() {
    return (
        <nav className="fixed top-0 w-full z-50 bg-[#111a13] border-b border-white/10 py-4 font-['Inter']">
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center rotate-3">
                        <svg
                            className="w-5 h-5 text-[#111a13]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                        </svg>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">AgriTrade</span>
                </Link>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
                    <Link to="/market" className="hover:text-green-400 transition">
                        Marketplace
                    </Link>
                    <Link to="/logistics" className="hover:text-green-400 transition">
                        Logistics
                    </Link>
                    <Link to="/community" className="hover:text-green-400 transition">
                        Community
                    </Link>
                    <Link to="/about" className="hover:text-green-400 transition">
                        About Us
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <Link
                        to="/login"
                        className="text-white text-sm font-medium hover:text-green-400 transition"
                    >
                        Log In
                    </Link>
                    <Link
                        to="/signup"
                        className="bg-green-500 text-[#111a13] px-5 py-2.5 rounded-full text-sm font-bold hover:bg-green-400 transition shadow-[0_0_20px_rgba(74,222,128,0.3)]"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </nav>
    );
}
