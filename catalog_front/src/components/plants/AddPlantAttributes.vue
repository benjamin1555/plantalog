<template>
  <div>
    <select @change="onChange($event)">
      <option value="" selected>-- Ajoutez une {{ defaultOption }} --</option>
      <option
        v-for="plant in plants"
        :key="plant._id"
        :value="plant._id"
      >{{ plant.species || plant.name }} <span v-if="plant.variety">- {{ plant.variety }}</span></option>
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
import { mapGetters, mapActions } from 'vuex';
import BaseLabel from '../ui/BaseLabel.vue';

export default {
  components: {
    BaseLabel
  },
  props: [
    'selectedInteractionsName',
    'defaultOption',
    'knownInteractions'
  ],
  computed: {
    ...mapGetters('plants', [
      'plants',
      'selectedBeneficialInteractions',
      'selectedHarmfulInteractions'
    ]),
    formattedSelectedValues() {
      const formattedValues = this[this.selectedInteractionsName].map(interactionId => {
        const foundItem = this.plants.find(p => p._id === interactionId);
        const name = foundItem.variety ? `${foundItem.species} - ${foundItem.variety}` : foundItem.species;
        return {
          _id: foundItem._id,
          name
        };
      });
      return formattedValues;
    },
    hasSelectedValues() {
      return this[this.selectedInteractionsName].length > 0;
    }
  },
  methods: {
    ...mapActions('plants', [
      'clearSelectedInteractions',
      'addSelectedInteraction',
      'removeSelectedInteraction'
    ]),
    initializeInteractionsValues() {
      if (this.knownInteractions && this.knownInteractions.length > 0) {
        this.selectedValues = this.knownInteractions.map(({ _id }) => _id);
      }
    },
    onChange(event) {
      const inputValue = event.target.value;
      this.addSelectedInteraction({
        interactionType: this.selectedInteractionsName,
        _id: inputValue
      });
    },
    removeAttribute(attributeToRemoveId) {
      this.removeSelectedInteraction({
        interactionType: this.selectedInteractionsName,
        _id: attributeToRemoveId
      });
    }
  },
  created() {
    this.clearSelectedInteractions();
    this.initializeInteractionsValues();
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