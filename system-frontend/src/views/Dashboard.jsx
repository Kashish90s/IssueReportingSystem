import React from "react";
import "./Dashboard.css";
import DashboardContainer from "./DashboardContainer";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <DashboardContainer className=" dashboard-item" />
      <DashboardContainer className=" dashboard-item" />
      <DashboardContainer className=" dashboard-item" />
      <DashboardContainer className=" dashboard-item" />
      <DashboardContainer className=" dashboard-item" />
    </div>
  );
}
