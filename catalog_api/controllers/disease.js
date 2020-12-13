const imagesUtil = require('../util/clear-images');
const defaultError = require('../util/default-error');

const Disease = require('../models/disease');

exports.getDiseases = async (req, res, next) => {
  try {
    const diseases = await Disease.find();
    res.status(200).json({
      message: 'Diseases fetched.',
      diseases
    });
  } catch (err) {
    next(defaultError(err));
  }
};

exports.createDisease = async (req, res, next) => {
  try {
    const name = req.body.name;
    const symptoms = req.body.symptoms;
    const imagesUrl = req.body.images;
    const treatment = req.body.treatment;
    const disease = new Disease({
      name,
      symptoms,
      imagesUrl,
      treatment
    });
    const savedDisease = await disease.save();
    res.status(201).json({
      message: 'Disease successfully created.',
      savedDisease
    });
  } catch (err) {
    next(defaultError(err));
  }
};

exports.getDisease = async (req, res, next) => {
  const diseaseId = req.params.diseaseId;
  try {
    const disease = await findDisease(diseaseId);
    res.status(200).json({
      message: 'Disease fetched.',
      disease
    });
  } catch (err) {
    next(defaultError(err));
  }
};

exports.updateDisease = async (req, res, next) => {
  const diseaseId = req.params.diseaseId;
  const name = req.body.name;
  const symptoms = req.body.symptoms;
  const treatment = req.body.treatment;
  let imagesUrl = req.body.images;
  try {
    const disease = await findDisease(diseaseId);
    if (imagesUrl.regular !== disease.imagesUrl.regular) {
      imagesUrl = req.body.images;
      imagesUtil.clearImages(disease.imagesUrl);
    }
    disease.name = name;
    disease.symptoms = symptoms;
    disease.treatment = treatment;
    disease.imagesUrl = imagesUrl;
    const updatedDisease = await disease.save();
    res.status(200).json({
      message: 'Disease successfully updated.',
      updatedDisease
    });
  } catch (err) {
    next(defaultError(err));
  }
};

exports.deleteDisease = async (req, res, next) => {
  const diseaseId = req.params.diseaseId;
  try {
    const disease = await findDisease(diseaseId);
    imagesUtil.clearImages(disease.imagesUrl);
    await Disease.findByIdAndRemove(diseaseId);
    res.status(200).json({
      message: 'Disease successfully deleted.'
    });
  } catch (err) {
    next(defaultError(err));
  }
};

const findDisease = async diseaseId => {
  const disease = await Disease.findById(diseaseId);
  if (!disease) {
    const error = new Error('Cannot find a disease with that ID.');
    error.statusCode = 404;
    throw error;
  }
  return disease;
};