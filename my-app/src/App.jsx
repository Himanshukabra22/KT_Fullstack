import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";


import LandingPage from "./components/LandingPage";
import UserLogin from "./components/UserLogin";
import AdminLogin from "./components/AdminLogin";
import User from "./components/User";
import Admin from "./components/Admin";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/userlogin" element={<UserLogin />} />
          <Route exact path="/adminlogin" element={<AdminLogin />} />
          <Route exact path="/user" element={localStorage.getItem("user") !== null ? <User/> : <UserLogin />} />
          <Route exact path="/admin" element={localStorage.getItem("admin") !== null ? <Admin/> : <AdminLogin/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
