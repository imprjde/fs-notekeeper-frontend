import React, { useEffect, useState, useContext } from "react";
import { Collapse, Card, Typography, CardBody } from "@material-tailwind/react";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LogoutModal from "../Helpers/Modals/LogoutModal";
import { appContext } from "../context";
import { FaPlus } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { IoCloseSharp } from "react-icons/io5";
import Header from "./Header";
import DeleteNoteModal from "../Helpers/Modals/DeleteNoteModal";
import { BASE_URL } from "../Helpers/constant";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [userName, setUserName] = useState(null);
  const [id, setId] = useState(null);
  const {
    isLogoutModalOpen,
    searchBarOpen,
    setSearchBarOpen,
    searchQuery,
    setSearchQuery,
    deleteModal,
    setDeleteModal,
  } = useContext(appContext);
  console.log("SEARCH-Query-HOME", searchQuery);

  const navigate = useNavigate();
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const toggleOpen = (index) => {
    let copy = [...notes];
    copy[index].isOpen = !copy[index].isOpen;
    setNotes(copy);
  };

  const gradientStyle = {
    background:
      "linear-gradient(to top, rgb(56, 189, 248), rgb(186, 230, 253))",
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
      console.log(response);
    } catch (error) {
      setIsloading(false);
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    let name = "Welcome back " + userInfo?.name.split(" ")[0] + "!";
    setUserName(name);
    if (!userInfo) {
      navigate("/login");
    }
    // fetchNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeletePopUP = (id) => {
    setDeleteModal(true);
    setId(id);
  };
  const handleDelete = async () => {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };

    console.log(id);
    let response = await axios.delete(`${BASE_URL}/api/notes/${id}`, config);

    if (response) {
      fetchNotes();
    }
    console.log(response);
  };

  const handleSearch = (e) => {
    setIsloading(true);
    setSearchQuery(e.target.value);
    setTimeout(() => {
      setIsloading(false);
    }, 2000);
  };
  return (
    <>
      <Header />
      <div className="min-h-screen h-full pb-10" style={gradientStyle}>
        {deleteModal && <DeleteNoteModal handleDelete={handleDelete} />}
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
            className="text-white text-left text-2xl  md:text-3xl ml-0 md:ml-4 font-bold tracking-wide"
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
        <div class="m-auto justify-center mt-10 bg-white shadow-xl shadow-purple-600 pb-5 bg-opacity-10 rounded-lg w-[90%] md:w-[80%]">
          <div className="text-white m-auto pt-7 items-center px-5 flex justify-between">
            <span className="text-xl font-semibold tracking-wider">
              Your Notes
            </span>

            <Link
              to="/createNote"
              className="text-lg bg-orange-500
                shadow-xl shadow-orange-800 inline-flex items-center px-3 py-0.5 rounded-md cursor-pointer font-medium tracking-wide"
              // style={{
              //   background:
              //     "linear-gradient(113deg, rgba(88,40,97,1) 39%, rgba(178,199,199,1) 87%)",
              // }}
            >
              Add Note{" "}
              <span className="ml-1 mt-[2px]">
                <FaPlus />
              </span>
            </Link>
            {/* <Link
              to="/createNote"
              className="text-lg border  border-purple-500  shadow-xl shadow-purple-400 inline-flex items-center px-3 py-0.5 rounded-lg cursor-pointer font-medium tracking-wide"
              style={{
                background: "linear-gradient(0deg, #B20CDD, #01DEFF)",
              }}
            >
              Add Note{" "}
              <span className="ml-1 mt-[2px]">
                <FaPlus />
              </span>
            </Link> */}
          </div>
          {isLoading && (
            <div className="md:mt-10 mt-14  space-y-5">
              <div class="flex gap-4 flex-wrap justify-center">
                <img
                  class="md:w-14 md:h-14 w-12 h-12 animate-spin"
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
                  .map((note, index) => (
                    <motion.div
                      key={note._id}
                      onClick={() => toggleOpen(index)}
                      initial={{ opacity: 0, y: 200 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className={`bg-white  cursor-pointer  rounded-md m-auto py-3 px-3 mt-7 w-[90%] h-auto flex flex-col transition-all ${
                        note.isOpen ? "h-auto" : "h-12"
                      }`}
                    >
                      <div>
                        <div className="flex m-auto  justify-between px-5">
                          <span className="font-bold">{index + 1})</span>
                          <span className="font-semibold flex items-center tracking-wider">
                            {note.title}
                            <span className="ml-1">
                              {!note.isOpen ? (
                                <IoMdArrowDropdown size={20} />
                              ) : (
                                <IoMdArrowDropup size={20} />
                              )}
                            </span>
                          </span>
                          <span className="space-x-2 h-full items-center ">
                            <Link to={`/editNote/${note._id}`}>
                              <button className="text-pink-500">
                                <FaEdit size={20} />
                              </button>
                            </Link>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeletePopUP(note._id);
                              }}
                              className="text-rose-500"
                            >
                              <AiFillDelete size={20} />
                            </button>
                          </span>
                        </div>
                        <Collapse
                          open={note?.isOpen}
                          // open={true}
                          initialOpen={false}
                          className="flex m-auto justify-center"
                        >
                          <Card className="border-0 bg-transparent shadow-none">
                            <CardBody className="p-0">
                              <Typography className="p-0 m-0">
                                <div className="flex mt-2 bg-opacity-50 rounded-md py-2 flex-col m-auto w-full">
                                  <span className="text-left  text-gray-900 ml-1 text-sm font-medium tracking-wider py-1 rounded-md">
                                    <span className="bg-cyan-500  px-2 py-0.5 rounded-md text-white">
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
