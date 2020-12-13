const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const validationErrors = validationResult(req);
  if(validationErrors.isEmpty()) return next();

  const extractedErrors = [];
  validationErrors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
  const error = new Error('Validation failed, entered data is incorrect.');
  error.statusCode = 422;
  error.data = extractedErrors;
  return next(error);
};

module.exports = validate;