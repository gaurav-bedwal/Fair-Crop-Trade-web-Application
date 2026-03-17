import React from "react";
import PublicNavbar from "../components/PublicNavbar";
import PublicFooter from "../components/PublicFooter";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-[#111a13] text-white font-['Inter'] selection:bg-green-500 selection:text-white">
            <PublicNavbar />

            <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
                <p className="text-gray-400 mb-8">Last Updated: December 20, 2024</p>

                <div className="space-y-8 text-gray-300 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
                        <p>
                            AgriTrade ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
                        <p className="mb-4">
                            We may collect information about you in a variety of ways. The information we may collect includes:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Personal Data:</strong> Name, email address, phone number, and address when you register.</li>
                            <li><strong>Financial Data:</strong> Data related to your payment method (e.g., valid credit card number, card brand, expiration date) when you purchase, order, return, exchange or request information about our services.</li>
                            <li><strong>Farm/Business Data:</strong> Information about your crops, harvest yields, and listing details.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Use of Your Information</h2>
                        <p>
                            We use the information we collect to operate, maintain, and improve our services, including processing transactions, verifying user identity, providing customer support, and communicating with you about updates or offers.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Sharing of Your Information</h2>
                        <p>
                            We do not sell your personal data. We may share information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. Security of Your Information</h2>
                        <p>
                            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
                        </p>
                    </section>
                </div>
            </div>

            <PublicFooter />
        </div>
    );
}
