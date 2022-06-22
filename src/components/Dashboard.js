import React, { useContext } from "react";
import "../styles/dashboard.css";
import Filter from "./Filter";
import { dummyData } from "../utils/surveys";
import SurveyDropdown from "./SurveyDropdown";
import { FilterContext } from "./Store/FilterProvider";
export default function Dashboard() {
  const { bootcamp, setBootcamp, getAllDataFromApi } =
    useContext(FilterContext);
  getAllDataFromApi();

  return (
    <main className="dashboard-container">
      <aside className="aside-filter-container">
        <Filter options={bootcamp} />
      </aside>
      <ul className="survey-dropdown-container">
        <SurveyDropdown date="6th June" sessionName="SCRUM" repliesCount={12} />
        {/* <SurveyDropdown date="6th June" sessionName="AGILE" repliesCount={12} /> */}
      </ul>
    </main>
  );
}
