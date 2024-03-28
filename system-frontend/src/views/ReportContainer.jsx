import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatNumber } from "../utility/NumberFormatter";
import { faArrowUp, faHeart } from "@fortawesome/free-solid-svg-icons";

export default function ReportContainer({ report }) {
  const date = new Date(report.created_at);

  const extractedDate = date.toISOString().split("T")[0];
  const extractedTime = date.toISOString().split("T")[1].split(".")[0];
  return (
    <div>
      <div className="container">
        <div className="title">{report.title}</div>
        <img
          className="image-holder"
          src={`data:image/jpeg;base64, ${report.image_content}`}
          alt="Image"
        />
        <div className="vote">
          <span className="upvote-button">
            <button
              class="btn"
              style={{
                padding: "0.1rem 0.4rem",
                borderRadius: "20%",
                marginRight: "3px",
              }}
            >
              <FontAwesomeIcon icon={faArrowUp} />
            </button>
            {formatNumber(report.votes)}
          </span>
          <span
            style={{
              cursor: "pointer",
            }}
          >
            Comment
          </span>
          <span
            style={{
              cursor: "pointer",
            }}
          >
            Share
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
