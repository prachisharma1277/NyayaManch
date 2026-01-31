import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUpPage.css';
import { FaUser, FaEnvelope, FaLock, FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';

const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    // DEBUGGING: Check if the API URL is actually loaded
    console.log("Using API URL:", import.meta.env.VITE_APP_API_URL);

    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
            name,
            email,
            password
        });

        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        
        console.log('Registration successful');
        navigate('/dashboard');

    } catch (err) {
        // --- THIS WILL SHOW US THE REAL ERROR ---
        console.error("❌ FULL ERROR:", err);
        
        if (err.response) {
            // The server responded with a status code other than 2xx
            console.error("Response Data:", err.response.data);
            console.error("Response Status:", err.response.status);
        } else if (err.request) {
            // The request was made but no response was received
            console.error("❌ Network Error: No response received from server.");
        } else {
            // Something happened in setting up the request
            console.error("Error Message:", err.message);
        }
        // ----------------------------------------

        setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    
       <div className="login-constellation-overlay">
        {/* Your Star animation code remains here */}
        {Array.from({ length: 70 }).map((_, i) => (
          <span key={i} className="star" style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      <div className="formCard">

        <div className="welcomeText">
          <h2>Create Your Account</h2>
          <p>Register to get started with NyayaManch</p>
          {error && <p style={{color: 'red', fontSize: '0.9rem'}}>{error}</p>}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="inputGroup">
            <FaUser className="inputIcon" />
            <input
              type="text"
              placeholder="Full Name"
              className="inputField"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="inputGroup">
            <FaEnvelope className="inputIcon" />
            <input
              type="email"
              placeholder="Email Address"
              className="inputField"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="inputGroup">
            <FaLock className="inputIcon" />
            <input
              type="password"
              placeholder="Password"
              className="inputField"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="inputGroup">
            <FaLock className="inputIcon" />
            <input
              type="password"
              placeholder="Confirm Password"
              className="inputField"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="signupButton">
            Sign Up
          </button>
        </form>

        <div className="loginLink">
          Already have an account? <Link to="/login">Login</Link>
        </div>

        <div className="backHomeBottom">
          <Link to="/">
            <FaArrowLeft /> Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
};

export default SignupForm;