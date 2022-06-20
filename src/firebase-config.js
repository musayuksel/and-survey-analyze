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
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    navigate("/dashboard");
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

//get user data from firebase and update state
export async function getUserData(setUserData, user) {
  const docRef = collection(db, "user_forms");
  const getQuery = query(docRef, where("author.id", "==", user.uid));
  const userData = await getDocs(getQuery);
  const userDataArray = userData.docs.map((doc) => ({
    ...doc.data(),
    documentId: doc.id,
  }));
  setUserData(userDataArray || []);
}

export async function deleteUserData(documentId) {
  const docRef = doc(db, "user_forms", documentId);
  const result = await deleteDoc(docRef);
  return result;
}
