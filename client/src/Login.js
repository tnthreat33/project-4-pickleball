import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import './Login.css';

function Login({ setCurrentUser }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((r) => {
        setIsLoading(false);
        if (r.ok) {
          r.json().then((user) => setCurrentUser(user));
        } else {
          r.json().then((err) => {
            setErrors(err.errors);
            console.error("Login error:", errors);
          });
        }
      })
  }

  function handleShowSignUpForm() {
    setShowSignUpForm(true);
  }

  if (showSignUpForm) {
    return <SignUpForm setCurrentUser={setCurrentUser} />;
  }

  return (
    <>
    <div className="login-header">
      <h1>Welcome to Pickleball Center</h1>
      <h3> Login to see the courts and make your reservations</h3>
    </div>
    <div className="login-container">
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        type="text"
        id="email"
        autoComplete="off"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button variant="fill" color="primary" type="submit">
        {isLoading ? "Loading..." : "Login"}
      </button>

      <button onClick={handleShowSignUpForm}>Sign Up</button>
    </form>
    </div>
    </>
  );
}

export default Login;
