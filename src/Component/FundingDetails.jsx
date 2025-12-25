import React, { useState, useEffect } from "react";
import { dataBase, auth } from "../../Firebase";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const FundingDetails = () => {
  const { fundingId } = useParams();
  const [fundingDetails, setFundingDetails] = useState();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setCurrentUserId(user.uid);
    }

    const fetchFundingDetails = async () => {
      const docRef = doc(dataBase, "fundingRequets", fundingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setFundingDetails(data);
        // setUpdatedPropertyDetails(data);
      } else {
        console.warn("No such post found for ID:", fundingId);
        setFundingDetails(null);
      }
    };
    fetchFundingDetails();
  }, [fundingId]);

  return <></>;
};

export default FundingDetails;
