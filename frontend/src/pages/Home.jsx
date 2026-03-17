import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PublicFooter from "../components/PublicFooter";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#111a13] text-white font-['Inter'] selection:bg-green-500 selection:text-white overflow-x-hidden">
      {/* Navbar */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
          ? "bg-[#111a13]/80 backdrop-blur-md py-4 border-b border-white/10"
          : "bg-transparent py-6"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
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
            <span className="text-xl font-bold tracking-tight">AgriTrade</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <Link to="/market" className="hover:text-green-400 transition">Marketplace</Link>
            <Link to="/logistics" className="hover:text-green-400 transition">Logistics</Link>
            <Link to="/community" className="hover:text-green-400 transition">Community</Link>
            <Link to="/about" className="hover:text-green-400 transition">About Us</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm font-medium hover:text-green-400 transition"
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

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-block mb-6 animate-fade-in-up">
            <span className="bg-green-500/10 text-green-400 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-green-500/20">
              The #1 Platform for Direct Agri-Trading
            </span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in-up delay-100">
            Fair Trade. Direct <br />
            Connections. <span className="text-green-500">Better Harvests.</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 animate-fade-in-up delay-200">
            The transparent marketplace empowering farmers and buyers to trade
            directly without middlemen, ensuring fair prices and fresher produce.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
            <Link
              to="/signup?role=farmer"
              className="w-full sm:w-auto bg-green-500 text-[#111a13] px-8 py-4 rounded-full font-bold text-lg hover:bg-green-400 transition flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Join as Farmer
            </Link>
            <Link
              to="/signup?role=buyer"
              className="w-full sm:w-auto bg-white/5 text-white border border-white/10 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Join as Buyer
            </Link>
          </div>
        </div>

        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#111a13]/80 via-[#111a13]/60 to-[#111a13]"></div>
          <img
            src="/hero-bg.png"
            alt="Farm Field"
            className="w-full h-full object-cover opacity-60"
          />
        </div>
      </section>

      {/* Market Trends Ticker */}
      <div className="border-y border-white/5 bg-[#162218] overflow-hidden py-4 relative">
        <div className="flex items-center gap-2 px-6 mb-2 text-green-400 text-sm font-semibold uppercase tracking-wider">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
          Live Market Trends
        </div>
        <div className="flex gap-8 animate-scroll whitespace-nowrap px-6">
          {/* Duplicate items for infinite scroll illusion */}
          {[...Array(2)].map((_, i) => (
            <React.Fragment key={i}>
              <TrendItem name="Wheat" price="₹2,850 /quintal" change="+2.4%" positive />
              <TrendItem name="Rice (Basmati)" price="₹4,200 /quintal" change="-0.5%" positive={false} />
              <TrendItem name="Soybean" price="₹4,600 /quintal" change="+1.8%" positive />
              <TrendItem name="Coffee (Arabica)" price="₹450 /kg" change="+0.25%" positive />
              <TrendItem name="Cotton" price="₹6,500 /quintal" change="+1.1%" positive />
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Why Choose Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Why Choose AgriTrade?</h2>
            <p className="text-gray-400">
              Whether you are cultivating the land or sourcing the best produce, our platform bridges the gap for a sustainable future.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card
              title="For Farmers"
              desc="Maximize your yield profits with direct access to global buyers. No hidden fees, just fair trade."
              icon={<TractorIcon />}
              features={["Zero middleman commission fees", "Guaranteed payments upon delivery", "Access to logistics & storage partners"]}
              linkText="Start Selling"
            />
            <Card
              title="For Buyers"
              desc="Source high-quality, traceable produce directly from the origin. Ensure quality and consistency."
              icon={<StoreIcon />}
              features={["Farm-to-table traceability", "Verified organic quality checks", "Bulk purchasing discounts"]}
              linkText="Source Produce"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-green-500 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-[#111a13]">
          <div>
            <div className="text-4xl lg:text-5xl font-extrabold mb-2">5,000+</div>
            <div className="font-semibold text-lg opacity-80">Active Farmers</div>
          </div>
          <div className="md:border-x md:border-[#111a13]/20">
            <div className="text-4xl lg:text-5xl font-extrabold mb-2">₹100Cr+</div>
            <div className="font-semibold text-lg opacity-80">Traded Volume</div>
          </div>
          <div>
            <div className="text-4xl lg:text-5xl font-extrabold mb-2">98%</div>
            <div className="font-semibold text-lg opacity-80">Satisfaction Rate</div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-[#162218]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-2">Trusted by the Community</h2>
            <p className="text-gray-400">Hear from the people who are transforming agriculture with us.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Testimonial
              quote="AgriTrade has completely changed how I sell my wheat harvest. I get paid faster and I know exactly where my crops are going."
              author="John Miller"
              role="Wheat Farmer, Kansas"
              image="https://randomuser.me/api/portraits/men/32.jpg"
            />
            <Testimonial
              quote="As a restaurant owner, sourcing fresh, organic ingredients is crucial. This platform makes it incredibly easy to find quality."
              author="Sarah Chen"
              role="Restaurant Owner, Seattle"
              image="https://randomuser.me/api/portraits/women/44.jpg"
            />
            <Testimonial
              quote="The logistics support is a game changer. I don't have to worry about transport. AgriTrade handles the heavy lifting."
              author="David Ross"
              role="Distributor, Chicago"
              image="https://randomuser.me/api/portraits/men/85.jpg"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-[#1a2c20] rounded-3xl p-12 md:p-20 text-center border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 blur-[100px] rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/10 blur-[100px] rounded-full"></div>

          <h2 className="text-3xl md:text-5xl font-bold mb-6 relative z-10">Ready to revolutionize your harvest?</h2>
          <p className="text-gray-400 mb-10 max-w-lg mx-auto relative z-10">
            Join thousands of farmers and buyers creating a more transparent and profitable agricultural ecosystem today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Link to="/signup" className="bg-green-500 text-[#111a13] px-8 py-4 rounded-full font-bold hover:bg-green-400 transition shadow-lg">
              Get Started Now
            </Link>
            <Link to="/marketplace" className="bg-transparent border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-white/5 transition">
              View Marketplace
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}

function TrendItem({ name, price, change, positive }) {
  return (
    <div className="inline-flex items-center gap-4 bg-[#1f2f22] border border-white/5 rounded-full px-5 py-2 min-w-[240px]">
      <div className={`p-1.5 rounded-full ${positive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={positive ? "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" : "M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"} />
        </svg>
      </div>
      <div>
        <div className="text-xs text-gray-400 font-medium">{name}</div>
        <div className="font-bold text-white flex items-center gap-2">
          {price}
          <span className={`text-xs ${positive ? 'text-green-400' : 'text-red-400'}`}>{change}</span>
        </div>
      </div>
    </div>
  )
}

function Card({ title, desc, icon, features, linkText }) {
  return (
    <div className="bg-[#1f2f22] p-8 rounded-3xl border border-white/5 hover:border-green-500/30 transition-all hover:transform hover:-translate-y-1 group">
      <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-6 text-[#111a13] group-hover:scale-110 transition duration-300">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-400 mb-8 leading-relaxed">
        {desc}
      </p>
      <ul className="mb-8 space-y-3">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
            <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
              <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
            </div>
            {f}
          </li>
        ))}
      </ul>
      <Link to="#" className="text-green-400 font-semibold group-hover:gap-2 flex items-center gap-1 transition-all">
        {linkText}
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
      </Link>
    </div>
  )
}

function Testimonial({ quote, author, role, image }) {
  return (
    <div className="bg-[#1f2f22]/50 p-8 rounded-2xl border border-white/5 backdrop-blur-sm">
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
        ))}
      </div>
      <p className="text-gray-300 italic mb-6">"{quote}"</p>
      <div className="flex items-center gap-4">
        <img src={image} alt={author} className="w-10 h-10 rounded-full grayscale opacity-80" />
        <div>
          <div className="font-bold text-sm">{author}</div>
          <div className="text-xs text-gray-500">{role}</div>
        </div>
      </div>
    </div>
  )
}

function TractorIcon() {
  return <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg> // Placeholder for tractor
}

function StoreIcon() {
  return <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
}

function SocialIcon({ d }) {
  return (
    <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-green-500 hover:text-[#111a13] transition">
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} /></svg>
    </a>
  )
}
