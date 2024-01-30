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

const ResetPassword = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  console.log(isLoading);

  const resetLoader = (
    <div role="status">
      <svg
        aria-hidden="true"
        class="inline w-5 h-5 text-black font-bold  animate-spin dark:text-gray-600 fill-white"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span class="sr-only">Loading...</span>
    </div>
  );

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("userInfo"));
    setUserInfo(userData);
  }, []);

  const handleSubmit = async () => {
    if (confirmPassword !== userInfo.password) {
      errorPopUP(" Password does not match");
    } else if (userInfo.password.length < 6) {
      console.log("Password maust be atleast 6 letters");
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

        console.log(response);
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
