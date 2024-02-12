import React, { useState, useEffect } from "react";
import axios from "axios";
import Device from "../elements/UserDevice";
import Room from "../elements/Room";

const User = () => {
  const [navState, setNavState] = useState(1);
  const [allDevices, setAllDevices] = useState([]);
  const [allRooms, setAllRooms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(
          "http://localhost:3030/api/user/device",
          {
            headers: {
              Authorization: JSON.parse(localStorage.getItem("user")),
            },
          }
        );
        console.log(response.data.devices);
        if (response.data.status === "ok") {
          setAllDevices(response.data.devices);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let token = JSON.parse(localStorage.getItem("user"));
        const response = await axios.get(
          `http://localhost:3030/api/user/room`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log(response.data);
        setAllRooms(response.data.rooms.reverse());
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const createRoomforUser = async () => {
    let token = JSON.parse(localStorage.getItem("user"));
    const roomname = document.getElementsByName("roomname")[0].value;
    console.log(roomname);
    try {
      const response = await axios.post(
        `http://localhost:3030/api/user/room/create`,
        {
          room_name: roomname,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.status === 200) {
        const response = await axios.get(
          `http://localhost:3030/api/user/room`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setAllRooms(response.data.rooms.reverse());
      }
      // console.log(response.data);
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
            setNavState(1);
          }}
        >
          My Devices
        </button>
        <button
          className="button"
          onClick={() => {
            setNavState(0);
          }}
        >
          My Rooms
        </button>
      </div>
      {navState ? (
        allDevices.map((device) => (
          <Device
            key={device._id}
            _id={device._id}
            alloted_to_user={device.alloted_to_user}
            state={device.state}
          />
        ))
      ) : (
        <>
          <div>
            <input
              type="text"
              name="roomname"
              placeholder="Roomname"
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
              onClick={createRoomforUser}
            >
              Create Room
            </button>
            {allRooms.map((room) => (
              <Room
                key={room._id}
                _id={room._id}
                room_id={room.room_id}
                device_id={room.device_id}
                room_name={room.room_name}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};
export default User;
