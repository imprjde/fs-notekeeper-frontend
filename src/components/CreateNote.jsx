import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createNoteValidationError,
  noteCreatedNotify,
} from "../Helpers/Popups/popups";
import Header from "./Header";
import LogoutModal from "../Helpers/Modals/LogoutModal";
import { motion, AnimatePresence } from "framer-motion";
import { appContext } from "../context";
import { BASE_URL } from "../Helpers/constant";
import { submitNoteLoader } from "../Helpers/Loaders/Loaders";
const CreateNote = () => {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { isLogoutModalOpen } = useContext(appContext);

  console.log("HJHJHJ,", BASE_URL);

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
      <div className="min-h-screen h-full m-auto bg-gradient-to-b from-purple-700   to-black flex justify-center items-center pb-40 md:pb-10">
        <ToastContainer />
        <div className="bg-white bg-opacity-20 w-[90%] md:w-[50%] shadow-lg shadow-sky-600 rounded-lg p-4">
          <div className="flex m-auto justify-start ml-2 mb-3">
            <span className="text-white bg-gradient-to-r from-fuchsia-800 to-gray-800 py-1 shadow-lg px-4  rounded-md shadow-rose-600 font-medium text-2xl tracking-wide ">
              Create your note
            </span>
          </div>
          <div className="space-y-3 pt-3">
            <div>
              <label
                className=" flex ml-1 text-white font-medium tracking-wide my-0.5 text-left "
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
                className="w-full font-medium h-10 p-2 border rounded"
              />
            </div>
            <div>
              <label
                className=" flex ml-1 text-white font-medium tracking-wide my-0.5 text-left "
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
                className="w-full font-medium h-10 p-2 border rounded"
              />
            </div>
            <div>
              <label
                className=" flex ml-1 text-white font-medium tracking-wide my-0.5 text-left "
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
                className="w-full font-medium p-2 border rounded"
              ></textarea>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={handleReset}
                className="relative tracking-wider bg-gray-800  inline-flex items-center justify-center py-1 px-4 overflow-hidden font-medium text-white transition duration-300 ease-out border border-white rounded-[4px] shadow-md shadow-white group"
              >
                Reset
              </button>

              <button
                onClick={handleSubmit}
                className="relative min-w-[120px] tracking-wider bg-gradient-to-r from-blue-600 to-blue-950  inline-flex items-center justify-center py-1 px-8 overflow-hidden font-medium text-white transition duration-300 ease-out border border-sky-400 rounded-[4px] shadow-md shadow-sky-400 group"
              >
                {isLoading ? submitNoteLoader : "Create"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateNote;
