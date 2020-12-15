export default {
  async fetchPlants(context) {
    const response = await fetch('http://localhost:3000/catalog/plants');
    const responseData = await response.json();
    context.commit('fetchPlants', responseData.plants);
  },
  searchPlant(context, searchQuery) {
    if (!searchQuery) return null;
    const regexp = new RegExp(searchQuery);
    const results = context.state.plants.filter(plant => {
      return plant.species.match(new RegExp(regexp));
    });
    context.commit('searchPlant', results);
  },
  addPlant(context, data) {
    context.commit('addPlant', {
      _id: '5fb575048396009e9d066d11',
      ...data
    });
  }
};