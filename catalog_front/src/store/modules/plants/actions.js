import handleBadResponse from '../../../util/badResponseHandler';

export default {
  async fetchPlants(context, payload) {
    let searchQuery = payload ? payload.searchQuery : '';

    const response = await fetch(`https://api.plantalog.fr/catalog/plants/?search=${searchQuery}`);
    const responseData = await response.json();
    const cleanedSearchQuery = searchQuery.includes('&') ? searchQuery.split('&')[0] : searchQuery;

    handleBadResponse(response, responseData);
    context.commit('setPlants', responseData.plants);
    context.commit('setSearchQuery', { cleanedSearchQuery });
    context.commit('setPaginationData', responseData);
  },
  async fetchPlant(context, plantId) {
    context.commit('clearPlant');
    const response = await fetch(`https://api.plantalog.fr/catalog/plants/${plantId}`)
    const responseData = await response.json();

    handleBadResponse(response, responseData);
    context.commit('setPlant', responseData.plant);
  },
  async addPlant(context, data) {
    const formData = createFormData(data);
    const response = await fetch('https://api.plantalog.fr/catalog/plants', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${context.rootGetters.token}`
      },
      body: formData
    });
    const responseData = await response.json();

    handleBadResponse(response, responseData);
    context.commit('setPlant', {
      _id: responseData.savedPlant._id,
      ...data
    });
  },
  async editPlant(context, data) {
    const formData = createFormData(data);

    const response = await fetch(`https://api.plantalog.fr/catalog/plants/${data._id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${context.rootGetters.token}`
      },
      body: formData
    })
    const responseData = await response.json();

    handleBadResponse(response, responseData)
    context.commit('setPlant');
  },
  clearSelectedInteractions(context) {
    context.commit('clearSelectedInteractions', { interactionType: 'selectedBeneficialInteractions' });
    context.commit('clearSelectedInteractions', { interactionType: 'selectedHarmfulInteractions' });
  },
  addSelectedInteraction(context, payload) {
    context.commit('addSelectedInteraction', {
      interactionType: payload.interactionType,
      _id: payload._id
    });
  },
  removeSelectedInteraction(context, payload) {
    context.commit('removeSelectedInteraction', {
      interactionType: payload.interactionType,
      _id: payload._id
    });
  },
  displayAllResults(context) {
    checkAndHidePartialResults(context);
    context.commit('toggleSearchAllResults');
  },
  displayPartialResults(context) {
    checkAndHideAllResults(context);
    context.commit('toggleSearchPartialResults');
  },
  hideAllSearchResults(context) {
    checkAndHidePartialResults(context);
    checkAndHideAllResults(context);
  }
};

// Private functions
const createFormData = data => {

  const formData = new FormData();
  formData.append('_id', data._id);
  formData.append('species', data.species);
  formData.append('variety', data.variety);
  formData.append('image', data.image);
  formData.append('plantationType', data.plantationType);
  formData.append('plantationDateStart', data.plantationDate.start);
  formData.append('plantationDateEnd', data.plantationDate.end);
  formData.append('harvestDateStart', data.harvestDate.start);
  formData.append('harvestDateEnd', data.harvestDate.end);
  formData.append('beneficialInteractions', convertEmptyProxyToNull(data.beneficialInteractions));
  formData.append('harmfulInteractions', convertEmptyProxyToNull(data.harmfulInteractions));
  formData.append('diseases', convertEmptyProxyToNull(data.diseases));
  formData.append('notes', data.notes);

  return formData;
};

const checkAndHidePartialResults = context => {
  if (context.state.searchPartialResultsVisible) {
    context.commit('toggleSearchPartialResults');
  }
};

const checkAndHideAllResults = context => {
  if (context.state.searchAllResultsVisible) {
    context.commit('toggleSearchAllResults');
  }
};

const convertEmptyProxyToNull = proxy => {
  if (Object.entries(proxy).length === 0 || (proxy.val && proxy.val === null)) {
    return proxy.val === null ? null : proxy;
  } else {
    const arr = [];
    for (let item of Object.entries(proxy)) {
      arr.push(item[1]);
    }
    return arr;
  }
};