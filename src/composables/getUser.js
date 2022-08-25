//Vue imports
import { ref } from "vue";

//firebase imports
import { auth } from "../firebase/firebaseInit";
import { onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase/firebaseInit";
import { getDocs, collection, onSnapshot, query, where } from "firebase/firestore";

const user = ref(auth.currentUser);
let userInfo = null;

//get all documents from firestore then filter the array based on the user's email
const getUserData = async () => {
  const userEmail = user.value.email;
  const userData = await getDocs(collection(db, "users"), where("email", "==", userEmail)).then(
    (snapshot) => {
      return snapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
    }
  );
  //filter array based on email
  userInfo = userData.filter((user) => user.email === userEmail);

  return userInfo;
};

//auth changes
onAuthStateChanged(auth, (_user) => {
  user.value = _user;
  getUserData();
});

const getUser = () => {
  return { user, getUserData, userInfo };
};

export default getUser;
