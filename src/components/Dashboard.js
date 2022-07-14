import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import Filter from "./Filter";
import SurveyDropdown from "./SurveyDropdown";
import { AuthContext } from "../App";
import { FilterContext } from "./Store/FilterProvider";
export default function Dashboard() {
  const {
    bootcamp,
    getAllDataFromApi,
    getCurrentSurveyFromApi,
    currentSurveyId,
    dropdownQuestions,
    choosedCourse,
  } = useContext(FilterContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  if (!user) {
    navigate("/401");
  }
  useEffect(() => {
    getAllDataFromApi();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    getCurrentSurveyFromApi();
    // eslint-disable-next-line
  }, [currentSurveyId]);

  const dropdownQuestionsMenu = dropdownQuestions
    .filter((eachQuestion) => {
      // console.log({ eachQuestion });
      return eachQuestion.question.includes(choosedCourse);
    })
    .map((eachQuestion) => (
      <SurveyDropdown
        eachQuestion={eachQuestion}
        questionId={eachQuestion.questionId}
        key={eachQuestion.questionId}
        sessionName={
          eachQuestion.question.split("<em>")[0].split("(")[0].split("<span")[0]
        }
      />
    ));

  return (
    <main className="dashboard-container">
      <aside className="aside-filter-container">
        <Filter options={bootcamp} />
      </aside>
      <ul className="survey-dropdown-container">{dropdownQuestionsMenu}</ul>
    </main>
  );
}
