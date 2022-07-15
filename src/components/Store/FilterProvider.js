import React, { createContext, useState } from "react";
// import bulk from "../../utils/bulkdata";
// import details from "../../utils/details";
// import dummyData from "../../utils/allsurveys";
export const FilterContext = createContext();

const FilterProvider = ({ children }) => {
  const [bootcamp, setBootcamp] = useState([]);
  const [currentSurveyId, setCurrentSurveyId] = useState("506686870");
  const [responseCount, setResponseCount] = useState(0);
  const [bootCampDate, setBootCampDate] = useState("6th June");
  const [dropdownQuestions, setDropdownQuestions] = useState([]);
  const [choosedCourse, setChoosedCourse] = useState("");

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
    console.log("fetch started For BULK DATA:>>>>>>", endPoint);
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
        setResponseCount(data.total); //********* */
      })
      .catch((err) => {
        console.error(err);
      });
    // ************************************

    // setTimeout(() => {
    //   setBulkData(bulk);
    //   setResponseCount(bulk.total);
    // }, 100);
    // ************************************
  }

  async function getCurrentSurveyFromApi() {
    console.log("fetch started For CURRENT SURVEY:>>>>>>");
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
      .then((details) => {
        setBootCampDate(details.title);

        const relatedSurveys = [];
        details.pages.forEach((page) => {
          page.questions.forEach((eachQuestion) => {
            relatedSurveys.push({
              question: eachQuestion.headings[0].heading,
              questionId: eachQuestion.id,
              answerOptions: getChoiceIdAndTextOfQuestion(eachQuestion),
              pageId: page.id,
            });
          });
        });

        setDropdownQuestions(relatedSurveys);
      })
      .catch((err) => {
        console.error(err);
      });
    // ************************************

    // setBootCampDate(details.title);
    // const relatedSurveys = [];
    // details.pages.forEach((page) => {
    //   page.questions.forEach((eachQuestion) => {
    //     relatedSurveys.push({
    //       question: eachQuestion.headings[0].heading,
    //       questionId: eachQuestion.id,
    //       answerOptions: getChoiceIdAndTextOfQuestion(eachQuestion),
    //       pageId: page.id,
    //     });
    //   });
    // });
    // setDropdownQuestions(relatedSurveys);
    // ************************************
  }
  function getChoiceIdAndTextOfQuestion(question) {
    const result = [];
    if (question["answers"]) {
      question["answers"].choices.forEach((choice) => {
        result.push({ id: choice.id, text: choice.text });
      });
    }
    return result;
  }
  function getAllDataFromApi() {
    console.log("fetch started For all data:>>>>>>");
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
    // ************************************
    // setTimeout(() => {
    //   setBootcamp(dummyData.data);
    // }, 500);
    // ************************************
  }

  function getPercentage(bulkData, questionId, pageId) {
    const total = bulkData["data"]?.length; //15 people have responded
    const answerCounter = {};
    bulkData.data?.forEach((eachPerson) => {
      const currentPage = eachPerson.pages.find((page) => page.id === pageId);
      const currentQuestion = currentPage?.questions.find(
        (question) => question.id === questionId
      );
      if (currentQuestion?.answers[0].choice_id) {
        if (answerCounter[currentQuestion.answers[0].choice_id]) {
          answerCounter[currentQuestion.answers[0].choice_id].counter += 1;
          answerCounter[currentQuestion.answers[0].choice_id].text.push(
            currentQuestion?.answers[1]?.text
          );
        } else {
          answerCounter[currentQuestion.answers[0].choice_id] = {
            counter: 1,
            text: [currentQuestion.answers[1]?.text || ""],
          };
        }
      }
    });
    // delete answerCounter["undefined"];
    return { answerCounter, total };
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
