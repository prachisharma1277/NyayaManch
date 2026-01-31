import { UploadCloud, FolderOpen, Timer, FileText } from "lucide-react";
import "./Dashboard.css";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Pass the actual file object to the next page
    navigate("/summarizer", { state: { uploadedFile: file } });
  };

  const triggerUpload = () => {
    document.getElementById("hidden-file-input").click();
  };

  // ... (Rest of your JSX/return statement remains exactly the same as you posted) ...
  return (
    <div>
      <div className="db-wrapper">
        <div className="db-topbar">
          <h2 className="db-title">⚖️ Dashboard</h2>
          <span className="db-status">
            AI Model Status: <span className="status-online">Online</span>
          </span>
        </div>

        {/* ==== Upload New Case ==== */}
        <input
          id="hidden-file-input"
          type="file"
          accept="application/pdf"
          style={{ display: "none" }}
          onChange={handleFileUpload}
        />

        <div className="db-upload-card glow-card" onClick={triggerUpload}>
          <UploadCloud size={40} className="db-upload-icon" />
          <div>
            <h3 className="db-upload-title">Upload New Case</h3>
            <p className="db-upload-desc">
              Upload FIR / Evidence / Judgement PDFs
            </p>
          </div>
        </div>

        {/* 🌟 Stats Row */}
        <div className="db-stats-row">
          <div className="db-stat-card glow-card">
            <FolderOpen size={26} />
            <div>
              <h4>Total Cases</h4>
              <p className="db-stat-number">142</p>
            </div>
          </div>

          <div className="db-stat-card glow-card">
            <Timer size={26} />
            <div>
              <h4>Avg Delay Forecast</h4>
              <p className="db-stat-number">32 Days</p>
            </div>
          </div>

          <div className="db-stat-card glow-card">
            <FileText size={26} />
            <div>
              <h4>Reports Generated</h4>
              <p className="db-stat-number">58</p>
            </div>
          </div>
        </div>

        {/* 🌟 My Cases */}
        <h3 className="db-section-title">📁 My Cases</h3>
        <div className="db-case-list">
          <div className="db-case-card glow-card">
            <h4>Case ID: 123456 — Sharma vs. Singh</h4>
            <p>Last Updated: Nov 15, 2024</p>
            <span className="db-case-status">Status: Under Review</span>
          </div>
          <div className="db-case-card glow-card">
            <h4>Case ID: 145987 — Deshmukh vs. Tiwari</h4>
            <p>Last Updated: Oct 08, 2024</p>
            <span className="db-case-status">Status: Hearing Scheduled</span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}