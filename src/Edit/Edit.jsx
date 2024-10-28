import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Edit = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    id: id,
    campaignName: "",
    startDate: "",
    endDate: "",
    campaignDescription: "",
    digestCampaign: false,
    linkedKeywords: [],
    dailyDigest: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaignData = async () => {
      try {
        const res = await axios.get(
          `https://infinion-test-int-test.azurewebsites.net/api/Campaign/${id}`
        );
        const data = res.data;
        // Format dates to 'yyyy-MM-dd'
        const formattedData = {
          ...data,
          startDate: data.startDate.split("T")[0], // Get only the date part
          endDate: data.endDate.split("T")[0], // Get only the date part
        };
        setFormData(formattedData);
      } catch (err) {
        console.error("Error fetching campaign data:", err);
        alert("Failed to fetch campaign data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaignData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);

    try {
      const res = await axios.put(
        `https://infinion-test-int-test.azurewebsites.net/api/Campaign/${id}`,
        formData
      );
      console.log("Response:", res);
      alert("Updated successfully");
      navigate("/campaign");
    } catch (err) {
      console.error("Error updating campaign:", err);
      alert("Failed to update campaign.");
    }
  };

  const handleKeywordChange = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const keyword = e.target.value.trim();
      if (keyword) {
        setFormData((prevState) => ({
          ...prevState,
          linkedKeywords: [...prevState.linkedKeywords, keyword],
        }));
        e.target.value = "";
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
    console.log(`Date change: ${name} = ${value}`);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
            placeholder="e.g. The future is now"
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
            Update Campaign
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
