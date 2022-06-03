<template>
  <div class="home">
    <Header />

    <nav>
      <router-link to="/signup" class="btn-grad">Créer un compte</router-link>

      <router-link to="/login" class="btn-grad">Login</router-link>
    </nav>
    <h1>Bienvenue sur votre espace salariés</h1>
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <Compteur /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
// import Compteur from "@/components/Compteur.vue";
import Header from "@/components/Header.vue";

export default {
  name: "HomeView",
  components: {
    // HelloWorld,
    Header,
  },
};
</script>


<style lang="scss">
</style>