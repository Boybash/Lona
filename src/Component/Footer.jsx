import React from "react";
import Lonalogo from "../assets/Lona Logo.png";
const Footer = () => {
  return (
    <>
      <section className="bg-[#04684C]  w-full px-10 py-5 text-white font-montserat flex flex-col gap-10">
        <div className="flex justify-between items-center">
          <div className=" flex flex-col w-[400px]">
            <img className="w-50" src={Lonalogo} alt="lonalogo" />
            <p>
              Connecting businesses with growth capital through transparent,
              secure peer-to-peer lending.
            </p>
          </div>

          <div className=" flex flex-col gap-2">
            <h1 className="font-bold">Platform</h1>
            <ul className="flex flex-col gap-2">
              <li>Browse Opportunities</li>
              <li>Post Funding Request</li>
              <li>How It Works</li>
              <li>Calculator</li>
            </ul>
          </div>

          <div className=" flex flex-col gap-2">
            <h1 className="font-bold">Company</h1>
            <ul className="flex flex-col gap-2">
              <li>About Us</li>
              <li>Contact</li>
              <li>Careers</li>
              <li>Blog</li>
            </ul>
          </div>
          <div className=" flex flex-col gap-2">
            <h1 className="font-bold">Platform</h1>
            <ul className="flex flex-col gap-2">
              <li>Browse Opportunities</li>
              <li>Post Funding Request</li>
              <li>How It Works</li>
              <li>Calculator</li>
            </ul>
          </div>
          <div className=" flex flex-col gap-2">
            <h1 className="font-bold">Legal</h1>
            <ul className="flex flex-col gap-2">
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
              <li>Risk Disclosure</li>
              <li>Risk Disclosure</li>
            </ul>
          </div>
        </div>

        <div className=" flex justify-between ">
          <p>2024 Lona. All rights reserved.</p>
          <p>Investment involves risk. Capital at risk.</p>
        </div>
      </section>
    </>
  );
};

export default Footer;
