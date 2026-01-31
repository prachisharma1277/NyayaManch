require('dotenv').config(); // Load your .env file
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function checkAvailableModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error("❌ ERROR: No API Key found in .env file");
    return;
  }

  console.log("-----------------------------------------");
  console.log("🔑 Testing API Key:", apiKey.substring(0, 10) + "...");
  console.log("-----------------------------------------");

  const genAI = new GoogleGenerativeAI(apiKey);

  try {
    // This is the specific function to see what you have access to
    // Note: The Node SDK for this is slightly different than Python.
    // We sometimes have to rely on a raw request if the SDK version mismatches.
    // Let's try a direct simple generation first to see if *anything* works.
    
    // We will try to list models manually since the helper might vary by version
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    console.log("... Attempting to contact Google AI servers ...");

    // 1. Try a basic ping
    const result = await model.generateContent("Hello, are you online?");
    const response = await result.response;
    
    console.log("✅ SUCCESS! The model 'gemini-1.5-flash' IS working.");
    console.log("Response:", response.text());

  } catch (error) {
    console.error("❌ FAILED. Error Details:");
    console.error(error.message);
    
    if (error.message.includes("404")) {
      console.log("\n--- DIAGNOSIS ---");
      console.log("A 404 error usually means:");
      console.log("1. The model name is slightly wrong for your region.");
      console.log("2. Your API Key is valid, but the 'Generative Language API' is NOT enabled in Google Cloud.");
      console.log("3. You are using an old 'Vertex AI' project key instead of an 'AI Studio' key.");
    }
  }
}

checkAvailableModels();