<template>
  <div>
    <base-dialog :show="!!error" title="Une erreur s'est produite" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <form @submit.prevent="submitForm">
      <div class="form-control" :class="{ invalid: !species.isValid }">
        <label for="species">Espèce</label>
        <input type="text" id="species" v-model.trim="species.val" @blur="clearInvalidField('species')">
        <p v-if="!species.isValid">L'espèce doit être renseignée.</p>
      </div>
      <div class="form-control">
        <label for="variety">Variété</label>
        <input type="text" id="variety" v-model.trim="variety.val">
      </div>
      <div class="form-control">
        <label for="plantImage">Image</label>
        <img id="output-plant-image">
        <input type="file" id="plantImage" ref="image" @change="selectImage">
      </div>
      <div class="form-control" :class="{ invalid: !plantationType.isValid }">
        <label for="plantationType">Type de plantation</label>
        <input type="text" id="plantationType" v-model.trim="plantationType.val" @blur="clearInvalidField('plantationType')">
        <p v-if="!plantationType.isValid">Le type de plantation doit être renseigné.</p>
      </div>
      <div class="dates">
        <div class="form-control plant-date" :class="{ invalid: !plantationDate.start.isValid }">
          <label for="plantationDateStart">Date début de plantation</label>
          <input type="date" id="plantationDateStart" v-model="plantationDate.start.val" @blur="clearInvalidDateField('plantationDate', 'start')">
          <p v-if="!plantationDate.start.isValid">La date de début de plantation doit être renseignée.</p>
        </div>
        <div class="form-control plant-date" :class="{ invalid: !plantationDate.end.isValid }">
          <label for="plantationDateEnd">Date fin de plantation</label>
          <input type="date" id="plantationDateEnd" v-model="plantationDate.end.val" @blur="clearInvalidDateField('plantationDate', 'end')">
          <p v-if="!plantationDate.end.isValid">La date de fin de plantation doit être renseignée.</p>
        </div>
      </div>
      <div class="dates">
        <div class="form-control harvest-date">
          <label for="harvestDateStart">Date début de récolte</label>
          <input type="date" id="harvestDateStart" v-model="harvestDate.start.val">
        </div>
        <div class="form-control harvest-date">
          <label for="harvestDateEnd">Date fin de récolte</label>
          <input type="date" id="harvestDateEnd" v-model="harvestDate.end.val">
        </div>
      </div>
      <div class="form-control">
        <label for="beneficialInteractions">Interactions bénéfiques</label>
        <add-plant-attributes
          selectedInteractionsName="selectedBeneficialInteractions"
          default-option="interaction bénéfique"
        ></add-plant-attributes>
      </div>
      <div class="form-control">
        <label for="harmfulInteractions">Interactions néfastes</label>
        <add-plant-attributes
          selectedInteractionsName="selectedHarmfulInteractions"
          default-option="interaction néfaste"
        ></add-plant-attributes>
      </div>
      <div class="form-control">
        <label for="diseases">Maladies</label>
        <add-plant-diseases></add-plant-diseases>
      </div>
      <div class="add-disease-wrapper">
        <base-button class="add-disease-btn" @click.prevent="toggleAddDiseaseForm" mode="outline"><i :class="createDiseaseBtnIcon"></i>{{ createDiseaseBtnText }}</base-button>
      </div>
      <add-disease-form v-if="diseaseFormVisible" @create-disease="handleCreatedDisease"></add-disease-form>
      <div class="form-control">
        <label for="notes">Remarques</label>
        <textarea id="notes" rows="5" v-model.trim="notes.val"></textarea>
      </div>
      <p v-if="!formIsValid" class="invalid">Des champs sont manquants.</p>
      <div class="submit-btn">
        <base-button>Valider</base-button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import imagePreview from '../../util/imageUploadPreview';
import AddPlantAttributes from './AddPlantAttributes.vue';
import AddPlantDiseases from './AddPlantDiseases.vue';
import AddDiseaseForm from '../diseases/AddDiseaseForm.vue';

