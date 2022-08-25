//Vue imports
import { ref } from "vue";

//firebase imports
import { auth } from "../firebase/firebaseInit";
import { sendPasswordResetEmail } from "firebase/auth";

//Error and pending status variables
const error = ref(null);
const isPending = ref(false);

//Function to reset the user's password
const forgotPassword = async (email) => {
  error.value = null;
  isPending.value = true;

  try {
    await sendPasswordResetEmail(auth, email);
    error.value = null;
    isPending.value = false;
  } catch (e) {
    //Custom error message if no email has been entered
    if (e.message == "Firebase: Error (auth/missing-email).") {
      error.value = "Please make sure to enter the email address";
      isPending.value = false;
    }

    //Custom error message if an invalid email has been entered
    else if (e.message == "Firebase: Error (auth/invalid-email).") {
      error.value = "Please make sure to enter a valid email address";
      isPending.value = false;
    }

    //Custom error message if there is no account associated with the entered email
    else if (e.message == "Firebase: Error (auth/user-not-found).") {
      error.value = "There is no account associated with this email address";
      isPending.value = false;
    }

    //Display any other error message
    else {
      console.log(e.message);
      error.value = e.message;
      isPending.value = false;
    }
  }
};

const useForgotPassword = () => {
  return {
    forgotPassword,
    error,
    isPending,
  };
};

export default useForgotPassword;
