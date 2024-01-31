import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCheckCircle } from "react-icons/fa";
import { GoAlertFill } from "react-icons/go";
import { MdError } from "react-icons/md";

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

export const signupErrorNotify = (message) => {
  toast.error(`${message}`, {
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
    style: {
      background:
        "linear-gradient(0deg, rgba(195,34,135,1) 21%, rgba(253,45,71,1) 100%)",
      color: "#fff",
      letterSpacing: "1px",
      borderRadius: "5px",
    },
  });
};

export const noteCreatedNotify = () => {
  const icon = (
    <span className="text-rose-500 bg-white rounded-full">
      <FaCheckCircle size={22} />
    </span>
  );
  toast.success(`New note created `, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    icon,
    style: {
      background:
        "linear-gradient(113deg, rgba(62,203,71,1) 30%, rgba(0,241,226,1) 90%)",
      color: "white",
      letterSpacing: "1px",
    },
  });
};

export const passwordChangeSuccessNotify = () => {
  toast.success(`Password updated!!`, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    icon: false,
    theme: "dark",
    style: {
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
    progressStyle: {
      background: "white",
    },
    autoClose: 2000,
    style: {
      background:
        "linear-gradient(113deg, rgba(113,231,126,1) 30%, rgba(31,222,75,1) 90%)",
      color: "white",
      letterSpacing: "1px",
    },
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

export const loginNotify = () => {
  const icon = (
    <span className="text-orange-400 bg-white rounded-full">
      <FaCheckCircle size={22} />
    </span>
  );
  toast.success(`Login successful !`, {
    position: "top-center",
    icon: icon,
    style: {
      background:
        "linear-gradient(187deg, rgba(252,69,174,1) 13%, rgba(27,194,215,1) 45%, rgba(33,150,243,1) 100%)",
      color: "#fff",
      borderRadius: "5px",
    },
    progressStyle: {
      background: "#fff",
    },
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
  const icon = (
    <span className="text-white rounded-full">
      <FaCheckCircle size={22} />
    </span>
  );
  toast.success("Note updated successfully!", {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    pauseOnHover: false,
    icon,
    style: {
      background:
        "linear-gradient(113deg, rgba(24,135,127,1) 31%, rgba(15,235,121,1) 100%)",
      color: "white",
      letterSpacing: "1px",
    },
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

export const notifyEmailSent = () => {
  toast.info("A password reset link has been sent to the email address", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: true,
    pauseOnHover: false,
    theme: "dark",
  });
};

export const emailSentError = () => {
  toast.error("No user found with this email.", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: true,
    pauseOnHover: false,

    theme: "dark",
  });
};

export const profileUpdateValidationError = (message) => {
  const icon = (
    <span className="text-yellow-400  rounded-full">
      <MdError size={22} />
    </span>
  );
  toast.error(`${message}`, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    pauseOnHover: false,
    icon,
    style: {
      background:
        "linear-gradient(113deg, rgba(238,60,6,1) 30%, rgba(173,3,3,1) 70%)",
      color: "white",
      letterSpacing: "1px",
    },
  });
};

export const noteDeleteNotify = () => {
  const icon = (
    <span className="text-white rounded-full">
      <MdError size={22} />
    </span>
  );
  toast.info("Note Deleted", {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    pauseOnHover: false,
    icon,
    style: {
      background:
        "linear-gradient(113deg, rgba(24,135,127,1) 31%, rgba(15,235,121,1) 100%)",
      color: "white",
      letterSpacing: "1px",
    },
  });
};

export const errorPopUP = (message) => {
  const icon = (
    <span className="text-white rounded-full">
      <MdError size={22} />
    </span>
  );
  toast.error(`${message}`, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    pauseOnHover: false,
    icon,
    style: {
      background:
        "linear-gradient(113deg, rgba(238,6,6,1) 31%, rgba(173,3,3,1) 60%)",
      color: "white",
      letterSpacing: "1px",
    },
  });
};
