<template>
  <Header />
  <nav>
    <router-link to="/" class="btn-grad">Home</router-link>
  </nav>
  <!-- <router-link to="/login">Login</router-link> -->
  <div class="card">
    <!-- Titre -->

    <h1>Création de votre compte</h1>

    <!--  LIen vers Signup -->
    <div class="card_subtitle">
      <p>Pas encore de compte ?</p>
      <router-link to="/signup">Créer un compte</router-link>
    </div>

    <!-- Formulaire de connexion  -->
    <div class="card">
      <form @submit.prevent method="post" class="form">
        <div class="form__input">
          <label for="email">Email</label>
          <input
            type="email"
            v-model="email"
            @change="checkEmail"
            name="email"
            id="email"
            aria-label="email_signup"
            placeholder="Entrez votre adresse mail"
            required
          />

          <div v-if="status == 'error_user'" class="form__error">
            Utilisateur non trouvé
          </div>
        </div>
        <div class="form__input">
          <label for="passwordLogin">Mot de passe</label>
          <input
            type="password"
            v-model="password"
            name="password"
            id="passwordLogin"
            aria-label="password_login"
            placeholder="Entrez votre mot de passe"
            required
          />
          <div v-if="status == 'error_password'" class="form__input">
            Mot de passe incorrect
          </div>
        </div>
        <div v-if="status == 'error_serveur'" class="form__input">
          Une erreur inconnue s'est produite, veuillez reessayer plus tard ou
          contactez votre administrateur
        </div>

        <button v-bind:class="isActive" @click="login()">
          <span v-if="status == 'loading'"> Connexion en cours</span>
          <span v-else>Connexion</span>
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
      email: "",
      password: "",

      // Bouton Connexion désactivé
      btnIsActive: false,
    };
  },

  computed: {
    // Activation du bouton CONNEXION
    isActive() {
      // Si Email + password ne sont pas vide
      if (this.email !== "" && this.password !== "") {
        this.btnIsActive = true;
        console.log(this.btnIsActive);
        return "btn-grad";
      } else {
        return "btn-grad--disabled";
      }
    },
    ...mapState(["status"]),
  },

  methods: {
    // Connexion au compte
    login() {
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password,
        })
        .then(
          (userLog) => {
            console.log("userLog :>> ", userLog);
            this.$router.push("feed"); // Penser à modifier quand page post OK
          },
          (error) => {
            console.log("userLog-error :>> ", error);
          }
        );
    },
  },
};
</script>

<style lang="scss">
</style>