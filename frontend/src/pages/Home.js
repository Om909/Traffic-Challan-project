// src/pages/Home.js
import React, { useState } from "react";
import { API } from "../config";
import "./Home.css";

export default function Home() {
  const [vehicle, setVehicle] = useState("");
  const [challans, setChallans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchChallans = async () => {
    const v = (vehicle || "").trim();
    if (!v) return alert("Enter vehicle number");

    setError("");
    setChallans([]);
    setLoading(true);

    try {
      // normalize to uppercase so DB matches (backend also uppercases on save)
      const veh = encodeURIComponent(v.toUpperCase());
      const res = await fetch(`${API}/challan/vehicle/${veh}`);
      if (!res.ok) {
        // backend might return 404 when no challans found or other errors
        if (res.status === 404) {
          setChallans([]);
          setError("No challans found for this vehicle.");
        } else {
          const text = await res.text();
          throw new Error(`Server error: ${res.status} ${text}`);
        }
        setLoading(false);
        return;
      }

      const data = await res.json();
      // backend returns [] or array of challans
      if (!Array.isArray(data) || data.length === 0) {
        setChallans([]);
        setError("No challans found for this vehicle.");
      } else {
        setChallans(data);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Error fetching challans. Make sure backend is running and API URL is correct.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container" style={{ padding: 20 }}>
      <h3 className="text-center mb-4">Search Challans by Vehicle Number</h3>

      <div className="search-form" style={{ display: "flex", gap: 8, alignItems: "center", maxWidth: 600 }}>
        <input
          className="form-control"
          placeholder="Enter vehicle number (e.g. JH01AB1234)"
          value={vehicle}
          onChange={(e) => setVehicle(e.target.value)}
          style={{ flex: 1, padding: 8 }}
        />
        <button className="btn btn-primary" onClick={fetchChallans} disabled={loading} style={{ padding: "8px 12px" }}>
          {loading ? "Searching…" : "Search"}
        </button>
      </div>

      {error && <p style={{ color: "crimson", marginTop: 12 }}>{error}</p>}

      {!error && !loading && challans.length === 0 && vehicle.trim() !== "" && (
        <p style={{ marginTop: 12 }}>No challans found. Try a different vehicle number.</p>
      )}

      {challans.length > 0 && (
        <div className="results" style={{ marginTop: 18 }}>
          <h5 className="mt-4 mb-3">Results for: {vehicle.toUpperCase()}</h5>
          <table className="table table-bordered table-striped" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Vehicle</th>
                <th>Cause</th>
                <th>Fine</th>
                <th>Status</th>
                <th>Issue Date</th>
                <th>Due Date</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {challans.map((c, i) => (
                <tr key={c._id || i}>
                  <td>{i + 1}</td>
                  <td>{c.vehicleNumber}</td>
                  <td>{c.cause || c.violation || "-"}</td>
                  <td>{c.fine ?? c.fineAmount ?? "-"}</td>
                  <td>{c.status}</td>
                  <td>{c.issueDate}</td>
                  <td>{c.dueDate}</td>
                  <td>{c.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {loading && <p style={{ marginTop: 12 }}>Loading…</p>}
    </div>
  );
}
