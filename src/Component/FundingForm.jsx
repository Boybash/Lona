import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import * as yup from "yup";
import { collection, addDoc } from "firebase/firestore";
import { auth, dataBase } from "../../Firebase";
import BussinessLogo from "../assets/business_11692299.png";

// --- SUB-COMPONENTS ---

const FormInput = ({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
}) => (
  <div className="flex flex-col gap-1 p-2 w-full font-montserat">
    <label className="text-white font-bold text-sm">{label}</label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      className={`outline-0 w-full p-2 bg-white rounded-md border-2 ${
        error ? "border-red-400" : "border-transparent"
      }`}
    />
    {error && (
      <p className="text-red-200 text-xs mt-1 font-semibold">{error}</p>
    )}
  </div>
);

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
        <option>Foond & Beverages</option>
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

// --- MAIN COMPONENT ---

const FundingForm = () => {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submission, setSubmission] = useState(null);
  const location = useLocation();

  const [fundingData, setFundingData] = useState({
    businessName: "",
    businessAddress: "",
    industry: "",
    businessDescription: "",
    fundingAmount: "",
    interestRate: "",
    loanDuration: "",
    useOfFunds: "",
  });

  const fundingSchema = yup.object().shape({
    businessName: yup.string().required("Required"),
    businessAddress: yup.string().required("Required"),
    industry: yup.string().required("Required"),
    businessDescription: yup.string().required("Required"),
    fundingAmount: yup
      .number()
      .typeError("Must be a number")
      .positive()
      .required("Required"),
    interestRate: yup
      .number()
      .typeError("Must be a number")
      .positive()
      .required("Required"),
    loanDuration: yup.string().required("Required"),
    useOfFunds: yup.string().required("Required"),
  });

  const validateStep = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      if (step === 1) {
        const step1Data = {
          businessName: fundingData.businessName,
          businessAddress: fundingData.businessAddress,
          industry: fundingData.industry,
          businessDescription: fundingData.businessDescription,
        };
        await fundingSchema
          .pick(Object.keys(step1Data))
          .validate(step1Data, { abortEarly: false });
        setStep(2);
      } else if (step === 2) {
        const step2Data = {
          fundingAmount: fundingData.fundingAmount,
          interestRate: fundingData.interestRate,
          loanDuration: fundingData.loanDuration,
          useOfFunds: fundingData.useOfFunds,
        };
        await fundingSchema
          .pick(Object.keys(step2Data))
          .validate(step2Data, { abortEarly: false });
        setStep(3);
      } else {
        await handleFinalSubmit();
      }
    } catch (err) {
      const newErrors = {};
      err.inner?.forEach((e) => (newErrors[e.path] = e.message));
      setErrors(newErrors);
    }
  };

  const handleFinalSubmit = async () => {
    setLoading(true);
    try {
      await addDoc(collection(dataBase, "fundingRequests"), {
        ...fundingData,
        userId: auth.currentUser?.uid,
        timestamp: new Date(),
      });
      alert("Success!");
      setSubmission(true);
      window.location.href = "/";
      // Reset or Redirect here
    } catch (err) {
      console.error(err);
      alert("Submission failed.");
      setSubmission(false);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) =>
    setFundingData({ ...fundingData, [e.target.name]: e.target.value });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="flex flex-col items-center min-h-screen py-10 px-4 font-montserat">
      <div className="text-center max-w-[500px] mb-8">
        <h1 className="uppercase text-[#04684C] text-4xl font-bold">
          Post a funding Request
        </h1>
        <p className="text-gray-700 mt-2">
          Connect with investors ready to support your growth.
        </p>
      </div>

      <form
        onSubmit={validateStep}
        className="bg-[#04684C] w-full lg:w-1/2 p-6 rounded-md shadow-2xl"
      >
        <div className="flex gap-1 items-center mb-6">
          <img className="w-15" src={BussinessLogo} alt="Logo" />
          <div>
            {step === 1 ? (
              <h2 className="text-white font-bold text-2xl">
                Business Information
              </h2>
            ) : step === 2 ? (
              <p className="text-white font-bold text-2xl">Funding Details</p>
            ) : step === 3 ? (
              <p className="text-white font-bold text-2xl">Review & Submit</p>
            ) : (
              ""
            )}
            <h2 className="text-white font-bold text-sm">Step {step} of 3</h2>
          </div>
        </div>

        {step === 1 && (
          <Step1 data={fundingData} onChange={handleChange} errors={errors} />
        )}
        {step === 2 && (
          <Step2 data={fundingData} onChange={handleChange} errors={errors} />
        )}
        {step === 3 && <Step3Review data={fundingData} />}

        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="bg-white px-10 py-2 rounded font-bold text-[#04684C] uppercase cursor-pointer"
            >
              Back
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className="bg-white px-10 py-2 rounded font-bold text-[#04684C] uppercase ml-auto cursor-pointer"
          >
            {loading ? "Processing..." : step === 3 ? "Submit" : "Next"}
          </button>
        </div>
      </form>
      {submission && (
        <div
          className={`${
            closeModal === "closemodal" ? "hidden" : ""
          }bg-[#00000090] fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center`}
        >
          <div
            className={`${
              closeModal === "closemodal" ? "hidden" : ""
            } bg-[#04684C] flex flex-col gap-5 justify-center items-center p-10 rounded-md w-[400px] relative max-[410px]:w-[300px]`}
          >
            <img src={feelathomeLogo} alt="feelathomeLogo" />
            <p className="text-green-600 font-bold text-2xl text-center">
              Funding Request Sucessfully Posted.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FundingForm;
