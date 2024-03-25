import React, { useState } from "react";
import "./Home.css";

export default function Dashboard() {
  const [pastWeekCounter, setPastWeekCounter] = useState(0);
  const [pastMonthCounter, setPastMonthCounter] = useState(0);
  const [totalCounter, setTotalCounter] = useState(0);
  return (
    <div>
      <div>
        <h1>Report, view, or discuss local problems</h1>
        <h5>(like pot holes, broken pavings slabs, or street lighting)</h5>
      </div>
      <div className="home-report">
        <div className="card" style={{ margin: "6px", width: "35rem" }}>
          <span>How to report a problem</span>
          <ol>
            <li>Enter </li>
            <li>Enter </li>
            <li>Enter </li>
            <li>Enter </li>
          </ol>
          <hr />
          <div className="display-counter">
            <span>
              {pastWeekCounter} <br />
              reports in past week
            </span>
            <span>
              {pastMonthCounter} <br />
              fixed in past month
            </span>
            <span>
              {totalCounter} <br />
              Total reports
            </span>
          </div>
        </div>
        <div className="card" style={{ margin: "6px", width: "35rem" }}>
          <span>How to report a problem</span>
          <div>
            <label>Image</label>
            <input type="file" accept="image/*" />
            <label>Title</label>
            <input type="text" placeholder="Title" />
            <label>Description</label>
            <input type="text" placeholder="Description" />
            <label>Street Name</label>
            <input type="text" placeholder="Street Name" />
            <label>Ward</label>
            <input type="text" placeholder="Ward" />
            <label>Zip Code</label>
            <input type="text" placeholder="Zip Code" />
            <label>Issue Type</label>
            <select name="Issue Type" id="issue_type">
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
