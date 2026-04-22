import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const nav = useNavigate();

  return (
    <div style={{ padding: 30 }}>
      <h1>Traffic Challan System</h1>
      <h2>Dashboard</h2>

      <div style={{ width: "200px", display: "flex", flexDirection: "column", gap: 15 }}>
        <button onClick={() => nav("/")}>Home</button>
        <button onClick={() => nav("/admin/login")}>Admin Login</button>
        <button onClick={() => nav("/user/login")}>User Login</button>
      </div>
    </div>
  );
}
