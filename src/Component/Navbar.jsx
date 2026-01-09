import React, { useEffect, useState } from "react";
import Lonalogo from "../assets/Lona Logo.png";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase";
import { dataBase } from "../../Firebase";
import { doc, getDoc } from "firebase/firestore";
import hamburger from "../assets/icons8-menu-50.png";
import Xicon from "../assets/xicon.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState(null);
  const [userImage, setuserImage] = useState(null);
  const [displayClass, setDisplayClas] = useState("");

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

  const scrollToFeatured = () => {
    const skillsSection = document.getElementById("featured");
    skillsSection.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToFooter = () => {
    const skillsSection = document.getElementById("footer");
    skillsSection.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToHowItWorks = () => {
    const skillsSection = document.getElementById("howitworks");
    skillsSection.scrollIntoView({ behavior: "smooth" });
  };

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

  function toggleSidebar() {
    setDisplayClas(displayClass === "active" ? "" : "active");
  }

  return (
    <>
      <nav className="sticky z-50 left-0 right-0 bottom-0 top-0 bg-[#04684C] flex justify-between items-center w-full h-15 px-10 py-10">
        <div>
          <img
            onClick={handleHomeClick}
            className="w-[60px] cursor-pointer"
            src={Lonalogo}
            alt="lona"
          />
        </div>

        <ul
          className={` ${
            displayClass === "active" ? "flex" : "hidden"
          }  min-[1000px]:flex min-[1000px]:pl-25 flex justify-center items-center gap-10 text-white font-bold  font-montserat max-[1000px]:absolute max-[1000px]:top-20 max-[1000px]:left-0 max-[1000px]:right-0 max-[1000px]:w-full max-[1000px]:bg-[#04684C] max-[1000px]:py-5 max-[1000px]:flex-col max-[1000px]:items-center max-[1000px]:justify-center max-[1000px]:gap-5 max-[1000px]:transition-all max-[1000px]:duration-500 max-[1000px]:ease-in-out`}
        >
          <li onClick={scrollToFeatured} className="cursor-pointer">
            Browse Opportunities
          </li>
          <li onClick={handleFundingFormNavigate} className="cursor-pointer">
            Post Request
          </li>
          <li onClick={scrollToHowItWorks} className="cursor-pointer">
            How It Works
          </li>
          <li onClick={scrollToFooter} className="cursor-pointer">
            Help
          </li>
        </ul>

        <div
          className={`${
            displayClass === "active" ? "block" : "hidden"
          } min-[1000px]:flex flex justify-center max-[1000px]:absolute max-[1000px]:top-67 max-[1000px]:left-0 max-[1000px]:w-full max-[1000px]:bg-[#04684C] max-[1000px]:py-5 max-[1000px]:flex-col max-[1000px]:items-center max-[1000px]:gap-5 max-[1000px]:transition-all max-[1000px]:duration-500 max-[1000px]:ease-in-out`}
        >
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
            } flex justify-center items-center gap-2 bg-white p-1.5 rounded-md cursor-pointer text-[#04684C] font-semibold font-montserat text-xs active:scale-95`}
          >
            <div className="relative">
              <img
                className="w-8 rounded-full border-2 border-[#04684C] aspect-square object-cover"
                src={userImage}
                alt="userImage"
              />
              <div className="absolute bottom-0 right-0 left-6 w-3 h-3 bg-green-400 border-2 border-[#04684C] rounded-full"></div>
            </div>
            <div>
              <h5>Welcome,</h5>
              <span className="truncate">{user}</span>
            </div>
          </div>
        </div>
        <img
          onClick={toggleSidebar}
          className="w-10 h-10 hidden max-[1000px]:block mr-1"
          src={displayClass === "active" ? Xicon : hamburger}
        />
      </nav>
    </>
  );
};
export default Navbar;
