import React from "react";
import "./Overviewsub.css";
import Search from "../assets/searchimage.jfif";
import { SiSearxng } from "react-icons/si";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
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
        <img src={Search} alt="" />
      </div>
      <div className="word">
        <p>No activity yet.Create a new campaign to get started</p>
      </div>
      <div className="campaignAdd">
        <Link to="./camppaign">
          <span>
            <FaPlus />
          </span>
          <span>New Campaign</span>
        </Link>
      </div>
    </div>
  );
};

export default Overviewsub;
