<template>
  <div class="base-label" @click="remove">
    <div class="label-content">
      <slot></slot>
      <i class="fas fa-times"></i>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['remove-attribute'],
  props: ['attributeId'],
  methods: {
    remove() {
      this.$emit('remove-attribute', this.attributeId)
    }
  }
};
</script>

<style scoped>
.base-label {
  padding: 0.35rem 0.75rem;
  border: 1px solid #3a0061;
  color: #FFF;
  background: #3a0061;
  display: inline-block;
  border-radius: 5px;
  margin: 0.2rem;
  opacity: 0.8;
}

.label-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.label-content i {
  display: none;
  line-height: 150%;
  font-size: 0.8rem;
  margin-left: 0.5rem;
}

.base-label:hover {
  cursor: pointer;
  color: #FFF;
  opacity: 1;
  transform: scale(1.05);
}

.base-label:hover i {
  display: block;
}

</style>