import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Read.css";

const Read = () => {
  const [data, setData] = useState({
    id: "",
    campaignName: "",
    startDate: "",
    campaignStatus: "",
    endDate: "",
    linkedKeywords: "",
    dailyDigest: "yes",
    frequency: "monthly",
  });

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios
        .get(
          ` https://infinion-test-int-test.azurewebsites.net/api/Campaign/${id}`
        )
        .then((res) => {
          const responseData = res.data;

          // Format dates to yyyy-MM-dd
          const formatDate = (dateString) => dateString.split("T")[0]; // Extract date part only

          setData({
            ...responseData,
            startDate: formatDate(responseData.startDate),
            endDate: formatDate(responseData.endDate),
          });
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="formContainer">
      <h2>Edit Campaign Information</h2>
      <form>
        <div className="campaignnameContainer">
          <label htmlFor="campaignName">Campaign Name</label>
          <br />
          <input
            className="text"
            type="text"
            id="campaignName"
            name="campaignName"
            placeholder="e.g The future is now"
            value={data.campaignName}
            onChange={handleChange}
          />
          <br />
        </div>
        <div className="date">
          <div>
            <label htmlFor="startDate">Start Date</label>
            <br />
            <input
              className="dateinput"
              type="date"
              id="startDate"
              name="startDate"
              value={data.startDate}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="endDate">End Date</label>
            <br />
            <input
              className="dateinput"
              type="date"
              id="endDate"
              name="endDate"
              value={data.endDate}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="linkedkeywordsContainer">
          <label htmlFor="linkedKeywords">Linked Keywords</label>
          <br />
          <input
            className="Inputtext"
            type="text"
            id="linkedKeywords"
            name="linkedKeywords"
            placeholder="Type your keywords and press Enter"
            value={data.linkedKeywords}
            onChange={handleChange}
          />
        </div>
        <div className="bselectContainer">
          <label htmlFor="dailyDigest">
            Want to receive daily digest about the campaign
          </label>
          <br />
          <select
            className="bdailyDigest"
            name="dailyDigest"
            id="dailyDigest"
            value={data.dailyDigest}
            onChange={handleChange}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="bselectContainer">
          <label htmlFor="frequency">
            Kindly select how often you want to receive daily digest
          </label>
          <br />
          <select
            className="bdailyDigest"
            name="frequency"
            id="frequency"
            value={data.frequency}
            onChange={handleChange}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
        <div className="buttonContainer">
          <button type="button" className="Cancelbutton">
            Stop Campaign
          </button>
          <button type="submit" className="Cancelcreate">
            Edit Information
          </button>
        </div>
      </form>
    </div>
  );
};

export default Read;
