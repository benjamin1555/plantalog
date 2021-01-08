export default {
  async fetchDiseases(context) {
    const response = await fetch('http://localhost:3000/catalog/diseases');
    const responseData = await response.json();
    context.commit('setDiseases', responseData.diseases);
  },
  async addDisease(context, data) {
    const formData = createFormData(data);
    const response = await fetch('http://localhost:3000/catalog/diseases', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${context.rootGetters.token}`
      },
      body: formData
    });
    const responseData = await response.json();
    console.log(responseData);

    context.commit('setLastAddedDisease', responseData.savedDisease);
    context.commit('setDisease', {
      _id: responseData.savedDisease._id,
      ...data
    });
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