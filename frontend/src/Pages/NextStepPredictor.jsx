import React from "react";
import "./NextStepPredictor.css";
import Footer from "../components/Footer";

// --- Mock Data ---
const caseData = {
  id: "WP(C) 121556/2025",
  title: "A.R. Sharma vs. Union of India & Ors.",
  court: "High Court of Delhi",
  lastAction: "Respondent filed Counter Affidavit (Due Date: Nov 15)",
  mainRecommendation: "File Rejoinder and Interlocutory Application for Directions",
  recommendationRationale:
    "Immediate procedural compliance is required. The AI model assigns a 92% procedural strength to the Petitioner's current standing, but this advantage is time-bound. Filing the Rejoinder and a motion for early listing will preempt further delay tactics by the Respondent.",
  delayInMonths: 4,
  adjournmentRisk: 68,
  urgencyDaysRemaining: 14,
  nextHearing: "Dec 1, 2025 (Regular Board)",
  evidenceCompleteness: 94,
  keyTasks: [
    "Finalize draft Rejoinder Affidavit in response to C.A. (Due: Nov 26).",
    "Prepare Index of Documents and list of Authorities.",
    "Draft I.A. for Directions regarding the status of contested Annexure B.",
  ],
  riskMitigation: [
    "The model flags the ambiguity in the Deed of Sale date (Doc-3B) as a potential defense point.",
    "Prepare witness statement for cross-examination regarding jurisdictional query.",
  ],
};

// --- Utility Function ---
const getMetricColor = (value, highIsBad = false) => {
  const CRITICAL = "#f44336";
  const WARNING = "#FF9800";
  const SUCCESS = "#00d1c1";
  const ACCENT = "#58a6ff";

  if (highIsBad) {
    if (value >= 70) return CRITICAL;
    if (value >= 50) return WARNING;
    return SUCCESS;
  } else {
    if (value >= 90) return SUCCESS;
    if (value >= 70) return ACCENT;
    return WARNING;
  }
};

const NextStepPredictorPage = () => {
  return (
    <div className="page">
      <div className="mainContent">
        <header className="header">Predictive Analysis</header>
        <p className="subHeader">
          Procedural Forecast for: {caseData.title} ({caseData.id})
        </p>

        <div className="contentContainer">
          {/* LEFT COLUMN */}
          <div className="leftColumn">
            <div className="card mainRecommendationCard">
              <div className="cardTitle">
                ★ JUDICIAL PROCEDURE RECOMMENDATION
              </div>
              <h2>{caseData.mainRecommendation}</h2>
              <p>
                <strong>AI Analysis Rationale:</strong>{" "}
                {caseData.recommendationRationale}
              </p>
              <div className="proceduralStrength">Procedural Strength: 92%</div>
              <button className="actionButton">
                Initiate Document Drafting →
              </button>
            </div>

            <div className="card">
              <div className="cardTitle">📋 NEXT PHASE COMPLIANCE CHECKLIST</div>
              <ul className="taskList">
                {caseData.keyTasks.map((task, idx) => (
                  <li key={idx} className="taskItem">
                    ✓ {task}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card">
              <div className="cardTitle critical">
                🛑 CRITICAL RISK MITIGATION ACTIONS
              </div>
              <ul className="taskList">
                {caseData.riskMitigation.map((task, idx) => (
                  <li key={idx} className="taskItem critical">
                    ! {task}
                  </li>
                ))}
              </ul>
              <p className="detailText italic">
                *Address these before the Dec 1 hearing.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="rightColumn">
            <div className="card">
              <p className="cardTitle">⚖️ CASE PARTICULARS</p>
              <div className="summaryRow">
                <p className="detailText">Case ID:</p>
                <p className="detailText bold">{caseData.id}</p>
              </div>
              <div className="summaryRow">
                <p className="detailText">Jurisdiction:</p>
                <p className="detailText bold">{caseData.court}</p>
              </div>
              <div className="summaryRow">
                <p className="detailText">Last Recorded Action:</p>
                <p className="detailText bold">{caseData.lastAction}</p>
              </div>
              <div className="summaryRow">
                <p className="detailText">Next Listing Date:</p>
                <p className="detailText warning">{caseData.nextHearing}</p>
              </div>
            </div>

            <div className="card metricCard">
              <p className="cardTitle">ADJOURNMENT PROBABILITY</p>
              <div
                className="metricValue"
                style={{
                  color: getMetricColor(caseData.adjournmentRisk, true),
                }}
              >
                {caseData.adjournmentRisk}%
              </div>

              <div className="metricBarContainer">
                <div
                  className="metricBarFill"
                  style={{
                    width: `${caseData.adjournmentRisk}%`,
                    backgroundColor: getMetricColor(
                      caseData.adjournmentRisk,
                      true
                    ),
                  }}
                ></div>
              </div>
            </div>

            <div className="card metricCard">
              <p className="cardTitle">DOCUMENT COMPLETENESS</p>
              <div
                className="metricValue"
                style={{
                  color: getMetricColor(caseData.evidenceCompleteness),
                }}
              >
                {caseData.evidenceCompleteness}%
              </div>

              <div className="metricBarContainer">
                <div
                  className="metricBarFill"
                  style={{
                    width: `${caseData.evidenceCompleteness}%`,
                    backgroundColor: getMetricColor(
                      caseData.evidenceCompleteness
                    ),
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <p className="detailText note" style={{ textAlign: "center" }}>
          The <strong>NyayaManch Predictive Module</strong> provides automated
          procedural alerts. All predictions must be validated by legal counsel.
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default NextStepPredictorPage;

