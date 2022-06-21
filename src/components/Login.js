import React, { useContext } from "react";
import { signInWithGoogle } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import "../styles/login.css";
import { BsPipFill } from "react-icons/bs";
export default function Login() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  if (user) {
    navigate("/dashboard");
  }
  return (
    <div className="login-page">

        <img className="img" src="../Full Circle.png" alt="icon"/> 
      
      <h4 className="maintext">Log in to your Account</h4>
      <br></br>
      <h6 className="subtext">Sign in to access your onboarding feedback</h6>
      <br></br>

      <div className="space"></div>

      <button
        className="button-primary sign-in"
        onClick={() => signInWithGoogle(setUser, navigate)}>
        Continue with Google
      </button>

    </div>

  );
}
