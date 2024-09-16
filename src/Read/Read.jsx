import React from "react";
import "./Read.css";

const Read = () => {
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
            />
          </div>
        </div>
        <div className="digest">
          <p>Want to receive daily digest about the campaign?</p>

          <label className="switch">
            <input type="checkbox" />
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
          />
        </div>
        <div className="selectContainer">
          <label htmlFor="dailyDigest">
            Kindly select how often you want to receive daily digest
          </label>
          <br />
          <select name="dailyDigest" id="dailyDigest">
            <option value="">Select </option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
        <div className="buttonContainer">
          <button type="button" className="Cancelbutton">
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

export default Read;
