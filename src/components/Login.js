import React, { useContext } from "react";
import { signInWithGoogle } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import "../styles/login.css";
export default function Login() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  if (user) {
    navigate("/dashboard");
  }
  return (
    <div>
      Login PAGE!!!
      <button
        className="button-primary sign-in"
        onClick={() => signInWithGoogle(setUser, navigate)}
      >
        Sign-in with Google
      </button>
    </div>
  );
}
