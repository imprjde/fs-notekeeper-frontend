// import React, { useContext, useEffect, useState } from "react";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { IoClose } from "react-icons/io5";
// import { BiLogOut } from "react-icons/bi";
// import {
//   Drawer,
//   Button,
//   Typography,
//   IconButton,
// } from "@material-tailwind/react";
// import { Link } from "react-router-dom";
// import { FaSearch } from "react-icons/fa";
// import { appContext } from "../context";
// import { motion } from "framer-motion";

// const gradientStyle = {
//   background: "linear-gradient(rgb(56, 189, 248), rgb(186, 230, 253)",
// };

// const Header = () => {
//   const [isNavOpen, setIsNavOpen] = useState(false);
//   const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
//   const [userInfo, setUserInfo] = useState(null);
//   const { isLogoutModalOpen, setIsLogoutModalOpen } = useContext(appContext);

//   const handleToggleNav = () => {
//     setIsNavOpen(!isNavOpen);
//   };

//   useEffect(() => {
//     setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
//   }, []);
//   return (
//     <div
//       className="w-full h-[75px] z-40 border-b border-b-gray-400 top-0 sticky  "
//       style={gradientStyle}
//     >
//       <div className="m-auto h-full justify-between flex items-center px-2 md:px-8">
//         <Link
//           to="/"
//           className="text-xl md:text-4xl font-extrabold text-sky-500"
//         >
//           THE <span className="text-orange-500">NOTE</span>
//         </Link>
//         <form className="flex items-center -space-x-2 mr-[30px] md:m-auto">
//           <input
//             type="text"
//             placeholder="Search Notes..."
//             className="block w-[160px]  md:w-[300px]  rounded-md focus:outline-none focus:ring-0  font-semibold border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400   sm:text-sm sm:leading-6"
//           />

//           <button className="bg-white border border-gray-400  md:hidden py-[7px] text-sky-600 px-5  rounded-r-md">
//             <FaSearch size={22} />
//           </button>
//           <button className="bg-white border  hidden md:flex py-[6px] text-sky-600 px-5  rounded-r-md ">
//             <FaSearch size={22} />
//           </button>
//         </form>

//         {userInfo !== null ? (
//           <span className="space-x-3 hidden md:flex items-center mr-5">
//             <Link to="/profile">
//               <span className="flex m-auto items-center cursor-pointer space-x-3 rounded-md bg-black bg-opacity-50 hover:bg-opacity-30 px-4 py-1">
//                 <img
//                   src={userInfo.pic}
//                   className=" h-[40px] w-[40px] rounded-full  cursor-pointer"
//                   alt="Profile Pic"
//                 />
//                 <span className="text-white font-medium tracking-wide">
//                   My Profile
//                 </span>
//               </span>
//             </Link>
//             <span
//               onClick={() => setIsLogoutModalOpen(true)}
//               className="text-red-500 bg-gray-400 bg-opacity-40 pl-2 pr-3 py-2 rounded-full  cursor-pointer"
//             >
//               <BiLogOut size={30} />
//             </span>
//           </span>
//         ) : (
//           <div className="space-x-3 mr-5 hidden md:flex">
//             <Link
//               to="/signup"
//               class="relative inline-flex items-center justify-start px-5 py-1.5 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group"
//             >
//               <span class="w-48 h-48 rounded rotate-[-40deg] bg-purple-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
//               <span class="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
//                 Signup
//               </span>
//             </Link>

//             <Link
//               to="/login"
//               class="relative inline-flex items-center justify-start px-5 py-1.5 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group"
//             >
//               <span class="w-48 h-48 rounded rotate-[-40deg] bg-purple-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
//               <span class="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
//                 Login
//               </span>
//             </Link>
//           </div>
//         )}

//         {/* {!userInfo && (

//         )} */}

//         <span
//           className="bg-sky-300 px-2 py-1 md:hidden rounded-md cursor-pointer"
//           onClick={handleToggleNav}
//         >
//           <GiHamburgerMenu size={25} />
//         </span>

//         {isNavOpen && (
//           <div className="md:hidden  absolute top-0 right-0 border border-l-black border-r-0 border-y-0 transition ease-out delay-150 duration-200 w-[180px] bg-gray-900 bg-opacity-100  h-screen z-50 shadow-md opacity-100">
//             <div
//               onClick={handleToggleNav}
//               className="mt-5 cursor-pointer  text-white  flex m-auto justify-end mr-3"
//             >
//               <IoClose size={25} />
//             </div>

