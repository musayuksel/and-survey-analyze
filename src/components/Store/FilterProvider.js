import React, { createContext, useState } from "react";
import { dummyData } from "../../utils/surveys";
export const FilterContext = createContext();

const FilterProvider = ({ children }) => {
  const [bootcamp, setBootcamp] = useState(dummyData);
  const [currentSurveyId, setCurrentSurveyId] = useState("506686870");

  function handleBootcampChange(e) {
    // console.log(e.target.value);
    setCurrentSurveyId(e.target.value);
  }

  console.log(currentSurveyId, ">>>>>>>>>>>>>>>>>>>>>>");
  const accessToken =
    "rJOLXwrwqRRUrgYpqlqDVHDDcGAion9PigDidcOBcFAsSG4y8xTMTwFwokakYEXqhjYRpXPWZw6XZZYucTPuL4DUZOTFy-sNoV1ZNr-0i9LOyvHOWYSQyJvqW4o7oz83";

  async function getCurrentSurveyFromApi() {
    console.log("fetch started with current survey:>>>>>>", currentSurveyId);
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
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log({ data });
        // setBootcamp(data.data);
      })
      .catch((err) => {
        console.error(err);
      });
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
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log({ data });
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
  };

  return (
    <FilterContext.Provider value={filteredData}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
