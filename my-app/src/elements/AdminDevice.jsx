import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const UserOptions = ({ username, _id }) => {
  return (
    <option value={username} id={_id}>
      {username}
    </option>
  );
};

const Device = ({ _id, alloted_to_user, state: { light, fan, mis } }) => {
  const navigate = useNavigate();

  const [allUsers, setAllUsers] = useState([]);

  const addUsertoDevice = async () => {
    let token = JSON.parse(localStorage.getItem("admin"));
    const user = document.querySelector("select[name='alloted_to_user']").value;
    console.log(user);
    try {
      const response = await axios.put(
        `http://localhost:3030/api/admin/device/adduser/${_id}`,
        {
          username: user,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.data.status === "ok") {
        alert("User added to device");
        window.location.reload();
      }
      // console.log(response.data);
      navigate("/admin");
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      let token = JSON.parse(localStorage.getItem("admin"));
      try {
        const response = await axios.get(
          "http://localhost:3030/api/admin/user",
          {
            headers: {
              Authorization: token,
            },
          }
        );

        setAllUsers(response.data.user);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      style={{
        padding: "2rem 4rem",
        margin: "1.5rem",
        boxShadow:" 0 4px 8px 0 rgba(0, 0, 0, 0.18), 0 6px 20px 0 rgba(0, 0, 0, 0.15)"
      }}
      className="device-card"
    >
      <p className="font-bold">ID: {_id}</p>
      {alloted_to_user === null ? (
        <>
          <select
            defaultValue={null}
            name="alloted_to_user"
            placeholder="Allocated to User"
            style={{
              margin: "1rem",
              padding: "0.5rem",
            }}
          >
            <option value={null} selected>
              Options
            </option>
            {allUsers.map((user) => (
              <UserOptions username={user.username} _id={user._id} />
            ))}
          </select>
          <button
            style={{
              margin: "10px",
              padding: "5px",
            }}
            onClick={addUsertoDevice}
          >
            submit
          </button>
        </>
      ) : (
        <p className="font-bold">User : {alloted_to_user}</p>
      )}
      <p>State:</p>
      <ul type="none">
        <li>
          <span>Light: {light}</span>
        </li>
        <li>
          <span>Fan: {fan}</span>
        </li>
        <li>
          <span>Mis: {mis}</span>
        </li>
      </ul>
    </div>
  );
};

export default Device;
