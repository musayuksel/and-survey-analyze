import React from "react";
import "../styles/dashboard.css";
import Filter from "./Filter";
import SurveyDropdown from "./SurveyDropdown";
export default function Dashboard() {
  return (
    <div>
      <Filter />
      <SurveyDropdown date="6th June" sessionName="SCRUM" repliesCount={12} />
      <SurveyDropdown date="6th June" sessionName="AGILE" repliesCount={12} />
    </div>
  );
}
