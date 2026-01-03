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
  const [booking, setBooking] = useState(false);
  const [isVerify, setIsVerifying] = useState(false);
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
          setUserDetails(userData);
          setUserStatus(userData.status === "BUSINESS OWNER");
        } else {
        }
      } else {
        setUserDetails(null);
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

  return (
    <>
      <section className="bg-[#F7F7F7] mx-auto p-10 w-full flex flex-col gap-10 font-montserat max-[550px]:px-5">
        {!fundingDetails ? (
          <p>Loading...</p>
        ) : (
          <div className="flex flex-col gap-5 max-w-4xl mx-auto my-8 w-full">
            {isCreator && (
              <div className="flex justify-center">
                <button
                  onClick={handleToggleEdit}
                  className={`font-bold border-4 p-3 rounded-xl w-48 transition duration-300 cursor-pointer ${
                    isEditing
                      ? "border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                      : "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                  }`}
                >
                  {isEditing ? "Cancel Edit" : "Edit Property"}
                </button>
              </div>
            )}

            <div className="flex flex-col md:flex-row items-center justify-center p-7 ">
              <div className="bg-[#04684C] w-full  p-6 rounded-md shadow-2xl">
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
                      placeholder="Title"
                      className="text-xl font-bold mb-2 p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F4B43]"
                    />
                    <textarea
                      name="description"
                      value={updatedFundingDetails.businessAddress || ""}
                      onChange={handleChange}
                      placeholder="Description"
                      rows="4"
                      className="text-sm p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F4B43]"
                    />
                    <input
                      type="text"
                      name="city"
                      value={updatedFundingDetails.industry || ""}
                      onChange={handleChange}
                      placeholder="City"
                      className="text-sm p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F4B43]"
                    />
                    <input
                      type="text"
                      name="state"
                      value={updatedFundingDetails.interestRate || ""}
                      onChange={handleChange}
                      placeholder="State"
                      className="text-sm p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F4B43]"
                    />
                    <input
                      type="text"
                      name="location"
                      value={updatedFundingDetails.loanDuration || ""}
                      onChange={handleChange}
                      placeholder="Location"
                      className="text-sm p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F4B43]"
                    />
                    <div className="flex gap-2">
                      <span className="text-lg font-bold">#</span>
                      <input
                        type="number"
                        name="price"
                        value={updatedFundingDetails.fundingAmount || ""}
                        onChange={handleChange}
                        placeholder="Price"
                        className="text-lg font-extrabold text-[#EB664E] p-2 border border-gray-400 rounded-lg w-1/2 focus:outline-none focus:ring-2 focus:ring-[#1F4B43]"
                      />
                      <input
                        type="text"
                        name="duration"
                        value={updatedFundingDetails.useofFunds || ""}
                        onChange={handleChange}
                        placeholder="/Duration"
                        className="text-lg font-extrabold text-[#EB664E] p-2 border border-gray-400 rounded-lg w-1/2 focus:outline-none focus:ring-2 focus:ring-[#1F4B43]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="font-bold mt-5 border-4 border-[#1F4B43] p-3 rounded-xl w-full text-center text-[#1F4B43] bg-white hover:bg-[#1F4B43] hover:text-white transition duration-300"
                    >
                      Save Changes
                    </button>
                  </form>
                ) : (
                  <>
                    <div>
                      <h1 className="text-white font-bold text-2xl mt-2">
                        Business Information
                      </h1>
                      <div className="flex justify-between items-center gap-5 text-gray-300 mt-5">
                        <div className="flex flex-col">
                          <p className="font-bold">Business Name:</p>
                          <span className="text-sm text-center text-white">
                            {" "}
                            {fundingDetails.businessName}
                          </span>
                        </div>

                        <div className="flex flex-col">
                          <p className="font-bold">Business Address:</p>
                          <span className="text-sm text-center text-white">
                            {fundingDetails.businessAddress}{" "}
                          </span>
                        </div>

                        <div className="flex flex-col">
                          <p className="font-bold">Industry:</p>
                          <span className="text-sm text-center text-white">
                            {fundingDetails.industry}{" "}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <p className=" text-gray-300 font-bold mt-5">
                          Business Description:{" "}
                        </p>
                        <span className="text-sm text-left text-white">
                          {fundingDetails.businessDescription}
                        </span>
                      </div>

                      <hr className="text-white mt-5"></hr>

                      <div>
                        <h1 className="text-white font-bold text-2xl mt-2">
                          Funding Details
                        </h1>
                        <div className="flex justify-between items-center gap-5 text-gray-300 mt-5">
                          <div className="flex flex-col">
                            <p className="font-bold">Funding Amount: </p>
                            <span className="text-sm text-center text-white">
                              #{fundingDetails.fundingAmount}
                            </span>
                          </div>

                          <div className="flex flex-col">
                            <p>Interest Rate: </p>
                            <span className="text-sm text-center text-white">
                              {fundingDetails.interestRate}%
                            </span>
                          </div>

                          <div className="flex flex-col">
                            <p>Loan Duration: </p>
                            <span className="text-sm text-center text-white">
                              {fundingDetails.loanDuration}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col">
                          <p className=" text-gray-300 font-bold mt-5">
                            Use of Funds:{" "}
                          </p>
                          <span className="text-sm text-left text-white">
                            {fundingDetails.useOfFunds}
                          </span>
                        </div>
                      </div>
                    </div>
                    <WhatsAppChat />

                    <div className="flex flex-col items-center mt-3">
                      <span className="flex justify-center items-center w-[500px] mb-5">
                        <input
                          type="checkbox"
                          name="agreeToTerms"
                          // checked={signupFormData.agreeToTerms} // Boolean: true or false
                          // onChange={handleCheckboxChange}
                          className="w-5 h-5 accent-blue-600"
                        />
                        <label className="text-sm font-medium text-gray-700">
                          "I confirm that I have reviewed the Scope of Work and
                          agree to the Service Terms as discussed with
                          {fundingDetails.businessName}."
                        </label>
                      </span>
                      <button
                        disabled={!isloggedIn || userStatus}
                        onClick={handleShowModal}
                        className={`${
                          !isloggedIn
                            ? "opacity-50 cursor-not-allowed"
                            : "block"
                        } bg-white border-2 py-2 px-5 rounded-md cursor-pointer text-[#04684C] font-bold font-montserat`}
                      >
                        Agreement Reached
                      </button>
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
