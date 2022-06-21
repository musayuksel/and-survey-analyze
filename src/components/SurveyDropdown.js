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
    <section>
      <p>{date}</p>
      <p>{sessionName}</p>
      <p>{repliesCount}</p>
      <BsChevronDown onClick={handleDropdown} />
      {isAnalyzeOpen && <RepliesAnalyze />}
    </section>
  );
}
