import React from "react";
import uparrow from "../assets/Right Button.png";
import checkmark from "../assets/check.png";
import padlock from "../assets/padlock.png";
import safeguard from "../assets/safeguarding (1).png";
import { useNavigate } from "react-router-dom";
const Introduction = () => {
  const navigate = useNavigate();

  function handleFundingFormNavigate() {
    navigate("/fundingform");
  }
  return (
    <>
      <section className="flex flex-col  bg-[] font-montserat px-10 py-10 gap-5 w-full">
        <div className="flex flex-col justify-center items-center gap-5 mb-10 w-[500px] mx-auto">
          <h1 className="uppercase text-[#04684C] text-4xl font-bold mt-2.5 w-[500px] text-center">
            Built on Trust & Security
          </h1>
          <p className="text-center text-gray-700">
            Your security is our priority. We employ industry-leading measures
            to protect your investments and personal information.
          </p>
        </div>
        <div className="flex justify-around items-center gap-5 ">
          <div className="flex flex-col justify-center items-center gap-2.5 text-center bg-[#04684C] p-10 rounded-md shadow-md w-[400px] h-[250px]">
            <img className="w-15" src={safeguard} alt="safeguard" />
            <h1 className="font-bold text-white text-2xl">
              Verified Businesses
            </h1>
            <span className="text-gray-300">
              Every business undergoes thorough verification before being listed
              on our platform.
            </span>
          </div>
          <div className="flex flex-col justify-center items-center gap-2.5 text-center bg-[#04684C] p-10 rounded-md shadow-md w-[400px] h-[250px]">
            <img className="w-15" src={padlock} alt="padlock" />
            <h1 className="font-bold text-white text-2xl">
              Secure Transactions
            </h1>
            <span className="text-gray-300">
              Bank-level encryption and secure payment processing for all
              transactions.
            </span>
          </div>
          <div className="flex flex-col justify-center items-center gap-2.5 text-center bg-[#04684C] p-10 rounded-md shadow-md w-[400px] h-[250px]">
            <img className="w-15" src={checkmark} alt="checkmark" />
            <h1 className="font-bold text-white text-2xl">Transparent Terms</h1>
            <span className="text-gray-300">
              Clear, upfront terms with no hidden fees. Know exactly what you're
              agreeing to.
            </span>
          </div>
        </div>

        <div className="flex justify-center items-center p-5 gap-20 mt-10">
          <div className="flex flex-col justify-center items-center gap-3 bg-[#04684C] p-10 rounded-md shadow-md w-[400px] h-[250px]">
            <h1 className="font-bold text-3xl text-white">For Bussinesses</h1>
            <span className="text-center text-gray-300">
              Get the funding you need to grow your business with competitive
              rates and flexible terms.
            </span>
            <button
              onClick={handleFundingFormNavigate}
              className="bg-white rounded-md py-2 px-4 font-bold text-[#04684C] cursor-pointer"
            >
              Post Funding Request
            </button>
          </div>
          <div className="flex flex-col gap-3 justify-center items-center bg-[#04684C] p-10 rounded-md shadow-md w-[400px] h-[250px]">
            <h1 className="font-bold text-3xl text-white">For Client</h1>
            <span className="text-center text-gray-300">
              Earn attractive returns by investing in vetted businesses seeking
              growth capital.
            </span>
            <button className="bg-white rounded-md py-2 px-4 font-bold text-[#04684C] cursor-pointer">
              Check For Opportunities
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Introduction;
