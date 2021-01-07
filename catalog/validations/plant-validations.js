const { body } = require('express-validator');

const Plant = require('../models/plant');

const plantValidationRules = () => {
  return [
    body('species')
    .trim()
    .notEmpty()
    .withMessage(`Species cannot be empty.`)
    .custom((value, { req }) => {
      return Plant.find({
          species: value,
          variety: req.body.variety
        })
        .then(plant => {
          if (plant.length > 0) {
            if (req.method === 'PUT' && plant[0]._id.toString() !== req.body._id.toString()) {
              return Promise.reject('Cannot update plant: a plant with this name/variety already exists.');
            } else {
              return Promise.reject('Cannot update plant: a plant with this name/variety already exists.');
            }
          }
        });
      }),
    body('plantationType')
      .trim()
      .notEmpty()
      .withMessage(`Plantation type cannot be empty.`),
    body('plantationDateStart')
      .custom(value => dateValidation(value, 'Start')),
    body('plantationDateEnd')
      .custom(value => dateValidation(value, 'End'))
  ]
};

const dateValidation = (value, type) => {
  const dateFormat = new RegExp(/\d{4}(-\d{2}){2}/);
  if (!value) {
    throw new Error(`${type} plantation date cannot be empty.`);
  }
  if (!dateFormat.test(value)) {
    throw new Error(`${type} plantation date must use YYYY-MM-DD format.`);
  }
  return true;
}

module.exports = plantValidationRules;