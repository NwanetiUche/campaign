import React from "react";
import "./Overviewsub.css";
import { SiSearxng } from "react-icons/si";
import { FaPlus } from "react-icons/fa6";
const Overviewsub = () => {
  const now = new Date();

  // Get the current date and year
  const currentDate = now.toDateString();

  return (
    <div className="OverviewsubsContainer">
      <div className="Overviewsubs">
        <div>Overview</div>
        <div>{currentDate}</div>
      </div>
      <div className="AddSearch">
        <SiSearxng className="AddSearchIcon" />
      </div>
      <div className="word">
        <p>No activity yet.Create a new campaign to get started</p>
      </div>
      <div className="campaignAdd">
        <span>
          <FaPlus />
        </span>
        <span>New Campaign</span>
      </div>
    </div>
  );
};

export default Overviewsub;
