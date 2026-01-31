const router = require('express').Router();
const multer = require('multer');
const pdfExtraction = require('pdf-extraction');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', upload.single('file'), async (req, res) => {
    try {
        // --- LOOK FOR THIS MESSAGE IN YOUR TERMINAL ---
        console.log("--- 🔵 SWITCHING TO MODEL: GEMINI-PRO 🔵 ---");

        if (!req.file) return res.status(400).json({ message: "No file uploaded" });

        const data = await pdfExtraction(req.file.buffer);
        const originalText = data.text;

        if (!process.env.GEMINI_API_KEY) {
             throw new Error("GEMINI_API_KEY is missing");
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        
        // WE ARE FORCING 'gemini-pro' HERE
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        
        const result = await model.generateContent(`Summarize this:\n${originalText.substring(0, 15000)}`);
        const response = await result.response;
        
        console.log("✅ SUCCESS! Summary Generated.");
        res.json({ originalText, summary: response.text() });

    } catch (err) {
        console.error("❌ ERROR:", err.message);
        // If the error contains "404", it means the model name is wrong or key is bad
        res.status(500).json({ message: "Server Error", details: err.message });
    }
});

module.exports = router;