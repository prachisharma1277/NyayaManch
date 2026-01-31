
import React from 'react';
import { Link } from 'react-router-dom';
import './AboutUs.css';

// --- LAYOUT COMPONENTS ---
import Header from './Header';
import Footer from './Footer';

const AboutUs = () => {
  return (
    <div className="about-page-standalone">
      
      {/* 1. HEADER (No sidebar toggle needed here) */}
      <Header />

      {/* 2. MAIN CONTENT VIEWPORT */}
      <main className="about-main-viewport">
        
        {/* SCROLLABLE AREA */}
        <div className="about-content-scroll">
          <div className="about-content-wrapper">
            
            {/* Hero Section */}
            <section className="about-hero">
              <div className="hero-text-container">
                <h1 className="hero-title">
                  Bridging the Gap Between <br />
                  <span className="highlight-text">Citizen & Constitution</span>
                </h1>
                <p className="hero-subtitle">
                  We are a collective of legal experts and data scientists <br />
                  democratizing access to justice in India.
                </p>
              </div>

              {/* Star Animation Background */}
              <div className="stars-overlay">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div
                    key={i}
                    className="star-particle"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 5}s`,
                    }}
                  />
                ))}
              </div>
            </section>

            {/* Story Section */}
            <section className="story-section">
              <div className="inner-content">
                <h2>Our Origin</h2>
                <p>
                  Nyaya Manch was born from a single statistic: <strong>50 Million+</strong>. 
                  That is the number of pending cases in Indian courts. We realized that 
                  human effort alone cannot scale to meet this demand. By combining 
                  <strong> Generative AI</strong> with deep legal expertise.
                </p>
              </div>
            </section>

            {/* Values Section */}
            <section className="values-section">
              <h2 className="section-title">Our Core Values</h2>
              <div className="values-grid">
                <div className="value-card">
                  <div className="val-icon blue">👁</div>
                  <h3>Transparency</h3>
                  <p>Clear, explainable legal insights.</p>
                </div>
                <div className="value-card">
                  <div className="val-icon yellow">🌍</div>
                  <h3>Vernacular</h3>
                  <p>Law in your local language.</p>
                </div>
                <div className="value-card">
                  <div className="val-icon teal">⚙</div>
                  <h3>AI Ethics</h3>
                  <p>Unbiased, secure data handling.</p>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
              <h2>Be Part of the Change</h2>
              <div className="cta-btns">
                <Link to="/contact" className="btn-secondary">Contact Us</Link>
                <Link to="/signup" className="btn-primary">Join the Movement</Link>
              </div>
            </section>

            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutUs;