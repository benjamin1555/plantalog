<template>
  <base-dialog
    :show="formVisible"
    title="Ajouter Une Espèce"
    @close="redirectToCatalog">
    <plant-form @save-data="addPlant"></plant-form>
  </base-dialog>
</template>

<script>
import PlantForm from '../components/plants/PlantForm.vue';

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
      this.$store.dispatch('plants/addPlant', data);
      this.$router.replace('/catalogue');
    }
  }
}
</script>