import React, { useContext } from "react";
import "../styles/filter.css";
import { FilterContext } from "./Store/FilterProvider";
export default function Filter({ options }) {
  const { setCurrentSurveyId, handleBootcampChange } =
    useContext(FilterContext);

  const bootCampOptions = options.map((option) => (
    <option key={option.id} value={option.id}>
      {option.title}
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
        <select name="courses" id="courses">
          <option value="">Select All</option>
          <option value="AND Founder Vision">AND Founder Vision</option>
          <option value="HBDI">HBDI</option>
          <option value="Psychological Safety">Psychological Safety</option>
          <option value="SCRUM">SCRUM</option>
        </select>
      </div>
    </section>
  );
}
