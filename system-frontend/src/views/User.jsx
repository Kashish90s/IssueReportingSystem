import React from "react";
import { useStateContext } from "../context/ContextProvider";
import { Link } from "react-router-dom";

export default function User() {
  const { users, loading } = useStateContext();

  console.log(users);

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
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.dob}</td>
                <td>{u.status}</td>
                <td>
                  <Link className="btn-edit">Edit</Link>
                  &nbsp;
                  <button className="btn-delete">Flag</button>
                  &nbsp;
                  <button className="btn-delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
