import React, { useContext } from "react";
import { FilterContext } from "./Store/FilterProvider";
import "../styles/SurveyPdf.css";

const SurveyPdf = ({ comment, sessionName, currentPDF }) => {
  const { bootCampDate, responseCount } = useContext(FilterContext);

  return (
    <div>
      <nav className="pdf-nav">
        <img className="imgx" src="../logo2.png" alt="icon" />
      </nav>
      <div className="pdf-content">
        <img src="../Full Circle.png" alt="Full Circle" />
        <h1>On-boarding Feedback</h1>
        <ul>
          <li>
            <b>Date:</b> {bootCampDate}
          </li>
          <li>
            <b>Session:</b> {sessionName}
          </li>
          <li>
            <b>Replies:</b> {responseCount}
          </li>
        </ul>
        <hr />
        <div>
          <div>{currentPDF}</div>
        </div>
        <hr />
        <h4 className="comments-section-title">On-Boarding Team Comments:</h4>
        <div className="comments">{comment}</div>
      </div>
    </div>
  );
};

export default SurveyPdf;
