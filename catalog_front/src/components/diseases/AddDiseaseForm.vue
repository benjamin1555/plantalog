<template>
  <base-card>
    <form @submit.prevent="submitForm">
      <div class="form-control" :class="{ invalid: !name.isValid }">
        <label for="name">Nom</label>
        <input type="text" id="name" v-model.trim="name.val" @blur="clearInvalidField('name')">
        <p v-if="!name.isValid">Le nom doit être renseigné.</p>
      </div>
      <div class="form-control" :class="{ invalid: !symptoms.isValid }">
        <label for="symptoms">Symptômes</label>
        <input type="text" id="symptoms" v-model.trim="symptoms.val" @blur="clearInvalidField('symptoms')">
        <p v-if="!name.isValid">Les symptômes doivent être renseignés.</p>
      </div>
      <div class="form-control">
        <label for="image">Image</label>
        <input type="file" id="image" ref="image" @change="selectImage">
      </div>
      <div class="form-control" :class="{ invalid: !treatment.isValid }">
        <label for="treatment">Traitement</label>
        <input type="text" id="treatment" v-model.trim="treatment.val" @blur="clearInvalidField('treatment')">
        <p v-if="!name.isValid">Les traitement doit être renseigné.</p>
      </div>
      <p v-if="!formIsValid" class="invalid">Des champs sont manquants.</p>
      <div class="submit-btn">
        <base-button>Créer Maladie</base-button>
      </div>
    </form>
  </base-card>
</template>

<script>
export default {
  emits: ['create-disease'],
  data() {
    return {
      name: {
        val: '',
        isValid: true
      },
      symptoms: {
        val: '',
        isValid: true
      },
      image: '',
      treatment: {
        val: '',
        isValid: true
      },
      formIsValid: true
    };
  },
  methods: {
    clearInvalidField(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;
      if (this.name.val === '') {
        this.name.isValid = false;
        this.formIsValid = false;
      }
      if (this.symptoms.val === '') {
        this.symptoms.isValid = false;
        this.formIsValid = false;
      }
      if (this.treatment.val === '') {
        this.treatment.isValid = false;
        this.formIsValid = false;
      }
    },
    selectImage() {
      this.image = this.$refs.image.files[0];
    },
    async submitForm() {
      this.validateForm();
      if (!this.formIsValid) return;

      const formData = {
        name: this.name.val.toLowerCase(),
        symptoms: this.symptoms.val,
        image: this.image,
        treatment: this.treatment.val
      };
      await this.$store.dispatch('diseases/addDisease', formData);
      this.$emit('create-disease');
    }
  }
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
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