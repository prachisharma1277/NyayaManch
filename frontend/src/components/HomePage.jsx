import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';

// Import your existing components here
import Header from '../components/Header'; 
import Footer from '../components/Footer';
import IndiaMap from '../assets/IndMap.svg';

const ScaleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="stat-icon" fill="currentColor">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="stat-icon" fill="currentColor">
    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    <polyline points="12 6 12 12 16 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const MicIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="stat-icon" fill="currentColor">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
    <line x1="12" y1="19" x2="12" y2="23" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="8" y1="23" x2="16" y2="23" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const HomePage = () => {
  return (
    <div className="nyayamanch-page">
      <Header />

      {/* Hero Section */}
      <main className="hero-main">
        <div className="hero-content-container">
          <div className="constellation-overlay">
          {Array.from({ length: 75 }).map((_, i) => (
            <div
              key={i}
              className="star"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
          <div className="hero-text-area">
            <h1 className="hero-title">
              Justice, <br />
              Accelerated
            </h1>
            <p className="hero-subtitle">
              Resolving India's Judicial Backlog with <br />
              AI-Powered Insights
            </p>
            <div className="action-buttons">
              <button className="learn-more-btn">Learn More</button>
              <Link to="/signup"><button className="join-us-btn">Join Us</button></Link>
            </div>
          </div>

          <div className="hero-map-area">
            <div className="map-wrapper">
              <img src={IndiaMap} alt="India Map" className="map-image" />
            </div>
          </div>
        </div>
        
        
      </main>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-card">
            <div className="icon-circle bg-blue">
              <ScaleIcon />
            </div>
            <h3 className="stat-number">53 Million</h3>
            <p className="stat-label">Pending Cases</p>
          </div>

          <div className="stat-card">
            <div className="icon-circle bg-yellow">
              <ClockIcon />
            </div>
            <h3 className="stat-number">3-15 Years</h3>
            <p className="stat-label">Average Wait</p>
          </div>

          <div className="stat-card">
            <div className="icon-circle bg-teal">
              <MicIcon />
            </div>
            <h3 className="stat-number">Voice Support</h3>
            <p className="stat-label">Generative AI</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;