import React from "react";
import { useNavigate } from "react-router-dom";
export default function Unauthorized() {
  const navigate = useNavigate();
  return (
    <>
      <h1>Unauthorized User</h1>
      <button onClick={(e) => navigate("/")}>
        Login With Different Account
      </button>
    </>
  );
}
