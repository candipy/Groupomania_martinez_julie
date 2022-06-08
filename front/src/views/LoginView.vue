<template>
  <Header />
  <nav>
    <router-link to="/" class="btn-grad">Home</router-link>
  </nav>
  <!-- <router-link to="/login">Login</router-link> -->
  <div class="card">
    <!-- Titre -->
    <h1 v-if="mode == 'login'">Connexion</h1>
    <h1 v-else>Création de votre compte</h1>

    <!--  Un compte ? -->
    <div v-if="mode == 'login'" class="card_subtitle">
      <p>Pas encore de compte ?</p>
      <span @click="switchToCreateAccount()"> Créer un compte</span>
    </div>
    <div v-else class="card_subtitle">
      <p>Vous avez déjà un compte ?</p>
      <span @click="switchToLogin()"> Se connecter </span>
    </div>
    <!-- Formulaire de connexion / création de compte -->
    <div class="card">
      <form @submit.prevent method="post" class="form">
        <div v-if="mode == 'create'" class="form__input">
          <label for="lastName">Nom</label>
          <input
            type="text"
            v-model="lastName"
            @change="checkLastName"
            name="lastName"
            id="lastName"
            aria-label="last_name"
            placeholder="Indiquez votre nom"
            required
          />
          <p v-if="errorLastName && mode == 'create'" class="form__error">
            Merci d'entrer un nom conforme. Ex : Dupond, Du-Pond, Du Pond
          </p>
        </div>

        <div v-if="mode == 'create'" class="form__input">
          <label for="firstName">Prénom</label>
          <input
            type="text"
            v-model="firstName"
            @change="checkFirstName"
            name="firstName"
            id="fistName"
            aria-label="first_name"
            placeholder="Indiquez votre prénom"
            required
          />
          <p v-if="errorFirstName && mode == 'create'" class="form__error">
            Merci d'entrer un prénom conforme. Ex : Jean, Jean-François, Jean
            François
          </p>
        </div>
        <div class="form__input">
          <label for="email">Email</label>
          <input
            type="email"
            v-model="email"
            @change="checkEmail"
            name="email"
            id="email"
            aria-label="email_signup"
            placeholder="Sera votre identifiant"
            required
          />
          <p v-if="errorEmail && mode == 'create'" class="form__error">
            Merci d'entrer un courriel conforme. Ex : contact@groupomania.com
          </p>
          <div
            v-if="mode == 'login' && status == 'error_user'"
            class="form__error"
          >
            Utilisateur non trouvé
          </div>
          <div
            v-if="mode == 'create' && status == 'error_email'"
            class="form__error"
          >
            Merci d'entrer un courriel conforme. Ex : contact@groupomania.com
          </div>
          <div
            v-if="mode == 'create' && status == 'error_unique'"
            class="form__error"
          >
            Vous avez déjà un compte avec cette adresse mail
          </div>
        </div>
        <div class="form__input">
          <label for="passwordSignup">Mot de passe</label>
          <input
            type="password"
            v-model="password"
            name="password"
            id="passwordSignup"
            aria-label="password_signup"
            placeholder="Choisissez votre mot de passe"
            required
          />
          <div
            v-if="mode == 'login' && status == 'error_password'"
            class="form__input"
          >
            Mot de passe incorrect
          </div>
          <div
            v-if="mode == 'create' && status == 'error_password'"
            class="form__input"
          >
            Votre mot de passe doit comprendre entre 8 et 200 caractères, une
            majuscule, une minuscule, et aucun espace
          </div>
        </div>
        <div v-if="status == 'error_serveur'" class="form__input">
          Une erreur inconnue s'est produite, veuillez reessayer plus tard ou
          contactez votre administrateur
        </div>

        <button
          class="btn-grad"
          @click="login()"
          v-bind:class="{ 'btn-grad--disabled': !isOk }"
          v-if="mode == 'login'"
        >
          <span v-if="status == 'loading'"> Connexion en cours</span>
          <span v-else>Connexion</span>
        </button>

        <button
          class="btn-grad"
          @click="createAccount()"
          v-bind:class="{ 'btn-grad--disabled': !isOk }"
          v-else
        >
          <span v-if="status == 'loading'"> Création en cours</span>
          <span v-else>Valider</span>
        </button>
        <button
          class="btn-grad"
          @click="login()"
          v-bind:class="{ 'btn-grad--disabled': !isOk }"
          v-if="mode == 'create' && status == 'error_unique'"
        >
          <span @click="switchToLogin()"> Créer un compte</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

import { mapState } from "vuex";

export default {
  name: "Login",
  components: {
    Header,
  },

  data: () => {
    return {
      mode: "login",
      // Saisie Utilisateur
      lastName: "",
      firstName: "",
      email: "",
      password: "",
      // Erreurs
      errors: [],
      errorLastName: null,
      errorFirstName: null,
      errorEmail: null,
    };
  },

  computed: {
    isOk() {
      if (this.mode == "create") {
        if (
          !this.checkLastName() &&
          this.password !== "" &&
          !this.checkEmail() &&
          !this.checkFirstName()
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.email !== "" && this.password !== "") {
          return true;
        } else {
          return false;
        }
      }
    },
    ...mapState(["status"]),
  },

  methods: {
    // Changement de mode
    switchToCreateAccount() {
      this.mode = "create";
    },

    switchToLogin() {
      this.mode = "login";
    },

    // Vérification de la conformité des champs
    regexAlpha(value) {
      let regexAlpha = /^[A-Za-zÀ-ž-'\s]+$/;
      return regexAlpha.test(value);
    },

    regexEmail(value) {
      return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+.[a-zA-Z]{2,4}$/.test(value);
    },
    checkLastName() {
      this.errorLastName = false;
      if (this.lastName == "") {
        this.errorLastName = false;
        return false;
      } else if (this.regexAlpha(this.lastName) == this.errorLastName) {
        this.errorLastName = true;
        return true;
      } else {
        this.errorLastName = false;
        return false;
      }
    },
    checkFirstName() {
      this.errorFirstName = false;
      if (this.firstName == "") {
        this.errorFirstName = false;
        return false;
      } else if (this.regexAlpha(this.firstName) == this.errorFirstName) {
        this.errorFirstName = true;
        return true;
      } else {
        this.errorFirstName = false;
        return false;
      }
    },

    checkEmail() {
      this.errorEmail = false;
      if (this.email == "") {
        this.errorEmail = false;
        return false;
      } else if (this.regexEmail(this.email) == this.errorEmail) {
        this.errorEmail = true;
        return true;
      } else {
        this.errorEmail = false;
        return false;
      }
    },

    // Création de compte
    createAccount() {
      this.$store
        .dispatch("createAccount", {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
        })
        .then(
          (response) => {
            console.log("response.create :>> ", response);
            this.login();
          },
          (error) => {
            console.log("error.login :>> ", error);
          }
        );
    },

    // Connexion au compte
    login() {
      // const this = this;
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password,
        })
        .then(
          (response) => {
            console.log("response.login :>> ", response);
            this.$router.push("feed"); // Penser à modifier quand page post OK
          },
          (error) => {
            console.log("error.login :>> ", error);
          }
        );
    },
  },
};
</script>

<style lang="scss">
</style>