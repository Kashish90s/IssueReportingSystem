import React, { useState } from "react";
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import "./Profile.css";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

function Profile() {
  const { user } = useStateContext();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: user,
  });

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
  const onSubmit = (user) => {
    axiosClient
      .post(`/user/update/${user.id}`, user)
      .then(() => {
        navigate("/profile");
        Toast.fire({
          icon: "success",
          title: "User has been Updated",
        });
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  return (
    <div className="card panel">
      <div className="left-panel">
        <div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEBqYEUHs9SPync2bo8AmdYjzW5WYicOWF8lreCXnMcQ&s"
            alt=""
          />
        </div>
        <div>
          <p>Profile</p>
          <p>Update Profile</p>
          <p>Change Password</p>
        </div>
      </div>
      <div className="right-panel">
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Name</label>
            <input type="text" {...register("name")} />
            <label>Email</label>
            <input type="text" {...register("email")} />
            <label>Date of Birth</label>
            <input type="text" {...register("dob")} />
            <button className="update btn">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
