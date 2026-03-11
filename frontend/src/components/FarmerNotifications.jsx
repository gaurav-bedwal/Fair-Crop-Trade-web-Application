import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function FarmerNotifications({ farmerName }) {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    const fetchNotifications = async () => {
        if (!farmerName) return;
        try {
            const response = await axios.get(`http://localhost:5000/api/notifications/farmer/${encodeURIComponent(farmerName)}`);
            setNotifications(response.data);
        } catch (error) {
            console.error("Error fetching farmer notifications:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUnreadCount = async () => {
        if (!farmerName) return;
        try {
            const response = await axios.get(`http://localhost:5000/api/notifications/unread-count/${encodeURIComponent(farmerName)}`);
            setUnreadCount(response.data.count);
        } catch (error) {
            console.error("Error fetching unread count:", error);
        }
    };

    const markAsRead = async () => {
        try {
            await axios.put("http://localhost:5000/api/notifications/mark-read");
            setUnreadCount(0);
        } catch (error) {
            console.error("Error marking as read:", error);
        }
    };

    useEffect(() => {
        fetchNotifications();
        fetchUnreadCount();
        const interval = setInterval(() => {
            fetchNotifications();
            fetchUnreadCount();
        }, 10000);
        return () => clearInterval(interval);
    }, [farmerName]);

    const handleBellClick = () => {
        if (!isOpen) {
            markAsRead();
        }
        setIsOpen(!isOpen);
    };

    const formatTimeAgo = (dateString) => {
        const now = new Date();
        const date = new Date(dateString);
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        return `${diffDays}d ago`;
    };

    return (
        <div className="relative">
            {/* Bell Icon Button */}
            <button
                onClick={handleBellClick}
                className="relative p-2 rounded-full hover:bg-white/5 transition"
                title="Bids on Your Crops"
            >
                <svg className="w-6 h-6 text-yellow-400 hover:text-yellow-300 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full text-[10px] font-bold text-black flex items-center justify-center animate-pulse">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {/* Dropdown Panel */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-96 bg-[#1f2f22] border border-yellow-500/20 rounded-2xl shadow-2xl z-50 overflow-hidden">
                    {/* Header */}
                    <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between bg-[#162218]">
                        <h3 className="font-bold text-white flex items-center gap-2">
                            <svg className="w-5 h-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Bids on Your Crops
                        </h3>
                        <span className="text-xs text-gray-400">{notifications.length} bids</span>
                    </div>

                    {/* Notifications List */}
                    <div className="max-h-96 overflow-y-auto">
                        {loading ? (
                            <div className="p-8 text-center text-gray-500">
                                <div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                                Loading...
                            </div>
                        ) : notifications.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">
                                <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                No bids on your crops yet
                            </div>
                        ) : (
                            notifications.map((notif) => (
                                <Link
                                    key={notif._id}
                                    to={`/crop/${notif.cropId}`}
                                    onClick={() => setIsOpen(false)}
                                    className="block px-4 py-3 border-b border-white/5 hover:bg-white/5 transition"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-white font-bold shrink-0">
                                            {notif.user?.charAt(0) || 'B'}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-400">
                                                    New Bid!
                                                </span>
                                            </div>
                                            <p className="text-sm text-white">
                                                <span className="font-bold text-yellow-400">{notif.user}</span>
                                                <span className="text-gray-400"> wants to buy your </span>
                                                <span className="font-bold text-white">{notif.cropName}</span>
                                            </p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-green-500 font-bold text-lg">${Number(notif.amount).toFixed(2)}</span>
                                                <span className="text-gray-500 text-xs">/ ton</span>
                                            </div>
                                            {notif.userMobile && (
                                                <div className="flex items-center gap-2 mt-2 bg-green-500/10 border border-green-500/20 px-3 py-2 rounded-lg">
                                                    <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                    </svg>
                                                    <span className="text-green-400 font-bold">{notif.userMobile}</span>
                                                </div>
                                            )}
                                        </div>
                                        <span className="text-xs text-gray-500 shrink-0">
                                            {formatTimeAgo(notif.createdAt)}
                                        </span>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    {notifications.length > 0 && (
                        <div className="px-4 py-3 border-t border-white/10 bg-[#162218]">
                            <Link
                                to="/my-listings"
                                onClick={() => setIsOpen(false)}
                                className="text-yellow-400 text-sm font-medium hover:text-yellow-300 flex items-center justify-center gap-1"
                            >
                                View My Listings
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
