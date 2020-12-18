<template>
  <li>
    <router-link :to="plantLink"><p>{{ formatedSpecies }} <span v-if="hasVariety">- {{ formatedVariety }}</span></p></router-link>
  </li>
</template>

<script>
export default {
  props: ['id', 'species', 'variety'],
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
    plantLink() {
      return `/catalogue/plants/${this.id}`;
    }
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
a {
  text-decoration: none;
  color: #3d008d;
}

li {
  border-bottom: 0.5px solid rgba(204, 204, 204, 0.3);
  padding: 0.75rem;
  margin-bottom: 0.25rem;
}

li p {
  margin: 0;
}

li:hover {
  background: #DFD6EB;
  cursor: pointer;
}
</style>