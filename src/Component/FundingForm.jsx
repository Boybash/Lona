import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import * as yup from "yup";
import { collection, addDoc } from "firebase/firestore";
import { auth, dataBase } from "../../Firebase";
import BussinessLogo from "../assets/business_11692299.png";
import FormInput from "./UI/FormInput";
import Step1 from "./UI/Step1";
import Step2 from "./UI/Step2";
import Step3Review from "./UI/step3";

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
      .string()
      .required("Required")
      .test("is-number", "Must be a valid number", (value) => {
        if (!value) return false;
        // Remove all commas and check if the result is a number
        const numberWithoutCommas = value.replace(/,/g, "");
        return (
          !isNaN(parseFloat(numberWithoutCommas)) &&
          isFinite(numberWithoutCommas)
        );
      })
      .test("is-positive", "Must be a positive number", (value) => {
        if (!value) return false;
        const numberWithoutCommas = value.replace(/,/g, "");
        return parseFloat(numberWithoutCommas) > 0;
      }),
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
