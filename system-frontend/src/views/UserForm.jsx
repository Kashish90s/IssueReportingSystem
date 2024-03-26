import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios-client";

function UserForm() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [user, setuser] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
  });

  if (id) {
    useEffect(() => {
      setLoading(true);
      axiosClient
        .get(`/user/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setuser(data);
        })
        .catch(() => {
          setLoading(false);
        });
    }, []);
  }
  return (
    <div>
      {user.id && <h1>Update User: {user.name}</h1>}
      {!user.id && <h1>New User</h1>}
      <div className="card animated fadeInDown">
        {loading && <div className="text-center">Loading...</div>}
      </div>
    </div>
  );
}

export default UserForm;
