import React from "react";
import Hero from "../../Component/Hero";
import Introduction from "../../Component/Introduction";
import Services from "../../Component/Services";
import Featured from "../../Component/Featured";
import Team from "../Team";
const Home = () => {
  return (
    <>
      <Hero />
      <Introduction />
      <Featured />
      <Services />
      <Team />
    </>
  );
};

export default Home;
