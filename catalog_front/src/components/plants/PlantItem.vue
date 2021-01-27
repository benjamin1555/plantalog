<template>
  <router-link :to="plantLink">
    <li>
      <div class="link">
        <img :src="thumbnailImageLink" :alt="thumbnailAltImage">
        <p>{{ formattedSpecies }} <span v-if="hasVariety">- {{ formattedVariety }}</span></p>
      </div>
      <div class="progress-bar-comp">
        <slot></slot>
      </div>
    </li>
  </router-link>
</template>

<script>
export default {
  props: ['id', 'species', 'variety', 'imagesUrl'],
  computed: {
    hasVariety() {
      return !!this.variety;
    },
    formattedSpecies() {
      return this.formatString(this.species);
    },
    formattedVariety() {
      return this.formatString(this.variety);
    },
    thumbnailImageLink() {
      return `http://api.plantalog.fr/images/${this.imagesUrl.thumbnail}`;
    },
    thumbnailAltImage() {
      return `${this.species}${this.variety}_thumbnail`;
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
  width: 65px;
  height: 65px;
  margin-right: 10px;
}

li .link p {
  margin: 0;
}
</style>