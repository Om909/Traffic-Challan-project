import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";  // custom styles

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-light top-navbar">
      <div className="container justify-content-center">
        <ul className="navbar-nav flex-row gap-4">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin-login">Admin Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin-panel">Admin Panel</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/user-login">User Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}