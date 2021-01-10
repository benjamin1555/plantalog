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
  selectedBeneficialInteractions(state) {
    return state.selectedBeneficialInteractions;
  },
  selectedHarmfulInteractions(state) {
    return state.selectedHarmfulInteractions;
  },
  searchQuery(state) {
    return state.searchQuery;
  },
  paginationData(state) {
    return state.paginationData;
  },
  searchPartialResultsVisible(state) {
    return state.searchPartialResultsVisible;
  },
  searchAllResultsVisible(state) {
    return state.searchAllResultsVisible;
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
    formattedDate = 'néant';
  }
  return formattedDate
};

const hasDateFields = datesObj => {
  return !!datesObj && !!datesObj.start && !!datesObj.end;
};