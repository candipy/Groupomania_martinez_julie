<template>
  <Header />
  <nav>
    <router-link to="/" class="btn-grad">Home</router-link>
  </nav>

  <div class="card">
    <!-- Titre -->

    <h1>Création de votre compte</h1>

    <!--  Lien vers Login -->
    <div class="card_subtitle">
      <p>Vous avez déjà un compte ?</p>
      <router-link to="/login">Se connecter</router-link>
    </div>

    <!-- Formulaire de connexion / création de compte -->
    <div class="card">
      <form @submit.prevent method="post" class="form">
        <div class="form__input">
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
          <p v-if="errorLastName" class="form__error">
            Merci d'entrer un nom conforme. Ex : Dupond, Du-Pond, Du Pond
          </p>
        </div>

        <div class="form__input">
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
          <p v-if="errorFirstName" class="form__error">
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
          <p v-if="errorEmail" class="form__error">
            Merci d'entrer un courriel conforme. Ex : contact@groupomania.com
          </p>

          <!-- <div v-if="status == 'error_email'" class="form__error">
            Merci d'entrer un courriel conforme. Ex : contact@groupomania.com
          </div> -->
          <div v-if="status == 'error_unique'" class="form__error">
            Vous avez déjà un compte avec cette adresse mail, retournez à la
            page de connexion
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
            placeholder="Indiquez un mot de passe"
            required
          />

          <div v-if="status == 'error_password'" class="form__input">
            Votre mot de passe doit comprendre entre 8 et 200 caractères, une
            majuscule, une minuscule, et aucun espace
          </div>
        </div>
        <div v-if="status == 'error_serveur'" class="form__input">
          Une erreur inconnue s'est produite, veuillez reessayer plus tard ou
          contactez votre administrateur
        </div>

        <button
          :class="classIs"
          :disabled="isDisabledAttribute"
          @click="createAccount()"
        >
          <span v-if="status == 'loading'"> Création en cours</span>
          <span v-else>Valider</span>
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
      // Saisie Utilisateur
      lastName: "",
      firstName: "",
      email: "",
      password: "",
      // Erreurs
      errorLastName: false,
      errorFirstName: false,
      errorEmail: false,
      // Bouton Connexion => Changement de class
      btnIsActive: false,
    };
  },

  computed: {
    // Activation du bouton CONNEXION
    classIs() {
      if (
        // Si il y a une erreur, la classe est "btn-grad-disabled"
        this.errorLastName ||
        this.errorFirstName ||
        this.errorEmail ||
        this.password == ""
      ) {
        return "btn-grad--disabled";
      } else {
        return "btn-grad";
      }
    },

    isDisabledAttribute() {
      // Si il y a une erreur, le bouton est désactivé
      if (
        this.errorLastName ||
        this.errorFirstName ||
        this.errorEmail ||
        this.password == ""
      ) {
        return true;
      } else {
        return false;
      }
    },

    ...mapState(["status"]),
  },

  methods: {
    // Vérification de la conformité des champs
    regexAlpha(value) {
      let regexAlpha = /^[A-Za-zÀ-ž-'\s]+$/;
      return regexAlpha.test(value);
    },

    regexEmail(value) {
      return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+.[a-zA-Z]{2,4}$/.test(value);
    },

    checkLastName() {
      // Si après le changement il y a un regex non conforme ou un champ
      if (!this.regexAlpha(this.lastName) || this.lastName == "") {
        this.errorLastName = true; // Il y a une erreur et le v-if de l'erreur s'affiche
        return false; // La vérification à échouée, il y a une erreur
      } else {
        this.errorLastName = false; // Mis ca car si je met thsi.errorLastName sans = false, si le user à en premier lieu fait une erreur errorLastName= true donc le v-if continuerait de s'afficher
        return true; //La vérification à réussi, il n'y a pas d'erreur
      }
    },
    checkFirstName() {
      if (!this.regexAlpha(this.firstName) || this.firstName == "") {
        this.errorFirstName = true;
        return false;
      } else {
        this.errorFirstName = false;
        return true;
      }
    },

    checkEmail() {
      if (!this.regexEmail(this.email) || this.email == "") {
        this.errorEmail = true;
        return false;
      } else {
        this.errorEmail = false;
        return true;
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
          (userCreate) => {
            console.log("UserCreate :>> ", userCreate);
          },
          (error) => {
            console.log("UserCreate-Error :>> ", error);
          }
        );
    },
  },
};
</script>

<style lang="scss">
</style>
