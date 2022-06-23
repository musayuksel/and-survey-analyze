import React from "react";
import { BsPercent } from "react-icons/bs";
import "../styles/replies-analyze.css";
export default function RepliesAnalyze({ percentage = 0, choiceText }) {
  return (
    <div className="container">
      <div className="perc">
        <p>
          {percentage}
          <BsPercent />
        </p>
      </div>
      <p className="choice-text">{choiceText}</p>
    </div>
  );
}
