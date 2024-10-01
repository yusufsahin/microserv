const express = require('express');
const { signUp, signIn } = require('../controllers/auth.controller');
const router = express.Router();

// Public routes (no JWT required)
router.post('/signup', signUp);
router.post('/signin', signIn);

// You can add more protected routes with JWT later

module.exports = router;
