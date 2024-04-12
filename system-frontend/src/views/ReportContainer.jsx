import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatNumber } from "../utility/NumberFormatter";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";

export default function ReportContainer({ report }) {
  const { user } = useStateContext();
  const [vote, setVote] = useState(0);
  const [voteBg, setVoteBg] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  const date = new Date(report.created_at);
  const extractedDate = date.toISOString().split("T")[0];
  const extractedTime = date.toISOString().split("T")[1].split(".")[0];

  const voteLength = (val) => {
    return formatNumber(val);
  };

  useEffect(() => {
    if (report.votes !== null) {
      setVote(report.votes.length);
      handelColorChange(report.votes);
    }
  }, [report.votes]);

  useEffect(() => {
    if (user) {
      setLoading(false); // Set loading to false when user is available
    }
  }, [user]);

  const handelColorChange = (votes) => {
    if (user) {
      const userVoted = votes.some((vote) => vote === user.id.toString());
      setVoteBg(userVoted ? "red" : "");
    }
  };

  const handelVote = () => {
    if (user) {
      axiosClient
        .patch(`/report/vote/${report.id}/${user.id}`)
        .then((data) => {
          setVote(data.data.votes.length);
          handelColorChange(data.data.votes);
        })
        .catch((error) => {
          console.error("Error fetching vote count:", error);
        });
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Render loading state
  }

  return (
    <div>
      <div className="container">
        <div className="title">{report.title}</div>
        {report.image_content && (
          <img
            className="image-holder"
            src={`data:image/jpeg;base64, ${report.image_content}`}
            alt="Image"
          />
        )}
        <div className="vote">
          <span className="upvote-button">
            <button
              onClick={handelVote}
              className="btn"
              style={{
                padding: "0.1rem 0.4rem",
                borderRadius: "10%",
                marginRight: "6px",
                backgroundColor: voteBg,
              }}
            >
              <FontAwesomeIcon icon={faArrowUp} />
              Vote
            </button>
            {voteLength(vote)}
          </span>
          <span
            style={{
              cursor: "pointer",
            }}
          >
            Comment
          </span>
        </div>
        <div className="report-detail">
          <span className="report-user-name">@{report.user?.name} </span>
          <span className="description">{report.description}</span>
        </div>
        <div className="date-status">
          <span className="status">{report.issue_label}</span>
          <span className="date">
            {extractedDate} {extractedTime}
          </span>
        </div>
      </div>
    </div>
  );
}
