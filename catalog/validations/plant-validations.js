const { body } = require('express-validator');

const Plant = require('../models/plant');

const plantValidationRules = () => {
  const fieldToValidate = ['species', 'plantationType', 'plantationDate'];
  return fieldToValidate.map(el => {
    if (el === 'species') {
      return body(el)
        .trim()
        .not()
        .isEmpty()
        .withMessage(`${el} cannot be empty.`)
        .custom((value, { req }) => {
          return Plant.where({ 
              species: value,
              variety: req.body.variety
            })
            .then(plant => {
              if (plant.length > 0) {
                return Promise.reject('A plant with this name/variety already exists.');
              }
            });
        });
    } else {
      return body(el)
        .trim()
        .notEmpty()
        .withMessage(`${el} cannot be empty.`)
    }
  });
};

module.exports = plantValidationRules;