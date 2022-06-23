import React from "react";
import { BsPercent } from "react-icons/bs";
import "../styles/replies-analyze.css";
export default function RepliesAnalyze({ percentage = 0, choiceText }) {
  return (
    <div className="replies-analyze-container">
      <p>
        {percentage}
        <BsPercent />
      </p>
      <p>{choiceText}</p>
    </div>
  );
}
