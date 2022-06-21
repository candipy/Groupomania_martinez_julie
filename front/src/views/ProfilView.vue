<template>
  <Header />
  <nav>
    <router-link to="/" class="btn-grad">Home</router-link>
    <router-link to="/feed" class="btn-grad">Fil d'actualités</router-link>
  </nav>

  <h1>Profil</h1>
  <div class="card">
    <div class="card_subtitle">Hello {{ userInfos.firstName }} !</div>

    <div>
      <p>Nom : {{ userInfos.lastName }}</p>
    </div>
    <div>
      <p>Prénom : {{ userInfos.firstName }}</p>
    </div>
    <div>
      <p>Email du compte : {{ userInfos.email }}</p>
    </div>

    <button class="btn-grad-light">
      <span @click="deleteAccount">Supprimer le compte</span>
    </button>

    <!-- <img :src="user.photo" /> -->
    <button class="btn-grad">
      <span @click="logout"> Deconnexion</span>
    </button>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

import { mapState } from "vuex";

export default {
  name: "Profil",
  components: {
    Header,
  },
  mounted() {
    if (sessionStorage.getItem("token") === null) {
      this.$router.push("/login");
      return;
    }

    this.$store.dispatch("userStore/getUserInfos");
  },

  computed: {
    ...mapState("userStore", {
      errors: (state) => state.errors,
      status: (state) => state.status,
      userInfos: (state) => state.userInfos,
      user: (state) => state.user,
    }),
  },
  methods: {
    logout() {
      this.$store.commit("userStore/logout");
      this.$router.push("/");
    },

    deleteAccount() {
      this.$store.dispatch("userStore/deleteAccount").then(
        () => {
          this.$router.push("deleteAccount");
        },
        (error) => {
          console.log("error :>> ", error);
          if (this.status == "error_serveur") {
            this.$router.push("error500");
          }
        }
      );
    },
  },
};
</script>

<style>
</style>