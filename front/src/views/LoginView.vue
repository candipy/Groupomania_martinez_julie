<template>
  <Header />
  <nav>
    <router-link to="/" class="btn-grad">Home</router-link>
  </nav>
  <!-- <router-link to="/login">Login</router-link> -->
  <div class="card">
    <!-- Titre -->

    <h1>Login</h1>

    <!--  Lien vers Signup -->
    <div class="card_subtitle">
      <p>Pas encore de compte ?</p>
      <router-link to="/signup">Créer un compte</router-link>
    </div>

    <!-- Formulaire de connexion  -->
    <div class="card">
      <form @submit.prevent method="post" class="form">
        <div class="form__input">
          <label for="email">Email</label>
          <input type="email" v-model="email" @change="checkEmail" name="email" id="email" aria-label="email_signup" placeholder="Entrez votre adresse mail" required />

          <div v-if="status == 'error_user'" class="form__error">
            {{ errors }}
          </div>
        </div>
        <div class="form__input">
          <label for="passwordLogin">Mot de passe</label>
          <input type="password" v-model="password" name="password" id="passwordLogin" aria-label="password_login" placeholder="Entrez votre mot de passe" required />
          <div v-if="status == 'error_password'" class="form__input">
            {{ errors }}
          </div>
        </div>
        <!-- <div v-if="status == 'error_serveur'" class="form__input">
          Une erreur inconnue s'est produite, veuillez reessayer plus tard ou
          contactez votre administrateur
        </div> -->

        <button :class="classIs" :disabled="isDisabledAttribute" @click="login()">
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
    };
  },

  mounted() {
    console.log("this.$store :>> ", this.$store);
  },
  computed: {
    // Desactivation du bouton CONNEXION
    classIs() {
      // Si il n'y a pas d'email ou de mot de passe, la class est "btn-grad-disabled"
      if (this.email == "" || this.password == "") {
        return "btn-grad--disabled";
      } else {
        return "btn-grad";
      }
    },

    isDisabledAttribute() {
      // Si il n'y a pas d'email ou de mot de passe, le bouton est désactivé
      if (this.email == "" || this.password == "") {
        return true;
      } else {
        return false;
      }
    },

    ...mapState("userStore", {
      errors: (state) => state.errors,
      status: (state) => state.status,
    }),
    // ...mapState({

    // }),
  },

  methods: {
    // Connexion au compte
    login() {
      this.$store
        .dispatch("userStore/login", {
          email: this.email,
          password: this.password,
        })
        .then(
          (userLog) => {
            console.log("userLog Vue login:>> ", userLog);
            this.$router.push("feed");
          },
          (errorUserLogin) => {
            console.log("errorUserLogin :>> ", errorUserLogin);
            if (this.status == "error_serveur") {
              this.$router.push("error500");
            }
          }
        );
    },
  },
};
</script>

<style lang="scss"></style>
