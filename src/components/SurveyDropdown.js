import React, { useContext, useState, useEffect } from "react";
import { BsChevronDown } from "react-icons/bs";
import RepliesAnalyze from "./RepliesAnalyze";
import "../styles/survey-dropdown.css";
import { FilterContext } from "./Store/FilterProvider";
export default function SurveyDropdown({ sessionName, questionId }) {
  const {
    responseCount,
    bootCampDate,
    getBulkSurveyDataFromApi,
    dropdownChoices,
  } = useContext(FilterContext);
  const [isAnalyzeOpen, setIsAnalyzeOpen] = useState(false);
  // console.log({ questionId }); //this id for question
  function handleDropdown() {
    setIsAnalyzeOpen(!isAnalyzeOpen);
    getBulkSurveyDataFromApi();
    // console.log({ choiceId });
  }
  const replies = dropdownChoices.map((choice) => {
    return (
      <RepliesAnalyze
        choiceId={choice.id}
        key={choice.id}
        choiceText={choice.text}
      />
    );
  });
  return (
    <li className="survey-dropdown-list-element">
      <p>{bootCampDate}</p>
      <p>{sessionName}</p>
      <p>{responseCount}</p>
      <BsChevronDown onClick={handleDropdown} />
      {isAnalyzeOpen && replies}
    </li>
  );
}
