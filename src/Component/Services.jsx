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
const Services = () => {
  const navigate = useNavigate();
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
          {Fundings.map((funding) => (
            <div
              key={funding.id}
              className="border border-gray-300 rounded-md p-5 mb-5 relative shadow-md hover:shadow-lg transition-shadow duration-300 "
            >
              <h2 className="text-xl font-bold text-[#04684C] w-50">
                {funding.businessName}
              </h2>
              <p className="text-gray-600">{funding.industry}</p>
              <p className="mt-2">{funding.businessAddress}</p>

              <div className="mt-4 flex justify-between">
                <span className="font-semibold">
                  Amount: {funding.fundingAmount}
                </span>
                <span className="font-semibold">
                  Rate: {funding.interestRate}
                </span>
                <span className="font-semibold">
                  Duration: {funding.loanDuration}
                </span>
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
      </section>
    </>
  );
};

export default Services;
