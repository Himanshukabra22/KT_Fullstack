import { useState } from "react";
import axios from "axios";

const Device = ({ _id, state: { light, fan, mis } }) => {
  const [deviceState, setDeviceState] = useState({ light, fan, mis });

  const updateState = async () => {
    try {
      console.log({ light, fan, mis });
      let token = JSON.parse(localStorage.getItem("user"));
      const response = await axios.put(
        `http://localhost:3030/api/user/device/update/${_id}`,
        { state: { light, fan, mis } },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        console.log("Device state updated");
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <div className="admin-container">
      <p>ID: {_id}</p>
      <p>State:</p>
      <ul type="none">
        <li>
          <span
            style={{
              margin: "10px",
            }}
          >
            Light: {deviceState.light}
          </span>
          <button
            id="lightToggle"
            onClick={() => {
              light = deviceState.light === 1 ? 0 : 1;
              mis = deviceState.mis;
              fan = deviceState.fan;
              setDeviceState({ light, fan, mis });
              updateState();
            }}
            style={{
              margin: "10px",
              padding: "5px",
            }}
          >
            toggle
          </button>
        </li>
        <li>
          <span
            style={{
              margin: "5px",
            }}
          >
            Fan: {deviceState.fan}
          </span>
          <button
            id="fanToggle"
            onClick={() => {
              fan = deviceState.fan === 1 ? 0 : 1;
              light = deviceState.light;
              mis = deviceState.mis;
              setDeviceState({ light, fan, mis });
              updateState();
            }}
            style={{
              margin: "5px",
              padding: "5px",
            }}
          >
            toggle
          </button>
        </li>
        <li>
          <span
            style={{
              margin: "10px",
            }}
          >
            Mis: {deviceState.mis}
          </span>
          <button
            id="misToggle"
            onClick={() => {
              mis = deviceState.mis === 1 ? 0 : 1;
              light = deviceState.light;
              fan = deviceState.fan;
              setDeviceState({ light, fan, mis });
              updateState();
            }}
            style={{
              margin: "5px",
              padding: "5px",
            }}
          >
            toggle
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Device;
