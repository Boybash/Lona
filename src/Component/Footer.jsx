import React from "react";
import Lonalogo from "../assets/Lona Logo.png";
const Footer = () => {
  return (
    <>
      <section
        id="footer"
        className="bg-[#04684C] w-full px-6 md:px-10 py-10 md:py-16 text-white font-montserat flex flex-col gap-12"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-8">
          <div className="flex flex-col gap-4 lg:col-span-1 sm:col-span-2">
            <img className="lg:w-30 md:w-20" src={Lonalogo} alt="lonalogo" />
            <p className="text-sm md:text-base opacity-90 max-w-sm">
              Connecting businesses with growth capital through transparent,
              secure peer-to-peer lending.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-lg">Platform</h1>
            <ul className="flex flex-col gap-3 text-sm md:text-base opacity-80">
              <li className="hover:text-emerald-200 cursor-pointer transition-colors">
                Browse Opportunities
              </li>
              <li className="hover:text-emerald-200 cursor-pointer transition-colors">
                Post Funding Request
              </li>
              <li className="hover:text-emerald-200 cursor-pointer transition-colors">
                How It Works
              </li>
              <li className="hover:text-emerald-200 cursor-pointer transition-colors">
                Calculator
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-lg">Company</h1>
            <ul className="flex flex-col gap-3 text-sm md:text-base opacity-80">
              <li className="hover:text-emerald-200 cursor-pointer transition-colors">
                About Us
              </li>
              <li className="hover:text-emerald-200 cursor-pointer transition-colors">
                Contact
              </li>
              <li className="hover:text-emerald-200 cursor-pointer transition-colors">
                Careers
              </li>
              <li className="hover:text-emerald-200 cursor-pointer transition-colors">
                Blog
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-lg">Support</h1>
            <ul className="flex flex-col gap-3 text-sm md:text-base opacity-80">
              <li className="hover:text-emerald-200 cursor-pointer transition-colors">
                Help Center
              </li>
              <li className="hover:text-emerald-200 cursor-pointer transition-colors">
                Investor FAQ
              </li>
              <li className="hover:text-emerald-200 cursor-pointer transition-colors">
                Founder FAQ
              </li>
              <li className="hover:text-emerald-200 cursor-pointer transition-colors">
                Safety
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-lg">Legal</h1>
            <ul className="flex flex-col gap-3 text-sm md:text-base opacity-80">
              <li className="hover:text-emerald-200 cursor-pointer transition-colors">
                Terms of Service
              </li>
              <li className="hover:text-emerald-200 cursor-pointer transition-colors">
                Privacy Policy
              </li>
              <li className="hover:text-emerald-200 cursor-pointer transition-colors">
                Risk Disclosure
              </li>
              <li className="hover:text-emerald-200 cursor-pointer transition-colors">
                Cookie Policy
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 gap-4 text-xs md:text-sm opacity-60 text-center md:text-left">
          <p>© 2026 Lona. All rights reserved.</p>
          <p>Investment involves risk. Capital at risk.</p>
        </div>
      </section>
    </>
  );
};

export default Footer;
