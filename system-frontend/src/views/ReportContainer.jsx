import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatNumber } from "../utility/NumberFormatter";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function ReportContainer({ report }) {
  // Create a Date object from the timestamp
  const date = new Date(report.created_at);

  // Extract the date and time
  const extractedDate = date.toISOString().split("T")[0]; // "2024-03-12"
  const extractedTime = date.toISOString().split("T")[1].split(".")[0]; // "16:05:29"
  // console.log(report.user.name);

  return (
    <div>
      <div className="container">
        <div className="title">{report.title}</div>
        <img
          className="image-holder"
          src="https://cdn.britannica.com/35/238335-050-2CB2EB8A/Lionel-Messi-Argentina-Netherlands-World-Cup-Qatar-2022.jpg"
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
