import React, { useState, useEffect } from "react";
import "./JudgementSummarizer.css";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

export default function Summarizer() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [originalText, setOriginalText] = useState("");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");

  // Get the file passed from Dashboard
  const uploadedFile = location.state?.uploadedFile;

  useEffect(() => {
    if (uploadedFile) {
      processFile(uploadedFile);
    }
  }, [uploadedFile]);

  const processFile = async (file) => {
    setIsProcessing(true);
    setError("");
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Call your backend API
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/summarize`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setOriginalText(res.data.originalText);
      setSummary(res.data.summary);
      
    } catch (err) {
      console.error("Error processing file:", err);
      setError("Failed to process the document. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // If no file was uploaded, show a message or redirect
  if (!uploadedFile) {
    return (
      <div className="sum-wrapper error-state">
         <h2>No file selected</h2>
         <button onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
      </div>
    );
  }

  // Helper to format the long text for display
  const renderText = (text) => {
    if (!text) return null;
    return text.split('\n').filter(line => line.trim() !== '').map((line, i) => (
       <p key={i} className="sum-original-line">
         <span className="index">{i + 1}.</span> {line}
       </p>
    ));
  };

  // Helper to format markdown-style bolding from AI (**text**)
  const renderSummary = (text) => {
      // Simple regex to replace **bold** with <strong>bold</strong>
      const parts = text.split(/(\*\*.*?\*\*)/g);
      return parts.map((part, index) => {
          if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={index}>{part.slice(2, -2)}</strong>;
          }
          return part;
      });
  };

  return (
    <div className="sum-wrapper">
      <header className="sum-topbar">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
            <ArrowLeft size={20} /> Back
        </button>
        <h2 className="sum-title">
           Processing: <span className="case-id">{uploadedFile.name}</span>
        </h2>
      </header>

      {error && <div className="error-banner">{error}</div>}

      <div className="sum-content-grid">
          
          {/* LEFT: Original Document */}
          <div className="sum-card glow-card">
            <h3 className="sum-heading">📄 Original Document Text</h3>
            <div className="sum-original-box">
              {isProcessing && !originalText ? (
                 <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Extracting text from PDF...</p>
                 </div>
              ) : (
                 renderText(originalText)
              )}
            </div>
          </div>

          {/* RIGHT: AI Summary */}
          {summary || isProcessing ? (
            <div className="sum-card glow-card ai-result">
                <h3 className="sum-heading">✨ NyayaManch AI Summary</h3>
                <div className="sum-summary-box">
                    {isProcessing ? (
                        <div className="loading-state">
                            <div className="spinner"></div>
                            <p>AI is analyzing legal arguments...</p>
                        </div>
                    ) : (
                        <div className="sum-summary-text">
                            {summary.split('\n').map((line, i) => (
                                <p key={i}>{renderSummary(line)}</p>
                            ))}
                        </div>
                    )}
                </div>
            </div>
          ) : null}

      </div>
      <Footer />
    </div>
  );
}