const express = require('express');
const { getProfile, upsertProfile, deleteProfile } = require('../controllers/profile.controller');
const authenticateJWT = require('../middleware/authenticateJWT');
const router = express.Router();

// Routes for profile
router.get('/', authenticateJWT, getProfile);  // Get profile
router.post('/', authenticateJWT, upsertProfile);  // Create or update profile
router.delete('/', authenticateJWT, deleteProfile);  // Delete profile

module.exports = router;
