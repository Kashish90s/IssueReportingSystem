import React, { useEffect } from "react";
import "./Reports.css";
import ReportContainer from "./ReportContainer";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";

export default function Reports() {
  const { report, setReport } = useStateContext();
  const [loading, setLoading] = React.useState(false);

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
        setLoading(false);
        setReport(data.report);
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
          report.map(
            (
              reportItem // Ensure report is not null before mapping
            ) => (
              <ReportContainer
                key={reportItem.id}
                className="Reports-item"
                report={reportItem}
              />
            )
          )
        )}
      </div>
    </div>
  );
}
