export default {
  plantableNextMonth(state) {
    return state.plantableNextMonth.sort((a, b) => {
      if (a.canBePlantedUntil === null || b.canBePlantedUntil === null) {
        return -1;
      }
      return a.canBePlantedUntil - b.canBePlantedUntil;
    });
  },
  hasPlantableNextMonth(state) {
    return state.plantableNextMonth.length > 0;
  }
};