import React, { useState } from "react";
import TextField from "./TextField";

function fakeRequest(payload) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (payload.password === "error") reject(new Error("Server rejected these credentials."));
      else resolve({ ok: true });
    }, 500);
  });
}

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // error variables
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);

  const clearErrors = () => {
    setUsernameError("");
    setEmailError("");
    setPhoneError("");
    setPasswordError("");
    setGeneralError("");
  };

  const digitsOnly = (str) => str.split("").filter((c) => c >= "0" && c <= "9").join("");

  const validate = () => {
    let ok = true;
    clearErrors();

    if (!username.trim()) {
      setUsernameError("Username is required.");
      ok = false;
    }
    if (!email.trim()) {
      setEmailError("Email is required.");
      ok = false;
    } else {
      const at = email.indexOf("@");
      const dotAfterAt = email.indexOf(".", at + 1);
      if (at <= 0 || dotAfterAt <= at + 1) {
        setEmailError("Enter a valid email address.");
        ok = false;
      }
    }
    if (!phone.trim()) {
      setPhoneError("Phone number is required.");
      ok = false;
    } else {
      const justDigits = digitsOnly(phone);
      if (justDigits.length < 10 || justDigits.length > 15) {
        setPhoneError("Enter 10–15 digits only.");
        ok = false;
      }
    }
    if (!password) {
      setPasswordError("Password is required.");
      ok = false;
    } else if (password.length < 6) {
      setPasswordError("Use at least 6 characters.");
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
      const res = await fakeRequest({ username, email, phone, password });
      if (res?.ok) alert("Signed up! (demo)");
    } catch (err) {
      setGeneralError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ marginTop: 4 }}>
      <h2 style={{ margin: 0, marginBottom: 12, fontSize: 22 }}>Sign Up</h2>

      <TextField label="Username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} error={usernameError} placeholder="e.g., jay_doe" />
      <TextField label="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} error={emailError} placeholder="you@example.com" />
      <TextField label="Phone Number" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} error={phoneError} placeholder="Digits only" />
      <TextField label="Password" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} error={passwordError} placeholder="••••••••" />

      {generalError ? <div style={{ color: "#e11d48", fontSize: 13, marginBottom: 8 }}>{generalError}</div> : null}

      <button type="submit" disabled={loading} style={buttonStyles}>{loading ? "Creating..." : "Create Account"}</button>
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