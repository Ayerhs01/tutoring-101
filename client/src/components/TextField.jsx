import React from "react";

export default function TextField({ label, type = "text", name, value, onChange, error, placeholder }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: 10,
          borderRadius: 8,
          border: error ? "1px solid #e11d48" : "1px solid #d1d5db",
          outline: "none",
        }}
      />
      {error ? (
        <div style={{ color: "#e11d48", fontSize: 12, marginTop: 6 }}>{error}</div>
      ) : null}
    </div>
  );
}
