import React from "react";
import { auth } from "../../Firebase";
import { dataBase } from "../../Firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useLocation } from "react-router-dom";
const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [userStatus, setUserStatus] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

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

  function handlePostForFunding() {
    navigate("/fundingForm");
  }

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      window.location.href = "/signin";
    } catch (error) {}
  };

  return (
    <>
      <section className="bg-[#F7F7F7] mx-auto p-20 w-full flex flex-col gap-10 font-montserat max-[500px]:px-5">
        {userDetails ? (
          <div className="flex flex-col lg:flex-row justify-center items-stretch w-full max-w-screen-xl mx-auto p-4 ">
            <div className="bg-[#04684C] flex flex-col items-center justify-center gap-4 p-8 rounded-t-md md:rounded-tr-none md:rounded-l-md w-full lg:w-1/2 min-h-[300px]">
              <img
                className="w-full max-w-[250px] rounded-md h-auto object-cover"
                src={userDetails.image}
                alt="userimage"
              />
            </div>

            <div className="bg-[#1F4B43] text-white text-base lg:text-lg flex flex-col gap-3 lg:gap-5 justify-center items-start p-8 rounded-b-md md:rounded-bl-none md:rounded-r-md w-full lg:w-1/2 min-h-[300px]">
              <h2 className="text-center w-full">
                Fullname: {userDetails.fullname}
              </h2>
              <h2 className="text-center w-full">Email: {userDetails.email}</h2>
              <h2 className="text-center w-full">
                Number: {userDetails.number}
              </h2>
              <h2 className="text-center w-full">
                Occupation: {userDetails.occupation}
              </h2>
              <h2 className="text-center w-full">
                Gender: {userDetails.gender}
              </h2>
              <h2 className="text-center w-full">
                Status: {userDetails.status}
              </h2>

              <div className="flex flex-col justify-center items-center gap-3 mt-4 w-full max-w-xs mx-auto">
                {userStatus ? (
                  <button
                    onClick={handlePostForFunding}
                    className="bg-white border-2 py-2 px-3 rounded-md cursor-pointer text-[#04684C] font-bold font-montserat"
                  >
                    Post For Funding
                  </button>
                ) : (
                  <button
                    onClick={handlePostForFunding}
                    className="bg-white border-2 py-2 px-3 rounded-md cursor-pointer text-[#04684C] font-bold font-montserat"
                  >
                    Check For Opportunities
                  </button>
                )}
                <button
                  onClick={handleSignOut}
                  className="bg-white border-2 py-2 px-10 rounded-md cursor-pointer text-[#04684C] font-bold font-montserat"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </section>
    </>
  );
};

export default Profile;
