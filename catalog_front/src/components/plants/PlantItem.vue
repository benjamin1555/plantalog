<template>
  <li>
    <img :src="iconImageLink" alt="">
    <router-link :to="plantLink"><p>{{ formatedSpecies }} <span v-if="hasVariety">- {{ formatedVariety }}</span></p></router-link>
  </li>
</template>

<script>
export default {
  props: ['id', 'species', 'variety', 'imagesUrl'],
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
    iconImageLink() {
      return `http://localhost:3000/images/${this.imagesUrl.icon}`;
    },
    iconAltImage() {
      return `${this.id}_icon`;
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
  display: flex;
  border-bottom: 0.5px solid rgba(204, 204, 204, 0.3);
  padding: 0.75rem;
  margin-bottom: 0.25rem;
}

li img {
  margin-right: 10px;
}

li p {
  margin: 0;
}

li:hover {
  background: #DFD6EB;
  cursor: pointer;
}
</style>