const imagesUtil = require('../util/clear-images');
const defaultError = require('../util/default-error');

const Plant = require('../models/plant');

const ITEMS_PER_PAGE = 10;

exports.getPlants = async (req, res, next) => {
  const page = +req.query.page || 1;
  const searchQuery = req.query.search || '';
  const searchRegExp = new RegExp(searchQuery.trim().toLowerCase(), 'i');
  const plantQuery = makeSearchPlantsQuery(req, searchRegExp);

  try {
    const totalItems = await Plant.find({ species: searchRegExp }).countDocuments();
    const plants = await plantQuery.exec();

    res.status(200).json({
      message: 'Plants fetched.',
      plants,
      totalItems,
      currentPage: page,
      hasNextPage: ITEMS_PER_PAGE * page < totalItems,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil((totalItems / ITEMS_PER_PAGE))
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
    const plantationDate = {
      start: req.body.plantationDateStart,
      end: req.body.plantationDateEnd
    };
    const harvestDate = {
      start: req.body.harvestDateStart,
      end: req.body.harvestDateEnd
    };
    const beneficialInteractions = req.body.beneficialInteractions ? req.body.beneficialInteractions.split(',') : [];
    const harmfulInteractions = req.body.harmfulInteractions ? req.body.harmfulInteractions.split(',') : [];
    const diseases = req.body.diseases ? req.body.diseases.split(',') : [];
    const notes = req.body.notes;

    const plant = new Plant({
      species,
      variety,
      imagesUrl,
      plantationType,
      plantationDate,
      harvestDate,
      beneficialInteractions,
      harmfulInteractions,
      diseases,
      notes
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
    const plant = await findPlant(plantId)

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
  const plantationDate = {
    start: req.body.plantationDateStart,
    end: req.body.plantationDateEnd
  };
  const harvestDate = {
    start: req.body.harvestDateStart,
    end: req.body.harvestDateEnd
  };
  const beneficialInteractions = req.body.beneficialInteractions ? req.body.beneficialInteractions.split(',') : [];
  const harmfulInteractions = req.body.harmfulInteractions ? req.body.harmfulInteractions.split(',') : [];
  const diseases = req.body.diseases ? req.body.diseases.split(',') : [];
  const notes = req.body.notes;
  try {
    const plant = await Plant.findById(plantId);

    let imagesUrl = plant.imagesUrl;
    if (req.file) {
      imagesUtil.clearImages(plant.imagesUrl);
      imagesUrl = req.body.images;
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
    plant.notes = notes;

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

//Private

const makeSearchPlantsQuery = (req, searchRegExp) => {
  const page = +req.query.page || 1;
  if (req.query.pagination === 'false') {
    return plantQuery = Plant.find().sort({ species: 1, variety: 1 });
  } else {
    return plantQuery = Plant.find({ species: searchRegExp })
      .sort({ species: 1, variety: 1 })
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);
  }
};

const findPlant = async plantId => {
  const populateQuery = [
    { path:'beneficialInteractions', select:'_id species variety' },
    { path:'harmfulInteractions', select:'_id species variety' },
    { path:'diseases' }
  ];

  const plant = await Plant.findById(plantId)
    .populate(populateQuery)
  if (!plant) {
    const error = new Error('Cannot find a plant with that ID.');
    error.statusCode = 404;
    throw error;
  }
  return plant;
};