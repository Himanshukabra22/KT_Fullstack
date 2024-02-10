import axios from "axios";
// import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


// let allRooms = [ "1", "2", "3", "4", "5"]

const Device = ({ _id , device_id, room_name }) => {
  let navigate = useNavigate();
  // const [allRooms, setAllRooms] = useState([]);

  const setDeviceToRoom = async () => {
    let token = JSON.parse(localStorage.getItem("admin"));
    const user = document.querySelector("select[name='alloted_to_user']").value;
    console.log(user);
    try {
      const response = await axios.put(
        `/${_id}`,
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

  return (
    <div
      style={{
        border: "1px solid black",
        padding: "10px",
        margin: "10px",
      }}
    >
      <p>Room ID: {_id}</p>
      <p>Room Name: {room_name}</p>
      {device_id === null ? (
        <>
          <select
            defaultValue={null}
            name="device_id"
            placeholder="Device ID"
            style={{
              margin: "10px",
              padding: "5px",
            }}
          >
            <option value={null} selected>
              Options
            </option>
            {/* {allRooms.map((user) => (
              <DeviceOptions  />
            ))} */}
          </select>
          <button
            style={{
              margin: "10px",
              padding: "5px",
            }}
            onClick={setDeviceToRoom}
          >
            set Device
          </button>
        </>
      ) : (
        <p>Device ID: {device_id}</p>
      )}
    </div>
  );
};

export default Device;
