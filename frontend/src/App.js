import React, { useState } from "react";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import UserLogin from "./pages/UserLogin";
import UserPanel from "./pages/UserPanel";   // ✅ new page for user challans
import "./App.css";


function App() {
  const [view, setView] = useState("home");
  const [adminToken, setAdminToken] = useState("");
  const [userToken, setUserToken] = useState("");
  const [userId, setUserId] = useState("");

  return (
    <div className="app-container">
      <h1 className="app-title">🚦 Traffic Challan System 🚦</h1>

      {/* Navigation Menu */}
      <div className="menu-bar">
        <button onClick={() => setView("home")}>🏠 Home</button>
        <button onClick={() => setView("adminLogin")}>🔐 Admin Login</button>
        <button
          onClick={() => {
            if (adminToken) setView("adminPanel");
            else alert("Please login as Admin first");
          }}
        >
          📋 Admin Panel
        </button>
        <button
          onClick={() => {
            if (userToken) setView("userPanel");
            else setView("userLogin");
          }}
        >
          👤 User Login
        </button>
      </div>

      {/* Views */}
      <div className="view-container">
        {view === "home" && <Home />}
        {view === "adminLogin" && (
          <AdminLogin setAdminToken={setAdminToken} setView={setView} />
        )}
        {view === "adminPanel" && <AdminPanel adminToken={adminToken} />}
        {view === "userLogin" && (
          <UserLogin setUserToken={setUserToken} setUserId={setUserId} setView={setView} />
        )}
        {view === "userPanel" && (
          <UserPanel userToken={userToken} userId={userId} />
        )}
      </div>
    </div>
  );
}

export default App;