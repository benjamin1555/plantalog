const imagesUtil = require('../util/clear-images');
const defaultError = require('../util/default-error');

const Plant = require('../models/plant');

exports.getPlants = async (req, res, next) => {
  try {
    const totalItems = await Plant.find().countDocuments();
    const plants = await Plant.find();
    res.status(200).json({
      message: 'Plants fetched.',
      plants,
      totalItems
    });
  } catch (err) {
    next(defaultError(err));
  }
};

exports.createPlant = async (req, res, next) => {
  try {
    const species = req.body.species;
    const variety = req.body.variety;
    const imagesUrl = req.body.images;
    const plantationType = req.body.plantationType;
    const plantationDate = req.body.plantationDate
    const harvestDate = req.body.harvestDate;
    const beneficialInteractions = req.body.beneficialInteractions;
    const harmfulInteractions = req.body.harmfulInteractions;
    const diseases = req.body.diseases;
    const plant = new Plant({
      species,
      variety,
      imagesUrl,
      plantationType,
      plantationDate,
      harvestDate,
      beneficialInteractions,
      harmfulInteractions,
      diseases
    });

    const savedPlant = await plant.save();
    res.status(201).json({
      message: 'Plant successfully created.',
      savedPlant
    });
  } catch (err) {
    next(defaultError(err));
  }
};

exports.getPlant = async (req, res, next) => {
  const plantId = req.params.plantId;
  try {
    const plant = await findPlant(plantId);
    res.status(200).json({
      message: 'Plant fetched.',
      plant
    });
  } catch (err) {
    next(defaultError(err));
  }
};

exports.updatePlant = async (req, res, next) => {
  const plantId = req.params.plantId;
  const species = req.body.species;
  const variety = req.body.variety;
  const plantationType = req.body.plantationType;
  const plantationDate = req.body.plantationDate;
  const harvestDate = req.body.harvestDate;
  const beneficialInteractions = req.body.beneficialInteractions;
  const harmfulInteractions = req.body.harmfulInteractions;
  const diseases = req.body.diseases;
  let imagesUrl = req.body.images;
  try {
    const plant = await findPlant(plantId);
    if (imagesUrl.regular !== plant.imagesUrl.regular) {
      imagesUtil.clearImages(plant.imagesUrl);
    }
    plant.species = species;
    plant.variety = variety;
    plant.imagesUrl = imagesUrl;
    plant.plantationType = plantationType;
    plant.plantationDate = plantationDate;
    plant.harvestDate = harvestDate;
    plant.beneficialInteractions = beneficialInteractions;
    plant.harmfulInteractions = harmfulInteractions;
    plant.diseases = diseases;
    const updatedPlant = await plant.save();
    res.status(200).json({
      message: 'Plant successfully updated.',
      updatedPlant
    });
  } catch (err) {
    next(defaultError(err));
  }
};

exports.deletePlant = async (req, res, next) => {
  const plantId = req.params.plantId;
  try {
    const plant = await findPlant(plantId);
    imagesUtil.clearImages(plant.imagesUrl);
    await Plant.findByIdAndRemove(plantId);
    res.status(200).json({
      message: 'Plant successfully deleted.'
    });
  } catch (err) {
    next(defaultError(err));
  }
};

const findPlant = async plantId => {
  const plant = await Plant.findById(plantId);
  if (!plant) {
    const error = new Error('Cannot find a plant with that ID.');
    error.statusCode = 404;
    throw error;
  }
  return plant;
};