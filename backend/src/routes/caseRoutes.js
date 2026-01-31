// routes/caseRoutes.js

const express = require('express');
const multer = require('multer');
const {
  uploadCaseDocument,
  getCaseSummary,
  searchSimilarCases
} = require('../controllers/caseController');

const router = express.Router();

// Configure multer for file storage
const upload = multer({ dest: 'uploads/' });

// POST /api/cases/upload
router.post('/upload', upload.single('document'), uploadCaseDocument);

// GET /api/cases/:caseId/summary
router.get('/:caseId/summary', getCaseSummary);

// POST /api/cases/search
router.post('/search', searchSimilarCases);

module.exports = router;