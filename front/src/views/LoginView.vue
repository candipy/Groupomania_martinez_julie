<template>
  <Header />
  <nav>
    <router-link to="/" class="btn-grad">Home</router-link>
  </nav>
  <!-- <router-link to="/login">Login</router-link> -->
  <div class="container_principal">
    <h1>Connexion</h1>
    <!-- Formulaire de connexion -->
    <div class="form">
      <form method="post">
        <div class="form__input">
          <label for="email">Identifiant</label>
          <input
            type="email"
            name="email"
            id="email"
            aria-label="email_Login"
            placeholder="Indiquez votre adresse email"
            required
          />
          <p id="form__error"><!-- validation --></p>
        </div>
        <div class="form__input">
          <label for="passwordLogin">Mot de passe</label>
          <input
            type="password"
            name="password"
            id="passwordLogin"
            aria-label="passwordLogin"
            placeholder="Indiquez votre mot de passe"
            required
          />
          <p class="form__error"><!-- validation --></p>
        </div>

        <button class="btn-grad" type="submit">Connexion</button>
      </form>
    </div>
    <h2>Pas encore de compte ?</h2>
    <div class="form__input">
      <router-link to="/signup"
        ><button class="btn-grad-light">Créer un compte</button>
      </router-link>
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
};
</script>

<style lang="scss">
</style>