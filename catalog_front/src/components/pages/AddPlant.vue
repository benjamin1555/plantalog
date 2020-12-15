<template>
  <base-dialog
    :show="formVisible"
    title="Ajouter Une Espèce"
    @close="redirectToCatalog"
    @submit-data="addPlant">
    <plant-form></plant-form>
  </base-dialog>
</template>

<script>
import PlantForm from '../plants/PlantForm.vue';

export default {
  components: {
    PlantForm
  },
  data() {
    return {
      formVisible: true
    };
  },
  methods: {
    redirectToCatalog() {
      this.formVisible = false;
      this.$router.replace('/catalogue');
    },
    addPlant(data) {
      console.log(data);
    }
  }
}
</script>