import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import {
  signupSuccessNotify,
  signupErrorNotify,
} from "../Helpers/Popups/popups";
import { BASE_URL } from "../Helpers/constant";
import { FaCopyright } from "react-icons/fa";
import { signupLoader } from "../Helpers/Loaders/Loaders";

const Signup = () => {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPicUploading, setIspicUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pic, setPic] = useState("");
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();

  const postDetails = (pics) => {
    if (!pics) {
      alert("Please Select a Image");
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      setIspicUploading(true);
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
          setPic(data.url.toString());
          setIspicUploading(false);
        })
        .catch((error) => {
          setIspicUploading(false);
        });
    } else {
      alert("File can only of Type .jpeg or .png");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (
      !signupData.name ||
      !signupData.email ||
      !signupData.password ||
      !confirmPassword
    ) {
      setFormError("Please fill all the fields");
      return;
    }

    if (confirmPassword !== signupData.password) {
      setFormError("Password does not match");
      return;
    }

    if (signupData.password.length < 6) {
      setFormError("Password should be minimun 6 characters long");
      return;
    }

    if (/\s/.test(signupData.password)) {
      setFormError("Password should not contain spaces");
      return;
    }

    if (!pic) {
      setFormError("Please select a profile picture");
      return;
    }

    try {
      setIsLoading(true);
      const { data } = await axios.post(`${BASE_URL}/api/users`, {
        ...signupData,
        pic: pic,
      });

      if (data) {
        signupSuccessNotify();
        setTimeout(() => {
          navigate("/");
        }, 2100);
      }
      localStorage.setItem("userInfo", JSON.stringify(data));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      signupErrorNotify("Signup failed. try again later.");
    }
  };

  return (
    <div className="bg-cover bg-center bg-gradient-to-b from-gray-900   to-purple-700 min-h-screen flex flex-col items-center justify-center">
      <ToastContainer />
      <div className="w-[90%]  px-5 md:w-[60%]  rounded-md  m-10 text-white pb-5 bg-gradient-to-t from-gray-900 to-purple-700 shadow-xl shadow-purple-700">
        <div className="mt-5 md:text-4xl tracking-wider font-extrabold text-purple-600 space-x-2">
          <span
            style={{ textShadow: "4px 4px 4px rgb(0,0,0)" }}
            className="text-4xl "
          >
            PURPLE
          </span>
          <span
            style={{ textShadow: "4px 4px 4px rgb(0,0,0)" }}
            className="text-white  tracking-wider  text-4xl drop-shadow-white drop-shadow-xl"
          >
            NOTE
          </span>
        </div>

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSignup} className="space-y-4 md:space-x-2">
            {!pic ? (
              <div className="m-auto flex justify-center group cursor-pointer relative">
                <label htmlFor="avatarInput" className="relative">
                  <img
                    className="w-20 h-2w-20 rounded-full  cursor-pointer z-20 border-2 border-white"
                    src="https://i.ibb.co/5FTR3vY/avatar.png"
                    alt="avatar"
                  />
                  <input
                    onChange={(e) => postDetails(e.target.files[0])}
                    id="avatarInput"
                    className="w-20 h-2w-20 rounded-full cursor-pointer opacity-0 absolute top-0 left-0 z-10"
                    type="file"
                  />
                </label>
                <span className="w-20 h-w-20 flex m-auto mt-6 text-sm justify-center text-white font-semibold tracking-wider items-center absolute opacity-0 group-hover:opacity-100 ">
                  Upload Profile
                </span>
              </div>
            ) : (
              <div className="m-auto flex justify-center group cursor-pointer relative">
                <label htmlFor="avatarInput" className="relative">
                  <img
                    className="w-20 h-2w-20 rounded-full  cursor-pointer z-20 border-2 border-white"
                    src={pic}
                    alt="profile pic"
                  />
                </label>
              </div>
            )}

            <div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm tracking-wide font-medium leading-6 text-white text-left ml-1"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    value={signupData.name}
                    onFocus={() => setFormError(null)}
                    onChange={(e) =>
                      setSignupData({ ...signupData, name: e.target.value })
                    }
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="block w-full rounded-md font-semibold border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm tracking-wide font-medium leading-6 text-white text-left ml-1"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    value={signupData.email}
                    onFocus={() => setFormError(null)}
                    onChange={(e) =>
                      setSignupData({ ...signupData, email: e.target.value })
                    }
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md font-semibold border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm tracking-wide font-medium leading-6 text-white text-left ml-1"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    value={signupData.password}
                    onFocus={() => setFormError(null)}
                    onChange={(e) =>
                      setSignupData({ ...signupData, password: e.target.value })
                    }
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="block w-full rounded-md font-semibold border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm tracking-wide font-medium leading-6 text-white text-left ml-1"
                >
                  Confirm password
                </label>
                <div className="mt-2">
                  <input
                    value={confirmPassword}
                    onFocus={() => setFormError(null)}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className="block w-full rounded-md  font-semibold border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                {formError && (
                  <span className="text-left m-auto font-medium text-sm mt-1 text-red-600 tracking-wider ml-1 -mb-3 flex justify-start">
                    {formError}
                  </span>
                )}
                <button
                  disabled={isPicUploading || isLoading}
                  type="submit"
                  className="flex w-full justify-center mt-5 rounded-md bg-fuchsia-700 opacity-100 shadow-xl shadow-purple-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white  hover:bg-fuchsia-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {isPicUploading ? (
                    <div className="flex text-sm ">
                      Loading Picture{" "}
                      <span className="flex ml-2">{signupLoader}</span>{" "}
                    </div>
                  ) : isLoading ? (
                    signupLoader
                  ) : (
                    <span className="text-base font-bold tracking-wider">
                      Signup
                    </span>
                  )}
                </button>
              </div>
            </div>
          </form>

          <p className=" mt-10 md:mt-5 text-center text-sm font-medium tracking-widest text-white ">
            Already have a account?
            <Link
              to="/login"
              className="font-semibold tracking-widest leading-6 ml-1 text-sky-300 hover:text-sky-400"
            >
              Login Here
            </Link>
          </p>
        </div>
        <div className="m-auto flex items-center mt-6 md:mt-4 space-x-1 justify-center">
          <span>
            <FaCopyright size={15} />
          </span>
          <span className="font-medium tracking-wide">Prajwal.dev</span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
