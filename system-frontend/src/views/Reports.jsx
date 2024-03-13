import React, { useEffect, useState } from "react";
import "./Reports.css";
import ReportContainer from "./ReportContainer";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";
import { IssueType } from "../constant/constant";

export default function Reports() {
  const { report, setReport } = useStateContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!report || report.length === 0) {
      getReports();
    }
  }, [report]);

  const getReports = () => {
    setLoading(true);
    axiosClient
      .get("/report")
      .then(({ data }) => {
        // Map the issue_status to the corresponding label
        const reports = data.report.map((item) => ({
          ...item,
          issue_label:
            IssueType.find((type) => type.value === item.issue_status)?.label ||
            "Unknown",
        }));
        setLoading(false);
        setReport(reports);
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
          report &&
          report.map((item) => (
            <ReportContainer
              key={item.id}
              className="Reports-item"
              report={item}
            />
          ))
        )}
      </div>
    </div>
  );
}
