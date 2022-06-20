import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const provider = new GoogleAuthProvider();
// provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

//add google auth provider
export async function signInWithGoogle(setUser, navigate) {
  try {
    const result = await signInWithPopup(auth, provider); //will return a promise
    const user = {
      displayName: result.user.displayName,
      email: result.user.email,
      photoURL: result.user.photoURL,
      uid: result.user.uid,
    };
    //check if user is oauth
    //if user is oauth, then update user data and direct to dashboard
    //if user is not oauth redirect to error page//401 Unauthorized
    const isUserOauth = await checkUserOAuth(user.email);
    if (isUserOauth) {
      setUser(user);
      navigate("/dashboard");
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      setUser(null);
      navigate("/401");
    }
  } catch (error) {
    console.error({ error });
  }
}
//submit form and redirect to home page
export function handleSignOut(setUser, navigate) {
  signOut(auth);
  localStorage.removeItem("user");
  setUser(null);
  navigate("/");
}

//get user data from firebase and check if user is oauth
async function checkUserOAuth(userEmail) {
  const docRef = collection(db, "users");
  const getQuery = query(docRef, where("user.is_oauth", "==", true));
  const userData = await getDocs(getQuery);
  let result = userData.docs
    .map((doc) => ({
      ...doc.data(),
    }))
    .some((doc) => doc.user.email === userEmail);
  return result;
}

export async function deleteUserData(documentId) {
  const docRef = doc(db, "user_forms", documentId);
  const result = await deleteDoc(docRef);
  return result;
}
