import React, {useContext} from "react";
import { FilterContext } from "./Store/FilterProvider";
import "../styles/SurveyPdf.css";
import { BsPercent } from "react-icons/bs";



const SurveyPdf = ({ selectedAnswerCounter, comment, sessionName }) => {
    const {bootCampDate, responseCount, dropdownChoices} = useContext(FilterContext);

    const replies = dropdownChoices.map((choice) => {
        const percentage = Math.round(
          ((selectedAnswerCounter.answerCounter[choice.id] || 0) /
            selectedAnswerCounter.total) *
            100
        );
        return (
        <div className="pdf-container">
      <div className="pdf-perc">
        <p>
          {percentage || 0}
          <BsPercent />
        </p>
      </div>
      <div className="pdf-choice-container">
      <p className="pdf-choice-text">{choice.text}</p>
      </div>
    </div>
        );
      });
console.log(sessionName)
    return(
        <div>
            <nav className="pdf-nav">
                <img className="imgx" src="../logo2.png" alt="icon"/>
            </nav>
            <div className="pdf-content">
                <img src="../Full Circle.png" alt="Full Circle"/>
                <h1>On-boarding Feedback</h1>
                <ul>
                    <li><b>Date:</b> {bootCampDate}</li>
                    <li><b>Session:</b> {sessionName}</li>
                    <li><b>Replies:</b> {responseCount}</li>
                </ul>
                <hr />
                <div>
                    <div>
                    {replies}
                    </div>
                </div>
                <hr />
                <h4>On-Boarding Team Comments:</h4>
                <div className="comments">{comment}</div>
            </div>
      </div>
    )
}

export default SurveyPdf;