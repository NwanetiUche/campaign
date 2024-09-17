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
import { GrOverview } from "react-icons/gr";
import Overviewsub from "../OverviewSub/Overviewsub";
import { CiSearch } from "react-icons/ci";
import Camppaign from "../Campaign/Camppaign";
import Form from "../Form/Form";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Read from "../Read/Read";
import Edit from "../Edit/Edit";

const Overview = () => {
  return (
    <BrowserRouter>
      <div className="overview">
        <div className="first">
          <div className="logocontainer">
            <TbMessageReportFilled className="logo" /> <h1>Scrutz</h1>
          </div>
          <div className="list">
            <ul>
              <Link style={{ textDecoration: "none" }} to="/newcampaign">
                <li className="liActive">
                  <span>
                    <FaPlus />
                  </span>
                  <span className="none">New Campaign</span>
                </li>
              </Link>
              <li></li>
              <Link style={{ textDecoration: "none" }} to="/">
                {" "}
                <li className="liWhite">
                  {" "}
                  <span>
                    <GrOverview />
                  </span>
                  <span>Overview</span>
                </li>
              </Link>
              <Link style={{ textDecoration: "none" }} to="/camppaign">
                {" "}
                <li>
                  <span>
                    <HiSpeakerphone />
                  </span>
                  <span>Campaign</span>
                </li>
              </Link>
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
              <button className="getHelp">Get Help</button>
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

          <Routes>
            <Route path="/" element={<Overviewsub />} />
            <Route path="/newcampaign" element={<Form />} />
            <Route path="/camppaign" element={<Camppaign />} />
            <Route path="/details/:id" element={<Read />} />
            <Route path="/edit/:id" element={<Edit />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default Overview;
