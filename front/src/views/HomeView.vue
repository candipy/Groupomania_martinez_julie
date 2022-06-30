<template>
  <Header />

  <div class="card">
    <h1>Bienvenue sur votre espace salariés</h1>
    <nav>
      <router-link to="/signup" class="btn-grad">Créer un compte</router-link>
      <router-link to="/login" class="btn-grad">Login</router-link>
    </nav>

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

  mounted() {
    if (sessionStorage.getItem("token") !== null) {
      this.$router.push("/feed");
      return;
    }
  },
};
</script>

<style lang="scss"></style>
