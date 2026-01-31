import React, { useState } from "react";
import "./SimilarCaseFinder.css"; // Import external CSS
import Footer from "../components/Footer";
const initialCasesData = [
  {
    title: "Ramesh Kumar vs. State of Punjab",
    caseId: "9313/2013",
    description: "Involved issues of land acquisition and compensation under 2013 Act.",
    court: "Supreme Court",
    relevanceScore: 92,
  },
  {
    title: "Ramesh Sharma vs. State of Maharashtra",
    caseId: "3315/2022",
    description: "Similar facts regarding judicial review of administrative order.",
    court: "Bombay High Court",
    relevanceScore: 88,
  },
  {
    title: "Smt. Sia Devi vs. State of Bihar",
    caseId: "31112/2057",
    description: "Precedent established for Section 498A IPC interpretation.",
    court: "Patna High Court",
    relevanceScore: 79,
  },
  {
    title: "Virendra Singh vs. Union of India",
    caseId: "12118/2025",
    description: "Constitutionality challenge to tax amendment (Section 12A).",
    court: "Delhi High Court",
    relevanceScore: 65,
  },
  {
    title: "Union of India vs. Global Tech Ltd.",
    caseId: "12122/2024",
    description: "Key ruling on digital evidence and admissibility under IT Act.",
    court: "Supreme Court",
    relevanceScore: 95,
  },
  {
    title: "Smt. Sita Devi vs. Union of India II",
    caseId: "12192/2005",
    description: "Landmark case on environmental liability and corporate responsibility.",
    court: "National Green Tribunal",
    relevanceScore: 55,
  },
  {
    title: "Rajiv Menon vs State of Delhi",
    caseId: "4501/2023",
    description: "Civil suit involving breach of contract and specific performance.",
    court: "Delhi District Court",
    relevanceScore: 82,
  },
  {
    title: "BCCI vs. Revenue Department",
    caseId: "1001/2021",
    description: "Taxation matter related to sports bodies' income classification.",
    court: "Income Tax Appellate Tribunal",
    relevanceScore: 71,
  },
];

// Helper function to get color based on relevance score
const getScoreColor = (score) => {
    if (score >= 90) return '#4CAF50'; // High: Green
    if (score >= 75) return '#FFEB3B'; // Medium: Yellow
    return '#FF9800'; // Low/Moderate: Orange
};

export default function SimilarCaseFinder() {
  const [searchTerm, setSearchTerm] = useState(
    "theft, fraudulent documentation, procedural irregularities"
  );
  const [cases, setCases] = useState(initialCasesData);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    // In a real application, you would send 'searchTerm' to your backend API here
    // For the demo, we just ensure all cases are shown and maybe slightly re-order (optional)
    setCases([...initialCasesData].sort((a, b) => b.relevanceScore - a.relevanceScore));
  };

  return (
    <div className="scf-wrapper">
      <header className="scf-header">
        <h1 className="scf-title">
          <span className="scf-icon">⚖️</span>
          NyayaManch <span className="scf-subtitle">Similar Case Finder</span>
        </h1>
        <p className="scf-tagline">AI-powered legal research for relevant precedents.</p>
      </header>

      <section className="scf-search-area">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Enter legal facts, sections, or keywords..."
          className="scf-input"
        />
        <button onClick={handleSearchClick} className="scf-button">
          Find Cases
        </button>
      </section>

      <section className="scf-results">
        <p className="scf-results-info">
          Showing {cases.length} relevant precedents (sorted by AI Relevance Score)
        </p>
        
        <div className="scf-case-grid">
          {cases.map(({ title, caseId, description, court, relevanceScore }, idx) => (
            <div
              key={idx}
              className="scf-case-card glow-card"
            >
              <div className="scf-card-header">
                  <span className="scf-relevance-score" style={{ backgroundColor: getScoreColor(relevanceScore) }}>
                    {relevanceScore}%
                  </span>
                  <p className="scf-court">{court}</p>
              </div>
              
              <h3 className="scf-case-title">{title}</h3>
              <small className="scf-case-id">{caseId}</small>
              <p className="scf-case-description">{description}</p>
              
              <button className="scf-view-details">
                View Details →
              </button>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}