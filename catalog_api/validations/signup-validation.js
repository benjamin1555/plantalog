const { body } = require('express-validator');

const User = require('../models/user');

const signupValidationRules = () => {
  return [
    body('email')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Email cannot be empty.')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ email: value })
          .then(userDoc => {
            if (userDoc) {
              return Promise.reject('This email is already taken.');
            }
          });
      }),
    body('username')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Username cannot be empty.')
      .custom((value, { req }) => {
        return User.findOne({ username: value })
          .then(userDoc => {
            if (userDoc) {
              return Promise.reject('This username is already taken.');
            }
          });
      }),
    body('password', 'Password must be at least 8 characters long, contains at least a number and an uppercase letter.')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Password cannot be empty.')
      .custom((value, { req }) => {
        if (!/\d/.test(value) || !/[A-Z]/.test(value) || value.length < 8) {
          throw new Error;
        }
        return true;
      })
  ];
};

module.exports = signupValidationRules;