import React, { useEffect, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { UserStatus } from "../constant/constant";

export default function User() {
  const { users, setUsers } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(1);

  useEffect(() => {
    getUsers();
  }, [count]);

  const getUsers = () => {
    setLoading(true);
    axiosClient
      .get(`/users?page=${count}`)
      .then(({ data }) => {
        setLoading(false);
        const newUsers = data.user.data.map((item) => ({
          ...item,
          status_label:
            UserStatus.find((type) => type.value === item.status)?.label ||
            "Unknown",
        }));
        setUsers(newUsers);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const previousPage = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const nextPage = () => {
    setCount(count + 1);
  };

  const checkStatus = (status) => {
    if (status === "Active") {
      return { color: "lime", textShadow: "0 1px black" };
    } else {
      return { color: "salmon", textShadow: "0 1px black" };
    }
  };

  const toggleStatus = (id, event) => {
    event.preventDefault();
    axiosClient.post(`/user/toggleStatus/${id}`).then(() => {
      getUsers();
    });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Users</h1>
        <Link className="btn-add">Add new</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Dob</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          {loading && (
            <tbody>
              <tr>
                <td colSpan="6" className="text-center">
                  Loading...
                </td>
              </tr>
            </tbody>
          )}
          {!loading && (
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.dob}</td>
                  <td
                    style={{
                      ...checkStatus(u.status_label),
                      cursor: "pointer",
                    }}
                    onClick={(event) => toggleStatus(u.id, event)}
                  >
                    {u.status_label}
                  </td>

                  <td>
                    <Link className="btn-edit">Edit</Link>  &nbsp;
                    <button className="btn-delete">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        <div style={{ textAlign: "center", padding: "20px" }}>
          <span
            style={{ padding: "0.2rem 0.5rem" }}
            className="btn-logout"
            onClick={previousPage}
          >
            {"<<"}Previous
          </span>{" "}
          <span
            style={{ padding: "0.2rem 0.5rem" }}
            className="btn-logout"
            onClick={nextPage}
          >
            Next Page{">>"}
          </span>
        </div>
      </div>
    </div>
  );
}
