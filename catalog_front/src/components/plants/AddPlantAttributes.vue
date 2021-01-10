<template>
  <div>
    <base-dialog :show="!!error" title="Une erreur s'est produite" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <select :id="attributeName" @change="onChange($event)">
      <option value="" selected>-- Ajoutez une {{ defaultOption }} --</option>
      <option
        v-for="attribute in attributesList"
        :key="attribute._id"
        :value="attribute._id"
      >{{ attribute.species || attribute.name }} <span v-if="attribute.variety">- {{ attribute.variety }}</span></option>
    </select>
    <div class="added-attributes" v-if="hasSelectedValues">
      <base-label
        v-for="attribute in formattedSelectedValues"
        :key="attribute._id"
        :attribute-id="attribute._id"
        @remove-attribute="removeAttribute"
      >{{ attribute.name }}</base-label>
    </div>
    <p class="small-para" v-else>Aucune {{ defaultOption }} selectionnée.</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseLabel from '../ui/BaseLabel.vue';

export default {
  components: {
    BaseLabel
  },
  props: ['attributeName', 'attributesList', 'defaultOption', 'knownInteractions'],
  emits: ['get-selected-values'],
  data() {
    return {
      selectedValues: [],
      error: null
    };
  },
  computed: {
    ...mapGetters('plants', [
      'plants'
    ]),
    formattedSelectedValues() {
      const values = this.selectedValues.map(itemId => {
        const item = this.attributesList.find(i => i._id === itemId);
        const name = item.variety ? `${item.species} - ${item.variety}` : item.species;
        return {
          _id: item._id,
          name
        }
      });
      return values;
    },
    hasSelectedValues() {
      return this.selectedValues.length > 0;
    }
  },
  methods: {
     initializeInteractionsValues() {
      if (this.knownInteractions && this.knownInteractions.length > 0) {
        this.selectedValues = this.knownInteractions.map(({ _id }) => _id);
      }
    },
    onChange(event) {
      const inputValue = event.target.value;
      if (this.selectedValues.includes(inputValue)) return;
      this.selectedValues.push(inputValue);
      this.$emit('get-selected-values', this.selectedValues);
    },
    removeAttribute(attributeToRemoveId) {
      this.selectedValues.splice(this.selectedValues.indexOf(attributeToRemoveId), 1);
      this.$emit('get-selected-values', this.selectedValues);
    },
    async loadPlants() {
      try {
        await this.$store.dispatch('plants/fetchPlants', { searchQuery: '&pagination=false' });
        this.initializeInteractionsValues();
      } catch (err) {
        if (err.message === 'Failed to fetch') {
          this.error = 'Impossible de se connecter au serveur. Merci de vérifier votre connexion.';
        } else {
          this.error = err.message || 'Une erreur vient de produire. Merci de réessayer.';
        }
      }
    },
    handleError() {
      this.error = null;
    }
  },
  created() {
    this.loadPlants();
  }
};
</script>

<style scoped>
select {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

.added-attributes {
  margin-top: 0.5rem;
}

.small-para {
  margin-top: 0.5rem;
  font-size: 0.8rem;
  font-style: italic;
}
</style>