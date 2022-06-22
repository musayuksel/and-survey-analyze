import React, { useContext, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import RepliesAnalyze from "./RepliesAnalyze";
import "../styles/survey-dropdown.css";
import { FilterContext } from "./Store/FilterProvider";
export default function SurveyDropdown({ date, sessionName, repliesCount }) {
  const { currentSurveyId, getCurrentSurveyFromApi } =
    useContext(FilterContext);
  const [isAnalyzeOpen, setIsAnalyzeOpen] = useState(false);

  getCurrentSurveyFromApi();
  function handleDropdown() {
    setIsAnalyzeOpen(!isAnalyzeOpen);
  }

  return (
    <li className="survey-dropdown-list-element">
      <p>{date}</p>
      <p>{sessionName}</p>
      <p>{repliesCount}</p>
      <BsChevronDown onClick={handleDropdown} />
      {isAnalyzeOpen && <RepliesAnalyze />}
      {isAnalyzeOpen && <RepliesAnalyze />}
    </li>
  );
}
