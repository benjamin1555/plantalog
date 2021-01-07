export default {
  hasPlants(state) {
    return state.plants && state.plants.length > 0;
  },
  plants(state) {
    return state.plants;
  },
  plant(state) {
    return state.plant;
  },
  sortedPlants(state) {
    const sortedPlants = state.plants.sort((a, b) => {
      if (a.species === b.species) {
        return a.variety > b.variety ? 1 : -1;
      }
      return a.species > b.species ? 1 : -1;
    });
    return sortedPlants;
  },
  formattedPlantationDate(state) {
    return formatDate(state.plant.plantationDate);
  },
  formattedHarvestDate(state) {
    return formatDate(state.plant.harvestDate);
  }
};

// Private
const formatDate = datesObj => {
  let formattedDate = '';
  if (hasDateFields(datesObj)) {
    for (let [k, v] of Object.entries(datesObj)) {
      k
      const parsedDate = v.split('T')[0]
        .split('-')
        .splice(1, 2)
        .reverse()
        .join('/');
      formattedDate += k === 'start' ? `du ${parsedDate}` : ` au ${parsedDate}`;
    }
  } else {
    formattedDate = 'Néant';
  }
  return formattedDate
};

const hasDateFields = datesObj => {
  return !!datesObj && !!datesObj.start && !!datesObj.end;
};