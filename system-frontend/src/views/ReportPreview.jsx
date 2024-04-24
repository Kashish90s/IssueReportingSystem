import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { IssueType } from "../constant/constant";
import "./ReportPreview.css";

function ReportPreview() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    getReports();
  }, []);

  const getReports = () => {
    setLoading(true);

    axiosClient
      .get(`/report/${id}`)
      .then(({ data }) => {
        const votes = data.votes ? JSON.parse(data.votes) : [];
        const formattedReport = {
          ...data,
          issue_label:
            IssueType.find((type) => type.value === data.issue_status)?.label ||
            "Unknown",
          votes: votes,
        };
        setLoading(false);
        setReport(formattedReport);
      })
      .catch((error) => {
        console.error("Error fetching report:", error);
        setLoading(false);
      });
  };

  if (!report) {
    return null;
  }

  const handleComment = () => {
    console.log("submitted");
  };
  console.log(report);
  return (
    <div className="card-container">
      <div className="card animated fadeInDown">
        <div className="top-area">
          @{report.reports[0].user?.name}
          <br></br>
          reported this issue {report.reports[0].formatted_time} <br></br>
          {report.reports[0].title}
        </div>
        <div className="image-content">
          {report.reports[0].image_content && (
            <img
              className="image-holder"
              src={`data:image/jpeg;base64, ${report.reports[0].image_content}`}
              alt="Image"
            />
          )}
        </div>
        <div className="bottom-area">
          <div>Total comments</div>
          <div>{report.reports[0].description}</div>
          <div>
            Ward: {report.reports[0].location.ward} Zip code:{" "}
            {report.reports[0].location.zip_code}
          </div>
          <div>{report.reports[0].location.street_name}</div>
          <div className="comments-section">
            <div className="comment">
              <div className="comment-avatar">
                {/* Avatar of the commenter */}
              </div>
              <div className="comment-content">{/* Comment content */}</div>
            </div>
            {/* More comments can be added here */}
          </div>
        </div>
        <div className="input-container card">
          <input type="text" placeholder="Add a comment..." />
          <button type="submit">Comment</button>
        </div>
      </div>
    </div>
  );
}

export default ReportPreview;
