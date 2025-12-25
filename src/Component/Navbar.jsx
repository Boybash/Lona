import React from "react";
import Lonalogo from "../assets/Lona Logo.png";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();

  function handleSignInClick() {
    navigate("/signin");
  }
  function handleHomeClick() {
    navigate("/");
  }

  function handleFundingFormNavigate() {
    navigate("/fundingform");
  }

  return (
    <>
      <nav className="bg-[#04684C] flex justify-between items-center w-full h-15 px-10 py-10">
        <div>
          <img
            onClick={handleHomeClick}
            className="w-[100px] cursor-pointer"
            src={Lonalogo}
            alt="lona"
          />
        </div>

        <ul className="flex justify-center items-center gap-10 text-white font-bold font-montserat">
          <li className="cursor-pointer">Browse Opportunities</li>
          <li onClick={handleFundingFormNavigate} className="cursor-pointer">
            Post Request
          </li>
          <li className="cursor-pointer">Dashboard</li>
          <li className="cursor-pointer">Help</li>
        </ul>

        <div className="flex justify-center gap-5">
          <button
            onClick={handleSignInClick}
            className="bg-white border-2 py-2 px-5 rounded-md cursor-pointer text-[#04684C] font-bold font-montserat"
          >
            Sign In
          </button>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
