const moment = require('moment');

export default {
  fetchPlantableNextMonth({ commit, rootGetters }) {
    const plants = rootGetters['plants/plants'];

    plants.map(plant => {
      plant.plantationDate = setCorrectDateYear(plant.plantationDate);
      plant.isPlantableNow = setIsPlantableNow(plant);
      plant.canBePlantedUntil = setCanBePlantedUntil(plant);
      plant.canBePlantedIn = setCanBePlantedIn(plant);
    });
    const filteredPlants = plants.filter(plant => isPlantableIn(plant, 30));

    commit('setPlantableNextMonth', filteredPlants);
  }
};

// Private
function setCorrectDateYear(plantationDate) {
  const { start, end } = plantationDate;

  const startDate = moment(start);
  const endDate = moment(end);

  if (endDate.year() - startDate.year() === 1 && endDate.diff(moment(), 'days') < 0) {
    startDate.set('year', moment().year());
    endDate.set('year', moment().year() + 1);
  } else if (endDate.year() - startDate.year() === 1 && endDate.diff(moment(), 'days') > 0) {
    startDate.set('year', moment().year() - 1);
    endDate.set('year', moment().year());
  }

  return { start: startDate, end: endDate }
}

function setIsPlantableNow(plant) {
  const startPlantationDate = plant.plantationDate.start;
  const dateDifferenceStart = startPlantationDate.diff(moment(), 'days');

  return dateDifferenceStart <= 0;
}

function setCanBePlantedUntil(plant) {
  if (!plant.isPlantableNow) {
    return null;
  }

  const endPlantationDate = plant.plantationDate.end;
  const dateDifferenceEnd = endPlantationDate.diff(moment(), 'days');

  return dateDifferenceEnd;
}

function setCanBePlantedIn(plant) {
  const startPlantationDate = plant.plantationDate.start;
  const dateDifferenceStart = startPlantationDate.diff(moment(), 'days');

  return dateDifferenceStart;
}

function isPlantableIn(plant, unitlInDays) {
  const plantationDate = plant.plantationDate;
  const dateDifferenceStart = plantationDate.start.diff(moment(), 'days');
  const dateDifferenceEnd = plantationDate.end.diff(moment(), 'days');
  const isPlantableIn = dateDifferenceStart < unitlInDays || dateDifferenceEnd < unitlInDays;

  if (plant.species === 'tomates') {
    console.log('plantationDate: ', plantationDate)
    console.log('dateDifferenceStart: ', dateDifferenceStart)
    console.log('dateDifferenceEnd: ', dateDifferenceEnd)
    console.log('isPlantableIn: ', isPlantableIn)
  }

  return isPlantableIn;
}