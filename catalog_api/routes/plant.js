const express = require('express');

const router = express.Router();

const plantController = require('../controllers/plant');
const uploadImage = require('../middleware/uploadImage');
const resizeImage = require('../middleware/resizeImage');
const isAuth = require('../middleware/is-auth');
const plantValidationRules = require('../validations/plant-validations');
const validate = require('../validations/validate');

router.get('/plants', plantController.getPlants);

router.post(
  '/plants',
  isAuth,
  plantValidationRules(),
  validate,
  uploadImage,
  resizeImage,
  plantController.createPlant
);

router.get('/plants/:plantId', plantController.getPlant);

router.put(
  '/plants/:plantId',
  isAuth,
  plantValidationRules(),
  validate,
  uploadImage,
  resizeImage,
  plantController.updatePlant
);

router.delete(
  '/plants/:plantId',
  isAuth,
  plantController.deletePlant
);

module.exports = router;