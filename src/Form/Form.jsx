import React, { useState } from "react";
import { HiOutlineLightBulb } from "react-icons/hi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./form.css";

const Form = () => {
  const [formData, setFormData] = useState({
    campaignName: "",
    startDate: "",
    endDate: "",
    campaignDescription: "",
    digestCampaign: false,
    linkedKeywords: [],
    dailyDigest: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData); // Debugging line

    axios
      .post(
        "https://infinion-test-int-test.azurewebsites.net/api/Campaign",
        formData
      )
      .then((res) => {
        console.log("Response:", res);
        navigate("/camppaign");
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };

  const handleKeywordChange = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      if (e.target.value.trim()) {
        setFormData((prevState) => ({
          ...prevState,
          linkedKeywords: [...prevState.linkedKeywords, e.target.value.trim()],
        }));
        e.target.value = ""; // Clear input after adding keyword
      }
    }
  };

  const removeKeyword = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      linkedKeywords: prevState.linkedKeywords.filter((_, i) => i !== index),
    }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    console.log(`Date change: ${name} = ${value}`); // Debugging line
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="formContainer">
      <h2>Create New Campaign</h2>
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
            value={formData.campaignName}
            onChange={(e) =>
              setFormData({ ...formData, campaignName: e.target.value })
            }
            required
          />
          <br />
        </div>
        <div className="textareaContainer">
          <label htmlFor="campaignDescription">Campaign Description</label>
          <br />
          <textarea
            id="campaignDescription"
            placeholder="Please add a description to your campaign"
            value={formData.campaignDescription}
            onChange={(e) =>
              setFormData({
                ...formData,
                campaignDescription: e.target.value,
              })
            }
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
              value={formData.startDate}
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
              value={formData.endDate}
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
              checked={formData.digestCampaign}
              onChange={(e) =>
                setFormData({ ...formData, digestCampaign: e.target.checked })
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
            name="linkedKeywords"
            placeholder="Type your keywords and press Enter"
            onKeyDown={handleKeywordChange}
          />
          <ul>
            {formData.linkedKeywords.map((keyword, index) => (
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
          <label htmlFor="dailyDigest">
            Kindly select how often you want to receive daily digest
          </label>
          <br />
          <select
            name="dailyDigest"
            id="dailyDigest"
            value={formData.dailyDigest}
            onChange={(e) =>
              setFormData({ ...formData, dailyDigest: e.target.value })
            }
          >
            <option value="">Select Frequency</option>
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
            Create Campaign
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
