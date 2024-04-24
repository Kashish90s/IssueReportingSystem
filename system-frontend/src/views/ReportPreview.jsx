import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { IssueType } from "../constant/constant";
import "./ReportPreview.css";
import { useStateContext } from "../context/ContextProvider";

function ReportPreview() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [userNames, setUserNames] = useState({});
  const { user } = useStateContext();

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
        setComments(formattedReport.reports[0].comments);
        fetchUserNames(formattedReport.reports[0].comments);
      })
      .catch((error) => {
        console.error("Error fetching report:", error);
        setLoading(false);
      });
  };

  const fetchUserNames = (comments) => {
    comments.forEach((comment) => {
      const userId = comment.user_id;
      axiosClient
        .get(`/user/get/${userId}`)
        .then((response) => {
          // console.log(response.data.user.name);
          setUserNames((prevUserNames) => ({
            ...prevUserNames,
            [userId]: response.data.user.name,
          }));
        })
        .catch((error) => {
          console.error(
            `Error fetching user name for user ID ${userId}:`,
            error
          );
        });
    });
  };

  if (!report) {
    return null;
  }

  return (
    <div className="card-container">
      <div className="card animated fadeInDown">
        <div className="top-area">
          @{report.reports[0].user?.name}
          <br />
          {report.reports[0].formatted_time} <br />
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
          <div>{Object.keys(userNames).length} Comments</div>
          <hr />
          <div>{report.reports[0].description}</div>
          <div>{report.reports[0].location.street_name}</div>
          <div>
            Ward: {report.reports[0].location.ward} Zip code:{" "}
            {report.reports[0].location.zip_code}
          </div>
          <hr />
          <div className="comments-section">
            {comments.map((comment, index) => (
              <div key={index}>
                <p>
                  {userNames[comment.user_id]}: {comment.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="input-container card">
          <form onSubmit={handleComment(event)}>
            <input type="hidden" value={user.id} />
            <input type="hidden" value={id} />
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button type="button">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReportPreview;
