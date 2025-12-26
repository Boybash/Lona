import React, { useState, useEffect } from "react";
import { dataBase, auth } from "../../Firebase";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import LonaLogo from "../assets/Lona Logo.png";
import xicon from "../assets/xicon.png";

const FundingDetails = () => {
  const { fundingId } = useParams();
  const [fundingDetails, setFundingDetails] = useState();
  const [currentUserId, setCurrentUserId] = useState(null);
  const [closeModal, setCloseModal] = useState("");
  const [booking, setBooking] = useState(false);
  const [isVerify, setIsVerifying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isloggedIn, setIsLoggedIn] = useState(null);
  const [updatedFundingDetails, setUpdatedFundingDetails] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

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
  }

  function handleShowModal() {
    setBooking(true);
    setCloseModal(false);
    setIsVerifying(false);
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
      <section className="bg-[#F7F7F7] mx-auto p-20 w-full flex flex-col gap-10 font-display max-[550px]:px-5">
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

            <div className="flex flex-col md:flex-row items-center justify-center shadow-2xl rounded-xl">
              <div className="relative w-full md:w-1/2">
                <img
                  className="w-full min-h-[600px] h-auto object-cover rounded-t-xl md:rounded-tr-none md:rounded-l-xl md:h-full"
                  src={fundingDetails.images}
                  alt="propertyImage"
                />
                <div className="flex gap-2 my-2 absolute top-2 left-2">
                  <h1 className="bg-[#1F4B43] p-2 px-4 text-xs md:text-sm rounded-full uppercase text-white">
                    {fundingDetails.typeoflisting}
                  </h1>
                  <h1 className="bg-[#E7C873] p-2 px-4 text-xs md:text-sm rounded-full uppercase text-black">
                    {fundingDetails.propertytype}
                  </h1>
                </div>
              </div>

              <div className="w-full md:w-1/2 min-h-[600px] bg-[#E7C873] flex flex-col gap-2 p-5 rounded-b-xl md:rounded-bl-none md:rounded-r-xl">
                {isEditing && isCreator ? (
                  <form
                    onSubmit={handleEditPost}
                    className="flex flex-col gap-4"
                  >
                    <input
                      type="text"
                      name="title"
                      value={updatedFundingDetails.title || ""}
                      onChange={handleChange}
                      placeholder="Title"
                      className="text-xl font-bold mb-2 p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F4B43]"
                    />
                    <textarea
                      name="description"
                      value={updatedFundingDetails.description || ""}
                      onChange={handleChange}
                      placeholder="Description"
                      rows="4"
                      className="text-sm p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F4B43]"
                    />
                    <input
                      type="text"
                      name="city"
                      value={updatedFundingDetails.city || ""}
                      onChange={handleChange}
                      placeholder="City"
                      className="text-sm p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F4B43]"
                    />
                    <input
                      type="text"
                      name="state"
                      value={updatedFundingDetails.state || ""}
                      onChange={handleChange}
                      placeholder="State"
                      className="text-sm p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F4B43]"
                    />
                    <input
                      type="text"
                      name="location"
                      value={updatedFundingDetails.location || ""}
                      onChange={handleChange}
                      placeholder="Location"
                      className="text-sm p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F4B43]"
                    />
                    <div className="flex gap-2">
                      <span className="text-lg font-bold">#</span>
                      <input
                        type="number"
                        name="price"
                        value={updatedFundingDetails.price || ""}
                        onChange={handleChange}
                        placeholder="Price"
                        className="text-lg font-extrabold text-[#EB664E] p-2 border border-gray-400 rounded-lg w-1/2 focus:outline-none focus:ring-2 focus:ring-[#1F4B43]"
                      />
                      <input
                        type="text"
                        name="duration"
                        value={updatedFundingDetails.duration || ""}
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
                    <h1 className="text-xl font-bold mb-2">
                      {fundingDetails.title}
                    </h1>
                    <h1 className="text-sm">
                      <span className="font-semibold">Description:</span>{" "}
                      {fundingDetails.description}
                    </h1>
                    <h1 className="text-sm">
                      <span className="font-semibold">City:</span>{" "}
                      {fundingDetails.city}
                    </h1>
                    <h1 className="text-sm">
                      <span className="font-semibold">State:</span>{" "}
                      {fundingDetails.state}
                    </h1>
                    <h1 className="text-sm">
                      <span className="font-semibold">Location:</span>{" "}
                      {fundingDetails.location}
                    </h1>
                    <h1 className="text-lg font-extrabold text-[#EB664E]">
                      #{fundingDetails.price}/{fundingDetails.duration}
                    </h1>

                    <div className="flex flex-col gap-3">
                      <h2 className="bg-[#1F4B43] p-2 px-4 text-sm rounded-full uppercase text-white text-center w-50">
                        {fundingDetails.status}
                      </h2>
                      <button
                        disabled={!isloggedIn}
                        onClick={handleShowModal}
                        className={` ${
                          !isloggedIn
                            ? "opacity-50 cursor-not-allowed"
                            : "block"
                        } font-bold mt-10 border-4 border-[#1F4B43] p-3 rounded-xl w-full max-w-xs text-center text-[#1F4B43] hover:bg-[#1F4B43] hover:text-white transition duration-300 mx-auto cursor-pointer`}
                      >
                        Book For Inspection
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {booking && (
          <div
            className={`${
              closeModal ? "hidden" : ""
            }bg-[#00000090] fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center`}
          >
            <div
              className={`${
                closeModal ? "hidden" : ""
              } bg-[#E7C873] flex flex-col gap-1 justify-center items-center p-5 rounded-4xl w-[400px] relative max-[410px]:w-[300px]`}
            >
              <img className="w-[200px]" src={LonaLogo} alt="feelathomeLogo" />

              <div
                className={`flex flex-col justify-center items-center gap-4`}
              >
                <p className="text-green-600 font-bold text-2xl text-center">
                  Make Payment For Inspection
                </p>
                <div className="text-white items-center text-lg font-bold">
                  <p>Bank Transfer of #5,000</p>
                  <p>Account Number: 0938465525</p>
                  <p>Account Name: FeelatHome</p>
                  <p>Bank Name: GT Bank</p>
                </div>
                <button
                  onClick={handleVerification}
                  className="mb-4 font-bold border-4 border-[#1F4B43] p-2.5 rounded-2xl w-50 text-center text-white mx-auto cursor-pointer mt-2 hover:bg-[#1F4B43] hover:text-white transition duration-300"
                >
                  Paid
                </button>
              </div>
              <img
                onClick={handleCloseModal}
                className="absolute top-2 right-2 w-10 cursor-pointer"
                src={xicon}
                alt="xicon"
              />
            </div>
          </div>
        )}

        {isVerify && (
          <div
            className={`${
              closeModal ? "hidden" : ""
            }bg-[#00000090] fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center`}
          >
            <div
              className={`${
                closeModal ? "hidden" : ""
              } bg-[#E7C873] flex flex-col gap-1 justify-center items-center p-5 rounded-4xl w-[400px] relative max-[410px]:w-[300px]`}
            >
              <img className="w-[200px]" src={LonaLogo} alt="feelathomeLogo" />
              <div className="flex flex-col justify-center items-center gap-3">
                <h1 className="text-green-600 font-bold text-2xl text-center">
                  Verifying Payment.....
                </h1>
                <button
                  onClick={() => {
                    handleProfileCheck(fundingDetails.creatorId);
                  }}
                  className="mb-4 font-bold border-4 border-[#1F4B43] p-2.5 rounded-2xl w-50 text-center text-white mx-auto cursor-pointer mt-2 hover:bg-[#1F4B43] hover:text-white transition duration-300"
                >
                  Make Contact
                </button>
              </div>

              <img
                onClick={handleCloseModal}
                className="absolute top-2 right-2 w-10 cursor-pointer"
                src={xicon}
                alt="xicon"
              />
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default FundingDetails;
