import React from "react";
import Hero from "../../Component/Hero";
import Introduction from "../../Component/Introduction";
import Services from "../../Component/Services";
import Featured from "../../Component/Featured";
import KnowHow from "../KnowHow";
import Team from "../Team";
import InterestCalculator from "../InterestCalculator";
const Home = () => {
  return (
    <>
      <Hero />
      <Introduction />
      <Featured />
      <Services />
      <InterestCalculator />
      <KnowHow />
      <Team />
    </>
  );
};

export default Home;