//             <div className="m-auto justify-center flex flex-col space-y-2 mt-10 bg-white  py-5 mx-2 rounded-lg">
//               <span className="m-auto justify-center flex flex-col">
//                 <img
//                   className="w-20 h-20 rounded-full"
//                   src="https://i.ibb.co/5FTR3vY/avatar.png"
//                   alt=""
//                 />
//               </span>
//               <span className="text-gray-900 font-semibold">
//                 Prajwal Devadiga
//               </span>
//             </div>

//             <div className="flex flex-col mt-10 space-y-5  font-medium tracking-wider ">
//               <span className="bg-white mx-2 py-1 rounded-md cursor-pointer">
//                 MY NOTES
//               </span>
//               <Link
//                 to="/profile"
//                 className="bg-white mx-2 py-1 rounded-md cursor-pointer"
//               >
//                 MY PROFILE
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Header;

//////////////////////////////////////////////////////////////////////////////////////////////

import React, { useContext, useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { TbLogout } from "react-icons/tb";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { appContext } from "../context";
import { motion, AnimatePresence } from "framer-motion";

const gradientStyle = {
  background: "linear-gradient(rgb(56, 189, 248), rgb(186, 230, 253)",
};

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
    <div
      className="w-full h-[75px] z-40 border-b border-b-gray-400 top-0 sticky  "
      style={gradientStyle}
    >
      <div className="m-auto h-full justify-between flex items-center px-2 md:px-8">
        <Link
          to="/"
          className="text-2xl pl-2 md:pl-0 md:text-4xl font-extrabold text-sky-500"
        >
          THE <span className="text-orange-500">NOTE</span>
        </Link>
        <form className=" items-center hidden md:flex -space-x-2 mr-[30px] md:m-auto">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            type="text"
            placeholder="Search Notes..."
            className="block w-[160px]  md:w-[300px]  rounded-md focus:outline-none focus:ring-0  font-semibold border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400   sm:text-sm sm:leading-6"
          />

          <button className="bg-white border border-gray-400  md:hidden py-[7px] text-sky-600 px-5  rounded-r-md">
            <FaSearch size={22} />
          </button>
          <button className="bg-white border  hidden md:flex py-[6px] text-sky-600 px-5  rounded-r-md ">
            <FaSearch size={22} />
          </button>
        </form>

        {userInfo !== null ? (
          <span className="space-x-3 hidden md:flex items-center mr-5">
            <Link to="/profile">
              <span className="flex m-auto items-center cursor-pointer space-x-3 rounded-md bg-black bg-opacity-50 hover:bg-opacity-30 px-4 py-1">
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
              className="text-rose-600 bg-rose-600 bg-opacity-40 pl-1 pr-2 py-2 rounded-md rotate-180  cursor-pointer"
            >
              <BiLogOut size={30} />
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
            className="text-gray-700 cursor-pointer"
          >
            <FaSearch size={22} />
          </span>
          <span
            onClick={handleToggleNav}
            className="bg-sky-300 px-2 py-1 md:hidden rounded-md cursor-pointer"
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
              className="md:hidden bottom-0  absolute top-0 right-0 border   transition ease-out delay-150 duration-250 w-[180px] bg-white bg-opacity-90  h-screen z-50 shadow-md opacity-100"
            >
              <div
                onClick={handleToggleNav}
                className="mt-5 cursor-pointer  text-gray-900  flex m-auto justify-end mr-3"
              >
                <IoClose size={25} />
              </div>

              <div className="m-auto justify-center flex flex-col space-y-2 mt-10 bg-white  py-5 mx-2 rounded-lg">
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
                  className="bg-gray-800 text-white mx-6 py-1 rounded-md cursor-pointer"
                >
                  MY PROFILE
                </Link>
                <div className="w-full flex m-auto flex-col pt-5">
                  <span
                    onClick={() => {
                      setIsLogoutModalOpen(true);
                      setIsNavOpen(false);
                    }}
                    className="bg-red-500 space-x-2 inline-flex mx-6 text-center  m-auto justify-center items-center text-white  py-1 rounded-md cursor-pointer"
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
