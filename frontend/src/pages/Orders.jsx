import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar"; // Using the internal Navbar for this protected-like page

export default function Orders() {
    // Mock data for orders
    const [orders, setOrders] = useState([
        { id: "ORD-2024-001", date: "2024-12-18", status: "Delivered", farmer: "Rajesh Patel", crop: "Wheat (Sharbati)", quantity: "50 Quintals", amount: "₹1,42,500", items: 2 },
        { id: "ORD-2024-002", date: "2024-12-19", status: "Processing", farmer: "Suresh Kumar", crop: "Soybean", quantity: "20 Quintals", amount: "₹92,000", items: 1 },
        { id: "ORD-2024-003", date: "2024-12-20", status: "In Transit", farmer: "Amit Sharma", crop: "Rice (Basmati)", quantity: "100 Quintals", amount: "₹4,20,000", items: 3 },
    ]);

    const getStatusColor = (status) => {
        switch (status) {
            case "Delivered": return "bg-green-500/20 text-green-400";
            case "Processing": return "bg-yellow-500/20 text-yellow-400";
            case "In Transit": return "bg-blue-500/20 text-blue-400";
            case "Cancelled": return "bg-red-500/20 text-red-400";
            default: return "bg-gray-500/20 text-gray-400";
        }
    };

    return (
        <div className="min-h-screen bg-[#111a13] font-['Inter'] text-white">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 py-10">
                <h1 className="text-3xl font-bold mb-8">My Orders</h1>

                <div className="bg-[#1f2f22] rounded-3xl border border-white/5 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-[#162218] text-gray-400 text-sm uppercase tracking-wider border-b border-white/5">
                                    <th className="p-6 font-medium">Order ID</th>
                                    <th className="p-6 font-medium">Date</th>
                                    <th className="p-6 font-medium">Farmer/Seller</th>
                                    <th className="p-6 font-medium">Items</th>
                                    <th className="p-6 font-medium">Total Amount</th>
                                    <th className="p-6 font-medium">Status</th>
                                    <th className="p-6 font-medium">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-white/5 transition">
                                        <td className="p-6 font-medium text-white">{order.id}</td>
                                        <td className="p-6 text-gray-400">{order.date}</td>
                                        <td className="p-6 text-gray-300">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-green-900 flex items-center justify-center text-xs font-bold text-green-400">
                                                    {order.farmer.charAt(0)}
                                                </div>
                                                {order.farmer}
                                            </div>
                                        </td>
                                        <td className="p-6 text-gray-300">
                                            <div>{order.crop}</div>
                                            <div className="text-xs text-gray-500">{order.quantity}</div>
                                        </td>
                                        <td className="p-6 font-medium text-green-400">{order.amount}</td>
                                        <td className="p-6">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="p-6">
                                            <Link to={`/order/${order.id}`} className="text-sm font-medium text-gray-400 hover:text-white transition">
                                                View Details
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {orders.length === 0 && (
                        <div className="p-12 text-center text-gray-500">
                            <p>No orders found.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
