import React from "react";
import FormInput from "./FormInput";

const Step1 = ({ data, onChange, errors }) => (
  <div className="flex flex-col justify-center items-center w-full">
    <FormInput
      label="Business Name"
      name="businessName"
      value={data.businessName}
      onChange={onChange}
      error={errors.businessName}
      placeholder="Enter your business name"
    />
    <FormInput
      label="Business Address"
      name="businessAddress"
      value={data.businessAddress}
      onChange={onChange}
      error={errors.businessAddress}
      placeholder="Enter your business address"
    />

    <div className="flex flex-col gap-1 p-2 w-full">
      <label className="text-white font-bold text-sm">Industry</label>
      <select
        name="industry"
        value={data.industry}
        onChange={onChange}
        className="outline-0 w-full p-2 bg-white rounded-md"
      >
        <option value="">Select Your Industry</option>
        <option>Professional Services</option>
        <option>Food & Beverages</option>
        <option>Transportation</option>
        <option>Real estate</option>
        <option>Manufacturing</option>
        <option>Technology</option>
        <option>Healthcare</option>
        <option>Finance</option>
        <option>Retail</option>
      </select>
      {errors.industry && (
        <p className="text-red-200 text-xs mt-1 font-semibold">
          {errors.industry}
        </p>
      )}
    </div>

    <div className="flex flex-col gap-1 p-2 w-full">
      <label className="text-white font-bold text-sm">
        Business Description
      </label>
      <textarea
        name="businessDescription"
        value={data.businessDescription}
        onChange={onChange}
        className="w-full bg-white p-3 h-[100px] rounded-md outline-0"
        placeholder="Describe your business"
      ></textarea>
      {errors.businessDescription && (
        <p className="text-red-200 text-xs mt-1 font-semibold">
          {errors.businessDescription}
        </p>
      )}
    </div>
  </div>
);

export default Step1;
