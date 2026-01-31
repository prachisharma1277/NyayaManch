import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import './Header.css';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

const Header = ({ onMenuClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  // Check for logged-in user on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header">
      {/* LEFT: Sidebar Toggle + Logo */}
      <div className="header-left">
        {onMenuClick && (
          <button className="sidebar-trigger" onClick={onMenuClick}>
            ☰
          </button>
        )}
        <div className="logo-container">
          <span className="logo-text">⚖️ NyayaManch</span>
        </div>
      </div>

      {/* CENTER: Navigation Links */}
      <nav className={`main-nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
        <NavLink to="/" end className={({ isActive }) => isActive ? "nav-btn active" : "nav-btn"}>Home</NavLink>
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-btn active" : "nav-btn"}>Dashboard</NavLink>
        <NavLink to="/strength" className={({ isActive }) => isActive ? "nav-btn active" : "nav-btn"}>Case Strength</NavLink>
        <NavLink to="/similar" className={({ isActive }) => isActive ? "nav-btn active" : "nav-btn"}>Similar Finder</NavLink>
        <NavLink to="/vernacular" className={({ isActive }) => isActive ? "nav-btn active" : "nav-btn"}>Vernacular</NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? "nav-btn active" : "nav-btn"}>About Us</NavLink>

        {/* Mobile Only Actions */}
        <div className="mobile-only-actions">
          {user ? (
            <div className="mobile-user-info">
              <p>Signed in as: <strong>{user.name}</strong></p>
              <button onClick={handleLogout} className="login-btn" style={{marginTop: '10px'}}>Logout</button>
            </div>
          ) : (
            <>
              <NavLink to="/login"><button className="login-btn">Login</button></NavLink>
              <NavLink to="/signup"><button className="signup-btn">Sign Up</button></NavLink>
            </>
          )}
        </div>
      </nav>

      {/* RIGHT: Desktop Action Buttons OR Profile Icon */}
      <div className="action-buttons desktop-only">
        {user ? (
          <div className="profile-container" style={{ position: 'relative' }}>
            <button 
              className="profile-icon-btn" 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white' }}
            >
              <FaUserCircle size={32} />
            </button>

            {/* Dropdown Menu */}
            {showProfileMenu && (
              <div className="profile-dropdown">
                <div className="dropdown-header">
                  <strong>{user.name}</strong>
                  <span className="dropdown-email">{user.email}</span>
                </div>
                <div className="dropdown-divider"></div>
                <button onClick={handleLogout} className="dropdown-item logout">
                  <FaSignOutAlt style={{ marginRight: '8px' }}/> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <NavLink to="/login"><button className="login-btn">Login</button></NavLink>
            <NavLink to="/signup"><button className="signup-btn">Sign Up</button></NavLink>
          </>
        )}
      </div>

      {/* HAMBURGER ICON (Mobile Only) */}
      <button className="hamburger-menu" onClick={toggleMobileMenu}>
        <div className={`bar ${isMobileMenuOpen ? 'animate' : ''}`}></div>
        <div className={`bar ${isMobileMenuOpen ? 'animate' : ''}`}></div>
        <div className={`bar ${isMobileMenuOpen ? 'animate' : ''}`}></div>
      </button>
    </header>
  );
};

export default Header;