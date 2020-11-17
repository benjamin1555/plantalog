const express = require('express');

const authController = require('../controllers/auth');
const signupValidationRules = require('../validations/signup-validation');
const validate = require('../validations/validate');

const router = express.Router();

router.post('/signup', signupValidationRules(), validate, authController.signup);

router.post('/login', authController.login);

module.exports = router;