import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Markdown from "react-markdown";
// import remarkGfm from "remark-gfm";
import {
  createNoteValidationError,
  noteCreatedNotify,
} from "../Helpers/Popups/popups";
import Header from "./Header";
import LogoutModal from "../Helpers/Modals/LogoutModal";
import { motion, AnimatePresence } from "framer-motion";
import { appContext } from "../context";
import { BASE_URL } from "../Helpers/constant";
const CreateNote = () => {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { isLogoutModalOpen } = useContext(appContext);

  console.log("HJHJHJ,", BASE_URL);
  const gradientStyle = {
    background:
      "linear-gradient(to top, rgb(56, 189, 248), rgb(186, 230, 253))",
  };

  const submitNoteLoader = (
    <div
      className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.category || !formData.content) {
      setIsLoading(false);
      console.error("All fields must be filled.");
      createNoteValidationError();

      return;
    } else {
      try {
        setIsLoading(true);

        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const response = await axios.post(
          `${BASE_URL}/api/notes/create`,
          formData,
          config
        );

        if (response.data) {
          console.log("NOTE CREATED");
          noteCreatedNotify();
          setIsLoading(false);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
        console.log(response);
      } catch (error) {
        setIsLoading(false);
        console.error("An error occurred:", error);

        //Add error popup here
      }
    }
  };
  const handleReset = () => {
    setFormData({ title: "", category: "", content: "" });
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
        className="min-h-screen h-full m-auto flex justify-center items-center pb-40 md:pb-10"
        style={gradientStyle}
      >
        <ToastContainer />
        <div className="bg-white bg-opacity-50 w-[90%] md:w-[50%] rounded-lg p-4">
          <div className="flex m-auto justify-start   ml-2 mb-3">
            <span className="text-gray-800 py-1 shadow-lg px-4  rounded-md shadow-black font-medium text-2xl tracking-wide ">
              Create your note
            </span>
          </div>
          <div className="space-y-3">
            <div>
              <label
                className=" flex ml-1 text-gray-900 font-medium tracking-wide my-0.5 text-left "
                htmlFor="title"
              >
                Title:
              </label>
              <input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                type="text"
                id="title"
                name="title"
                className="w-full h-10 p-2 border rounded"
              />
            </div>
            <div>
              <label
                className=" flex ml-1 text-gray-900 font-medium tracking-wide my-0.5 text-left "
                htmlFor="category"
              >
                Category:
              </label>
              <input
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                type="text"
                id="category"
                name="category"
                className="w-full h-10 p-2 border rounded"
              />
            </div>
            <div>
              <label
                className=" flex ml-1 text-gray-900 font-medium tracking-wide my-0.5 text-left "
                htmlFor="content"
              >
                Description:
              </label>
              <textarea
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                id="content"
                name="content"
                rows="2"
                className="w-full  p-2 border rounded"
              ></textarea>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={handleReset}
                className="relative inline-flex items-center justify-center py-1 px-4 overflow-hidden font-medium text-white transition duration-300 ease-out border-2 border-gray-500 rounded-lg shadow-md group"
              >
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 translate-x-full bg-gray-500 group-hover:translate-x-0 ease">
                  Reset
                </span>
                <span className="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform group-hover:translate-x-full ease">
                  Reset
                </span>
                <span className="relative invisible">Re set </span>
              </button>

              <button
                onClick={handleSubmit}
                className="relative inline-flex items-center justify-center py-1 px-4 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-lg shadow-md group"
              >
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
                  {isLoading ? submitNoteLoader : "Create"}
                </span>
                <span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">
                  {isLoading ? submitNoteLoader : "Create"}
                </span>
                <span className="relative invisible">Create Note</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateNote;
