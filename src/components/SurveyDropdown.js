import React, { useState, useEffect, useRef } from "react";
import { BsChevronDown } from "react-icons/bs";
import RepliesAnalyze from "./RepliesAnalyze";
import "../styles/survey-dropdown.css";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import SurveyPdf from "./SurveyPdf";
import { BsPercent } from "react-icons/bs";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { nanoid } from "nanoid";
import { notification } from "antd";
import { getPercentage } from "../utils/surveyDropdownHelperFunctions";

const openNotification = (placement) => {
  notification.open({
    message: "Success!",
    description: "PDF Succesfully Downloaded.",
    placement,
    onClick: () => {
      console.log("Notification Clicked!");
    },
  });
};

export default function SurveyDropdown({
  bulkData,
  responseCount,
  bootCampDate,
  eachQuestion,
  questionId,
  sessionName,
}) {
  const [isAnalyzeOpen, setIsAnalyzeOpen] = useState(false);
  const [selectedAnswerCounter, setSelectedAnswerCounter] = useState({
    answerCounter: {},
    total: 15,
  });
  const [comment, setComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [userFeedBack, setUserFeedBack] = useState([]);
  const printRef = useRef();
  const [showText, setShowText] = useState(false);
  const [currentPDF, setCurrentPDF] = useState();

  useEffect(() => {
    setCurrentPDF(
      eachQuestion.answerOptions.map((choice) => {
        const percentage = Math.round(
          ((selectedAnswerCounter.answerCounter[choice.id]?.counter || 0) /
            selectedAnswerCounter.total) *
            100
        );
        return (
          <div key={nanoid(5)} className="pdf-container">
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
      })
    );
  }, [eachQuestion, selectedAnswerCounter]);

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    // pdf.save('print.pdf');
    pdf.save(`${bootCampDate} - ${sessionName}.pdf`);
  };

  function handleDownloadAndSuccess() {
    handleDownloadPdf();
    openNotification("bottomLeft");
  }

  const handlePdfPreview = () => {
    setShowText(!showText);
  };

  function handleDropdown() {
    setIsAnalyzeOpen(!isAnalyzeOpen);
  }
  useEffect(() => {
    const result = getPercentage(bulkData, questionId, eachQuestion.pageId);
    setSelectedAnswerCounter(result);
  }, [bulkData, eachQuestion.pageId, questionId]);

  const replies = eachQuestion.answerOptions.map((choice) => {
    const percentage = Math.round(
      ((selectedAnswerCounter.answerCounter[choice.id]?.counter || 0) /
        selectedAnswerCounter.total) *
        100
    );
    return (
      <RepliesAnalyze
        key={nanoid(5)}
        choiceText={choice.text}
        choiceId={choice.id}
        selectedAnswerCounter={selectedAnswerCounter}
        percentage={percentage || 0}
      />
    );
  });

  function handleSeeAllComments(bulkData2) {
    const comments = [];
    bulkData2.data.forEach((eachUser, i) => {
      const currentPage = eachUser.pages.find(
        (page) => page.id === eachQuestion.pageId
      );
      const currentQuestion = currentPage.questions.find((question, j) => {
        return question.id === questionId;
      });
      comments.push(
        currentQuestion?.answers[0].text +
          " - ( " +
          eachUser.pages[0].questions[0].answers[0].text +
          " )"
      );
    });
    setIsCommentOpen(!isCommentOpen);
    setUserFeedBack(comments);
  }
  return (
    <li className="block">
      <div
        onClick={handleDropdown}
        style={{ cursor: "pointer" }}
        className={`labels ${isAnalyzeOpen ? "open" : ""}`}
      >
        <p>{bootCampDate}</p>
        <p>{sessionName}</p>
        <p>{responseCount}</p>
        <div className={`chevron ${isAnalyzeOpen ? "open" : ""}`}>
          <BsChevronDown />
        </div>
      </div>
      <div
        style={{ display: isAnalyzeOpen ? "block" : "none" }}
        className="replies-container"
      >
        <div className="analyse">
          {isCommentOpen && (
            <ul className="user-feedback-container">
              {userFeedBack.map((comment) => (
                <li key={nanoid(5)}>{comment}</li>
              ))}
            </ul>
          )}
          <div className="answers-container">
            {replies.length !== 0 ? (
              replies
            ) : (
              <button
                className="comment-submit-btn"
                onClick={() => handleSeeAllComments(bulkData)}
              >
                {`${isCommentOpen ? "HIDE" : "SEE"} ALL COMMENTS`}
              </button>
            )}
          </div>
        </div>
        {isSubmitted ? (
          <div className="submitted-container">
            <p className="comment-summary">{comment}</p>
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
            <div className="pdf-container"></div>
          </>
        )}
        {isSubmitted && (
          <button
            className="comment-submit-btn"
            type="button"
            onClick={handlePdfPreview}
          >
            Show PDF
            <span>
              <HiOutlineArrowNarrowRight />
            </span>
          </button>
        )}
        {}
        {showText && (
          <>
            <button
              className="comment-submit-btn"
              onClick={handleDownloadAndSuccess}
            >
              Download
              <span>
                <HiOutlineArrowNarrowRight />
              </span>
            </button>
            <div ref={printRef}>
              <SurveyPdf
                comment={comment}
                sessionName={sessionName}
                currentPDF={currentPDF}
                bootCampDate={bootCampDate}
                responseCount={responseCount}
              />
            </div>
          </>
        )}
      </div>
    </li>
  );
}
