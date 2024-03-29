import React, { useEffect, useState, useContext } from "react";
import { Collapse, Card, Typography, CardBody } from "@material-tailwind/react";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import DeleteLoader from "../Helpers/Loaders/DeleteLoader";
import axios from "axios";
import LogoutModal from "../Helpers/Modals/LogoutModal";
import { appContext } from "../context";
import { FaPlus } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { IoCloseSharp } from "react-icons/io5";
import Header from "./Header";
import DeleteNoteModal from "../Helpers/Modals/DeleteNoteModal";
import { BASE_URL } from "../Helpers/constant";
import { errorPopUP, noteDeleteNotify } from "../Helpers/Popups/popups";
import { convertTimestamp } from "../Helpers/dateConverter";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [userName, setUserName] = useState(null);
  const [id, setId] = useState(null);
  const [isDeleteing, setIsDeleting] = useState(false);
  const {
    isLogoutModalOpen,
    searchBarOpen,
    setSearchBarOpen,
    searchQuery,
    setSearchQuery,
    deleteModal,
    isSearching,
    setIsSearching,
    setDeleteModal,
  } = useContext(appContext);

  const navigate = useNavigate();
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const toggleOpen = (index) => {
    let copy = [...notes];
    copy[copy.length - 1 - index].isOpen =
      !copy[copy.length - 1 - index].isOpen;
    setNotes(copy);
  };

  const fetchNotes = async () => {
    try {
      setIsloading(true);
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };
      let response = await axios.get(`${BASE_URL}/api/notes/`, config);

      setNotes(response.data);
      setIsloading(false);
    } catch (error) {
      errorPopUP("OOPS! Failed to fetch your notes.");
      setIsloading(false);
    }
  };

  useEffect(() => {
    let name = "Welcome back " + userInfo?.name.split(" ")[0] + "!";
    setUserName(name);
    if (!userInfo) {
      navigate("/login");
    }
    fetchNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeletePopUP = (id) => {
    setDeleteModal(true);
    setId(id);
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      let response = await axios.delete(`${BASE_URL}/api/notes/${id}`, config);

      if (response) {
        setIsDeleting(false);
        noteDeleteNotify();
        fetchNotes();
      }
    } catch (error) {
      setIsDeleting(false);
      errorPopUP("Failed to delete note.");
    }
  };

  const handleSearch = (e) => {
    setIsSearching(true);
    setSearchQuery(e.target.value);
    setTimeout(() => {
      setIsSearching(false);
    }, 2000);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen h-full pb-10 bg-gradient-to-b from-purple-700  to-black">
        {deleteModal && <DeleteNoteModal handleDelete={handleDelete} />}
        {isDeleteing && <DeleteLoader />}
        <AnimatePresence>
          {searchBarOpen && (
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.5 }}
              className=" fixed  w-screen md:hidden top-[84px] z-50"
            >
              <input
                onChange={(e) => handleSearch(e)}
                type="text"
                placeholder="Search Notes..."
                className="block w-full h-[45px] rounded-none focus:outline-none focus:ring-0 font-semibold border-0 py-1.5 pr-10 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
              <span
                onClick={() => {
                  setSearchBarOpen(false);
                  setSearchQuery("");
                }}
                className="absolute text-gray-800 top-1/2 transform mr-2 cursor-pointer -translate-y-1/2 right-2"
              >
                <IoCloseSharp size={20} />
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        <ToastContainer />
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

        <div className="flex m-auto md:justify-start  justify-between px-5 md:px-0 items-center pt-10 ">
          <span
            style={{ textShadow: "4px 4px 4px rgb(88,40,97)" }}
            className="text-white text-left  text-2xl  md:text-3xl ml-0 md:ml-4 font-bold tracking-wide md:tracking-wider"
          >
            {userName?.split("").map((ele, i) => (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.25,
                  delay: i / 12,
                }}
                key={i}
              >
                {ele}
              </motion.span>
            ))}
          </span>

          <span className=" md:hidden">
            <motion.img
              className=" h-12 w-12  rounded-full"
              src={userInfo?.pic}
              alt="avatar"
            />
          </span>
        </div>
        <div className="m-auto justify-center mt-10 bg-white shadow-lg shadow-sky-500  pb-5 bg-opacity-10 rounded-lg w-[90%] md:w-[80%]">
          <div className="text-white m-auto pt-7 items-center px-5 flex justify-between">
            <span className="text-xl font-semibold tracking-wider">
              Your Notes
            </span>

            <Link
              to="/createNote"
              className="text-lg bg-gradient-to-br from-gray-950 to-gray-600 shadow-md shadow-white hover:shadow-sky-300 inline-flex items-center px-3 py-0.5 rounded-[4px] cursor-pointer font-medium tracking-wide"
            >
              Add Note{" "}
              <span className="ml-1 mt-[2px]">
                <FaPlus />
              </span>
            </Link>
          </div>

          {isSearching && (
            <div className="md:mt-10 mt-14  space-y-5">
              <div className="flex gap-4 flex-wrap justify-center">
                <img
                  className="md:w-14 md:h-14 w-12 h-12 animate-spin"
                  src="https://www.svgrepo.com/show/70469/loading.svg"
                  alt="Loading icon"
                />
              </div>
              <div className="mt-3">
                <span className="text-white text-lg md:text-xl font-medium tracking-wide">
                  Searching Notes...
                </span>
              </div>
            </div>
          )}
          {isLoading && (
            <div className="md:mt-10 mt-14  space-y-5">
              <div className="flex gap-4 flex-wrap justify-center">
                <img
                  className="md:w-14 md:h-14 w-12 h-12 animate-spin"
                  src="https://www.svgrepo.com/show/70469/loading.svg"
                  alt="Loading icon"
                />
              </div>
              <div className="mt-3">
                <span className="text-white text-lg md:text-xl font-medium tracking-wide">
                  Retrieving Your Notes... Please wait!
                </span>
              </div>
            </div>
          )}
          {!isLoading && notes.length === 0 ? (
            <div className="my-9">
              <span className="text-white tracking-wider font-semibold text-2xl">
                No Notes Available.
              </span>
            </div>
          ) : (
            <>
              {!isLoading &&
                !isSearching &&
                notes
                  ?.filter((ele) => {
                    if (!searchQuery) {
                      return notes;
                    } else {
                      return ele.title
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase());
                    }
                  })
                  .reverse()
                  .map((note, index) => (
                    <motion.div
                      key={note._id}
                      onClick={() => toggleOpen(index)}
                      initial={{ opacity: 0, y: 200 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className={`bg-white shadow-md shadow-gray-950 cursor-pointer  rounded-md m-auto py-3 px-3 mt-7 w-[90%] h-auto flex flex-col transition-all ${
                        note.isOpen ? "h-auto" : "h-12"
                      }`}
                    >
                      <div>
                        <div className="flex m-auto  justify-between px-5">
                          <span className="font-bold">{index + 1})</span>
                          <span className="font-semibold flex h-full items-center tracking-wider">
                            <span className="hidden md:flex">
                              {note.title.length > 75
                                ? note.title.slice(0, 73) + "..."
                                : note.title}
                            </span>
                            <span className="md:hidden">
                              {note.title.length > 18
                                ? note.title.slice(0, 15) + "..."
                                : note.title}
                            </span>
                            <motion.span
                              className="ml-1 text-gray-900"
                              animate={{ rotate: note.isOpen ? 180 : 0 }}
                              initial={{ rotate: 0 }}
                            >
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="h-full flex m-auto items-center"
                              >
                                <IoMdArrowDropdown size={20} />
                              </motion.div>
                            </motion.span>
                          </span>

                          <span className="space-x-2 h-full items-center ">
                            <Link to={`/editNote/${note._id}`}>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                                className="text-pink-500"
                              >
                                <FaEdit size={20} />
                              </button>
                            </Link>

                            <button
                              style={{
                                textShadow: "4px 4px 4px  rgb(0,0,0)",
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeletePopUP(note._id);
                              }}
                              className="text-rose-500 "
                            >
                              <AiFillDelete size={20} />
                            </button>
                          </span>
                        </div>
                        <Collapse
                          open={note?.isOpen}
                          initialOpen={false}
                          style={{ justifyContent: "flex-start" }}
                          className="flex flex-col  m-auto justify-center"
                        >
                          <Card className="border-0 bg-transparent shadow-none">
                            <CardBody className="p-0">
                              <Typography className="p-0 m-0">
                                <div
                                  style={{ justifyContent: "flex-start" }}
                                  className="flex mt-2 bg-opacity-50 rounded-md py-2 flex-col m-auto w-full"
                                >
                                  <span className="text-left  text-gray-900 ml-1 text-sm font-medium tracking-wider py-1 rounded-md">
                                    <span className="bg-cyan-500  px-2 py-0.5 rounded-[3px] text-white">
                                      {" "}
                                      Category:{" "}
                                      {note?.category.charAt(0).toUpperCase() +
                                        note?.category.slice(1).toLowerCase()}
                                    </span>
                                  </span>
                                  <span className="text-left  mt-1 py-1 px-2 font-medium text-black rounded-md">
                                    {note?.content}
                                  </span>
                                </div>
                              </Typography>
                            </CardBody>
                          </Card>

                          <div className="flex flex-col mt-1 text-left pl-2  ">
                            <div>
                              <span className="text-sm text-gray-900 font-semibold">
                                Created on: {convertTimestamp(note.createdAt)}
                              </span>
                            </div>
                            {convertTimestamp(note.createdAt) !==
                              convertTimestamp(note.updatedAt) && (
                              <div>
                                <span className="text-sm text-gray-900 font-semibold">
                                  Updated on: {convertTimestamp(note.updatedAt)}
                                </span>
                              </div>
                            )}
                          </div>
                        </Collapse>
                      </div>
                    </motion.div>
                  ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default Home;
