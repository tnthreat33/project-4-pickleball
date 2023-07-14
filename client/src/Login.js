import React, { useContext, useState } from 'react';
import { UserContext } from './Context/user';
import SignUpForm from './SignUpForm';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { setCurrentUser } = useContext(UserContext);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const navigate = useNavigate();
 

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        setIsLoading(false);
        if (response.ok) {
          response.json().then((user) => {
            setCurrentUser(user);
            navigate('/');
          });
        } else {
          response.json().then((data) => {
            setError(data.errors.login); 
          });
        }
      })
      .catch((error) => {
        console.error('Login error:', error);
        setError('An error occurred during login. Please try again.');
      });
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
        <h3>Login to see the courts and make your reservations</h3>
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

            {error && (
              <div className="error-container">
                <p>{error}</p>
               
              </div>
            )}
          <button variant="fill" color="primary" type="submit">
            {isLoading ? 'Loading...' : 'Login'}
          </button>

          <button onClick={handleShowSignUpForm}>Sign Up</button>
        </form>
      </div>
    </>
  );
}

export default Login;
