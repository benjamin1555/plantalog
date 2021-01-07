<template>
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
      <label for="image">Image</label>
      <input type="file" id="image" ref="image" @change="selectImage">
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
        attributeName="beneficialInteractions"
        default-option="interaction bénéfique"
        :attributes-list="sortedPlants"
        @get-selected-values="setBeneficialInteractions"
      ></add-plant-attributes>
    </div>
    <div class="form-control">
      <label for="harmfulInteractions">Interactions néfastes</label>
      <add-plant-attributes
        attributeName="harmfulInteractions"
        default-option="interaction néfaste"
        :attributes-list="sortedPlants"
        @get-selected-values="setHarmfulInteractions"
      ></add-plant-attributes>
    </div>
    <div class="form-control">
      <label for="diseases">Maladies</label>
      <add-plant-attributes
        attributeName="diseases"
        default-option="maladie"
        :attributes-list="getAllDiseases"
        :knownInteractions="getLastCreatedDisease"
        @get-selected-values="setDiseases"
      ></add-plant-attributes>
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
      <base-button>Ajouter Espèce</base-button>
    </div>
  </form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AddPlantAttributes from './AddPlantAttributes.vue';
import AddDiseaseForm from '../diseases/AddDiseaseForm.vue';

export default {
  components: {
    AddPlantAttributes,
    AddDiseaseForm
  },
  emits: ['save-data'],
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
      beneficialInteractions: {
        val: null
      },
      harmfulInteractions: {
        val: null
      },
      diseases: {
        val: null
      },
      notes: {
        val: ''
      },
      formIsValid: true,
      diseaseFormVisible: false
    };
  },
  computed: {
    ...mapGetters('plants', [
      'sortedPlants'
    ]),
    ...mapGetters({
      getAllDiseases: 'diseases/diseases',
      lastAddedDisease: 'diseases/lastAddedDisease'
    }),
    getLastCreatedDisease() {
      let lastDisease = this.lastAddedDisease
      if (lastDisease) {
        const lastDiseaseId = lastDisease._id;
        this.setDiseases([lastDiseaseId])
        return [lastDiseaseId];
      }
      return null;
    },
    createDiseaseBtnIcon() {
      return this.diseaseFormVisible ? 'fas fa-angle-double-up' : 'fas fa-plus' ;
    },
    createDiseaseBtnText() {
      return this.diseaseFormVisible ? 'Masquer' : 'Créer une maladie';
    }
  },
  methods: {
    ...mapActions('diseases', [
      'fetchDiseases'
    ]),
    handleCreatedDisease() {
      this.fetchDiseases();
      this.diseaseFormVisible = false;
    },
    toggleAddDiseaseForm() {
      this.diseaseFormVisible = !this.diseaseFormVisible;
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
    setBeneficialInteractions(interactions) {
      this.beneficialInteractions = interactions;
    },
    setHarmfulInteractions(interactions) {
      this.harmfulInteractions = interactions;
    },
    setDiseases(diseases) {
      this.diseases = diseases;
    },
    submitForm() {
      this.validateForm();
      if (!this.formIsValid) return;

      const formData = {
        species: this.species.val.toLowerCase(),
        variety: this.variety.val.toLowerCase(),
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
        beneficialInteractions: this.beneficialInteractions,
        harmfulInteractions: this.harmfulInteractions,
        diseases: this.diseases,
        notes: this.notes.val
      };
      this.$emit('save-data', formData);
    }
  },
  mounted() {
    this.fetchDiseases();
  }
}
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
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