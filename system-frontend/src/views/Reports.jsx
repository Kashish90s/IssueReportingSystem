import "./Reports.css";
import ReportContainer from "./ReportContainer";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";
import { IssueType } from "../constant/constant";
import { useEffect, useState } from "react";

export default function Reports() {
  const { report, loading, setLoading, setReport } = useStateContext();
  const [count, setCount] = useState(1);
  const [activeFilter, setActiveFilter] = useState("recent");

  useEffect(() => {
    getReports();
  }, [count, activeFilter]);

  const previousPage = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const nextPage = () => {
    setCount(count + 1);
  };

  const getReports = () => {
    setLoading(true);
    let apiUrl;

    if (activeFilter === "recent") {
      apiUrl = "/report?page=" + count;
    } else if (activeFilter === "completed") {
      apiUrl = "/report/completed?page=" + count;
    } else if (activeFilter === "popular") {
      apiUrl = "/report/popular?page=" + count;
    }

    if (apiUrl) {
      axiosClient
        .get(apiUrl)
        .then(({ data }) => {
          const reports = data.reports.map((item) => ({
            ...item,
            issue_label:
              IssueType.find((type) => type.value === item.issue_status)
                ?.label || "Unknown",
            votes: JSON.parse(item.votes), // Parse votes from string to array
          }));
          setLoading(false);
          setReport(reports);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setCount(1);
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          margin: "5px",
        }}
      >
        <h1>Reports</h1>
        <div>
          Filter:
          <span
            className={`btn-filter ${
              activeFilter === "recent" ? "active" : ""
            }`}
            onClick={() => handleFilterChange("recent")}
          >
            Recent
          </span>{" "}
          |
          <span
            className={`btn-filter ${
              activeFilter === "popular" ? "active" : ""
            }`}
            onClick={() => handleFilterChange("popular")}
          >
            Most Popular
          </span>{" "}
          |
          <span
            className={`btn-filter ${
              activeFilter === "completed" ? "active" : ""
            }`}
            onClick={() => handleFilterChange("completed")}
          >
            Completed
          </span>
        </div>
      </div>
      <div
        className="reports animated fadeInDown"
        style={{ overflowY: "scroll", height: "600px" }}
      >
        {loading ? (
          <table>
            <tbody>
              <tr>
                <td className="text-center">Loading...</td>
              </tr>
            </tbody>
          </table>
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
      <div style={{ textAlign: "center", padding: "20px" }}>
        <span
          style={{ padding: "0.2rem 0.5rem", cursor: "pointer" }}
          className="btn-logout"
          onClick={previousPage}
        >
          {"<<"}Previous
        </span>
        <span>{count}</span>
        <span
          style={{ padding: "0.2rem 0.5rem", cursor: "pointer" }}
          className="btn-logout"
          onClick={nextPage}
        >
          Next Page{">>"}
        </span>
      </div>
    </div>
  );
}
