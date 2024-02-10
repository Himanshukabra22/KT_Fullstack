import React, { useState, useEffect } from "react";
import axios from "axios";
import Device from "../elements/AdminDevice";
import AdminUser from "../elements/AdminUser";

const User = () => {
  const [navState, setNavState] = useState(1);
  const [allUsers, setAllUsers] = useState([]);
  const [allDevices, setAllDevices] = useState([]);

  const createDevice = async () => {
    try {
      let token = JSON.parse(localStorage.getItem("admin"));
      const response = await axios.post(
        `http://localhost:3030/api/admin/device/create`,
        null,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.data.status === "ok") {
        alert("Device created");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const creteUserbyAdmin = async () => {
    try {
      let token = JSON.parse(localStorage.getItem("admin"));
      const username = document.getElementsByName("username")[0].value;
      const password = document.getElementsByName("password")[0].value;
      if (username && password) {
        const user = {
          username: username,
          password: password,
        };
        // console.log(user);
        const response = await axios.post(
          `http://localhost:3030/api/user/register`,
          user,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (response.data.status === "ok") {
          alert("User created");
          window.location.reload();
        }
        // console.log(response.data);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let token = JSON.parse(localStorage.getItem("admin"));
        const response = await axios.get(
          `http://localhost:3030/api/admin/user`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        // console.log(response.data);
        setAllUsers(response.data.user);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      // console.log(token);
      try {
        let token = JSON.parse(localStorage.getItem("admin"));
        const response = await axios.get(
          `http://localhost:3030/api/admin/device/`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        setAllDevices(response.data.device);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <title>User Page</title>
      <header>
        <div className="logospan">KasperTech</div>
      </header>
      <div className="body">
        <button
          className="button"
          onClick={() => {
            setNavState(1);
          }}
        >
          Devices
        </button>
        <button
          className="button"
          onClick={() => {
            setNavState(0);
          }}
        >
          Users
        </button>
      </div>
      {navState ? (
        <>
          <button
            onClick={createDevice}
            style={{
              margin: "10px",
              padding: "5px",
            }}
          >
            {" "}
            Create Device{" "}
          </button>
          {allDevices ? (
            allDevices.map((device) => (
              <Device
                _id={device._id}
                alloted_to_user={device.alloted_to_user}
                state={device.state}
              />
            ))
          ) : (
            <h1>No Devices</h1>
          )}
        </>
      ) : (
        <>
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              style={{
                margin: "10px",
                padding: "5px",
              }}
            ></input>
            <input
              type="text"
              name="password"
              placeholder="Password"
              style={{
                margin: "10px",
                padding: "5px",
              }}
            ></input>
            <button
              style={{
                margin: "10px",
                padding: "5px",
              }}
              onClick={creteUserbyAdmin}
            >
              Create User
            </button>
          </div>
          {allUsers.map((user) => (
            <AdminUser
              key={user.username}
              _id={user._id}
              username={user.username}
              name={user.name}
              password={user.password}
              devices={user.devices.map((device) => device.deviceId)}
            />
          ))}
        </>
      )}
    </>
  );
};
export default User;
