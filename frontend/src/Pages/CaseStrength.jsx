import React from "react";
import "./CaseStrength.css";
// Import your existing components
import Footer from "../components/Footer";

// CircleChart component stays exactly the same
function CircleChart({ percent = 0, size = 160, label = "", color = "#1e88e5" }) {
  const radius = (size / 2) - 12;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="cs-circle-wrapper" style={{ width: size, height: size }}>
      <svg className="cs-circle-svg" width={size} height={size}>
        <defs>
          <linearGradient id={`grad-${label.replace(/\s+/g, "")}-${size}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0.8" />
            <stop offset="100%" stopColor="#42a5f5" stopOpacity="1" />
          </linearGradient>
        </defs>

        <circle className="cs-ring-bg" cx={size / 2} cy={size / 2} r={radius} strokeWidth="12" fill="none" />

        <circle
          className="cs-ring-progress"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth="12"
          fill="none"
          stroke={`url(#grad-${label.replace(/\s+/g, "")}-${size})`}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 800ms ease-out" }}
        />
      </svg>

      <div className="cs-circle-center">
        <div className="cs-circle-value">{percent}<span className="percent-sign">%</span></div>
      </div>

      <div className="cs-circle-caption" style={{ width: size + 20 }}>{label}</div>
    </div>
  );
}

export default function CaseStrength() {
  return (
    <div className="cs-main-container">
      <div className="cs-page-wrapper">
        {/* Top Bar */}
        <div className="cs-topbar">
          <span className="cs-topbar-title">⚖️ Case Strength Prediction</span>
          <span className="cs-topbar-status">AI Model Status: <span className="status-online">Online</span></span>
        </div>

        {/* Root layout */}
        <div className="cs-root">
          {/* LEFT */}
          <aside className="cs-left">
            <div className="cs-card glow-card cs-left-top">
              <h2 className="cs-heading">Overall Prediction</h2>
              <div className="cs-big-chart-area">
                <CircleChart percent={78} size={250} label="Overall Strength" />
                <div className="cs-strong-text">Prediction: <strong className="strength-label strong">Strong</strong></div>
              </div>
            </div>

            <div className="cs-card glow-card cs-left-stack">
              <h3 className="cs-subheading">Detailed Metrics</h3>
              <div className="cs-stack">
                <CircleChart percent={80} size={150} label="Evidence Completeness" color="#00ffc4" />
                <CircleChart percent={70} size={150} label="Statements Cohesion" color="#ffdb58" />
                <CircleChart percent={65} size={150} label="Legal Precedent Match" color="#ff7043" />
              </div>
            </div>
          </aside>

          {/* MIDDLE */}
          <main className="cs-middle">
            <div className="cs-card glow-card">
              <h2 className="cs-heading">Analysis for Case ID: 12556</h2>
              <div className="cs-summary-grid">
                <div className="cs-summary-item"><strong>Case Type:</strong> Property Dispute</div>
                <div className="cs-summary-item"><strong>Filed:</strong> Jan 15, 2023</div>
                <div className="cs-summary-item"><strong>Hearing Date:</strong> Apr 10, 2023</div>
                <div className="cs-summary-item"><strong>Status:</strong> Under Review</div>
              </div>
            </div>

            <div className="cs-card glow-card">
              <h3 className="cs-section-title">🛑 Areas for Improvement</h3>
              <div className="cs-card-list">
                <div className="cs-mini-card red-card hover-grow">
                  <h5>Missing Witness Statement</h5>
                  <p>Document 38 is missing. Obtain affidavit from Mr. Sharma.</p>
                </div>
                <div className="cs-mini-card red-card hover-grow">
                  <h5>Incomplete Property Report</h5>
                  <p>Valuation certificate outdated — needs re-verification.</p>
                </div>
                <div className="cs-mini-card red-card hover-grow">
                  <h5>Unsupported Claim Section 12A</h5>
                  <p>Additional evidence required to support the current filing.</p>
                </div>
              </div>
            </div>

            <div className="cs-card glow-card">
              <h3 className="cs-section-title">✅ Key Strengths</h3>
              <div className="cs-card-list">
                <div className="cs-mini-card green-card hover-grow">
                  <h5>Strong Precedent Found</h5>
                  <p>Case #145 strongly supports your legal position.</p>
                </div>
                <div className="cs-mini-card green-card hover-grow">
                  <h5>Complete Witness Set</h5>
                  <p>All statements verified & consistent with filed evidence.</p>
                </div>
                <div className="cs-mini-card green-card hover-grow">
                  <h5>High Evidence Integrity</h5>
                  <p>No tampering or inconsistencies detected.</p>
                </div>
              </div>
            </div>
          </main>

          {/* RIGHT */}
          <aside className="cs-right">
            <div className="cs-card glow-card right-card">
              <h3 className="cs-card-title">⏳ Case Timeline</h3>
              <ol className="cs-timeline">
                <li className="timeline-item"><strong>Filed:</strong> Jan 15, 2023</li>
                <li className="timeline-item"><strong>Evidence Submitted:</strong> Feb 20, 2023</li>
                <li className="timeline-item active-timeline"><strong>Hearing Date:</strong> Apr 10, 2023</li>
                <li className="timeline-item"><strong>Judgement Date (est):</strong> May 5, 2023</li>
              </ol>
            </div>

            <div className="cs-card glow-card right-card">
              <h3 className="cs-card-title">🚀 Actions</h3>
              <div className="cs-actions-grid">
                <button className="cs-btn cs-btn-blue hover-shift">Export Report</button>
                <button className="cs-btn cs-btn-green hover-shift">Generate Report</button>
                <button className="cs-btn cs-btn-orange hover-shift">Run Predictive Model</button>
              </div>
            </div>

            <div className="cs-card glow-card right-card">
              <h3 className="cs-card-title">🔔 Notifications</h3>
              <ul className="cs-notifs">
                <li className="cs-notif cs-notif-warning hover-pulse">Deadline approaching for affidavit submission</li>
                <li className="cs-notif cs-notif-info hover-pulse">New precedent case added to database</li>
                <li className="cs-notif cs-notif-success hover-pulse">Evidence verification completed</li>
              </ul>
            </div>
          </aside>
        </div>

        <footer className="cs-footer-note">
          *Mockup data demonstration purposes only. AI analysis is simulated.
        </footer>
      </div>

      <Footer />
    </div>
  );
}