import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { handleSignOut } from "../firebase-config";
import { AuthContext } from "../App";
import "../styles/nav.css";
export default function Nav() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  return (
    <nav>
      Nav bar!!!
      {user && (
        <button
          className="button-primary sign-out"
          onClick={() => handleSignOut(setUser, navigate)}
        >
          Sign out
        </button>
      )}
    </nav>
  );
}
