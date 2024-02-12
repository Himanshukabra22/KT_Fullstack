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

      if (response.status === 200) {
        const response = await axios.get(
          "http://localhost:3030/api/admin/user",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setAllUsers(response.data.user.reverse());
        alert("User added to device");
      }
      else{
        alert("User not added to device due to some error. Please try again.");
      }
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

        setAllUsers(response.data.user.reverse());
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="admin-container">
      <p className="font-bold">ID: {_id}</p>
      {alloted_to_user === null ? (
        <div>
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
              {allUsers.reverse().map((user) => (
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
        </div>
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
