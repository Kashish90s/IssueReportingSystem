import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatNumber } from "../utility/NumberFormatter";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";
import { UserType } from "../constant/constant";
import { useNavigate } from "react-router-dom";

export default function ReportContainer({ report }) {
  const { user } = useStateContext();
  const navigate = useNavigate();
  const [vote, setVote] = useState(0);
  const [voteBg, setVoteBg] = useState(false);
  const [voteColor, setVoteColor] = useState(false);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    }
  }, [user]);

  const handelColorChange = (votes) => {
    if (user && Array.isArray(votes)) {
      const userVoted = votes.some((vote) => vote === user.id.toString());
      setVoteBg(userVoted ? "#145388" : "white");
      setVoteColor(userVoted ? "white" : "#145388");
    } else {
      console.error("Invalid votes data format:", votes);
    }
  };

  const handelVote = () => {
    if (user) {
      axiosClient
        .patch(`/report/vote/${report.id}/${user.id}`)
        .then((data) => {
          if (data.data && data.data.votes && Array.isArray(data.data.votes)) {
            setVote(data.data.votes.length);
            handelColorChange(data.data.votes);
          } else {
            console.error("Invalid vote data format:", data);
          }
        })
        .catch((error) => {
          console.error("Error fetching vote count:", error);
        });
    }
  };

  const handleReport = (user_id) => {
    navigate("/ReportPreview/" + user_id);
  };
  return (
    <div>
      <div className="container">
        <div className="title">{report.title}</div>
        {report.image_content && (
          <img
            className="image-holder"
            src={`data:image/jpeg;base64, ${report.image_content}`}
            alt="Image"
            style={{
              cursor: "pointer",
            }}
            onClick={() => handleReport(report.id)}
          />
        )}
        <div className="vote">
          <span className="upvote-button">
            {user.type ===
              UserType.find((type) => type.label === "Client").value && (
              <button
                onClick={handelVote}
                className="btn"
                style={{
                  padding: "0.1rem 0.4rem",
                  borderRadius: "10%",
                  marginRight: "6px",
                  backgroundColor: voteBg,
                  color: voteColor,
                  transition: "background-color 0.5s, color 0.5s",
                }}
              >
                <FontAwesomeIcon
                  icon={faArrowUp}
                  style={{ color: voteColor }}
                  className="up-vote"
                />
                Vote
              </button>
            )}
            {user.type ===
              UserType.find((type) => type.label === "Admin").value && (
              <span>Votes </span>
            )}
            {voteLength(vote)}
          </span>
          <span
            style={{
              cursor: "pointer",
            }}
            onClick={() => handleReport(report.id)}
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
          <span className="date">{report.formatted_time}</span>
        </div>
      </div>
    </div>
  );
}
