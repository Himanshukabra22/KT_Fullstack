import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./UserLogin.css";

const UserLogin = () => {
  const navigate = useNavigate();

  const submitForm = async () => {
    try {
      var username = document.getElementsByName("username")[0].value;
      var password = document.getElementsByName("password")[0].value;
      if (username && password) {
        let user = {
          username: username,
          password: password,
        };
        console.log(user);
        const response = await axios.post(
          "http://localhost:3030/api/user/login",
          user,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        let data = response.data;
        console.log(data);

        if (data.status === "ok") {
          localStorage.setItem("user", JSON.stringify(data.token));
          navigate("/user");
        } else {
          alert("Invalid username or password");
          navigate("/userlogin");
        }
      } else {
        alert("Invalid username or password");
        navigate("/userlogin");
      }
    } catch (error) {
      console.log(error);
      alert("Server is down or resource not found. Please try again later.");
      navigate("/userlogin");
    }
  };

  return (
    <>
      <title>User Login</title>
      <header>
        <div className="logospan">KasperTech</div>
      </header>
      <div className="login-page">
        <div className="form">
            <h4 className="login-head">User Login</h4>
            <input type="text" placeholder="username" name="username" />
            <input type="password" placeholder="password" name="password" />
            <button onClick={submitForm}>login</button>
        </div>
      </div>
    </>
  );
};
export default UserLogin;
