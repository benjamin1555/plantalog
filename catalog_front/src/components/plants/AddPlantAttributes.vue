<template>
  <div>
    <select :id="attributeName" @change="onChange($event)">
      <option value="" selected>-- Ajoutez une {{ defaultOption }} --</option>
      <option
        v-for="attribute in attributesList"
        :key="attribute._id"
        :value="attribute._id"
      >{{ attribute.species }} <span v-if="attribute.variety">- {{ attribute.variety }}</span></option>
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
import BaseLabel from '../ui/BaseLabel.vue';
export default {
  components: {
    BaseLabel
  },
  props: ['attributeName', 'defaultOption', 'attributesList'],
  emits: ['get-selected-values'],
  data() {
    return {
      selectedValues: []
    };
  },
  computed: {
    formattedSelectedValues() {
      const values = this.selectedValues.map(plantId => {
        const plant = this.attributesList.find(p => p._id === plantId);
        const name = plant.variety ? `${plant.species} - ${plant.variety}` : plant.species;
        return {
          _id: plant._id,
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
    onChange(event) {
      const inputValue = event.target.value;
      if (this.selectedValues.includes(inputValue)) return;
      this.selectedValues.push(inputValue);
      this.$emit('get-selected-values', this.selectedValues);
    },
    removeAttribute(plantToRemoveId) {
      this.selectedValues.splice(this.selectedValues.indexOf(plantToRemoveId), 1);
    }
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