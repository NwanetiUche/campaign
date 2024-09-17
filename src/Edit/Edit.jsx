import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { HiOutlineLightBulb } from "react-icons/hi"; // Import the icon
import "./Edit.css";

const Edit = () => {
  const [data, setData] = useState({
    id: "",
    campaignName: "",
    startDate: "",
    endDate: "",
    linkedKeywords: [], // Changed to an array
    dailyDigest: "yes",
    frequency: "monthly",
    campaignDescription: "", // Added for completeness
    digestCampaign: false, // Added for completeness
  });

  const { id } = useParams();
  const navigate = useNavigate(); // Use navigate for redirection

  useEffect(() => {
    if (id) {
      axios
        .get(
          `https://infinion-test-int-test.azurewebsites.net/api/Campaign/${id}`
        )
        .then((res) => {
          const responseData = res.data;

          // Format dates to yyyy-MM-dd
          const formatDate = (dateString) => dateString.split("T")[0]; // Extract date part only

          setData({
            ...responseData,
            startDate: formatDate(responseData.startDate),
            endDate: formatDate(responseData.endDate),
            linkedKeywords: responseData.linkedKeywords || [], // Ensure linkedKeywords is an array
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

  const handleDateChange = (e) => {
    handleChange(e);
  };

  const handleKeywordChange = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const keyword = e.target.value.trim();
      if (keyword) {
        setData((prevData) => ({
          ...prevData,
          linkedKeywords: [...prevData.linkedKeywords, keyword],
        }));
        e.target.value = ""; // Clear the input field
      }
    }
  };

  const removeKeyword = (index) => {
    setData((prevData) => ({
      ...prevData,
      linkedKeywords: prevData.linkedKeywords.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update the data on the server
    axios
      .put(
        `https://infinion-test-int-test.azurewebsites.net/api/Campaign/${id}`,
        data
      )
      .then(() => {
        alert("Campaign updated successfully!");
        // Redirect after successful update
        navigate(`/edit/${id}`);
      })
      .catch((err) => {
        console.log(err);
        alert("Error updating campaign. Please try again.");
      });
  };

  return (
    <div className="formContainer">
      <h2>Edit Campaign</h2>
      <form onSubmit={handleSubmit}>
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
            required
          />
          <br />
        </div>
        <div className="textareaContainer">
          <label htmlFor="campaignDescription">Campaign Description</label>
          <br />
          <textarea
            id="campaignDescription"
            name="campaignDescription"
            placeholder="Please add a description to your campaign"
            value={data.campaignDescription}
            onChange={handleChange}
          />
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
              onChange={handleDateChange}
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
              onChange={handleDateChange}
            />
          </div>
        </div>
        <div className="digest">
          <p>Want to receive daily digest about the campaign?</p>
          <HiOutlineLightBulb />
          <label className="switch">
            <input
              type="checkbox"
              checked={data.digestCampaign}
              onChange={(e) =>
                setData({ ...data, digestCampaign: e.target.checked })
              }
            />
            <span className="slider"></span>
          </label>
        </div>
        <div className="linkedkeywordsContainer">
          <label htmlFor="linkedKeywords">Linked Keywords</label>
          <br />
          <input
            className="Inputtext"
            type="text"
            id="linkedKeywords"
            placeholder="Type your keywords and press Enter"
            onKeyDown={handleKeywordChange}
          />
          <ul>
            {data.linkedKeywords.map((keyword, index) => (
              <li key={index}>
                {keyword}{" "}
                <button type="button" onClick={() => removeKeyword(index)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="selectContainer">
          <label htmlFor="frequency">
            Kindly select how often you want to receive daily digest
          </label>
          <br />
          <select
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
          <button
            type="button"
            className="Cancelbutton"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
          <button type="submit" className="Cancelcreate">
            Edit Information
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
