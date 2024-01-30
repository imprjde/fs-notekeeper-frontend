import React, { useContext } from "react";
import { appContext } from "../../context";

const DeleteNoteModal = ({ handleDelete }) => {
  const { setDeleteModal } = useContext(appContext);
  return (
    <>
      <div
        className="min-w h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
        id="modal-id"
      >
        <div className="absolute bg-black opacity-80 inset-0 z-0" />
        <div className="w-[80%]  max-w-lg p-5 relative mx-auto my-auto rounded-xl bg-white shadow-lg shadow-sky-500 ">
          <div className="">
            <div className="text-center p-5 flex-auto justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 flex items-center text-rose-500 mx-auto"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <h2 className="md:text-lg font-medium py-4 ">
                Are you sure you want to delete this note?
              </h2>
            </div>
            <div className="p- text-center space-x-4 md:block">
              <button
                onClick={() => setDeleteModal(false)}
                className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-md shadow-rose-500 font-medium tracking-wider border text-gray-600 rounded-lg hover:shadow-sm hover:shadow-rose-500"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleDelete();
                  setDeleteModal(false);
                }}
                className="mb-2 md:mb-0 bg-rose-500 shadow-md shadow-gray-900 border border-rose-500 px-5 py-2 text-sm  font-medium tracking-wider text-white rounded-lg hover:shadow-sm hover:shadow-gray-900 hover:bg-rose-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteNoteModal;
