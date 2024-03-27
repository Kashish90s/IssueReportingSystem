import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatNumber } from "../utility/NumberFormatter";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

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
          <span>comments</span>
          <span className="upvote-button">
            <FontAwesomeIcon icon={faHeart} className="like" />
            {formatNumber(report.votes)}
          </span>
        </div>
        <div className="description">
          @{report.user?.name}: {report.description}
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
