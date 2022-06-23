import React, { useContext, useState, useEffect } from "react";
import { BsChevronDown } from "react-icons/bs";
import RepliesAnalyze from "./RepliesAnalyze";
import "../styles/survey-dropdown.css";
import { FilterContext } from "./Store/FilterProvider";
export default function SurveyDropdown({ sessionName, questionId }) {
  const {
    responseCount,
    bootCampDate,
    dropdownChoices,
    getPercentage,
    bulkData,
  } = useContext(FilterContext);
  const [isAnalyzeOpen, setIsAnalyzeOpen] = useState(false);
  const [selectedAnswerCounter, setSelectedAnswerCounter] = useState({
    answerCounter: {},
    total: 15,
  });
  const [comment, setComment] = useState("");
  function handleDropdown() {
    setIsAnalyzeOpen(!isAnalyzeOpen);
  }
  useEffect(() => {
    const result = getPercentage(questionId);
    setSelectedAnswerCounter(result);
    // eslint-disable-next-line
  }, [bulkData, isAnalyzeOpen, dropdownChoices]);
  const replies = dropdownChoices.map((choice) => {
    const percentage = Math.round(
      ((selectedAnswerCounter.answerCounter[choice.id] || 0) /
        selectedAnswerCounter.total) *
        100
    );
    return (
      <RepliesAnalyze
        key={choice.id}
        choiceText={choice.text}
        percentage={percentage || 0}
        isAnalyzeOpen={isAnalyzeOpen}
      />
    );
  });
  return (
    <li className="survey-dropdown-list-element">
      <p>{bootCampDate}</p>
      <p>{sessionName}</p>
      <p>{responseCount}</p>
      <BsChevronDown onClick={handleDropdown} />
      <div
        style={{ display: isAnalyzeOpen ? "block" : "none" }}
        className="replies-container"
      >
        <div style={{ display: "flex" }} className="">
          {replies}
        </div>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Comment"
        />
        <button>Submit</button>
      </div>
    </li>
  );
}
