import "./Reports.css";
import ReportContainer from "./ReportContainer";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";
import { IssueType } from "../constant/constant";
import { useEffect, useState } from "react";

export default function Reports() {
  const { report, loading, setLoading, setReport } = useStateContext();
  const [count, setCount] = useState(1);

  useEffect(() => {
    getReports();
  }, [count]);

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
    axiosClient
      .get(`/report?page=${count}`)
      .then(({ data }) => {
        const reports = data.reports.map((item) => ({
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <h1>Reports</h1>
        <div>
          Filter: <span className="btn-filter ">Recent</span> |{" "}
          <span className="btn-filter ">Most Popular</span> |
          <span className="btn-filter ">Completed</span>
        </div>
      </div>
      <div className="Reports animated fadeInDown">
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
