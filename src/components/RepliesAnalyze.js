import React from "react";
import { BsPercent } from "react-icons/bs";
import "../styles/replies-analyze.css";
export default function RepliesAnalyze({ percentage = 0 }) {
  return (
      <div className="container">

        <div className="perc">
          <p> {percentage}<BsPercent /></p>
          <p> {percentage}<BsPercent /></p>
          <p> {percentage}<BsPercent /></p>
          <p> {percentage}<BsPercent /></p>
          <p> {percentage}<BsPercent /></p>
        </div>

        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa esse
          accusantium incidunt neque veniam eum suscipit magni? Aperiam corporis
          minima nobis maiores!
        </p>
        <input type="text" placeholder="Comment" />
        <button>Submit</button>
      </div>
  );
}
