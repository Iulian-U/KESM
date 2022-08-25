import { ref } from "vue";

//firebase imports
import { auth } from "../firebase/firebaseInit";
import { db } from "../firebase/firebaseInit";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

//Error and pending status variables
const error = ref(null);
const isPending = ref(false);

//Function to register a new user
const signup = async (firstName, lastName, email, password) => {
  error.value = null;
  isPending.value = true;

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    //Target firebase users collection
    const colRef = collection(db, "users");

    //add user to collection
    await addDoc(colRef, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      userUid: res.user.uid,
    });
    if (!res) {
      throw new Error("Error creating user");
    }
    error.value = null;
    isPending.value = false;
  } catch (e) {
    //Custom error message if an invalid email has been entered
    if (e.message == "Firebase: Error (auth/invalid-email).") {
      error.value = "You have entered an invalid email address";
      isPending.value = false;

      //Custom error message if password is less than 6 characters
    } else if (e.message == "Firebase: Password should be at least 6 characters (auth/weak-password).") {
      error.value = "Password should be at least 6 characters. Please try again";
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

const useSignup = () => {
  return {
    signup,
    error,
    isPending,
  };
};

export default useSignup;
