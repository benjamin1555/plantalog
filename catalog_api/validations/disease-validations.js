const { body } = require('express-validator');

const Disease = require('../models/disease');

const diseaseValidationRules = () => {
  const fieldsToValidate = ['name', 'symptoms', 'treatment'];
  return fieldsToValidate.map(el => {
    return body(el, `${el} cannot be empty.`)
            .trim()
            .not()
            .isEmpty()
            .custom((value, { req }) => {
              return Disease.findOne({ name: value })
                .then(disease => {
                  if (disease && (req.route.methods.post || disease._id.toString() !== req.params.diseaseId.toString())) {
                    return Promise.reject('A disease with this name already exists.');
                  }
                });
            });
  });
};

module.exports = diseaseValidationRules;