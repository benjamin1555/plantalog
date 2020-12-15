export default {
  searchPlant(context, searchQuery) {
    console.log(!searchQuery)
    if (!searchQuery) return null;
    const regexp = new RegExp(searchQuery);
    const results = context.state.plants.filter(plant => {
      return plant.species.match(new RegExp(regexp));
    });
    context.commit('searchPlant', results);
  },
  addPlant(context, data) {
    context;
    console.log(data);
  }
};