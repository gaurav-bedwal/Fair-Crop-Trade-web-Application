import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-green-700">
        🌾 FairTrade Agri
      </h1>

      <div className="space-x-6 font-medium">
        <Link className="hover:text-green-700" to="/dashboard">Dashboard</Link>
        <Link className="hover:text-green-700" to="/add-crop">Add Crop</Link>
        <Link className="hover:text-green-700" to="/orders">Orders</Link>
        <Link className="hover:text-red-500" to="/">Logout</Link>
      </div>
    </nav>
  );
}
