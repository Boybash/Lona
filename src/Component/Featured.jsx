import React, { useState, useEffect } from "react";
import spending from "../assets/double-spending.png";
import safeguarding from "../assets/safeguarding.png";
import growth from "../assets/growth.png";
import InvestmentData from "../Component/Data/InvestmentData.jsx";
import CustomSelect from "./CustomSelect.jsx";

const Featured = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [industry, setIndustry] = useState("All Industries");
  const [duration, setDuration] = useState("All Durations");
  const [status, setStatus] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState(InvestmentData);

  const itemsPerPage = 6;

  const industries = [
    "All Industries",
    "Professional Services",
    "Food & Beverages",
    "Transportation",
    "Real Estate",
    "Manufacturing",
    "Technology",
    "Healthcare",
    "Finance",
    "Retail",
  ];
  const durations = [
    "All Durations",
    "6 Months",
    "1 Year",
    "2 Years",
    "3 Years",
    "5 Years",
  ];
  const statuses = ["All Status", "Funding", "Active", "Completed"];

  // 1. Filtering Logic
  useEffect(() => {
    const results = InvestmentData.filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesIndustry =
        industry === "All Industries" || item.industry === industry;
      const matchesDuration =
        duration === "All Durations" || item.duration === duration;
      const matchesStatus = status === "All Status" || item.status === status;

      return (
        matchesSearch && matchesIndustry && matchesDuration && matchesStatus
      );
    });
    setFilteredData(results);
    setCurrentPage(1); // Reset to page 1 whenever filters change
  }, [searchTerm, industry, duration, status]);

  // 2. Pagination Calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section className="flex flex-col font-montserat px-10 py-10 gap-5 w-full">
      {/* Stats Section */}
      <div className="flex flex-col justify-center items-center mt-5">
        <h1 className="uppercase text-[#04684C] text-4xl font-bold mt-5 max-w-[600px] text-center">
          Can help you achieve financial success
        </h1>
      </div>

      <div className="flex justify-around items-center mt-10">
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
          <img className="w-20" src={safeguarding} alt="safeguarding" />
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

      {/* Filter Bar */}
      <div className="flex flex-wrap lg:flex-nowrap justify-between items-end py-10 px-10 bg-[#04684C] rounded-md shadow-md w-full gap-6">
        <div className="w-full lg:flex-1">
          <label className="font-bold text-white text-sm">Search</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for investment opportunities"
            className="bg-white rounded-md p-2 w-full mt-2 text-sm h-[40px] outline-none focus:ring-2 focus:ring-white/50"
          />
        </div>

        <CustomSelect
          label="Industry"
          options={industries}
          selected={industry}
          setSelected={setIndustry}
        />
        <CustomSelect
          label="Duration"
          options={durations}
          selected={duration}
          setSelected={setDuration}
        />
        <CustomSelect
          label="Status"
          options={statuses}
          selected={status}
          setSelected={setStatus}
        />
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center mx-auto max-w-7xl w-full my-10 px-4">
        {currentItems.length > 0 ? (
          currentItems.map((item) => (
            <div
              key={item.id}
              className="border border-gray-300 rounded-md p-5 relative shadow-md hover:shadow-lg transition-all duration-300 w-full bg-white"
            >
              <h2 className="text-xl font-bold text-[#04684C] pr-20 truncate">
                {item.title}
              </h2>
              <p className="text-gray-600 italic text-sm">{item.industry}</p>
              <p className="mt-3 text-sm line-clamp-3">{item.details}</p>

              <div className="mt-4 flex justify-between items-end border-t pt-4">
                <div className="flex flex-col items-center">
                  <span className="text-[10px] uppercase text-gray-400">
                    Amount
                  </span>
                  <span className="font-bold text-[#04684C]">
                    {item.amount}
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[10px] uppercase text-gray-400">
                    Rate
                  </span>
                  <span className="font-bold text-[#04684C]">{item.rate}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[10px] uppercase text-gray-400">
                    Duration
                  </span>
                  <span className="font-bold text-[#04684C]">
                    {item.duration}
                  </span>
                </div>
              </div>

              <div className="absolute top-5 right-3 flex gap-2">
                <span className="bg-[#04684C] text-white text-[10px] font-bold px-2 py-1 rounded">
                  Funding
                </span>
                <span className="bg-[#04684C] text-amber-300 text-[10px] font-bold px-2 py-1 rounded">
                  Active
                </span>
              </div>

              <button className="font-bold mt-6 w-full bg-[#04684C] text-white py-2 px-4 rounded-md hover:bg-[#035d3f] transition-colors">
                Invest Now
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <h2 className="text-2xl font-bold text-gray-400">
              No results match your filters.
            </h2>
            <button
              onClick={() => {
                setSearchTerm("");
                setIndustry("All Industries");
                setStatus("All Status");
                setDuration("All Durations");
              }}
              className="text-[#04684C] underline mt-2 cursor-pointer"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {filteredData.length > itemsPerPage && (
        <div className="flex justify-center items-center gap-4 mt-5">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`bg-[#04684C] text-white py-2 px-8 rounded-md transition-opacity ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[#035d3f]"
            }`}
          >
            Previous
          </button>
          <span className="font-bold text-[#04684C]">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`bg-[#04684C] text-white py-2 px-8 rounded-md transition-opacity ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[#035d3f]"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default Featured;
