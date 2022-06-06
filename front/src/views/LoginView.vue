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
    <div class="form">
      <form @submit.prevent method="post">
        <div v-if="mode == 'create'" class="form__input">
          <label for="lastName">Nom</label>
          <input
            type="text"
            v-model="lastName"
            name="lastName"
            id="lastName"
            aria-label="last_name"
            placeholder="Indiquez votre nom"
            required
          />
          <!-- <p v-show="errorLastName" id="form__error">
            Merci d'entrer un nom conforme. Ex : Dupond, Du-Pond, Du Pond
          </p> -->
        </div>
        <div v-if="mode == 'create'" class="form__input">
          <label for="firstName">Prénom</label>
          <input
            type="text"
            v-model="firstName"
            name="firstName"
            id="fistName"
            aria-label="first_name"
            placeholder="Indiquez votre prénom"
            required
          />
          <!-- <p v-show="errorFirstName" class="form__error">
            Merci d'entrer un prénom conforme. Ex : Jean, Jean-François, Jean
            François
          </p> -->
        </div>
        <div class="form__input">
          <label for="email">Email</label>
          <input
            type="email"
            @change="console()"
            v-model="email"
            name="email"
            id="email"
            aria-label="email_signup"
            placeholder="Sera votre identifiant"
            required
          />
          <!-- <p v-show="errorEmail" class="form__error">
            Merci d'entrer un courriel conforme. Ex : contact@groupomania.com
          </p> -->
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
          <!-- <p class="form__error"></p> -->
        </div>

        <input
          type="submit"
          class="btn-grad"
          @click="login()"
          v-bind:class="{ 'btn-grad--disabled': !isEmpty }"
          v-if="mode == 'login'"
          value="Connexion"
        />
        <input
          type="submit"
          class="btn-grad"
          @click="createAccount()"
          v-bind:class="{ 'btn-grad--disabled': !isEmpty }"
          v-else
          value="Valider"
        />
      </form>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: "Login",
  components: {
    Header,
  },

  data: function () {
    return {
      mode: "login",

      lastName: "",

      firstName: "",

      email: "",

      password: "",
    };
  },

  computed: {
    isEmpty: function () {
      if (this.mode == "create") {
        if (
          this.email !== "" &&
          this.password !== "" &&
          this.firstName !== "" &&
          this.lastName !== ""
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
  },
  methods: {
    console() {
      console.log("mode :>> ", this.mode);
    },
    switchToCreateAccount: function () {
      this.mode = "create";
    },

    switchToLogin: function () {
      this.mode = "login";
    },

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
            console.log("response :>> ", response);
          },
          (error) => {
            console.log("error :>> ", error);
          }
        );
    },

    login() {
      this.$store
        .dispatch("createAccount", {
          email: this.email,
          password: this.password,
        })
        .then(
          (response) => {
            console.log("response :>> ", response);
          },
          (error) => {
            console.log("error :>> ", error);
          }
        );
    },
  },
};
</script>

<style lang="scss">
</style>