import React from "react";
import PublicNavbar from "../components/PublicNavbar";
import PublicFooter from "../components/PublicFooter";

export default function CookiePolicy() {
    return (
        <div className="min-h-screen bg-[#111a13] text-white font-['Inter'] selection:bg-green-500 selection:text-white">
            <PublicNavbar />

            <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
                <p className="text-gray-400 mb-8">Last Updated: December 20, 2024</p>

                <div className="space-y-8 text-gray-300 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">What Are Cookies?</h2>
                        <p>
                            Cookies are small text files that are placed on your computer or mobile device by websites that you visit. They are widely used in order to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">How We Use Cookies</h2>
                        <p className="mb-4">
                            We use cookies for the following purposes:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Necessary Cookies:</strong> These are essential for you to browse the website and use its features, such as accessing secure areas of the site.</li>
                            <li><strong>Analytics Cookies:</strong> These allow us to recognize and count the number of visitors and to see how visitors move around our website when they are using it.</li>
                            <li><strong>Functionality Cookies:</strong> These are used to recognize you when you return to our website, enabling us to personalize our content for you.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Managing Cookies</h2>
                        <p>
                            Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit www.aboutcookies.org or www.allaboutcookies.org.
                        </p>
                    </section>
                </div>
            </div>

            <PublicFooter />
        </div>
    );
}
