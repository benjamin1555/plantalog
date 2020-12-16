// #### TEMPORARY - for test purpose only
const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJlbmphbWluQGdtYWlsLmNvbSIsInVzZXJJZCI6IjVmYzNjNmQ3MDBiNzcwYjRjYjI2ZGUyNiIsImlhdCI6MTYwODEzOTUyMCwiZXhwIjoxNjA4MTQzMTIwfQ.nJb_t5caFa0JmC_zyq70hxFyCCd4T0mIwNQ-QsLeGxA';
// ######################################

export default {
  async fetchPlants(context) {
    const response = await fetch('http://localhost:3000/catalog/plants');
    const responseData = await response.json();
    context.commit('fetchPlants', responseData.plants);
  },
  async addPlant(context, data) {
    const formData = createFormData(data);
    const response = await fetch('http://localhost:3000/catalog/plants', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwt}`
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