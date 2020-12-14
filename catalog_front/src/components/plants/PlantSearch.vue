<template>
  <div>
    <section class="search-section">
      <form>
        <div class="form-control">
          <input type="text" id="searchInput" placeholder="Rechercher une espèce">
          <button type="submit"><i class="fas fa-search"></i></button>
        </div>
      </form>
      <base-button mode="outline" link :to="addPlantLink"><i class="fas fa-plus"></i> Ajouter Espèce</base-button>
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
export default {
  computed: {
    addPlantLink() {
      return `${this.$route.path}/ajouter-plante`;
    }
  }
}
</script>

<style scoped>
section.search-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

form {
  flex-grow: 2;
  margin-right: 2rem;
}

.form-control {
  display: flex;
  margin: 0.5rem 0;
}

.form-control button {
  border: 0.5px solid #CCC;
  background-color: #FFF;
  padding: 1rem;
}

.form-control button i {
  font-size: 1.2rem;
  color: #3d008d;
  opacity: 0.7;
}

.form-control button:hover,
.form-control button:active,
.form-control button:hover i {
  cursor: pointer;
  border-color: #3d008d;
  opacity: 1;
}

input {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
  padding: 0.5rem 1rem;
  border-right: none;
}

input:focus {
  outline: none;
  border-color: #3d008d;
  color: #3d008d;
  border-right: 1px solid #3d008d;
}

button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 0.5rem;
}

button i.fa-plus {
  margin-right: 0.5rem;
  font-size: 1.1rem;
}
</style>