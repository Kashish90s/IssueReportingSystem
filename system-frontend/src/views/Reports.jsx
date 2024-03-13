import React, { useEffect, useState } from "react";
import "./Reports.css";
import ReportContainer from "./ReportContainer";
import axiosClient from "../axios-client";

export default function Reports() {
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getReports();
  }, []);

  const getReports = () => {
    setLoading(true);
    axiosClient
      .get("/report")
      .then(({ data }) => {
        setLoading(false);
        setReport(data.report);
        console.log(data.report);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div>Sorting: Recent | Most Popular | Completed</div>
      <div className="Reports">
        {loading ? (
          <p>Loading reports...</p>
        ) : (
          report.map((reportItem) => (
            <ReportContainer
              key={reportItem.id}
              className="Reports-item"
              report={reportItem}
            />
          ))
        )}
      </div>
    </div>
  );
}
