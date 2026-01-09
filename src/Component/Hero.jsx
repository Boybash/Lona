import React from "react";
import uparrow from "../assets/Right Button.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { auth } from "../../Firebase";
import { dataBase } from "../../Firebase";
import { doc, getDoc } from "firebase/firestore";
import { Fade } from "react-awesome-reveal";
const Hero = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  function handleSignInClick() {
    navigate("/signin");
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(user !== null);
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <Fade>
        <section
          className="w-full flex flex-col md:flex-row justify-between items-center px-6 md:px-10 py-12 md:py-20 font-montserat bg-cover bg-center 
 bg-[linear-gradient(to_right,rgba(15,32,39,0.85),rgba(32,58,67,0.85),rgba(44,83,100,0.85)),url('https://img.freepik.com/premium-photo/top-view-cash-calculator-notepad-table_1048944-3074244.jpg?semt=ais_hybrid&w=740&q=80')]"
        >
          <div className="flex flex-col md:flex-row justify-around items-center w-full gap-10">
            <div className="flex flex-col w-full md:w-3/5 text-center md:text-left items-center md:items-start">
              <h1 className="uppercase bg-[#04684C] p-2 md:p-3 rounded-md text-xs md:text-sm text-white w-fit mb-4">
                100% trusted platform
              </h1>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl text-white uppercase font-extrabold leading-tight">
                finance with security and{" "}
                <span className="text-[#04684C]">flexibility</span>
              </h1>

              <ul className="w-full md:w-4/5 text-white text-base md:text-xl font-bold uppercase flex flex-col mt-4 gap-2">
                <li>Lending Built on Trust, Not Collateral.</li>
                <li className="normal-case md:uppercase font-medium md:font-bold opacity-90 md:opacity-100">
                  We understand your needs are urgent. Get a loan based on your
                  potential, not your assets.
                </li>
                <li>Fast approval process and simple repayment terms</li>
                <li className="text-[#04684C]">
                  The future of flexible finance is here.
                </li>
              </ul>
            </div>

            <div className="relative mt-8 md:mt-0">
              <div className={`${isLoggedIn ? "hidden" : "block"}`}>
                <button
                  onClick={handleSignInClick}
                  className="bg-[#04684C] hover:bg-[#03523d] transition-colors text-white rounded-md py-4 px-6 w-[220px] md:w-[200px] font-bold relative cursor-pointer shadow-lg"
                >
                  Get Started
                </button>
              </div>

              <h1
                className={`${
                  isLoggedIn ? "block" : "hidden"
                } bg-[#04684C] text-white text-center rounded-md py-4 px-6 w-[220px] md:w-[200px] font-bold relative cursor-pointer`}
              >
                Ready To Boost Your Finances
              </h1>
            </div>
          </div>
        </section>
      </Fade>
    </>
  );
};

export default Hero;
