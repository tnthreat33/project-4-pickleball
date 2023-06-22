import React, { useState } from "react";
import SignUpForm from "./SignUpForm";

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
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => setCurrentUser(user));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  function handleShowSignUpForm() {
    setShowSignUpForm(true);
  }

  if (showSignUpForm) {
    return <SignUpForm setCurrentUser={setCurrentUser} />;
  }

  return (
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
  );
}

export default Login;