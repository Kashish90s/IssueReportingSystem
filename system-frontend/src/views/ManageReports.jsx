import React, { useState, useEffect } from "react";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";
import { IssueType } from "../constant/constant";
import {
  faChevronRight,
  faChevronDown,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import "./ManageReport.css";

export default function ManageReports() {
  const { users, setUsers } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(1);
  const [expandedRow, setExpandedRow] = useState(null);

  useEffect(() => {
    getUsers();
  }, [count]); // Fetch data when component mounts and whenever count changes

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
          .get(`/report/delete/${u.id}`)
          .then(() => {
            Swal.fire("Deleted!", "Your item has been deleted.", "success");
            getUsers(); // Refresh data after deletion
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
      .get(`/report/?page=${count}`)
      .then(({ data }) => {
        setLoading(false);
        const newUsers = data.reports.map((item) => ({
          ...item,
          status_label:
            IssueType.find((type) => type.value === item.issue_status)?.label ||
            "Unknown",
        }));
        setUsers(newUsers);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching data:", error);
      });
  };

  const toggleStatus = (id, event) => {
    event.preventDefault();
    axiosClient.patch(`/report/toggleIssueStatus/${id}`).then(() => {
      getUsers(); // Refresh data after status toggle
    });
  };

  const toggleExpand = (id, event) => {
    // Prevent row expansion when the fontawesome icon is clicked
    if (event.target.tagName === "svg") {
      event.stopPropagation();
      setExpandedRow((prevRow) => (prevRow === id ? null : id));
    }
  };

  const openImage = (u) => {
    Swal.fire({
      title: u.title,
      text: u.location.street_name,
      imageUrl: `data:image/jpeg;base64, ${u.image_content}`,
      imageAlt: "Custom image",
      didRender: () => {
        const img = document.querySelector(".swal2-image");
        img.style.maxWidth = "450px";
        img.style.maxHeight = "300px";
      },
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
        <h1>Manage Reports</h1>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th className="th-arrow"></th>
              <th>ID</th>
              <th>Title</th>
              <th>Location</th>
              <th>Created at</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <React.Fragment key={u.id}>
                  <tr onClick={() => toggleExpand(u.id)}>
                    <td>
                      <FontAwesomeIcon
                        icon={
                          expandedRow === u.id ? faChevronDown : faChevronRight
                        }
                        onClick={(event) => toggleExpand(u.id, event)}
                        className="td-icon"
                      />
                    </td>
                    <td>{u.id}</td>
                    <td>{u.title}</td>
                    <td>{u.location && u.location.ward}</td>
                    <td>{u.created_at.split("T")[0]}</td>
                    <td>
                      <button
                        style={{
                          background:
                            u.status_label === "Done" ? "#96e45d" : "#f85b4a",
                          cursor: "pointer",
                          display: "inline-block",
                          padding: "10px 20px",
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
                      <button
                        onClick={(ev) => onDelete(u)}
                        className="btn-delete"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                  {expandedRow === u.id && (
                    <tr>
                      <td colSpan="6">
                        <div className="extend">
                          <div>
                            <img
                              className="extended-image"
                              src={`data:image/jpeg;base64, ${u.image_content}`}
                              alt="Image"
                              onClick={() => openImage(u)}
                            />
                          </div>
                          <div>
                            <p>
                              <strong>Location Zip:</strong>
                              <br /> {u.location && u.location.zip_code}
                            </p>
                            <p>
                              <strong>Location Street:</strong>
                              <br /> {u.location && u.location.street_name}
                            </p>
                            <p className="report-description">
                              <strong>Description:</strong> <br />{" "}
                              {u.description}
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
