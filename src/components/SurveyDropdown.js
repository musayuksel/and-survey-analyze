import React, { useContext, useState, useEffect } from "react";
import { BsChevronDown } from "react-icons/bs";
import RepliesAnalyze from "./RepliesAnalyze";
import "../styles/survey-dropdown.css";
import { FilterContext } from "./Store/FilterProvider";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
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
  const [isSubmitted, setIsSubmitted] = useState(false);
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
    <li className="block">
      <div className={`labels ${isAnalyzeOpen ? "open" : ""}`}>
        <p>{bootCampDate}</p>
        <p>{sessionName}</p>
        <p>{responseCount}</p>
        <div className={`chevron ${isAnalyzeOpen ? "open" : ""}`}>
          <BsChevronDown onClick={handleDropdown} />
        </div>
      </div>
      <div
        style={{ display: isAnalyzeOpen ? "block" : "none" }}
        className="replies-container"
      >
        <div className="analyse">
          <div className="answers-container">{replies}</div>
        </div>
        {isSubmitted ? (
          <div className="submitted-container">
            <p className="comment-summary">{comment}</p>
            <button className="comment-submit-btn">
              Download{" "}
              <span>
                <HiOutlineArrowNarrowRight />
              </span>
            </button>
          </div>
        ) : (
          <>
            <input
              className="comment-input"
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Type comment here"
            />
            <button
              onClick={() => setIsSubmitted(!isSubmitted)}
              className="comment-submit-btn"
            >
              Submit{" "}
              <span>
                <HiOutlineArrowNarrowRight />
              </span>
            </button>
          </>
        )}
      </div>
    </li>
  );
}
