const express = require('express');
const router = express.Router();
const { Register, Login } = require('../controllers/auth.controller');
const {
  ValidateCreateUserRequest,
  ValidateGetUserRequest,
} = require('../middleware/validationRequest');
const authenticateToken = require('../middleware/auth');

router.post('/register', ValidateCreateUserRequest, Register);
router.post('/login', ValidateGetUserRequest, Login);
router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route.', user: req.user });
});

module.exports = router;
