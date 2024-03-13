export default function ReportContainer({ report }) {
  // Create a Date object from the timestamp
  const date = new Date(report.created_at);

  // Extract the date and time
  const extractedDate = date.toISOString().split("T")[0]; // "2024-03-12"
  const extractedTime = date.toISOString().split("T")[1].split(".")[0]; // "16:05:29"

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
          <span className="upvote-button">{report.votes}</span>
        </div>
        <div className="description">@user: {report.description}</div>
        <div className="date-status">
          <span className="date">
            {extractedDate} {extractedTime}
          </span>
          <span className="status">Status: Pending</span>
        </div>
      </div>
    </div>
  );
}
