import React, { useState } from "react";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

export default function App() {
  const [mode, setMode] = useState("signup");

  return (
    <div style={pageStyles}>
      <div style={cardStyles}>
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <button onClick={() => setMode("signup")} style={{ ...tabStyles, background: mode === "signup" ? "#111827" : "#f3f4f6", color: mode === "signup" ? "#fff" : "#111827" }}>Sign Up</button>
          <button onClick={() => setMode("signin")} style={{ ...tabStyles, background: mode === "signin" ? "#111827" : "#f3f4f6", color: mode === "signin" ? "#fff" : "#111827" }}>Sign In</button>
        </div>
        {mode === "signup" ? <SignUp /> : <SignIn />}
      </div>
    </div>
  );
}

const pageStyles = { minHeight: "100vh", display: "grid", placeItems: "center", background: "#f9fafb", padding: 16 };
const cardStyles = { width: "100%", maxWidth: 420, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 16, padding: 20, boxShadow: "0 10px 20px rgba(0,0,0,0.08)" };
const tabStyles = { padding: "8px 12px", borderRadius: 10, border: "1px solid #e5e7eb", cursor: "pointer" };
