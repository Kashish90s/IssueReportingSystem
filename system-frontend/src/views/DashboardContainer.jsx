import React from "react";

export default function DashboardContainer() {
  return (
    <div>
      <div className="container">
        <div className="title">
          <span>Title</span>
        </div>
        <img
          className="image-holder"
          src="https://cdn.britannica.com/35/238335-050-2CB2EB8A/Lionel-Messi-Argentina-Netherlands-World-Cup-Qatar-2022.jpg"
          alt="Image"
        />
        <div className="description">description</div>
        <div>comments Upvote</div>
      </div>
    </div>
  );
}
