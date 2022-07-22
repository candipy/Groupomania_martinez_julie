<template>
  <Header />

  <div class="card">
    <h1>Bienvenue sur votre espace salariés</h1>

    <router-link to="/signup" class="btn-grad">Créer un compte</router-link>

    <router-link to="/login" class="btn-grad">Login</router-link>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: "HomeView",
  components: {
    Header,
  },

};
</script>

<style lang="scss"></style>
