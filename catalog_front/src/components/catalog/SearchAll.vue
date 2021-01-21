<template>
  <div class="search-all">
    <base-dialog :show="!!error" title="Une erreur s'est produite" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-button @click="displayAllResults" mode="outline"><i :class="searchAllDisplayBtnIcon"></i>{{ searchAllDisplayBtnText }}</base-button>
    <base-card v-if="searchAllResultsVisible">
      <div class="components-control">
        <base-button @click="setSelectedComponent('plants-all')" :mode="setPlantsActiveTab">Plantes</base-button>
        <base-button @click="setSelectedComponent('diseases-all')" :mode="setDiseasesActiveTab">Maladies</base-button>
        <component :is="selectedComponent"></component>
      </div>
    </base-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import PlantsAll from '../plants/PlantsAll.vue';
import DiseasesAll from '../diseases/DiseasesAll.vue';

export default {
  components: {
    PlantsAll,
    DiseasesAll
  },
  data() {
    return {
      selectedComponent: 'plants-all',
      error: null
    };
  },
  computed: {
    ...mapGetters('plants', [
      'searchAllResultsVisible'
    ]),
    searchAllDisplayBtnText() {
      return this.searchAllResultsVisible ? 'Masquer' : 'Afficher Tout'
    },
    searchAllDisplayBtnIcon() {
      return this.searchAllResultsVisible ? 'fas fa-angle-double-up' : 'fas fa-angle-double-down'
    },
    setPlantsActiveTab() {
      return this.selectedComponent === 'plants-all' ? 'regular' : 'outline';
    },
    setDiseasesActiveTab() {
      return this.selectedComponent === 'diseases-all' ? 'regular' : 'outline';
    }
  },
  methods: {
    ...mapActions('plants', {
      displayAllResults: 'displayAllResults'
    }),
    setSelectedComponent(component) {
      this.selectedComponent = component;
    },
    handleError() {
      this.error = null;
      this.redirectToCatalog();
    }
  },
  updated() {
    this.setSelectedComponent('plants-all');
  }
};
</script>

<style scoped>
div.search-all {
  margin-top: 1.5rem;
}

h3 {
  margin-top: 0.5rem;
  padding-bottom: 0.5rem;
  font-weight: 300;
  border-bottom: 1.5px solid #CCC;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

ul li:last-child {
  border-bottom: none!important;
}

p.light-gray {
  color: rgb(153, 153, 153)
}

button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 0.5rem;
}

button i {
  margin-right: 0.5rem;
  font-size: 1.1rem;
}
</style>
