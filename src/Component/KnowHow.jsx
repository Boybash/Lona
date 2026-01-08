import React from "react";
const KnowHow = () => {
  return (
    <section
      id="howitworks"
      className="w-full flex flex-col justify-center items-center font-montserat px-6 md:px-10 py-10 gap-5"
    >
      <div className="flex flex-col justify-center items-center max-w-[600px] w-full">
        <h1 className="uppercase text-[#04684C] text-3xl md:text-4xl font-bold mt-2.5 text-center">
          How It Works
        </h1>
        <p className="text-center text-gray-700 mt-2">
          Simple, transparent, and secure process for both businesses and
          investors
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-5 w-full max-w-7xl mx-auto">
        <div className="flex flex-col items-center lg:items-start">
          <h1 className="bg-[#04684C] py-2.5 px-5 w-fit mb-6 rounded-md text-white font-bold self-center lg:self-start">
            For Businesses
          </h1>

          <div className="space-y-5 w-full">
            <div className="border border-gray-300 rounded-md p-5 flex items-start gap-5 w-full">
              <span className="bg-[#04684C] px-4 py-2 rounded-md text-white font-bold shrink-0">
                1
              </span>
              <div>
                <h2 className="font-bold text-lg text-[#04684C]">
                  Create Your Request
                </h2>
                <p className="text-gray-700 text-sm md:text-base">
                  Describe your business, funding needs, and the terms you're
                  offering to investors.
                </p>
              </div>
            </div>

            <div className="border border-gray-300 rounded-md p-5 flex items-start gap-5 w-full">
              <span className="bg-[#04684C] px-4 py-2 rounded-md text-white font-bold shrink-0">
                2
              </span>
              <div>
                <h2 className="font-bold text-lg text-[#04684C]">
                  Connect with Investors
                </h2>
                <p className="text-gray-700 text-sm md:text-base">
                  Receive interest from investors, answer questions, and
                  negotiate terms securely.
                </p>
              </div>
            </div>

            <div className="border border-gray-300 rounded-md p-5 flex items-start gap-5 w-full">
              <span className="bg-[#04684C] px-4 py-2 rounded-md text-white font-bold shrink-0">
                3
              </span>
              <div>
                <h2 className="font-bold text-lg text-[#04684C]">
                  Receive Funding
                </h2>
                <p className="text-gray-700 text-sm md:text-base">
                  Once funded, receive your capital and start growing. Repay
                  according to schedule.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center lg:items-start">
          <h1 className="bg-[#04684C] py-2.5 px-5 w-fit mb-6 rounded-md text-white font-bold self-center lg:self-start">
            For Investors
          </h1>

          <div className="space-y-5 w-full">
            <div className="border border-gray-300 rounded-md p-5 flex items-start gap-5 w-full">
              <span className="bg-[#04684C] px-4 py-2 rounded-md text-white font-bold shrink-0">
                1
              </span>
              <div>
                <h2 className="font-bold text-lg text-[#04684C]">
                  Browse Opportunities
                </h2>
                <p className="text-gray-700 text-sm md:text-base">
                  Explore vetted funding requests from businesses across various
                  industries and sizes.
                </p>
              </div>
            </div>
            <div className="border border-gray-300 rounded-md p-5 flex items-start gap-5 w-full">
              <span className="bg-[#04684C] px-4 py-2 rounded-md text-white font-bold shrink-0">
                2
              </span>
              <div>
                <h2 className="font-bold text-lg text-[#04684C]">
                  Due Diligence
                </h2>
                <p className="text-gray-700 text-sm md:text-base">
                  Review business details, financials, and communicate directly
                  with founders.
                </p>
              </div>
            </div>

            <div className="border border-gray-300 rounded-md p-5 flex items-start gap-5 w-full">
              <span className="bg-[#04684C] px-4 py-2 rounded-md text-white font-bold shrink-0">
                3
              </span>
              <div>
                <h2 className="font-bold text-lg text-[#04684C]">
                  Invest & Earn
                </h2>
                <p className="text-gray-700 text-sm md:text-base">
                  Fund promising businesses and earn competitive returns based
                  on agreed rates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KnowHow;
