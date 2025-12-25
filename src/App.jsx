import { useState } from "react";
import "./App.css";
import Navbar from "./Component/Navbar";
import React from "react";
import Home from "./Component/Pages/Home";
import Footer from "./Component/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./Component/Signin";
import Registration from "./Component/Registration";
import Profile from "./Component/Profile";
import FundingForm from "./Component/FundingForm";
import FundingDetails from "./Component/FundingDetails";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/fundingform" element={<FundingForm />} />
          <Route
            path="/fundingdetails/:fundingId"
            element={<FundingDetails />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
