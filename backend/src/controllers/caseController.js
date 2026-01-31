// controllers/caseController.js

const fs = require('fs');
const pdf = require('pdf-parse');
const { OpenAI } = require('openai');

// --- Conditional OpenAI Initialization ---
let openai = null;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (OPENAI_API_KEY) {
  try {
    // Initialize only if the key is found in the environment variables
    openai = new OpenAI({ apiKey: OPENAI_API_KEY });
    console.log("OpenAI client successfully initialized.");
  } catch (e) {
    console.error("Failed to initialize OpenAI client despite key presence.", e);
  }
} else {
  console.warn("⚠️ WARNING: OPENAI_API_KEY is missing. AI features will use mock data.");
}
// ------------------------------------------


// --- Mock Case Data Store (for temporary storage) ---
let cases = [];
let caseIdCounter = 1;

// Helper to remove temporary uploaded files
const cleanupFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) console.error(`Failed to delete temporary file: ${filePath}`, err);
  });
};

// ===============================================
// 1. Judgement Summarizer Logic (POST /api/cases/upload)
// ===============================================
const uploadCaseDocument = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No document file uploaded.' });
  }

  const filePath = req.file.path;
  const fileName = req.file.originalname;

  try {
    // 1. Extract Text from PDF 
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    const rawText = data.text;
    
    let summary;

    if (openai) {
        // --- REAL AI LOGIC (Runs only if key is loaded) ---
        const textToSummarize = rawText.substring(0, 15000);
        const prompt = `You are an expert legal assistant... JUDGEMENT TEXT: \n\n ${textToSummarize}`; // Simplified prompt for brevity

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
        });
        summary = completion.choices[0].message.content;

    } else {
        // --- MOCK AI LOGIC (Runs if key is missing) ---
        summary = `
        [MOCK SUMMARY - OpenAI Service Unavailable]

        1. **Core Dispute:** This case involved a mock dispute over intellectual property rights.
        2. **Final Ruling:** The Court decided in favor of the claimant.
        3. **Next Steps:** The losing party has 30 days to file an appeal.
        `;
    }
    
    // 2. Save Case to Mock Database
    const newCase = {
      id: caseIdCounter++,
      fileName: fileName,
      rawText: rawText,
      summary: summary,
      createdAt: new Date()
    };
    cases.push(newCase);

    res.status(200).json({
      message: openai ? 'Document processed successfully.' : 'Document processed successfully (Mock Summary).',
      caseId: newCase.id,
      summary: summary,
    });
  } catch (error) {
    console.error('Processing Error:', error.message);
    res.status(500).json({ message: 'Failed to process document.', error: error.message });
  } finally {
    cleanupFile(filePath);
  }
};

// ===============================================
// 2. Similar Case Finder Logic (POST /api/cases/search)
// ===============================================
const searchSimilarCases = async (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ message: 'A search query is required.' });
  }

  // --- MOCK DATA RETURN ---
  // Always returns mock results for simplicity, regardless of key presence
  const mockSimilarCases = [
    { id: 101, title: 'MOCK RESULT 1 - Constitutional Law', similarity: '98%', court: 'Supreme Court' },
    { id: 102, title: 'MOCK RESULT 2 - Property Dispute', similarity: '92%', court: 'High Court' },
  ];

  res.status(200).json({
    message: `Successfully found mock similar cases for the query: "${query}"`,
    results: mockSimilarCases,
  });
};

// ===============================================
// 3. Simple Retrieve Case Summary (GET /api/cases/:caseId/summary)
// ===============================================
const getCaseSummary = (req, res) => {
  const caseId = parseInt(req.params.caseId);
  const foundCase = cases.find(c => c.id === caseId);

  if (!foundCase) {
    return res.status(404).json({ message: `Case with ID ${caseId} not found. Process a document first.` });
  }

  res.status(200).json({
    caseId: foundCase.id,
    fileName: foundCase.fileName,
    summary: foundCase.summary,
    delayForecast: { likelihood: 'MOCKED: 45%', factor: 'Judge Unavailability (Mock)' },
    nextStep: 'MOCKED: Consult a lawyer to file an appeal within 90 days.' 
  });
};

module.exports = {
  uploadCaseDocument,
  getCaseSummary,
  searchSimilarCases,
};