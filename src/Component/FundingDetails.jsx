import React, { useState, useEffect } from "react";
import { useCallback } from "react";
import { dataBase, auth } from "../../Firebase";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import LonaLogo from "../assets/Lona Logo.png";
import xicon from "../assets/xicon.png";
import WhatsAppChat from "./UI/WhatsappChat";

const FundingDetails = () => {
  const { fundingId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [fundingDetails, setFundingDetails] = useState();
  const [currentUserId, setCurrentUserId] = useState(null);
  const [closeModal, setCloseModal] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isloggedIn, setIsLoggedIn] = useState(null);
  const [updatedFundingDetails, setUpdatedFundingDetails] = useState({});
  const [showChat, setShowChat] = useState(false);
  const [userStatus, setUserStatus] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(user !== null);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setCurrentUserId(user.uid);
    }

    const fetchFundingDetails = async () => {
      const docRef = doc(dataBase, "fundingRequests", fundingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setFundingDetails(data);
        setUpdatedFundingDetails(data);
      } else {
        console.warn("No such post found for ID:", fundingId);
        setFundingDetails(null);
      }
    };
    fetchFundingDetails();
  }, [fundingId]);

  const fetchUserdata = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(dataBase, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUserStatus(userData.status === "CLIENT");
        } else {
        }
      } else {
        setUserStatus(null);
      }
    });
  };

  useEffect(() => {
    fetchUserdata();
  }, []);

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing && fundingDetails) {
      setUpdatedFundingDetails(fundingDetails);
    }
  };

  const handleChange = (e) => {
    setUpdatedFundingDetails({
      ...updatedFundingDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditPost = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(
        doc(dataBase, "fundingRequests", fundingId),
        updatedFundingDetails
      );
      setFundingDetails(updatedFundingDetails);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  function handleCloseModal() {
    setCloseModal(true);
    setBooking(false);
    setIsVerifying(false);
    setShowChat(false);
  }

  function handleShowModal() {
    setBooking(true);
    setCloseModal(false);
    setIsVerifying(false);
    setShowChat(true);
  }

  function handleVerification() {
    setIsVerifying(true);
    setBooking(false);
    setCloseModal(false);
  }

  function handleProfileCheck(creatorId) {
    navigate(`/creatorprofile/${creatorId}`);
  }

  const isCreator =
    currentUserId &&
    fundingDetails &&
    currentUserId === fundingDetails.creatorId;

  const isDisabled = !isloggedIn || !userStatus;

  return (
    <>
      <section className="bg-[#F7F7F7] mx-auto p-6 md:p-10 w-full flex flex-col gap-10 font-montserat min-h-screen">
        {!fundingDetails ? (
          <div className="flex justify-center items-center h-40">
            <p className="animate-pulse font-bold text-[#04684C]">Loading...</p>
          </div>
        ) : (
          <div className="flex flex-col gap-5 max-w-4xl mx-auto my-4 md:my-8 w-full">
            {isCreator && (
              <div className="flex justify-center mb-4">
                <button
                  onClick={handleToggleEdit}
                  className={`font-bold border-4 p-3 rounded-xl w-full max-w-[200px] transition duration-300 cursor-pointer ${
                    isEditing
                      ? "border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                      : "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                  }`}
                >
                  {isEditing ? "Cancel Edit" : "Edit Property"}
                </button>
              </div>
            )}

            <div className="flex flex-col items-center justify-center">
              <div className="bg-[#04684C] w-full p-5 md:p-8 rounded-xl shadow-2xl">
                {isEditing && isCreator ? (
                  <form
                    onSubmit={handleEditPost}
                    className="flex flex-col gap-4"
                  >
                    <input
                      type="text"
                      name="title"
                      value={updatedFundingDetails.businessName || ""}
                      onChange={handleChange}
                      placeholder="Business Name"
                      className="text-lg md:text-xl font-bold mb-2 p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />
                    <textarea
                      name="description"
                      value={updatedFundingDetails.businessAddress || ""}
                      onChange={handleChange}
                      placeholder="Business Address"
                      rows="3"
                      className="text-sm p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />

                    {/* Responsive Grid for Inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="city"
                        value={updatedFundingDetails.industry || ""}
                        onChange={handleChange}
                        placeholder="Industry"
                        className="text-sm p-3 border border-gray-400 rounded-lg"
                      />
                      <input
                        type="text"
                        name="state"
                        value={updatedFundingDetails.interestRate || ""}
                        onChange={handleChange}
                        placeholder="Interest Rate (%)"
                        className="text-sm p-3 border border-gray-400 rounded-lg"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex items-center gap-2 flex-1">
                        <span className="text-white font-bold">#</span>
                        <input
                          type="number"
                          name="price"
                          value={updatedFundingDetails.fundingAmount || ""}
                          onChange={handleChange}
                          placeholder="Funding Amount"
                          className="text-lg font-extrabold text-[#EB664E] p-3 border border-gray-400 rounded-lg w-full"
                        />
                      </div>
                      <input
                        type="text"
                        name="duration"
                        value={updatedFundingDetails.useofFunds || ""}
                        onChange={handleChange}
                        placeholder="Use of Funds"
                        className="text-lg font-extrabold text-[#EB664E] p-3 border border-gray-400 rounded-lg flex-1"
                      />
                    </div>

                    <button
                      type="submit"
                      className="font-bold mt-5 p-4 rounded-xl w-full text-center text-[#04684C] bg-white hover:bg-gray-100 transition duration-300"
                    >
                      Save Changes
                    </button>
                  </form>
                ) : (
                  <>
                    <div className="space-y-8">
                      <div>
                        <h2 className="text-white font-bold text-xl md:text-2xl border-b border-emerald-700 pb-2">
                          Business Information
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-gray-300 mt-5">
                          <div className="flex flex-col">
                            <p className="font-bold text-xs uppercase tracking-wider">
                              Business Name
                            </p>
                            <span className="text-base text-white">
                              {fundingDetails.businessName}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <p className="font-bold text-xs uppercase tracking-wider">
                              Address
                            </p>
                            <span className="text-base text-white">
                              {fundingDetails.businessAddress}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <p className="font-bold text-xs uppercase tracking-wider">
                              Industry
                            </p>
                            <span className="text-base text-white">
                              {fundingDetails.industry}
                            </span>
                          </div>
                        </div>
                        <div className="mt-6">
                          <p className="text-gray-300 font-bold text-xs uppercase tracking-wider">
                            Description
                          </p>
                          <p className="text-sm text-white leading-relaxed mt-1">
                            {fundingDetails.businessDescription}
                          </p>
                        </div>
                      </div>

                      {/* --- Funding Section --- */}
                      <div>
                        <h2 className="text-white font-bold text-xl md:text-2xl border-b border-emerald-700 pb-2">
                          Funding Details
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-gray-300 mt-5">
                          <div className="flex flex-col">
                            <p className="font-bold text-xs uppercase tracking-wider">
                              Amount
                            </p>
                            <span className="text-lg font-bold text-white">
                              #{fundingDetails.fundingAmount}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <p className="font-bold text-xs uppercase tracking-wider">
                              Interest Rate
                            </p>
                            <span className="text-lg font-bold text-white">
                              {fundingDetails.interestRate}%
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <p className="font-bold text-xs uppercase tracking-wider">
                              Duration
                            </p>
                            <span className="text-lg font-bold text-white">
                              {fundingDetails.loanDuration}
                            </span>
                          </div>
                        </div>
                        <div className="mt-6">
                          <p className="text-gray-300 font-bold text-xs uppercase tracking-wider">
                            Use of Funds
                          </p>
                          <p className="text-sm text-white leading-relaxed mt-1">
                            {fundingDetails.useOfFunds}
                          </p>
                        </div>
                      </div>
                      <div
                        disabled={isDisabled}
                        className={`${
                          isDisabled
                            ? "bg-gray-500 opacity-50 cursor-not-allowed text-gray-200"
                            : ""
                        }`}
                      >
                        <WhatsAppChat />
                      </div>

                      <hr className="border-emerald-700 mt-8" />

                      {/* --- Terms & Button Section --- */}
                      <div className="flex flex-col items-center gap-6 mt-8">
                        <label className="flex items-start gap-3 w-full max-w-lg cursor-pointer group">
                          <input
                            type="checkbox"
                            className="w-6 h-6 mt-1 accent-blue-500 shrink-0"
                          />
                          <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                            "I confirm that I have reviewed the Scope of Work
                            and agree to the Service Terms as discussed with{" "}
                            <span className="text-white underline">
                              {fundingDetails.businessName}
                            </span>
                            ."
                          </span>
                        </label>

                        <button
                          disabled={isDisabled}
                          onClick={handleShowModal}
                          className={`w-full sm:w-auto min-w-[250px] py-4 px-8 rounded-lg font-bold shadow-lg transition-all ${
                            isDisabled
                              ? "bg-gray-500 opacity-50 cursor-not-allowed text-gray-200"
                              : "bg-white text-[#04684C] hover:bg-emerald-50 active:scale-95"
                          }`}
                        >
                          Agreement Reached
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default FundingDetails;
