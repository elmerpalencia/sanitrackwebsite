// Main.jsx
import React from "react";

export default function Body() {
  return (
/*     <div className="main">
      <div className="searchbar2">
        <input type="text" placeholder="Search" />
        <div className="searchbtn">
          <img
            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180758/Untitled-design-(28).png"
            className="icn srchicn"
            alt="search-button"
          />
        </div>
      </div> */

      <div className="box-container">
        <div className="box box1">
          <div className="text">
            <h2 className="topic-heading">23</h2>
            <h2 className="topic">Washes Today</h2>
          </div>
        </div>

        <div className="box box2">
          <div className="text">
            <h2 className="topic-heading">92%</h2>
            <h2 className="topic">Compliance Rate</h2>
          </div>
        </div>

        <div className="box box3">
          <div className="text">
            <h2 className="topic-heading">320</h2>
            <h2 className="topic">Weekly Average</h2>
          </div>
        </div>

        <div className="box box4">
          <div className="text">
            <h2 className="topic-heading">12</h2>
            <h2 className="topic">Current Streak</h2>
          </div>
        </div>
      </div>
  );
};


