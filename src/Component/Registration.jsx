import React from "react";
import { useState } from "react";
import * as yup from "yup";
import showpassword from "../assets/show eye.svg";
import hidepassword from "../assets/hide eye.svg";
import lonalogo from "../assets/lona logo.png";
import xicon from "../assets/xicon.png";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase";
import { doc, setDoc } from "firebase/firestore";
import { dataBase } from "../../Firebase";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Registration = () => {
  const [showPasword, setShowPassword] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const [signupSubmissionStatus, setSignupSubmissionStatus] = useState("");
  const [closeModal, setCloseModal] = useState("");
  const [signupFormData, setSignupFormData] = useState({
    image: "",
    othernames: "",
    email: "",
    number: "+234",
    status: "",
    surname: "",
    password: "",
    gender: "",
    confirmpassword: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const schema = yup.object().shape({
    image: yup.mixed().test("file", "Field must not be empty", (value) => {
      if (!value) return false;
      return true;
    }),
    othernames: yup.string().required("Full name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    number: yup
      .string()
      .matches(
        /^\+?[0-9]+$/,
        "Phone number is not valid. Only digits and an optional '+' at the start are allowed"
      )
      .min(10, "Phone number must be at least 10 digits")
      .max(16, "Phone number must not exceed 15 digits plus an optional '+'")
      .required("Phone number is required"),
    status: yup.string().required("Status is required"),
    gender: yup.string().required("Status is required"),
    surname: yup.string().required("Surname is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmpassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  function handleSignupFormChange(e) {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSignupFormData({ ...signupFormData, image: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      setSignupFormData({ ...signupFormData, [e.target.name]: e.target.value });
    }
    console.log(signupFormData);
  }

  function resetForm() {
    setSignupFormData({
      image: "",
      othernames: "",
      email: "",
      number: "",
      status: "",
      surname: "",
      password: "",
      gender: "",
      confirmpassword: "",
    });
  }

  async function handleSignupFormSubmit(e) {
    e.preventDefault();
    try {
      await schema.validate(signupFormData, { abortEarly: false });
      setErrorMessages({});
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        signupFormData.email,
        signupFormData.password
      );
      const user = userCredential.user;
      await setDoc(doc(dataBase, "users", user.uid), {
        othernames: signupFormData.othernames,
        email: signupFormData.email,
        image: signupFormData.image,
        number: signupFormData.number,
        status: signupFormData.status,
        surname: signupFormData.surname,
        gender: signupFormData.gender,
        createdAt: new Date(),
      });
      setSignupSubmissionStatus(true);
      resetForm();
    } catch (err) {
      const errors = {};
      if (err.inner) {
        err.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
      } else if (err.code) {
        if (err.code === "auth/email-already-in-use") {
          errors.email = "This email is already registered.";
        } else {
          errors.general = err.message;
        }
      } else {
        errors.general = "An unexpected error occurred.";
      }
      setErrorMessages(errors);
      setSignupSubmissionStatus(false);
    }
  }

  function togglePasswordVisibility() {
    setShowPassword(!showPasword);
  }
  function handleCloseModal() {
    setCloseModal("closemodal");
  }
  function handleProfile() {
    navigate("/profile");
  }
  return (
    <>
      <section className="bg-[#F7F7F7] mx-auto p-20 w-full flex flex-col gap-10 font-montserat max-[600px]:px-5">
        <div>
          <form
            onSubmit={handleSignupFormSubmit}
            className="flex flex-col lg:flex-row justify-center items-stretch w-full max-w-5xl mx-auto p-4"
          >
            <div className="bg-[#1F4B43] flex flex-col p-6 lg:p-10 rounded-t-md rounded-b-none lg:rounded-l-md lg:rounded-r-none lg:rounded-t-md lg:rounded-b-md lg:rounded-br-none w-full lg:w-1/2 relative">
              <input
                onChange={handleSignupFormChange}
                className="w-full p-4 outline-0 bg-white rounded-2xl "
                name="surname"
                type="text"
                placeholder="SURNAME"
                value={signupFormData.surname}
              />
              {errorMessages.surname && (
                <p className="text-red-600">{errorMessages.surname}</p>
              )}
              <input
                onChange={handleSignupFormChange}
                className="w-full p-4 outline-0 bg-white rounded-2xl mt-5"
                name="othernames"
                type="text"
                placeholder="OTHERNAMES"
                value={signupFormData.othernames}
              />
              {errorMessages.othernames && (
                <p className="text-red-400 text-sm mt-1">
                  {errorMessages.othernames}
                </p>
              )}

              <input
                onChange={handleSignupFormChange}
                className="w-full p-4 outline-0 bg-white rounded-2xl mt-5"
                name="email"
                type="email"
                placeholder="EMAIL"
                value={signupFormData.email}
              />
              {errorMessages.email && (
                <p className="text-red-400 text-sm mt-1">
                  {errorMessages.email}
                </p>
              )}
              <div className=" relative flex flex-col">
                <input
                  onChange={handleSignupFormChange}
                  className="w-full p-4 outline-0 bg-white rounded-2xl mt-5"
                  name="password"
                  type={`${showPasword ? "text" : "password"}`}
                  placeholder="PASSWORD"
                  value={signupFormData.password}
                />
                {errorMessages.password && (
                  <p className="text-red-400 text-sm mt-1">
                    {errorMessages.password}
                  </p>
                )}
                <img
                  onClick={togglePasswordVisibility}
                  className="w-7 absolute top-[2.2rem] right-4 cursor-pointer"
                  src={`${showPasword ? hidepassword : showpassword}`}
                  alt="showpassword"
                />
              </div>
              <div className="relative flex flex-col">
                <input
                  onChange={handleSignupFormChange}
                  className="w-full p-4 outline-0 bg-white rounded-2xl mt-5"
                  name="confirmpassword"
                  type={`${showPasword ? "text" : "password"}`}
                  placeholder="CONFIRM PASSWORD"
                  value={signupFormData.confirmpassword}
                />
                {errorMessages.confirmPassword && (
                  <p className="text-red-400 text-sm mt-1">
                    {errorMessages.confirmPassword}
                  </p>
                )}
                <img
                  onClick={togglePasswordVisibility}
                  className="w-7 absolute top-[2.2rem] right-4 cursor-pointer"
                  src={`${showPasword ? hidepassword : showpassword}`}
                  alt="showpassword"
                />
              </div>
            </div>

            <div className=" bg-[#04684C] flex flex-col p-6 lg:p-10 rounded-b-md rounded-t-none lg:rounded-r-md lg:rounded-l-none lg:rounded-t-md lg:rounded-br-md w-full lg:w-1/2 lg:mt-0">
              <div>
                <input
                  onChange={handleSignupFormChange}
                  className="w-full p-3 outline-0 bg-white rounded-2xl file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                  name="image"
                  type="file"
                  accept=".jpg, .jpeg, .png, .gif"
                  placeholder="UPLOAD IMAGE"
                />
                {errorMessages.image && (
                  <p className="text-red-400 text-sm mt-1">
                    {errorMessages.image}
                  </p>
                )}
              </div>
              <div>
                <input
                  onChange={handleSignupFormChange}
                  className="w-full p-4 outline-0 bg-white rounded-2xl mt-5"
                  name="number"
                  type="text"
                  placeholder="PHONE NUMBER (8145679843)"
                  value={signupFormData.number}
                />
                {errorMessages.number && (
                  <p className="text-red-600">{errorMessages.number}</p>
                )}
              </div>

              <div>
                <select
                  onChange={handleSignupFormChange}
                  value={signupFormData.gender}
                  name="gender"
                  className="w-full p-4 outline-0 bg-white rounded-2xl mt-5"
                >
                  <option>GENDER</option>
                  <option value="MALE">MALE</option>
                  <option value="FEMALE">FEMALE</option>
                </select>
                {errorMessages.gender && (
                  <p className="text-red-600">{errorMessages.gender}</p>
                )}
              </div>

              <div>
                <select
                  onChange={handleSignupFormChange}
                  value={signupFormData.status}
                  name="status"
                  className="w-full p-4 outline-0 bg-white rounded-2xl mt-5"
                >
                  <option>STATUS</option>
                  <option value="BUSINESS OWNER">BUSSINESS OWNER</option>
                  <option value="INVESTOR">INVESTOR</option>
                </select>
                {errorMessages.status && (
                  <p className="text-red-600">{errorMessages.status}</p>
                )}
              </div>

              <div className="flex mx-auto items-center justify-center mt-8 w-full">
                <button className="bg-white border-2 py-2 px-3 rounded-md cursor-pointer text-[#04684C] font-bold font-montserat">
                  SIGN UP
                </button>
              </div>
            </div>
          </form>
          {signupSubmissionStatus && (
            <div
              className={`${
                closeModal === "closemodal" ? "hidden" : ""
              }bg-[#00000090] fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center`}
            >
              <div
                className={`${
                  closeModal === "closemodal" ? "hidden" : ""
                } bg-[#04684C] flex flex-col gap-5 justify-center items-center p-10 rounded-md w-[400px] relative max-[410px]:w-[300px]`}
              >
                <img src={lonalogo} alt="feelathomeLogo" />
                <button
                  onClick={handleProfile}
                  className="bg-white border-2 py-2 px-5 rounded-md cursor-pointer text-[#04684C] font-bold font-montserat"
                >
                  View Profile
                </button>
                <p className="text-green-600 font-bold text-2xl text-center">
                  Account Created Successfully!
                </p>
                <img
                  onClick={handleCloseModal}
                  className="absolute top-2 right-2 w-10 cursor-pointer"
                  src={xicon}
                  alt="xicon"
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
export default Registration;
