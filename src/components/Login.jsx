import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { loginErrorNotify, loginNotify } from "../Helpers/Popups/popups";
import { BASE_URL } from "../Helpers/constant";
import { FaCopyright } from "react-icons/fa";

const Login = () => {
  const [loginData, setLoginData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const LoginLoader = (
    <div className="flex space-x-1 m-auto items-center ">
      <div className="h-3 w-3 my-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-3 w-3 my-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.23s]"></div>
      <div className="h-3 w-3 my-1.5 bg-white rounded-full animate-bounce"></div>
    </div>
  );

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setShowPassword(false);
      setIsLoading(true);
      let { data } = await axios.post(`${BASE_URL}/api/users/login`, loginData);

      console.log(data);
      if (data) {
        navigate("/");
      }
      localStorage.setItem("userInfo", JSON.stringify(data));
      setIsLoading(false);
      loginNotify();
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(error?.response?.data?.message);
      if (error.message === "") {
        console.log("ERR", error.message);
        loginErrorNotify();
      }
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900   to-purple-700   h-screen flex flex-col items-center  justify-center">
      {/* <ToastContainer /> */}
      <div className="w-[90%]  px-5 md:w-[60%]  rounded-md  text-white pb-5  bg-gradient-to-t from-gray-900   to-purple-700 shadow-xl shadow-purple-700">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
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

          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Login to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm tracking-wide font-medium leading-6 text-white text-left ml-1"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  onFocus={() => setErrorMessage("")}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
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
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block tracking-wide text-sm font-semibold leading-6 text-white text-left ml-1"
                >
                  Password
                </label>
                <div className="text-sm cursor-pointer">
                  <Link
                    to="/forgotPassword"
                    className="font-semibold text-gray-800 hover:text-gray-900"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2 relative rounded-md shadow-sm">
                <input
                  onFocus={() => setErrorMessage("")}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md font-semibold border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    type="button"
                    className="text-gray-700 "
                  >
                    {showPassword ? (
                      <FaEye size={18} />
                    ) : (
                      <FaEyeSlash size={18} />
                    )}
                  </button>
                </div>
              </div>
              {errorMessage && (
                <div className="m-auto flex ml-1">
                  <span className="text-rose-700 mt-1 -mb-4 font-medium tracking-wide  m">
                    {errorMessage}
                  </span>
                </div>
              )}
            </div>

            <div>
              {/* <button
                // disabled={isPicUploading || isLoading}
                type="submit"
                className="flex w-full justify-center mt-5 rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isLoading ? (
                  LoginLoader
                ) : (
                  <span className="text-base font-bold tracking-wider">
                    Login
                  </span>
                )}
              </button> */}
              <button
                disabled={isLoading}
                type="submit"
                className="flex w-full justify-center mt-5 rounded-md bg-fuchsia-700 opacity-100 shadow-xl shadow-purple-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white  hover:bg-fuchsia-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isLoading ? (
                  LoginLoader
                ) : (
                  <span className="text-base font-bold tracking-wider">
                    Login
                  </span>
                )}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm font-medium tracking-widest text-white ">
            Not a member?
            <Link
              to="/signup"
              className="font-semibold tracking-widest leading-6 ml-1 text-sky-300 hover:text-sky-400"
            >
              Signup Here
            </Link>
          </p>
        </div>
        <div className="m-auto flex items-center mt-6 space-x-1 justify-center">
          <span>
            <FaCopyright size={15} />
          </span>
          <span className="font-medium tracking-wide">Prajwal.dev</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
