import React, { useState } from "react";
import { API } from "../config";
import "./AdminLogin.css";   // ✅ Import styles

export default function AdminLogin({ setAdminToken, setView }) {
  const [form, setForm] = useState({});

  const login = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.token) {
      setAdminToken(data.token);
      alert("Admin logged in");
      setView("adminPanel");
    } else alert(data.message || "Login failed");
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <h2>🔐 Admin Login</h2>
        <form onSubmit={login}>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}