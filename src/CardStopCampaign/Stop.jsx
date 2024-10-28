import React from "react";
import "./Stop.css";
const Stop = () => {
  return (
    <div className="box">
      <div className="secondbox">
        <div>
          <h2>Stop Campaign</h2>
          <div>
            <p>Are you sure you want to delete,MTN campaign?</p>
            <p>This action cannot be undone</p>
          </div>
        </div>
        <button>Cancel</button>
        <button>Delete Campaign</button>
      </div>
    </div>
  );
};

export default Stop;
