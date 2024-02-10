import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const loginUser = () => {
    console.log("loginUser");
    navigate("/userlogin");
  };
  function loginAdmin() {
    console.log("loginAdmin");
    navigate("/adminlogin");
  }
  return (
    <>
      <title>Welcome Page</title>
      <header>
        <div className="logospan">KasperTech</div>
      </header>
      <h1>Welcome to the Website</h1>
      <div className="buttonsdiv">
        <button className="button" onClick={loginUser}>
          Login as User
        </button>
        <button className="button" onClick={loginAdmin}>
          Login as Admin
        </button>
      </div>
    </>
  );
};
export default LandingPage;
