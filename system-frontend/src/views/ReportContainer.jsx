import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatNumber } from "../utility/NumberFormatter";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";
import { UserType } from "../constant/constant";

export default function ReportContainer({ report }) {
  const { user } = useStateContext();
  const [vote, setVote] = useState(0);
  const [voteBg, setVoteBg] = useState(false);
  const [voteColor, setVoteColor] = useState(false);
  const [loading, setLoading] = useState(true);

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
