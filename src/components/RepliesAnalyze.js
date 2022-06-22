import React from "react";
import { BsPercent } from "react-icons/bs";
import "../styles/replies-analyze.css";
export default function RepliesAnalyze({
  percentage = 0,
  choiceText,
  choiceId,
}) {
  // console.log({ choiceId });
  return (
    <div className="replies-analyze-container">
      <p>
        {percentage}
        <BsPercent />
      </p>
      <p>{choiceText}</p>
      <input type="text" placeholder="Comment" />
      <button>Submit</button>
    </div>
  );
}
