import React, { useEffect, useState } from "react";
import axios from "axios";
import posts from "../Data/db.json";
import "./Camppaign.css";

import { FaPlus } from "react-icons/fa6";
import { HiSpeakerphone } from "react-icons/hi";
import { HiOutlineLightBulb } from "react-icons/hi";
import { Link } from "react-router-dom";
const Camppaign = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://infinion-test-int-test.azurewebsites.net/api/Campaign")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      {" "}
      <table>
        <thead>
          <tr className="heading">
            <th>S/N</th>
            <th>Campaign Name</th>
            <th>Start Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {" "}
          {data.map((d, index) => (
            <tr key={index}>
              <td>{d.id}</td>
              <td>{d.campaignName}</td>
              <td>{d.startDate}</td>
              <td>{d.campaignStatus}</td>
              <td>
                <Link to="/details">
                  <FaPlus />
                </Link>
                <HiSpeakerphone />
                <HiOutlineLightBulb />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Camppaign;
