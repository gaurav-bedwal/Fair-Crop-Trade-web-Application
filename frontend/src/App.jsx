import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AddCrop from "./pages/AddCrop";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Contact from "./pages/Contact";
import MyListings from "./pages/MyListings";
import CropDetails from "./pages/CropDetails";
import Farmers from "./pages/Farmers";
import Logistics from "./pages/Logistics";
import Auctions from "./pages/Auctions";

import AboutUs from "./pages/AboutUs";
import Careers from "./pages/Careers";
import Blog from "./pages/Blog";
import Community from "./pages/Community";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiePolicy from "./pages/CookiePolicy";
import TermsOfService from "./pages/TermsOfService";
import Orders from "./pages/Orders";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-crop" element={<AddCrop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/community" element={<Community />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/my-listings" element={<MyListings />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/crop/:id" element={<CropDetails />} />
        <Route path="/farmers" element={<Farmers />} />
        <Route path="/logistics" element={<Logistics />} />
        <Route path="/auctions" element={<Auctions />} />
      </Routes>
    </BrowserRouter>
  );
}
