export default function ReportContainer({ report }) {
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
          <span className="upvote-button">button</span>
        </div>
        <div className="description">@user: Lorem</div>
        <div className="date-status">
          <span className="date">date:</span>
          <span className="status">Status:</span>
        </div>
      </div>
    </div>
  );
}
