import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import for redirection
import './LoginPage.css';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { GoogleLogin } from '@react-oauth/google'; // Google Component
import axios from 'axios';
 import { Link } from 'react-router-dom';
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        email,
        password
      });
      
      // Save token and user info
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      console.log('Login successful');
      navigate('/dashboard'); // Redirect after login
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/google`, {
        token: credentialResponse.credential,
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/dashboard');
    } catch (err) {
      setError('Google Login Failed');
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
          <h2>Welcome Back</h2>
          <p>Login to access your dashboard</p>
          {error && <p style={{color: 'red', fontSize: '0.9rem'}}>{error}</p>}
        </div>

        <form onSubmit={handleSubmit}>
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

          <button type="submit" className="loginButton">Login</button>
        </form>
        
        {/* Google Login Section */}
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
            <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError('Google Login Failed')}
                theme="filled_black"
                shape="pill"
            />
        </div>

        <div className="signupLink">
          Don&apos;t have an account?<Link to="/signup">Sign Up</Link>
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

export default LoginPage;
