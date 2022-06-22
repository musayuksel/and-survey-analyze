import React, { createContext, useState } from "react";
import { dummyData, details, bulk } from "../../utils/surveys";
export const FilterContext = createContext();

const FilterProvider = ({ children }) => {
  const [bootcamp, setBootcamp] = useState(dummyData);
  const [currentSurveyId, setCurrentSurveyId] = useState("506686870");
  const [responseCount, setResponseCount] = useState(0);
  const [bootCampDate, setBootCampDate] = useState("6th June");
  const [dropdownQuestions, setDropdownQuestions] = useState([]);
  const [choosedCourse, setChoosedCourse] = useState("");
  const [dropdownChoices, setDropdownChoices] = useState([]);
  function handleCourseChoose(e) {
    setChoosedCourse(e.target.value);
  }
  function handleBootcampChange(e) {
    setCurrentSurveyId(e.target.value);
  }
  // const accessToken =
  //   "rJOLXwrwqRRUrgYpqlqDVHDDcGAion9PigDidcOBcFAsSG4y8xTMTwFwokakYEXqhjYRpXPWZw6XZZYucTPuL4DUZOTFy-sNoV1ZNr-0i9LOyvHOWYSQyJvqW4o7oz83";

  async function getBulkSurveyDataFromApi() {
    // https://api.surveymonkey.com/v3/surveys/506487016/responses/bulk
    console.log({ bulk });
    // bulk.data[2].pages[0].questions[2].answers
  }
  async function getCurrentSurveyFromApi() {
    setResponseCount(details.response_count);
    setBootCampDate(details.title);
    const surveyOptions = details.pages[0].questions[2].answers.choices.map(
      (choice) => {
        return { id: choice.id, text: choice.text };
      }
    );
    setDropdownChoices(surveyOptions);
    const relatedSurveys = details.pages[0].questions[2].answers.rows.map(
      (eachQuestion) => {
        return { question: eachQuestion.text, questionId: eachQuestion.id };
      }
    );

    setDropdownQuestions(relatedSurveys);
    //     setBootCampDate(data.title);
    // console.log("fetch started with current survey:>>>>>>", currentSurveyId);
    // fetch(
    //   `https://api.surveymonkey.com/v3/surveys/${currentSurveyId}/details`,
    //   {
    //     method: "GET",
    //     headers: {
    //       Accept: "application/json",
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //   }
    // )
    //   .then((response) => {
    //     console.log(response);
    //     return response.json();
    //   })
    //   .then((data) => {
    //     console.log({ data });
    //     setResponseCount(data.response_count);
    //     setBootCampDate(data.title);
    //     const relatedSurveys = data.pages.questions.map((eachQuestion) => {
    //       // return eachQuestion.required.text;
    //       console.log(eachQuestion.headings[0].heading);
    //     });
    //     console.log({ relatedSurveys });
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  }

  function getAllDataFromApi() {
    // console.log("fetch started For all data:>>>>>>");
    // fetch(`https://api.surveymonkey.com/v3/surveys`, {
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json",
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    // })
    //   .then((response) => {
    //     console.log(response);
    //     return response.json();
    //   })
    //   .then((data) => {
    //     console.log({ data });
    //     setBootcamp(data.data);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
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
  };

  return (
    <FilterContext.Provider value={filteredData}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
