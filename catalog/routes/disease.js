const express = require('express');

const router = express.Router();

const diseaseController = require('../controllers/disease');
const resizeImage = require('../middleware/resizeImage');
const isAuth = require('../middleware/is-auth');
const diseaseValidationRules = require('../validations/disease-validations');
const validate = require('../validations/validate');

router.get('/diseases', diseaseController.getDiseases);

router.post(
  '/diseases',
  isAuth,
  diseaseValidationRules(),
  validate,
  resizeImage,
  diseaseController.createDisease
);

router.get('/diseases/:diseaseId', diseaseController.getDisease);

router.put(
  '/diseases/:diseaseId',
  isAuth,
  diseaseValidationRules(),
  validate,
  resizeImage,
  diseaseController.updateDisease
);

router.delete(
  '/diseases/:diseaseId',
  isAuth,
  diseaseController.deleteDisease
);

module.exports = router;