import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "./Profile.css";
import {
  faAddressCard,
  faCamera,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Profile() {
  const { user } = useStateContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(null);
  const { register, handleSubmit, reset } = useForm(); 
  const [selectedFile, setSelectedFile] = useState(null);
  const [showProfileForm, setShowProfileForm] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axiosClient.get(`/user/get/${user.id}`);
        setUpdatedUser(response.data.user);
        reset(response.data.user); 
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user.id, reset]);

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

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    try {
      const formData = new FormData();
      formData.append("image_holder", file);

      const response = await axiosClient.post(
        `/user/changeProfileImage/${user.id}`,
        formData
      );

      setUpdatedUser((prevUser) => ({
        ...prevUser,
        images: [...prevUser.images, response.data.image],
      }));

      Toast.fire({
        icon: "success",
        title: "Profile image changed successfully",
      });
    } catch (error) {
      console.error("Error changing profile image:", error);
    }
  };

  const updateUserProfile = async (userData) => {
    try {
      await axiosClient.post(`/user/update/${userData.id}`, userData);
      Toast.fire({
        icon: "success",
        title: "User details updated successfully",
      });
      navigate("/profile");
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  const changeUserPassword = async (data) => {
    try {
      await axiosClient.patch(`/user/changePassword/${user.id}`, data);
      Toast.fire({
        icon: "success",
        title: "Password changed successfully",
      });
      reset();
      navigate("/profile");
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  const handleFormSwitch = (isProfileForm) => {
    setShowProfileForm(isProfileForm);
    reset();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card panel">
      <div className="left-panel">
        <div>
          {updatedUser &&
            updatedUser.images &&
            updatedUser.images.length > 0 && (
              <img
                className="profile-image"
                src={`data:image/jpeg;base64, ${
                  updatedUser.images[updatedUser.images.length - 1]
                    .image_content
                }`}
                alt="Profile"
              />
            )}
        </div>
        <div>
          <form>
            <label className="image-label">
              <FontAwesomeIcon icon={faCamera} className="camera-icon" />
              Change Image
              <input
                type="file"
                id="image-upload"
                className="profile-image-holder"
                onChange={handleFileChange}
              />
            </label>

            <label
              className={showProfileForm ? "active" : ""}
              onClick={() => handleFormSwitch(true)}
            >
              <FontAwesomeIcon icon={faAddressCard} className="camera-icon" />
              Update Profile
            </label>
            <label
              className={!showProfileForm ? "active" : ""}
              onClick={() => handleFormSwitch(false)}
            >
              <FontAwesomeIcon icon={faKey} className="camera-icon" />
              Change Password
            </label>
          </form>
        </div>
      </div>
      <div className="right-panel">
        {showProfileForm ? (
          <div>
            <form onSubmit={handleSubmit(updateUserProfile)}>
              <label>Name</label>
              <input type="text" {...register("name")} required />
              <label>Email</label>
              <input type="text" {...register("email")} required />
              <label>Date of Birth</label>
              <input type="text" {...register("dob")} required />
              <button type="submit" className="update btn">
                Update
              </button>
            </form>
          </div>
        ) : (
          <div>
            <form onSubmit={handleSubmit(changeUserPassword)}>
              <label>Old Password</label>
              <input type="password" {...register("oldPassword")} required />
              <label>New Password</label>
              <input type="password" {...register("password")} required />
              <label>Confirm Password</label>
              <input
                type="password"
                {...register("confirmPassword")}
                required
              />
              <button type="submit" className="update btn">
                Update
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
