export default {
  async fetchPlants(context, payload) {
    let searchQuery = payload ? payload.searchQuery : '';

    const response = await fetch(`http://localhost:3000/catalog/plants/?search=${searchQuery}`);
    const responseData = await response.json();
    const cleanedSearchQuery = searchQuery.includes('&') ? searchQuery.split('&')[0] : searchQuery;

    context.commit('setPlants', responseData.plants);
    context.commit('setSearchQuery', { cleanedSearchQuery });
    context.commit('setPaginationData', responseData);
  },
  async fetchPlant(context, plantId) {
    const response = await fetch(`http://localhost:3000/catalog/plants/${plantId}`)
    const responseData = await response.json();

    if (!response.ok && responseData.statusCode === 404) {
      const error = new Error('Aucune plante ne correspond à ce que vous cherchez.');
      throw error;
    }
    if (!response.ok && responseData.statusCode === 500) {
      const error = new Error('Une erreur interne vient de se produire. (Code 500)');
      throw error;
    }

    context.commit('setPlant', responseData.plant);
  },
  async addPlant(context, data) {
    const formData = createFormData(data);
    const response = await fetch('http://localhost:3000/catalog/plants', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${context.rootGetters.token}`
      },
      body: formData
    });
    const responseData = await response.json();

    if (!response.ok && responseData.statusCode === 422) {
      const validationMessage = responseData.data.map(el => `${Object.values(el)}`);
      const error = new Error(`Erreur de validation: ${validationMessage}`);
      throw error;
    }
    if (!response.ok && responseData.statusCode === 500) {
      const error = new Error('Une erreur interne vient de se produire. (Code 500)');
      throw error;
    }
    console.log(responseData);

    context.commit('setPlant', {
      _id: responseData.savedPlant._id,
      ...data
    });
  },
  async editPlant(context, data) {
    const formData = createFormData(data);

    const response = await fetch(`http://localhost:3000/catalog/plants/${data._id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${context.rootGetters.token}`
      },
      body: formData
    })
    const responseData = await response.json();

    if (!response.ok && responseData.statusCode === 404) {
      const error = new Error('Aucune plante ne correspond à ce que vous cherchez.');
      throw error;
    }
    if (!response.ok && responseData.statusCode === 422) {
      const validationMessage = responseData.data.map(el => `${Object.values(el)}`);
      const error = new Error(`Erreur de validation: ${validationMessage}`);
      throw error;
    }
    if (!response.ok && responseData.statusCode === 500) {
      const error = new Error('Une erreur interne vient de se produire. (Code 500)');
      throw error;
    }
    console.log(responseData);

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