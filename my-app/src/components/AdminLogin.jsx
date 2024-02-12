import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./AdminLogin.css";

const AdminLogin = () => {
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
          "http://localhost:3030/api/admin/login",
          user,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        let data = response.data;
        if (data.status === "ok") {
          localStorage.setItem("admin", JSON.stringify(data.token));
          navigate("/admin");
          window.location.reload();
        } else {
          alert("Invalid admin username or password");
          navigate("/adminlogin");
        }
      } else {
        alert("Invalid admin username or password");
        navigate("/adminLogin");
      }
    } catch (error) {
      console.log(error);
      alert("Server is down or resource not found. Please try again later.");
      navigate("/adminlogin");
    }
  };

  return (
    <>
      <title>Admin Login</title>
      <header>
        <div className="logospan">KasperTech</div>
      </header>
      <div className="login-page">
        <div className="form">
            <h4 className="login-head">Admin Login</h4>
            <input type="text" placeholder="username" name="username" />
            <input type="password" placeholder="password" name="password" />
            <button onClick={submitForm}>login</button>
        </div>
      </div>
    </>
  );
};
export default AdminLogin;
