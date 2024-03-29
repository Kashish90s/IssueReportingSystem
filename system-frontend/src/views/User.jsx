import React, { useEffect, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { UserStatus } from "../constant/constant";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";

export default function User() {
  const { users, setUsers } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(1);

  useEffect(() => {
    getUsers();
  }, [count]);

  const onDelete = (u) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosClient
          .get(`/user/delete/${u.id}`)
          .then(() => {
            Swal.fire("Deleted!", "Your item has been deleted.", "success");
            getUsers();
          })
          .catch(() => {
            Swal.fire("Error!", "Failed to delete the item.", "error");
          });
      }
    });
  };

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
      return { background: "#96e45d" };
    } else {
      return { background: "#f85b4a" };
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
        <Link to={"/users/new"} className="btn-add">
          Add new
        </Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Dob</th>
              <th>Created at</th>
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
                  <td>{u.created_at.split("T")[0]}</td>
                  <td>
                    <button
                      style={{
                        ...checkStatus(u.status_label),
                        cursor: "pointer",
                        display: "inline-block",
                        padding: "10px 20px", // Adjust padding as needed
                        border: "none",
                        fontSize: "15px",
                        textAlign: "center",
                        textDecoration: "none",
                        borderRadius: "4px",
                        transition: "background-color 0.2s ease-in-out",
                        color: "white",
                      }}
                      onClick={(event) => toggleStatus(u.id, event)}
                    >
                      {u.status_label}
                    </button>
                  </td>

                  <td>
                    <Link to={"/users/" + u.id} className="btn-edit">
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Link>
                      &nbsp;
                    <button
                      onClick={(ev) => onDelete(u)}
                      className="btn-delete"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        <div style={{ textAlign: "center", padding: "20px" }}>
          <span
            style={{ padding: "0.2rem 0.5rem", cursor: "pointer" }}
            className="btn-logout"
            onClick={previousPage}
          >
            {"<<"}Previous
          </span>
          <span>{count}</span>
          <span
            style={{ padding: "0.2rem 0.5rem", cursor: "pointer" }}
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
