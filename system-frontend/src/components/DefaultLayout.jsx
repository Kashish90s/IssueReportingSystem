import { NavLink, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFlag,
  faHouse,
  faUser,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";

export default function DefaultLayout() {
  const { user, token, setUser, setToken } = useStateContext();

  useEffect(() => {
    axiosClient.get("/user").then(({ data }) => {
      setUser(data);
    });
  }, []);

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
              src=""
              alt="User profile"
              className="image"
            /> */}
          </div>
          <div className="user-name">{user.name} &nbsp; &nbsp;</div>
        </div>
        <NavLink to="/Home">
          <FontAwesomeIcon icon={faHouse} className="icon" />
          <span>Home</span>
        </NavLink>
        <NavLink to="/Profile">
          <FontAwesomeIcon icon={faUser} className="icon" />
          <span>Profile</span>
        </NavLink>
        <NavLink to="/Reports">
          <FontAwesomeIcon icon={faFlag} className="icon" />
          <span>Reports</span>
        </NavLink>

        <NavLink to="/Users">
          <FontAwesomeIcon icon={faUserGroup} className="icon" />
          <span>Users</span>
        </NavLink>
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
