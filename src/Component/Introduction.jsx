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

  const scrollToFeatured = () => {
    const skillsSection = document.getElementById("featured");
    skillsSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section className="flex flex-col font-montserat px-6 md:px-10 py-10 gap-5 w-full">
        <div className="flex flex-col justify-center items-center gap-5 mb-10 max-w-[600px] mx-auto w-full">
          <h1 className="uppercase text-[#04684C] text-2xl md:text-4xl font-bold text-center">
            Built on Trust & Security
          </h1>
          <p className="text-center text-gray-700 text-sm md:text-base">
            Your security is our priority. We employ industry-leading measures
            to protect your investments and personal information.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full">
          <div className="flex flex-col justify-center items-center gap-3 text-center bg-[#04684C] p-8 md:p-10 rounded-xl shadow-md min-h-[250px]">
            <img className="w-12" src={safeguard} alt="safeguard" />
            <h2 className="font-bold text-white text-xl md:text-2xl">
              Verified Businesses
            </h2>
            <p className="text-gray-300 text-sm">
              Every business undergoes thorough verification before being listed
              on our platform.
            </p>
          </div>

          <div className="flex flex-col justify-center items-center gap-3 text-center bg-[#04684C] p-8 md:p-10 rounded-xl shadow-md min-h-[250px]">
            <img className="w-12" src={padlock} alt="padlock" />
            <h2 className="font-bold text-white text-xl md:text-2xl">
              Secure Transactions
            </h2>
            <p className="text-gray-300 text-sm">
              Bank-level encryption and secure payment processing for all
              transactions.
            </p>
          </div>

          <div className="flex flex-col justify-center items-center gap-3 text-center bg-[#04684C] p-8 md:p-10 rounded-xl shadow-md min-h-[250px]">
            <img className="w-12" src={checkmark} alt="checkmark" />
            <h2 className="font-bold text-white text-xl md:text-2xl">
              Transparent Terms
            </h2>
            <p className="text-gray-300 text-sm">
              Clear, upfront terms with no hidden fees. Know exactly what you're
              agreeing to.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 max-w-5xl mx-auto w-full">
          <div className="flex flex-col justify-center items-center gap-4 bg-[#04684C] p-8 md:p-10 rounded-xl shadow-md min-h-[280px]">
            <h2 className="font-bold text-2xl md:text-3xl text-white">
              For Businesses
            </h2>
            <p className="text-center text-gray-300 text-sm">
              Get the funding you need to grow your business with competitive
              rates and flexible terms.
            </p>
            <button
              onClick={handleFundingFormNavigate}
              className="bg-white rounded-md py-3 px-6 font-bold text-[#04684C] hover:bg-gray-100 transition-colors cursor-pointer w-full sm:w-auto"
            >
              Post Funding Request
            </button>
          </div>

          <div className="flex flex-col gap-4 justify-center items-center bg-[#04684C] p-8 md:p-10 rounded-xl shadow-md min-h-[280px]">
            <h2 className="font-bold text-2xl md:text-3xl text-white">
              For Clients
            </h2>
            <p className="text-center text-gray-300 text-sm">
              Earn attractive returns by investing in vetted businesses seeking
              growth capital.
            </p>
            <button
              onClick={scrollToFeatured}
              className="bg-white rounded-md py-3 px-6 font-bold text-[#04684C] hover:bg-gray-100 transition-colors cursor-pointer w-full sm:w-auto"
            >
              Check For Opportunities
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Introduction;
