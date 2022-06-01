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
.container_principal {
  width: 100%;
  // width: 50%;
  padding: 10px;
}
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 10px;
  border: #fd2d01;
  border-top-style: dotted;
  border-bottom-style: dotted;
  // border-style: dotted;
  box-shadow: 0 0 20px #4e5166;

  padding: 2%;
  form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  &__input {
    width: 100%;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;

    input {
      width: 100%;
      border: #4e5166 1px;
      border-style: solid;
    }
  }
}

.btn-grad {
  background-image: linear-gradient(
    to right,
    #fd2d01 0%,
    #4e5166 51%,
    #fd2d01 100%
  );
  margin: 10px;
  padding: 15px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 20px #4e5166;
  border-radius: 10px;
  display: block;
  width: 33%;
  border: none;
}

.btn-grad:hover {
  background-position: right center; /* change the direction of the change here */
  color: #fff;
  text-decoration: none;
  cursor: pointer;
}
</style>