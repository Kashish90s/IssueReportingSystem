import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";

function UserForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [user, setUser] = useState({
    // Corrected typo (setUser)
    id: null,
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setLoading(true);
        try {
          const response = await axiosClient.get(`/user/${id}`);
          setUser(response.data.user); // Corrected potential typo (setUser)
        } catch (error) {
          console.error(error); // Handle errors more gracefully
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData(); // Call the function within useEffect
  }, [id]); // Dependency array to trigger on id change

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (user.id) {
      axiosClient
        .post(`/user/update/${user.id}`, user)
        .then(() => {
          navigate("/users");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  };

  return (
    <div>
      {user.id && <h1>Update User: {user.name}</h1>}
      {!user.id && <h1>New User</h1>}
      <div className="card animated fadeInDown">
        {loading && <div className="text-center">Loading...</div>}
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        {!loading && (
          <form onSubmit={onSubmit}>
            <input
              value={user.name}
              onChange={(ev) => setUser({ ...user, name: ev.target.value })}
              placeholder="Name"
            />
            <input
              value={user.email}
              onChange={(ev) => setUser({ ...user, email: ev.target.value })}
              placeholder="Email"
            />
            <input
              value={user.dob}
              onChange={(ev) => setUser({ ...user, dob: ev.target.value })}
              placeholder="DOB"
            />
            <input
              onChange={(ev) => setUser({ ...user, password: ev.target.value })}
              placeholder="Password"
            />
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default UserForm;
