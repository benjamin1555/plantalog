<template>
  <div class="container">
    <base-dialog :show="isLoading" title="Connexion..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-dialog :show="!!error" title="Une erreur s'est produite" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-card class="card">
      <form @submit.prevent="submitForm">
      <h2>Se connecter</h2>
        <div class="form-control" :class="{ invalid: !email.isValid }">
          <label for="email">Email</label>
          <input type="email" id="email" v-model.trim="email.val" @blur="clearInvalidField('email')">
          <p v-if="!email.isValid">L'adresse email doit être renseigné.</p>
        </div>
        <div class="form-control" :class="{ invalid: !password.isValid }">
          <label for="password">Mot de passe</label>
          <input type="password" id="password" v-model.trim="password.val" @blur="clearInvalidField('password')">
          <p v-if="!password.isValid">Le mot de passe doit être renseigné.</p>
        </div>
        <div class="bottom-links">
          <base-button>Se connecter</base-button>
          <router-link to="/signup">Créer un compte</router-link>
        </div>
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: {
        val: '',
        isValid: true
      },
      password: {
        val: '',
        isValid: true
      },
      formIsValid: true,
      isLoading: false,
      error: null
    };
  },
  methods: {
    clearInvalidField(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;
      if (this.email.val === '') {
        this.email.isValid = false;
        this.formIsValid = false;
      }
      if (this.password.val === '') {
        this.password.isValid = false;
        this.formIsValid = false;
      }
    },
    async submitForm() {
      this.validateForm();
      if (!this.formIsValid) return;
      this.isLoading = true;

      try {
        await this.$store.dispatch('login', {
          email: this.email.val,
          password: this.password.val
        });
        this.isLoading = false;
        this.$router.replace('/');
      } catch (err) {
        this.isLoading = false;
        if (err.message === 'Failed to fetch') {
          this.error = 'Impossible de se connecter au serveur. Merci de vérifier votre connexion.';
        } else {
          this.error = err.message || 'Une erreur vient de produire. Merci de réessayer.';
        }
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    }
  }
};
</script>

<style scoped>
.main-content {
  width: 100%;
  display: flex;
  justify-content: center;
}

.card {
  width: 500px;
}

form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

form h2 {
  font-weight: 300;
  font-size: 1.6rem;
  margin-top: 0;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #CCC;
}

.bottom-links {
  margin-top: 1.5rem;
}

label {
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.invalid label,
.invalid p {
  color: red;
}

.invalid input {
  border: 1px solid red;
}
</style>