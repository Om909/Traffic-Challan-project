import React, { useEffect, useState } from "react";
import { API } from "../config";
import "./AdminPanel.css";   // ✅ custom CSS

export default function AdminPanel({ adminToken }) {
  const [challans, setChallans] = useState([]);
  const [form, setForm] = useState({});
  const [stats, setStats] = useState(null);

  const fetchAll = async () => {
    const res = await fetch(`${API}/challan/all`, {
      headers: { Authorization: adminToken },
    });
    const data = await res.json();
    setStats({ total: data.total, paid: data.paid, pending: data.pending });
    setChallans(data.challans);
  };

  const addChallan = async (e) => {
    e.preventDefault();
    const payload = { ...form };
    const res = await fetch(`${API}/challan/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: adminToken },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (data.challan) {
      alert("Challan added");
      fetchAll();
    } else alert(data.message || "Error");
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="container mt-4 admin-panel">
      <h3 className="text-center mb-4">Admin Panel</h3>

      {stats && (
        <div className="alert alert-info text-center">
          <strong>
            Total: {stats.total} | Paid: {stats.paid} | Pending: {stats.pending}
          </strong>
        </div>
      )}

      <div className="card p-4 mb-4 shadow-sm">
        <h4>Add Challan</h4>
        <form onSubmit={addChallan}>
          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Vehicle Number"
              onChange={(e) => setForm({ ...form, vehicleNumber: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Cause"
              onChange={(e) => setForm({ ...form, cause: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Fine"
              type="number"
              onChange={(e) => setForm({ ...form, fine: Number(e.target.value) })}
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Address"
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Due Date (YYYY-MM-DD)"
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Add Challan
          </button>
        </form>
      </div>

      <h4 className="mb-3">All Challans</h4>
      <table className="table table-striped table-bordered shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Vehicle</th>
            <th>Cause</th>
            <th>Fine</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {challans.map((c, i) => (
            <tr key={c._id}>
              <td>{i + 1}</td>
              <td>{c.vehicleNumber}</td>
              <td>{c.cause}</td>
              <td>{c.fine}</td>
              <td>{c.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}