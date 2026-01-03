import React from "react";
import spending from "../assets/double-spending.png";
import safegauading from "../assets/safeguarding.png";
import growth from "../assets/growth.png";
import InvestmentData from "../Component/Data/InvestmentData.jsx";
const Featured = () => {
  return (
    <>
      <section className="flex flex-col font-montserat px-10 py-10 gap-5 w-full">
        <div className="flex flex-col justify-center items-center mt-5">
          {/* <h1 className="uppercase bg-[#04684C] p-3 rounded-md text-sm text-white text-center w-fit font-bold">
            Services
          </h1> */}
          <h1 className="uppercase text-[#04684C] text-4xl font-bold mt-5 w-[500px] text-center">
            Can help you achieve financial success
          </h1>
        </div>

        <div className=" flex justify-around items-center mt-10">
          <div className="flex flex-col justify-center items-center gap-2">
            <img className="w-20" src={growth} alt="growth" />
            <h1 className="font-bold text-3xl">#12.5M</h1>
            <p>Total Funded</p>
          </div>

          <div className="flex flex-col justify-center items-center gap-2">
            <img className="w-20" src={spending} alt="spending" />
            <h1 className="font-bold text-3xl">2,400+</h1>
            <p>Active Investors</p>
          </div>

          <div className="flex flex-col justify-center items-center gap-2">
            <img className="w-20" src={safegauading} alt="safeguarding" />
            <h1 className="font-bold text-3xl">850+</h1>
            <p>Trusted Businesses</p>
          </div>
        </div>

        <div className="mt-10">
          <h1 className="text-[#04684C] text-3xl font-bold">
            Featured Opportunities
          </h1>
          <p className="text-gray-700">
            Discover businesses seeking funding right now
          </p>
        </div>

        <div className=" flex justify-between items-center py-10 px-10 bg-[#04684C] rounded-md shadow-md w-full">
          <div>
            <label className="font-bold text-white text-sm">Search</label>
            <input
              type="text"
              placeholder="Search for investment opportunities"
              className="bg-white rounded-md p-2 w-full mt-2.5 outline-0"
            />
          </div>
          <div>
            <label className="font-bold text-white text-sm">Industry</label>
            <select className="bg-white rounded-md p-2 w-full mt-2.5 outline-0">
              <option>All Industries</option>
              <option>Professional Services</option>
              <option>Foond & Beverages</option>
              <option>Transportation</option>
              <option>Real estate</option>
              <option>Manufacturing</option>
              <option>Technology</option>
              <option>Healthcare</option>
              <option>Finance</option>
              <option>Retail</option>
            </select>
          </div>
          <div>
            <label className="font-bold text-white text-sm">Duration</label>
            <select className="bg-white rounded-md p-2 w-full mt-2.5 outline-0">
              <option>6 Months</option>
              <option>1 Year</option>
              <option>2 Years</option>
              <option>3 Years</option>
              <option>5 Years</option>
            </select>
          </div>
          <div>
            <label className="font-bold text-white text-sm">Status</label>
            <select className="bg-white rounded-md p-2 w-full mt-2.5 outline-0">
              <option>All Status</option>
              <option>Funding</option>
              <option>Active</option>
              <option>Completed</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center mx-auto max-w-7xl w-full my-10 px-4">
          {InvestmentData.map((item) => (
            <div
              key={item.id}
              className="border border-gray-300 rounded-md p-5 mb-5 relative shadow-md hover:shadow-lg transition-shadow duration-300 "
            >
              <h2 className="text-xl font-bold text-[#04684C] w-50">
                {item.title}
              </h2>
              <p className="text-gray-600">{item.industry}</p>
              <p className="mt-2">{item.details}</p>
              <div className="mt-4 flex justify-between">
                <span className="font-semibold">Amount: {item.amount}</span>
                <span className="font-semibold">Rate: {item.rate}</span>
                <span className="font-semibold">Duration: {item.duration}</span>
                <h1 className="bg-[#04684C] p-2 text-white font-bold absolute top-5 right-3 rounded-md text-sm">
                  Funding
                </h1>
                <h1 className="bg-[#04684C] p-2 text-amber-300 font-bold absolute top-5 right-23 rounded-md text-sm">
                  Active
                </h1>
              </div>
              <button className=" font-bold mt-4 w-full bg-[#04684C] text-white py-2 px-4 rounded-md cursor-pointer hover:bg-[#035d3f]">
                Invest Now
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Featured;
