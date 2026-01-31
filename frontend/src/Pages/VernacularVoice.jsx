import React, { useState } from "react";
import Footer from "../components/Footer";
import './VernacularVoice.css'; // <-- new CSS import
import { FaArrowLeft } from 'react-icons/fa'; // Only if you plan to use icons

const VernacularVoiceInterface = () => {
  const [isListening, setIsListening] = useState(false);
  const [inputText, setInputText] = useState("");
  const [outputResponse, setOutputResponse] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("Hindi");

  const [history, setHistory] = useState([
    {
      type: "ai",
      text: "नमस्ते। मैं NyayaManch AI हूँ। कृपया अपनी केस जानकारी या कानूनी प्रश्न पूछें।",
      translation: "Hello. I am NyayaManch AI. Please state your case information or legal query.",
    },
  ]);

  const languages = ["Hindi", "Telugu", "Tamil", "Marathi", "Bengali"];

  const toggleListening = () => {
    const languageMap = {
      "Hindi": {
        query: "केस संख्या 121556 में देरी क्यों हो रही है?",
        response: "आपकी केस संख्या 121556 में 4 महीने का अनुमानित विलंब है। इसका मुख्य कारण प्रतिवादी द्वारा दस्तावेज़ जमा करने में हुई देरी है।",
        translation: "Your case number 121556 has an estimated delay of 4 months. The primary reason is the delay in submitting documents by the respondent.",
      },
      "Telugu": {
        query: "కేసు సంఖ్య 121556లో ఆలస్యం ఎందుకు అవుతోంది?",
        response: "మీ కేసు సంఖ్య 121556లో 4 నెలల వరకు ఆలస్యం కావచ్చు. దీనికి ప్రధాన కారణం ప్రతివాది పత్రాలను సమర్పించడంలో ఆలస్యం చేయడం.",
        translation: "Your case number 121556 has an estimated delay of 4 months. The primary reason is the delay in submitting documents by the respondent.",
      },
      "Tamil": {
        query: "வழக்கு எண் 121556ல் ஏன் தாமதம் ஏற்படுகிறது?",
        response: "உங்கள் வழக்கு எண் 121556-ல் 4 மாதங்கள் தாமதம் ஏற்பட வாய்ப்புள்ளது. இதற்குக் காரணம் பிரதிவாதி ஆவணங்களைச் சமர்ப்பிப்பதில் தாமதம் செய்வதுதான்.",
        translation: "Your case number 121556 has an estimated delay of 4 months. The primary reason is the delay in submitting documents by the respondent.",
      },
      "Marathi": {
        query: "केस क्रमांक 121556 मध्ये विलंब का होत आहे?",
        response: "तुमच्या केस क्रमांक 121556 मध्ये 4 महिन्यांचा अंदाजित विलंब आहे. याचे मुख्य कारण प्रतिवादीने कागदपत्रे जमा करण्यास विलंब केला आहे.",
        translation: "Your case number 121556 has an estimated delay of 4 months. The primary reason is the delay in submitting documents by the respondent.",
      },
      "Bengali": {
        query: "কেস নম্বর 121556-এ কেন দেরি হচ্ছে?",
        response: "আপনার কেস নম্বর 121556-এ প্রায় 4 মাস বিলম্ব হতে পারে। এর প্রধান কারণ হল বিবাদী কর্তৃক নথি জমা দিতে দেরি হওয়া।",
        translation: "Your case number 121556 has an estimated delay of 4 months. The primary reason is the delay in submitting documents by the respondent.",
      },
    };

    const defaultEntry = {
      query: "Why is there a delay in case number 121556?",
      response: "Simulation failed to load vernacular response for this language.",
      translation: "Simulation failed to load vernacular response for this language.",
    };

    const currentLangData = languageMap[selectedLanguage] || defaultEntry;

    if (!isListening) {
      setInputText("");
      setOutputResponse("Listening...");

      setTimeout(() => {
        const { query, response, translation } = currentLangData;
        setInputText(query);
        setOutputResponse("Translating and Processing...");

        setTimeout(() => {
          setHistory((prev) => [
            ...prev,
            { type: "user", text: query, translation: translation },
            { type: "ai", text: response, translation: translation },
          ]);
          setOutputResponse("Query Resolved.");
          setIsListening(false);
        }, 2500);
      }, 2000);
    } else {
      setOutputResponse("Stopped. Please try again.");
    }
    setIsListening(!isListening);
  };

  return (
    <div className="vvi-page">
      <div className="vvi-container">
        <div className="vvi-headerSection">
          <h1 className="vvi-title">🎙️ Nyaya Vani: Vernacular & Voice Interface</h1>
          <p className="vvi-subtitle">
            Seamlessly interact with NyayaManch AI using voice commands and your preferred native language.
          </p>
        </div>

        <div className="vvi-contentGrid">
          {/* LEFT: Conversation History Panel */}
          <div className="vvi-historyPanel">
            <h3 className="vvi-historyHeader">AI Conversation Log</h3>
            <div className="vvi-messageList">
              {history.map((msg, index) => (
                <div
                  key={index}
                  className={`vvi-message ${msg.type === "user" ? "vvi-userMessage" : "vvi-aiMessage"}`}
                >
                  <div className="vvi-vernacularText">{msg.text}</div>
                  <div className="vvi-translationText">— {msg.translation}</div>
                </div>
              ))}
              {isListening && inputText === "" && (
                <div className="vvi-message vvi-aiMessage vvi-processing">
                  <div className="vvi-vernacularText">Processing query...</div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Voice Control Panel */}
          <div className="vvi-controlPanel">
            <label htmlFor="language-select" className="vvi-label">1. Select Vernacular Language</label>
            <select
              id="language-select"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="vvi-languageSelect"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>

            <label className="vvi-label">2. Tap to Speak Your Query</label>

            <div className="vvi-micButtonWrapper">
              <div className={`vvi-pulseRing ${isListening ? "active" : ""}`}></div>
              <div
                className={`vvi-micButton ${isListening ? "listening" : ""}`}
                onClick={toggleListening}
              >
                {isListening ? "🛑" : "🎤"}
              </div>
            </div>

            <div className="vvi-statusDisplay">
              {isListening ? `Recording in ${selectedLanguage}...` : outputResponse || "Ready for voice command."}
            </div>

            <h4 className="vvi-subtitleControl">3. AI Transcription Input</h4>
            <textarea
              readOnly
              value={inputText || "Speak into the microphone to see the real-time transcription here..."}
              className="vvi-textArea"
            />
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default VernacularVoiceInterface;
