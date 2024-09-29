import React, { useState } from 'react';
import '../_styles/Login.module.css';
import Footer from '../_components/Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Both fields are required.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Invalid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setError('');
    console.log('Form submitted:', { email, password });
  };

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div
          className="login-form-container"
          style={{
            backgroundColor: "#AEAEAD",
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
            <a href="/signup">Forgot Password?</a>
            <button
              type="submit"
              className="btn w-100"
              style={{
                backgroundColor: "#CB1276",
                borderColor: "#CB1276",
                color: "white",
                padding: "10px 20px",
                borderRadius: "5px",
                transition: "background-color 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#a91062")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#CB1276")}
            >
              Login
            </button>
            <p className="text-center mt-3">Don&apos;t have an account? <a href="/signup">Sign Up</a></p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
