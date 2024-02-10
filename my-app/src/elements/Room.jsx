import axios from "axios";
import React, { useEffect, useState } from "react";

const DeviceOptions = ({ deviceId }) => {
  return <option value={deviceId}>{deviceId}</option>;
};

const Room = ({ _id, device_id, room_name }) => {
  const [unallocatedDevices, setUnallocatedDevices] = useState([]);

  const setDeviceToRoom = async () => {
    let token = JSON.parse(localStorage.getItem("user"));
    const device_id = document.getElementsByName("device_id")[0].value;
    console.log(device_id);
    try {
      const response = await axios.put(
        `http://localhost:3030/api/user/room/update/${_id}`,
        {
          device_id: device_id,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.status === 200) {
        alert("Device assigned to room");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let token = JSON.parse(localStorage.getItem("user"));
        const response = await axios.get(
          `http://localhost:3030/api/user/room/freedevices`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log(response.data);
        if (response.data.status === "ok") {
          setUnallocatedDevices(response.data.device);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

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
            {unallocatedDevices.map((device) => (
              <DeviceOptions
                deviceId={device.deviceId}
                allocated={device.allocated}
              />
            ))}
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

export default Room;
