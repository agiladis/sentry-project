const express = require('express');
const router = express.Router();
const { Register } = require('../controllers/user.controller');
const {
  ValidateCreateUserRequest,
} = require('../middleware/validationRequest');

router.post('/register', ValidateCreateUserRequest, Register);

module.exports = router;
