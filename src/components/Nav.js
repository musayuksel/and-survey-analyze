import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { handleSignOut } from "../firebase-config";
import { AuthContext } from "../App";
import "../styles/nav.css";
export default function Nav() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  return (
    <nav className="navbar">
      <img className="imgx" src="../logo2.png" alt="icon" />
      <img
        onClick={() => handleSignOut(setUser, navigate)}
        className="team-logo"
        src="./Full Circle.png"
        alt="team-logo"
      />
      {/* {user && (
        <button
          className="button-primary-sign-out"
          onClick={() => handleSignOut(setUser, navigate)}
        >
          Sign out
        </button>
      )} */}
    </nav>
  );
}
