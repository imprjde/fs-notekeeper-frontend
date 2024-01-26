import React, { useContext, useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { appContext } from "../context";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const {
    setIsLogoutModalOpen,
    setSearchBarOpen,
    searchBarOpen,
    searchQuery,
    setSearchQuery,
  } = useContext(appContext);

  const handleToggleNav = () => {
    setIsNavOpen(!isNavOpen);
    setSearchBarOpen(false);
  };

  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
  }, []);

  return (
    <div className="w-full h-[80px]  bg-gradient-to-r from-gray-900 to-purple-700 shadow-lg shadow-cyan-400 z-40 top-0 sticky  ">
      <div className="m-auto h-full justify-between flex items-center px-2 md:px-8">
        <Link
          to="/"
          className="md:text-4xl cursor-pointer tracking-wider font-extrabold text-purple-600 space-x-2"
        >
          <span
            style={{ textShadow: "4px 4px 4px rgb(255,255,255)" }}
            className="text-2xl md:text-4xl "
          >
            PURPLE
          </span>
          <span
            style={{ textShadow: "4px 4px 4px rgb(255,255,255)" }}
            className="text-white  tracking-wider text-2xl md:text-4xl drop-shadow-white drop-shadow-xl"
          >
            NOTE
          </span>
        </Link>
        <form className=" items-center hidden md:flex -space-x-2 mr-[30px] md:m-auto ">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            type="text"
            placeholder="Search Notes..."
            className="block w-[160px]  md:w-[300px]  rounded-md focus:outline-none focus:ring-0  font-semibold border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400   sm:text-sm sm:leading-6"
          />

          <button className="bg-white border border-gray-400  md:hidden py-[7px] text-purple-800  px-5  rounded-r-md">
            <FaSearch size={22} />
          </button>
          <button className="bg-white border  hidden md:flex py-[6px] text-purple-800 px-5  rounded-r-md ">
            <FaSearch size={22} />
          </button>
        </form>

        {userInfo !== null ? (
          <span className="space-x-3 hidden md:flex items-center mr-5">
            <Link to="/profile">
              <span className="flex m-auto items-center cursor-pointer space-x-3 rounded-md bg-gray-900 bg-opacity-80  shadow-lg shadow-gray-300  px-4 py-1.5">
                <img
                  src={userInfo.pic}
                  className=" h-[40px] w-[40px] rounded-full  cursor-pointer"
                  alt="Profile Pic"
                />
                <span className="text-white font-medium tracking-wide">
                  My Profile
                </span>
              </span>
            </Link>
            <span
              onClick={() => setIsLogoutModalOpen(true)}
              className="text-rose-600 bg-gray-700 bg-opacity-80 shadow-lg shadow-rose-600 pl-2 pr-1 py-[10px] rounded-md  cursor-pointer"
            >
              <TbLogout size={30} />
            </span>
          </span>
        ) : (
          <div className="space-x-3 mr-5 hidden md:flex">
            <Link
              to="/signup"
              class="relative inline-flex items-center justify-start px-5 py-1.5 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group"
            >
              <span class="w-48 h-48 rounded rotate-[-40deg] bg-purple-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
              <span class="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
                Signup
              </span>
            </Link>

            <Link
              to="/login"
              class="relative inline-flex items-center justify-start px-5 py-1.5 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group"
            >
              <span class="w-48 h-48 rounded rotate-[-40deg] bg-purple-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
              <span class="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
                Login
              </span>
            </Link>
          </div>
        )}

        <div className="flex m-auto h-full items-center md:hidden space-x-8 mr-3">
          <span
            onClick={() => setSearchBarOpen(!searchBarOpen)}
            className="text-gray-100 cursor-pointer"
          >
            <FaSearch size={22} />
          </span>
          <span
            onClick={handleToggleNav}
            className="bg-gradient-to-b from-fuchsia-500 to-fuchsia-900 px-2 py-1 md:hidden text-white rounded-md cursor-pointer"
          >
            <GiHamburgerMenu size={25} />
          </span>
        </div>
        <AnimatePresence>
          {isNavOpen && (
            <motion.div
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 200 }}
              transition={{ duration: 0.1, ease: "easeInOut" }}
              className="md:hidden bottom-0  absolute top-0 right-0 border transition ease-out delay-150 duration-250 w-[190px] bg-white bg-opacity-90  h-screen z-50 shadow-md opacity-100"
            >
              <div
                onClick={handleToggleNav}
                className="mt-7 cursor-pointer  text-gray-900   flex m-auto justify-end mr-6"
              >
                <IoClose size={25} />
              </div>

              <div className="m-auto justify-center  shadow-lg shadow-purple-700 flex flex-col space-y-2 mt-14 bg-white  py-5   mx-3 rounded-lg">
                <span className="m-auto justify-center flex flex-col">
                  <img
                    className="w-20 h-20 rounded-full"
                    src={userInfo?.pic}
                    alt=""
                  />
                </span>
                <span className="text-gray-900 font-semibold">
                  {userInfo?.name}
                </span>
              </div>

              <div className="flex flex-col mt-10 space-y-5  font-medium tracking-wider ">
                <Link
                  to="/profile"
                  className="bg-white shadow-lg shadow-purple-700 border border-purple-500 text-gray-900 mx-4 py-1 rounded-md cursor-pointer"
                >
                  MY PROFILE
                </Link>
                <div className="w-full flex m-auto flex-col pt-5">
                  <span
                    onClick={() => {
                      setIsLogoutModalOpen(true);
                      setIsNavOpen(false);
                    }}
                    className="bg-rose-500 space-x-2 shadow-xl shadow-pink-800 inline-flex mx-4 text-center  m-auto justify-center items-center text-white  py-1 rounded-md cursor-pointer"
                  >
                    <span>Logout</span>
                    <span>
                      <TbLogout size={20} />
                    </span>
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Header;
