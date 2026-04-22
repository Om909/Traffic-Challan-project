import React, { useState } from "react";
import { API } from "../config";
import "./UserLogin.css";   // ✅ Import styles

export default function UserLogin({ setUserToken }) {
  const [form, setForm] = useState({});

  const login = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API}/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.token) {
      setUserToken(data.token);
      localStorage.setItem("uid", data.userId);
      alert("User logged in");
    } else alert(data.message || "Login failed");
  };

  return (
    <div className="user-login-container">
      <div className="user-login-card">
        <h2>👤 User Login</h2>
        <form onSubmit={login}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
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