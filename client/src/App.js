// import logo from './logo.svg';
// import React, { useState } from 'react';
// import './App.css';
// import SignIn from './modules/Auth/signIn';

// function App() {
//   return (
//     <div className="App">
//       <SignIn/>
//     </div>
//   );
// }
// export default App;

import React, { useState } from "react";

// —— Utility: fake API call ——
function fakeRequest(payload) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // super simple: reject if password === "error"
      if (payload.password === "error") reject(new Error("Server rejected these credentials."));
      else resolve({ ok: true });
    }, 500);
  });
}

// —— Shared Input component ——
function TextField({ label, type = "text", name, value, onChange, error, placeholder }) {
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

// —— Sign Up ——
function SignUpForm() {
  // field values
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // error variables (one per field + general)
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
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Enter a valid email address.");
      ok = false;
    }
    if (!phone.trim()) {
      setPhoneError("Phone number is required.");
      ok = false;
    } else if (!/^\d{10,15}$/.test(phone.replace(/\D/g, ""))) {
      setPhoneError("Enter 10–15 digits only.");
      ok = false;
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
      if (res?.ok) {
        alert("Signed up! (demo)");
      }
    } catch (err) {
      setGeneralError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} style={formStyles}>
      <h2 style={titleStyles}>Sign Up</h2>

      <TextField
        label="Username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        error={usernameError}
        placeholder="e.g., jay_doe"
      />

      <TextField
        label="Email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={emailError}
        placeholder="you@example.com"
      />

      <TextField
        label="Phone Number"
        name="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        error={phoneError}
        placeholder="Digits only"
      />

      <TextField
        label="Password"
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={passwordError}
        placeholder="••••••••"
      />

      {generalError ? (
        <div style={{ color: "#e11d48", fontSize: 13, marginBottom: 8 }}>{generalError}</div>
      ) : null}

      <button type="submit" disabled={loading} style={buttonStyles}>
        {loading ? "Creating..." : "Create Account"}
      </button>
    </form>
  );
}

// —— Sign In ——
function SignInForm() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  // error variables
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
    <form onSubmit={onSubmit} style={formStyles}>
      <h2 style={titleStyles}>Sign In</h2>

      <TextField
        label="Username or Email"
        name="usernameOrEmail"
        value={usernameOrEmail}
        onChange={(e) => setUsernameOrEmail(e.target.value)}
        error={usernameOrEmailError}
        placeholder="jay_doe or you@example.com"
      />

      <TextField
        label="Password"
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={passwordError}
        placeholder="••••••••"
      />

      {generalError ? (
        <div style={{ color: "#e11d48", fontSize: 13, marginBottom: 8 }}>{generalError}</div>
      ) : null}

      <button type="submit" disabled={loading} style={buttonStyles}>
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}

// —— Wrapper with simple tabs ——
export default function AuthExample() {
  const [mode, setMode] = useState("signup");

  return (
    <div style={pageStyles}>
      <div style={cardStyles}>
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <button
            onClick={() => setMode("signup")}
            style={{ ...tabStyles, background: mode === "signup" ? "#111827" : "#f3f4f6", color: mode === "signup" ? "#fff" : "#111827" }}
          >
            Sign Up
          </button>
          <button
            onClick={() => setMode("signin")}
            style={{ ...tabStyles, background: mode === "signin" ? "#111827" : "#f3f4f6", color: mode === "signin" ? "#fff" : "#111827" }}
          >
            Sign In
          </button>
        </div>
        {mode === "signup" ? <SignUpForm /> : <SignInForm />}
      </div>
    </div>
  );
}

// —— Styles ——
const pageStyles = {
  minHeight: "100vh",
  display: "grid",
  placeItems: "center",
  background: "#f9fafb",
  padding: 16,
};

const cardStyles = {
  width: "100%",
  maxWidth: 420,
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: 16,
  padding: 20,
  boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
};

const formStyles = { marginTop: 4 };
const titleStyles = { margin: 0, marginBottom: 12, fontSize: 22 };
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
const tabStyles = { padding: "8px 12px", borderRadius: 10, border: "1px solid #e5e7eb", cursor: "pointer" };

