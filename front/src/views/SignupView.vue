<template>
  <Header />
  <nav>
    <router-link to="/" class="btn-grad">Home</router-link>

    <router-link to="/login" class="btn-grad">Login</router-link>
  </nav>
  <div v-if="plusinfo" class="container_principal">
    <h1>Création de votre compte</h1>

    <div class="form">
      <form method="post">
        <div class="form__input">
          <label for="lastName">Votre nom</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            aria-label="last_name"
            placeholder="Indiquez votre nom"
            required
          />
          <p id="form__error"><!-- validation --></p>
        </div>
        <div class="form__input">
          <label for="firstName">Votre prénom</label>
          <input
            type="text"
            name="fistName"
            id="fistName"
            aria-label="first_name"
            placeholder="Indiquez votre prénom"
            required
          />
          <p id="form__error"><!-- validation --></p>
        </div>
        <div class="form__input">
          <label for="email">Votre email</label>
          <input
            type="email"
            name="email"
            id="email"
            aria-label="email_signup"
            placeholder="Sera votre identifiant"
            required
          />
          <p id="form__error"><!-- validation --></p>
        </div>
        <div class="form__input">
          <label for="passwordSignup">Mot de passe</label>
          <input
            type="password"
            name="password"
            id="passwordSignup"
            aria-label="password_signup"
            placeholder="Choisissez votre mot de passe"
            required
          />
          <p class="form__error"><!-- validation --></p>
        </div>

        <button class="btn-grad" type="submit">Valider</button>
      </form>
    </div>
    <div class="form__input">
      <div @click="afficher" class="btn-grad-light">
        Vous voulez nous en dire plus ?
      </div>
    </div>
  </div>
  <div v-else="plusinfo" class="container_principal">
    <h1>Création de votre compte</h1>

    <div class="form">
      <form method="post">
        <div class="form__input">
          <label for="lastName">Votre nom</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            aria-label="last_name"
            placeholder="Indiquez votre nom"
            required
          />
          <p id="form__error"><!-- validation --></p>
        </div>
        <div class="form__input">
          <label for="firstName">Votre prénom</label>
          <input
            type="text"
            name="fistName"
            id="fistName"
            aria-label="first_name"
            placeholder="Indiquez votre prénom"
            required
          />
          <p id="form__error"><!-- validation --></p>
        </div>
        <div class="form__input">
          <label for="email">Votre email</label>
          <input
            type="email"
            name="email"
            id="email"
            aria-label="email_signup"
            placeholder="Sera votre identifiant"
            required
          />
          <p id="form__error"><!-- validation --></p>
        </div>
        <div class="form__input">
          <label for="passwordSignup">Mot de passe</label>
          <input
            type="password"
            name="password"
            id="passwordSignup"
            aria-label="password_signup"
            placeholder="Choisissez votre mot de passe"
            required
          />
          <p class="form__error"><!-- validation --></p>
        </div>

        <div class="form__input">
          <label for="Description">Votre description (facultatif)</label>
          <input
            type="text"
            name="description"
            id="Description"
            aria-label="Description"
            placeholder="Decrivez vous ! "
          />
          <p id="form__error"><!-- validation --></p>
        </div>
        <div class="form__input">
          <label for="avatar"
            >Choisissez votre photo de profil (facultatif)</label
          >
          <input
            type="file"
            name="avatar"
            id="avatar"
            aria-label="avatar"
            accept="image/png, image/jpeg"
          />
          <p id="form__error"><!-- validation --></p>
        </div>
        <button class="btn-grad" type="submit">Valider</button>
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
      plusinfo: true,
    };
  },
  methods: {
    afficher() {
      this.plusinfo = !this.plusinfo;
    },
    pasAfficher() {
      this.awesome = !this.awesome;
    },
  },
};
</script>

<style lang="scss">
@import "@/css/mains.scss";

.btn-grad-light {
  background-image: linear-gradient(
    to right,
    #ffd7d7 0%,
    white 51%,
    #ffd6d7 100%
  );
  margin: 10px;
  padding: 5px 45px;
  text-align: center;
  transition: 0.5s;
  background-size: 200% auto;
  color: black;
  box-shadow: 0 0 20px #4e5166;
  border-radius: 10px;
  display: block;
  border: none;
}

.btn-grad-light:hover {
  background-position: right center; /* change the direction of the change here */
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
