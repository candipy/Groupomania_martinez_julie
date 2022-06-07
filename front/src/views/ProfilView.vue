<template>
  <Header />
  <nav>
    <router-link to="/" class="btn-grad">Home</router-link>
    <router-link to="/feed" class="btn-grad">Fil d'actualités</router-link>
  </nav>
  <h1>Votre profil</h1>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: "Profil",
  components: {
    Header,
  },

  mounted() {
    console.log("this.store.state.user :>> ", this.$store.state.user);
    if (this.$store.state.user.userId == -1) {
      this.$router.push("/login");
      return;
    }
    this.$store.dispatch("getUserInfos");
  },
};
</script>

<style>
</style>