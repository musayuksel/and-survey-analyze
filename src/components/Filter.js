import React from "react";
import "../styles/filter.css";
export default function Filter() {
  return (
    <div className="dropdown">
      <select name="" id="left">
        <option value="test">Bootcamp: </option>
        <option value="test">test date </option>
      </select>
      <select name="" id="right">
        <option value="test">Course: </option>
      </select>
    </div>
  );
}

// isolate the arrows somehow