import { useState, useEffect, Suspense, lazy } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SearchProvider } from "./Component/SearchContext";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
const Home = lazy(() => import("./Component/Pages/Home"));
const Signin = lazy(() => import("./Component/Signin"));
const Registration = lazy(() => import("./Component/Registration"));
const Profile = lazy(() => import("./Component/Profile"));
const FundingForm = lazy(() => import("./Component/FundingForm"));
const FundingDetails = lazy(() => import("./Component/FundingDetails"));

const Loader = () => (
  <div style={{ textAlign: "center", padding: "50px" }}>
    <h3 className="animate-pulse font-bold text-[#04684C]">Loading Lona...</h3>
  </div>
);

function App() {
  return (
    <>
      <BrowserRouter>
        <SearchProvider>
          <Navbar />
          <Suspense fallback={<Loader />}>
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
          </Suspense>
          <Footer />
        </SearchProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
