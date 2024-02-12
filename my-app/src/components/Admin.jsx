import React, { useState, useEffect } from "react";
import axios from "axios";
import Device from "../elements/AdminDevice";
import AdminUser from "../elements/AdminUser";

const User = () => {
  const [navState, setNavState] = useState(0);
  const [allUsers, setAllUsers] = useState([]);
  const [allDevices, setAllDevices] = useState([]);

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
        setAllUsers(response.data.user.reverse());
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
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
        setAllDevices(response.data.device.reverse());
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  const createDevice = async () => {
    try {
      let token = JSON.parse(localStorage.getItem("admin"));
      const response1 = await axios.post(
        `http://localhost:3030/api/admin/device/create`,
        null,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response1.status === 200) {
        const response2 = await axios.get(
          `http://localhost:3030/api/admin/device/`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        response2.data.device.reverse();
        setAllDevices(response2.data.device);
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
        if (response.status === 200) {
          const response = await axios.get(
            `http://localhost:3030/api/admin/user`,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          setAllUsers(response.data.user.reverse());
        }
        // console.log(response.data);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

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
            setNavState(0); console.log("Hell0");
          }}
        >
          Devices
        </button>
        <button
          className="button"
          onClick={() => {
            setNavState(1); console.log("World");
          }}
        >
          Users
        </button>
      </div>
      {navState === 0 ? (
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
            <div>
              {allDevices.map((device) => (
                <Device
                  _id={device._id}
                  alloted_to_user={device.alloted_to_user}
                  state={device.state}
                />
              ))}
            </div>
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
