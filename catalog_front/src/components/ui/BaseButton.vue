<template>
  <span>
    <button v-if="!link" :class="mode">
      <slot></slot>
    </button>
    <router-link v-else :to="to" :class="mode">
      <slot></slot>
    </router-link>
  </span>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null
    },
    link: {
      type: Boolean,
      required: false,
      default: false
    },
    to: {
      type: String,
      required: false,
      default: '/'
    }
  }
}
</script>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #3a0061;
  border: 1px solid #3a0061;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  margin-right: 0.5rem;
  display: inline-block;
  opacity: 0.8;
}

.flat {
  background-color: transparent;
  color: rgb(58, 0, 97);
  border: none;
}

.outline {
  background-color: transparent;
  border-color: #3d008d;
  color: #3d008d;
}

.outline:hover {
  opacity: 1;
}

.flat:hover,
.flat:active {
  background-color: #edd2ff;
}
</style>