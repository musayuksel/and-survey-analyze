const accessToken =
  "rJOLXwrwqRRUrgYpqlqDVHDDcGAion9PigDidcOBcFAsSG4y8xTMTwFwokakYEXqhjYRpXPWZw6XZZYucTPuL4DUZOTFy-sNoV1ZNr-0i9LOyvHOWYSQyJvqW4o7oz83";

export async function getAllSurveysFromApi(setAllSurveys) {
  try {
    const response = await fetch(`https://api.surveymonkey.com/v3/surveys`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    setAllSurveys(data.data);
  } catch (err) {
    console.log(err);
  }
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

export async function getCurrentSurveyFromApi(
  currentSurveyId,
  setBootCampDate,
  setDropdownQuestions
) {
  console.log("fetch started For CURRENT SURVEY:>>>>>>");
  if (currentSurveyId) {
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
  } else {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
  }
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

export async function getBulkSurveyDataFromApi(
  endPoint,
  setBulkData,
  setResponseCount
) {
  if (endPoint) {
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
  }
  // ************************************

  // setTimeout(() => {
  //   setBulkData(bulk);
  //   setResponseCount(bulk.total);
  // }, 100);
  // ************************************
}
