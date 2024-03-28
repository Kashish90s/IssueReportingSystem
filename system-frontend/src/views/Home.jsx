import React, { useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";
import Swal from "sweetalert2";
import "./Home.css";

export default function Home() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [streetName, setStreetName] = useState("");
  const [ward, setWard] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [issueType, setIssueType] = useState(1);
  const { user } = useStateContext();

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image_holder", image);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("street_name", streetName);
      formData.append("ward", ward);
      formData.append("zip_code", zipCode);
      formData.append("issue_type", issueType);
      formData.append("user_id", user.id);

      await axiosClient.post("/report/add", formData);

      setImage(null);
      setTitle("");
      setDescription("");
      setStreetName("");
      setWard("");
      setZipCode("");
      setIssueType(1);

      Toast.fire({
        icon: "success",
        title: "Report submitted successfully",
      });
    } catch (error) {
      console.error("Error submitting report:", error);

      Toast.fire({
        icon: "error",
        title: "Error submitting report",
      });
    }
  };

  return (
    <div>
      <p className="main-head">Report, view, or discuss local problems</p>
      <p className="sub-head">
        (like pot holes, broken pavings slabs, or street lighting)
      </p>

      <div className="home-report">
        <div
          className="home-guide card animated fadeInDown"
          style={{ width: "80%" }}
        >
          <span>How to report a problem</span>
          <ol
            style={{ "--length": 4, listStyle: "none", paddingLeft: 0 }}
            role="list"
          >
            <li style={{ "--i": 1 }}>
              <h3>Step 1</h3>
              <p>In home page, scroll down</p>
            </li>
            <li style={{ "--i": 2 }}>
              <h3>Step 2</h3>
              <p>Upload/Click picture of the incident</p>
            </li>

            <li style={{ "--i": 3 }}>
              <h3>Step 3</h3>
              <p>Fill in the details of the incident</p>
            </li>
            <li style={{ "--i": 4 }}>
              <h3>Step 4</h3>
              <p>Sumbit your report</p>
            </li>
          </ol>
        </div>
        <div
          className="card animated fadeInDown"
          style={{
            maxWidth: "40rem",
            padding: "2rem 5rem",
            borderRadius: "5%",
          }}
        >
          <form onSubmit={handleSubmit} style={{ alignItems: "center" }}>
            <label>Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <label>Title</label>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label>Street Name</label>
            <input
              type="text"
              placeholder="Street Name"
              value={streetName}
              onChange={(e) => setStreetName(e.target.value)}
            />
            <label>Ward</label>
            <input
              type="text"
              placeholder="Ward"
              value={ward}
              onChange={(e) => setWard(e.target.value)}
            />
            <label>Zip Code</label>
            <input
              type="text"
              placeholder="Zip Code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
            {/* <label>Issue Type</label>
            <select
              name="Issue Type"
              id="issue_type"
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
            <br /> */}
            <label>Description</label>
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="10"
              laceholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <br />
            <button
              type="submit"
              className="btn"
              style={{
                borderRadius: "10%",
                padding: "10px",
                marginTop: "30px",
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
