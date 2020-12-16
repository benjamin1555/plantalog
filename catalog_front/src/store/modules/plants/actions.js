// #### TEMPORARY - for test purpose only
const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJlbmphbWluQGdtYWlsLmNvbSIsInVzZXJJZCI6IjVmYzNjNmQ3MDBiNzcwYjRjYjI2ZGUyNiIsImlhdCI6MTYwODA3OTMzMSwiZXhwIjoxNjA4MDgyOTMxfQ.ztfbrPfxfDHiTf7M0gQSElUBaE8Tv5NZB9ETJPMdoZ4';
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
      _id: '5fb575048396009e9d066d11',
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
  formData.append('beneficialInteractions', data.beneficialInteractions);
  formData.append('harmfulInteractions', data.harmfulInteractions);
  formData.append('diseases', data.diseases);
  return formData;
};