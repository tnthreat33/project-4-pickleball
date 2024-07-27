import React, { useState } from "react";
import Login from "./Login";
import './Signup.css'

function SignUpForm({ setCurrentUser }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginForm, setLoginForm] = useState(false);
  

  function handleSubmit(e) {
    e.preventDefault();
    const user = {
        name,
        password,
        address,
        email
    }
    setErrors([]);
    setIsLoading(true);
    fetch("/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(user),
})
.then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => setCurrentUser(user));
      } else {
        r.json().then((err) => setErrors(err.errors));
        
      }
    });
  }

  function handleShowLoginForm() {
    setLoginForm(true);
  }

  if (showLoginForm) {
    return <Login setCurrentUser={setCurrentUser} />;
  }

  return (
    <div className= "signup-container">
      <h1> Create Your Account </h1>
    <form onSubmit={handleSubmit}>
      
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          autoComplete="off"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
      
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      {errors && (
  <div className="error-container">
    {errors.map((error, index) => (
      <p key={index} className="error-message">{error}</p>
    ))}
  </div>
)}

        <button type="submit">{isLoading ? "Loading..." : "Sign Up"}</button>
        <button onClick={handleShowLoginForm}>Login</button>
      
    </form>
   </div>
  );
}

export default SignUpForm;