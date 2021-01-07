export default {
  async fetchPlants(context) {
    const response = await fetch('http://localhost:3000/catalog/plants');
    const responseData = await response.json();
    context.commit('setPlants', responseData.plants);
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
    console.log(responseData);

    context.commit('addPlant', {
      _id: responseData.savedPlant._id,
      ...data
    });
  },
  editPlant(context, data) {
    const plants = context.getters.plants;
    const plantIdToEdit = plants.findIndex(plant => plant._id === data._id);
    plants[plantIdToEdit] = data;
    context.commit('editPlant', plants);
  },
  searchPlant(context, searchQuery) {
    if (!searchQuery) return null;
    const regexp = new RegExp(searchQuery);
    const results = context.state.plants.filter(plant => {
      return plant.species.match(new RegExp(regexp));
    });
    context.commit('searchPlant', results);
  }
};

// Private functions
const createFormData = data => {
  const formData = new FormData();
  formData.append('species', data.species);
  formData.append('variety', data.variety);
  formData.append('image', data.image);
  formData.append('plantationType', data.plantationType);
  formData.append('plantationDate', data.plantationDate);
  formData.append('harvestDate', data.harvestDate);
  formData.append('beneficialInteractions', convertEmptyProxyToNull(data.beneficialInteractions));
  formData.append('harmfulInteractions', convertEmptyProxyToNull(data.harmfulInteractions));
  formData.append('diseases', convertEmptyProxyToNull(data.diseases));
  return formData;
};

const convertEmptyProxyToNull = proxy => {
  return proxy.val === null ? null : proxy;
};