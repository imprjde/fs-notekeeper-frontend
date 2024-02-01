import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  passwordChangeSuccessNotify,
  passwordChangeErrorNotify,
  errorPopUP,
} from "../Helpers/Popups/popups";
import { BASE_URL } from "../Helpers/constant";
import { resetLoader } from "../Helpers/Loaders/Loaders";

const ResetPassword = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("userInfo"));
    setUserInfo(userData);
  }, []);

  const handleSubmit = async () => {
    if (confirmPassword?.trim() !== userInfo?.password?.trim()) {
      errorPopUP(" Password does not match");
    } else if (userInfo.password.length < 6) {
      errorPopUP("Password must contain atleast 6 characters");
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

        if (response) {
          setIsLoading(false);
          passwordChangeSuccessNotify();
          setTimeout(() => {
            navigate("/profile");
          }, 3000);
        }
      } catch (error) {
        setIsLoading(false);
        passwordChangeErrorNotify();
      }
    }
  };
  return (
    <div className="min-h-screen h-screen bg-gradient-to-b from-purple-700  to-black m-auto flex flex-col justify-center items-center pb-10">
      <ToastContainer />

      <div className="flex  w-[90%] md:w-[30%] flex-col space-y-5 bg-white pt-14 pb-8 bg-opacity-30 px-10 ">
        <span>
          <input
            onChange={(e) =>
              setUserInfo({ ...userInfo, password: e.target.value.trim() })
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
            className="bg-transparent mt-3 w-[60%] md:w-[70%] m-auto flex bg-gray-100  text-gray-900 font-medium   rounded-2xl  px-2  border border-white py-1 justify-center"
          >
            {isLoading ? resetLoader : "Change Password"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
