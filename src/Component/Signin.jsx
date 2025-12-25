import React from "react";
import keyicon from "../assets/icons8-access-64.png";
import mailicon from "../assets/icons8-mail-50.png";
import { useState } from "react";
import * as yup from "yup";
import showpassword from "../assets/show eye.svg";
import hidepassword from "../assets/hide eye.svg";
import lonalogo from "../assets/lona logo.png";
import xicon from "../assets/xicon.png";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { auth } from "../../Firebase";
import { doc, setDoc } from "firebase/firestore";
import { dataBase } from "../../Firebase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Signin = () => {
  const [showPasword, setShowPassword] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const [loginSubmissionStatus, setLoginSubmissionStatus] = useState(null);
  const [closeModal, setCloseModal] = useState("");
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  function handleLoginFormChange(e) {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  }
  function resetForm() {
    setLoginFormData({
      email: "",
      password: "",
    });
  }

  async function handleLoginFormSubmit(e) {
    e.preventDefault();
    try {
      await schema.validate(loginFormData, { abortEarly: false });
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginFormData.email,
        loginFormData.password
      );
      const user = userCredential.user;
      setLoginSubmissionStatus(true);
      setErrorMessages({});
      resetForm();
      window.location.href = "/profile";
    } catch (err) {
      if (err.inner) {
        const errors = {};
        err.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        setErrorMessages(errors);
      } else {
        setErrorMessages({ general: err.message });
      }
      setLoginSubmissionStatus(false);
      resetForm();
    }
  }

  function togglePasswordVisibility() {
    setShowPassword(!showPasword);
  }
  function handleCloseModal() {
    setCloseModal("closemodal");
  }
  function handleSignupForm() {
    navigate("/registration");
  }
  return (
    <>
      <section className="bg-[#F7F7F7] mx-auto p-20 w-full flex flex-col gap-10 font-montserat max-[600px]:px-5">
        <div className="flex justify-center items-center max-[800px]:flex-col">
          <div className=" bg-[#04684C] flex flex-col gap-2  p-10 rounded-t-md md:rounded-tr-none md:rounded-l-md w-full lg:w-1/2 h-[450px]">
            <h1 className="text-white text-center text-3xl font-bold mb-2">
              Sign In
            </h1>
            <div className="flex items-center justify-center gap-10">
              <img className="w-10" src={mailicon} alt="mailicon" />
              <img className="w-10" src={keyicon} alt="keyicon" />
            </div>
            <form
              onSubmit={handleLoginFormSubmit}
              className="flex flex-col relative"
            >
              <input
                onChange={handleLoginFormChange}
                className="w=full p-4 outline-0 bg-white rounded-2xl mt-3"
                name="email"
                type="email"
                placeholder="EMAIL"
                value={loginFormData.email}
              />
              {errorMessages.email && (
                <p className="text-red-600">{errorMessages.email}</p>
              )}

              <div className="relative flex flex-col">
                <input
                  onChange={handleLoginFormChange}
                  className="w=full p-4 outline-0 bg-white rounded-2xl mt-3"
                  name="password"
                  value={loginFormData.password}
                  type={`${showPasword ? "text" : "password"}`}
                  placeholder="PASSWORD"
                />
                {errorMessages.password && (
                  <p className="text-red-600">{errorMessages.password}</p>
                )}
                <img
                  onClick={togglePasswordVisibility}
                  className="w-7 absolute top-7 right-3 cursor-pointer"
                  src={`${showPasword ? hidepassword : showpassword}`}
                  alt="showpassword"
                />
              </div>
              <div className="mx-auto flex flex-col gap-5 mt-5">
                <p className="text-center"> Forgot Your Password?</p>
                <button className="bg-white border-2 py-2 px-3 rounded-md cursor-pointer text-[#04684C] font-bold font-montserat">
                  SIGN IN
                </button>
              </div>
            </form>
          </div>
          <div className="bg-[#1F4B43] text-white flex flex-col gap-10 justify-center items-center p-10 rounded-b-md md:rounded-bl-none md:rounded-r-md w-full lg:w-1/2 h-[450px]">
            <h1 className="font-bold text-4xl"> Hello, Friend!</h1>
            <p className="font-display">
              {" "}
              Enter your personal details and start your journey with us.
            </p>
            <button
              onClick={handleSignupForm}
              className="bg-white border-2 py-2 px-5 rounded-md cursor-pointer text-[#04684C] font-bold font-montserat"
            >
              {" "}
              SIGN UP
            </button>
          </div>
          {loginSubmissionStatus !== null &&
            (loginSubmissionStatus ? (
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
                  <img
                    src={lonalogo}
                    alt="
                  lonalogo"
                  />
                  <p className="text-green-600 font-bold text-2xl">
                    Welcome Back!
                  </p>
                  <img
                    onClick={handleCloseModal}
                    className="absolute top-2 right-2 w-10 cursor-pointer"
                    src={xicon}
                    alt="xicon"
                  />
                </div>
              </div>
            ) : (
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
                  <p className="text-red-600 font-bold text-2xl">
                    User Not Found
                  </p>
                  <img
                    onClick={handleCloseModal}
                    className="absolute top-2 right-2 w-10 cursor-pointer"
                    src={xicon}
                    alt="xicon"
                  />
                </div>
              </div>
            ))}
        </div>
      </section>
    </>
  );
};
export default Signin;
