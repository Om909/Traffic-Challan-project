import React, { useEffect, useState } from "react";
import { API } from "../config";
import "./UserPanel.css"; // 🟢 Import the styling

export default function UserPanel({ userId }) {
  const [challans, setChallans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [payingId, setPayingId] = useState(null);

  const fetchMine = async () => {
    if (!userId) return;
    setLoading(true);
    const res = await fetch(`${API}/challan/user/${userId}`);
    const data = await res.json();
    setChallans(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  const pay = async (id) => {
    setPayingId(id);
    const res = await fetch(`${API}/challan/pay/${id}`, { method: "POST" });
    const data = await res.json();
    alert(data.message || "Paid");
    setPayingId(null);
    fetchMine();
  };

  useEffect(() => {
    fetchMine();
  }, []);

  return (
    <div className="user-panel-container">
      <h2 className="panel-title">📄 My Challans</h2>

      <button className="refresh-btn" onClick={fetchMine} disabled={loading}>
        {loading ? "Refreshing..." : "Refresh"}
      </button>

      {challans.length === 0 ? (
        <p className="empty-msg">No challans found.</p>
      ) : (
        <table className="challan-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Vehicle</th>
              <th>Cause</th>
              <th>Fine</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {challans.map((c, i) => (
              <tr key={c._id}>
                <td>{i + 1}</td>
                <td>{c.vehicleNumber}</td>
                <td>{c.cause}</td>
                <td>₹ {c.fine}</td>
                <td>
                  <span
                    className={
                      c.status === "Paid"
                        ? "status-paid"
                        : "status-pending"
                    }
                  >
                    {c.status}
                  </span>
                </td>
                <td>
                  {c.status !== "Paid" && (
                    <button
                      className="pay-btn"
                      disabled={payingId === c._id}
                      onClick={() => pay(c._id)}
                    >
                      {payingId === c._id ? "Processing..." : "Pay Now"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
