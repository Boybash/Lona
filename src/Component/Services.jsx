import React, { useState } from "react";
import { useEffect } from "react";
import { dataBase } from "../../Firebase";
import { useNavigate } from "react-router-dom";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { SearchContext } from "./SearchContext";
import { useContext } from "react";

const Services = () => {
  const { searchTerm } = useContext(SearchContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("All");
  const navigate = useNavigate();
  const itemsPerPage = 6;
  const [Fundings, setFundings] = useState([]);

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

  const typeFilteredFundings = Fundings.filter((funding) => {
    if (activeFilter === "All") {
      return true;
    }
    return funding.industry === activeFilter;
  });

  const searchFilteredFundings = typeFilteredFundings.filter((funding) => {
    const fundingData =
      `${funding.businessName} ${funding.businessAddress} ${funding.industry} ${funding.fundingAmount} ${funding.interestRate} ${funding.loanDuration} ${funding.loanDuration}`.toLowerCase();
    return fundingData.includes(searchTerm.toLowerCase());
  });

  const itemsToPaginate = searchFilteredFundings;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = itemsToPaginate.slice(indexOfFirstItem, indexOfLastItem);

  function handleNextPage() {
    if (currentPage < Math.ceil(itemsToPaginate.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  }

  function handlePreviousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeFilter]);

  function handleInvestNow(fundingId) {
    navigate(`/fundingdetails/${fundingId}`);
  }
  return (
    <>
      <section className="flex flex-col  bg-[] font-montserat px-10 py-10 gap-5 w-full">
        <div className="flex flex-col mt-3">
          <h1 className="text-[#04684C] text-3xl font-bold">
            Investment Opportunities
          </h1>
          <span className="text-gray-700">
            Browse funding requests from vetted businesses
          </span>
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
          {currentItems.map((funding) => (
            <div
              key={funding.id}
              className="border border-gray-300 rounded-md p-5 mb-5 relative shadow-md hover:shadow-lg transition-shadow duration-300 "
            >
              <h2 className="text-xl font-bold text-[#04684C] w-50">
                {funding.businessName}
              </h2>
              <p className="text-gray-600">{funding.industry}</p>
              <p>{funding.businessAddress}</p>

              <div className="mt-5">
                <p>{funding.businessDescription}</p>
              </div>

              <div className="mt-4 flex justify-between font-semibold">
                <div className="flex flex-col">
                  <h1>Amount:</h1>
                  <span className="font-semibold">{funding.fundingAmount}</span>
                </div>

                <div className="flex flex-col font-semibold">
                  <h1>Rate:</h1>
                  <span className="font-semibold">{funding.interestRate}</span>
                </div>

                <div className="flex flex-col font-semibold">
                  <h1>Duration:</h1>
                  <span className="font-semibold">{funding.loanDuration}</span>
                </div>

                <h1 className="bg-[#04684C] p-2 text-white font-bold absolute top-5 right-3 rounded-md text-sm">
                  Funding
                </h1>
                <h1 className="bg-[#04684C] p-2 text-amber-300 font-bold absolute top-5 right-23 rounded-md text-sm">
                  Active
                </h1>
              </div>
              <button
                onClick={() => {
                  handleInvestNow(funding.id);
                }}
                className=" font-bold mt-4 w-full bg-[#04684C] text-white py-2 px-4 rounded-md cursor-pointer hover:bg-[#035d3f]"
              >
                Invest Now
              </button>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-5 mt-5 max-[600px]:flex-col">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`flex justify-center items-center gap-1 mb-10 bg-[#04684C] py-2 px-4 w-[200px] mx-auto rounded-4xl cursor-pointer max-[600px]:mb-2 ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={indexOfLastItem >= itemsToPaginate.length}
            className={`flex justify-center items-center gap-1 mb-10 bg-[#04684C] py-2 px-4 w-[200px] mx-auto rounded-4xl cursor-pointer ${
              indexOfLastItem >= itemsToPaginate.length
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            Next
          </button>
        </div>
      </section>
    </>
  );
};

export default Services;
