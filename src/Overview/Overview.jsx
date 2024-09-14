import React from "react";
import "./Overview.css";
import { TbMessageReportFilled } from "react-icons/tb";
import { GoQuestion } from "react-icons/go";
import { FaPlus } from "react-icons/fa6";
import { HiSpeakerphone } from "react-icons/hi";
import { HiOutlineLightBulb } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { CiBellOn } from "react-icons/ci";
import { RiArrowDropDownLine } from "react-icons/ri";
import Overviewsub from "../OverviewSub/Overviewsub";
import { CiSearch } from "react-icons/ci";

const Overview = () => {
  return (
    <div className="overview">
      <div className="first">
        <div className="logocontainer">
          <TbMessageReportFilled className="logo" /> <h1>Scrutz</h1>
        </div>
        <div className="list">
          <ul>
            <li>
              <span>
                <FaPlus />
              </span>
              <span>New Campaign</span>
            </li>
            <li></li>
            <li>
              {" "}
              <span>
                <HiSpeakerphone />
              </span>
              <span>Overview</span>
            </li>
            <li>
              <span>
                <HiSpeakerphone />
              </span>
              <span>Campaign</span>
            </li>
            <li>
              <span>
                <HiOutlineLightBulb />
              </span>
              <span>Market Intelligence</span>
            </li>
            <li>
              <span>
                <IoSettingsOutline />
              </span>
              <span>Account Settings</span>
            </li>
          </ul>
        </div>
        <div className="help">
          <div>
            <GoQuestion />
            <h3>Need Help</h3>
            <p>We are ready available to</p>
            <p>provide help</p>
            <button>Get Help</button>
          </div>
        </div>
      </div>
      <div className="secondcontainer">
        <div className="second">
          <div className="search">
            <input type="text" placeholder="search for anything..." />
            <CiSearch className="searchicon" />
          </div>
          <div className="profiledetails">
            <CiBellOn className="bell" />

            <div>😎</div>
            <p>
              Big Tech{" "}
              <span>
                {" "}
                <RiArrowDropDownLine />
              </span>
            </p>
          </div>
        </div>
        <hr />
        <Overviewsub />
      </div>
    </div>
  );
};

export default Overview;
