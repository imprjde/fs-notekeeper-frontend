import React, { useEffect, useRef, useContext, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  picTypeErrorNotify,
  profileUpdateErrorNotify,
  profileUpdateSuccessNotify,
  somethingWentWrongNotify,
} from "../Helpers/Popups/popups";
import { ToastContainer } from "react-toastify";
import Header from "./Header";
import LogoutModal from "../Helpers/Modals/LogoutModal";
import { motion, AnimatePresence } from "framer-motion";
import { appContext } from "../context";
import { BASE_URL } from "../Helpers/constant";

const Profile = () => {
  const [editState, setEditState] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [picEditState, setPicEditState] = useState(false);
  const [isPicLoading, setIsPicLoading] = useState(false);
  const { isLogoutModalOpen } = useContext(appContext);

  console.log("USERINFO DA->", userInfo);
  const inputRef = useRef();

  const updateProfileLoader = (
    <div role="status">
      <svg
        aria-hidden="true"
        class="inline w-4 h-4 text-gray-900 animate-spin dark:text-gray-600 fill-white"
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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const postPicture = (pics) => {
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      setIsPicLoading(true);
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "fullstack-notekeeper-cloudinary");
      data.append("cloud_name", "imprjde");
      fetch("https://api.cloudinary.com/v1_1/imprjde/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setUserInfo({ ...userInfo, pic: data.url.toString() });
          setIsPicLoading(false);
        })
        .catch((error) => {
          setIsPicLoading(false);
          somethingWentWrongNotify();
          console.log(error);
        });
    } else {
      picTypeErrorNotify();
    }
  };

  const handleSubmit = async () => {
    if (userInfo.email.length === 0) {
      console.log("Email Cannot be Empty");

      //Show a toastify Pop up
      return;
    }
    if (validateEmail(userInfo?.email)) {
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
          localStorage.setItem("userInfo", JSON.stringify(response.data));
          setIsLoading(false);
          console.log(response);
          setEditState(false);
          profileUpdateSuccessNotify();
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        profileUpdateErrorNotify();
      }
    } else {
      console.log("Invalid Email Format");

      //Show Pop up or error message
    }
  };
  return (
    <>
      <Header />
      <AnimatePresence>
        {" "}
        {isLogoutModalOpen && (
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <LogoutModal />
          </motion.span>
        )}
      </AnimatePresence>
      <div
        className="min-h-screen h-full bg-gradient-to-b from-purple-700  to-black  m-auto flex justify-center items-center pb-10"
      >
        <ToastContainer />
        <div className="bg-white bg-opacity-70 w-[90%] md:w-[30%] rounded-md px-5 py-5">
          {!picEditState ? (
            <div>
              <div className="m-auto flex justify-center group relative">
                <img
                  className="w-32 h-32 rounded-full  z-20 border-2 border-white"
                  src={userInfo?.pic}
                  alt="Profile Pic"
                />
              </div>
              <button className="bg-blue-500 opacity-0 cursor-default px-3 mt-2 rounded-md py-0.5 text-white font-medium">
                Change Picture
              </button>
            </div>
          ) : (
            <div>
              <div className="m-auto flex justify-center group cursor-pointer relative">
                <label htmlFor="avatarInput" className="relative">
                  <img
                    className="w-32 h-32 rounded-full cursor-pointer z-20 border-2 border-white"
                    src={userInfo?.pic}
                    alt="avatar"
                  />
                  <input
                    onChange={(e) => postPicture(e.target.files[0])}
                    id="avatarInput"
                    className="w-28 h-w-28 rounded-full cursor-pointer opacity-0 absolute top-0 left-0 z-10"
                    type="file"
                  />
                </label>
              </div>
              {/* <button
                className="bg-blue-500 px-3 mt-2 rounded-md py-0.5 text-white font-medium"
                onClick={() => {
                  document.getElementById("avatarInput").click();
                }}
              >
                {isPicLoading ? "Loading Picture" : "Change Picture"}
              </button> */}

              <button
                onClick={() => {
                  document.getElementById("avatarInput").click();
                }}
                className={`text-sm w-[128px] ${
                  isPicLoading ? "bg-teal-400" : "bg-teal-500"
                } mt-2 text-white font-medium px-3 py-0.5 rounded-md tracking-wide`}
              >
                {isPicLoading ? "Loading..." : " Change Picture"}
              </button>
            </div>
          )}

          {!editState ? (
            <div className="bg-white bg-opacity-60 px-10 space-y-5 py-5 mt-3">
              <div>
                <span className="h-7 pl-3 text-sm pt-1 tracking-wide text-gray-900 font-semibold flex m-auto border  border-b-black border-t-0 border-x-0 text-left justify-left w-[90%]">
                  {userInfo?.name}
                </span>
              </div>
              <div>
                <span className="h-7 pl-3 text-sm pt-1 tracking-wide text-gray-900 font-semibold flex m-auto border  border-b-black border-t-0 border-x-0 text-left justify-left w-[90%]">
                  {userInfo?.email}
                </span>
              </div>
            </div>
          ) : (
            <div className="bg-white bg-opacity-60 px-10 space-y-5 py-5 mt-3">
              <div>
                <input
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, name: e.target.value })
                  }
                  ref={inputRef}
                  value={userInfo?.name}
                  placeholder="Name"
                  className="h-7  font-semibold w-[90%] text-sm placeholder:text-gray-900 placeholder:text-sm focus:border-b-black tracking-wide text-gray-900 bg-transparent  border-b-black border-x-0  border-t-0 focus:outline-none focus:ring-0 "
                />
              </div>
              <div>
                <input
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, email: e.target.value })
                  }
                  value={userInfo?.email}
                  placeholder="Email"
                  type="email"
                  required
                  className="h-7 font-semibold w-[90%] text-sm placeholder:text-gray-900 placeholder:text-sm focus:border-b-black tracking-wide text-gray-900 bg-transparent  border-b-black border-x-0  border-t-0 focus:outline-none focus:ring-0 "
                />
              </div>
            </div>
          )}

          {!editState ? (
            <div className="m-auto w-full flex justify-end mt-2 pr-2">
              <button
                onClick={() => {
                  setEditState(true);
                  setPicEditState(true);
                  setTimeout(() => {
                    inputRef.current.focus();
                  }, 10);
                }}
                className="inline-block px-3 py-1 text-sm bg-orange-500 bg-opacity-90 font-medium text-white border-2 border-white rounded-md  "
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <div className="m-auto w-full flex  justify-between space-x-3  mt-2 pr-2">
              <Link
                to={`/${userInfo?.id}/reset`}
                className="font-medium ml-1 text-sm md:text-base text-fuchsia-600 inline-flex items-center "
              >
                Change Password{" "}
                <span className="ml-1">
                  <FaArrowRight />
                </span>
              </Link>

              <div>
                <button
                  disabled={isPicLoading || isLoading}
                  onClick={handleSubmit}
                  className="inline-block w-[80px] bg-orange-500 bg-opacity-90 text-white font-semibold tracking-wider text-sm px-3 py-1.5 border-2 border-white rounded-md   "
                >
                  {isLoading ? updateProfileLoader : "Save"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
