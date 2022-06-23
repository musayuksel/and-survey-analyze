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
        <p>{date}</p> 
        <p>{sessionName}</p>
        <p>{repliesCount}</p>
      
        <div className="chevron">
        < BsChevronDown onClick={handleDropdown}/>
        </div>
      </div>
      <div className="analyse">
        {isAnalyzeOpen && <RepliesAnalyze />}
      </div>
    </section>
  );
}
