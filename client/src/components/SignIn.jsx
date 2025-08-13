import React, { useState } from "react";
import TextField from "./TextField";

function fakeRequest(payload) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (payload.password === "error") reject(new Error("Invalid credentials."));
      else resolve({ ok: true });
    }, 500);
  });
}

export default function SignIn() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const [usernameOrEmailError, setUsernameOrEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);

  const clearErrors = () => {
    setUsernameOrEmailError("");
    setPasswordError("");
    setGeneralError("");
  };

  const validate = () => {
    let ok = true;
    clearErrors();
    if (!usernameOrEmail.trim()) {
      setUsernameOrEmailError("Username or email is required.");
      ok = false;
    }
    if (!password) {
      setPasswordError("Password is required.");
      ok = false;
    }
    return ok;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setGeneralError("");
    if (!validate()) return;
    try {
      setLoading(true);
      const res = await fakeRequest({ usernameOrEmail, password });
      if (res?.ok) alert("Signed in! (demo)");
    } catch (err) {
      setGeneralError(err.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ marginTop: 4 }}>
      <h2 style={{ margin: 0, marginBottom: 12, fontSize: 22 }}>Sign In</h2>

      <TextField label="Username or Email" name="usernameOrEmail" value={usernameOrEmail} onChange={(e) => setUsernameOrEmail(e.target.value)} error={usernameOrEmailError} placeholder="jay_doe or you@example.com" />
      <TextField label="Password" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} error={passwordError} placeholder="••••••••" />

      {generalError ? <div style={{ color: "#e11d48", fontSize: 13, marginBottom: 8 }}>{generalError}</div> : null}

      <button type="submit" disabled={loading} style={buttonStyles}>{loading ? "Signing in..." : "Sign In"}</button>
    </form>
  );
}

const buttonStyles = {
  width: "100%",
  padding: 12,
  borderRadius: 10,
  border: "none",
  background: "#111827",
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer",
};