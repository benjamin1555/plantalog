<template>
  <div class="container">
    <base-dialog :show="isLoading" title="Création du compte..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-dialog :show="!!error" title="Une erreur s'est produite" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-card class="card">
      <form @submit.prevent="submitForm">
      <h2>Création de compte</h2>
        <div class="form-control">
          <label for="email">Email</label>
          <input type="email" id="email" v-model.trim="email">
        </div>
        <div class="form-control">
          <label for="username">Nom d'utilisateur</label>
          <input type="text" id="username" v-model.trim="username">
        </div>
        <div class="form-control">
          <label for="password">Mot de passe</label>
          <input type="password" id="password" v-model.trim="password">
        </div>
        <div class="form-control">
          <label for="password-confirmation">Mot de passe (confirmation)</label>
          <input type="password" id="password-confirmation" v-model.trim="passwordConfirmation">
        </div>
        <p class="invalid-form" v-if="!formIsValid">
          L'adresse email et le nom d'utilisateur doivent être renseignés. <br>
          Le mot de passe et la confirmation doivent être identiques et d'une longueur supérieure à 5 caractères.
        </p>
        <base-button>Créer compte</base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      username: '',
      password: '',
      passwordConfirmation: '',
      formIsValid: true,
      isLoading: false,
      error: null
    };
  },
  methods: {
    async submitForm() {
      this.formValidation();
      this.isLoading = true;

      try {
        if (this.formIsValid) {
          await this.$store.dispatch('signup', {
            email: this.email,
            username: this.username,
            password: this.password
          });
          this.$router.replace('/');
        }
      } catch (err) {
        this.error = 'Echec lors de la création de compte.';
      }
      this.isLoading = false;
    },
    formValidation() {
      this.formIsValid = true;
      if (!this.email || !this.username) {
        this.formIsValid = false;
        return;
      }
      if (this.password.length < 6 || this.passwordConfirmation.length < 6) {
        this.formIsValid = false;
        return;
      }
      if (this.password !== this.passwordConfirmation) {
        this.formIsValid = false;
        return;
      }
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

label {
  /* font-weight: bold; */
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

.switch-btn {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: transparent;
  border: 1px solid #270041;
  color: #270041;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
}

.switch-btn:hover,
.switch-btn:active {
  background-color: #edd2ff;
}

p.invalid-form {
  color: red;
}
</style>