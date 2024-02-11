import React from "react";

const AdminUser = ({ username, _id, devices, password }) => {
  return (
    <div className="admin-container">
      <p>
        <h4>ID : </h4> {_id}
      </p>
      <p>
        <h4>Username : </h4> {username}
      </p>
      <p>
        <h4>Password : </h4> {password}
      </p>
      <p>
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
