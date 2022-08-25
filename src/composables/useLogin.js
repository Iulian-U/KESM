//Vue imports
import { ref } from "vue";

//firebase imports
import { auth } from "../firebase/firebaseInit";
import { signInWithEmailAndPassword } from "firebase/auth";

//Error and pending status variables
const error = ref(null);
const isPending = ref(false);

//Function to login the user
const login = async (email, password) => {
  error.value = null;
  isPending.value = true;

  try {
    const res = await signInWithEmailAndPassword(auth, email, password);

    if (!res) {
      throw new Error("Error creating user");
    }
    error.value = null;
    isPending.value = false;
  } catch (e) {
    //Custom error message if an invalid email has been entered
    if (e.message == "Firebase: Error (auth/user-not-found).") {
      error.value = "There is no user registered with this email address";
      isPending.value = false;
    }
    //Custom error message if the user enter an invalid email address
    else if (e.message == "Firebase: Error (auth/invalid-email).") {
      error.value = "Invalid email address! Please try again";
      isPending.value = false;
    }
    //Custom error message if an invalid password is entered
    else if (e.message == "Firebase: Error (auth/wrong-password).") {
      error.value = "Incorrect password! Please try again";
      isPending.value = false;
    }

    //Custom error message if no email has been entered
    else if (e.message == "Firebase: Error (auth/missing-email).") {
      error.value = "Please make sure to enter the email address";
      isPending.value = false;
    }

    //Display any other error message
    else {
      error.value = e.message;
      isPending.value = false;
    }
  }
};

const useLogin = () => {
  return {
    login,
    error,
    isPending,
  };
};

export default useLogin;
