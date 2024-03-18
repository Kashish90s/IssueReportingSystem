import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { IssueType } from "../constant/constant.jsx";

export default function DefaultLayout() {
  const { user, token, setUser, setToken, report, setReport, setLoading } =
    useStateContext();

  useEffect(() => {
    axiosClient.get("/user").then(({ data }) => {
      setUser(data);
    });
    if (!report || report.length === 0) {
      getReports();
    }
  }, []);

  const getReports = () => {
    setLoading(true);
    axiosClient
      .get("/report")
      .then(({ data }) => {
        // Map the issue_status to the corresponding label
        const reports = data.report.map((item) => ({
          ...item,
          issue_label:
            IssueType.find((type) => type.value === item.issue_status)?.label ||
            "Unknown",
        }));
        setLoading(false);
        setReport(reports);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  if (!token) {
    return <Navigate to="/login" />;
  }

  const onLogout = (ev) => {
    ev.preventDefault();

    axiosClient.post("/logout").then(() => {
      setUser({});
      setToken(null);
    });
  };

  return (
    <div id="defaultLayout">
      <aside>
        <div className="profile">
          <div className="profile-picture">
            <FontAwesomeIcon icon={faUser} className="logo" />
            {/* <img
              src="https://cdn.britannica.com/35/238335-050-2CB2EB8A/Lionel-Messi-Argentina-Netherlands-World-Cup-Qatar-2022.jpg"
              alt="User profile"
              className="image"
            /> */}
          </div>
          <div className="user-name">{user.name} &nbsp; &nbsp;</div>
        </div>
        <Link to="/Home">Home</Link>
        <Link to="/Reports">Reports</Link>
        <Link to="/users">Users</Link>
      </aside>
      <div className="content">
        <header>
          <div className="company">Hamro Neighborhood</div>
          <div>
            <a onClick={onLogout} className="btn-logout" href="#">
              Logout
            </a>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
