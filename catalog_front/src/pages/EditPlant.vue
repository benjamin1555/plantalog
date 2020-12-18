<template>
  <base-dialog
    :show="formVisible"
    title="Modifier Une Espèce"
    @close="redirectToPlantDetail">
    <edit-plant-form :id="id" @save-data="editPlant"></edit-plant-form>
  </base-dialog>
</template>

<script>
import EditPlantForm from '../components/plants/EditPlantForm.vue';

export default {
  components: {
    EditPlantForm,
  },
  data() {
    return {
      id: this.$route.params.id,
      formVisible: true
    };
  },
  methods: {
    redirectToPlantDetail() {
      this.formVisible = false;
      this.$router.replace(`${this.$route.path.replace(/\/editer/, '')}`);
    },
    editPlant(data) {
      this.$store.dispatch('plants/editPlant', data);
      // this.$router.replace(`${this.$route.path.replace(/\/editer/, '')}`);
      this.$router.replace('/catalogue');
    }
  }
};
</script>