export default {
  components: {
    AddPlantAttributes,
    AddDiseaseForm,
    AddPlantDiseases
  },
  data() {
    return {
      species: {
        val: '',
        isValid: true
      },
      variety: {
        val: ''
      },
      image: {
        val: null
      },
      plantationType: {
        val: '',
        isValid: true
      },
      plantationDate: {
        start: {
          val: '',
          isValid: true
        },
        end : {
          val: '',
          isValid: true
        }
      },
      harvestDate: {
        start: {
          val: ''
        },
        end: {
          val: ''
        }
      },
      notes: {
        val: ''
      },
      plantId: this.$route.params.id,
      formIsValid: true,
      diseaseFormVisible: false,
      error: null
    };
  },
  computed: {
    ...mapGetters('plants', [
      'plant',
      'plants',
      'selectedBeneficialInteractions',
      'selectedHarmfulInteractions'
    ]),
    ...mapGetters('diseases', {
      lastAddedDisease: 'lastAddedDisease',
      selectedDiseases: 'selectedDiseases'
    }),
    createDiseaseBtnIcon() {
      return this.diseaseFormVisible ? 'fas fa-angle-double-up' : 'fas fa-plus' ;
    },
    createDiseaseBtnText() {
      return this.diseaseFormVisible ? 'Masquer' : 'Créer une maladie';
    }
  },
  methods: {
    ...mapActions('plants', [
      'hideAllSearchResults',
      'fetchPlant',
      'clearSelectedInteractions',
      'addSelectedInteraction'
    ]),
    ...mapActions('diseases', [
      'fetchDiseases',
      'addSelectedDisease',
      'clearLastAddedDisease',
      'clearSelectedDiseases',
      'addSelectedDisease'
    ]),
    async handleCreatedDisease() {
      try {
        await this.fetchDiseases();
        this.diseaseFormVisible = false;
        this.addSelectedDisease({ _id: this.lastAddedDisease._id});
        this.clearLastAddedDisease();
      } catch (err) {
        console.log(err);
      }
    },
    toggleAddDiseaseForm() {
      this.diseaseFormVisible = !this.diseaseFormVisible;
    },
    parsedDateForEdit(dateToParse) {
      if (dateToParse) {
        return dateToParse.split('T')[0];
      }
    },
    clearInvalidField(input) {
      this[input].isValid = true;
    },
    clearInvalidDateField(input, position) {
      this[input][position].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;
      if (this.species.val === '') {
        this.species.isValid = false;
        this.formIsValid = false;
      }
      if (this.plantationType.val === '') {
        this.plantationType.isValid = false;
        this.formIsValid = false;
      }
      if (this.plantationDate.start.val === '') {
        this.plantationDate.start.isValid = false;
        this.formIsValid = false;
      }
      if (this.plantationDate.end.val === '') {
        this.plantationDate.end.isValid = false;
        this.formIsValid = false;
      }
    },
    selectImage() {
      this.image = this.$refs.image.files[0];
    },
    populateFormValues() {
    this.species.val = this.plant.species;
    this.variety.val = this.plant.variety;
    this.plantationType.val = this.plant.plantationType;
    this.plantationDate.start.val = this.parsedDateForEdit(this.plant.plantationDate.start);
    this.plantationDate.end.val = this.parsedDateForEdit(this.plant.plantationDate.end);
    this.harvestDate.start.val = this.plant.harvestDate.start ? this.parsedDateForEdit(this.plant.harvestDate.start) : '';
    this.harvestDate.end.val = this.plant.harvestDate.end ? this.parsedDateForEdit(this.plant.harvestDate.end) : '';
    this.notes.val = this.plant.notes;
    this.populateInteractions(this.plant.beneficialInteractions, 'selectedBeneficialInteractions');
    this.populateInteractions(this.plant.harmfulInteractions, 'selectedHarmfulInteractions');
    this.populateDiseases();
    },
    populateInteractions(existingInteractions, interactionType) {
      for (let { _id } of existingInteractions) {
        this.addSelectedInteraction({
          _id,
          interactionType
        });
      }
    },
    populateDiseases() {
      for (let { _id } of this.plant.diseases) {
        this.addSelectedDisease({ _id });
      }
    },
    async submitForm() {
      this.validateForm();
      if (!this.formIsValid) return;

      console.log(this.variety);
      console.log(this.notes);

      const formData = {
        _id: this.plantId,
        species: this.species.val.toLowerCase().trim(),
        variety: this.variety.val.toLowerCase().trim(),
        image: this.image,
        plantationType: this.plantationType.val.toLowerCase(),
        plantationDate: {
          start: this.plantationDate.start.val,
          end: this.plantationDate.end.val,
        },
        harvestDate: {
          start: this.harvestDate.start.val,
          end: this.harvestDate.end.val,
        },
        beneficialInteractions: this.selectedBeneficialInteractions,
        harmfulInteractions: this.selectedHarmfulInteractions,
        diseases: this.selectedDiseases,
        notes: this.notes.val.trim()
      };

      try {
        await this.$store.dispatch('plants/editPlant', formData);
        this.hideAllSearchResults();
        this.$router.replace(`/catalogue/plants/${this.plantId}`);
      } catch (err) {
        if (err.message === 'Failed to fetch') {
          this.error = 'Impossible de se connecter au serveur. Merci de vérifier votre connexion.';
        } else {
          this.error = err.message || 'Une erreur vient de produire. Merci de réessayer.';
        }
      }
    },
    async loadPlants() {
      try {
        this.clearSelectedInteractions();
        this.clearSelectedDiseases();
        await this.$store.dispatch('plants/fetchPlants', { searchQuery: '&pagination=false' });
        await this.fetchPlant(this.plantId);
        this.populateFormValues();
      } catch (err) {
        if (err.message === 'Failed to fetch') {
          this.error = 'Impossible de se connecter au serveur. Merci de vérifier votre connexion.';
        } else {
          this.error = err.message || 'Une erreur vient de produire. Merci de réessayer.';
        }
      }
    },
    handleError() {
      this.error = null;
    }
  },
  created() {
    this.loadPlants();
  },
   mounted() {
    imagePreview('plantImage', 'output-plant-image');
  }
}
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

#output-plant-image {
  max-width: 200px;
  display: none;
  margin-bottom: 1rem;
}

.dates {
  display: flex;
}

.dates .plant-date,
.dates .harvest-date {
  margin-right: 2rem;
}

label {
  font-weight: 300;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea,
select {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.add-disease-wrapper {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
}

.add-disease-btn i {
  margin-right: 0.5rem;
  font-size: 1.1rem;
}

.submit-btn {
  text-align: right;
  margin-top: 1rem;
}

.invalid label,
.invalid p,
.invalid h3,
p.invalid {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>