const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// 1. Create a function that handles the connection
const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return; // Already connected
    
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connected');
    } catch (err) {
        console.error('❌ DB Connection Error:', err);
        // On Vercel, we want to see the error in logs but not crash the whole function
    }
};

// 2. IMPORTANT: Use a middleware to ensure connection on every request
app.use(async (req, res, next) => {
    await connectDB();
    next();
});

// Your Routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/summarize', require('./src/routes/summarize'));

// 3. Conditional listening
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
