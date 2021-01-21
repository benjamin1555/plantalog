<template>
  <base-dialog
    :show="formVisible"
    title="Modifier Une Espèce"
    @close="redirectToPlantDetail">
    <edit-plant-form></edit-plant-form>
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
      formVisible: true
    };
  },
  methods: {
    redirectToPlantDetail() {
      this.formVisible = false;
      this.$router.replace(`${this.$route.path.replace(/\/edit/, '')}`);
    }
  }
};
</script>