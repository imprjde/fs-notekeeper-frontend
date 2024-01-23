import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCheckCircle } from "react-icons/fa";
import { GoAlertFill } from "react-icons/go";

export const signupSuccessNotify = () => {
  const icon = (
    <span className="text-green-500 bg-white rounded-full">
      <FaCheckCircle size={22} />
    </span>
  );
  toast.success(`Signup Successful!!`, {
    position: "top-center",
    icon: icon,
    pauseOnHover: false,
    autoClose: 2000,
    hideProgressBar: true,
    style: {
      background:
        "linear-gradient(0deg, rgba(195,34,135,1) 21%, rgba(253,45,71,1) 100%)",
      color: "#fff",
      borderRadius: "5px",
    },
    progressStyle: {
      background: "#fff", // Set the background color of the progress bar to white
    },
  });
};

export const signupErrorNotify = () => {
  toast.error(`Signup Failed! Try again later`, {
    position: "top-center",
    pauseOnHover: false,
    autoClose: 4000,
  });
};

export const createNoteValidationError = () => {
  const icon = (
    <span className="text-yellow-500 ">
      <GoAlertFill size={20} />
    </span>
  );

  toast.warn(`Please fill all the fields`, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    icon,
  });
};

export const noteCreatedNotify = () => {
  toast.success(`New note created `, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
  });
};

export const passwordChangeSuccessNotify = () => {
  toast.success(`Password updated!!`, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    icon: false,
    style: {
      background:
        "linear-gradient(90deg, rgba(0,212,255,1) 0%, rgba(9,9,121,1) 52%, rgba(2,0,36,1) 100%)",
      color: "#fff",
      fontWeight: 300,
      letterSpacing: "2px",
    },
  });
};

export const passwordChangeErrorNotify = () => {
  toast.error(`Something went wrong. Try again later!`, {
    position: "top-center",
    autoClose: 2000,
    style: {
      fontWeight: 600,
    },
  });
};

export const profileUpdateSuccessNotify = () => {
  toast.success(`Profile updated successfully`, {
    position: "top-center",
    autoClose: 2000,
    theme: "light",
  });
};

export const profileUpdateErrorNotify = () => {
  toast.error(`Oops! Something went wrong.`, {
    position: "top-center",
    autoClose: 2000,
    theme: "light",
  });
};

export const picTypeErrorNotify = () => {
  toast.warn("File can only of Type .jpeg or .png", {
    position: "top-center",
    autoClose: 2000,
  });
};

export const somethingWentWrongNotify = () => {
  toast.error("Oops! something went wrong.", {
    position: "top-center",
    autoClose: 2000,
  });
};
export const loginErrorNotify = () => {
  toast.error("Network Error", {
    position: "top-center",
    autoClose: 2000,
    pauseOnHover: false,
  });
};
export const noteUpdateSuccessNotify = () => {
  toast.success("Note updated !", {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    pauseOnHover: false,
  });
};
export const noteUpdateErrorNotify = () => {
  toast.error("Note update failed !", {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    pauseOnHover: false,
  });
};