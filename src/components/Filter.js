import React from "react";
import "../styles/filter.css";
export default function Filter({
  options,
  dropdownQuestions,
  setChoosedCourse,
  setCurrentSurveyId,
}) {
  function handleCourseChoose(e) {
    setChoosedCourse(e.target.value);
  }
  function handleBootcampChange(e) {
    setCurrentSurveyId(e.target.value);
  }

  const bootCampOptions = options.map((option) => (
    <option key={option.id} value={option.id}>
      {option.title}
    </option>
  ));
  const courseFilterOptions = dropdownQuestions.map((eachQuestion) => (
    <option
      key={eachQuestion.questionId}
      value={
        eachQuestion.question.split("<em>")[0].split("(")[0].split("<span")[0]
      }
    >
      {eachQuestion.question.split("<em>")[0].split("(")[0].split("<span")[0]}
    </option>
  ));

  return (
    <section className="dropdown">
      <div className="bootcamps-container">
        <label className="bootcamp-label" htmlFor="bootcamps">
          Bootcamp:{" "}
        </label>
        <select onChange={handleBootcampChange} name="bootcamps" id="left">
          <option value="">Select Bootcamp</option>
          {bootCampOptions}
        </select>
      </div>
      <div className="courses-container">
        <label className="courses-label" htmlFor="courses">
          Course:
        </label>
        <select onChange={handleCourseChoose} name="courses" id="right">
          <option value="">Select All</option>
          {courseFilterOptions}
        </select>
      </div>
    </section>
  );
}

// isolate the arrows somehow
