import React, { useContext } from "react";
import "../styles/filter.css";
import { FilterContext } from "./Store/FilterProvider";
export default function Filter({ options }) {
  const { handleBootcampChange, dropdownQuestions, handleCourseChoose } =
    useContext(FilterContext);

  const bootCampOptions = options.map((option) => (
    <option key={option.id} value={option.id}>
      {option.title}
    </option>
  ));
  const courseFilterOptions = dropdownQuestions.map((eachQuestion) => (
    <option
      key={eachQuestion.questionId}
      value={eachQuestion.question.split("<em>")[0].split("(")[0]}
    >
      {eachQuestion.question.split("<em>")[0].split("(")[0]}
    </option>
  ));

  return (
    <section className="filter-container">
      <div className="bootcamps-container">
        <label htmlFor="bootcamps">Bootcamp:</label>
        <select onChange={handleBootcampChange} name="bootcamps" id="bootcamps">
          {bootCampOptions}
        </select>
      </div>
      <div className="courses-container">
        <label htmlFor="courses">Course:</label>
        <select onChange={handleCourseChoose} name="courses" id="courses">
          <option value="">Select All</option>
          {courseFilterOptions}
        </select>
      </div>
    </section>
  );
}
