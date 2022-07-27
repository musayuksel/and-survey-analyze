import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import Filter from "./Filter";
import SurveyDropdown from "./SurveyDropdown";
import { AuthContext } from "../App";
import {
  getAllSurveysFromApi,
  getCurrentSurveyFromApi,
  getBulkSurveyDataFromApi,
} from "../utils/dashboardHelperFunctions";
export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [allSurveys, setAllSurveys] = useState([]);
  const [bulkData, setBulkData] = useState({ data: [] });
  const [currentSurveyDropdownQuestions, setCurrentSurveyDropdownQuestions] =
    useState([]);
  const [currentSurveyId, setCurrentSurveyId] = useState();
  const [bootCampDate, setBootCampDate] = useState("6th June");
  const [choosedCourse, setChoosedCourse] = useState("");
  const [responseCount, setResponseCount] = useState(20);

  // CHECK IF USER IS LOGGED IN
  useEffect(() => {
    if (!user) {
      navigate("/401");
    }
  }, [navigate, user]);

  //ALL SURVEYS
  useEffect(() => {
    async function fetchData() {
      getAllSurveysFromApi(setAllSurveys);
    }
    fetchData();
  }, []);
  //CURRENT SURVEY
  useEffect(() => {
    async function fetchData() {
      getCurrentSurveyFromApi(
        currentSurveyId,
        setBootCampDate,
        setCurrentSurveyDropdownQuestions
      );
    }
    fetchData();
  }, [currentSurveyId, setBootCampDate, setCurrentSurveyDropdownQuestions]);
  // const currentSurveyDropdownQuestions = React.useState(() =>
  //   getCurrentSurveyFromApi()
  // );
  // ALL RESPONSES FOR CURRENT SURVEY
  useEffect(() => {
    async function fetchData() {
      getBulkSurveyDataFromApi(currentSurveyId, setBulkData, setResponseCount);
    }
    fetchData();
  }, [currentSurveyId, setBulkData, setResponseCount]);

  const dropdownQuestionsMenu = currentSurveyDropdownQuestions
    .filter((eachQuestion) => eachQuestion.question.includes(choosedCourse))
    .map((eachQuestion) => (
      <SurveyDropdown
        key={eachQuestion.questionId}
        bulkData={bulkData}
        responseCount={responseCount}
        bootCampDate={bootCampDate}
        eachQuestion={eachQuestion}
        questionId={eachQuestion.questionId}
        sessionName={
          eachQuestion.question.split("<em>")[0].split("(")[0].split("<span")[0]
        }
      />
    ));

  return (
    <main className="dashboard-container">
      <aside className="aside-filter-container">
        <Filter
          options={allSurveys}
          dropdownQuestions={currentSurveyDropdownQuestions}
          setChoosedCourse={setChoosedCourse}
          setCurrentSurveyId={setCurrentSurveyId}
        />
      </aside>
      <ul className="survey-dropdown-container">{dropdownQuestionsMenu}</ul>
    </main>
  );
}
