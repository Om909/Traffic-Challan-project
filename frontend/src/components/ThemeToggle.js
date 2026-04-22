// src/components/ThemeToggle.js
import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "green") {
      root.classList.add("theme-green");
    } else {
      root.classList.remove("theme-green");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <button className="btn ghost" onClick={() => setTheme(prev => prev === "green" ? "dark" : "green")}>
        Toggle Theme
      </button>
      <div style={{ color: "var(--muted)", fontSize: 13 }}>
        Current: {theme === "green" ? "Green" : "Dark"}
      </div>
    </div>
  );
}
