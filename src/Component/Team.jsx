import React from "react";
import blackimage1 from "../assets/black image 1.jpeg";
import blackimage2 from "../assets/black image 2.jpeg";
import blackimage3 from "../assets/black image 3.jpeg";
import blackimage4 from "../assets/black image 4.jpeg";
import { Slide, Fade } from "react-awesome-reveal";
const Team = () => {
  return (
    <Fade>
      <section className=" mx-auto p-20 w-full flex flex-col gap-10 font-montserat max-[600px]:px-5">
        <div className="flex flex-col justify-center items-center max-[500px]:text-center">
          <h2 className="text-4xl font-bold mb-2 text-[#04684C] max-[500px]:text-center">
            Meet Our Team of Expert
          </h2>
          <p>We are good at what we do</p>
        </div>
        <div className="grid grid-cols-1 items-center justify-between mx-auto md:grid-cols-2 lg:grid-cols-4 gap-30 max-[600px]:gap-15">
          <div className="text-center">
            <img
              className="w-[170px] mb-3 rounded-full"
              src={blackimage1}
              alt="team member1"
            />
            <h2 className="font-bold">John Adebayo</h2>
            <p className="text-xs">Servce Support</p>
          </div>
          <div className="text-center">
            <img
              className="w-[170px] mb-3 rounded-full"
              src={blackimage2}
              alt="team member2"
            />
            <h2 className="font-bold">Sarah Oluwatobi</h2>
            <p className="text-xs">Marketing Manager</p>
          </div>
          <div className="text-center">
            <img
              className="w-[170px] mb-3 rounded-full"
              src={blackimage3}
              alt="team member3"
            />
            <h2 className="font-bold"> Linda Chukwu</h2>
            <p className="text-xs">Designer</p>
          </div>
          <div className="text-center">
            <img
              className="w-[170px] mb-3 rounded-full"
              src={blackimage4}
              alt="team member4"
            />
            <h2 className="font-bold"> Emmanuel Johnson</h2>
            <p className="text-xs">Loan Manager</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mt-10">
          <h2 className="text-4xl font-bold mb-2 text-center text-[#04684C]">
            Check this out
          </h2>
          <p className="text-center">
            Learn about the popular real estate market around
          </p>
        </div>
        <div className="mx-auto  text-center">
          <ul className="flex flex-wrap justify-center items-center gap-3">
            <li className="rounded-4xl border-solid border-2 border-[#04684C] bg-white py-2.5 px-4 cursor-pointer ">
              The Villages, FL real estate
            </li>
            <li className="rounded-4xl border-solid border-2 border-[#04684C] bg-white py-2.5 px-4 cursor-pointer ">
              Naples, FL real estate
            </li>
            <li className="rounded-4xl border-solid border-2 border-[#04684C] bg-white py-2.5 px-4 cursor-pointer ">
              Orlando, FL real estate
            </li>
            <li className="rounded-4xl border-solid border-2 border-[#04684C bg-white py-2.5 px-4 cursor-pointer ">
              Tampa, FL real estate
            </li>
            <li className="rounded-4xl border-solid border-2 border-[#04684C] bg-white py-2.5 px-4 cursor-pointer ">
              Henderson, NV real estate
            </li>
            <li className="rounded-4xl border-solid border-2 border-[#04684C] bg-white py-2.5 px-4 cursor-pointer ">
              Chandler, AZ real estate
            </li>
            <li className="rounded-4xl border-solid border-2 border-[#04684C] bg-white py-2.5 px-4 cursor-pointer ">
              Scottsdale, AZ real estate
            </li>
            <li className="rounded-4xl border-solid border-2 border-[#04684C] bg-white py-2.5 px-4 cursor-pointer ">
              Fort Myers, FL real estate
            </li>
            <li className="rounded-4xl border-solid border-2 border-[#04684C] bg-white py-2.5 px-4 cursor-pointer ">
              Phoenix, AZ real estate
            </li>
          </ul>
        </div>
      </section>
    </Fade>
  );
};

export default Team;
