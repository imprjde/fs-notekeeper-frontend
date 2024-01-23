import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import {
  signupSuccessNotify,
  signupErrorNotify,
} from "../Helpers/Popups/popups";
import { BASE_URL } from "../Helpers/constant";

const Signup = () => {
  const [signupData, setSignupData] = useState({});
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPicUploading, setIspicUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pic, setPic] = useState("");
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();

  const gradientStyle = {
    background: "linear-gradient(rgb(56, 189, 248), rgb(186, 230, 253))",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  };

  const signupLoader = (
    <div className="flex space-x-1 m-auto items-center ">
      <div className="h-3 w-3 my-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-3 w-3 my-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.23s]"></div>
      <div className="h-3 w-3 my-1.5 bg-white rounded-full animate-bounce"></div>
    </div>
  );

  const postDetails = (pics) => {
    console.log(pics);
    if (pics) {
      console.log(true);
    } else {
      console.log(false);
    }
    if (!pics) {
      console.log("Please Select a Image");
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
          console.log(data);
          setPic(data.url.toString());
          setIspicUploading(false);
        })
        .catch((error) => {
          setIspicUploading(false);
          console.log(error);
        });
    } else {
      console.log("File can only of Type .jpeg or .png");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    console.log(signupData.password.length);

    if (
      !signupData.name ||
      !signupData.email ||
      !signupData.password ||
      !confirmPassword
    ) {
      setFormError("Please fill all the fields");
      return;
    }

    // Check if password matches
    if (confirmPassword !== signupData.password) {
      console.error("Password does not match");
      setFormError("Password does not match");
      return;
    }

    if (signupData.password.length < 6) {
      setFormError("Password should be minimun 6 characters long");
      return;
    }
    if (!pic) {
      // Check if there is a profile picture
      console.error("Please select a profile picture");
      setFormError("Please select a profile picture");
      return;
    }

    // If all validations pass, proceed with signup
    try {
      setIsLoading(true);
      const { data } = await axios.post(`${BASE_URL}/api/users`, {
        ...signupData,
        pic: pic,
      });

      console.log(data);
      if (data) {
        console.log("TRUE");
        signupSuccessNotify();
        setTimeout(() => {
          navigate("/");
        }, 2100);
      }
      localStorage.setItem("userInfo", JSON.stringify(data));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      signupErrorNotify();
      console.error("Error during signup:", error);
    }
  };

  console.log("PIC", pic);

  return (
    <div
      className="bg-cover bg-center min-h-screen flex flex-col items-center justify-center"
      style={gradientStyle}
    >
      <ToastContainer />
      <div className="w-[90%]  px-5 md:w-[60%] bg-black rounded-md bg-opacity-30 m-10 text-white pb-5">
        {/* <div className="mt-5 md:text-4xl font-extrabold text-sky-500 space-x-2">
          <span className="text-4xl ">THE</span>
          <span className="text-orange-500 text-4xl drop-shadow-white drop-shadow-xl">
            NOTE
          </span>
        </div> */}

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSignup} className="space-y-4">
            {!pic ? (
              <div className="m-auto flex justify-center group cursor-pointer relative">
                <label htmlFor="avatarInput" className="relative">
                  <img
                    className="w-24 h-24 rounded-full  cursor-pointer z-20 border-2 border-white"
                    src="https://i.ibb.co/5FTR3vY/avatar.png"
                    alt="avatar"
                  />
                  <input
                    onChange={(e) => postDetails(e.target.files[0])}
                    id="avatarInput"
                    className="w-24 h-24 rounded-full cursor-pointer opacity-0 absolute top-0 left-0 z-10"
                    type="file"
                  />
                </label>
                <span className="w-24 h-w-24 flex m-auto mt-6 text-sm justify-center text-white font-semibold tracking-wider items-center absolute opacity-0 group-hover:opacity-100 ">
                  Upload Profile
                </span>
              </div>
            ) : (
              <div className="m-auto flex justify-center group cursor-pointer relative">
                <label htmlFor="avatarInput" className="relative">
                  <img
                    className="w-24 h-24 rounded-full  cursor-pointer z-20 border-2 border-white"
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
                  className="flex w-full justify-center mt-5 rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {isPicUploading ? (
                    <div className="flex text-base ">
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

          <p className="mt-5 text-center text-sm font-bold tracking-widest text-white">
            Already have a account?
            <Link
              to="/login"
              className="font-semibold tracking-widest leading-6 ml-1 text-gray-800 hover:text-gray-900"
            >
              Login Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
