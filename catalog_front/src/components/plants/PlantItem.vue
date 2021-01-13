<template>
  <li>
    <div class="link">
      <img :src="thumbnailImageLink" :alt="thumbnailAltImage">
      <router-link :to="plantLink"><p>{{ formatedSpecies }} <span v-if="hasVariety">- {{ formatedVariety }}</span></p></router-link>
    </div>
    <div class="progress-bar-comp">
      <slot></slot>
    </div>
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
    thumbnailImageLink() {
      return `http://localhost:3000/images/${this.imagesUrl.thumbnail}`;
    },
    thumbnailAltImage() {
      return `${this.id}_thumbnail`;
    },
    plantLink() {
      return `${this.$route.path}/plants/${this.id}`;
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
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.5px solid rgba(204, 204, 204, 0.3);
  padding: 0.75rem;
  margin-bottom: 0.25rem;
}

li:hover {
  background: #DFD6EB;
  cursor: pointer;
}

li .link {
  display: flex;
  align-items: center;
}

li .link img {
  margin-right: 10px;
}

li .link p {
  margin: 0;
}
</style>