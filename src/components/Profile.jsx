import React, { useEffect, useRef, useContext, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  picTypeErrorNotify,
  profileUpdateErrorNotify,
  profileUpdateSuccessNotify,
  profileUpdateValidationError,
  somethingWentWrongNotify,
} from "../Helpers/Popups/popups";
import { ToastContainer } from "react-toastify";
import Header from "./Header";
import LogoutModal from "../Helpers/Modals/LogoutModal";
import { motion, AnimatePresence } from "framer-motion";
import { appContext } from "../context";
import { BASE_URL } from "../Helpers/constant";
import { updateProfileLoader } from "../Helpers/Loaders/Loaders";

const Profile = () => {
  const [editState, setEditState] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [picEditState, setPicEditState] = useState(false);
  const [isPicLoading, setIsPicLoading] = useState(false);
  const { isLogoutModalOpen } = useContext(appContext);

  const inputRef = useRef();

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
          setUserInfo({ ...userInfo, pic: data.url.toString() });
          setIsPicLoading(false);
        })
        .catch((error) => {
          setIsPicLoading(false);
          somethingWentWrongNotify();
        });
    } else {
      picTypeErrorNotify();
    }
  };

  const handleSubmit = async () => {
    if (userInfo.name?.trim().length === 0) {
      profileUpdateValidationError("Name cannot be empty");

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
          setEditState(false);
          setPicEditState(false);
          profileUpdateSuccessNotify();
        }
      } catch (error) {
        setIsLoading(false);
        setPicEditState(false);
        profileUpdateErrorNotify();
      }
    } else {
      profileUpdateValidationError("Invalid email format");
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
      <div className="min-h-screen h-full bg-gradient-to-b from-purple-700  to-black  m-auto flex justify-center items-center pb-10">
        <ToastContainer />
        <div className="bg-white -mt-28 md:mt-0 shadow-lg shadow-orange-600 bg-opacity-70 w-[90%] md:w-[30%] rounded-md px-5 py-5">
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

              <div
                onClick={() => {
                  document.getElementById("avatarInput").click();
                }}
                className="relative flex flex-col m-auto mt-2  items-center"
              >
                <button
                  disabled={isPicLoading || isLoading}
                  className="bg-gradient-to-r  -inset-5  from-sky-600  to-rose-600 blur-lg shadow-md shadow-pink-500  h-7 w-[145px] rounded-[4px]"
                ></button>
                <button
                  disabled={isPicLoading || isLoading}
                  className=" absolute tracking-wider text-white  font-medium  bg-gradient-to-r  from-pink-600 to-pink-950 h-7 w-[145px] rounded-[4px]"
                >
                  {isPicLoading ? "Loading..." : " Change Picture"}
                </button>
              </div>
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
            <div className="bg-white bg-opacity-60 px-10 space-y-5 py-6 mt-3">
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
                    setUserInfo({ ...userInfo, email: e.target.value?.trim() })
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
                className="inline-block px-3 py-1 text-sm bg-orange-500 bg-opacity-90 font-medium text-white  rounded-[4px] shadow-lg shadow-amber-900 mt-1  "
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <div className="m-auto w-full flex justify-between space-x-3  mt-2 pr-2">
              <Link
                to={`/${userInfo?.id}/reset`}
                style={{ textShadow: "4px 4px 4px  rgb(255,255,255)" }}
                className="font-semibold ml-1 text-sm md:text-base text-gray-900 inline-flex items-center tracking-wider "
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
                  className="inline-block w-[90px] bg-orange-500 bg-opacity-90 text-white font-semibold tracking-wider text-sm px-3 py-[4px] rounded-[4px] shadow-lg shadow-amber-900 "
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
