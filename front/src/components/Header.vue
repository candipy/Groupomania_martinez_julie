<template>
  <header>
    <router-link to="/" class="">
      <div class="logo-header">
        <img src="../assets/icon-left-font-monochrome-red.png" alt="Logo_Groupomania_Rouge" />
      </div>
    </router-link>
    <div class="icons-header">
      <div class="icons-header__one__bars" v-if="userIdSS >= 1"><i @click="displayLinks" class="fa-solid fa-bars fa-xl"></i></div>
      <div class="icons-header__one__door" v-if="userIdSS >= 1"><i @click="logout" class="fa fa-right-from-bracket fa-xl"></i></div>
    </div>
  </header>
  <nav class="links-header">
    <router-link to="/" class="links-header__one">Connexion</router-link>
    <router-link :to="{ path: '/user/' + this.userIdSS }" class="links-header__one">Profil</router-link>
    <router-link to="/feed" class="links-header__one">Fil d'actualités</router-link>
  </nav>
</template>

<script>
export default {
  name: "Header",

  data: () => {
    return {
      userIdSS: JSON.parse(sessionStorage.getItem("userId")),
    };
  },

  methods: {
    logout() {
      this.$store.commit("userStore/logout");
      this.$router.push("/");
    },

    displayLinks() {
      var nav = document.querySelector(".links-header");
      if (nav.style.display === "flex") {
        nav.style.display = "none";
      } else {
        nav.style.display = "flex";
      }
    },
  },
};
</script>

<style lang="scss"></style>
