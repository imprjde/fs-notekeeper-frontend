import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  passwordChangeSuccessNotify,
  passwordChangeErrorNotify,
} from "../Helpers/Popups/popups";
import { BASE_URL } from "../Helpers/constant";

const ResetPassword = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const gradientStyle = {
    background:
      "linear-gradient(90deg, rgba(2,0,36,1) 23%, rgba(9,9,121,1) 48%, rgba(0,212,255,1) 100%)",
  };

  console.log(isLoading);

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("userInfo"));
    setUserInfo(userData);
  }, []);

  const handleSubmit = async () => {
    if (confirmPassword !== userInfo.password) {
      console.log("Password does not match");
      setErrorMessage(" Password does not match");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
    } else if (userInfo.password.length < 6) {
      console.log("Password maust be atleast 6 letters");
      setErrorMessage("Password must contain atleast 6 characters");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
    } else {
      try {
        setIsLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const response = await axios.post(
          `${BASE_URL}/api/users/profile`,
          userInfo,
          config
        );

        console.log(response);
        if (response) {
          setIsLoading(false);
          passwordChangeSuccessNotify();
          setTimeout(() => {
            navigate("/profile");
          }, 2000);
        }
      } catch (error) {
        setIsLoading(false);
        passwordChangeErrorNotify();
      }
    }
  };
  return (
    <div
      className="min-h-screen h-screen  m-auto flex flex-col justify-center items-center pb-10"
      style={gradientStyle}
    >
      <ToastContainer />
      {errorMessage && (
        <div className="absolute top-64 md:top-24  m-auto w-[90%] md:w-[31%] left-0 right-0 text-red-500 p-2 text-center">
          <div
            class="px-4 py-3 leading-normal text-red-100 bg-red-700 rounded-lg"
            role="alert"
          >
            <p>{errorMessage}</p>
          </div>
        </div>
      )}
      <div className="flex  w-[90%] md:w-[30%] flex-col space-y-5 bg-white pt-14 pb-8 bg-opacity-30 px-10 ">
        <span>
          <input
            onChange={(e) =>
              setUserInfo({ ...userInfo, password: e.target.value })
            }
            type="password"
            placeholder="Password"
            className="h-7 font-semibold w-full  text-sm placeholder:text-gray-200 placeholder:text-sm focus:border-b-black tracking-wide text-gray-900 bg-transparent  border-gray-100 border-x-0  border-t-0 focus:outline-none focus:ring-0 "
          />{" "}
        </span>
        <span>
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            type="password"
            placeholder="Confirm password"
            className="h-7 font-semibold w-full  text-sm placeholder:text-gray-200 placeholder:text-sm focus:border-b-black tracking-wide text-gray-900 bg-transparent  border-gray-100 border-x-0  border-t-0 focus:outline-none focus:ring-0 "
          />
        </span>
        <div>
          <button
            onClick={handleSubmit}
            className="bg-transparent mt-3 w-[60%] md:w-[50%] m-auto flex  text-white font-medium hover:bg-gray-200 hover:text-gray-900 rounded-2xl  px-2  border border-white py-1 justify-center"
          >
            Change Password
            {/* {resetLoader} */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
