import React from "react";
const KnowHow = () => {
  return (
    <section className="w-full flex flex-col justify-center items-center font-montserat px-10 py-10 gap-5">
      <div className="flex flex-col justify-center items-center">
        <h1 className="uppercase text-[#04684C] text-4xl font-bold mt-2.5 w-[500px] text-center">
          How It Works
        </h1>
        <p className="text-center text-gray-700">
          Simple, transparent, and secure process for both businesses and
          investors
        </p>
      </div>

      <div className=" flex justify-around items-center mt-5 w-full px-20">
        <div>
          <h1 className=" bg-[#04684C] py-2.5 px-5 w-fit mb-2.5 rounded-md text-white font-bold">
            For Businesses
          </h1>

          <div className="border border-gray-300 rounded-md p-5 mb-5 flex justify-center items-center gap-5 w-[500px]">
            <span className="bg-[#04684C] px-5 py-2.5 rounded-md text-white font-bold">
              1
            </span>
            <div>
              <h2 className="font-bold text-xm text-[#04684C]">
                Create Your Request
              </h2>
              <p className=" text-gray-700">
                Describe your business, funding needs, and the terms you're
                offering to investors.
              </p>
            </div>
          </div>

          <div className="border border-gray-300 rounded-md p-5 mb-5 flex justify-center items-center gap-5 w-[500px]">
            <span className="bg-[#04684C] px-5 py-2.5 rounded-md text-white font-bold">
              2
            </span>
            <div>
              <h2 className="font-bold text-xm text-[#04684C]">
                Connect with Investors
              </h2>
              <p className=" text-gray-700">
                Receive interest from investors, answer questions, and negotiate
                terms through our secure platform.
              </p>
            </div>
          </div>

          <div className="border border-gray-300 rounded-md p-5 mb-5 flex justify-center items-center gap-5 w-[500px]">
            <span className="bg-[#04684C] px-5 py-2.5 rounded-md text-white font-bold">
              3
            </span>
            <div>
              <h2 className="font-bold text-xm text-[#04684C]">
                Receive Funding
              </h2>
              <p className=" text-gray-700">
                Once funded, receive your capital and start growing. Repay
                according to your agreed schedule.
              </p>
            </div>
          </div>
        </div>
        <div>
          <h1 className=" bg-[#04684C] py-2.5 px-5 w-fit mb-2.5 rounded-md text-white font-bold">
            For Investors
          </h1>
          <div className="border border-gray-300 rounded-md p-5 mb-5 flex justify-center items-center gap-5 w-[500px]">
            <span className="bg-[#04684C] px-5 py-2.5 rounded-md text-white font-bold">
              1
            </span>
            <div>
              <h2 className="font-bold text-xm text-[#04684C]">
                Browse Opportunities
              </h2>
              <p className=" text-gray-700">
                Explore vetted funding requests from businesses across various
                industries and sizes.
              </p>
            </div>
          </div>

          <div className="border border-gray-300 rounded-md p-5 mb-5 flex justify-center items-center gap-5 w-[500px]">
            <span className="bg-[#04684C] px-5 py-2.5 rounded-md text-white font-bold">
              2
            </span>
            <div>
              <h2 className="font-bold text-xm text-[#04684C]">
                Due Diligence
              </h2>
              <p className=" text-gray-700">
                Review business details, financials, and communicate directly
                with founders before investing.
              </p>
            </div>
          </div>

          <div className="border border-gray-300 rounded-md p-5 mb-5 flex justify-center items-center gap-5 w-[500px]">
            <span className="bg-[#04684C] px-5 py-2.5 rounded-md text-white font-bold">
              3
            </span>
            <div>
              <h2 className="font-bold text-xm text-[#04684C]">
                Invest & Earn
              </h2>
              <p className=" text-gray-700">
                Fund promising businesses and earn competitive returns based on
                agreed interest rates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KnowHow;
