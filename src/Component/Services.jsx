import React, { useState, useEffect, useContext, Fragment } from "react";
import { dataBase } from "../../Firebase";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { SearchContext } from "./SearchContext";
import CustomSelect from "./CustomSelect";

const Services = () => {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [Fundings, setFundings] = useState([]);

  const [industry, setIndustry] = useState("All Industries");
  const [duration, setDuration] = useState("All Durations");
  const [status, setStatus] = useState("All Status");

  const navigate = useNavigate();
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

  useEffect(() => {
    const fetchFundings = async () => {
      const querySnapshot = await getDocs(
        collection(dataBase, "fundingRequests")
      );
      const fundingData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFundings(fundingData);
    };
    fetchFundings();
  }, []);

  const filteredFundings = Fundings.filter((funding) => {
    const matchesIndustry =
      industry === "All Industries" || funding.industry === industry;
    const matchesStatus = status === "All Status" || funding.status === status;
    const matchesDuration =
      duration === "All Durations" || funding.loanDuration === duration;

    const combinedData =
      `${funding.businessName} ${funding.businessAddress} ${funding.industry}`.toLowerCase();
    const matchesSearch = combinedData.includes(searchTerm.toLowerCase());

    return matchesIndustry && matchesStatus && matchesDuration && matchesSearch;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFundings.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredFundings.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, industry, duration, status]);

  const handleInvestNow = (fundingId) => {
    navigate(`/fundingdetails/${fundingId}`);
  };

  return (
    <section className="flex flex-col font-montserat px-10 py-10 gap-5 w-full">
      <div className="flex flex-col mt-3">
        <h1 className="text-[#04684C] text-3xl font-bold">
          Investment Opportunities
        </h1>
        <span className="text-gray-700">
          Browse funding requests from vetted businesses
        </span>
      </div>

      <div className="flex flex-wrap lg:flex-nowrap justify-between items-end py-10 px-10 bg-[#04684C] rounded-md shadow-md w-full gap-6">
        <div className="w-full lg:flex-1">
          <label className="font-bold text-white text-sm">Search</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for investment opportunities"
            className="bg-white rounded-md p-2 w-full mt-2.5 outline-0 h-[40px] text-sm"
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center mx-auto max-w-7xl w-full my-10 px-4">
        {currentItems.length > 0 ? (
          currentItems.map((funding) => (
            <div
              key={funding.id}
              className="border border-gray-300 rounded-md p-5 relative shadow-md hover:shadow-lg transition-shadow duration-300 w-full bg-white"
            >
              <h2 className="text-xl font-bold text-[#04684C] pr-10 truncate w-[250px]">
                {funding.businessName}
              </h2>
              <p className="text-gray-600 text-sm italic">{funding.industry}</p>
              <p className="text-xs text-gray-500">{funding.businessAddress}</p>

              <div className="mt-5 h-5  overflow-hidden text-sm">
                <p className="line-clamp-3">{funding.businessDescription}</p>
              </div>

              <div className="mt-4 flex justify-between items-end border-t pt-4">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase text-gray-400 text-center">
                    Amount
                  </span>
                  <span className="font-bold text-[#04684C] max-[420px]:truncate w-[70px]">
                    #{funding.fundingAmount}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase text-gray-400 text-center">
                    Rate
                  </span>
                  <span className="font-bold text-[#04684C]">
                    {funding.interestRate}% APR
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase text-gray-400 text-center">
                    Duration
                  </span>
                  <span className="font-bold text-[#04684C]">
                    {funding.loanDuration}
                  </span>
                </div>
              </div>

              <span className="absolute top-5 right-3 bg-[#04684C] text-white text-[10px] font-bold px-2 py-1 rounded">
                {funding.status || "Funding"}
              </span>

              <button
                onClick={() => handleInvestNow(funding.id)}
                className="font-bold mt-6 w-full bg-[#04684C] text-white py-2 px-4 rounded-md hover:bg-[#035d3f] cursor-pointer transition-colors"
              >
                Invest Now
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <h2 className="text-2xl font-bold text-gray-400">
              No investment opportunities match your filters.
            </h2>
            <button
              onClick={() => {
                setSearchTerm("");
                setIndustry("All Industries");
                setStatus("All Status");
                setDuration("All Duration");
              }}
              className="text-[#04684C] underline mt-2 cursor-pointer"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {filteredFundings.length > itemsPerPage && (
        <div className="flex justify-center items-center gap-4 mt-5">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`bg-[#04684C] text-white py-2 px-8 rounded-md ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[#035d3f]"
            }`}
          >
            Previous
          </button>
          <span className="font-bold text-[#04684C]">Page {currentPage}</span>
          <button
            onClick={handleNextPage}
            disabled={indexOfLastItem >= filteredFundings.length}
            className={`bg-[#04684C] text-white py-2 px-8 rounded-md ${
              indexOfLastItem >= filteredFundings.length
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

export default Services;
