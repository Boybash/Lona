import React, { useEffect, useState } from "react";
import Lonalogo from "../assets/Lona Logo.png";
import mailicon from "../assets/icons8-mail-50.png";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase";
import { dataBase } from "../../Firebase";
import { doc, getDoc } from "firebase/firestore";
const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState(null);
  const [userImage, setuserImage] = useState(null);

  function handleSignInClick() {
    navigate("/signin");
  }

  function handleProfileClick() {
    navigate("/profile");
  }

  function handleHomeClick() {
    navigate("/");
  }

  function handleFundingFormNavigate() {
    navigate("/fundingform");
  }

  const fetchUserdata = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(dataBase, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUser(userData.surname);
          setuserImage(userData.image);
        }
      }
    });
  };

  useEffect(() => {
    fetchUserdata();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(user !== null);
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <nav className="sticky z-50 left-0 right-0 bottom-0 top-0 bg-[#04684C] flex justify-between items-center w-full h-15 px-10 py-10">
        <div>
          <img
            onClick={handleHomeClick}
            className="w-[100px] cursor-pointer"
            src={Lonalogo}
            alt="lona"
          />
        </div>

        <ul className="flex justify-center items-center gap-10 text-white font-bold font-montserat">
          <li className="cursor-pointer">Browse Opportunities</li>
          <li onClick={handleFundingFormNavigate} className="cursor-pointer">
            Post Request
          </li>
          <li className="cursor-pointer">Dashboard</li>
          <li className="cursor-pointer">Help</li>
        </ul>

        <div className="flex justify-center">
          <button
            onClick={handleSignInClick}
            className={` ${
              isLoggedIn ? "hidden" : ""
            }bg-white border-2 py-2 px-5 rounded-md cursor-pointer text-[#04684C] font-bold font-montserat`}
          >
            Sign In
          </button>
          <div
            onClick={handleProfileClick}
            className={`${
              isLoggedIn ? "block" : "hidden"
            } flex justify-center items-center gap-2 bg-white p-1.5 rounded-md cursor-pointer text-[#04684C] font-semibold font-montserat text-xs`}
          >
            <img className="w-5 rounded-full" src={userImage} alt="userImage" />
            <div>
              <h5>Welcome,</h5>
              <span>{user}</span>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
