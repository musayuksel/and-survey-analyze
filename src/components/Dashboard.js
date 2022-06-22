import React, { useContext, useEffect } from "react";
import "../styles/dashboard.css";
import Filter from "./Filter";
import SurveyDropdown from "./SurveyDropdown";
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
  useEffect(() => {
    // eslint-disable-next-line
    getAllDataFromApi();
  }, []);
  useEffect(() => {
    // eslint-disable-next-line
    getCurrentSurveyFromApi();
  }, [currentSurveyId]);

  const dropdownQuestionsMenu = dropdownQuestions
    .filter((eachQuestion) => {
      return eachQuestion.question.includes(choosedCourse);
    })
    .map((eachQuestion) => (
      <SurveyDropdown
        questionId={eachQuestion.questionId}
        key={eachQuestion.questionId}
        sessionName={eachQuestion.question.split("<em>")[0].split("(")[0]}
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
