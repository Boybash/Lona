import React from "react";
import { dataBase } from "../../../Firebase";
import { doc, getDoc } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import WhatsappLogo from "../../assets/whatsapp_3992558.png";
const WhatsAppChat = () => {
  const location = useLocation();
  const [userPhoneNumber, setUserPhoneNumber] = useState(null);

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
          setUserPhoneNumber(userData.number);
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

  const message =
    "Hello! I have a question about your Business Funding Request.";
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${userPhoneNumber}?text=${encodedMessage}`;

  const buttonStyle = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#04684C",
    color: "white",
    padding: "15px 25px",
    borderRadius: "5px",
    textDecoration: "none",
    fontWeight: "bold",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
    display: "flex",
    alignItems: "center",
    zIndex: 1000,
  };

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={buttonStyle}
      className="animate-bounce"
    >
      <span style={{ marginRight: "10px" }}>
        <img className="w-7" src={WhatsappLogo} alt="whatsapp" />
      </span>
      Chat with the Business Owner
    </a>
  );
};

export default WhatsAppChat;
