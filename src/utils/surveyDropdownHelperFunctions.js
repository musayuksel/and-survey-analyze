export function getPercentage(bulkData, questionId, pageId) {
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
          currentQuestion?.answers[1]?.text +
            " (" +
            eachPerson.pages[0].questions[0].answers[0].text +
            " )"
        );
      } else {
        answerCounter[currentQuestion.answers[0].choice_id] = {
          counter: 1,
          text: [
            currentQuestion.answers[1]?.text +
              " (" +
              eachPerson.pages[0].questions[0].answers[0].text +
              " )" || "",
          ],
        };
      }
    }
  });
  // delete answerCounter["undefined"];
  return { answerCounter, total };
}

export function handleSeeAllComments(
  bulkData2,
  eachQuestion,
  questionId,
  setIsCommentOpen,
  setUserFeedBack
) {
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
  setIsCommentOpen((prev) => !prev);
  setUserFeedBack(comments);
}
