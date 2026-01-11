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
  function handleCheckForOpportunity() {
    navigate("/");
  }

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      window.location.href = "/signin";
    } catch (error) {}
  };

  const DetailItem = ({ label, value }) => (
    <div>
      <p className="text-xs text-white/50 uppercase font-semibold mb-1">
        {label}
      </p>
      <p className="text-lg font-medium truncate">{value}</p>
    </div>
  );

  return (
    <>
      <section className="min-h-screen bg-[#F7F7F7] flex items-center justify-center p-6 font-montserat">
        {userDetails ? (
          <div className="flex flex-col lg:flex-row w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden transition-all hover:shadow-2xl">
            <div className="bg-[#04684C] lg:w-2/5 flex flex-col items-center justify-center p-10 text-white">
              <div className="relative">
                <img
                  className="w-40 h-40 rounded-full border-4 border-white/20 object-cover shadow-lg"
                  src={userDetails.image}
                  alt="profile"
                />
                <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-400 border-3 border-[#1F4B43] rounded-full"></div>
              </div>
              <h1 className="mt-4 text-2xl font-bold tracking-tight">
                {userDetails.surname}
              </h1>
              <p className="opacity-80 text-sm uppercase tracking-widest">
                {userDetails.status}
              </p>
            </div>

            <div className="bg-[#1F4B43] lg:w-3/5 p-10 text-white flex flex-col justify-between">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DetailItem
                  label="Full Name"
                  value={`${userDetails.surname} ${userDetails.othernames}`}
                />
                <DetailItem label="Email Address" value={userDetails.email} />
                <DetailItem label="Phone Number" value={userDetails.number} />
                <DetailItem label="Gender" value={userDetails.gender} />
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={
                    userStatus
                      ? handlePostForFunding
                      : handleCheckForOpportunity
                  }
                  className="flex-1 bg-white text-[#04684C] cursor-pointer  py-3 px-6 rounded-xl font-bold hover:bg-opacity-90 transition-transform active:scale-95"
                >
                  {userStatus ? "Post For Funding" : "Check For Opportunities"}
                </button>
                <button
                  onClick={handleSignOut}
                  className="px-6 py-3 cursor-pointer border border-white/30 rounded-xl font-medium hover:bg-white/10 transition-colors active:scale-95"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-pulse text-[#04684C] font-bold">
            Loading Profile...
          </div>
        )}
      </section>
    </>
  );
};

export default Profile;
