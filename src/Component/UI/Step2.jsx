import React from "react";
import FormInput from "./FormInput";

const Step2 = ({ data, onChange, errors }) => (
  <div className="flex flex-col justify-center items-center w-full">
    <FormInput
      label="Funding Amount"
      name="fundingAmount"
      value={data.fundingAmount}
      onChange={onChange}
      error={errors.fundingAmount}
      placeholder="50000"
    />
    <FormInput
      label="Interest Rate (%)"
      name="interestRate"
      value={data.interestRate}
      onChange={onChange}
      error={errors.interestRate}
      placeholder="8.5"
    />

    <div className="flex flex-col gap-1 p-2 w-full">
      <label className="text-white font-bold text-sm">Loan Duration</label>
      <select
        name="loanDuration"
        value={data.loanDuration}
        onChange={onChange}
        className="outline-0 w-full p-2 bg-white rounded-md"
      >
        <option value="">Select The Duration</option>
        <option>1 Year</option>
        <option>2 Years</option>
        <option>3 Years</option>
        <option>5 Years</option>
      </select>
      {errors.loanDuration && (
        <p className="text-red-200 text-xs mt-1 font-semibold">
          {errors.loanDuration}
        </p>
      )}
    </div>

    <div className="flex flex-col gap-1 p-2 w-full">
      <label className="text-white font-bold text-sm">Use of Funds</label>
      <textarea
        name="useOfFunds"
        value={data.useOfFunds}
        onChange={onChange}
        className="w-full bg-white p-3 h-[100px] rounded-md outline-0"
        placeholder="Explain how you will use the funds"
      ></textarea>
      {errors.useOfFunds && (
        <p className="text-red-200 text-xs mt-1 font-semibold">
          {errors.useOfFunds}
        </p>
      )}
    </div>
  </div>
);

export default Step2;
