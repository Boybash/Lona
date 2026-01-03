import React from "react";

const Step3Review = ({ data }) => (
  <div>
    <h1 className="text-white font-bold text-sm mt-5">Business Information</h1>
    <div className="flex justify-between items-center gap-5 text-gray-300 font-bold mt-5">
      <div className="flex flex-col">
        <p>Business Name:</p>
        <span className="text-sm text-center text-white">
          {" "}
          {data.businessName}
        </span>
      </div>

      <div className="flex flex-col">
        <p>Business Address:</p>
        <span className="text-sm text-center text-white">
          {data.businessAddress}{" "}
        </span>
      </div>

      <div className="flex flex-col">
        <p>Industry:</p>
        <span className="text-sm text-center text-white">{data.industry} </span>
      </div>
    </div>

    <div className="flex flex-col">
      <p className=" text-gray-300 font-bold mt-5">Business Description: </p>
      <span className="text-sm text-left text-white">
        {data.businessDescription}
      </span>
    </div>

    <hr className="text-white mt-5"></hr>

    <div>
      <h1 className="text-white font-bold text-sm mt-5">Funding Details</h1>
      <div className="flex justify-between items-center gap-5 text-gray-300 font-bold mt-5">
        <div className="flex flex-col">
          <p>Funding Amount: </p>
          <span className="text-sm text-center text-white">
            #{data.fundingAmount}
          </span>
        </div>

        <div className="flex flex-col">
          <p>Interest Rate: </p>
          <span className="text-sm text-center text-white">
            {data.interestRate}%
          </span>
        </div>

        <div className="flex flex-col">
          <p>Loan Duration: </p>
          <span className="text-sm text-center text-white">
            {data.loanDuration}
          </span>
        </div>
      </div>

      <div className="flex flex-col">
        <p className=" text-gray-300 font-bold mt-5">Use of Funds: </p>
        <span className="text-sm text-left text-white">{data.useOfFunds}</span>
      </div>
    </div>
  </div>
);

export default Step3Review;
