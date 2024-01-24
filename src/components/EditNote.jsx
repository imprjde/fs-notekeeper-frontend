import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LogoutModal from "../Helpers/Modals/LogoutModal";
import { motion, AnimatePresence } from "framer-motion";
import { appContext } from "../context";
import { ToastContainer } from "react-toastify";

import axios from "axios";
import Header from "./Header";
import {
  noteUpdateErrorNotify,
  noteUpdateSuccessNotify,
} from "../Helpers/Popups/popups";
import { BASE_URL } from "../Helpers/constant";

const EditNote = () => {
  const [note, setNote] = useState({});
  const [editedData, setEditedData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const { isLogoutModalOpen } = useContext(appContext);
  const navigate = useNavigate();

  console.log(editedData);

  const gradientStyle = {
    background:
      "linear-gradient(to top, rgb(56, 189, 248), rgb(186, 230, 253))",
  };

  const updateNoteLoader = (
    <div
      className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );

  const fetchNoteById = async () => {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const response = await axios.get(`${BASE_URL}/api/notes/${id}`, config);
    setNote(response.data);
  };

  useEffect(() => {
    fetchNoteById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setEditedData(note);
  }, [note]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));

      if (!editedData.title || !editedData.category || !editedData.category) {
        setIsLoading(false);
        console.error("All fields must be filled.");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const response = await axios.put(
        `${BASE_URL}/api/notes/${id}`,
        editedData,
        config
      );

      noteUpdateSuccessNotify();
      setIsLoading(false);
      setTimeout(() => {
        navigate("/");
      }, 2000);
      console.log(response);
    } catch (error) {
      setIsLoading(false);
      noteUpdateErrorNotify();
      console.error("An error occurred:", error);
    }
  };

  const handleReset = () => {
    setEditedData({ title: "", category: "", content: "" });
  };

  return (
    <>
      <Header />
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
      <div
        className="min-h-screen h-full m-auto flex justify-center items-center pb-40 md:pb-10"
        style={gradientStyle}
      >
        <div className="bg-white bg-opacity-50 w-[90%] md:w-[50%] rounded-lg p-4">
          <div className="flex m-auto justify-start   ml-2 mb-3">
            <span className="text-gray-800 py-1 shadow-lg px-4  rounded-md shadow-black font-medium text-2xl tracking-wide ">
              Edit your note
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
                value={editedData.title}
                onChange={(e) =>
                  setEditedData({ ...editedData, title: e.target.value })
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
                value={editedData.category}
                onChange={(e) =>
                  setEditedData({ ...editedData, category: e.target.value })
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
                value={editedData.content}
                onChange={(e) =>
                  setEditedData({ ...editedData, content: e.target.value })
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
                  {isLoading ? updateNoteLoader : "Update"}
                </span>
                <span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">
                  {isLoading ? updateNoteLoader : "Update"}
                </span>
                <span className="relative invisible">Update Note</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditNote;
