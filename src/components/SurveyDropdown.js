import React, { useContext, useState, useEffect, useRef } from "react";
import { BsChevronDown } from "react-icons/bs";
import RepliesAnalyze from "./RepliesAnalyze";
import "../styles/survey-dropdown.css";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import SurveyPdf from "./SurveyPdf";
import { FilterContext } from "./Store/FilterProvider";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
export default function SurveyDropdown({
  sessionName,
  questionId,
  eachQuestion,
}) {
  // console.log({ eachQuestion });
  const { responseCount, bootCampDate, getPercentage, bulkData } =
    useContext(FilterContext);
  const [isAnalyzeOpen, setIsAnalyzeOpen] = useState(false);
  const [selectedAnswerCounter, setSelectedAnswerCounter] = useState({
    answerCounter: {},
    total: 15,
  });
  const [comment, setComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const printRef = useRef();
  const [showText, setShowText] = useState(false);
  // const [answerOptions, setAnswerOptions] = useState([{}]);
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

  const handlePdfPreview = () => {
    setShowText(!showText);
  };

  function handleDropdown() {
    setIsAnalyzeOpen(!isAnalyzeOpen);
  }
  useEffect(() => {
    const result = getPercentage(bulkData, questionId, eachQuestion.pageId);
    setSelectedAnswerCounter(result);
  }, [bulkData, eachQuestion.pageId, questionId, getPercentage]);
  // console.log({ eachQuestion });

  const replies = eachQuestion.answerOptions.map((choice) => {
    const percentage = Math.round(
      ((selectedAnswerCounter.answerCounter[choice.id]?.counter || 0) /
        selectedAnswerCounter.total) *
        100
    );
    return (
      <RepliesAnalyze
        key={choice.id}
        choiceText={choice.text}
        choiceId={choice.id}
        selectedAnswerCounter={selectedAnswerCounter}
        // percentage={0}
        percentage={percentage || 0}
        isAnalyzeOpen={isAnalyzeOpen} //bunu sil
      />
    );
  });

  function testFunction() {
    // console.log({ selectedAnswerCounter });
  }

  return (
    <li className="block" onClick={testFunction}>
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
          <div className="answers-container">{replies}</div>
        </div>
        {isSubmitted ? (
          <div className="submitted-container">
            <p className="comment-summary">{comment}</p>
            <button className="comment-submit-btn" onClick={handleDownloadPdf}>
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
            {/* <button type="button" onClick={handlePdfPreview}>
        Show PDF
      </button> */}
            {/* <button type="button" onClick={handleDownloadPdf}>
        Download as PDF
      </button> */}
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
        {showText && (
          <div ref={printRef}>
            <SurveyPdf
              selectedAnswerCounter={selectedAnswerCounter.answerCounter}
              comment={comment}
              sessionName={sessionName}
            />
          </div>
        )}
      </div>
    </li>
  );
}
