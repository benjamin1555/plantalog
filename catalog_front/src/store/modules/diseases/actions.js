export default {
  async fetchDiseases(context) {
    const response = await fetch('https://api.plantalog.fr/catalog/diseases');
    const responseData = await response.json();

    handleBadResponse(response, responseData);
    context.commit('setDiseases', responseData.diseases);
  },
  async fetchDisease(context, diseaseId) {
    const response = await fetch(`https://api.plantalog.fr/catalog/diseases/${diseaseId}`)
    const responseData = await response.json();

    handleBadResponse(response, responseData);
    console.log(responseData);
    context.commit('setDisease', responseData.disease);
  },
  async addDisease(context, data) {
    const formData = createFormData(data);
    const response = await fetch('https://api.plantalog.fr/catalog/diseases', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${context.rootGetters.token}`
      },
      body: formData
    });
    const responseData = await response.json();

    handleBadResponse(response, responseData);
    console.log(responseData);
    context.commit('setLastAddedDisease', responseData.savedDisease);
  },
  clearLastAddedDisease(context) {
    context.commit('clearLastAddedDisease');
  },
  clearSelectedDiseases(context) {
    context.commit('clearSelectedDiseases');
  },
  addSelectedDisease(context, payload) {
    context.commit('addSelectedDisease', payload);
  },
  removeSelectedDisease(context, payload) {
    context.commit('removeSelectedDisease', payload);
  }
};

// Private functions
const createFormData = data => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('symptoms', data.symptoms);
  formData.append('image', data.image);
  formData.append('treatment', data.treatment);
  return formData;
};

const handleBadResponse = (response, responseData) => {
  if (!response.ok && responseData.statusCode === 404) {
    const error = new Error('Aucune maladie ne correspond à ce que vous cherchez.');
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
};