import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { IssueType, UserType } from "../constant/constant";
import "./ReportPreview.css";
import { useStateContext } from "../context/ContextProvider";

function ReportPreview() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [userNames, setUserNames] = useState({});
  const [status, setStatus] = useState({});
  const { user } = useStateContext();

  useEffect(() => {
    setUserNames({ [user.id]: user.name });
  }, [user]);

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
          setUserNames((prevUserNames) => ({
            ...prevUserNames,
            [userId]: response.data.user.name,
          }));
          setStatus((prevUserType) => ({
            ...prevUserType,
            [userId]: response.data.user.type,
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

  const handleComment = (ev) => {
    ev.preventDefault();

    const formData = new FormData();
    formData.append("user_id", user.id);
    formData.append("report_id", id);
    formData.append("description", newComment);

    axiosClient
      .post(`/comment/add`, formData)
      .then(() => {
        setComments([
          ...comments,
          { user_id: user.id, description: newComment },
        ]);
        setNewComment("");
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
      });
  };

  return (
    <div className="card-container">
      <div className="card animated fadeInDown">
        <div className="top-area">
          <span className="user-name">{report.reports[0].user?.name} </span>
          <br />
          <span className="time">{report.reports[0].formatted_time},</span>
          &nbsp;
          <span className="street-name">
            {report.reports[0].location.street_name}
          </span>
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
        {Object.keys(userNames).length > 0 && (
          <div className="bottom-area">
            <div>{comments.length} Comments</div>
            <div class="separator">Description</div>
            <span className="report-title">{report.reports[0].title}</span>
            <div className="report-description">
              {report.reports[0].description}
            </div>
            <div class="separator">Comments</div>
            {comments.length > 0 ? (
              <div className="comments-section">
                {comments.map((comment, index) => (
                  <div key={index}>
                    <p
                      style={{
                        color:
                          UserType.find(
                            (type) => type.value === status[comment.user_id]
                          )?.label === "Admin"
                            ? "#ce3535"
                            : "inherit",
                      }}
                    >
                      <span className="commentor">
                        {userNames[comment.user_id]}
                      </span>
                      <span className="comment-description">
                        {" "}
                        {comment.description}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div>No comments</div>
            )}
          </div>
        )}

        <div className="input-container card">
          <form onSubmit={handleComment}>
            <input type="hidden" value={user.id} />
            <input type="hidden" value={id} />
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReportPreview;
