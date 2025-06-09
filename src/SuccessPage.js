import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./style.css";

export default function SuccessPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    navigate("/");
    return null;
  }

  return (
    <div className="form-container">
      <h2 className="success-text">Success!</h2>
      <p className="subtitle">Details Submitted:</p>
      <div className="details-box">
        {Object.entries(state).map(([key, value]) => (
          <p key={key}><strong>{formatKey(key)}:</strong> {value}</p>
        ))}
      </div>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
}

function formatKey(str) {
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase());
}