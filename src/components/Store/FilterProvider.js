import React, { createContext, useState } from "react";
import { dummyData } from "../../utils/surveys";
export const FilterContext = createContext();

const FilterProvider = ({ children }) => {
  const [bootcamp, setBootcamp] = useState(dummyData);
  const [currentSurveyId, setCurrentSurveyId] = useState("506686870");
  const [responseCount, setResponseCount] = useState(0);
  const [bootCampDate, setBootCampDate] = useState("6th June");
  const [dropdownQuestions, setDropdownQuestions] = useState([]);
  const [choosedCourse, setChoosedCourse] = useState("");
  const [dropdownChoices, setDropdownChoices] = useState([]);
  const [bulkData, setBulkData] = useState({ data: [] });
  function handleCourseChoose(e) {
    setChoosedCourse(e.target.value);
  }
  function handleBootcampChange(e) {
    setCurrentSurveyId(e.target.value);
    getBulkSurveyDataFromApi(e.target.value);
  }
  const accessToken =
    "rJOLXwrwqRRUrgYpqlqDVHDDcGAion9PigDidcOBcFAsSG4y8xTMTwFwokakYEXqhjYRpXPWZw6XZZYucTPuL4DUZOTFy-sNoV1ZNr-0i9LOyvHOWYSQyJvqW4o7oz83";

  async function getBulkSurveyDataFromApi(endPoint) {
    fetch(
      `https://api.surveymonkey.com/v3/surveys/${endPoint}/responses/bulk`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setBulkData(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function getPercentage(questionId) {
    const total = bulkData["data"].length; //15 people have responded
    const answerCounter = {};
    bulkData.data.forEach((eachPerson) => {
      eachPerson.pages[0].questions[2].answers.forEach((answers) => {
        if (answers.row_id === questionId) {
          if (answerCounter[answers.choice_id]) {
            answerCounter[answers.choice_id] += 1;
          } else {
            answerCounter[answers.choice_id] = 1;
          }
        }
      });
    });
    delete answerCounter["undefined"];
    return { answerCounter, total };
  }
  async function getCurrentSurveyFromApi() {
    fetch(
      `https://api.surveymonkey.com/v3/surveys/${currentSurveyId}/details`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setResponseCount(data.response_count);
        setBootCampDate(data.title);
        const surveyOptions = data.pages[0].questions[2].answers.choices.map(
          (choice) => {
            return { id: choice.id, text: choice.text };
          }
        );
        setDropdownChoices(surveyOptions);
        const relatedSurveys = data.pages[0].questions[2].answers.rows.map(
          (eachQuestion) => {
            return { question: eachQuestion.text, questionId: eachQuestion.id };
          }
        );
        setDropdownQuestions(relatedSurveys);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function getAllDataFromApi() {
    // console.log("fetch started For all data:>>>>>>");
    fetch(`https://api.surveymonkey.com/v3/surveys`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setBootcamp(data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const filteredData = {
    bootcamp,
    setBootcamp,
    currentSurveyId,
    setCurrentSurveyId,
    handleBootcampChange,
    getAllDataFromApi,
    getCurrentSurveyFromApi,
    responseCount,
    bootCampDate,
    dropdownQuestions,
    handleCourseChoose,
    choosedCourse,
    getBulkSurveyDataFromApi,
    dropdownChoices,
    getPercentage,
    bulkData,
  };

  return (
    <FilterContext.Provider value={filteredData}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
