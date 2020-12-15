<template>
  <li>
    <p>{{ formatedSpecies }} <span v-if="hasVariety">- {{ formatedVariety }}</span></p>
  </li>
</template>

<script>
export default {
  props: ['species', 'variety'],
  computed: {
    hasVariety() {
      return !!this.variety;
    },
    formatedSpecies() {
      return this.formatString(this.species);
    },
    formatedVariety() {
      return this.formatString(this.variety);
    },
  },
  methods: {
    formatString(str) {
      const firstLetter = str.substring(0, 1).toUpperCase();
      const restOfString = str.substring(1);
      return firstLetter + restOfString;
    }
  }
};
</script>

<style scoped>
li {
  border-bottom: 0.5px solid rgba(204, 204, 204, 0.3);
}
</style>