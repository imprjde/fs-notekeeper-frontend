import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../Helpers/constant";
import { emailSentError, notifyEmailSent } from "../Helpers/Popups/popups";
import { ToastContainer } from "react-toastify";
import { emailResetLoader } from "../Helpers/Loaders/Loaders";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const resp = await axios.post(`${BASE_URL}/api/resetPassword`, { email });
      setIsLoading(false);
      if (resp.status === 200) {
        notifyEmailSent();
      }
    } catch (error) {
      emailSentError();
      setIsLoading(false);
    }
  };
  return (
    <div className="h-screen flex m-auto justify-center items-center bg-gradient-to-b from-purple-700 to-black">
      <ToastContainer />
      <div className="bg-white shadow-lg shadow-sky-400 rounded-md  md:w-[40%] bg-opacity-50 px-10 py-20">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col m-auto justify-center space-y-6"
        >
          <label
            htmlFor="password"
            className="block m tracking-wide text-base font-medium leading-6 text-white text- ml-1"
          >
            Enter Your registered Email address
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            className="block w-[280px] md:w-[340px] font-semibold tracking-wide m-auto rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pr-10"
          />
          <button
            type="submit"
            className=" w-[280px]  md:w-[340px] m-auto  justify-center flex items-center bg-gradient-to-r py-1 text-white tracking-wider font-semibold rounded-[4px] from-pink-500  to-pink-800 shadow-lg shadow-rose-400"
          >
            {isLoading ? emailResetLoader : "Send Email"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
