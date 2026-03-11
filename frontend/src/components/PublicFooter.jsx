import React from "react";
import { Link } from "react-router-dom";

export default function PublicFooter() {
    return (
        <footer className="border-t border-white/10 pt-16 pb-8 px-6 bg-[#0d140f] text-sm font-['Inter'] text-white">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
                <div className="col-span-2">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center rotate-3">
                            <svg
                                className="w-3 h-3 text-[#111a13]"
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
                        <span className="text-xl font-bold">AgriTrade</span>
                    </div>
                    <p className="text-gray-500 max-w-xs mb-6">
                        Empowering the agricultural community through technology,
                        transparency, and trust.
                    </p>
                    <div className="flex gap-4">
                        <SocialIcon d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        <SocialIcon d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                        <SocialIcon d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                    </div>
                </div>

                <div>
                    <h4 className="font-bold mb-4 uppercase text-xs tracking-wider text-gray-400">
                        Platform
                    </h4>
                    <ul className="space-y-3 text-gray-500">
                        <li>
                            <Link to="/market" className="hover:text-green-400">
                                Browse Crops
                            </Link>
                        </li>
                        <li>
                            <Link to="/signup?role=farmer" className="hover:text-green-400">
                                Sell Produce
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="hover:text-green-400">
                                Pricing
                            </Link>
                        </li>
                        <li>
                            <Link to="/logistics" className="hover:text-green-400">
                                Logistics
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-4 uppercase text-xs tracking-wider text-gray-400">
                        Company
                    </h4>
                    <ul className="space-y-3 text-gray-500">
                        <li>
                            <Link to="/about" className="hover:text-green-400">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link to="/careers" className="hover:text-green-400">
                                Careers
                            </Link>
                        </li>
                        <li>
                            <Link to="/blog" className="hover:text-green-400">
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:text-green-400">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-4 uppercase text-xs tracking-wider text-gray-400">
                        Legal
                    </h4>
                    <ul className="space-y-3 text-gray-500">
                        <li>
                            <Link to="/terms-of-service" className="hover:text-green-400">
                                Terms of Service
                            </Link>
                        </li>
                        <li>
                            <Link to="/privacy-policy" className="hover:text-green-400">
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link to="/cookie-policy" className="hover:text-green-400">
                                Cookie Policy
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-gray-600 text-xs">
                <p>© 2024 AgriTrade Inc. All rights reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <span>Certified Fair Trade</span>
                    <span>Organic Certified</span>
                </div>
            </div>
        </footer>
    );
}

function SocialIcon({ d }) {
    return (
        <a
            href="#"
            className="p-2 bg-white/5 rounded-full hover:bg-green-500 hover:text-[#111a13] transition"
        >
            <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={d}
                />
            </svg>
        </a>
    );
}
