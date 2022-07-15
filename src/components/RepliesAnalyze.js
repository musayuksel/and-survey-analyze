import React, { useState } from "react";
import { BsPercent } from "react-icons/bs";
import "../styles/replies-analyze.css";
import { nanoid } from "nanoid";
import { MdOutlineClose } from "react-icons/md";
export default function RepliesAnalyze({
  percentage = 0,
  choiceText,
  choiceId,
  selectedAnswerCounter,
}) {
  const [isCommentClicked, setIsCommentClicked] = useState(false);

  function showComments() {
    setIsCommentClicked(!isCommentClicked);
  }

  function getCommentListItems(items) {
    const nonEmptyComments = items.filter((item) => item);
    if (nonEmptyComments.length === 0) {
      return <li>Sorry!!! There is no comment for this question!!!</li>;
    }
    return nonEmptyComments.map((eachComment) => (
      <li key={nanoid(5)}>{eachComment}</li>
    ));
  }

  return (
    <>
      <div className="container" onClick={() => showComments()}>
        <div className="perc">
          <p>
            {percentage}
            <BsPercent />
          </p>
        </div>
        <p className="choice-text">{choiceText}</p>

        {selectedAnswerCounter.answerCounter[choiceId] && (
          <article
            className={`comments-container ${isCommentClicked ? "open" : ""}`}
          >
            <section className="option-explanation">
              <h3>Comments</h3>
              <p className="answer">{choiceText}</p>
            </section>
            <div className="comment-percent">{percentage}%</div>
            <ul className="comments">
              {getCommentListItems(
                selectedAnswerCounter.answerCounter[choiceId].text
              )}
            </ul>
            <span className="close-comment">
              <MdOutlineClose />
            </span>
          </article>
        )}
      </div>
    </>
  );
}
