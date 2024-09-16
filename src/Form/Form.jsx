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
    digestCampaign: false, // Toggle for digestCampaign
    linkedKeywords: [], // Array to hold keywords
    dailyDigest: "", // Ensure this matches expected values
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData); // Debugging line to check form data

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
        // Optionally handle error feedback for the user
      });
  };

  const handleKeywordChange = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      setFormData((prevState) => ({
        ...prevState,
        linkedKeywords: [...prevState.linkedKeywords, e.target.value.trim()],
      }));
      e.target.value = ""; // Clear input after adding keyword
    }
  };

  const removeKeyword = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      linkedKeywords: prevState.linkedKeywords.filter((_, i) => i !== index),
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
              onChange={(e) =>
                setFormData({ ...formData, startDate: e.target.value })
              }
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
              onChange={(e) =>
                setFormData({ ...formData, endDate: e.target.value })
              }
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
