import React from "react";

const DeleteLoader = () => {
  return (
    <>
      <div
        className="min-w h-screen animated fadeIn faster  fixed  left-0 top-0 flex flex-col justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
        id="modal-id"
      >
        <div className="absolute bg-black opacity-80 inset-0 z-0" />
        <div className="flex flex-col m-auto items-center">
          <div className="z-50 mb-5">
            <span className="text-white font-semibold tracking-widest text-xl">
              Deleting Note{" "}
            </span>
          </div>
          <div className="flex  space-x-3 ">
            <div className="h-5 w-5 my-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-5 w-5 my-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.23s]"></div>
            <div className="h-5 w-5 my-1.5 bg-white rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteLoader;
