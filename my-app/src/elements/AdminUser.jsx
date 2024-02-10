import React from "react";

const AdminUser = ({ username, _id, devices, password }) => {
  return (
    <div
      style={{
        border: "2px solid black",
        padding: "10px",
        margin: "10px",
      }}
    >
      <p
        style={{
          margin: "25px 0px 0px 0px",
        }}
      >
        <h4>ID : </h4> {_id}
      </p>
      <p
        style={{
          margin: "10px 0px 25px 0px",
        }}
      >
        <h4>Username : </h4> {username}
      </p>
      <p
        style={{
          margin: "10px 0px 25px 0px",
        }}
      >
        <h4>Password : </h4> {password}
      </p>
      <p
        style={{
          margin: "10px 0px 25px 0px",
        }}
      >
        <h4>Devices : </h4>
        {devices.length !== 0 ? (
          devices.map((device) => {
            return <li>{device}</li>;
          })
        ) : (
          <span>No devices found</span>
        )}
      </p>
    </div>
  );
};

export default AdminUser;
