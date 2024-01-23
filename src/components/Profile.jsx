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
  const gradientStyle = {
    background:
      "linear-gradient(to top, rgb(56, 189, 248), rgb(186, 230, 253))",
  };

  const updateProfileLoader = (
    <div className="flex m-auto justify-center">
      <img
        class="w-5 h-5 animate-spin"
        src="https://www.svgrepo.com/show/448500/loading.svg"
        alt="Loading icon"
      />
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
        className="min-h-screen h-full  m-auto flex justify-center items-center pb-10"
        style={gradientStyle}
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