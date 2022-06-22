import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import RepliesAnalyze from "./RepliesAnalyze";
import "../styles/survey-dropdown.css";

export default function SurveyDropdown({ date, sessionName, repliesCount }) {
  const [isAnalyzeOpen, setIsAnalyzeOpen] = useState(false);
  function handleDropdown() {
    setIsAnalyzeOpen(!isAnalyzeOpen);
  }
  return (
    <section className="block">
      <div className="labels">
        <p className="one">{date}</p> 
        <p className="two">{sessionName}</p>
        <p className="three">{repliesCount}</p>
      </div>
      <div className="chevron">
      <BsChevronDown onClick={handleDropdown} />
      </div>
      {isAnalyzeOpen && <RepliesAnalyze />}
      
    </section>
  );
}
