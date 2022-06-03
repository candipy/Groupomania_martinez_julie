<template>
  <Header />
  <nav>
    <router-link to="/" class="btn-grad">Home</router-link>

    <router-link to="/login" class="btn-grad">Login</router-link>
  </nav>

  <div class="container_principal">
    <h1>Création de votre compte</h1>

    <div class="form">
      <form @submit.prevent="login" method="post">
        <div class="form__input">
          <label for="lastName">Votre nom</label>
          <input
            @change="checkLastName"
            type="text"
            v-model="lastName"
            name="lastName"
            id="lastName"
            aria-label="last_name"
            placeholder="Indiquez votre nom"
            required
          />
          <p v-show="errorLastName" id="form__error">
            Merci d'entrer un nom conforme. Ex : Dupond, Du-Pond, Du Pond
          </p>
        </div>
        <div class="form__input">
          <label for="firstName">Votre prénom</label>
          <input
            @change="checkfirstName"
            type="text"
            v-model="firstName"
            name="firstName"
            id="fistName"
            aria-label="first_name"
            placeholder="Indiquez votre prénom"
            required
          />
          <p v-show="errorFirstName" class="form__error">
            Merci d'entrer un prénom conforme. Ex : Jean, Jean-François, Jean
            François
          </p>
        </div>
        <div class="form__input">
          <label for="email">Votre email</label>
          <input
            @change="checkEmail"
            type="email"
            v-model="email"
            name="email"
            id="email"
            aria-label="email_signup"
            placeholder="Sera votre identifiant"
            required
          />
          <p v-show="errorEmail" class="form__error">
            Merci d'entrer un courriel conforme. Ex : contact@groupomania.com
          </p>
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
          <p class="form__error"><!-- validation --></p>
        </div>

        <input type="submit" class="btn-grad" value="Valider" />
      </form>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";

export default {
  name: "Signup",
  components: {
    Header,
  },

  data() {
    return {
      lastName: "",
      errorLastName: false,
      firstName: "",
      errorFirstName: false,
      email: "",
      errorEmail: false,
      password: "",
      regexAlpha: new RegExp(/^[A-Za-zÀ-ž-'\s]+$/), // Est ce une bonne pratique ?
      regexEmail: new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+.[a-zA-Z]{2,4}$/),
    };
  },

  methods: {
    checkLastName() {
      if (this.regexAlpha.test(this.lastName)) {
        this.errorLastName = false;
        return false;
      } else {
        this.errorLastName = true;
        return true;
      }
    },

    checkfirstName() {
      if (this.regexAlpha.test(this.firstName)) {
        this.errorFirstName = false;
        return false;
      } else {
        this.errorFirstName = true;
        return true;
      }
    },

    checkEmail() {
      if (this.regexEmail.test(this.email)) {
        this.errorEmail = false;
        return false;
      } else {
        this.errorEmail = true;
        return true;
      }
    },

    async login() {
      const { password, firstName, lastName, email } = this;
      const res = await fetch("http://localhost:3000/api/auth/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });
      const data = await res.json();
      console.log(data);
    },
  },
};
</script>

<style lang="scss">
// @import "@/css/mains.scss";


</style>
