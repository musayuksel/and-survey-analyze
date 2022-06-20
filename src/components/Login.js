import React, { useContext } from "react";
import { signInWithGoogle } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import "../styles/login.css";
export default function Login() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div>
      Login PAGE!!!
      <button
        onClick={() => signInWithGoogle(setUser, navigate)}
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        Sign-in with Google
      </button>
    </div>
  );
}
